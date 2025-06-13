import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upload Strategy | Trade Crafter",
  description: "Upload your trading strategy to the marketplace."
}

export default function UploadStrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 