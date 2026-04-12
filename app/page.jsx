import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Social Platform</h1>
        <p className="text-lg mb-8">
          Connect with others, share content, and join conversations in a safe environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Share Your Thoughts</h2>
            <p className="mb-4">Create posts, get feedback, and build your reputation with our flag system.</p>
            <Link href="/signup">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Connect with Others</h2>
            <p className="mb-4">Chat privately or join public rooms to discuss topics with like-minded people.</p>
            <Link href="/chat">
              <Button variant="outline" className="w-full">
                Explore Chats
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Flag System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-green-500 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full mb-2"></div>
              <h3 className="font-medium">Green Flag</h3>
              <p className="text-sm">Quality content with 10+ likes and fewer than 5 reports</p>
            </div>

            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 rounded-full mb-2"></div>
              <h3 className="font-medium">Blank Flag</h3>
              <p className="text-sm">Newly posted content awaiting community feedback</p>
            </div>

            <div className="p-4 border border-red-500 rounded-lg">
              <div className="w-6 h-6 bg-red-500 rounded-full mb-2"></div>
              <h3 className="font-medium">Red Flag</h3>
              <p className="text-sm">Content with 10+ dislikes or 5+ reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
