import type { Task, TaskState } from "@/types/Task"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


const loadTasks = () => {
  const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : []
}

const initialState: TaskState = {
  tasks: loadTasks(),
  selectedTask: null
}

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      
      if(index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    toggleSubTask: (state, action: PayloadAction<{taskId: string, subTaskId: string}>) => {
      const parentId = state.tasks.findIndex(task => task.id === action.payload.taskId)
      const subId = state.tasks[parentId].subTasks.findIndex(task => task.id === action.payload.subTaskId)
      
      if(subId !== -1) {
        state.tasks[parentId].subTasks[subId].isCompleted = !state.tasks[parentId].subTasks[subId].isCompleted
      }
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload
    },
  }
})

export const {addTask, deleteTask, updateTask, toggleSubTask, setSelectedTask} = taskSlice.actions
export default taskSlice.reducer

