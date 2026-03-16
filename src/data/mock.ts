import {
  Activity,
  Course,
  ElectiveSuggestion,
  NotificationItem,
  Opportunity,
  RoadmapMilestone,
  StudentProfile,
} from "../types";

export const profile: StudentProfile = {
  name: "Miriam Adjei",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  degree: "BSc Computer Science",
  school: "University of Ghana",
  year: "Level 300",
  goal: "Product-minded mobile engineer with AI and UX focus",
  summary:
    "Student builder focused on mobile products, human-centered design, and practical industry exposure before graduation.",
  completion: 84,
  skills: ["React Native", "TypeScript", "UI Design", "Python", "Research", "Public Speaking"],
  interests: ["AI", "Product Design", "EdTech", "Community", "Data"],
  languages: ["English", "Twi"],
};

export const quickStats = [
  { label: "Profile score", value: "84%" },
  { label: "Verified entries", value: "12" },
  { label: "Open matches", value: "18" },
  { label: "CV readiness", value: "91%" },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Mobile Engineering Intern",
    company: "Nova Labs",
    type: "Internship",
    mode: "Hybrid",
    location: "Accra, Ghana",
    stipend: "GHS 1,500 / month",
    category: "Engineering",
    matchScore: 96,
    skills: ["React Native", "TypeScript", "Git"],
    summary:
      "Join a product team shipping student-focused features and assist with mobile QA, components, and release support.",
    description:
      "Nova Labs is looking for a proactive student who can support feature delivery, improve reusable UI components, and contribute to sprint reviews. You will collaborate with a product designer and engineer mentor while building hands-on mobile experience.",
    deadline: "April 18, 2026",
    postedAt: "2h ago",
    featured: true,
  },
  {
    id: "opp-2",
    title: "Research Assistant - Human Centered AI",
    company: "UG Computing Lab",
    type: "Research",
    mode: "Onsite",
    location: "Legon, Ghana",
    stipend: "Certificate + stipend",
    category: "Research",
    matchScore: 92,
    skills: ["Research", "Python", "Writing"],
    summary:
      "Support literature reviews, participant coordination, and data preparation for an AI and education study.",
    description:
      "This role is ideal for students interested in responsible AI, educational systems, and academic writing. You will help organize sessions, document findings, and support presentation preparation.",
    deadline: "April 10, 2026",
    postedAt: "5h ago",
  },
  {
    id: "opp-3",
    title: "Student Product Designer",
    company: "SkillBridge Africa",
    type: "Volunteer",
    mode: "Remote",
    location: "Remote",
    stipend: "Volunteer",
    category: "Design",
    matchScore: 88,
    skills: ["Figma", "UX", "Communication"],
    summary:
      "Contribute to wireframes and user flows for a youth employability platform while working with a remote team.",
    description:
      "SkillBridge is inviting student creatives to support product research, interface design, and feedback sessions. This is a great fit for students building design portfolios and real case studies.",
    deadline: "April 25, 2026",
    postedAt: "Yesterday",
  },
  {
    id: "opp-4",
    title: "Women in Tech Exchange Scholarship",
    company: "Global Fellows Hub",
    type: "Scholarship",
    mode: "Remote",
    location: "Berlin + virtual prep",
    stipend: "Travel + tuition covered",
    category: "Scholarship",
    matchScore: 85,
    skills: ["Leadership", "Academics", "Projects"],
    summary:
      "A short international exchange opportunity for women building solutions with technology and social impact.",
    description:
      "Applicants should demonstrate academic consistency, project initiative, and leadership potential. The program combines online workshops, mentorship, and an in-person innovation week.",
    deadline: "May 02, 2026",
    postedAt: "2 days ago",
  },
  {
    id: "opp-5",
    title: "Junior Frontend Developer",
    company: "Campus Commerce",
    type: "Job",
    mode: "Remote",
    location: "Remote",
    stipend: "Entry level salary",
    category: "Engineering",
    matchScore: 81,
    skills: ["React", "TypeScript", "Testing"],
    summary:
      "Part-time junior frontend role for final year students with strong UI implementation skills and ownership mindset.",
    description:
      "Campus Commerce wants final-year students who can move from design to polished screens quickly. You will improve the dashboard UI, help build reusable patterns, and participate in feedback reviews.",
    deadline: "May 15, 2026",
    postedAt: "3 days ago",
  },
];

export const courses: Course[] = [
  { id: "c1", code: "DCIT 302", title: "Human Computer Interaction", credits: 3, category: "Core", progress: 89 },
  { id: "c2", code: "DCIT 304", title: "Mobile App Development", credits: 3, category: "Core", progress: 93 },
  { id: "c3", code: "DCIT 308", title: "Data Mining", credits: 3, category: "Elective", progress: 67 },
  { id: "c4", code: "DCIT 318", title: "Software Quality Assurance", credits: 3, category: "Elective", progress: 74 }
];

export const activities: Activity[] = [
  {
    id: "a1",
    kind: "Internship",
    title: "UI Engineering Intern",
    organization: "BrightPath Systems",
    period: "Jun 2025 - Aug 2025",
    verified: true,
    bullets: [
      "Built reusable mobile UI sections for the student dashboard.",
      "Collaborated with QA to reduce visual bugs before release."
    ]
  },
  {
    id: "a2",
    kind: "Volunteer",
    title: "Tech Community Lead",
    organization: "Women Build Africa",
    period: "Jan 2025 - Present",
    verified: true,
    bullets: [
      "Coordinated mentorship meetups for student developers.",
      "Curated design and career resources for new members."
    ]
  },
  {
    id: "a3",
    kind: "Research",
    title: "Student Research Volunteer",
    organization: "Learning Innovation Studio",
    period: "Sep 2025 - Nov 2025",
    verified: false,
    bullets: [
      "Assisted with participant scheduling and survey clean-up.",
      "Prepared data summaries for presentation slides."
    ]
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New internship match",
    message: "Nova Labs just posted an internship that matches 96% of your profile.",
    createdAt: "10 min ago",
    tone: "success",
    read: false,
  },
  {
    id: "n2",
    title: "Elective suggestion",
    message: "Your AI roadmap recommends Data Mining and Software Quality Assurance next semester.",
    createdAt: "1h ago",
    tone: "info",
    read: false,
  },
  {
    id: "n3",
    title: "Verification pending",
    message: "Your research volunteer entry is waiting for supervisor confirmation.",
    createdAt: "Yesterday",
    tone: "warning",
    read: true,
  }
];

export const milestones: RoadmapMilestone[] = [
  { id: "m1", title: "Build a polished mobile portfolio case study", blurb: "Turn your internship and class projects into portfolio proof.", status: "Active" },
  { id: "m2", title: "Complete a research experience", blurb: "You already started this. Next step is supervisor verification.", status: "Done" },
  { id: "m3", title: "Earn one production-focused certification", blurb: "A short cloud or testing certificate can strengthen your profile.", status: "Active" },
  { id: "m4", title: "Apply to 3 strong internships before finals", blurb: "AI has already shortlisted 6 high match options for you.", status: "Locked" }
];

export const electiveSuggestions: ElectiveSuggestion[] = [
  {
    id: "e1",
    title: "Data Mining",
    reason: "Supports your AI and product analytics path by strengthening data reasoning."
  },
  {
    id: "e2",
    title: "Software Quality Assurance",
    reason: "Improves your ability to ship clean mobile products and work with engineering teams."
  },
  {
    id: "e3",
    title: "Entrepreneurship",
    reason: "Useful if you want to turn student products into startups after school."
  }
];

export const aiTips = [
  "Your profile is strongest in mobile product work. Prioritize internships where you can own reusable components.",
  "Add one measurable result to each CV bullet so recruiters can quickly understand your impact.",
  "You qualify for 4 research opportunities because of your writing and coordination activity history."
];
