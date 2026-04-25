import { ProjectCard } from "@/components/ProjectCard"
import { AppLayout } from '@/components/AppLayout'
import { useAppSelector } from "@/hooks/useAppDispatch"
import { motion } from "framer-motion"
import { useMemo } from "react"


const Projects = () => {
  const projects = useAppSelector((state) => state.projects.projects)

  const sortedProjects = useMemo(() => [...projects].sort((a, b) => a.createdAt.localeCompare(b.createdAt)), [projects])

  return (
    <AppLayout>
      <motion.div
        className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-6 self-start  flex-1 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {projects.length > 0 ? sortedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        )) : <h3 className="text-text-primary bg-bg-secondary flex items-center text-center text-xl p-3 rounded-full">No Projects</h3>}
      </motion.div>
    </AppLayout>
  )
}

export default Projects