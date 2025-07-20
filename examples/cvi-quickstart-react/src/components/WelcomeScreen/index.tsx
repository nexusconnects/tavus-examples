import { Button } from '../ui/button';

export const WelcomeScreen = ({ onStart, loading }: { onStart: () => void, loading: boolean }) => {
  const isInIframe = window !== window.top;

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 p-10'>
      <h1 className='text-4xl text-center'>
        Welcome to Debt.com Advocate Interface
      </h1>

      {isInIframe && (
        <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md text-center'>
          <p className='text-sm'>
            <strong>Note:</strong> For full camera and microphone functionality,
            please <a
              href={window.location.href}
              target="_blank"
              className='underline text-blue-600'
            >
              open this page in a new tab
            </a>.
          </p>
        </div>
      )}

      <Button onClick={onStart}>{loading ? 'Loading...' : 'Start Conversation'}</Button>
    </div>
  );
};
