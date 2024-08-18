import { model, Model, Schema } from 'mongoose';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ['A', 'B', 'Other'], required: true },
    refId: [{ type: Schema.Types.ObjectId, ref: 'Organization', required: false }],
    phone: { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    description: { type: String, required: false, },
    avatar: { type: String, required: false },
  },
  { timestamps: true, versionKey: false },
);

const OrganizationModel: Model<IOrganizationDocument> = model<IOrganizationDocument>('Organization', organizationSchema, 'Organization');
export { OrganizationModel };
