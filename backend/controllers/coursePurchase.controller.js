import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createCheckoutSession = async (req, res) => {
	try {
		const userId = req.id;
		const { courseId } = req.body;

		const course = await Course.findById(courseId);
		if (!course) return res.status(404).json({ message: "Course not found!" });

		// Create a new course purchase record in pending state
		const newPurchase = new CoursePurchase({
			courseId,
			userId,
			amount: course.coursePrice,
			status: "pending",
		});

		// Create a Razorpay order (amount in paise)
		const order = await razorpay.orders.create({
			amount: course.coursePrice * 100,
			currency: "INR",
			receipt: `rcpt_${newPurchase._id}`,
			notes: { courseId: String(courseId), userId: String(userId) },
		});

		// Save the purchase record with the order id
		newPurchase.paymentId = order.id;
		await newPurchase.save();

		return res.status(200).json({
			success: true,
			keyId: process.env.RAZORPAY_KEY_ID,
			orderId: order.id,
			amount: order.amount,
			currency: order.currency,
			courseTitle: course.courseTitle,
		});
 	} catch (error) {
 		console.log(error);
 		return res.status(500).json({ success: false, message: "Failed to create order" });
 	}
};

export const verifyPayment = async (req, res) => {
 	try {
 		const userId = req.id;
 		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

 		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
 			return res.status(400).json({ success: false, message: "Missing payment details" });
 		}

 		const generatedSignature = crypto
 			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
 			.update(`${razorpay_order_id}|${razorpay_payment_id}`)
 			.digest("hex");

 		if (generatedSignature !== razorpay_signature) {
 			// mark failed
 			await CoursePurchase.findOneAndUpdate(
 				{ paymentId: razorpay_order_id, userId },
 				{ status: "failed" }
 			);
 			return res.status(400).json({ success: false, message: "Payment verification failed" });
 		}

 		// Mark purchase as completed and enroll user
 		const purchase = await CoursePurchase.findOneAndUpdate(
 			{ paymentId: razorpay_order_id, userId },
 			{ status: "completed" },
 			{ new: true }
 		).populate({ path: "courseId" });

 		if (!purchase) {
 			return res.status(404).json({ success: false, message: "Purchase not found" });
 		}

 		// Make all lectures visible by setting `isPreviewFree` to true
 		if (purchase.courseId && purchase.courseId.lectures.length > 0) {
 			await Lecture.updateMany(
 				{ _id: { $in: purchase.courseId.lectures } },
 				{ $set: { isPreviewFree: true } }
 			);
 		}

 		// Update user's enrolledCourses
 		await User.findByIdAndUpdate(
 			purchase.userId,
 			{ $addToSet: { enrolledCourses: purchase.courseId._id } },
 			{ new: true }
 		);

 		// Update course to add user ID to enrolledStudents
 		await Course.findByIdAndUpdate(
 			purchase.courseId._id,
 			{ $addToSet: { enrolledStudents: purchase.userId } },
 			{ new: true }
 		);

 		return res.status(200).json({ success: true });
 	} catch (error) {
 		console.log(error);
 		return res.status(500).json({ success: false, message: "Internal Server Error" });
 	}
};
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
