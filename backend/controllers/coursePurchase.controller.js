import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

// ✅ Safe Razorpay initialization with checks
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay environment variables missing!");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "missing_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "missing_key_secret",
});

// -------------------- Create Checkout --------------------
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create purchase record (pending state)
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Razorpay order (amount in paise)
    const order = await razorpay.orders.create({
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `rcpt_${newPurchase._id}`,
      notes: { courseId: String(courseId), userId: String(userId) },
    });

    // Save purchase with order id
    newPurchase.paymentId = order.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID, // send key to frontend
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseTitle: course.courseTitle,
    });
  } catch (error) {
    console.error("❌ Razorpay create order error:", error);
    return res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// -------------------- Verify Payment --------------------
export const verifyPayment = async (req, res) => {
  try {
    const userId = req.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await CoursePurchase.findOneAndUpdate(
        { paymentId: razorpay_order_id, userId },
        { status: "failed" }
      );
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Mark purchase completed
    const purchase = await CoursePurchase.findOneAndUpdate(
      { paymentId: razorpay_order_id, userId },
      { status: "completed" },
      { new: true }
    ).populate({ path: "courseId" });

    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    // Unlock lectures
    if (purchase.courseId && purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Add course to user’s enrolled list
    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } },
      { new: true }
    );

    // Add user to course’s enrolled students
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } },
      { new: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Razorpay verify payment error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// -------------------- Get Course with Purchase Status --------------------
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- Get All Purchased Courses --------------------
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.error("❌ Error fetching purchased courses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
