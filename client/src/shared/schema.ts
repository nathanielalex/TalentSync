export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'seeker' | 'recruiter';
  profilePicture: string;
}

export interface Job {
  _id: string; // MongoDB document ID
  title: string;
  company: string;
  postedAt: string;
  location: string;
  salary: string;
  description: string;
  requiredSkills: string[]; 
  skillLevels: number[];
}
