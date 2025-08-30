import { useState, useRef, useEffect } from 'react'
import Home from './components/orientation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { StarsCanvas } from './canvas'
import Card from './components/ScratchCard'
import ScratchCard from './components/ScratchCard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [showContent, setShowContent] = useState(false)

  const homeRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.inOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'expo.inOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          setShowContent(true)
          this.kill()
        }
      },
    })
  }, [])

  // Fade-in effect when Home mounts
  useEffect(() => {
    if (showContent && homeRef.current) {
      gsap.fromTo(
        homeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.inOut' }
      )
    }
  }, [showContent])

  return (
    <>
      {!showContent && (
        <div className="svg fixed inset-0 z-[100] w-full h-screen overflow-hidden bg-gray-200 flex items-center justify-center">
          <svg
            className="w-full h-full z-[200]"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="white" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    fontSize="min(20vw, 80px)"
                    fontWeight={20}
                    textAnchor="middle"
                    fill="black"
                    dominantBaseline="middle"
                    fontFamily="Arial Black"
                  >
                    E-Cell
                  </text>
                </g>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="black" mask="url(#viMask)" />
          </svg>
          <div className="absolute inset-0 z-0">
            <Home />
          </div>
        </div>
      )}

      {showContent && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/:startupId?/:role?"
              element={
                <div className="relative z-0">
                  <StarsCanvas />
                  <Home />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
