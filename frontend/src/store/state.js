import httpClient from '@/services/httpClient';

const state = {
  appName: 'Reyhoon Vue',
  appAuthor: 'Melika Abdolahi',
  httpClient: httpClient(),
  errorMessage: "",
  cities: [],
};

export default state;