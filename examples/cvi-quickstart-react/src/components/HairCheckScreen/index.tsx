import { useEffect, useState } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { useLocalSessionId } from '@daily-co/daily-react';
import { CameraSettings } from '../CameraSettings';
import { Video } from '../Video';
import { Button } from '../ui/button';
import { Video as VideoIcon } from 'lucide-react';

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
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-8'>
        <div className='max-w-md mx-auto text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl'>
            <Video className='w-10 h-10 text-white' />
          </div>

          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Camera & Microphone Access</h2>
          <p className='text-gray-600 text-lg leading-relaxed mb-8'>
            To connect with your debt advocate, we need access to your camera and microphone.
            This ensures a secure and personal conversation experience.
          </p>

          <div className='space-y-4'>
            <Button
              onClick={requestPermissions}
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <Video className='w-5 h-5 mr-2' />
              Allow Camera & Microphone
            </Button>

            <Button variant='outline' onClick={handleEnd} className='w-full py-3 text-gray-600 border-gray-300 hover:bg-gray-50'>
              Cancel
            </Button>
          </div>

          <p className='text-sm text-gray-500 mt-6'>
            Your privacy is protected. No recording without consent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-8'>
      <div className='max-w-4xl mx-auto w-full'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Check Your Setup</h2>
          <p className='text-gray-600 text-lg'>Make sure you look and sound great before joining your advocate</p>
        </div>

        <div className='bg-white rounded-2xl shadow-2xl p-6 mb-8'>
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Video id={localSessionId} className='w-full max-h-[60vh] object-cover' />

            <div className='absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-lg'>
              Preview
            </div>
          </div>
        </div>

        <CameraSettings
          actionLabel='Join Conversation'
          onAction={handleJoin}
          cancelLabel='Back'
          onCancel={handleEnd}
        />
      </div>
    </div>
  )
};
