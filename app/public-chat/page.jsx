import { useState, useRef, useEffect } from "react"
import { Button } from "../../src/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/Card"
import { Input } from "../../src/components/Input"
import Avatar from "../../src/components/Avatar"
import { Send, ImageIcon, Smile, Flag } from "lucide-react"

// Simple Badge component
const Badge = ({ children, variant = "outline", className = "" }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
    variant === "outline" ? "border-gray-200 text-gray-600" : "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
);

// Mock data for public chat rooms
const MOCK_ROOMS = [
  {
    id: 1,
    name: "Local Community",
    members: 120,
    description: "Chat with people in your local area about events, news, and community matters.",
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    members: 85,
    description: "Discuss the latest in technology, gadgets, and software developments.",
  },
  {
    id: 3,
    name: "Fitness & Health",
    members: 64,
    description: "Share tips, routines, and motivation for staying healthy and fit.",
  },
]

// Mock data for messages in a public chat room
const MOCK_PUBLIC_MESSAGES = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Hey everyone! Has anyone been to the new park downtown?",
    timestamp: "10:30 AM",
    reactions: { "👍": 3, "❤️": 1 },
    flagged: false,
  },
  {
    id: 2,
    user: {
      name: "Sam Wilson",
      username: "samw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Yes! It's amazing. They have a great playground for kids and nice walking paths.",
    timestamp: "10:32 AM",
    reactions: { "👍": 2 },
    flagged: false,
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      username: "jamies",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "I heard they're planning to add a food truck area next month too!",
    timestamp: "10:35 AM",
    reactions: { "🎉": 4, "😮": 2 },
    flagged: false,
  },
  {
    id: 4,
    user: {
      name: "Taylor Reed",
      username: "taylorreed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "This is some inappropriate content that might get flagged.",
    timestamp: "10:40 AM",
    reactions: {},
    flagged: true,
  },
]

export default function PublicChat() {
  const [activeRoom, setActiveRoom] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_PUBLIC_MESSAGES)
  const [rooms, setRooms] = useState(MOCK_ROOMS)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      user: {
        name: "You",
        username: "you",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: {},
      flagged: false,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReaction = (messageId, emoji) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const updatedReactions = { ...msg.reactions }
          if (updatedReactions[emoji]) {
            updatedReactions[emoji]++
          } else {
            updatedReactions[emoji] = 1
          }
          return { ...msg, reactions: updatedReactions }
        }
        return msg
      }),
    )
  }

  const handleFlag = (messageId) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          return { ...msg, flagged: true }
        }
        return msg
      }),
    )
  }

  const selectRoom = (roomId) => {
    setActiveRoom(roomId)
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <h1 className="text-2xl font-bold mb-4">Public Chat Rooms</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Available Rooms</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="px-4 py-2">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 mb-2 ${
                    activeRoom === room.id ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => selectRoom(room.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{room.name}</h3>
                    <Badge variant="outline">{room.members} online</Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{room.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {activeRoom ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{rooms.find((r) => r.id === activeRoom)?.name}</CardTitle>
                  <Badge variant="outline">{rooms.find((r) => r.id === activeRoom)?.members} members online</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[600px]">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={msg.flagged ? "opacity-50" : ""}>
                      <div className="flex items-start space-x-3">
                        <Avatar src={msg.user.avatar} alt={msg.user.name} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">{msg.user.name}</span>
                            <span className="text-xs text-gray-400 ml-2">@{msg.user.username}</span>
                            <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
                          </div>
                          <div className="mt-1">
                            <p className={msg.flagged ? "line-through text-gray-500" : ""}>{msg.content}</p>
                            {msg.flagged && (
                              <p className="text-xs text-red-500 mt-1 italic">This message has been flagged for review</p>
                            )}
                          </div>
                          <div className="flex items-center mt-2 space-x-2">
                            <div className="flex space-x-1">
                              {Object.entries(msg.reactions).map(([emoji, count]) => (
                                <Badge
                                  key={emoji}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleReaction(msg.id, emoji)}
                                >
                                  {emoji} {count}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => handleReaction(msg.id, "👍")}
                              >
                                👍
                              </Button>
                              <Button
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => handleReaction(msg.id, "❤️")}
                              >
                                ❤️
                              </Button>
                              <Button
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => handleReaction(msg.id, "🎉")}
                              >
                                🎉
                              </Button>
                              {!msg.flagged && (
                                <Button
                                  variant="ghost"
                                  className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
                                  onClick={() => handleFlag(msg.id)}
                                >
                                  <Flag className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t mt-auto">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="shrink-0">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="shrink-0">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-[500px]">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Select a room</h3>
                <p className="text-gray-500">Choose a public chat room from the list to join the conversation</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
