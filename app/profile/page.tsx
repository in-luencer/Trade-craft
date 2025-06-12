"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Mail, User, Phone, MapPin, Building, Save, BarChart4, Calendar, Clock, TrendingUp, Users, Star, MessageSquare, Share2, Wallet, Award, ChartBar } from "lucide-react"
import { useAuth } from "@/context/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateProfile, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock trading statistics
  const tradingStats = {
    totalTrades: 156,
    winRate: 68.5,
    avgReturn: 12.3,
    followers: 234,
    following: 45,
    strategies: 8,
    totalRevenue: 15420,
    successfulStrategies: 6,
  }

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'strategy',
      title: 'MACD Crossover Strategy',
      description: 'Created a new trading strategy',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 3,
      price: 49.99,
    },
    {
      id: 2,
      type: 'trade',
      title: 'BTC/USD Long Position',
      description: 'Opened a long position with 2.5% profit target',
      timestamp: '5 hours ago',
      likes: 8,
      comments: 2,
      profit: 320,
    },
  ]

  if (!authLoading && !user) {
    router.push('/login')
    return null
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = {
        name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
        email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
        phone: (e.currentTarget.elements.namedItem('phone') as HTMLInputElement).value,
        location: (e.currentTarget.elements.namedItem('location') as HTMLInputElement).value,
        company: (e.currentTarget.elements.namedItem('company') as HTMLInputElement).value,
      }

      await updateProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="container max-w-7xl py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Profile Overview */}
        <div className="md:col-span-1">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-yellow-400/20 via-purple-400/20 to-primary/20" />
            <CardContent className="pt-28 pb-8">
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={user?.avatar || ''} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="border-yellow-400/60">Pro Trader</Badge>
                  <Badge variant="outline" className="border-purple-400/60">Strategy Creator</Badge>
                </div>
                <p className="text-muted-foreground">{user?.company || user?.location || 'No bio added yet'}</p>
                <div className="flex justify-center gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{tradingStats.followers ?? 0}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">{tradingStats.strategies ?? 0}</p>
                    <p className="text-sm text-muted-foreground">Strategies</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">${tradingStats.totalRevenue?.toLocaleString?.() ?? '0'}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Statistics */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl">Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold">{tradingStats.totalTrades}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-green-500">{tradingStats.winRate}%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Avg. Return</p>
                  <p className="text-2xl font-bold text-green-500">+{tradingStats.avgReturn}%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Successful Strategies</p>
                  <p className="text-2xl font-bold">{tradingStats.successfulStrategies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest trading and strategy activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          {activity.type === 'strategy' ? (
                            <ChartBar className="h-4 w-4 text-primary" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.comments}</span>
                            </div>
                            {activity.price && (
                              <div className="flex items-center gap-1">
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">${activity.price}</span>
                              </div>
                            )}
                            {activity.profit && (
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">+${activity.profit}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        defaultValue={user.name}
                        disabled={!isEditing || isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing || isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        defaultValue={user.phone}
                        disabled={!isEditing || isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        defaultValue={user.location}
                        disabled={!isEditing || isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        defaultValue={user.company}
                        disabled={!isEditing || isLoading}
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}