import Image from "next/image";
import Link from "next/link";

export default function PostsGrid({ posts }: { posts: any[] }) {
    return <div className="prose prose-h1:text-5xl prose-h2:mt-7 mx-auto flex max-w-full flex-col items-center py-10">
        {posts.length > 0 ? ( 
          <>
            <ul className="grid list-none grid-cols-1 gap-8 space-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const formattedDate = new Date(
                  post.createdAt,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group no-underline"
                    >
                      <div>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="mb-3 rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                            quality={50}
                            sizes={"(max-width: 1200px) 60vw, 15vw"}
                            style={{
                              boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                        )}
                        <h2 className="group-hover:text-primary font-[600] transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 text-lg">{formattedDate}</p>
                        <p className="line-clamp-2 text-gray-800">{post.description}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No blog posts found.</p>
          </div>
        )}
      </div>
}