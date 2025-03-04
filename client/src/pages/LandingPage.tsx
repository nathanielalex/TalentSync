import React from "react"
import { BriefcaseIcon, MenuIcon, X } from "lucide-react"
import AuthButtons from "@/components/AuthButtons"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BriefcaseIcon className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">TalentSync</span>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:ml-12 md:flex md:space-x-8">
                <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                  Find Work
                </a>
                <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                  Hire Talent
                </a>
                <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <AuthButtons />
              {/* <Button size="sm">Sign up</Button> */}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
            <a href="#" className="bg-primary/10 text-primary block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Find Work
            </a>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Hire Talent
            </a>
            <a
              href="#"
              className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-4 sm:px-6 space-y-2">
            <AuthButtons />
            {/* <Button size="sm">Sign up</Button> */}
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <span className="w-full h-full absolute opacity-20 bg-gradient-to-r from-primary/20 to-purple-500/20"></span>
        </div>

        {/* Content overlay - keeping this minimal as requested */}
        <div className="container relative mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4 text-center">
            
              <h1 className="ml-2 text-xl font-bold text-gray-900">Welcome to TalentSync</h1>
              <Button onClick={handleClick} className="m-5">Dashboard</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

