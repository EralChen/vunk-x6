import { series } from 'gulp'
import { taskWithName } from '@lib-env/shared'


// 找到 docRoot/component-md/*.md
// const mdfiles = glob('./component-md/*.md', {
//   cwd: docRoot,
//   absolute: true,
// })


export default series(
  taskWithName('custom task', async () => {
    // const files = await mdfiles




  }),
)
