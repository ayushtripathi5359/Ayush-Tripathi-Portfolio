import { useEffect, useRef, useState } from 'react'
import { PROFILE, SKILL_GROUPS, JOBS, PROJECTS, emit } from '../data/profile.js'

const PROMPT = 'visitor@ayush:~$'
const QUICK  = ['help', 'whoami', 'ls projects', 'cat experience', 'cat skills', 'hire ayush']
const COMPLETIONS = [
  'help', 'whoami', 'ls', 'ls projects', 'ls experience', 'cat about', 'cat experience', 'cat projects',
  'cat skills', 'cat contact', 'open resume', 'open github', 'open linkedin', 'resume', 'hire ayush',
  'game', 'recruiter', 'clear', 'exit',
  ...PROJECTS.filter(p => p.href).map(p => `open ${p.name.toLowerCase()}`),
]

const open = (href) => window.open(href, '_blank', 'noopener,noreferrer')
const slug = (s) => s.toLowerCase().replace(/\.(txt|pdf|md)$/, '').replace(/\/$/, '')

const HELP = [
  'Available commands:',
  '  whoami              who is this guy',
  '  ls [projects|experience]',
  '  cat <about|experience|projects|skills|contact>',
  '  open <project|resume|github|linkedin>',
  '  hire ayush          the correct command',
  '  game                play Bug Squash',
  '  recruiter           switch to the one-page summary',
  '  clear · exit        (Esc also closes)',
  '',
  'Tip: Tab completes, ↑/↓ recalls history.',
]

/* Returns an array of output lines for a command (or a special action) */
function run(raw) {
  const input = raw.trim()
  if (!input) return []
  const [cmd, ...rest] = input.split(/\s+/)
  const arg = slug(rest.join(' '))

  switch (cmd.toLowerCase()) {
    case 'help':
    case '?':
      return HELP

    case 'whoami':
      return [
        `${PROFILE.name} — ${PROFILE.title}, ${PROFILE.location}`,
        'Builds web, mobile and AI products with React, Next.js, React Native and Node.js.',
        `Currently: ${JOBS[0].role} at ${JOBS[0].company}.`,
      ]

    case 'ls':
      if (arg === 'projects')   return PROJECTS.map(p => `  ${p.name.toLowerCase().replace(/ /g, '-')}${p.href ? '' : '  (in progress)'}`)
      if (arg === 'experience') return JOBS.map(j => `  ${j.company}  —  ${j.period}`)
      if (arg) return [`ls: cannot access '${rest.join(' ')}': No such file or directory`]
      return ['about.txt   contact.txt   experience/   projects/   skills.txt   resume.pdf']

    case 'cat':
      if (!arg) return ['usage: cat <about|experience|projects|skills|contact>']
      if (arg === 'about') return [PROFILE.summary, '', `${PROFILE.education.degree} (${PROFILE.education.period})`, PROFILE.education.school]
      if (arg === 'experience') return JOBS.flatMap(j => [
        `${j.role} @ ${j.company}  [${j.period}]`,
        ...j.points.map(p => `  - ${p}`),
        '',
      ])
      if (arg === 'projects') return PROJECTS.flatMap(p => [`${p.name}  (${p.tags})`, `  ${p.desc}`, p.href ? `  ${p.href}` : '  no public link yet', ''])
      if (arg === 'skills') return SKILL_GROUPS.flatMap(g => [`${g.label}:`, `  ${g.items}`])
      if (arg === 'contact') return [`email     ${PROFILE.email}`, `github    ${PROFILE.github}`, `linkedin  ${PROFILE.linkedin}`]
      if (arg === 'resume') { open(PROFILE.resume); return ['Binary file. Opening resume.pdf in a new tab…'] }
      return [`cat: ${rest.join(' ')}: No such file or directory`]

    case 'open': {
      if (!arg) return ['usage: open <project|resume|github|linkedin>']
      const targets = { resume: PROFILE.resume, github: PROFILE.github, linkedin: PROFILE.linkedin }
      const proj = PROJECTS.find(p => p.name.toLowerCase() === arg || p.name.toLowerCase().replace(/ /g, '-') === arg)
      const href = targets[arg] || proj?.href
      if (!href) return [proj ? `${proj.name} has no public link yet.` : `open: ${rest.join(' ')}: not found. Try 'ls projects'.`]
      open(href)
      return [`Opening ${href} …`]
    }

    case 'resume':
      open(PROFILE.resume)
      return ['Opening resume.pdf in a new tab…']

    case 'hire':
      if (arg && arg !== 'ayush') return [`hire: unknown candidate '${rest.join(' ')}'. Did you mean 'hire ayush'?`]
      open(PROFILE.mailHref)
      return [
        'Excellent decision.',
        'Opening a new email to ' + PROFILE.email + ' …',
        'Offer letters, interview invites and hard questions are all welcome.',
      ]

    case 'game':
    case 'squash':
      return { action: 'game' }
    case 'recruiter':
      return { action: 'recruiter' }
    case 'clear':
      return { action: 'clear' }
    case 'exit':
    case 'quit':
      return { action: 'exit' }

    case 'sudo':
      return ['Permission denied. Nice try — this incident will be reported.']
    case 'echo':
      return [rest.join(' ')]
    case 'pwd':
      return ['/home/ayush/portfolio']
    case 'date':
      return [new Date().toString()]

    default:
      return [`command not found: ${cmd}. Type 'help' for a list.`]
  }
}

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([
    { out: `Ayush Tripathi — portfolio shell. Type 'help' to begin.` },
  ])
  const [value, setValue] = useState('')
  const history  = useRef([])
  const hIndex   = useRef(-1)
  const inputRef = useRef(null)
  const bodyRef  = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const submit = (text) => {
    const result = run(text)
    if (text.trim()) history.current.unshift(text)
    hIndex.current = -1
    setValue('')

    if (result.action === 'clear') return setLines([])
    if (result.action === 'exit')  return onClose()
    if (result.action === 'game')  { onClose(); return emit('app:game') }
    if (result.action === 'recruiter') { onClose(); return emit('app:recruiter', true) }

    setLines(prev => [...prev, { cmd: text }, ...result.map(out => ({ out }))])
  }

  const onKeyDown = (e) => {
    /* keep site-wide key shortcuts (chaos mode etc.) out of the terminal */
    e.stopPropagation()

    if (e.key === 'Escape' || e.key === '`') { e.preventDefault(); return onClose() }
    if (e.key === 'Enter') { e.preventDefault(); return submit(value) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const h = history.current
      const next = hIndex.current + (e.key === 'ArrowUp' ? 1 : -1)
      if (next < -1 || next >= h.length) return
      hIndex.current = next
      setValue(next === -1 ? '' : h[next])
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const v = value.toLowerCase()
      if (!v) return
      const matches = COMPLETIONS.filter(c => c.startsWith(v))
      if (matches.length === 1) setValue(matches[0])
      else if (matches.length > 1) setLines(prev => [...prev, { cmd: value }, { out: matches.join('   ') }])
    }
  }

  return (
    <div className="term" role="dialog" aria-label="Terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-bar">
        <span>ayush@portfolio — zsh</span>
        <button onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close terminal">esc ✕</button>
      </div>

      <div className="term-body" ref={bodyRef} data-lenis-prevent>
        {lines.map((l, i) => (
          l.cmd !== undefined
            ? <div key={i} className="term-line"><span className="term-prompt">{PROMPT}</span> {l.cmd}</div>
            : <div key={i} className="term-line term-out">{l.out || ' '}</div>
        ))}
        <div className="term-line term-input">
          <span className="term-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Terminal input"
          />
        </div>
      </div>

      <div className="term-quick">
        {QUICK.map((q) => (
          <button key={q} onClick={(e) => { e.stopPropagation(); submit(q); inputRef.current?.focus() }}>{q}</button>
        ))}
      </div>
    </div>
  )
}
