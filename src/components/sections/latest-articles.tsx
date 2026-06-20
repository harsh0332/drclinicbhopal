"use client";

import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export default function LatestArticles() {
  const articles = [
    {
      title: "Essential Immunization Guide: Protecting Your Newborn",
      excerpt: "An educational overview of the primary vaccination schedule recommended by the IAP during the first six months.",
      date: "Jun 15, 2026",
      readTime: "5 min read",
      category: "Vaccination",
      author: "Dr. Sudarshan Dev Arya",
    },
    {
      title: "Breastfeeding Techniques: Clinical Tips for New Mothers",
      excerpt: "Understanding proper latch, positioning, feed frequency, and growth monitoring criteria for breastfed infants.",
      date: "Jun 08, 2026",
      readTime: "6 min read",
      category: "Nutrition",
      author: "Dr. Manisha Bangarwa Arya",
    },
    {
      title: "Recognizing Normal Physiological Milestones at 6 Months",
      excerpt: "Factual indicators of physical, language, and motor skills development in infants and when to consult a specialist.",
      date: "May 28, 2026",
      readTime: "4 min read",
      category: "Milestones",
      author: "Dr. Sudarshan Dev Arya",
    }
  ];

  return (
    <section id="blog" className="py-20 bg-surface-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block w-max mx-auto md:mx-0">
              Education Blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
              Latest educational articles
            </h2>
            <p className="text-sm text-muted-text font-sans leading-relaxed">
              Factual, evidence-based health guidance authored by our pediatric specialists.
            </p>
          </div>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-primary-dark font-semibold text-sm py-3 px-6 rounded-2xl hover:bg-gray-50 shadow-soft active:scale-[0.98] transition-all"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>View all articles</span>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white border border-gray-150 rounded-3xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden text-left"
            >
              {/* Card Header Tag */}
              <div className="p-6 pb-2">
                <span className="text-[10px] font-bold text-primary bg-surface-tint border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="px-6 flex-grow flex flex-col gap-3">
                <h3 className="text-lg font-bold font-heading text-primary-dark leading-snug line-clamp-2 hover:text-primary transition-colors">
                  <Link href="/blog">{article.title}</Link>
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="p-6 mt-auto border-t border-gray-50 flex flex-col gap-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-muted-text font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
                {/* Author credentials */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-primary-dark font-sans">
                    By {article.author}
                  </span>
                  <Link
                    href="/blog"
                    className="p-1.5 border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-lg transition-all"
                    aria-label="Read Article"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
