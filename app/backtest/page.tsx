import type { Metadata } from "next"
import BacktestClientPage from "./BacktestClientPage"

export const metadata: Metadata = {
  title: "Backtest",
  description: "Test your trading strategies against historical data",
}

export default function BacktestPage() {
  return <BacktestClientPage />
}
