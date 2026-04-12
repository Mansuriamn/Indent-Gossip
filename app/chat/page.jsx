import { useState } from "react"
import Avatar from "../../src/components/Avatar"
import { Button } from "../../src/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/Card"
import { Input } from "../../src/components/Input"
import { Send, ImageIcon, Smile } from "lucide-react"

// Simple Badge component
const Badge = ({ children, variant = "outline", className = "" }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
    variant === "outline" ? "border-gray-200 text-gray-600" : "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
);

// Mock data for chats
const MOCK_CHATS = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    lastMessage: "Hey, how's it going?",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Sam Wilson",
      username: "samw",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    lastMessage: "Did you see the new movie?",
    timestamp: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      username: "jamies",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    lastMessage: "Let's meet up tomorrow!",
    timestamp: "3h ago",
    unread: 0,
  },
]

// Mock data for messages
const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "other",
    content: "Hey, how's it going?",
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "me",
    content: "Not bad! Just working on a new project. How about you?",
    timestamp: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    sender: "other",
    content: "I'm good too. Just wanted to check in. Are you free this weekend?",
    timestamp: "10:33 AM",
    read: true,
  },
  {
    id: 4,
    sender: "me",
    content: "Yes, I should be free on Saturday afternoon. What did you have in mind?",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: 5,
    sender: "other",
    content: "Great! There's a new cafe downtown I wanted to check out. How does that sound?",
    timestamp: "10:36 AM",
    read: false,
  },
]

export default function Chat() {
  const [activeTab, setActiveTab] = useState("private")
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [chats, setChats] = useState(MOCK_CHATS)

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    handleSendMessage();
  };

  const selectChat = (chatId) => {
    setActiveChat(chatId);
    setChats(chats.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat)))
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Chat</h1>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "private" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-900"}`}
            onClick={() => setActiveTab("private")}
          >
            Private
          </button>
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "public" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-900"}`}
            onClick={() => setActiveTab("public")}
          >
            Public Rooms
          </button>
        </div>
      </div>

      {activeTab === "private" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto max-h-[600px]">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center space-x-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      activeChat === chat.id ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                    onClick={() => selectChat(chat.id)}
                  >
                    <div className="relative shrink-0">
                      <Avatar src={chat.user.avatar} alt={chat.user.name} size="md" />
                      {chat.user.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{chat.user.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-medium">{chat.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="flex-shrink-0 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-gray-200 dark:border-gray-700">
            {activeChat ? (
              <div className="flex flex-col h-[600px]">
                <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={chats.find((c) => c.id === activeChat)?.user.avatar} 
                      alt={chats.find((c) => c.id === activeChat)?.user.name} 
                      size="sm"
                    />
                    <div>
                      <CardTitle className="text-lg leading-tight">{chats.find((c) => c.id === activeChat)?.user.name}</CardTitle>
                      <div className="flex items-center mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${chats.find((c) => c.id === activeChat)?.user.online ? "bg-green-500" : "bg-gray-300"}`}></span>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold">
                          {chats.find((c) => c.id === activeChat)?.user.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/30 dark:bg-gray-900/10">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                          msg.sender === "me"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <div
                          className={`text-[10px] mt-1 flex items-center font-medium ${
                            msg.sender === "me" ? "text-indigo-100 justify-end" : "text-gray-400"
                          }`}
                        >
                          {msg.timestamp}
                          {msg.sender === "me" && <span className="ml-1 text-[8px]">{msg.read ? "●●" : "●"}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
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
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] bg-gray-50/30 dark:bg-gray-900/10">
                <div className="text-center p-8 max-w-sm">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Messages</h3>
                  <p className="text-gray-500 text-sm">Select a conversation from the sidebar to start chattting with other gossipers.</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Public Chat Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Local Community", members: 120, desc: "Chat with people in your local area about events, news, and community matters." },
                { name: "Tech Enthusiasts", members: 85, desc: "Discuss the latest in technology, gadgets, and software developments." },
                { name: "Fitness & Health", members: 64, desc: "Share tips, routines, and motivation for staying healthy and fit." }
              ].map((room) => (
                <Card key={room.name} className="border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <p className="text-xs text-green-500 font-bold uppercase tracking-wider">{room.members} Active Now</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {room.desc}
                    </p>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Join Room</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
