import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { mediaUrl } from '../content-assets.js'

// Element overrides. Images/videos referenced in markdown by filename (e.g.
// `![alt](photo.jpg)` or `<img src="photo.jpg">`) are resolved to the file in
// content/photos or content/videos via mediaUrl. These overrides also apply to
// raw <img>/<video> HTML in the markdown (enabled via rehype-raw).
//
// `node` is react-markdown's internal hast node — destructure it out so it
// isn't leaked onto the DOM element via {...props}.
const components = {
  img: ({ node, src, alt, ...props }) => (
    <img src={mediaUrl(src)} alt={alt ?? ''} loading="lazy" {...props} />
  ),
  video: ({ node, src, controls, ...props }) => (
    <video src={mediaUrl(src)} controls={controls ?? true} {...props} />
  ),
  source: ({ node, src, ...props }) => <source src={mediaUrl(src)} {...props} />,
}

// Renders trusted markdown content authored by the club.
// GitHub-flavored markdown (tables, lists, etc.) and inline HTML are allowed.
export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
      urlTransform={(url) => url}
    >
      {children}
    </ReactMarkdown>
  )
}
