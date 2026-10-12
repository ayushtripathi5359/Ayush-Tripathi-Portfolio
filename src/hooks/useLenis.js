export default function useLenis() {
  return typeof window !== 'undefined' ? window.__lenis ?? null : null
}
