// Auto-discovers every image in content/diaporama/ (built at compile time by
// Vite). Drop a photo into that folder and it appears here — no code change
// needed. Images are shown in filename order, so prefix them with numbers
// (01-..., 02-...) if you want to control the order.
const modules = import.meta.glob(
  '/content/diaporama/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)

const photos = Object.keys(modules)
  .sort()
  .map((path) => modules[path])

const SECONDS_PER_PHOTO = 12 // vitesse de défilement (plus grand = plus lent)

// Full-width band that shows the whole (uncropped) photos next to each other,
// resized to the band height, scrolling in a seamless loop. The photo list is
// duplicated so the loop has no visible jump.
export default function Slideshow() {
  if (photos.length === 0) return null

  const loop = [...photos, ...photos]
  const duration = `${photos.length * SECONDS_PER_PHOTO}s`

  return (
    <section className="slideshow" aria-label="Photos du club">
      <div className="slideshow-track" style={{ animationDuration: duration }}>
        {loop.map((src, i) => (
          <div className="slideshow-slide" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </section>
  )
}
