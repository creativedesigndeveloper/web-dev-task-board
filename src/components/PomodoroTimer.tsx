import { useEffect, useState } from "react"


const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [_isBreak, setIsBreak] = useState(false)

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

  const skipClock = () => {
    setIsBreak(current => {
      const switchingToBreak = !current

      setTimeLeft(switchingToBreak ? 5 * 60 : 25 * 60)
      return switchingToBreak
    })

  }

  const resetClock = () => {
    setIsRunning(current => {
      const currentClock = current

      setTimeLeft(timeLeft ? 25 * 60 : 5 * 60)
      return currentClock
    })
  }




  return (
    <>
      <div>
        <span className={`text-text-primary ${isRunning ? 'bg-purple-accent' : 'bg-bg-secondary'} py-1 px-15 rounded-2xl`}
          onClick={() => { setIsRunning((prev) => !prev) }

          }>{display}</span>
        <span className="text-text-primary bg-purple-accent mx-5 px-12 py-2 text-2xl rounded-2xl" onClick={skipClock}>Skip</span>
        <span className="text-text-primary bg-purple-accent  px-12 py-2 text-2xl rounded-2xl" onClick={resetClock}>Reset</span>
      </div>
    </>
  )
}

export default PomodoroTimer