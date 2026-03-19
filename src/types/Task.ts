export interface Task {
  title: string
  id: string
  priority: 'highPriority' | 'midPriority' | 'lowPriority'
  status: 'todo' | 'inProgress' | 'complete',
  category: string
  subTasks: SubTask[]
}

export interface SubTask {
  id: string
  title: string
  isCompleted: boolean
}