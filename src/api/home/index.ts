import {PendingTaskBodyType} from '../../models/request.types.ts';
import httpService from '../https.service.ts';
import Urls from './api.url.ts';

const getPendingTask = (body: PendingTaskBodyType) => {
  return httpService().post(Urls.pendingTask, body);
};
export const HomeAPIS = {
  getPendingTask,
};
