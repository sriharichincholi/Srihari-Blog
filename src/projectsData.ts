export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  readme: string;
  category: string;
  repositoryUrl?: string;
  deploymentUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "napier-ai",
    title: "NAPIER AI",
    category: "AI / Quantitative Systems",
    date: "September 2026",
    description: "AI platform developed for team NAPIER AI in the CBIT internal hackathon for Smart India Hackathon 2026.",
    technologies: ["Python", "AI/ML", "TypeScript", "Next.js"],
    readme: "Technical breakdown of the project architecture and Smart India Hackathon internal entry.",
    repositoryUrl: "https://github.com/sriharichincholi",
    deploymentUrl: "https://napier-frontend-phi.vercel.app/"
  },
  {
    id: "manashot-io",
    title: "Manashot.io",
    category: "Systems & Game Development",
    date: "2026",
    description: "3D multiplayer browser game built with Three.js and Node.js featuring raycasting, custom movement physics, and real-time multiplayer synchronization.",
    technologies: ["Three.js", "Node.js", "JavaScript", "WebSockets"],
    readme: "Server architecture breakdown covering movement speed limits, raycasting weapon mechanics, and low-latency socket networking.",
    repositoryUrl: "https://github.com/sriharichincholi",
    deploymentUrl: "https://manashot-io.vercel.app/"
  }
];
