'use client'

import { useRef, useState } from 'react'

const CONTACT_TEXT = [
  'Email: sbabhair@outlook.com',
  'Github: https://github.com/Brodie191',
  'LinkedIn: https://linkedin.com/in/salim-b-685613211',
].join('\n')

const MIN_WIDTH = 280
const MAX_WIDTH = 720
const MIN_HEIGHT = 200
const MAX_HEIGHT = 640
const DRAG_BOUND_X = 320
const DRAG_BOUND_Y = 260

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export default function Contact() {
  const windowRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const statusTimeout = useRef<number | null>(null)
  const [status, setStatus] = useState('')
  const [cleared, setCleared] = useState(false)
  const [customized, setCustomized] = useState(false)

  const pos = useRef({ x: 0, y: 0 })
  const drag = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)
  const resize = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null)
  const frame = useRef<number | null>(null)

  const flash = (msg: string) => {
    setStatus(msg)
    if (statusTimeout.current) window.clearTimeout(statusTimeout.current)
    statusTimeout.current = window.setTimeout(() => setStatus(''), 1500)
  }

  const queue = (fn: () => void) => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(fn)
  }

  const markCustomized = () => {
    const el = windowRef.current
    if (!el) return
    el.style.maxWidth = 'none'
    setCustomized(true)
  }

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = windowRef.current
    if (!el || (e.target as HTMLElement).closest('.notepad-dots')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startX: e.clientX, startY: e.clientY, origX: pos.current.x, origY: pos.current.y }
    el.classList.add('dragging')
  }

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    const x = clamp(drag.current.origX + dx, -DRAG_BOUND_X, DRAG_BOUND_X)
    const y = clamp(drag.current.origY + dy, -DRAG_BOUND_Y, DRAG_BOUND_Y)
    pos.current = { x, y }
    queue(() => {
      const el = windowRef.current
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
    markCustomized()
  }

  const handleDragEnd = () => {
    drag.current = null
    windowRef.current?.classList.remove('dragging')
  }

  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const el = windowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    e.currentTarget.setPointerCapture(e.pointerId)
    resize.current = { startX: e.clientX, startY: e.clientY, startW: rect.width, startH: rect.height }
    el.classList.add('resizing')
  }

  const handleResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resize.current) return
    const dx = e.clientX - resize.current.startX
    const dy = e.clientY - resize.current.startY
    const w = clamp(resize.current.startW + dx, MIN_WIDTH, MAX_WIDTH)
    const h = clamp(resize.current.startH + dy, MIN_HEIGHT, MAX_HEIGHT)
    queue(() => {
      const el = windowRef.current
      if (el) {
        el.style.width = `${w}px`
        el.style.height = `${h}px`
      }
    })
    markCustomized()
  }

  const handleResizeEnd = () => {
    resize.current = null
    windowRef.current?.classList.remove('resizing')
  }

  const handleReset = () => {
    const el = windowRef.current
    pos.current = { x: 0, y: 0 }
    if (el) {
      el.classList.add('resetting')
      el.style.transform = ''
      el.style.width = ''
      el.style.height = ''
      el.style.maxWidth = ''
      window.setTimeout(() => el.classList.remove('resetting'), 250)
    }
    setCustomized(false)
    flash('RESET')
  }

  const handleSelectAll = () => {
    const el = bodyRef.current
    const selection = window.getSelection()
    if (!el || !selection) return
    const range = document.createRange()
    range.selectNodeContents(el)
    selection.removeAllRanges()
    selection.addRange(range)
    flash('SELECTED')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_TEXT)
      flash('COPIED')
    } catch {
      flash('COPY FAILED')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Salim Babhair — Contact', text: CONTACT_TEXT, url })
        flash('SHARED')
      } catch {
        // user cancelled the share sheet
      }
      return
    }
    try {
      await navigator.clipboard.writeText(`${CONTACT_TEXT}\n${url}`)
      flash('LINK COPIED')
    } catch {
      flash('SHARE FAILED')
    }
  }

  const handleClear = () => {
    setCleared((c) => !c)
    flash(cleared ? 'REWOUND' : 'ERASED')
  }

  return (
    <section id="contact">
      <div className="sec-label">// FILE 03</div>
      <div className="sec-title">CONTACT.EXE</div>
      <div className="notepad" ref={windowRef}>
        <div
          className="notepad-bar"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <span>✎ Notepad.txt</span>
          <button
            type="button"
            className="notepad-dots"
            onClick={handleReset}
            title={customized ? 'Reset window' : 'Window is already default'}
            aria-label="Reset window size and position"
          >
            _ □ ✕
          </button>
        </div>
        <div className="notepad-tabs">
          <button type="button" onClick={handleSelectAll}>Select All</button>
          <button type="button" onClick={handleCopy}>Copy</button>
          <button type="button" onClick={handleShare}>Share</button>
          <button type="button" onClick={handleClear}>{cleared ? 'Rewind' : 'Clear'}</button>
          {status && <span className="notepad-status">{status}</span>}
        </div>
        <div className={`notepad-body${cleared ? ' cleared' : ''}`} ref={bodyRef}>
          {cleared ? (
            <p className="erased-msg">// TAPE ERASED — PRESS REWIND TO RESTORE</p>
          ) : (
            <>
              <a href="mailto:sbabhair@outlook.com">Email</a>
              <a href="https://github.com/Brodie191" target="_blank" rel="noopener noreferrer">Github</a>
              <a href="https://linkedin.com/in/salim-b-685613211" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </>
          )}
        </div>
        <div
          className="notepad-resize"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          onPointerCancel={handleResizeEnd}
          title="Drag to resize"
        >
          ◢
        </div>
      </div>
    </section>
  )
}
