"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Users, Plus, FlameIcon as Fire } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className="bg-black text-white sticky bottom-0 z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-around h-16">
          <Link href="/feed" className="flex flex-col items-center">
            <Home
              className={`h-6 w-6 ${pathname === "/feed" ? "text-[#F3C623]" : "text-white hover:text-[#F3C623]"} transition-colors`}
            />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link href="/chat" className="flex flex-col items-center">
            <MessageSquare
              className={`h-6 w-6 ${pathname === "/chat" ? "text-[#F3C623]" : "text-white hover:text-[#F3C623]"} transition-colors`}
            />
            <span className="text-xs mt-1">Chat</span>
          </Link>

          <Link href="/create" className="flex flex-col items-center">
            <div className="bg-[#F3C623] rounded-full p-3 -mt-8">
              <Plus className="h-6 w-6 text-black" />
            </div>
            <span className="text-xs mt-1">Create</span>
          </Link>

          <Link href="/public-chat" className="flex flex-col items-center">
            <Users
              className={`h-6 w-6 ${pathname === "/public-chat" ? "text-[#F3C623]" : "text-white hover:text-[#F3C623]"} transition-colors`}
            />
            <span className="text-xs mt-1">Public</span>
          </Link>

          <Link href="/taps" className="flex flex-col items-center">
            <Fire
              className={`h-6 w-6 ${pathname === "/taps" ? "text-[#F3C623]" : "text-white hover:text-[#F3C623]"} transition-colors`}
            />
            <span className="text-xs mt-1">Taps</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
