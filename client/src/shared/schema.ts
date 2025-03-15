export interface Application {
  _id: string;   
  applicant: string;
  fullName: string;
  email: string;      
  job: string;
  skills: string[]; 
  status: 'applied' | 'interview' | 'hired' | 'rejected'; 
  appliedAt: string;               
  jobTitle: string;        
  jobLocation: string;         
  salary: number;            
  requiredSkills: string[]; 
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SeekerDetails{
  fullName: string;
  profileImage: string;
  headline: string;
  location: string;
  hourlyRate: number;
  overview: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'seeker' | 'recruiter';
  profilePicture: string;
  seekerDetails?: SeekerDetails;
  recruiterDetails?: object;
}

export interface Job {
  _id: string; // MongoDB document ID
  title: string;
  postedBy: string;
  postedAt: string;
  location: string;
  salary: string;
  description: string;
  requiredSkills: string[]; 
  isActive: boolean;
}
