const { events } = require("./data.json");
export default function handler(req, res) {
  const event = events.find((ev) => ev.slug === req.query.slug);
  if (req.method === "GET") {
    res.status(200).json({ event });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
}
