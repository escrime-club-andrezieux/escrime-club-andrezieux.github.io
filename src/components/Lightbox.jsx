import { useEffect, useRef, useState } from 'react'

// Clique sur une image d'horaire (ou toute image avec la classe `zoomable`)
// => elle s'affiche en grand dans un overlay plein écran, plus facile à lire.
// Fermeture : clic sur le fond, bouton ×, ou touche Échap.
//
// On écoute les clics au niveau du document (délégation) pour que ça marche
// avec les images générées depuis le markdown, sans dépendance externe.
export default function Lightbox() {
  const [item, setItem] = useState(null) // { src, alt } quand ouvert, sinon null
  const closeRef = useRef(null)

  useEffect(() => {
    function onClick(e) {
      const el = e.target
      if (!(el instanceof Element)) return
      const img = el.closest('.schedule-grid img, img.zoomable')
      if (!img) return
      e.preventDefault()
      setItem({ src: img.currentSrc || img.src, alt: img.alt || '' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!item) return
    function onKey(e) {
      if (e.key === 'Escape') setItem(null)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // bloque le défilement de l'arrière-plan
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [item])

  if (!item) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image agrandie"
      onClick={() => setItem(null)}
    >
      <button
        ref={closeRef}
        type="button"
        className="lightbox-close"
        aria-label="Fermer"
        onClick={() => setItem(null)}
      >
        ×
      </button>
      <img
        className="lightbox-img"
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
