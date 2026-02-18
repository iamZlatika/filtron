import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"], // Закрываем служебные пути
    },
    sitemap: "https://filtron.zp.ua/sitemap.xml",
  };
}
