import {UserModel} from './user.model';

export type LoginResponseType = {
  code: number;
  message: string;
  data: UserModel;
};

export type PendingTaskResponseType = {
  data: {
    task_count: number;
  };
};
