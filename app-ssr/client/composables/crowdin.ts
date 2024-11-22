import { CrowdinFilePath } from '#/shared/crowdin'
import { usePageContext } from 'vike-vue/usePageContext'

export {
  CrowdinFilePath,
}

export function useCrowdinFile (path: CrowdinFilePath) {
  const pageContext = usePageContext()
  return pageContext.crowdin[path]
}
