import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://filtron.zp.ua";
  const locales = ["uk", "ru"];
  const pages = [
    "",
    "/about-us",
    "/contacts",
    "/services",
    "/wix-filters",
    "/autoparts",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = `${baseUrl}${locale === "uk" ? "" : "/ru"}${page}`;
      sitemapEntries.push({
        url: url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
