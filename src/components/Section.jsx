import Markdown from './Markdown.jsx'
import { getContent } from '../content.js'

// A page section backed by a markdown file in /content.
// `name` is the markdown filename without its extension (e.g. "about").
// An empty or missing file renders nothing, so the layout never breaks.
export default function Section({ name, className = '' }) {
  const md = getContent(name)
  if (!md.trim()) return null
  return (
    <section id={name} className={`section ${className}`.trim()}>
      <div className="section-inner">
        <Markdown>{md}</Markdown>
      </div>
    </section>
  )
}
