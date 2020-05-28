import { generateApiClient } from '@utils/apiUtils';
const ituneApi = generateApiClient('itunes.apple.com');

export const getCollection = itunecollectionName =>
ituneApi.get(`/search?term=${itunecollectionName}`);
