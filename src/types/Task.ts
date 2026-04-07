export interface Task {
  title: string
  id: string
  priority: 'highPriority' | 'midPriority' | 'lowPriority'
  status: 'todo' | 'inProgress' | 'complete'
  category: string
  subTasks: SubTask[]
  projectId?: string
}

export interface SubTask {
  id: string
  title: string
  isCompleted: boolean
}

export interface TaskState {
  tasks: Task[]
  selectedTask: Task | null
}