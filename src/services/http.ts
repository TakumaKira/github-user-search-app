import axios, { AxiosResponse, AxiosError } from 'axios';
import { endpointUrl } from '../config.json';

axios.defaults.baseURL = endpointUrl;

async function get(path: string): Promise<AxiosResponse<any, any> | AxiosError<any, any>> {
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    return error as AxiosError;
  }
}

export { get };