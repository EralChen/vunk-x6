import type { ManualChunksOption } from 'rollup'
export const manualChunks: ManualChunksOption  = (id) => {
  if (id.includes('@arcgis/core')) {
    return 'esri'
  }

}
