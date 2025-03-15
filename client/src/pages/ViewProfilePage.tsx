import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, ChevronLeftIcon, MapPinIcon, CalendarIcon, DollarSignIcon, MailIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { User } from "@/shared/schema"
import Layout from "@/components/Layout"

export default function ViewProfilePage() {
  const formatDate = (dateString: string): string => {
    if (dateString === "Present") return "Present"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${id}`);
        const data = await response.json();
        setUserDetails(data); // Set the fetched user details to the state
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Error: User details not found</div>;
  }

  return (
    <Layout>
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={userDetails.profilePicture} alt={userDetails.username} />
                    <AvatarFallback className="text-2xl">{userDetails.username.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{userDetails.seekerDetails?.fullName}</h1>
                    <p className="text-lg text-gray-600">{userDetails.seekerDetails?.headline}</p>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {userDetails.seekerDetails?.location}
                    </div>
                    <div className="flex items-center">
                        <DollarSignIcon className="h-4 w-4 mr-1" />${userDetails.seekerDetails?.hourlyRate}/hr
                    </div>
                    {userDetails.email && (
                        <div className="flex items-center">
                        <MailIcon className="h-4 w-4 mr-1" />
                        <a href={`mailto:${userDetails.email}`} className="hover:text-primary">
                            {userDetails.email}
                        </a>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardHeader>
                <CardTitle>Professional Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{userDetails.seekerDetails?.overview}</p>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                {userDetails.seekerDetails?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                    {skill}
                    </Badge>
                ))}
                </div>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardHeader>
                <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {userDetails.seekerDetails?.experience.map((exp, index) => (
                    <div key={index} className={index > 0 ? "pt-6 border-t border-gray-200" : ""}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                        <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 md:mt-0 md:text-right">
                        <div className="flex items-center md:justify-end">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                        </div>
                        <div className="flex items-center md:justify-end mt-1">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {exp.location}
                        </div>
                        </div>
                    </div>
                    <p className="mt-3 text-gray-700">{exp.description}</p>
                    </div>
                ))}

                {userDetails.seekerDetails?.experience.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No work experience listed</p>
                )}
                </div>
            </CardContent>
            </Card>
            <Card className="mb-6">
            <CardHeader>
                <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {userDetails.seekerDetails?.education.map((edu, index) => (
                    <div key={index} className={index > 0 ? "pt-6 border-t border-gray-200" : ""}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                        <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 md:mt-0 md:text-right">
                        <div className="flex items-center md:justify-end">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                        <div className="flex items-center md:justify-end mt-1">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {edu.location}
                        </div>
                        </div>
                    </div>
                    <p className="mt-3 text-gray-700">{edu.description}</p>
                    </div>
                ))}

                {userDetails.seekerDetails?.education.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No education listed</p>
                )}
                </div>
            </CardContent>
            </Card>

        </div>
        </div>
    </Layout>
  )
}
