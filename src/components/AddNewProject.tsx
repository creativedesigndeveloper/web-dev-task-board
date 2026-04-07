import { useState } from "react"
import { addProjectToFirestore } from "@/api/projectApi"
import { addProject } from "@/store/projectsSlice"
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch"

interface AddNewProjectProps {
  onClose: () => void
}


const AddNewProject = ({ onClose }: AddNewProjectProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'active' | 'archived'>('active')
  const [dueDate, setDueDate] = useState('')
  const [newMembers, setNewMembers] = useState('')
  const userId = useAppSelector((state) => state.auth.user?.id)
  const dispatch = useAppDispatch()



  const submitProject = (e: React.FormEvent) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    if (!userId) return
    dispatch(addProject({
      title: title,
      id: id,
      description: description,
      status: status,
      dueDate: dueDate,
      members: []
    }))
    addProjectToFirestore({
      title: title,
      id: id,
      description: description,
      status: status,
      dueDate: dueDate,
      members: []
    }, userId)
    onClose()
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('active')
    setNewMembers('')
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 text-center items-center flex justify-center z-50 ">
        <div className="bg-bg-card rounded-xl p-6 w-180">
          <div>
            <h1 className="text-purple-600 capitalize font-bold mb-3 text-2xl justify-center">New Project Info</h1>
          </div>
          <form onSubmit={submitProject}>
            <div className="flex items-center justify-center gap-6">
              <div>
                <h2 className="text-white font-bold">Title</h2>
                <input type="text" value={title} placeholder="Enter Project Name" className="bg-bg-primary border-2 border-purple-accent text-white px-3 py-1 my-2 rounded-2xl" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <h2 className="text-white font-bold">Description</h2>
                <input type="text" value={description} placeholder="Enter description" className="bg-bg-primary border-2 border-purple-accent text-white px-3 py-1 my-2 rounded-2xl" onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <h2 className="text-white font-bold">Due Date</h2>
                <input type="date" placeholder="Enter due date" className="text-white bg-bg-primary border-2 border-purple-accent px-3 py-1 my-2 rounded-2xl" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>

            </div>
            <div>
              <h2 className="text-white font-bold">Status</h2>
              <select className="text-white bg-bg-primary px-10 py-1 my-2" value={status} onChange={(e) => setStatus((e.target as HTMLSelectElement).value as 'active' | 'archived')}>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <h2 className="text-text-primary font-bold my-4">Add Members</h2>
              <input
                type="text"
                value={newMembers}
                placeholder="Add new members"
                onChange={(e) => setNewMembers(e.target.value)} className="text-white bg-bg-primary border-2 border-purple-accent px-3 py-1 rounded-2xl" />
            </div>
            <div>
              <button type="submit" className="text-text-primary bg-purple-accent text-center px-4 py-2 mt-6 rounded-full" >Add New Project</button>
            </div>
            <div>
              <button className="bg-red-500 p-3 pt-0 pb-0 mt-7 rounded-full text-text-primary" type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddNewProject