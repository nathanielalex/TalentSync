import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckIcon,
  MailIcon,
  ClockIcon,
  UserIcon,
  SearchIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Application } from "@/shared/schema";
import axios from "axios";
import Layout from "@/components/Layout";

type Status = "applied" | "interview" | "hired" | "rejected";

export default function ApplicantListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const { id } = useParams();
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("applied");
  const [statusApplicant, setStatusApplicant] = useState<Status>("applied");

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const response = await fetch(`http://localhost:8080/api/application/${id}/applicants`);
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplicants();
  }, [id]);

  const handleStatusChange = (value: Status) => {
    setStatus(value);
    setStatusApplicant(value); 
  }

  const navigate = useNavigate()
  const handleViewProfile = (id: string) => {
    console.log('click view')
    navigate(`/view-profile/${id}`)
  }

  const handleUpdate = async (applicationId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/application/${applicationId}/update-status`,
        { status }
      );

      if (response.status === 200) {
        // console.log(`Application status updated to: ${response.data.application.status}`);
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant._id === applicationId
              ? { ...applicant, status: statusApplicant }
              : applicant
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Applicants for {applicants[0].jobTitle}
            </h1>
          </div>

          <div className="space-y-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Card key={applicant._id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center flex-1">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarFallback>{applicant.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{applicant.fullName}</h3>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4">
                            <span className="flex items-center">
                              <MailIcon className="h-3 w-3 mr-1" />
                              {applicant.email}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Applied {formatTimeAgo(applicant.appliedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-28 flex justify-center">
                        <Badge
                          className={
                            applicant.status === "hired"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : applicant.status === "interview"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : applicant.status === "rejected"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {applicant.status}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewProfile(applicant.applicant)}>
                          View
                        </Button>
                        <Select value={status} onValueChange={handleStatusChange}>
                          <SelectTrigger className="w-[130px] h-9">
                            <SelectValue placeholder="Actions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" onClick={() => handleUpdate(applicant._id)}>
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <UserIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No applicants found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
