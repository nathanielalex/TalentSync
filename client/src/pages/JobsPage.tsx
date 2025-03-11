import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BriefcaseIcon,
  SearchIcon,
  FilterIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  StarIcon,
  BookmarkIcon,
  ChevronDownIcon,
  XIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/Layout"
import { Job } from "@/shared/schema"
import { useNavigate } from "react-router-dom"

// Sample job data
// const JOBS = [
//   {
//     id: 1,
//     title: "Frontend React Developer",
//     company: "TechSolutions Inc.",
//     location: "Remote",
//     type: "Contract",
//     rate: "$40-60/hr",
//     posted: "2 days ago",
//     description:
//       "We're looking for an experienced React developer to help build our new customer portal. You should have strong experience with React, TypeScript, and responsive design.",
//     skills: ["React", "TypeScript", "CSS", "Responsive Design"],
//     saved: false,
//   },
//   {
//     id: 2,
//     title: "WordPress Website Designer",
//     company: "CreativeMinds Agency",
//     location: "Remote",
//     type: "Fixed-price",
//     rate: "$2,000-3,000",
//     posted: "5 hours ago",
//     description:
//       "Need a talented WordPress designer to create a professional website for a local restaurant. Should include online ordering functionality and mobile responsiveness.",
//     skills: ["WordPress", "UI/UX", "PHP", "JavaScript"],
//     saved: true,
//   },
//   {
//     id: 3,
//     title: "Full Stack Developer",
//     company: "StartupBoost",
//     location: "New York, NY (Hybrid)",
//     type: "Contract",
//     rate: "$50-70/hr",
//     posted: "1 week ago",
//     description:
//       "Join our team to help build our SaaS platform. We're looking for a full stack developer with experience in React, Node.js, and MongoDB.",
//     skills: ["React", "Node.js", "MongoDB", "Express"],
//     saved: false,
//   },
//   {
//     id: 4,
//     title: "Mobile App Developer (iOS)",
//     company: "AppWorks Digital",
//     location: "Remote",
//     type: "Contract",
//     rate: "$45-65/hr",
//     posted: "3 days ago",
//     description:
//       "Experienced iOS developer needed for an ongoing project. Must have Swift experience and a portfolio of published apps.",
//     skills: ["Swift", "iOS", "Xcode", "UI Design"],
//     saved: false,
//   },
//   {
//     id: 5,
//     title: "Content Writer - Technology",
//     company: "TechBlog Media",
//     location: "Remote",
//     type: "Fixed-price",
//     rate: "$200-500 per article",
//     posted: "1 day ago",
//     description:
//       "Looking for a technology writer to create engaging blog posts about the latest tech trends. Must have excellent research skills and SEO knowledge.",
//     skills: ["Content Writing", "SEO", "Research", "Technology"],
//     saved: false,
//   },
//   {
//     id: 6,
//     title: "UX/UI Designer",
//     company: "DesignPro Agency",
//     location: "San Francisco, CA (On-site)",
//     type: "Full-time",
//     rate: "$80-100k/year",
//     posted: "4 days ago",
//     description:
//       "Join our design team to create beautiful, user-friendly interfaces for our clients. Must have a strong portfolio and experience with Figma and Adobe Creative Suite.",
//     skills: ["UI Design", "UX Research", "Figma", "Adobe XD"],
//     saved: true,
//   },
// ]

export default function JobPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("http://localhost:8080/api/jobs/current")
        const data = await response.json()

        if (Array.isArray(data.data)) {
          setJobs(data.data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchJobs()
  }, [])

  // Toggle saved status for a job
  // const toggleSaved = (id: number) => {
  //   setJobs(jobs.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job)))
  // }

  // Filter jobs based on search term and saved filter
  const filteredJobs = loading
    ? [] // No jobs to filter while loading
    : jobs.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requiredSkills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // if (savedOnly) {
        //   return matchesSearch && job.saved;
        // }

        return matchesSearch; 
      });
  
  const navigate = useNavigate();

  function handleClick(id: string) {
    navigate(`/jobs/${id}`);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Find Work</h1>
              <p className="mt-1 text-sm text-gray-500">Browse {filteredJobs.length} available opportunities</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                type="text"
                placeholder="Search for jobs, skills, or companies"
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setSearchTerm("")}>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="mt-4 md:hidden">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
              <ChevronDownIcon className={`h-4 w-4 ml-2 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="mt-6 md:grid md:grid-cols-12 md:gap-8">
            {/* Filters Sidebar */}
            <aside className={`md:col-span-3 ${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
              <div className="sticky top-20 space-y-6">
                {/* Job Type Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Job Type</h3>
                  <div className="space-y-3">
                    {["All Types", "Fixed-price", "Hourly", "Contract", "Full-time", "Part-time"].map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox id={`type-${type}`} />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Experience Level</h3>
                  <div className="space-y-3">
                    {["Entry Level", "Intermediate", "Expert"].map((level) => (
                      <div key={level} className="flex items-center">
                        <Checkbox id={`level-${level}`} />
                        <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
                  <div className="space-y-3">
                    {["React", "JavaScript", "TypeScript", "UI/UX Design", "WordPress"].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <Checkbox id={`skill-${skill}`} />
                        <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-2 p-0 h-auto text-sm">
                    Show more skills
                  </Button>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="mt-6 md:mt-0 md:col-span-9">
              {/* Sort Options */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Showing {filteredJobs.length} results</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
                      <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Card key={job._id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-primary">
                                <a href="#">{job.title}</a>
                              </h3>
                              {/* <p className="mt-1 text-sm text-gray-500">{job.company}</p> */}
                            </div>
                            {/* <button className="text-gray-400 hover:text-primary" onClick={() => toggleSaved(job.id)}>
                              <BookmarkIcon className={`h-5 w-5 ${job.saved ? "fill-primary text-primary" : ""}`} />
                            </button> */}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {(() => {
                                const postedAtDate = new Date(job.postedAt);
                                return postedAtDate.toLocaleString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                });
                              })()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <DollarSignIcon className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                            {/* <Badge variant="outline" className="text-xs">
                              {job.type}
                            </Badge> */}
                          </div>

                          <p className="mt-4 text-sm text-gray-600 line-clamp-2">{job.description}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {job.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <StarIcon className="h-4 w-4 text-gray-300" />
                            </div>
                            <span className="ml-1 text-xs text-gray-500">(4.0)</span>
                          </div>
                          <Button size="sm" onClick={() => handleClick(job._id)}>Apply Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <SearchIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredJobs.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-white">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <span className="text-gray-500">...</span>
                    <Button variant="outline" size="sm">
                      8
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

