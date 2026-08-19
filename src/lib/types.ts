export interface BlogPost {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  date: string;
  dateModified?: string;
  readTime: string;
  category: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  authorAffiliation: string;
  contentHtml: string;
  faqs?: { q: string; a: string }[];
}
