import cookie from "cookie";

export default function parserCookie(req) {
  return cookie.parse((req && req.headers.cookie) || "") || { token: "" };
}
