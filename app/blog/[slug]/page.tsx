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
import { JSDOM } from "jsdom"; // install: npm i jsdom
import TableOfContents from "./TableOfContents";
import MobileCTAClient from "./MobileCTA";
import PostInternalLinks from "./PostInternalLinks";

function extractHeadings(html: string) {
  const dom = new JSDOM(html);
  const headings = [...dom.window.document.querySelectorAll("h2")];
  return headings.map((h) => ({
    id: h.id,
    text: h.textContent || "",
    level: h.tagName.toLowerCase(),
  }));
}

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

export const revalidate = 86400; // Revalidate every 10 minutes

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
  const updatedAt = post.updatedAt.toISOString();

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
      modifiedTime: updatedAt,
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

  const headings = extractHeadings(contentWithAnchors);

  return (
    <main className="mx-auto grid w-full max-w-[962px] grid-cols-1 gap-10 py-8 max-xl:overflow-hidden sm:px-4 xl:max-w-[1260px] xl:grid-cols-5">
      <div className="flex flex-col gap-10 xl:col-span-3">
        <article className="prose prose-pre:rounded-xl prose-pre:bg-gradient-to-br prose-pre:from-indigo-800 prose-pre:to-indigo-950 prose-pre:font-[600] prose-pre:text-white prose-pre:p-10 prose-pre:font-mono prose-pre:text-base prose-hr:opacity-10 prose-img:rounded-2xl sm:prose-p:text-xl sm:prose-li:text-xl sm:prose-li:leading-[38px] xl:prose-h2:pt-16 xl:prose-h3:pt-8 sm:prose-p:leading-[38px] prose-li:marker:text-primary prose-td:border-2 sm:prose-td:px-4 xl:prose-h1:text-5xl sm:prose-h2:text-3xl sm:prose-h3:text-2xl xl:prose-h1:leading-tight prose-th:border-2 prose-tr:border-2 prose-a:text-primary prose-a:no-underline min-h-screen max-w-4xl flex-1 xl:mx-auto">
          <div className="lg:px-16 xl:px-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            <h1>{post.title}</h1>

            <p className="mb-0 text-gray-500">{formattedDate}</p>
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
            className="drop-cap max-w-2xl lg:px-16 xl:px-0"
            dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
          />

          <PostInternalLinks />

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
      </div>

      <aside className="relative mx-auto hidden w-full max-w-xl lg:block xl:col-span-2">
        {/* Navigation Links */}

        <div className="sticky top-36">
          <TableOfContents headings={headings} />

          <Suspense fallback={<NextNativeCardSkeleton />}>
            <NextNativeCard post={{ slug }} />
          </Suspense>
        </div>
      </aside>

      {/* Pop-up */}
      {/* <script
        async
        src="https://eocampaign1.com/form/9870388e-6ee8-11f0-acfe-733f9fcd04f6.js"
        data-form="9870388e-6ee8-11f0-acfe-733f9fcd04f6"
      ></script> */}

      {/* Slide-in */}
      {/* <script
        className="shadow-lg"
        async
        src="https://eocampaign1.com/form/b5043f12-6ef3-11f0-826d-d372b1117e0b.js"
        data-form="b5043f12-6ef3-11f0-826d-d372b1117e0b"
      ></script> */}

      <MobileCTAClient showAfterPx={350}>
        <Suspense fallback={<NextNativeCardSkeleton />}>
          <NextNativeCard post={{ slug }} />
        </Suspense>
      </MobileCTAClient>
    </main>
  );
}
