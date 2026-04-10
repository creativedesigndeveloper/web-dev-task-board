import CustomCheckbox from "@/components/CustomCheckbox"
import PomodoroTimer from "@/components/PomodoroTimer"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { toggleSubTask } from "@/store/taskSlice"
import { useLocation } from "react-router-dom"


const FocusPage = () => {
  const tasks = useAppSelector((state) => state.task.tasks)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const taskId = location.state?.taskId



  const focusTask = tasks.find(task => task.id === taskId)
  const nextTask = tasks.find(task => task.status === focusTask?.status && task.id !== taskId)
  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <div className=" flex-1 text-center justify-center max-w-screen mx-auto px-4 py-10">
          <div className="relative">
            <div className="absolute left-0 w-screen border border-purple-200 opacity-40  mt-3" />
            <span className="text-text-primary text-3xl capitalize relative bottom-1.5 bg-bg-primary px-5">Today's Focus</span>
            <div className="bg-bg-secondary p-10 my-5 rounded-2xl mx-auto max-w-120 card-glow">
              <h2 className="text-text-primary bg-bg-secondary py-3  rounded-md text-2xl border-2 card-glow border-purple-500 shadow-[0_10px_8px_2px_rgba(0,0,0,0.8)]">{focusTask?.title}</h2>
            </div>
          </div>
          <div className="text-left relative">
            <div className="w-screen border border-purple-200 opacity-40 absolute  mt-3" />
            <span className="relative bg-bg-primary p-5 text-text-primary">Steps</span>
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
          <div className="text-text-primary mt-10 text-left relative">
            <div>
              <div className="w-screen border border-purple-200 opacity-40 mt-3 absolute" />
              <span className="relative bg-bg-primary p-5">Next Task</span>
            </div>
            <div className=" mt-10 mx-auto max-w-120">
              <div className="text-left text-2xl md:text-4xl py-10 px-5 bg-bg-secondary rounded-2xl">
                {nextTask?.title ?? 'No more new tasks!'}
              </div>
            </div>
            <div className="w-screen border border-purple-200 opacity-40 absolute mt-10" />
          </div>
          <div className=" text-4xl mt-20">
            <PomodoroTimer />
          </div>
        </div>
      </div>
    </>
  )
}

export default FocusPage