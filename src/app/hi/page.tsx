import { notFound } from "next/navigation";
import { publishedHindiRoutes } from "@/lib/i18n";

export const revalidate = 86400;

export default function HindiRootPage() {
  // If Hindi home content is not published yet, cleanly return 404
  if (!publishedHindiRoutes.has("/")) {
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
