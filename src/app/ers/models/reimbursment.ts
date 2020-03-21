import { ReimbursmentStatus } from './reimbursmentStatus';
import { ReimbursmentType } from './reimbursmentType';
import { User } from './user';

export class Reimbursment{
    id: number;
    amount: number;
    description: string;
    submitted: Date;
    resolved: Date;
    receipt: ImageBitmap;
    author: User;
    resolver: User;
    status: ReimbursmentStatus;
    type: ReimbursmentType;
    constructor(amount: number, description: string, submitted: Date, resolved: Date, receipt: ImageBitmap
        , author: User, resolver: User, status: ReimbursmentStatus, type: ReimbursmentType){
            this.id = 0;
            this.amount = amount;
            this.description = description;
            this.submitted = submitted;
            this.resolved = resolved;
            this.receipt = receipt;
            this.author = author;
            this.resolver = resolver;
            this.status = status;
            this.type = type;
    }
}