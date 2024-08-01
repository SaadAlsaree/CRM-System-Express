import { Schema, model, Model } from 'mongoose';

import { IRankDocument } from '@auth/interfaces/rank.interface';



const rankSchema = new Schema<IRankDocument>({
  rankName: { type: String, required: true, unique: true },
  rankCode: { type: String, required: true, unique: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

const RankModel: Model<IRankDocument> = model<IRankDocument>('Rank', rankSchema, 'Rank');
export { RankModel };
