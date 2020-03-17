export interface ErsReimb{
    id: number,
    amount: number,
    description: string,
    submitted: Date,
    resolved: Date,
    receipt: ImageBitmap,
    author: number,
    resolver: number,
    status: number,
    type: number,
}