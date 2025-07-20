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
  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  useEffect(() => {
    if (daily && !permissionRequested) {
      console.log('Starting camera in hair check screen');
      daily.startCamera({
        startVideoOff: false,
        startAudioOff: false
      }).then(() => {
        console.log('Camera started successfully');
        setNeedsPermission(false);
      }).catch((error) => {
        console.error('Failed to start camera:', error);
        setNeedsPermission(true);
      });
      setPermissionRequested(true);
    }
  }, [daily, permissionRequested]);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setNeedsPermission(false);
      if (daily) {
        await daily.startCamera({
          startVideoOff: false,
          startAudioOff: false
        });
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      alert('Please allow camera and microphone access in your browser, then try again.');
    }
  };

  if (needsPermission) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-6 p-10'>
        <h2 className='text-2xl text-center'>Camera & Microphone Access Required</h2>
        <p className='text-gray-600 text-center max-w-md'>
          To start your conversation, we need access to your camera and microphone.
          Please click the button below and allow access when prompted.
        </p>
        <Button onClick={requestPermissions} className='px-8 py-3'>
          Allow Camera & Microphone
        </Button>
        <Button variant='outline' onClick={handleEnd}>
          Cancel
        </Button>
      </div>
    );
  }

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
