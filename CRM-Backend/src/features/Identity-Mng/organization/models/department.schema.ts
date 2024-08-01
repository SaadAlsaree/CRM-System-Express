import mongoose, { model, Model, Schema } from 'mongoose';
import { IDepartmentDocument } from '@organization/interfaces/organization.interface';

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    slug: { type: String },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    employeesCount: { type: Number, default: 0 },
    description: { type: String, required: false, },
    organization: { type: mongoose.Types.ObjectId, required: true }
  },
  { timestamps: true, versionKey: false },
);

const DepartmentModel: Model<IDepartmentDocument> = model<IDepartmentDocument>('Department', departmentSchema, 'Department');
export { DepartmentModel };
