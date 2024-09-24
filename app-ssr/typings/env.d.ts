interface SsrMetaEnv {
  SERVER_PORT?: number
  SERVER_HMR_PORT?: number

  // alias for BASE_URL，末尾无需斜杠
  VITE_BASE_URL?: string

  // VITE_BASE_URL + VITE_API_PREFIX is express base path
  VITE_API_PREFIX?: string

  // 代理目标地址
  VITE_PROXY_TARGET_URL?: string

}


interface ImportMetaEnv {
  // express api full url
  VITE_SSR_API_URL: string

  // express proxy full url
  VITE_SSR_PROXY_URL: string
}
