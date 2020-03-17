import { reimbursmentStatus } from './reimbursmentStatus';
import { reimbursmentType } from './reimbursmentType';
import { user } from './user';

export interface reimbursment{
    id: number,
    amount: number,
    description: string,
    submitted: Date,
    resolved: Date,
    receipt: ImageBitmap,
    author: user,
    resolver: user,
    status: reimbursmentStatus,
    type: reimbursmentType,
}