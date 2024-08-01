import mongoose, { model, Model, Schema } from 'mongoose';
import { IDepartmentDocument } from '@organization/interfaces/organization.interface';

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    description: { type: String, required: false, },
    organization: { type: mongoose.Types.ObjectId, required: true }
  },
  { timestamps: true, versionKey: false },
);

const DepartmentModel: Model<IDepartmentDocument> = model<IDepartmentDocument>('Department', departmentSchema, 'Department');
export { DepartmentModel };
