import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction, // only true on https in production
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("token", token, cookieOptions).json({
        success:true,
        message,
        user
    });
};
