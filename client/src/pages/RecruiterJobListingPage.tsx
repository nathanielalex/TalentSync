import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BriefcaseIcon, MapPinIcon, CalendarIcon, DollarSignIcon, Users } from 'lucide-react'
import Layout from "@/components/Layout"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Job } from "@/shared/schema"
import { useAuth } from "@/context/AuthContext"

// Mock data for jobs
// const JOBS = [
//   {
//     id: 1,
//     title: "Senior React Developer",
//     postedBy: "Sarah Johnson",
//     postedAt: "2023-06-15T10:00:00Z",
//     location: "Remote",
//     salary: "$100,000 - $130,000",
//     description:
//       "We're seeking an experienced React developer to lead our frontend team in building innovative web applications.",
//     requiredSkills: ["React", "TypeScript", "Redux", "Node.js"],
//     isCurrent: true,
//   },
//   {
//     id: 2,
//     title: "UX/UI Designer",
//     postedBy: "Sarah Johnson",
//     postedAt: "2023-05-20T14:30:00Z",
//     location: "New York, NY",
//     salary: "$80,000 - $110,000",
//     description: "Join our creative team to design intuitive and beautiful user interfaces for our products.",
//     requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
//     isCurrent: true,
//   },
//   {
//     id: 3,
//     title: "Full Stack JavaScript Developer",
//     postedBy: "Sarah Johnson",
//     postedAt: "2023-04-10T09:15:00Z",
//     location: "San Francisco, CA",
//     salary: "$90,000 - $120,000",
//     description: "We're looking for a versatile developer comfortable with both frontend and backend technologies.",
//     requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
//     isCurrent: false,
//   },
//   {
//     id: 4,
//     title: "DevOps Engineer",
//     postedBy: "Sarah Johnson",
//     postedAt: "2023-03-05T11:45:00Z",
//     location: "Remote",
//     salary: "$110,000 - $140,000",
//     description: "Help us streamline our development and deployment processes with your DevOps expertise.",
//     requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
//     isCurrent: false,
//   },
// ]

export default function RecruiterJobListingPage() {
  const { userId } = useAuth()
  const [activeTab, setActiveTab] = useState("current")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [currentJobs, setCurrentJobs] = useState<Job[]>([])
  const [pastJobs, setPastJobs] = useState<Job[]>([])

  const navigate = useNavigate();

  function handlePostJobClick() {
    navigate(`/job-posting`);
  }

  function handleViewApplicants(id: string) {
    navigate(`/applicants/${id}`);
  }

  // Filter jobs dynamically based on the `isActive` attribute
  useEffect(() => {
    if (!loading) {
      const filteredCurrentJobs = jobs.filter((job) => job.isActive)
      const filteredPastJobs = jobs.filter((job) => !job.isActive)
      setCurrentJobs(filteredCurrentJobs)
      setPastJobs(filteredPastJobs)
    }
  }, [jobs, loading]) // Trigger when jobs or loa

  useEffect(() => {
    const fetchJobsByRecruiter = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/jobs/recruiter-jobs/${userId}`); // Use recruiterId in the API request
        setJobs(response.data.data);
        // console.log(response.data)
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchJobsByRecruiter();
    }
  }, [userId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            {/* <p className="text-sm text-gray-500 mt-1">Posted by {job.postedBy}</p> */}
          </div>
          <Badge variant={job.isActive ? "default" : "secondary"}>
            {job.isActive ? "Active" : "Closed"}
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Posted on {formatDate(job.postedAt)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSignIcon className="h-4 w-4 mr-2" />
            {job.salary}
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">{job.description}</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        {job.isActive && (
          <div className="mt-6">
            <Button className="w-full" onClick={() => handleViewApplicants(job._id)}>
            <Users className="h-4 w-4 mr-2" />
            View Applicants
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My Job Listings</h1>
              <p className="mt-2 text-sm text-gray-500">Manage and view all your current and past job postings</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button onClick={handlePostJobClick}>Post a New Job</Button>
            </div>
          </div>

          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current" onClick={() => setActiveTab("current")}>
                Current Jobs
              </TabsTrigger>
              <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
                Past Jobs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-4">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-center py-8 text-gray-500">No current job listings found.</p>
              )}
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              {pastJobs.length > 0 ? (
                pastJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-center py-8 text-gray-500">No past job listings found.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}