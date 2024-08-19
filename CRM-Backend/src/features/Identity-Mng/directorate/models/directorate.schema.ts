import mongoose, { model, Model, Schema } from 'mongoose';

import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';


const directorateSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    description: { type: String, required: false, },
    avatar: { type: String, required: false },
    organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  { timestamps: true, versionKey: false },
);


const DirectorateModel: Model<IDirectorateDocument> = model<IDirectorateDocument>('Directorate', directorateSchema, 'Directorate');
export { DirectorateModel };
