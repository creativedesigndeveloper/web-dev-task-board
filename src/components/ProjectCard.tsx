import type { Project } from "@/types/projects"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { deleteProject } from "@/store/projectsSlice"
import { deleteProjectToFirestore } from "@/api/projectApi"


interface ProjectCardProps {
  project: Project
}

const statusColor = {
  active: 'bg-green-500',
  archived: 'bg-orange-500'
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const projectTasks = useAppSelector((state) => state.task.tasks.filter(tasks => tasks.projectId === project.id))
  const completedTasks = projectTasks.filter(task => task.status === 'complete').length
  const totalTasks = projectTasks.length

  const dispatch = useAppDispatch()

  const deleteProjects = () => {
    dispatch(deleteProject(project.id))
    deleteProjectToFirestore((project))
  }


  return (


    <div
      className="border-purple-accent border rounded-xl p-6 mb-3 flex" style={{ background: 'linear-gradient(135deg, #1e1b35, #2d1f5e)' }}>
      <div className="mb-2">
        <div className="flex items-center">
          <h3 className="text-text-primary font-bold mr-10 text-xl">{project.title}</h3>
          <span className={`w-3 h-3 rounded-full ${statusColor[project.status]}`} />
        </div>
        <div className="text-text-primary bg-purple-accent px-2 py-1 mt-4 rounded-full text-xs w-16">{project.description}</div>
      </div>
      <div className="ml-auto w-64">
        <div className="w-full bg-bg-secondary rounded-full h-2 border border-purple-accent">
          <div
            className="bg-purple-accent h-2 rounded-full"
            style={{ width: totalTasks === 0 ? '0%' : `${(completedTasks / totalTasks) * 100}%` }}
          />
        </div>
        <span className="text-text-primary text-xs">{completedTasks}/{totalTasks} tasks</span>

        <div className="mt-4">
          <span className="text-text-secondary bg-transparent px-2 py-3 text-sm">{project.dueDate}</span>
        </div>
        <button className="bg-red-500 text-white px-5 py-1 rounded-2xl mt-2" onClick={deleteProjects}>Delete</button>

      </div>
    </div>
  )
}