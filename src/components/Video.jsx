import { getContent } from '../content.js'

// Vidéo de présentation, jouée juste après l'accueil.
//
// L'éditeur n'a qu'à coller le lien YouTube ou Vimeo dans
// content/textes/video.md (voir content/README.md). On ne stocke PAS la vidéo
// dans le projet : elle reste hébergée chez YouTube/Vimeo, ce qui garde le site
// léger et publiable partout. Si aucun lien valide n'est présent, la section ne
// s'affiche pas (le reste de la page reste intact).
function toEmbedUrl(raw) {
  const url = (raw.match(/https?:\/\/[^\s)<>"']+/) || [])[0]
  if (!url) return null

  // YouTube : youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /shorts/ID
  let m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/,
  )
  if (m) return `https://www.youtube.com/embed/${m[1]}`

  // Vimeo : vimeo.com/ID ou vimeo.com/video/ID
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (m) return `https://player.vimeo.com/video/${m[1]}`

  return null
}

export default function Video() {
  const raw = getContent('video')
  if (!raw) return null

  const embed = toEmbedUrl(raw)
  if (!embed) return null

  return (
    <section id="video" className="section video-section">
      <div className="section-inner">
        <div className="video-embed">
          <iframe
            src={embed}
            title="Vidéo de présentation du club"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
