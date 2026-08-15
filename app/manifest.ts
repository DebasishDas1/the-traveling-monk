import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Traveling Monk",
    short_name: "Traveling Monk",
    description: "Premium Treks & Transformational Travel across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFCF8", // parchment
    theme_color: "#1A2E1F", // forest
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
