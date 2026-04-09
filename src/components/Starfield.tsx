import { useEffect, useRef } from "react"


const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const startAngle = 0
    const endAngle = Math.PI * 2

    const stars = Array.from({ length: 200 }, () => {
      const starObj = {
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random(),
        radius: Math.random() * (2 - 0.5) + 0.5,
        opacity: Math.random() * (1 - 0.3) + 0.3,
        speed: Math.random() * (0.02 - 0.0005) + 0.0005,
      }

      return starObj

    })
    let animationId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => {
        s.opacity += s.speed
        if (s.opacity > 1 || s.opacity < 0.3) s.speed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, startAngle, endAngle)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])
  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  )
}

export default Starfield