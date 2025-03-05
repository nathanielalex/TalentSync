import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@shared/schema";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { sortJobsByMatch } from "@/lib/job-matching";

export default function HomePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const { data: jobs = [] } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  // Filter jobs by search and sort by match score
  const filteredJobs = sortJobsByMatch(
    jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    ),
    user
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {user?.isEmployer ? "Manage Jobs" : "Find Your Dream Job"}
            </h1>
            <p className="text-muted-foreground">
              {user?.isEmployer
                ? "Post and manage job listings"
                : "Browse through hundreds of job opportunities matched to your skills"}
            </p>
          </div>
          {user?.isEmployer && (
            <Button onClick={() => setLocation("/post-job")}>Post a Job</Button>
          )}
        </div>

        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search jobs by title, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}