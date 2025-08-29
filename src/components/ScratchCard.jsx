import { AnimatePresence, motion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

const WobbleScratchCard = ({
  width,
  height,
  coverImage,
  children,
  onComplete,
}) => {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const [isComplete, setIsComplete] = useState(false)
  const overlayDrawnRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')


    if (!overlayDrawnRef.current) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#e5e7eb' 
      ctx.fillRect(0, 0, width, height)

      const overlayImg = new Image()
      overlayImg.src = coverImage
      overlayImg.onload = () => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(overlayImg, 0, 0, width, height)
        overlayDrawnRef.current = true
      }
    }

    const getPercent = () => {
      const imageData = ctx.getImageData(0, 0, width, height)
      let cleared = 0
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) cleared++
      }
      return (cleared / (width * height)) * 100
    }

    const scratch = (e) => {
      if (!isDrawingRef.current || isComplete) return
      const rect = canvas.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top

      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 40 // diameter of the scratch brush
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()

      lastPosRef.current = { x, y }
    }

    const startDrawing = (e) => {
      if (isComplete) return
      isDrawingRef.current = true

      const rect = canvas.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
      lastPosRef.current = { x, y }

      scratch(e)
    }

    const endDrawing = () => {
      if (isComplete) return
      isDrawingRef.current = false
      if (getPercent() > 60) {
        setIsComplete(true)
        onComplete?.()
      }
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('mouseup', endDrawing)
    canvas.addEventListener('mouseleave', endDrawing)
    canvas.addEventListener('touchstart', startDrawing)
    canvas.addEventListener('touchmove', scratch)
    canvas.addEventListener('touchend', endDrawing)
    canvas.addEventListener('touchcancel', endDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', scratch)
      canvas.removeEventListener('mouseup', endDrawing)
      canvas.removeEventListener('mouseleave', endDrawing)
      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', scratch)
      canvas.removeEventListener('touchend', endDrawing)
      canvas.removeEventListener('touchcancel', endDrawing)
    }
  }, [width, height, coverImage, isComplete, onComplete])

  return (
    <motion.div
      animate={{
        rotate: [0, 2, -2, 1, -1, 0],
        scale: [1, 1.01, 0.99, 1.005, 0.995, 1],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className="relative rounded-xl overflow-hidden shadow-[3px_20px_35px_12px_#4a5568]"
      style={{ width, height }}
    >
      {/* Content behind the scratch card */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {children}
      </div>

      {/* Scratchable overlay */}
      {!isComplete && (
        <AnimatePresence>
          <motion.canvas
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.3 },
            }}
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 rounded-xl cursor-pointer z-10"
          />
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default WobbleScratchCard
