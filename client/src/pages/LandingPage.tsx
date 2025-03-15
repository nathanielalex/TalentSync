import React from "react"
import { ArrowRight, BriefcaseIcon, CheckCircle, MenuIcon, Search, Star, Users, X } from "lucide-react"
import AuthButtons from "@/components/AuthButtons"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const navigate = useNavigate();
  function handleClick() {
    navigate("/jobs");
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-background/80">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Connect with top freelance talent <span className="text-primary">instantly</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  TalentSync helps businesses find and collaborate with skilled freelancers from around the world.
                  Streamline your hiring process and get work done faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={handleClick} className="z-10">
                    Find Talent
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                      >
                      </div>
                    ))}
                  </div>

                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="relative mx-auto w-full max-w-[500px] rounded-xl border bg-background p-2 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="TalentSync Platform"
                    width={500}
                    height={500}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-primary p-2 shadow-lg md:h-32 md:w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-background">
                    <div className="text-center">
                      <div className="text-2xl font-bold md:text-3xl">4.9</div>
                      <div className="flex justify-center text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why choose TalentSync?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers powerful tools to connect businesses with the right talent quickly and
                  efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Search className="h-10 w-10 text-primary" />,
                  title: "Smart Matching",
                  description:
                    "Our AI-powered algorithm matches you with the most relevant freelancers for your project needs.",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Mock Interview",
                  description: "TalentSync provides mock interviews that help freelancers prepare for real interviews. ",
                },
                {
                  icon: <ArrowRight className="h-10 w-10 text-primary" />,
                  title: "Fast Onboarding",
                  description:
                    "Get started in minutes with our streamlined onboarding process for both clients and freelancers.",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How TalentSync Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A simple, streamlined process to connect you with the right talent or projects.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description:
                    "Sign up and build your profile as a freelancer. Showcase your needs or skills.",
                },
                {
                  step: "02",
                  title: "Job Matching",
                  description: "Freelancers search for job opportunities through keyword-based searches or AI recommendations.",
                },
                {
                  step: "03",
                  title: "Job Selection",
                  description: "Freelancers apply for jobs, and the system evaluates their profiles to check if they match or not.",
                },
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-center text-muted-foreground">{step.description}</p>

                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Hear from businesses and freelancers who have found success on TalentSync.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  quote:
                    "TalentSync helped me find the perfect developer for my startup in just 48 hours. The quality of talent is outstanding.",
                  author: "Sarah Johnson",
                  role: "Founder, TechStart",
                  avatar: "/placeholder.svg?height=100&width=100&text=SJ",
                },
                {
                  quote:
                    "As a freelance designer, TalentSync has connected me with amazing clients and projects that align perfectly with my skills.",
                  author: "Michael Chen",
                  role: "UI/UX Designer",
                  avatar: "/placeholder.svg?height=100&width=100&text=MC",
                },
                
              ].map((testimonial, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-semibold">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        
      </main>
      </div>
    </Layout>
  )
}

