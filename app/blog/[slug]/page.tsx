"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { AdSpace } from "@/components/ad-space"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState(blogPosts.find((post) => post.slug === slug))
  const [relatedPosts, setRelatedPosts] = useState(
    blogPosts
      .filter(
        (p) => p.slug !== slug && (p.category === post?.category || p.tags.some((tag) => post?.tags.includes(tag))),
      )
      .slice(0, 3),
  )

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0)

    // Update post and related posts when slug changes
    const currentPost = blogPosts.find((p) => p.slug === slug)
    setPost(currentPost)

    if (currentPost) {
      setRelatedPosts(
        blogPosts
          .filter(
            (p) =>
              p.slug !== slug &&
              (p.category === currentPost.category || p.tags.some((tag) => currentPost.tags.includes(tag))),
          )
          .slice(0, 3),
      )
    }
  }, [slug])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
        <p className="mb-6">The requested blog post could not be found.</p>
        <Link href="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    )
  }

  // Function to convert markdown headings to HTML
  const renderContent = () => {
    let content = post.content

    // Convert markdown headings to HTML headings with classes
    content = content.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    content = content.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    content = content.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')

    // Convert markdown lists to HTML lists
    content = content.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    content = content.replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    content = content.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$2</li>')

    // Wrap adjacent list items in ul/ol tags
    content = content.replace(/<\/li>\n<li class="ml-6 list-disc">/g, '</li>\n<li class="ml-6 list-disc">')
    content = content.replace(/<\/li>\n<li class="ml-6 list-decimal">/g, '</li>\n<li class="ml-6 list-decimal">')
    content = content.replace(/(<li class="ml-6 list-disc">.*<\/li>)/gs, '<ul class="my-4">$1</ul>')
    content = content.replace(/(<li class="ml-6 list-decimal">.*<\/li>)/gs, '<ol class="my-4">$1</ol>')

    // Convert markdown paragraphs to HTML paragraphs
    content = content.replace(/^(?!<[h|u|o|l])(.*$)/gm, (match) => {
      if (match.trim() === "") return match
      return `<p class="my-4">${match}</p>`
    })

    // Convert markdown bold to HTML strong
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Convert markdown italic to HTML em
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>")

    return content
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!")
        })
        .catch((error) => {
          console.error("Could not copy text: ", error)
        })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="w-full mb-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6">
                <div className="flex items-center mr-4 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-1" />
                  <Link
                    href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-primary"
                  >
                    {post.category}
                  </Link>
                </div>
              </div>

              {post.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                  <img
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              )}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderContent() }} />

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="outline" size="sm" className="mb-2">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-medium">{post.author}</p>
              </div>
              <Button onClick={handleShare} variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </article>

          <AdSpace className="mt-8" />
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-20">
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2 text-sm">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.map((p) => p.category))).map((category) => (
                  <Link key={category} href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="outline" size="sm" className="mb-2">
                      {category}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <AdSpace height="h-[400px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

