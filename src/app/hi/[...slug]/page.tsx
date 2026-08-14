import { notFound } from "next/navigation";
import { publishedHindiRoutes } from "@/lib/i18n";

export const revalidate = 86400;

interface HindiCatchAllProps {
  params: Promise<{ slug: string[] }>;
}

// Generate static params for published Hindi routes
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  publishedHindiRoutes.forEach((route) => {
    if (route !== "/") {
      const parts = route.replace(/^\//, "").split("/");
      params.push({ slug: parts });
    }
  });
  return params;
}

export default async function HindiCatchAllPage({ params }: HindiCatchAllProps) {
  const { slug } = await params;
  const path = "/" + (slug ? slug.join("/") : "");

  // If the requested Hindi path is not published, return 404
  if (!publishedHindiRoutes.has(path)) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold font-heading text-primary-dark">
          बेबी स्टेप्स क्लिनिक
        </h1>
      </div>
    </main>
  );
}
