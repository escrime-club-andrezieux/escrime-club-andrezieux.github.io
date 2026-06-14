import { logoUrl, bannerUrl } from '../content-assets.js'

// Club name — the site's identity string. It also appears in the page <title>
// (index.html). Change it in both places if the club is renamed.
const CLUB_NAME = 'Escrime Club Andrézieux-Bouthéon'

// Site header band. The background banner image (content/banniere.*) is applied
// through the --header-banner CSS variable set here; the club logo
// (content/logo.*) sits on the left in a white rounded badge, with the club
// name as a title next to it.
export default function Header() {
  return (
    <header
      className="site-header"
      style={{ '--header-banner': bannerUrl ? `url(${bannerUrl})` : 'none' }}
    >
      <div className="site-header-inner">
        <img className="site-logo" src={logoUrl} alt={CLUB_NAME} />
        <h1 className="site-title">{CLUB_NAME}</h1>
      </div>
    </header>
  )
}
