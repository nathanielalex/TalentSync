import { useState, type ChangeEvent, type FormEvent } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BriefcaseIcon, UserIcon, LockIcon, MailIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

// Define types for the form data and response
interface FormData {
  email: string
  username: string
  password: string
}

interface ApiResponse {
  token: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
  })
  const [message, setMessage] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {login} = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = isLogin ? "http://localhost:8080/api/auth/login" : "http://localhost:8080/api/auth/register"
      const response = await axios.post<ApiResponse>(url, formData)

      setIsSuccess(true)
      setMessage(isLogin ? "Login successful!" : "User registered successfully!")

      // Store JWT token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
      }
      if(isLogin) {
        navigate("/")
      } else {
        setIsLogin(true);
      }
    } catch (err: any) {
      setIsSuccess(false)
      setMessage(err.response?.data?.error || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">FreelanceHub</h2>
          <p className="mt-2 text-sm text-gray-600">Connect with clients and grow your freelance business</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Sign in to your account" : "Create a new account"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Fill in your details to join our freelance community"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="johndoe"
                      className="pl-10"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  <span>{isLogin ? "Sign in" : "Create account"}</span>
                )}
              </Button>
            </form>

            {message && (
              <Alert
                className={`mt-4 ${isSuccess ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
              >
                <div className="flex flex-row gap-5 w-full">
                  <div className="flex items-center">
                    {isSuccess ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircleIcon className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                    <AlertDescription className="text-sm w-full">{message}</AlertDescription>
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center space-x-4">
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            Terms of Service
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            Privacy Policy
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

