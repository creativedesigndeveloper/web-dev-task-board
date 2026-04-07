export interface Project {
  title: string,
  id: string,
  description: string,
  status: 'active' | 'archived',
  dueDate: string,
}

export interface ProjectState {
  projects: Project
  selectedProject: string | null
}