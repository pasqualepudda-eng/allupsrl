// Loader per next/image: Unsplash serve già varianti ridimensionate via query string
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  // File locali (badge, certificati): serviti così come sono; il parametro w serve solo a Next per distinguere le varianti
  if (!/^https:\/\/(images|plus)\.unsplash\.com\//.test(src)) return src.startsWith('/') ? `${src}?w=${width}` : src;
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format');
  if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'crop');
  return url.toString();
}
