import { getEnvironmentContext } from '@/utils'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableMap, RunnableSequence } from '@langchain/core/runnables'
import { ChatOpenAI } from '@langchain/openai'
import VkResponse from '@vunk/server/components/response'
import { defineComponent } from '@vunk/server/jsx-runtime'

export default defineComponent({
  async setup () {
    const { env } = getEnvironmentContext()

    // 1. 初始化模型
    const model = new ChatOpenAI({
      temperature: 0.7,
      model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      openAIApiKey: env.OPENAI_API_KEY,
      configuration: {
        baseURL: env.OPENAI_BASE_URL,
      },
    })

    // 笑话 prompt
    const jokePrompt = ChatPromptTemplate.fromTemplate(
      '讲一个关于 {topic} 的笑话。',
    )

    // 分析 prompt
    const analysisPrompt = ChatPromptTemplate.fromTemplate(
      '你觉得这个笑话搞笑吗？请评价它：{joke}',
    )

    // 笑话链：输入 topic → 笑话
    const jokeChain = jokePrompt.pipe(model).pipe(new StringOutputParser())

    // 分析链：输入 joke → 评价
    const analysisChain = analysisPrompt.pipe(model).pipe(new StringOutputParser())

    const fullChain = RunnableSequence.from([
      jokeChain,
      RunnableMap.from<string>({
        joke: joke => joke,
        analysis: joke => analysisChain.invoke({ joke }),
      }),
    ])

    const res = await fullChain.invoke({
      topic: 'Python',
    })

    return () => (
      <VkResponse>
        <vk:raw v-raw={res}></vk:raw>
      </VkResponse>
    )
  },
})
