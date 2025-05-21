import MemoryClient from 'mem0ai'
import { getEnvironmentContext } from '../utils'

const { env } = getEnvironmentContext()

const client = new MemoryClient({
  apiKey: env.MEMORY_API_KEY,
})

export function useMemoryClient () {
  return client
}
