const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://devconector-nextjs.choton654.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
