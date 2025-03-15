import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  XCircle,
  Star,
  Share,
  Flag,
  DollarSign,
  Calendar,
  CheckCircle,
  MapPin
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
import { Badge } from "@/components/ui/badge"

const initialJob: Job = {
  _id: "1",
  title: "Frontend Developer",
  postedAt: "2025-03-09T12:00:00Z",
  location: "Remote",
  salary: "$80,000 - $100,000",
  description: "We are looking for a skilled Frontend Developer to join our team and work on exciting projects.",
  requiredSkills: ["JavaScript", "React", "CSS", "HTML"],
  postedBy: "",
  isActive: false
};

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job>(initialJob);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User>();
  const [similarityScore, setSimilarityScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const { userId } = useAuth();
  
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
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

  const handleApply = async () => {
    try {
      setStatus('Applying...');      
      const response = await axios.post(`http://localhost:8080/api/application/${id}/apply`, {
        userId: userId,
        fullName: userDetails?.seekerDetails?.fullName,
        email: userDetails?.email,
        skills: userDetails?.seekerDetails?.skills
      });

      if (response.status === 201) {
        setStatus('Successfully applied for the job!');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setStatus('');
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check_similarity', {
        cv_text: userDetails?.seekerDetails?.overview,  
        job_desc: job.description
      });
      const result = response.data;
      setSimilarityScore(result.similarity_score);
      setIsOpen(true);
      if(similarityScore > 0.3) {
        handleApply();
      }
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
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link
            to="/jobs"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to search results
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Job Header */}
            <div className="border-b pb-6 mb-6">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-primary">
                    <Star className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primary">
                    <Share className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <MapPin className="mr-2" /> {job.location}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                  <span className="text-primary">Posted {formatTimeAgo(job.postedAt)}</span>
                </div>
              </div>
            </div>
            
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Job Description</h2>
              <div className="prose prose-sm max-w-none text-gray-700" 
                dangerouslySetInnerHTML={{ __html: job.description }} 
              />
            </div>
            
            {/* Skills Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                className="px-8" 
                onClick={handleClick} 
                disabled={loading}
              >
                {loading ? "Processing..." : "Apply Now"}
              </Button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              Our AI will analyze your CV for this position
            </p>
          </div>
        </div>
      </div>
      
      {/* Application Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Job Suitability Result</DialogTitle>
            <DialogDescription>
              Comparing your CV to the job's details
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
                  {status}
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