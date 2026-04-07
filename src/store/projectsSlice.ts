import type { ProjectState, Project } from "@/types/projects";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjectState = {
  projects: [] as Project[],
  selectedProject: null
}

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },

    setProject: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload)
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((project) => project.id === action.payload.id)

      if(index !== -1) {
        state.projects[index] = action.payload
      }
    },
  }
})

export const {addProject, deleteProject, updateProject, setProject} = projectSlice.actions
export default projectSlice.reducer