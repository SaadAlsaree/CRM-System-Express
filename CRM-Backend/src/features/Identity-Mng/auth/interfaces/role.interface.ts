import { ObjectId } from 'mongodb';

import { AuditableModel, BaseResponse } from '@globals/types/common';


export interface IRoleDocument extends Document, AuditableModel {
  _id: ObjectId | string;
  roleName: string;
  roleCode: string;


}


export interface IRoleRequest {
  roleName: string;
  roleCode: string;
}

export interface IRoleResponse extends BaseResponse {
  data: IRoleDocument;
}
