export const SITE_NAME = "Kesar Studio";
export const SITE_DESCRIPTION =
  "Premium software agency crafting exceptional digital experiences for ambitious brands.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks, optimized for performance and scale.",
    icon: "Code2",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile solutions that deliver seamless user experiences.",
    icon: "Smartphone",
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed with user research and conversion in mind.",
    icon: "Palette",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure, CI/CD pipelines, and cloud architecture for reliability.",
    icon: "Cloud",
  },
  {
    title: "AI Integration",
    description:
      "Intelligent features powered by machine learning and large language models.",
    icon: "Brain",
  },
  {
    title: "Consulting",
    description:
      "Technical strategy, architecture reviews, and digital transformation guidance.",
    icon: "Lightbulb",
  },
] as const;

export const LEAD_STATUSES = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "MEETING", label: "Meeting" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
] as const;

export const CONTACT_INFO = {
  email: "hello@kesarstudio.com",
  phone: "+1 (555) 123-4567",
  whatsapp: "+15551234567",
  location: "San Francisco, CA",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/kesar-studio" },
  { label: "GitHub", href: "https://github.com/kesar-studio" },
  { label: "Twitter", href: "https://twitter.com/kesarstudio" },
] as const;

export const COMPANY_VALUES = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in design, code, and delivery on every project.",
  },
  {
    title: "Transparency",
    description:
      "Clear communication, honest timelines, and open collaboration from kickoff to launch.",
  },
  {
    title: "Innovation",
    description:
      "We embrace modern tools and thoughtful experimentation to build products that stand out.",
  },
  {
    title: "Partnership",
    description:
      "Your goals become our goals. We work as an extension of your team, not just a vendor.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn your business, users, and goals to define a clear project roadmap.",
  },
  {
    step: "02",
    title: "Design",
    description: "Wireframes and high-fidelity designs aligned with your brand and user needs.",
  },
  {
    step: "03",
    title: "Development",
    description: "Agile sprints with regular demos, clean code, and rigorous quality assurance.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Smooth deployment, performance tuning, and ongoing support after go-live.",
  },
] as const;

export const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "AWS",
  "Vercel",
  "Docker",
  "Figma",
] as const;
