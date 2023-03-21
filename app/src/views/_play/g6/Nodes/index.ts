import { genRect} from './rect'
import { genCircle } from './circle'
import { genDiamond } from './diamond'
export * from './rect'
export * from './circle'
export * from './diamond'

export function registerNodes () {
  genRect()
  genCircle()
  genDiamond()
}