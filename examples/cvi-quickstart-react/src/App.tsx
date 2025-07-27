import { useEffect, useState } from 'react'
import { DailyProvider } from '@daily-co/daily-react'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { HairCheckScreen } from '@/components/HairCheckScreen'
import { CallScreen } from '@/components/CallScreen'
import { createConversation, endConversation } from '@/api'
import { IConversation } from '@/types'
import { useToast } from "@/hooks/use-toast"

function App() {
  const { toast } = useToast()
  const [screen, setScreen] = useState<'welcome' | 'hairCheck' | 'call'>('welcome')
  const [conversation, setConversation] = useState<IConversation | null>(null)
  const [loading, setLoading] = useState(false)

    useEffect(() => {
    return () => {
      if (conversation) {
        // Use suppressErrors=true during cleanup to prevent fetch errors during page unload
        endConversation(conversation.conversation_id, true).catch(() => {
          // Silently handle any remaining errors during cleanup
        })
      }
    }
  }, [conversation])

      const handleStart = async () => {
    try {
      setLoading(true)
      const conversation = await createConversation()
      setConversation(conversation)
      setScreen('hairCheck')
    } catch (error: any) {
      console.error('Error starting conversation:', error)

      let title = "Connection Error"
      let description = "Unable to start conversation"

      if (error.message?.includes('401')) {
        title = "Authentication Error"
        description = "Invalid API key. Please check your configuration."
      } else if (error.message?.includes('API key is not configured')) {
        title = "Configuration Error"
        description = "API key is missing. Please check your environment setup."
      } else if (error.message?.includes('persona_id')) {
        title = "Persona Error"
        description = "Invalid persona configuration. Please check your persona ID."
      } else if (error.message) {
        description = error.message.split('\n')[0] // Show first line of error message
      }

      toast({
        variant: "destructive",
        title,
        description,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEnd = async () => {
    try {
      if (!conversation) return
      await endConversation(conversation.conversation_id)
    } catch (error) {
      console.error(error)
    } finally {
      setConversation(null)
      setScreen('welcome')
    }
  }

  const handleJoin = () => {
    setScreen('call')
  }

  return (
    <main>
      <DailyProvider>
        {screen === 'welcome' && <WelcomeScreen onStart={handleStart} loading={loading} />}
        {screen === 'hairCheck' && <HairCheckScreen handleEnd={handleEnd} handleJoin={handleJoin} />}
        {screen === 'call' && conversation && <CallScreen conversation={conversation} handleEnd={handleEnd} />}
      </DailyProvider>
    </main>
  )
}

export default App
