import { ExtractPropTypes, inject } from 'vue'
import { props } from './ctx'
export const useProps = () => {
  const dialogProps = inject<
    Partial<ExtractPropTypes<typeof props>> 
  >('skAppDialogProps', {})
 
  return dialogProps
}
