import { Button } from '../ui/button';
import { Shield, Video, MessageCircle, Clock } from 'lucide-react';

export const WelcomeScreen = ({ onStart, loading }: { onStart: () => void, loading: boolean }) => {
  const isInIframe = window !== window.top;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-8'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000'></div>
      </div>

      <div className='relative z-10 max-w-4xl mx-auto text-center'>
        {/* Logo/Brand Section */}
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl'>
            <Shield className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4'>
            Welcome to Debt.com
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 font-medium'>
            Advocate Interface
          </p>
        </div>

        {/* Description Section */}
        <div className='mb-12'>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8'>
            Connect with your personal debt advocate through our secure video interface.
            Get expert guidance and support for your financial journey.
          </p>

          {/* Feature highlights */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10'>
            <div className='flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm'>
              <Video className='w-6 h-6 text-blue-600' />
              <span className='text-gray-700 font-medium'>Secure Video Chat</span>
            </div>
            <div className='flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm'>
              <MessageCircle className='w-6 h-6 text-blue-600' />
              <span className='text-gray-700 font-medium'>Expert Guidance</span>
            </div>
            <div className='flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm'>
              <Clock className='w-6 h-6 text-blue-600' />
              <span className='text-gray-700 font-medium'>Real-time Support</span>
            </div>
          </div>
        </div>

        {/* iframe notice - enhanced design */}
        {isInIframe && (
          <div className='mb-8 max-w-md mx-auto'>
            <div className='bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-4 rounded-lg shadow-sm'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <Shield className='w-5 h-5 text-amber-600 mt-0.5' />
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-amber-800'>
                    <span className='font-semibold'>Enhanced Experience:</span> For optimal camera and microphone functionality,
                    <a
                      href={window.location.href}
                      target="_blank"
                      className='ml-1 font-semibold text-amber-900 hover:text-amber-700 underline underline-offset-2'
                    >
                      open in new tab
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className='space-y-4'>
          <Button
            onClick={onStart}
            disabled={loading}
            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none min-w-[200px]'
          >
            {loading ? (
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                Connecting...
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <Video className='w-5 h-5' />
                Start Conversation
              </div>
            )}
          </Button>

          <p className='text-sm text-gray-500'>
            Your session is secure and private
          </p>
        </div>
      </div>
    </div>
  );
};
