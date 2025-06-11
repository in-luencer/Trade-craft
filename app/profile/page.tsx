"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Mail, User, Phone, MapPin, Building, Save, BarChart4, Calendar, Clock, TrendingUp, Users, Star, MessageSquare, Share2 } from "lucide-react"
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

  // Mock trading statistics
  const tradingStats = {
    totalTrades: 156,
    winRate: 68.5,
    avgReturn: 12.3,
    followers: 234,
    following: 45,
    strategies: 8,
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
    },
    {
      id: 2,
      type: 'trade',
      title: 'BTC/USD Long Position',
      description: 'Opened a long position with 2.5% profit target',
      timestamp: '5 hours ago',
      likes: 8,
      comments: 2,
    },
  ]

  // Redirect if not authenticated
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
      <div className="grid gap-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Pro Trader</Badge>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
              </div>

              {/* Trading Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold">{tradingStats.totalTrades}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold">{tradingStats.winRate}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Return</p>
                  <p className="text-2xl font-bold">{tradingStats.avgReturn}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="text-2xl font-bold">{tradingStats.followers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Following</p>
                  <p className="text-2xl font-bold">{tradingStats.following}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Strategies</p>
                  <p className="text-2xl font-bold">{tradingStats.strategies}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          defaultValue={user.name}
                          className="pl-9"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={user.email}
                          className="pl-9"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          defaultValue={user.phone}
                          className="pl-9"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          defaultValue={user.location}
                          className="pl-9"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          name="company"
                          defaultValue={user.company}
                          className="pl-9"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
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
                            {isLoading ? "Saving..." : "Save Changes"}
                            {!isLoading && <Save className="ml-2 h-4 w-4" />}
                          </Button>
                        </>
                      ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity and Stats */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="strategies">Strategies</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{activity.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {activity.timestamp}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              {activity.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {activity.comments}
                            </span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="strategies">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      Your trading strategies will appear here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      Trading analytics and performance metrics will appear here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 