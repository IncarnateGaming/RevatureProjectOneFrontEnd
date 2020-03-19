import { ReimbursmentStatus } from './reimbursmentStatus';
import { ReimbursmentType } from './reimbursmentType';
import { User } from './user';

export interface reimbursment{
    id: number,
    amount: number,
    description: string,
    submitted: Date,
    resolved: Date,
    receipt: ImageBitmap,
    author: User,
    resolver: User,
    status: ReimbursmentStatus,
    type: ReimbursmentType,
}