import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { AdSpace } from "@/components/ad-space"
import { blogPosts } from "@/lib/blog-data"

export const metadata = {
  title: "Blog | ID Card & Certificate Generator | situp.online",
  description: "Learn about ID cards, certificates, and best practices for creating professional credentials",
}

export default function BlogPage() {
  // Get featured posts (first 3)
  const featuredPosts = blogPosts.slice(0, 3)

  // Get remaining posts
  const remainingPosts = blogPosts.slice(3)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">Blog</h1>
          <p className="text-muted-foreground mt-2 text-center max-w-2xl">
            Insights, tips, and best practices for creating professional ID cards and certificates
          </p>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  crossOrigin="anonymous"
                />
              </div>
              <CardHeader className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readingTime} min read</span>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <AdSpace className="max-w-5xl" />

      {/* All Posts */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map((post) => (
            <Card key={post.slug} className="h-full flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{post.category}</span>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <AdSpace className="max-w-5xl" />

      {/* Categories */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(blogPosts.map((post) => post.category))).map((category) => (
            <Link key={category} href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

