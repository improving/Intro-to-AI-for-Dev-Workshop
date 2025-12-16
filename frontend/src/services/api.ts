const API_BASE_URL = 'http://localhost:3001/api';

export const fetchHello = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/hello`);
  if (!response.ok) {
    throw new Error('Failed to fetch from API');
  }
  const data = await response.json();
  return data.message;
};
