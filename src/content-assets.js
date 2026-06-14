// Resolves the images/videos stored in the editable /content folder to the
// hashed URLs Vite produces at build time. This is what lets ALL editable
// content (text + media) live in one /content folder instead of /public:
// Vite can only auto-discover and bundle media that is imported (not files in
// /public), so everything here is loaded via import.meta.glob.

function firstUrl(modules) {
  const values = Object.values(modules)
  return values.length ? values[0] : ''
}

// Club logo — content/logo.* (also used as the favicon, see main.jsx).
export const logoUrl = firstUrl(
  import.meta.glob('/content/logo.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

// Header background banner — content/banniere.*
export const bannerUrl = firstUrl(
  import.meta.glob('/content/banniere.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

// Photos and videos that can be referenced from the markdown texts.
const mediaModules = {
  ...import.meta.glob(
    '/content/photos/*.{jpg,jpeg,png,webp,gif,avif,svg,JPG,JPEG,PNG,WEBP,GIF,AVIF,SVG}',
    { eager: true, query: '?url', import: 'default' },
  ),
  ...import.meta.glob('/content/videos/*.{mp4,webm,ogg,mov,MP4,WEBM,OGG,MOV}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
}

const mediaByName = {}
for (const [path, url] of Object.entries(mediaModules)) {
  mediaByName[path.split('/').pop()] = url
}

// Given a filename used in markdown (e.g. "photo.jpg" — folders are ignored,
// only the filename matters), return the built media URL. External URLs
// (http/https/data) are returned unchanged. Unknown names pass through too.
export function mediaUrl(src) {
  if (!src) return src
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  const name = src.split('/').pop()
  return mediaByName[name] ?? src
}
