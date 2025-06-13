'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { uploadToS3 } from '@/lib/s3'
import { PrismaClient } from '@prisma/client'

// Validation schema for strategy upload
const strategySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  strategyId: z.string().min(1, 'Please select a strategy'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  price: z.number().min(0, 'Price must be positive'),
  premiumFeature: z.string().optional(),
  faqQuestion: z.string().optional(),
  faqAnswer: z.string().optional(),
  creatorName: z.string().min(1, 'Creator name is required'),
  creatorTitle: z.string().min(1, 'Creator title is required'),
  creatorBio: z.string().min(1, 'Creator bio is required'),
})

export type StrategyFormData = z.infer<typeof strategySchema>

export async function uploadStrategy(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = {
      title: formData.get('title'),
      strategyId: formData.get('strategyId'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      premiumFeature: formData.get('premiumFeature'),
      faqQuestion: formData.get('faq-question'),
      faqAnswer: formData.get('faq-answer'),
      creatorName: formData.get('creatorName'),
      creatorTitle: formData.get('creatorTitle'),
      creatorBio: formData.get('creatorBio'),
    }

    // Validate the data
    const validatedData = strategySchema.parse(rawData)

    // Get strategy performance data from your system
    const strategyPerformance = await fetchStrategyPerformance(validatedData.strategyId)

    // Create strategy in database with transaction to ensure all related data is created
    const strategy = await prisma.$transaction(async (tx: any) => {
      // Create the strategy
      const strategy = await tx.strategy.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          price: validatedData.price,
          winRate: strategyPerformance.winRate,
          
          maxDrawdown: strategyPerformance.maxDrawdown,
          avgTrades: strategyPerformance.avgTrades,
          backtestPeriod: strategyPerformance.backtestPeriod,
          creatorName: validatedData.creatorName,
          creatorTitle: validatedData.creatorTitle,
          creatorBio: validatedData.creatorBio,
          premiumFeatures: validatedData.premiumFeature ? {
            create: [{
              description: validatedData.premiumFeature
            }]
          } : undefined,
          faqs: (validatedData.faqQuestion && validatedData.faqAnswer) ? {
            create: [{
              question: validatedData.faqQuestion,
              answer: validatedData.faqAnswer
            }]
          } : undefined
        }
      })

      // Handle media file uploads
      // Upload photos
      for (let i = 0; formData.get(`photo${i}`); i++) {
        const photo = formData.get(`photo${i}`) as File
        const url = await uploadToS3(photo, 'strategies/photos')
        await tx.photo.create({
          data: {
            url,
            strategyId: strategy.id
          }
        })
      }

      // Upload videos
      for (let i = 0; formData.get(`video${i}`); i++) {
        const video = formData.get(`video${i}`) as File
        const url = await uploadToS3(video, 'strategies/videos')
        await tx.video.create({
          data: {
            url,
            strategyId: strategy.id
          }
        })
      }

      return strategy
    })

    // Revalidate the marketplace page to show the new strategy
    revalidatePath('/marketplace')
    
    return { 
      success: true, 
      message: 'Strategy uploaded successfully',
      strategyId: strategy.id
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation failed', 
        errors: error.errors 
      }
    }
    console.error('Strategy upload error:', error)
    return { 
      success: false, 
      message: 'Failed to upload strategy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// This function should be implemented to fetch strategy performance data from your system
async function fetchStrategyPerformance(strategyId: string) {
  // TODO: Implement actual strategy performance data fetching
  return {
    name: 'Moving Average Crossover', // This should come from your system
    winRate: 72,
    maxDrawdown: 4.2,
    avgTrades: 18,
    backtestPeriod: 12
  }
}