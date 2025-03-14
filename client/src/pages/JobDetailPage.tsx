import type React from "react"
import { useEffect, useState } from "react"
// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  StarIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileTextIcon,
  UserIcon,
  MessageSquareIcon,
  SendIcon,
  ChevronRightIcon,
  CheckCircle,
  XCircle
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Job, User } from "@/shared/schema"
import Layout from "@/components/Layout"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

const initialJob: Job = {
  _id: "1", // Example MongoDB ID
  title: "Frontend Developer",
  postedAt: "2025-03-09T12:00:00Z", // Example date format
  location: "Remote",
  salary: "$80,000 - $100,000",
  description: "We are looking for a skilled Frontend Developer to join our team and work on exciting projects.",
  requiredSkills: ["JavaScript", "React", "CSS", "HTML"],
  postedBy: "",
  isActive: false
};


export default function JobDetailPage() {
//   const [job, setJob] = useState(JOB)
  // const [isApplying, setIsApplying] = useState(false)
  // const [coverLetter, setCoverLetter] = useState("")
  // const [bidAmount, setBidAmount] = useState("")
  const { id } = useParams();
  const [job, setJob] = useState<Job>(initialJob);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth()
  const [cvText, setCvText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [userDetails, setUserDetails] = useState<User>();
  const [similarityScore, setSimilarityScore] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`);
        const data = await response.json();
        setUserDetails(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [userId]); 

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
        const data = await response.json();
        setJob(data.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobDetails();
  }, [id]); 

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check_similarity', {
        cv_text: 'Experienced software engineer with expertise in HTML.',  
        job_desc: 'Looking for a skilled software engineer with Python and Java knowledge, experience in machine learning.' 
      });
      const result = response.data;
      setSimilarityScore(result.similarity_score);
      console.log(similarityScore)
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching similarity:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-lg font-medium text-gray-900">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to search */}
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to search results
            </Link>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-8">
            {/* Main Job Content */}
            <div className="md:col-span-8 space-y-6">
              {/* Job Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
                  <div className="flex space-x-2">
                    {/* <button
                      className="text-gray-400 hover:text-primary p-2 rounded-full hover:bg-gray-100"
                      onClick={toggleSaved}
                      aria-label="Save job"
                    >
                      <BookmarkIcon className={`h-5 w-5 ${job.saved ? "fill-primary text-primary" : ""}`} />
                    </button> */}
                    <button
                      className="text-gray-400 hover:text-primary p-2 rounded-full hover:bg-gray-100"
                      aria-label="Share job"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100"
                      aria-label="Report job"
                    >
                      <FlagIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    {/* <AvatarImage src={job.companyLogo} alt={job?.company} /> */}
                    {/* <AvatarFallback>{job?.company.charAt(0)}</AvatarFallback> */}
                  </Avatar>
                  {/* <span className="text-gray-700">{job?.company}</span> */}
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job?.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Posted {job?.postedAt}
                  </div>
                  {/* <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Deadline: {job.deadline}
                  </div> */}
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSignIcon className="h-4 w-4 mr-1" />
                    {job?.salary}
                  </div>
                  {/* <Badge variant="outline" className="text-xs">
                    {job.type}
                  </Badge> */}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-xs text-gray-500">Experience Level</p>
                    {/* <p className="text-sm font-medium">{job.experience}</p> */}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Project Length</p>
                    {/* <p className="text-sm font-medium">{job.projectLength}</p> */}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Proposals</p>
                    {/* <p className="text-sm font-medium">{job.proposals} received</p> */}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    {/* <p className="text-sm font-medium">{job.rate}</p> */}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Job Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    {/* <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job?.description }} /> */}
                  </TabsContent>
                  <TabsContent value="requirements" className="space-y-4">
                    <h3 className="text-lg font-medium">Required Skills</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {job?.requiredSkills.map((skill) => (
                        <li key={skill} className="text-gray-700">
                          {skill}
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-medium mt-6">Experience Level</h3>
                    {/* <p className="text-gray-700">{job.experience}</p> */}

                    <h3 className="text-lg font-medium mt-6">Project Timeline</h3>
                    <p className="text-gray-700">
                      {/* {job.projectLength}  */}
                      with deliverables expected within 2 weeks of start date.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900">Interested in this job?</h2>
                <p className="mt-2 text-gray-600">
                  Submit a proposal to connect with the client and discuss the project details.
                </p>
                <Button className="mt-4" onClick={handleClick}>
                  Apply Now
                </Button>
              </div>
            </div> 

            {/* Sidebar */}
            <div className="mt-8 md:mt-0 md:col-span-4 space-y-6">
              {/* About the Client */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">About the Client</h2>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-3">
                    {/* <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback> */}
                  </Avatar>
                  <div>
                    {/* <h3 className="text-base font-medium text-gray-900">{job.client.name}</h3> */}
                    {/* <p className="text-sm text-gray-500">{job.client.title}</p> */}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    {/* <span className="text-gray-900">{job.client.location}</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since</span>
                    {/* <span className="text-gray-900">{job.client.memberSince}</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Verification</span>
                    {/* <span className="flex items-center text-gray-900">
                      {job.client.verified ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                          Verified
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-4 w-4 text-gray-400 mr-1" />
                          Unverified
                        </>
                      )}
                    </span> */}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400 opacity-50" />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {/* {job.client.rating} of 5 ({job.client.reviews} reviews) */}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm mt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Projects posted</span>
                      {/* <span className="text-gray-900">{job.client.projectsPosted}</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hire rate</span>
                      {/* <span className="text-gray-900">{job.client.hireRate}%</span> */}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Client Profile
                  </Button>
                </div>
              </div>

              {/* Job Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Job Activity</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <FileTextIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">Proposals</p>
                      {/* <p className="text-gray-500">{job.proposals} freelancers have placed bids</p> */}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">Interviewing</p>
                      <p className="text-gray-500">3 freelancers are being interviewed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquareIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">Last activity</p>
                      <p className="text-gray-500">Client was active 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Job Suitability Result</DialogTitle>
            <DialogDescription>
              Based on your CV and job description comparison
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center p-4">
            {similarityScore > 0.3 ? (
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-green-600">
                  Congratulations!
                </h3>
                <p className="text-lg">
                  You are suitable for this job position.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Similarity Score: {similarityScore.toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-600">
                  Not Suitable Yet
                </h3>
                <p className="text-lg">
                  You don't meet the requirements for this job position yet.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Similarity Score: {similarityScore.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

