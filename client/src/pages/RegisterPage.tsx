import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BriefcaseIcon, UserIcon, LockIcon, MailIcon, CheckCircleIcon, AlertCircleIcon, Upload } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  role: string;
  profilePicture: string;
}

interface ApiResponse {
  token: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    role: "",
    profilePicture: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
    setSelectedRole(role);
  };

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = "http://localhost:8080/api/auth/register";
      await axios.post<ApiResponse>(url, formData);

      setIsSuccess(true);
      setMessage("User registered successfully! You can now log in.");

      // Redirect to login page after a brief delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
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
            <CardTitle>Create a new account</CardTitle>
            <CardDescription>Fill in your details to join our freelance community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="password">Password</Label>
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

              <div className="space-y-4">
                <Label>Role</Label>
                <RadioGroup value={selectedRole} onValueChange={handleRoleChange} className="flex space-x-4 mb-6">
                  {/* Owner */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="seeker"
                      id="seeker"
                      className={`border-gray-300 text-gray-700 ${
                        selectedRole === "seeker" ? "border-gray-600 text-gray-600 bg-gray-400" : ""
                      }`}
                    />
                    <Label
                      htmlFor="seeker"
                      className={`cursor-pointer ${
                        selectedRole === "seeker" ? "underline font-semibold" : "text-gray-700"
                      }`}
                    >
                      Seeker
                    </Label>
                  </div>

                  {/* Renter */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="recruiter"
                      id="recruiter"
                      className={`border-gray-300 text-gray-700 ${
                        selectedRole === "recruiter" ? "border-gray-600 text-gray-600 bg-gray-400" : ""
                      }`}
                    />
                    <Label
                      htmlFor="recruiter"
                      className={`cursor-pointer ${
                        selectedRole === "recruiter" ? "underline font-semibold" : "text-gray-700"
                      }`}
                    >
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Profile Picture */}
              <div className="space-y-4">
                <Label htmlFor="profile-picture">Profile Picture</Label>
                <div className="mt-2 flex items-center space-x-4 mb-6">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-600" />
                    </div>
                  )}
                  <Input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("profile-picture")?.click()}
                  >
                    Upload Picture
                  </Button>
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
                    Creating account...
                  </span>
                ) : (
                  <span>Create account</span>
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
            <Button variant="link" className="w-full" asChild>
              <Link to="/login">Already have an account? Sign in</Link>
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
  );
}
