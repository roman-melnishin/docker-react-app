import axios from 'axios';

export default async () => {
  const response = await axios.get('https://randomuser.me/api/?nat=gb&results=5');

  return response.data.results;
};
