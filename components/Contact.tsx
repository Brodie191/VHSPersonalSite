export default function Contact() {
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
          <span>Select All</span>
          <span>Copy</span>
          <span>Share</span>
          <span>Clear</span>
        </div>
        <div className="notepad-body">
          {/* EDIT: your links */}
          <a href="mailto:sbabhair@outlook.com">sbabhair@outlook.com</a>
          <a href="https://github.com/Brodie191" target="_blank" rel="noopener noreferrer">
            github.com/Brodie191
          </a>
          <a href="linkedin.com/in/salim-b-685613211" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/SalimBabhair
          </a>
        </div>
      </div>
    </section>
  )
}
