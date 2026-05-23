import { useEffect, useRef } from 'react'

const CYCLE =
  'CLUB LUMOS · WHERE DARKNESS BECOMES ART · RESERVE YOUR TABLE · ' +
  'PREMIUM BAR · VIP TABLES · LIVE DJS · EXCLUSIVE LOUNGE · ' +
  'WHERE NIGHT BECOMES LEGEND · SIGNATURE COCKTAILS · TONBERRY\'S FINEST · '

const FACE_HTML = `<p>${CYCLE.repeat(60)}</p>`

const BG_URL  = 'https://i.ibb.co/q3XSxR9W/20250831-120144.jpg'
const PPL_URL = 'https://i.ibb.co/Y4FKvK38/20250831-113022.png'

export function LumosAnimation() {
  const contentRef = useRef(null)

  useEffect(() => {
    function resize() {
      if (!contentRef.current) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      // "cover" scale — room always fills the full viewport
      const scale = Math.max(vw / 1000, vh / 562)
      contentRef.current.style.transform       = `scale(${scale})`
      contentRef.current.style.transformOrigin = 'center center'
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const walls = (
    <>
      <div className="lf lf-top" />
      <div className="lf lf-bottom" />
      <div className="lf lf-left"  dangerouslySetInnerHTML={{ __html: FACE_HTML }} />
      <div className="lf lf-right" dangerouslySetInnerHTML={{ __html: FACE_HTML }} />
      <div className="lf lf-front" />
      <div className="lf lf-back"  dangerouslySetInnerHTML={{ __html: FACE_HTML }} />
    </>
  )

  return (
    <div className="lanim-wrap">
      <div ref={contentRef} className="lanim-content">
        <div className="lanim-scene">

          <div className="lanim-hue" />

          <img className="lanim-bg" src={BG_URL} alt="" loading="eager"
               onError={e => { e.target.style.display = 'none' }} />
          <img className="lanim-ppl" src={PPL_URL} alt="" loading="eager"
               onError={e => { e.target.style.display = 'none' }} />

          {/* main room */}
          <div className="lanim-stage">
            <div className="lanim-cube">{walls}</div>
          </div>

          {/* reflection pool */}
          <div className="lanim-stage lanim-reflect">
            <div className="lanim-cube">{walls}</div>
          </div>

        </div>
      </div>
    </div>
  )
}
