import { API_URL } from "@/config/index";
import parserCookie from "@/utils/cookie.helper";
import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const { token } = parserCookie(req);

    // FIXME
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};
