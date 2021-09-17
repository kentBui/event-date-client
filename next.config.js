module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAPBOX_API_TOKEN:
      "pk.eyJ1Ijoia2VudGJ1aSIsImEiOiJja2tmMmZncmYwMWx1Mm5ud244MHAyeXl1In0.V2nnOAQKO5O7t7mrg_eGJA",
    NEXT_PUBLIC_API_URL: "https://event-date-server.herokuapp.com",
    NEXT_PUBLIC_FRONTEND_URL: "https://eventdate.vercel.app",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
