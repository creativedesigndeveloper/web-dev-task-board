import { ProjectCard } from "@/components/ProjectCard"
import { AppLayout } from '@/components/AppLayout'
import { useAppSelector } from "@/hooks/useAppDispatch"
import { motion } from "framer-motion"


const Projects = () => {
  const projects = useAppSelector((state) => state.projects.projects)

  return (
    <>
      <AppLayout>
        <motion.div
          className=" mx-10 my-8 grid grid-cols-1 auto-rows-auto md:grid-cols-3 items-start w-full z-50"
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
          {projects.length > 0 ? [...projects].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(project => (
            <ProjectCard key={project.id} project={project} />
          )) : <h3 className="text-text-primary bg-bg-secondary flex items-center text-center text-xl p-3 rounded-full">No Projects</h3>}
        </motion.div>
      </AppLayout>
    </>
  )
}

export default Projects