import Navbar from "../components/Navbar";
import PublicFooter from "../components/PublicFooter";
import { Calendar, ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    title: "5 tips to structure your next coding assignment",
    excerpt: "A clear structure makes your code easier to grade, debug, and extend. Here's how our developers approach it.",
    date: "May 18, 2026",
    tag: "Guides",
  },
  {
    title: "How we keep every solution plagiarism-free",
    excerpt: "A behind-the-scenes look at the review process every assignment goes through before it reaches you.",
    date: "Apr 30, 2026",
    tag: "Inside Slot",
  },
  {
    title: "Choosing the right tech stack for your final year project",
    excerpt: "From React to Flutter to Django — a practical comparison to help you pick what fits your project and timeline.",
    date: "Apr 9, 2026",
    tag: "Guides",
  },
  {
    title: "What makes a great developer on our platform",
    excerpt: "We talk to three top-rated developers about what it takes to deliver consistently great assignment solutions.",
    date: "Mar 22, 2026",
    tag: "Community",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <span className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
          From the blog
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4">
          Stories, guides &amp; updates from <span className="text-green-500">Slot</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
          Tips for students, behind-the-scenes looks at how we work, and updates from the platform.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-green-400 dark:hover:border-green-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/15 px-2.5 py-1 rounded-full">
                  {post.tag}
                </span>
                <ArrowUpRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-green-500 transition-colors" />
              </div>
              <h2 className="font-semibold text-lg mt-4">{post.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">{post.excerpt}</p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mt-4">
                <Calendar size={12} />
                {post.date}
              </p>
            </article>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
