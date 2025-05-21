import { defineComponent } from '@vunk/server/jsx-runtime'
import { consola } from 'consola'
import { useMemoryClient } from '../../composables/useMemoryClient'

export default defineComponent({
  async setup () {
    const client = useMemoryClient()
    const messages = [
      { role: 'user', content: 'Hi, I\'m Alex. I\'m a vegetarian and I\'m allergic to nuts.' },
      { role: 'assistant', content: 'Hello Alex! I\'ve noted that you\'re a vegetarian and have a nut allergy. I\'ll keep this in mind for any food-related recommendations or discussions.' },
    ]
    client.add(messages, { user_id: 'alex' })
      .then(result => consola.log(result))
      .catch(error => consola.error(error))

    return () => {}
  },
})
