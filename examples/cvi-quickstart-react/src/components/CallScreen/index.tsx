import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { IConversation } from '@/types';
import { CameraSettings } from '../CameraSettings';


import { Call } from '../Call';

export const CallScreen = ({ conversation, handleEnd }: { conversation: IConversation, handleEnd: () => void }) => {
  const daily = useDaily();

    useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation;
      console.log('Attempting to join Daily call:', conversation_url);

      daily.join({
        url: conversation_url,
      }).then(() => {
        console.log('Successfully joined Daily call');
      }).catch((error) => {
        console.error('Failed to join Daily call:', error);
      });

      // Add event listeners for debugging
      daily.on('joined-meeting', () => {
        console.log('Daily: joined-meeting event');
      });

      daily.on('error', (event) => {
        console.error('Daily error:', event);
      });

      daily.on('camera-error', (event) => {
        console.error('Daily camera error:', event);
      });
    }
  }, [daily, conversation]);

  const handleLeave = async () => {
    await daily?.leave();
    handleEnd();
  }

  return <div>
    <Call />
    <CameraSettings
      actionLabel='Leave Call'
      onAction={handleLeave}
    />
  </div>;
};
