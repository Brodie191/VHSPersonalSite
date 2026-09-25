'use client'

import { useRef, useState } from 'react'

const CONTACT_TEXT = [
  'Email: sbabhair@outlook.com',
  'Github: https://github.com/Brodie191',
  'LinkedIn: https://linkedin.com/in/salim-b-685613211',
].join('\n')

export default function Contact() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const statusTimeout = useRef<number | null>(null)
  const [status, setStatus] = useState('')
  const [cleared, setCleared] = useState(false)

  const flash = (msg: string) => {
    setStatus(msg)
    if (statusTimeout.current) window.clearTimeout(statusTimeout.current)
    statusTimeout.current = window.setTimeout(() => setStatus(''), 1500)
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
      <div className="notepad">
        <div className="notepad-bar">
          <span>✎ Notepad.txt</span>
          <span className="dots">_ □ ✕</span>
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
      </div>
    </section>
  )
}
