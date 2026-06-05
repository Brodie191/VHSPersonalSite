'use client'

import { useState, useEffect } from 'react'

const CHANNELS = [
  { cls: '',          num: '01' },
  { cls: 'ch-green',  num: '02' },
  { cls: 'ch-amber',  num: '03' },
]

function fmtTime(ms: number) {
  const t = Math.floor(ms / 1000)
  const h = String(Math.floor(t / 3600)).padStart(2, '0')
  const m = String(Math.floor(t / 60) % 60).padStart(2, '0')
  const s = String(t % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

export default function CRTFrame({ children }: { children: React.ReactNode }) {
  const [ci, setCi] = useState(0)
  const [timecode, setTimecode] = useState('00:00:00')
  const [datestamp, setDatestamp] = useState('')

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const now = new Date()
    const mon = now.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    setDatestamp(
      `${mon} ${String(now.getDate()).padStart(2, '0')}.${String(now.getFullYear()).slice(2)}`
    )

    const start = Date.now()
    const id = setInterval(() => setTimecode(fmtTime(Date.now() - start)), 500)
    return () => clearInterval(id)
  }, [])

  const cycleChannel = () => {
    setCi(prev => (prev + 1) % CHANNELS.length)
  }

  return (
    <div className={`crt-root ${CHANNELS[ci].cls}`}>
      {/* z:9500 — power-on sweep */}
      <div className="power-on" />

      {/* z:8800 — physical CRT bezel */}
      <div className="crt-bezel" />

      {/* z:9000 — CRT effect overlays */}
      <div className="crt-vignette" />
      <div className="crt-scanlines" />
      <div className="crt-grain" />
      <div className="crt-flicker" />

      {/* z:60 — HUD */}
      <div className="hud">
        <div className="hud-left">
          <span>
            <span className="rec-dot blink">●</span>
            {' '}REC &nbsp; PLAY
          </span>
          <span>{timecode}</span>
        </div>
        <div className="hud-right">
          <span>{datestamp}</span>
          <span>
            SP &nbsp;{' '}
            <button
              className="ch-btn"
              onClick={cycleChannel}
              title="Switch phosphor channel"
            >
              CH{CHANNELS[ci].num}
            </button>
          </span>
        </div>
      </div>

      {children}
    </div>
  )
}
