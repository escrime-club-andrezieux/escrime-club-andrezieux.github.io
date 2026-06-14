import Markdown from './Markdown.jsx'
import { getContent } from '../content.js'

// Page footer: blue background, white text. Shows the club's contact info,
// which is edited in content/contact.md (same file as before — it now feeds
// the footer instead of an in-page section).
export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer-inner">
        <Markdown>{getContent('contact')}</Markdown>
      </div>
    </footer>
  )
}
