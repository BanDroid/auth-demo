export function generateUrlFromBasename(
  endpoint: string = "/",
  isApi: boolean = false
) {
  let url = import.meta.env.PROD
    ? location.origin
    : isApi
    ? `http://${location.hostname}:${import.meta.env.VITE_API_PORT}`
    : `http://${location.hostname}:3000`;
  url += import.meta.env.VITE_BASENAME
    ? import.meta.env.VITE_BASENAME + endpoint
    : endpoint;
  return url;
}
