import fm from 'front-matter';

export interface ProjectFrontmatter {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl: string;
  previews: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  tags: string[];
  readme: string;
  category: string;
  repoUrl: string;
  demoUrl: string;
  previews: string[];
  repositoryUrl?: string;
  deploymentUrl?: string;
}

const getImagePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

// Dynamically load all markdown project files from src/Projects/
const rawProjectFiles = import.meta.glob('./Projects/*.md*', { query: '?raw', import: 'default', eager: true });

export const PROJECTS_DATA: ProjectItem[] = Object.keys(rawProjectFiles).map((filePath) => {
  const fileContent = rawProjectFiles[filePath] as string;
  const parsed = fm<ProjectFrontmatter>(fileContent);
  const attr = parsed.attributes;

  const resolvedPreviews = (attr.previews || []).map((p) => getImagePath(p));

  return {
    id: attr.id,
    title: attr.title,
    category: attr.category,
    date: attr.date,
    description: attr.description,
    technologies: attr.tags || [],
    tags: attr.tags || [],
    repoUrl: attr.repoUrl,
    demoUrl: attr.demoUrl,
    repositoryUrl: attr.repoUrl,
    deploymentUrl: attr.demoUrl,
    previews: resolvedPreviews,
    readme: parsed.body,
  };
});
