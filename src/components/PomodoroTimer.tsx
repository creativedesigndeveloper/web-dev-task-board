import { useEffect, useState } from "react"


const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`


  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsBreak(current => {
            const switchingToBreak = !current

            setTimeLeft(switchingToBreak ? 5 * 60 : 25 * 60)
            return switchingToBreak
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)


  }, [isRunning])


  const resetPomodoroTimer = () => {
    setTimeLeft(25 * 60)
    setIsRunning(false)
  }

  return (
    <>
      <h3 className="text-text-primary">{isBreak ? 'Break Time!' : 'Focus Time!'}</h3>
      <span className="text-text-primary">{display}</span>
      <button type='button' className={`${isRunning ? 'text-text-primary bg-red-500' : 'text-black bg-green-300'} ml-4 p-5 pt-0 pb-0 rounded-2xl`} onClick={() => setIsRunning(prev => !prev)}>{isRunning ? 'Pause' : 'Start'}</button>
      <button type="button" className="text-text-primary bg-red-500 ml-4 p-5 pt-0 pb-0 rounded-2xl" onClick={resetPomodoroTimer}>Reset</button>
    </>
  )
}

export default PomodoroTimer