import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const tag = searchParams.get("tag");
    const postsPerPage = 6;

    // Validate page parameter
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 },
      );
    }

    const skip = (page - 1) * postsPerPage;

    // Build where clause based on whether we're filtering by tag
    const whereClause = tag
      ? {
          tags: {
            has: tag,
          },
        }
      : {};

    // Get total count
    const totalPosts = await prisma.blogPost.count({
      where: whereClause,
    });

    // Fetch posts
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      skip,
      take: postsPerPage,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        createdAt: true,
        tags: true,
      },
    });

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return NextResponse.json({
      posts,
      totalPages,
      currentPage: page,
      totalPosts,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
