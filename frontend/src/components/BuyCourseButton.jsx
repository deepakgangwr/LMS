import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation, useVerifyPaymentMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    const launchRazorpayCheckout = async () => {
      if (!data || !data.orderId) return;
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: data.courseTitle || "Course Purchase",
        order_id: data.orderId,
        handler: async function (response) {
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId,
          };
          const res = await verifyPayment(payload);
          if (res?.data?.success) {
            window.location.href = `/course-progress/${courseId}`;
          } else {
            toast.error(res?.error?.data?.message || "Payment verification failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      if (typeof window.Razorpay === "undefined") {
        toast.error("Razorpay SDK not loaded");
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    if (isSuccess) {
      launchRazorpayCheckout();
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create order");
    }
  }, [data, isSuccess, isError, error, courseId, verifyPayment]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
