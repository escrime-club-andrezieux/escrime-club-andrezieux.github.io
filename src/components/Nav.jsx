// Menu bar shown under the header. Each link points to an element lower on the
// page by its id and smooth-scrolls to it (smooth scrolling is enabled in
// styles.css via `scroll-behavior: smooth`).
//
// `href` must match an element id on the page:
//   - #top is a special fragment that scrolls to the very top of the page.
//   - sections render with id = their markdown filename (see Section.jsx),
//     so #about -> content/about.md, #schedule -> content/schedule.md, ...
//   - #contact -> the footer.
//
// This is navigation/layout (developer's domain). To add a menu entry, add a
// line here AND make sure the target element exists.
const links = [
  { href: '#top', label: 'Accueil' },
  { href: '#about', label: 'À propos' },
  { href: '#schedule', label: 'Horaires' },
  { href: '#ecole', label: 'École' },
  { href: '#escrime-entreprise', label: 'Escrime Entreprise' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Navigation principale">
      <ul className="site-nav-list">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
