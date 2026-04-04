import { useState } from "react"


const AddNewProject = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'active' | 'archived'>('active')
  const [dueDate, setDueDate] = useState('')
  const [newMembers, setNewMembers] = useState('')



  const submitProject = () => {

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
              <button className="text-text-primary bg-purple-accent text-center px-4 py-2 mt-6 rounded-full">Add New Project</button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddNewProject