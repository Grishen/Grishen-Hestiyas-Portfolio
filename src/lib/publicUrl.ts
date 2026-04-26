/**
 * Resolves a path in `public/` (or Vite public assets) for any deploy base, e.g. GitHub Pages
 * at https://user.github.io/repo/ — not only domain root.
 */
export function publicUrl(path: string): string {
  const p = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${p}`
}
