import React from "react"
import { BriefcaseIcon, MenuIcon, X } from "lucide-react"
import AuthButtons from "@/components/AuthButtons"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

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
    </Layout>
  )
}

