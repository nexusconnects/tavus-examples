import { TAVUS_API_KEY } from '@/config';

export const endConversation = async (conversationId: string, suppressErrors = false) => {
  try {
    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: 'POST',
        headers: {
          'x-api-key': TAVUS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to end conversation');
    }

    return null;
  } catch (error) {
    console.error('Error ending conversation:', error);

    // Don't throw errors during cleanup scenarios (page unload, etc.)
    if (suppressErrors) {
      return null;
    }

    throw error;
  }
};
