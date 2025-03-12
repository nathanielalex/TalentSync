import React, { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PlusIcon, XIcon, BriefcaseIcon } from "lucide-react"
import Layout from "@/components/Layout"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

// Sample skill suggestions
const SKILL_SUGGESTIONS = [
  "JavaScript", "React", "Node.js", "TypeScript", "HTML", "CSS", "Python", 
  "WordPress", "PHP", "UI/UX Design", "Graphic Design", "Content Writing", 
  "SEO", "Digital Marketing", "Mobile Development", "iOS", "Android"
]

interface FormData {
  title: string
  description: string
  requiredSkills: string[]
  salary: number
  location: string
}

export default function SimplifiedJobPostingForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    requiredSkills: [],
    salary: 500,
    location: ""
  })
  const [skillInput, setSkillInput] = useState('')
  const { userId } = useAuth();

  // Filtered skill suggestions based on input
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const [showSkillSuggestions, setShowSkillSuggestions] = useState<boolean>(false)

  const jobPostingData = {
    ...formData,
    postedAt: new Date().toISOString(), 
    postedBy: userId,
    isActive: true
  };

  // Handle text input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle skill input
  const handleSkillInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // setFormData({ ...formData, skillInput: value })
    setSkillInput(value)

    if (value.trim()) {
      const filtered = SKILL_SUGGESTIONS.filter((skill) => skill.toLowerCase().includes(value.toLowerCase()))
      setFilteredSkills(filtered)
      setShowSkillSuggestions(true)
    } else {
      setShowSkillSuggestions(false)
    }
  }

  // Add a skill
  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.requiredSkills.includes(skill)) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skill],
      })
      setSkillInput("")
    }
    setShowSkillSuggestions(false)
  }

  // Remove a skill
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter((s) => s !== skill),
    })
  }

  // Handle budget slider change
  const handleBudgetChange = (value: number[]) => {
    setFormData({
      ...formData,
      salary: value[0]
    })
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log(jobPostingData)
      const response = await axios.post('http://localhost:8080/api/jobs/', jobPostingData);
      alert('Your job has been posted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error posting the job:', error);
      alert('There was an error posting your job. Please try again.');
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
            <p className="mt-2 text-gray-600">
              Fill out the essential details to find the perfect freelancer for your project.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., WordPress Website Designer"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={6}
                    placeholder="Describe the project in detail. Include specific requirements and deliverables."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Remote"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Required Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary">
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

                  {formData.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.requiredSkills.map((skill) => (
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

                {/* Budget Range */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Budget Range <span className="text-red-500">*</span>
                    </label>
                    <div className="text-sm font-medium">
                      ${formData.salary}
                    </div>
                  </div>
                  <div className="px-2 pt-2">
                    <Slider
                      defaultValue={[formData.salary]}
                      max={5000}
                      step={100}
                      onValueChange={handleBudgetChange}
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>$100</span>
                      <span>$5,000+</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4">Post Job</Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </Layout>
  )
}
