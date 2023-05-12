import type { ManualChunksOption } from 'rollup'
export const manualChunks: ManualChunksOption  = (id, { getModuleInfo }) => {
  if (id.includes('@arcgis/core')) {
    return 'esri'
  }
  const commonRegs = [ 
    /(.*)\/src\/components\/(.*)/,
    /@skzz-(.*)/,
  ]
  for (const reg of commonRegs) {
    if (reg.test(id)) {
      const importersLen = getModuleInfo(id)?.importers.length ?? 0
      // 被多处引用
      if (importersLen > 1) {
        return 'app-common'
      }
    }
  }
}
