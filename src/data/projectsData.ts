import type { ProjectItem } from '../projectsData';
import { PROJECTS_DATA } from '../projectsData';

export type { ProjectItem };
export { PROJECTS_DATA };

// Backwards compatibility aliases if needed
export type Project = ProjectItem;
export const PROJECTS = PROJECTS_DATA;
