import { useEffect, useState } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { useLocalSessionId } from '@daily-co/daily-react';
import { CameraSettings } from '../CameraSettings';
import { Video } from '../Video';
import { Button } from '../ui/button';

export const HairCheckScreen = ({ handleJoin, handleEnd }:
  {
    handleJoin: () => void,
    handleEnd: () => void
  }
) => {
  const localSessionId = useLocalSessionId();
  const daily = useDaily();

    useEffect(() => {
    if (daily) {
      console.log('Starting camera in hair check screen');
      daily.startCamera({
        startVideoOff: false,
        startAudioOff: false
      }).then(() => {
        console.log('Camera started successfully');
      }).catch((error) => {
        console.error('Failed to start camera:', error);
      });
    }
  }, [daily]);

  return <div>
    <Video id={localSessionId} className='max-h-[70vh]' />
    <CameraSettings
      actionLabel='Join Call'
      onAction={handleJoin}
      cancelLabel='Cancel'
      onCancel={handleEnd}
    />
  </div>
};
