import type { Project } from "@/types/projects"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { setSelectedProject } from "@/store/projectsSlice"
import { motion } from "framer-motion"
import { useMemo } from "react"


interface ProjectCardProps {
  project: Project
}

const statusColor = {
  active: 'bg-green-500',
  archived: 'bg-orange-500'
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const tasks = useAppSelector((state) => state.task.tasks)
  const projectTasks = useMemo(() => tasks.filter(tasks => tasks.projectId === project.id), [tasks, project.id])
  const completedTasks = projectTasks.filter(task => task.status === 'complete').length
  const totalTasks = projectTasks.length
  const formattedDate = project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
    : 'No due date'

  const dispatch = useAppDispatch()


  return (


    <motion.div
      className="border-purple-accent border mb-4 rounded-xl p-6 flex max-w-80 mx-20 md:mx-0 z-50" style={{ background: 'linear-gradient(135deg, #1e1b35, #2d1f5e)' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-2 min-w-0 flex-1">
        <div className="flex items-center">
          <span className={`w-6 h-2 rounded-full border-none ${statusColor[project.status]}`} />
          <h3 className="text-text-primary font-bold pl-2 text-xl cursor-pointer" onClick={() => dispatch(setSelectedProject(project.id))}>{project.title}</h3>
          <div className="min-w-fit shrink-0 pl-6 break-word">
            <div className="w-full bg-bg-secondary rounded-full h-2 border border-purple-accent">
              <div
                className="bg-purple-accent h-2 rounded-full"
                style={{ width: totalTasks === 0 ? '0%' : `${(completedTasks / totalTasks) * 100}%` }}
              />
            </div>
            <span className="text-text-primary text-xs">{completedTasks}/{totalTasks} tasks</span>

          </div>
        </div>
        <div className="text-text-primary text-xs bg-purple-accent px-2 py-1 mt-4 rounded-2xl max-w-full overflow-hidden line-clamp-3">{project.description}</div>
        <div className="mt-4">
          <span className="text-text-secondary bg-transparent px-2 py-3 text-sm">{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  )
}