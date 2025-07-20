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
        void endConversation(conversation.conversation_id)
      }
    }
  }, [conversation])

    const handleStart = async () => {
    try {
      setLoading(true)

      // Request camera and microphone permissions before creating conversation
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        console.log('Camera and microphone permissions granted')
      } catch (permissionError) {
        console.error('Permission denied:', permissionError)
        toast({
          variant: "destructive",
          title: "Camera & Microphone Access Required",
          description: 'Please allow camera and microphone access to start the conversation',
        })
        setLoading(false)
        return
      }

      const conversation = await createConversation()
      setConversation(conversation)
      setScreen('hairCheck')
    } catch (error) {
      console.error('Error starting conversation:', error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: 'Check console for details',
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
