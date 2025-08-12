import { TAVUS_API_KEY } from '@/config';
import { IConversation } from '@/types';

export const createConversation = async (): Promise<IConversation> => {
  try {
    // Debug logging
    console.log('API Key configured:', !!TAVUS_API_KEY);
    console.log('API Key length:', TAVUS_API_KEY?.length || 0);
    console.log('API Key starts with:', TAVUS_API_KEY?.substring(0, 8) + '...');

    if (!TAVUS_API_KEY) {
      throw new Error('Tavus API key is not configured. Please check your .env file.');
    }

    // Validate API key format (basic check)
    if (TAVUS_API_KEY.length < 20) {
      throw new Error('API key appears to be too short. Please verify your API key.');
    }

    const requestBody = {
      persona_id: 'p5170200c65c', // User's custom persona
    };

    console.log('Creating conversation with:', requestBody);
    console.log('API endpoint:', 'https://tavusapi.com/v2/conversations');

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorDetails = '';

      // Clone the response to read the body without consuming it
      const responseClone = response.clone();

      try {
        const errorData = await responseClone.json();
        console.error('Error response:', errorData);
        errorDetails = errorData.message || errorData.error || errorData.detail || 'Unknown error';
        errorMessage += ` - ${errorDetails}`;
      } catch (parseError) {
        console.error('Could not parse error response as JSON, trying text:', parseError);
        try {
          const errorText = await response.text();
          console.error('Error response text:', errorText);
          if (errorText) {
            errorDetails = errorText;
            errorMessage += ` - ${errorText}`;
          }
        } catch (textError) {
          console.error('Could not parse error response as text either:', textError);
        }
      }

      if (response.status === 401) {
        errorMessage += '\n\nThis is an authentication error. Please check:\n1. Your API key is correct\n2. Your API key has not expired\n3. Your API key has the necessary permissions';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Conversation created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};
