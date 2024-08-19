import mongoose, { model, Model, Schema } from 'mongoose';

import { IDepartmentDocument } from '@department/interfaces/department.interface';


const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    description: { type: String, required: false, },
    organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization' },
    directorateId: { type: mongoose.Types.ObjectId, ref: 'Directorate' },
  },
  { timestamps: true, versionKey: false },
);

const DepartmentModel: Model<IDepartmentDocument> = model<IDepartmentDocument>('Department', departmentSchema, 'Department');
export { DepartmentModel };
