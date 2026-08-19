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

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = match[1];
    const monthIndex = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${day} ${months[monthIndex]} ${year}`;
    }
  }
  return dateStr;
}
