import { useState, useCallback } from 'react';
import {
  useDevices,
  useDaily,
  useDailyEvent,
  useLocalSessionId,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react';
import { Button } from '../ui/button';
import { Mic, Video, Volume2, VideoOff, VideoIcon, MicOff } from 'lucide-react';
import { SelectDevice } from '../SelectDevice';

export const CameraSettings = ({ actionLabel, onAction, cancelLabel, onCancel }:
  {
    actionLabel?: string,
    onAction?: () => void,
    cancelLabel?: string,
    onCancel?: () => void
  }
) => {
  const daily = useDaily();
  const {
    currentCam,
    currentMic,
    currentSpeaker,
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
    refreshDevices,
  } = useDevices();
  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;

  const [getUserMediaError, setGetUserMediaError] = useState(false);


  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const toggleCamera = () => {
    daily?.setLocalVideo(!isCameraEnabled);
  };

  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };

  return (
        <div className='w-full max-w-2xl mx-auto'>
      {getUserMediaError ? (
        <div className='text-center bg-red-50 border border-red-200 rounded-xl p-6'>
          <div className='mb-4'>
            <div className='inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3'>
              <VideoOff className='w-6 h-6 text-red-600' />
            </div>
            <h3 className='text-lg font-semibold text-red-800 mb-2'>Camera and microphone access required</h3>
            <p className='text-red-600 text-sm'>We need permission to access your devices for the video call</p>
          </div>
          <button
            onClick={async () => {
              try {
                await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: true
                });
                setGetUserMediaError(false);
                refreshDevices();
              } catch (error) {
                console.error('Permission still denied:', error);
                alert('Please enable camera and microphone permissions in your browser settings and refresh the page.');
              }
            }}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            Enable Permissions
          </button>
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4 text-center'>Audio & Video Settings</h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            {/* Camera Controls */}
            <div className='space-y-3'>
              <label className='block text-sm font-medium text-gray-700'>Camera</label>
              <div className='flex items-center gap-2'>
                <button
                  onClick={toggleCamera}
                  className={`p-3 rounded-lg transition-colors ${
                    isCameraEnabled
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {isCameraEnabled ? (
                    <VideoIcon className='w-5 h-5' />
                  ) : (
                    <VideoOff className='w-5 h-5' />
                  )}
                </button>
                <SelectDevice
                  value={currentCam?.device?.deviceId}
                  devices={cameras}
                  onChange={val => setCamera(val)}
                  Icon={Video}
                />
              </div>
            </div>

            {/* Microphone Controls */}
            <div className='space-y-3'>
              <label className='block text-sm font-medium text-gray-700'>Microphone</label>
              <div className='flex items-center gap-2'>
                <button
                  onClick={toggleMicrophone}
                  className={`p-3 rounded-lg transition-colors ${
                    isMicEnabled
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {isMicEnabled ? (
                    <Mic className='w-5 h-5' />
                  ) : (
                    <MicOff className='w-5 h-5' />
                  )}
                </button>
                <SelectDevice
                  value={currentMic?.device?.deviceId}
                  devices={microphones}
                  onChange={val => setMicrophone(val)}
                  Icon={Mic}
                />
              </div>
            </div>

            {/* Speaker Controls */}
            <div className='space-y-3'>
              <label className='block text-sm font-medium text-gray-700'>Speaker</label>
              <div className='flex items-center gap-2'>
                <div className='p-3 bg-gray-100 rounded-lg'>
                  <Volume2 className='w-5 h-5 text-gray-600' />
                </div>
                <SelectDevice
                  value={currentSpeaker?.device?.deviceId}
                  devices={speakers}
                  onChange={val => setSpeaker(val)}
                  Icon={Volume2}
                />
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className='flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className={`w-3 h-3 rounded-full ${isCameraEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className='text-sm text-gray-600'>Camera {isCameraEnabled ? 'On' : 'Off'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className={`w-3 h-3 rounded-full ${isMicEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className='text-sm text-gray-600'>Microphone {isMicEnabled ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center'>
        {cancelLabel && (
          <Button
            variant='outline'
            onClick={onCancel}
            className='px-8 py-3 text-gray-600 border-gray-300 hover:bg-gray-50'
          >
            {cancelLabel}
          </Button>
        )}
        {actionLabel && (
          <Button
            onClick={onAction}
            disabled={getUserMediaError || !currentCam || !currentMic}
            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <VideoIcon className='w-5 h-5 mr-2' />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
