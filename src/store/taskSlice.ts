import type { SubTask, Task, TaskState } from "@/types/task"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: TaskState = {
  tasks: [] as Task[],
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
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
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
    addSubTask: (state, action: PayloadAction<{taskId: string, subTask: SubTask}>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId)
      if(task) {
        task.subTasks.push(action.payload.subTask)
      }
    }
  }
})

export const {addTask, deleteTask, updateTask, toggleSubTask, setSelectedTask, addSubTask, setTasks} = taskSlice.actions
export default taskSlice.reducer

