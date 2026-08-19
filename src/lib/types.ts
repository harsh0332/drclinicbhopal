export interface BlogPost {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  date: string;
  dateModified?: string;
  category: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  authorAffiliation: string;
  contentHtml: string;
  faqs?: { q: string; a: string }[];
}

export function calculateReadTime(contentHtml: string): string {
  const text = contentHtml.replace(/<[^>]+>/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
