import { useState } from "react"


const NewProjectModal = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'active' | 'archived'>('active')
  const [dueDate, addDueDate] = useState('')
  const [members, addMembers] = useState([])



  const submitProject = () => {

  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 text-center items-center flex justify-center z-50 ">
        <div className="bg-bg-card rounded-xl p-6 w-96">
          <div>
            <h1 className="text-text-primary capitalize font-bold">New Project</h1>
          </div>
          <form onSubmit={submitProject}>
            <div>
              <input type="text" value={title} placeholder="Enter Project Name" className="bg-bg-primary border-2 border-purple-accent text-white px-3 py-1 my-2 rounded-2xl" />
            </div>
            <div>
              <input type="text" value={description} placeholder="Enter description" className="bg-bg-primary border-2 border-purple-accent text-white px-3 py-1 my-2 rounded-2xl" />
            </div>
            <div>
              <select>
                <option>Active</option>
                <option>Archived</option>
              </select>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default NewProjectModal