import Link from "next/link";
import BlogHeading from "../../blog-heading";

export default function TagNotFound() {
  return (
    <div className="flex flex-col items-center gap-8 min-h-[60vh] justify-center">
      <BlogHeading />
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tag Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find any posts with the specified tag.
        </p>
        
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
