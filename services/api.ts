import { IContactForm } from '../variables/models';

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

// SENDS A REQUEST
const sendRequest = async (route: string, method: string, body?: string): Promise<boolean> => {
  const res = await fetch(route, { method, headers, body });
  if (res?.status === 200) return true;
  else return false;
};

// SENDS A POST REQUEST
const post = async (route: string, body: string): Promise<boolean> => {
  return sendRequest(route, 'POST', body);
};

// SENDS A GET REQUEST
const get = async (route: string) => {
  return sendRequest(route, 'GET');
};

export const sendContactEmail = async (params: IContactForm): Promise<boolean> => {
  return post('/api/contact', JSON.stringify(params));
};
