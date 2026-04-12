import { useState } from "react"
import { Button } from "../../src/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/Card"
import Avatar from "../../src/components/Avatar"
import { FlameIcon as Fire, Clock } from "lucide-react"

// Simple Tabs implementation since the original was missing imports
const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {/* Search for TabsList and TabsContent to pass activeTab */}
      {React.Children.map(children, child => {
        if (child.type.name === 'TabsList' || child.type.name === 'TabsContent') {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        // Handle nested cases or functional components if needed
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
};

// Simplified Taps page using standard state instead of complex Tab components for reliability
export default function Taps() {
  const [activeTab, setActiveTab] = useState("received")
  const [receivedTaps, setReceivedTaps] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Sam Wilson",
        username: "samw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Jamie Smith",
        username: "jamies",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "1 day ago",
    },
  ])
  
  const [sentTaps, setSentTaps] = useState([
    {
      id: 1,
      user: {
        name: "Taylor Reed",
        username: "taylorreed",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "3 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Jordan Lee",
        username: "jordanl",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "2 days ago",
    },
  ])

  const handleTap = (userId) => {
    console.log(`Tapped user with ID: ${userId}`)
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Taps</h1>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "received" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-900"}`}
            onClick={() => setActiveTab("received")}
          >
            Received
          </button>
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "sent" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-900"}`}
            onClick={() => setActiveTab("sent")}
          >
            Sent
          </button>
        </div>
      </div>

      {activeTab === "received" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Fire className="h-5 w-5 mr-2 text-[#F3C623]" />
              Taps You've Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            {receivedTaps.length > 0 ? (
              <div className="space-y-4">
                {receivedTaps.map((tap) => (
                  <div
                    key={tap.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar src={tap.user.avatar} alt={tap.user.name} size="md" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{tap.user.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {tap.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleTap(tap.id)} className="flex-1 sm:flex-initial">
                        <Fire className="h-4 w-4 mr-1" />
                        Tap Back
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Fire className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <h3 className="text-lg font-medium mb-1">No taps yet</h3>
                <p className="text-gray-500">When someone taps you, they'll appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Fire className="h-5 w-5 mr-2 text-[#F3C623]" />
              Taps You've Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sentTaps.length > 0 ? (
              <div className="space-y-4">
                {sentTaps.map((tap) => (
                  <div
                    key={tap.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar src={tap.user.avatar} alt={tap.user.name} size="md" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{tap.user.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {tap.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Fire className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <h3 className="text-lg font-medium mb-1">No taps sent</h3>
                <p className="text-gray-500">When you tap someone, they'll appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
