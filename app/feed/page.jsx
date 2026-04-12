"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, Flag, MessageSquare, Share2 } from "lucide-react"

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just launched my new project! Check it out and let me know what you think.",
    timestamp: "2 hours ago",
    likes: 24,
    dislikes: 2,
    comments: 8,
    reports: 0,
    flagStatus: "green", // green, red, or blank
  },
  {
    id: 2,
    user: {
      name: "Sam Wilson",
      username: "samw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Beautiful day for a hike! 🏔️ #nature #outdoors",
    timestamp: "5 hours ago",
    likes: 42,
    dislikes: 0,
    comments: 5,
    reports: 0,
    flagStatus: "green",
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      username: "jamies",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "This is a controversial post that might get reported by users.",
    timestamp: "1 day ago",
    likes: 5,
    dislikes: 15,
    comments: 20,
    reports: 8,
    flagStatus: "red",
  },
  {
    id: 4,
    user: {
      name: "Taylor Reed",
      username: "taylorreed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just posted this a few minutes ago. What do you all think?",
    timestamp: "10 minutes ago",
    likes: 3,
    dislikes: 0,
    comments: 1,
    reports: 0,
    flagStatus: "blank",
  },
]

export default function Feed() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [activeTab, setActiveTab] = useState("all")

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "green") return post.flagStatus === "green"
    if (activeTab === "red") return post.flagStatus === "red"
    return true // "all" tab
  })

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newLikes = post.likes + 1
          let flagStatus = post.flagStatus

          // Update flag status based on likes
          if (newLikes >= 10 && post.reports < 5) {
            flagStatus = "green"
          }

          return { ...post, likes: newLikes, flagStatus }
        }
        return post
      }),
    )
  }

  const handleDislike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newDislikes = post.dislikes + 1
          let flagStatus = post.flagStatus

          // Update flag status based on dislikes
          if (newDislikes >= 10) {
            flagStatus = "red"
          }

          return { ...post, dislikes: newDislikes, flagStatus }
        }
        return post
      }),
    )
  }

  const handleReport = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newReports = post.reports + 1
          let flagStatus = post.flagStatus

          // Update flag status based on reports
          if (newReports >= 5) {
            flagStatus = "red"
          }

          return { ...post, reports: newReports, flagStatus }
        }
        return post
      }),
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Feed</h1>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="green">Green Flag</TabsTrigger>
            <TabsTrigger value="red">Red Flag</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onReport={handleReport}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="green" className="mt-0">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onReport={handleReport}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="red" className="mt-0">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onReport={handleReport}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PostCard({ post, onLike, onDislike, onReport }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.user.name}</div>
              <div className="text-sm text-gray-500">
                @{post.user.username} · {post.timestamp}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {post.flagStatus === "green" && <div className="w-4 h-4 bg-green-500 rounded-full"></div>}
            {post.flagStatus === "red" && <div className="w-4 h-4 bg-red-500 rounded-full"></div>}
            {post.flagStatus === "blank" && <div className="w-4 h-4 border border-gray-300 rounded-full"></div>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between w-full">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" onClick={() => onLike(post.id)}>
              <ThumbsUp className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDislike(post.id)}>
              <ThumbsDown className="h-4 w-4 mr-1" />
              {post.dislikes}
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onReport(post.id)}>
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
