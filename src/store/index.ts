import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice" 
import taskReducer from "@/store/taskSlice"
import projectReducer from "@/store/projectsSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    projects: projectReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store