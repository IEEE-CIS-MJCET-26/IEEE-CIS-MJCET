import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Cursor() {
  const DOTS = 16                 // number of trail dots
  const BASE_SIZE = 20            // size of the main dot (px)
  const FOLLOW = 0.22             // trail tightness (0.18–0.28 is safe)

  const dotsRef = useRef([])
  const mouse = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  const colors = [
    '#22d3ee',
        '#22d3ee',
        '#22d3ee',
        '#22d3ee',
        '#22d3ee',
        '#22d3ee',
        '#4ad8f0',
        '#7ae1f4',
        '#9fe9f7',
        '#c1f1fa',
        '#e0f8fd',
        '#ffffff',
  ]

  useEffect(() => {
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const animate = () => {
      let prevX = mouse.current.x
      let prevY = mouse.current.y

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return

        // initialize position once
        if (dot._x === undefined) {
          dot._x = prevX
          dot._y = prevY
        }

        // follow previous point
        dot._x += (prevX - dot._x) * FOLLOW
        dot._y += (prevY - dot._y) * FOLLOW

        // size taper (real size, not scale)
        const size = BASE_SIZE * (1 - i / DOTS)

        dot.style.width = `${size}px`
        dot.style.height = `${size}px`
        dot.style.opacity = `${1 - i / DOTS}`

        dot.style.transform = `
          translate3d(
            ${dot._x - size / 2}px,
            ${dot._y - size / 2}px,
            0
          )
        `

        prevX = dot._x
        prevY = dot._y
      })

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return createPortal(
    <>
      {Array.from({ length: DOTS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2147483647,
            backgroundColor: colors[i % colors.length],
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </>,
    document.body
  )
}