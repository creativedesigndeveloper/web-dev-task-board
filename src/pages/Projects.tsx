import { ProjectCard } from "@/components/ProjectCard"
import { Sidebar } from "@/components/Sidebar"
import { useAppSelector } from "@/hooks/useAppDispatch"


const Projects = () => {
  const projects = useAppSelector((state) => state.projects.projects)

  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <div className="m-10">
          {projects.length > 0 ? projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          )) : <h3 className="text-text-primary bg-bg-secondary flex items-center text-center text-xl p-3 rounded-full">No Projects</h3>}
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Projects