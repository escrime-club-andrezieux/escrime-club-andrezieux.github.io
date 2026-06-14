// Loads every markdown file in content/textes/ as a raw string, at build time.
//
// Drop a new `.md` file into content/textes/ and it becomes available here
// automatically, keyed by its filename without the extension
// (e.g. "about.md" -> "about"). No code changes needed to edit text.
const modules = import.meta.glob('/content/textes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const content = Object.fromEntries(
  Object.entries(modules).map(([path, raw]) => {
    const name = path.split('/').pop().replace(/\.md$/, '')
    return [name, raw]
  }),
)

// Returns the markdown text for a section, or '' if the file doesn't exist.
export function getContent(name) {
  return content[name] ?? ''
}
