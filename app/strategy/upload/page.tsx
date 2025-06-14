'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, Image, Video, FileText, DollarSign, Plus, X, Eye, HelpCircle } from "lucide-react"
import { uploadStrategy } from "@/app/actions/strategy"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import StrategyProductClient from "@/app/strategy/[slug]/StrategyProductClient"
import type { Metadata } from "next"

// Dummy data for demonstration - replace with actual strategy data from your system
const AVAILABLE_STRATEGIES = [
  { id: '1', name: 'Moving Average Crossover', description: 'A classic trend-following strategy using two moving averages.' },
  { id: '2', name: 'RSI Strategy', description: 'Momentum-based strategy using the Relative Strength Index.' },
  { id: '3', name: 'MACD Strategy', description: 'Uses MACD indicator for entry and exit signals.' },
  { id: '4', name: 'Bollinger Bands Strategy', description: 'Volatility breakout strategy using Bollinger Bands.' }
]

export default function UploadStrategyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const [photos, setPhotos] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [showMoreMedia, setShowMoreMedia] = useState(false)
  const [premiumFeatures, setPremiumFeatures] = useState<string[]>([""])
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }])
  const [strategyDetails, setStrategyDetails] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)

  useEffect(() => {
    const found = AVAILABLE_STRATEGIES.find(s => s.id === selectedStrategy)
    setStrategyDetails(found || null)
  }, [selectedStrategy])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photos' | 'videos') => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      const isValidType = type === 'photos' ? file.type.startsWith('image/') : file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // Limit file size to 50MB
      return isValidType && isValidSize;
    });
    if (validFiles.length > 0) {
      if (type === 'photos') {
        setPhotos(prev => [...prev, ...validFiles])
      } else {
        setVideos(prev => [...prev, ...validFiles])
      }
    } else {
      toast.error("Invalid file type or size. Please upload valid files.");
    }
  }

  const removeFile = (type: 'photos' | 'videos', index: number) => {
    if (type === 'photos') {
      setPhotos(prev => prev.filter((_, i) => i !== index))
    } else {
      setVideos(prev => prev.filter((_, i) => i !== index))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      
      // Add media files to formData
      photos.forEach((photo, index) => {
        formData.append(`photo${index}`, photo)
      })
      
      videos.forEach((video, index) => {
        formData.append(`video${index}`, video)
      })

      premiumFeatures.forEach((feature, idx) => {
        formData.append(`premiumFeature${idx}`, feature)
      })
      faqs.forEach((faq, idx) => {
        formData.append(`faqQuestion${idx}`, faq.question)
        formData.append(`faqAnswer${idx}`, faq.answer)
      })

      const result = await uploadStrategy(formData)

      if (result.success) {
        toast.success('Strategy uploaded successfully!')
        // Navigate to the strategy page
        router.push(`/strategy/${result.strategyId}`)
      } else {
        toast.error(result.message || 'Failed to upload strategy')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = (e?: React.MouseEvent) => {
    if (!selectedStrategy) {
      toast.error('Please select a strategy first')
      return
    }
    // Gather all form data for preview
    const form = document.querySelector('form') as HTMLFormElement
    const formData = new FormData(form)
    
    // Create preview data with all necessary fields
    const previewData = {
      title: formData.get('title') || '',
      badge: "Preview",
      description: formData.get('description') || '',
      rating: 4.5,
      reviews: 0,
      price: formData.get('price') ? `$${formData.get('price')}` : '$0.00',
      image: photos[0] ? URL.createObjectURL(photos[0]) : '/logo.png',
      features: premiumFeatures.filter(f => f),
      faqs: faqs.filter(f => f.question && f.answer).map(f => ({
        question: f.question,
        answer: f.answer
      })),
      stats: [
        { icon: "TrendingUp", label: "Win Rate", value: "70%" },
        { icon: "Shield", label: "Max Drawdown", value: "5.0%" },
        { icon: "Zap", label: "Avg. Trades/Month", value: "20" },
        { icon: "Star", label: "User Rating", value: "4.5/5" }
      ],
      videos: videos.length > 0 ? videos.map(v => URL.createObjectURL(v)) : [],
      strategy: AVAILABLE_STRATEGIES.find(s => s.id === selectedStrategy),
    }
    setPreviewData(previewData)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent">
            Upload Your Strategy
          </h1>
          {/* Show strategy details after selection */}
          {strategyDetails && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Selected Strategy Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{strategyDetails.name}</div>
                <div className="text-muted-foreground">{strategyDetails.description}</div>
              </CardContent>
            </Card>
          )}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-6xl w-full p-0 bg-transparent shadow-none">
              <DialogHeader>
                <DialogTitle>Strategy Landing Page Preview</DialogTitle>
              </DialogHeader>
              {previewData && (
                <div className="bg-background rounded-xl overflow-auto max-h-[80vh]">
                  <StrategyProductClient
                    params={{ slug: 'preview' }}
                    staticProduct={previewData}
                    previewData={previewData}
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Strategy Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a catchy title for your strategy"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategyId">Select Strategy</Label>
                  <Select
                    name="strategyId"
                    value={selectedStrategy}
                    onValueChange={setSelectedStrategy}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_STRATEGIES.map(strategy => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Strategy Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your strategy, its benefits, and how it works..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter the price for your strategy"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Media Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photos Section */}
                <div className="space-y-4">
                  <Label>Strategy Photos</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`Strategy photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile('photos', index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="photos"
                        onChange={(e) => handleFileChange(e, 'photos')}
                        multiple
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('photos')?.click()}
                        className="w-full h-full min-h-[12rem] flex flex-col items-center justify-center gap-2"
                      >
                        <Plus className="h-8 w-8 text-primary" />
                        <span>Add Photos</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Videos Section */}
                <div className="space-y-4">
                  <Label>Strategy Videos</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video 
                          src={URL.createObjectURL(video)} 
                          className="w-full h-48 object-cover rounded-lg"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeFile('videos', index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center">
                      <Input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        id="videos"
                        onChange={(e) => handleFileChange(e, 'videos')}
                        multiple
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('videos')?.click()}
                        className="w-full h-full min-h-[12rem] flex flex-col items-center justify-center gap-2"
                      >
                        <Plus className="h-8 w-8 text-primary" />
                        <span>Add Videos</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Features (dynamic) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {premiumFeatures.map((feature, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={feature}
                      onChange={e => {
                        const arr = [...premiumFeatures]
                        arr[idx] = e.target.value
                        setPremiumFeatures(arr)
                      }}
                      placeholder="Enter a premium feature of your strategy"
                      required={idx === 0}
                    />
                    <Button type="button" variant="ghost" onClick={() => setPremiumFeatures(premiumFeatures.filter((_, i) => i !== idx))} disabled={premiumFeatures.length === 1}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setPremiumFeatures([...premiumFeatures, ""])}>
                  <Plus className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </CardContent>
            </Card>
            {/* FAQ (dynamic) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="flex flex-col gap-2 mb-2 border-b pb-2">
                    <Input
                      value={faq.question}
                      onChange={e => {
                        const arr = [...faqs]
                        arr[idx].question = e.target.value
                        setFaqs(arr)
                      }}
                      placeholder="Enter a frequently asked question"
                      required={idx === 0}
                    />
                    <Textarea
                      value={faq.answer}
                      onChange={e => {
                        const arr = [...faqs]
                        arr[idx].answer = e.target.value
                        setFaqs(arr)
                      }}
                      placeholder="Enter the answer to the question"
                      className="min-h-[100px]"
                      required={idx === 0}
                    />
                    <Button type="button" variant="ghost" onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))} disabled={faqs.length === 1}>
                      <X className="h-4 w-4" /> Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}>
                  <Plus className="h-4 w-4 mr-1" /> Add FAQ
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button 
                type="button"
                variant="outline"
                size="lg" 
                className="text-lg px-8 py-4 font-bold"
                onClick={handlePreview}
                disabled={!selectedStrategy}
              >
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="text-lg px-8 py-4 font-bold shadow-lg bg-gradient-to-r from-yellow-400 via-primary to-purple-400 text-zinc-900 hover:scale-105 transition-transform"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Uploading...' : 'Upload Strategy'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}