import { Types } from 'mongoose';

export class OutputData {
  name: string;
  type: string;
  value: string | boolean;
  userId: Types.ObjectId;
}
