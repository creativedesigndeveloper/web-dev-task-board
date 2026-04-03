export interface Project {
  title: string,
  id: string,
  description: string,
  status: 'active' | 'archived',
  dueDate: string,
  members: string[]
}

export interface ProjectState {
  projects: Project[]
  selectedProject: string | null
}