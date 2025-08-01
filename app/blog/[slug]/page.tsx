import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import NextNativeCard from "./NextNativeCard";
import { Suspense } from "react";
import NextNativeCardSkeleton from "./NextNativeCardSkeleton";
import { rehype } from "rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

async function addAnchorsToHeadings(html: string): Promise<string> {
  const result = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["inline-anchor"],
      },
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: ["text-gray-400", "text-lg", "ml-2"],
        },
        children: [{ type: "text", value: "#" }],
      },
    })
    .process(html);

  return result.toString();
}

export const revalidate = 600; // Revalidate every 10 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return {};

  const publishedAt = post.createdAt.toISOString();

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://nextnative.dev/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : [],
      publishedTime: publishedAt,
      authors: ["https://nextnative.dev"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `https://nextnative.dev/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contentWithAnchors = await addAnchorsToHeadings(post.contentHtml);

  return (
    <main className="mx-auto grid w-full max-w-[962px] grid-cols-1 gap-10 py-8 max-xl:overflow-hidden sm:px-4 xl:max-w-[1260px]">
      <article className="prose prose-img:rounded-2xl sm:prose-p:text-xl xl:prose-h2:pt-16 xl:prose-h3:pt-8 prose-table:bg-white sm:prose-p:leading-loose prose-li:marker:text-primary prose-td:border sm:prose-td:px-4 prose-table:prose-p:text-xs xl:prose-h1:text-5xl sm:prose-h2:text-3xl sm:prose-h3:text-2xl xl:prose-h1:leading-tight prose-th:border prose-tr:border prose-a:text-primary prose-a:no-underline min-h-screen max-w-4xl flex-1 xl:mx-auto">
        <div className="xl:px-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <h1>{post.title}</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
            className="my-6 w-full rounded-4xl"
          />
        )}

        {/* <p>{post.description}</p> */}

        <div
          className="xl:px-16"
          dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image: post.image,
              author: {
                "@type": "Person",
                name: "Denis Tarasenko",
              },
              publisher: {
                "@type": "Organization",
                name: "NextNative.dev",
                logo: {
                  "@type": "ImageObject",
                  url: "https://nextnative.dev/nextnative-logo.png",
                },
              },
              datePublished: post.createdAt,
              mainEntityOfPage: `https://nextnative.dev/blog/${post.slug}`,
            }),
          }}
        />
      </article>

      <aside className="relative mx-auto hidden w-full max-w-md lg:block">
        <Suspense fallback={<NextNativeCardSkeleton />}>
          <NextNativeCard post={{ slug }} />
          <script
            async
            src="https://eocampaign1.com/form/b5043f12-6ef3-11f0-826d-d372b1117e0b.js"
            data-form="b5043f12-6ef3-11f0-826d-d372b1117e0b"
          ></script>
        </Suspense>
      </aside>
      <script
        async
        src="https://eocampaign1.com/form/9870388e-6ee8-11f0-acfe-733f9fcd04f6.js"
        data-form="9870388e-6ee8-11f0-acfe-733f9fcd04f6"
      ></script>
    </main>
  );
}
