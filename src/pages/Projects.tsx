import AddNewProject from "@/components/AddNewProject"
import { Sidebar } from "@/components/Sidebar"


const Projects = () => {
  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <div>
          <button className="text-text-primary bg-purple-accent px-5 py-2 rounded-2xl m-3">Create Project +</button>
          <AddNewProject />
        </div>
      </div>
    </>
  )
}

export default Projects