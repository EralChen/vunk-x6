import { useRouter, useRoute, RouteLocationPathRaw, createRouterMatcher }  from 'vue-router'

import { lintPath, resolveFullPath } from '@vunk/skzz/shared/utils-route'
import { pickObject } from '@vunk/core/shared/utils-object'
import { QUERY_U } from './use-resolve-query-u'
export const useRouterTo = () => { 
  const router = useRouter()
  const route = useRoute()


  type Mode = 'push' | 'replace'
  const routerNext = (opts: {
    path: string,
    mode?: Mode,
  } & RouteLocationPathRaw) => {

    const currentMatched = route.matched[route.matched.length - 1]
    const children = currentMatched.children ?? []
    
    // [TODO] 这里是不是简单的拼接就可以了？
    const fullPath = resolveFullPath(opts.path, route.path)
    // 如果children中没有相同path，就不跳转。
    if (children) {
      const childrenMatched = createRouterMatcher([currentMatched], {})
      const childrenMatchedRoutes = childrenMatched.getRoutes()
      const childrenMatchedRoute = childrenMatchedRoutes.find(item => item.re.test(fullPath))
      if (!childrenMatchedRoute) {
        // eslint-disable-next-line no-console
        console.warn(`[routerTo] ${opts.path} not found in children`, children)
        return
      }
    
    }
    

    const e = {
      mode: 'replace' as Mode,
      ...opts,
      path: fullPath,
    }

    router[e.mode]({
      
      ...pickObject(e, {
        excludes: ['mode'],
      }),
    })

  }

  const routerBack = (opts:{
    /**
     * path: 要减去的路径
     */
    path: string,
    mode?: Mode,
  } & RouteLocationPathRaw, custom: {
    /**
     * 是否更新最新的路由
     */
    addQueryU?: boolean,
  } = {}) => {
    const path = lintPath(route.path.replace(opts.path, ''))
    // 如果route.matched中没有相同path，就不跳转。
    if (route.matched && !route.matched.find((item) => item.path === path)) {
      // eslint-disable-next-line no-console
      console.warn(`[routerTo] ${path} not found in route.matched`)
      return
    }
    const e = {
      mode: 'replace' as Mode,
      ...opts,
      path,
    }
 
    router[e.mode]({
      ...pickObject(e, {
        excludes: ['mode'],
      }),
      query: {
        ...route.query,
        ...(custom.addQueryU ? {
          [QUERY_U]: 1,
        } : {}),
      },
    })

  }
  return {
    router,
    route,
    routerNext,
    routerBack,
  }
  
}