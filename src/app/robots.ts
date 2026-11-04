import type { MetadataRoute } from "next";
import { robotsDocument } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return robotsDocument();
}
