"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { AdSpace } from "@/components/ad-space"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  // Convert slug to category name (e.g., "digital-id-cards" to "Digital ID Cards")
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const [posts, setPosts] = useState(
    blogPosts.filter((post) => post.category.toLowerCase().replace(/\s+/g, "-") === slug),
  )

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">No Posts Found</h1>
        <p className="mb-6">No posts were found in this category.</p>
        <Link href="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">Category: {categoryName}</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Browsing {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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

      <AdSpace className="mt-12" />
    </div>
  )
}

