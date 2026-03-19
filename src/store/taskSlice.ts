import type { SubTask, Task, TaskState } from "@/types/Task"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: TaskState = {
  tasks: [],
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
  }
})

export const {addTask, deleteTask, updateTask, toggleSubTask} = taskSlice.actions
export default taskSlice.reducer

