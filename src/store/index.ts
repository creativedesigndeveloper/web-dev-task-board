import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice" 
import taskReducer from "@/store/taskSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store