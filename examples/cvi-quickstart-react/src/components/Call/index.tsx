import { useState } from 'react';
import { DailyAudio, useParticipantIds, useLocalSessionId } from '@daily-co/daily-react';
import { Minimize, Maximize, Users, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Video } from '../Video';
import { Button } from '../ui/button';

export const Call = () => {
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const localSessionId = useLocalSessionId();
  const [mode, setMode] = useState<'full' | 'minimal'>('full');

  const handleToggleMode = () => {
    setMode(prev => prev === 'full' ? 'minimal' : 'full');
  }

  return <>
    <div className={cn("transition-all duration-300", {
      'fixed bottom-6 right-6 z-50': mode === 'minimal',
      'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4': mode === 'full',
    })}>

      {mode === 'full' && (
        <div className='absolute top-6 left-6 z-20'>
          <div className='bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/20'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Shield className='w-4 h-4 text-green-600' />
                <span className='text-sm font-medium text-gray-700'>Secure Session</span>
              </div>
              <div className='w-px h-4 bg-gray-300'></div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-blue-600' />
                <span className='text-sm text-gray-600'>{remoteParticipantIds.length + 1} participants</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={cn('relative', {
        'w-80 h-48': mode === 'minimal',
        'w-full max-w-6xl mx-auto': mode === 'full',
      })}>

        {/* Toggle button */}
        <Button
          variant='outline'
          onClick={handleToggleMode}
          className={cn(
            'absolute z-20 gap-2 bg-white/90 backdrop-blur-sm hover:bg-white border-white/20 shadow-lg transition-all duration-200',
            {
              'top-2 right-2': mode === 'minimal',
              'top-4 right-4': mode === 'full',
            }
          )}
          size='sm'
        >
          {mode === 'full' ? 'Minimize' : 'Maximize'}
          {mode === 'full' ? <Minimize className='w-4 h-4' /> : <Maximize className='w-4 h-4' />}
        </Button>

        {/* Main video content */}
        {remoteParticipantIds.length > 0 ? (
          <div className={cn('relative overflow-hidden', {
            'rounded-xl shadow-2xl': mode === 'minimal',
            'rounded-2xl shadow-2xl bg-white p-2': mode === 'full',
          })}>
            <Video
              id={remoteParticipantIds[0]}
              className={cn('w-full', {
                'h-48 object-cover': mode === 'minimal',
                'h-[70vh] max-h-[600px] object-cover rounded-xl': mode === 'full',
              })}
            />

            {/* Advocate info overlay for full mode */}
            {mode === 'full' && (
              <div className='absolute bottom-6 left-6 z-10'>
                <div className='bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    <span className='text-sm font-medium'>Your Debt Advocate</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={cn('relative flex flex-col items-center justify-center', {
            'w-80 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg': mode === 'minimal',
            'w-full h-[70vh] max-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl': mode === 'full',
          })}>

            {/* Loading animation */}
            <div className='flex flex-col items-center gap-4'>
              <div className='relative'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Users className='w-8 h-8 text-blue-600' />
                </div>
                <div className='absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
              </div>

              <div className='text-center'>
                <h3 className={cn('font-semibold text-gray-800 mb-2', {
                  'text-lg': mode === 'full',
                  'text-sm': mode === 'minimal',
                })}>
                  Connecting to your advocate
                </h3>
                <p className={cn('text-gray-600', {
                  'text-base': mode === 'full',
                  'text-xs': mode === 'minimal',
                })}>
                  Please wait while we establish the connection...
                </p>
              </div>

              {mode === 'full' && (
                <div className='flex items-center gap-2 mt-4 px-3 py-2 bg-blue-100 rounded-full'>
                  <Clock className='w-4 h-4 text-blue-600' />
                  <span className='text-sm text-blue-800'>Average wait time: 30 seconds</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Local video (self view) */}
        {localSessionId && (
          <div className={cn('absolute border-2 border-white shadow-lg overflow-hidden', {
            'bottom-2 right-12 w-24 h-16 rounded-lg': mode === 'minimal',
            'bottom-6 right-6 w-48 h-32 rounded-xl': mode === 'full',
          })}>
            <Video
              id={localSessionId}
              className='w-full h-full object-cover'
            />

            {mode === 'full' && (
              <div className='absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded'>
                You
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <DailyAudio />
  </>
}
