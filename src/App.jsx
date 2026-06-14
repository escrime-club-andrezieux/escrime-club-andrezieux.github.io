import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import Section from './components/Section.jsx'
import Video from './components/Video.jsx'
import Slideshow from './components/Slideshow.jsx'
import Footer from './components/Footer.jsx'

// Page order, top to bottom. Each <Section name="x" /> renders content/x.md.
// To reorder, add, or remove a section, edit the list below — this is the
// "layout & logic" the content editor should NOT need to touch (they only edit
// the files in the content/ folder).
//
// Note: contact info is not a section here — it lives in the <Footer />, fed by
// content/contact.md.
export default function App() {
  return (
    <div className="page">
      <Header />
      <Nav />
      <main>
        <Section name="hero" />
        <Video />
        <Section name="about" />
        <Section name="schedule" />
        <Slideshow />
        <Section name="ecole" />
        <Section name="escrime-entreprise" />
      </main>
      <Footer />
    </div>
  )
}
