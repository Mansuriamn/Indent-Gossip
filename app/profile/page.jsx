"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, EyeOff, Settings, Shield, Lock, User, LogOut, HelpCircle, FileText } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProfilePage() {
  const [visibility, setVisibility] = useState(true)

  // Mock user data
  const userData = {
    username: "anonymous_user",
    profileViews: 245,
    postImpressions: 1892,
    savedPosts: 37,
    joinDate: "May 2024",
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 mb-20">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your profile and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="h-24 w-24 border-2 border-orange-400">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback className="bg-gray-800 text-xl">AU</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{userData.username}</h3>
                    <p className="text-sm text-gray-400">Member since {userData.joinDate}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
                    onClick={() => setVisibility(!visibility)}
                  >
                    {visibility ? (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hidden
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span>Profile Views</span>
                    <span className="font-bold">{userData.profileViews}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span>Post Impressions</span>
                    <span className="font-bold">{userData.postImpressions}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span>Saved Posts</span>
                    <span className="font-bold">{userData.savedPosts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <Tabs defaultValue="settings">
              <TabsList className="grid grid-cols-2 mb-6 bg-gray-900">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="content">My Content</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <Shield className="h-5 w-5 mr-3" />
                      Privacy and Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <Lock className="h-5 w-5 mr-3" />
                      Sign in & Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <Eye className="h-5 w-5 mr-3" />
                      Visibility
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <User className="h-5 w-5 mr-3" />
                      Data Privacy
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <HelpCircle className="h-5 w-5 mr-3" />
                      Help Center
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <FileText className="h-5 w-5 mr-3" />
                      Privacy Policy
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>My Posts</CardTitle>
                    <CardDescription>View and manage your posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-400">
                      <p>You haven&apos;t created any posts yet.</p>
                      <Button className="mt-4 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                        Create Your First Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
