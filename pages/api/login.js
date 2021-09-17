import { API_URL } from "@/config/index";
import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          // maxAge: 60,
          sameSite: "strict",
          path: "/",
        })
      );
      const user = {
        email: data.user.email,
        username: data.user.username,
        role: data.user.role.name,
      };
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(data.statusCode).json({
        success: false,
        message: data.message[0].messages[0].message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};
