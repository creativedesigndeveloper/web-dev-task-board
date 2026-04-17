import CustomCheckbox from "@/components/CustomCheckbox"
import PomodoroTimer from "@/components/PomodoroTimer"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { toggleSubTask } from "@/store/taskSlice"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const FocusPage = () => {
  const tasks = useAppSelector((state) => state.task.tasks)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const taskId = location.state?.taskId
  const navigate = useNavigate()



  const focusTask = tasks.find(task => task.id === taskId)
  const nextTask = tasks.find(task => task.status === focusTask?.status && task.id !== taskId)
  return (
    <>
      <div className="flex  bg-bg-primary min-h-screen">
        <div className=" flex-1 max-w-screen mx-auto px-4 py-10">


          <div className="grid grid-cols-3 w-full border-b-2 border-purple-200/60">
            <span className="text-purple-500 font-bold text-3xl capitalize  px-5 bg-bg-primary cursor-pointer" onClick={() => navigate('/dashboard')}> ← </span>
            <span className="text-text-primary text-xl md:text-3xl capitalize text-center bg-bg-primary px-5">Today's Focus</span>
            <div />
          </div>


          <div className="bg-bg-secondary w-full p-10 my-10 rounded-2xl mx-auto max-w-120 card-glow">
            <h2 className="text-text-primary bg-bg-secondary py-3 text-center rounded-md text-2xl border-2 card-glow border-purple-500 shadow-[0_10px_8px_2px_rgba(0,0,0,0.8)]">{focusTask?.title}</h2>
          </div>

          <div className="relative flex items-center">
            <div className="absolute border-t-2 w-full border-purple-200/60" />
            <span className=" bg-bg-primary p-5 text-text-primary relative text-left font-extrabold">Steps</span>
            <div className="flex-1 text-center mt-2">
              {
                focusTask?.subTasks.map((subtask) => (
                  <div key={subtask.id} className="relative mx-10">
                    <CustomCheckbox checked={subtask.isCompleted} onChange={(_checked) =>
                      dispatch(toggleSubTask({
                        taskId: focusTask.id,
                        subTaskId: subtask.id
                      }))}
                      label={subtask.title} />
                  </div>
                ))}
            </div>

          </div>


          <div className="mt-10">
            <div className="flex items-center relative">
              <div className=" border-t-2 w-full absolute border-purple-200/60" />
              <span className=" text-text-primary p-5 text-left relative bg-bg-primary font-extrabold">Next Task</span>
            </div>
            <div className=" mt-10 mx-auto w-full max-w-120">
              <div className="text-left text-2xl md:text-4xl py-10 px-5 text-text-primary bg-bg-secondary rounded-2xl">
                {nextTask?.title ?? 'No more new tasks!'}
              </div>
            </div>
          </div>
          <div className=" text-4xl mt-20 text-center">
            <PomodoroTimer />
          </div>
        </div>
      </div>
    </>
  )
}

export default FocusPage