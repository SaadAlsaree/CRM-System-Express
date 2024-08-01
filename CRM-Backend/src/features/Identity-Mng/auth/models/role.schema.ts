import { model, Model, Schema } from 'mongoose';

import { IRoleDocument } from '@auth/interfaces/role.interface';


const roleSchema = new Schema<IRoleDocument>({
  roleName: { type: String, required: true, unique: true },
  roleCode: { type: String, required: true, unique: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });



const RoleModel: Model<IRoleDocument> = model<IRoleDocument>('Role', roleSchema, 'Role');

export { RoleModel };
