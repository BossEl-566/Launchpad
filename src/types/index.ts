export type OpportunityType = "Internship" | "Research" | "Volunteer" | "Scholarship" | "Job";
export type OpportunityMode = "Remote" | "Hybrid" | "Onsite";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  mode: OpportunityMode;
  location: string;
  stipend: string;
  category: string;
  matchScore: number;
  skills: string[];
  summary: string;
  description: string;
  deadline: string;
  postedAt: string;
  featured?: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  category: "Core" | "Elective";
  progress: number;
}

export interface Activity {
  id: string;
  kind: "Internship" | "Research" | "Volunteer" | "Certification";
  title: string;
  organization: string;
  period: string;
  verified: boolean;
  bullets: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  tone: "info" | "success" | "warning";
  read: boolean;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  blurb: string;
  status: "Done" | "Active" | "Locked";
}

export interface ElectiveSuggestion {
  id: string;
  title: string;
  reason: string;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  degree: string;
  school: string;
  year: string;
  goal: string;
  summary: string;
  completion: number;
  skills: string[];
  interests: string[];
  languages: string[];
}
