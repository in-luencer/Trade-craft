import Link from "next/link"
import { BarChart4, Menu, Search, User, Bell, Settings, LogOut, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-t-2 border-t-yellow-400/60 border-b-purple-400/30 bg-gradient-to-r from-[#18181b]/90 via-[#23233a]/90 to-[#18181b]/90 backdrop-blur-xl shadow-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-yellow-400/60 via-purple-400/30 to-primary/30 blur-2xl opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative rounded-full bg-gradient-to-tr from-yellow-400 via-primary to-purple-400 p-2 shadow-2xl border-2 border-yellow-400/60">
                <Sparkles className="h-8 w-8 text-white drop-shadow-xl" />
              </div>
            </div>
            <span className="hidden sm:inline-block font-extrabold text-3xl tracking-widest bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-xl select-none uppercase">
              Trade Crafter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-zinc-200 transition-colors hover:text-yellow-400 hover:underline underline-offset-8 tracking-wide"
            >
              Dashboard
            </Link>
            <Link
              href="/marketplace"
              className="text-lg font-semibold text-zinc-200 transition-colors hover:text-yellow-400 hover:underline underline-offset-8 tracking-wide"
            >
              Marketplace
            </Link>
            <Link
              href="/builder"
              className="text-lg font-semibold text-zinc-200 transition-colors hover:text-yellow-400 hover:underline underline-offset-8 tracking-wide"
            >
              Builder
            </Link>
            <Link
              href="/backtest"
              className="text-lg font-semibold text-zinc-200 transition-colors hover:text-yellow-400 hover:underline underline-offset-8 tracking-wide"
            >
              Backtest
            </Link>
            <Link
              href="/settings"
              className="text-lg font-semibold text-zinc-200 transition-colors hover:text-yellow-400 hover:underline underline-offset-8 tracking-wide"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search strategies..."
              className="h-10 w-full rounded-full border-primary/20 bg-primary/5 pl-10 focus:border-primary/40"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {/* Notification Items */}
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <BarChart4 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">New Strategy Available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Premium Moving Average Crossover strategy is now available
                  </p>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </DropdownMenuItem>
                {/* Add more notification items as needed */}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/marketplace"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Marketplace
                </Link>
                <Link
                  href="/builder"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Strategy Builder
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}