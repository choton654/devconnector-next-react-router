const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rocky-crag-53197.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;

// "https://devconector-nextjs.choton654.vercel.app" ||
