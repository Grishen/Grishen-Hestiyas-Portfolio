/**
 * Resolves a path in `public/` (or Vite public assets) for any deploy base, e.g. GitHub Pages
 * at https://user.github.io/repo/ — not only domain root.
 */
export function publicUrl(path: string): string {
  let p = path.replace(/^\//, '')
  // Vite already maps `public/` to site root; URLs must be like `images/foo.jpg`, not `public/...`
  p = p.replace(/^public\//, '')
  return `${import.meta.env.BASE_URL}${p}`
}
