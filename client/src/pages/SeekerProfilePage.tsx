import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  BriefcaseIcon,
  PlusIcon,
  XIcon,
  GraduationCapIcon,
  ImageIcon,
  MapPinIcon,
  ClockIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react"
import Layout from "@/components/Layout"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

// Sample skill suggestions
const SKILL_SUGGESTIONS = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "Python",
  "WordPress",
  "PHP",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "SEO",
  "Digital Marketing",
  "Mobile Development",
  "iOS",
  "Android",
  "Angular",
  "Vue.js",
  "Ruby on Rails",
  "Java",
  "C#",
  ".NET",
  "AWS",
  "Docker",
  "Kubernetes",
  "DevOps",
  "Data Analysis",
  "Machine Learning",
]

export default function FreelancerProfileSimple() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [skillInput, setSkillInput] = useState('')
  const [profileData, setProfileData] = useState({
    fullName: "John",
    profileImage: "/placeholder.svg?height=200&width=200",
    headline: "Full Stack Developer & UI/UX Designer",
    location: "San Francisco, CA",
    hourlyRate: 45,
    overview:
      "Experienced full stack developer with 5+ years of experience building web applications. Specialized in React, Node.js, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and scalable backend systems.",
    skills: ["React", "JavaScript", "Node.js", "TypeScript", "UI/UX Design"],
    skillInput: "",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "2020-01",
        endDate: "2021-01",
        description:
          "Led the frontend development team in building a SaaS platform using React and TypeScript. Implemented responsive designs and improved performance by 40%.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2014-09",
        endDate: "2018-05",
        description: "Focused on software engineering and web development. Graduated with honors.",
      },
    ],
  })

  // Filtered skill suggestions based on input
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false)

  // New experience entry
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  // New education entry
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  // UI states
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [showAddEducation, setShowAddEducation] = useState(false)
  const [profileCompleteness, setProfileCompleteness] = useState(75)

  // Handle text input changes for profile data
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  // Handle skill input
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // setProfileData({ ...profileData, skillInput: value })
    setSkillInput(value)
    if (value.trim()) {
      const filtered = SKILL_SUGGESTIONS.filter(
        (skill) => skill.toLowerCase().includes(value.toLowerCase()) && !profileData.skills.includes(skill),
      )
      setFilteredSkills(filtered)
      setShowSkillSuggestions(true)
    } else {
      setShowSkillSuggestions(false)
    }
  }

  // Add a skill
  const addSkill = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill]
      })
      setSkillInput("")
    }
    setShowSkillSuggestions(false)
  }

  // Remove a skill
  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    })
  }

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileData({
            ...profileData,
            profileImage: event.target.result.toString(),
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle hourly rate change
  const handleRateChange = (value: number[]) => {
    setProfileData({
      ...profileData,
      hourlyRate: value[0],
    })
  }

  // Handle new experience input change
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience({ ...newExperience, [name]: value })
  }

  // Handle current job checkbox
  // const handleCurrentJobChange = (checked: boolean) => {
  //   setNewExperience({
  //     ...newExperience,
  //     current: checked,
  //     endDate: checked ? "" : newExperience.endDate,
  //   })
  // }

  // Add new experience
  const addExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      const newId = profileData.experience.length > 0 ? Math.max(...profileData.experience.map((exp) => exp.id)) + 1 : 1

      setProfileData({
        ...profileData,
        experience: [
          {
            id: newId,
            ...newExperience,
          },
          ...profileData.experience,
        ],
      })

      // Reset form
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      })
      setShowAddExperience(false)
    }
  }

  // Remove experience
  const removeExperience = (id: number) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter((exp) => exp.id !== id),
    })
  }

  // Handle new education input change
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEducation({ ...newEducation, [name]: value })
  }

  // Add new education
  const addEducation = () => {
    if (newEducation.degree && newEducation.school && newEducation.startDate) {
      const newId = profileData.education.length > 0 ? Math.max(...profileData.education.map((edu) => edu.id)) + 1 : 1

      setProfileData({
        ...profileData,
        education: [
          {
            id: newId,
            ...newEducation,
          },
          ...profileData.education,
        ],
      })

      // Reset form
      setNewEducation({
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      })
      setShowAddEducation(false)
    }
  }

  // Remove education
  const removeEducation = (id: number) => {
    setProfileData({
      ...profileData,
      education: profileData.education.filter((edu) => edu.id !== id),
    })
  }

  // Toggle profile visibility
  // const toggleVisibility = (checked: boolean) => {
  //   setProfileData({
  //     ...profileData,
  //     visibility: checked,
  //   })
  // }

  const { userId } = useAuth();

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/seeker-profile/${userId}`, profileData);
      
      if (response.status === 200) {
        alert("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Error saving profile", error);
      alert("There was an error saving your profile.");
    }
    alert("Profile saved successfully!")
  }

  return (
    <Layout>

      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Your Profile</h1>
              <p className="mt-1 text-sm text-gray-500">
                Complete your profile to increase your chances of getting hired.
              </p>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Switch id="profile-visibility" checked={profileData.visibility} onCheckedChange={toggleVisibility} />
              <Label htmlFor="profile-visibility" className="text-sm">
                {profileData.visibility ? "Profile Visible" : "Profile Hidden"}
              </Label>
            </div> */}
          </div>

          {/* <div className="mb-6">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Profile Completeness:</span>
              <span className="text-sm font-medium text-primary">{profileCompleteness}%</span>
            </div>
            <Progress value={profileCompleteness} className="h-2 mt-1" />
          </div> */}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Profile Photo */}
              <Card>
                <CardContent className="">
                  <div className="flex items-center">
                    <div className="relative group mr-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={profileData.profileImage}
                          alt={`${profileData.fullName}`}
                        />
                        <AvatarFallback className="text-2xl">
                          {profileData.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={triggerFileInput}
                      >
                        <ImageIcon className="h-6 w-6 text-white" />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Profile Photo</h3>
                      <p className="text-sm text-gray-500">Upload a professional photo to make your profile stand out.</p>
                      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={triggerFileInput}>
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardContent className="pt-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="headline">Professional Headline</Label>
                      <Input
                        id="headline"
                        name="headline"
                        value={profileData.headline}
                        onChange={handleProfileChange}
                        className="mt-1"
                        placeholder="e.g., Full Stack Developer & UI/UX Designer"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        A short headline that describes your professional role or expertise.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="mt-1"
                        placeholder="e.g., San Francisco, CA"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="overview">Professional Overview</Label>
                      <Textarea
                        id="overview"
                        name="overview"
                        value={profileData.overview}
                        onChange={handleProfileChange}
                        className="mt-1"
                        rows={4}
                        placeholder="Describe your professional background, expertise, and what you bring to clients..."
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        A brief overview of your professional background and expertise.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Hourly Rate */}
              <Card>
                <CardContent className="pt-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skills & Hourly Rate</h3>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Skills</Label>
                      <p className="mt-1 text-sm text-gray-500 mb-3">Add skills that showcase your expertise.</p>

                      <div className="relative">
                        <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                          <Input
                            type="text"
                            placeholder="Add skills (e.g., JavaScript, WordPress)"
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={skillInput}
                            onChange={handleSkillInputChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill(skillInput)
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-9 px-3"
                            onClick={() => addSkill(skillInput)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        {showSkillSuggestions && filteredSkills.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                            <ul className="py-1">
                              {filteredSkills.map((skill) => (
                                <li
                                  key={skill}
                                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                  onClick={() => addSkill(skill)}
                                >
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {profileData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {profileData.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-gray-500 hover:text-gray-700"
                              >
                                <XIcon className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-medium">Hourly Rate</Label>
                      <p className="mt-1 text-sm text-gray-500 mb-3">
                        Set your hourly rate. You can adjust this for individual projects later.
                      </p>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Your Rate:</span>
                        <span className="text-sm font-medium text-primary">${profileData.hourlyRate}/hr</span>
                      </div>

                      <div className="px-2">
                        <Slider
                          defaultValue={[profileData.hourlyRate]}
                          max={150}
                          step={5}
                          onValueChange={handleRateChange}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>$15/hr</span>
                          <span>$150+/hr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddExperience(!showAddExperience)}
                    >
                      {showAddExperience ? "Cancel" : "Add Experience"}
                    </Button>
                  </div>

                  {showAddExperience && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={newExperience.title}
                            onChange={handleExperienceChange}
                            className="mt-1"
                            placeholder="e.g., Senior Frontend Developer"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            value={newExperience.company}
                            onChange={handleExperienceChange}
                            className="mt-1"
                            placeholder="e.g., TechCorp Inc."
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={newExperience.location}
                            onChange={handleExperienceChange}
                            className="mt-1"
                            placeholder="e.g., San Francisco, CA or Remote"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              name="startDate"
                              type="month"
                              value={newExperience.startDate}
                              onChange={handleExperienceChange}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              name="endDate"
                              type="month"
                              value={newExperience.endDate}
                              onChange={handleExperienceChange}
                              className="mt-1"
                              disabled={newExperience.current}
                              required={!newExperience.current}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={newExperience.description}
                            onChange={handleExperienceChange}
                            className="mt-1"
                            rows={3}
                            placeholder="Describe your responsibilities, achievements, and the technologies you used..."
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button type="button" onClick={addExperience}>
                            Add Experience
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profileData.experience.length > 0 ? (
                      profileData.experience.map((exp) => (
                        <div key={exp.id} className="p-4 border border-gray-200 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{exp.title}</h3>
                              <p className="text-sm text-gray-500">{exp.company}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {exp.location}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                                -
                                {` ${new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          {exp.description && <p className="mt-4 text-sm text-gray-700">{exp.description}</p>}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <BriefcaseIcon className="mx-auto h-10 w-10 text-gray-300" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No experience added</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add your work experience to showcase your professional background.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => setShowAddExperience(true)}
                        >
                          Add Experience
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Education</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddEducation(!showAddEducation)}
                    >
                      {showAddEducation ? "Cancel" : "Add Education"}
                    </Button>
                  </div>

                  {showAddEducation && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="degree">Degree</Label>
                          <Input
                            id="degree"
                            name="degree"
                            value={newEducation.degree}
                            onChange={handleEducationChange}
                            className="mt-1"
                            placeholder="e.g., Bachelor of Science in Computer Science"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="school">School</Label>
                          <Input
                            id="school"
                            name="school"
                            value={newEducation.school}
                            onChange={handleEducationChange}
                            className="mt-1"
                            placeholder="e.g., University of California, Berkeley"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={newEducation.location}
                            onChange={handleEducationChange}
                            className="mt-1"
                            placeholder="e.g., Berkeley, CA"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              name="startDate"
                              type="month"
                              value={newEducation.startDate}
                              onChange={handleEducationChange}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              name="endDate"
                              type="month"
                              value={newEducation.endDate}
                              onChange={handleEducationChange}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={newEducation.description}
                            onChange={handleEducationChange}
                            className="mt-1"
                            rows={3}
                            placeholder="Describe your field of study, achievements, relevant coursework, etc."
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button type="button" onClick={addEducation}>
                            Add Education
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profileData.education.length > 0 ? (
                      profileData.education.map((edu) => (
                        <div key={edu.id} className="p-4 border border-gray-200 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                              <p className="text-sm text-gray-500">{edu.school}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {edu.location}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                                -
                                {edu.endDate
                                  ? ` ${new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                                  : " Present"}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          {edu.description && <p className="mt-4 text-sm text-gray-700">{edu.description}</p>}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <GraduationCapIcon className="mx-auto h-10 w-10 text-gray-300" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No education added</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add your educational background to enhance your profile.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => setShowAddEducation(true)}
                        >
                          Add Education
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

