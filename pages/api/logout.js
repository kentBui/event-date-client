import { API_URL } from "@/config/index";
import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    // destroying cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({
      message: "Logout Success",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};
