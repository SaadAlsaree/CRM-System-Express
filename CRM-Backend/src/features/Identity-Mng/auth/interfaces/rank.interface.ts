import { ObjectId } from 'mongoose';

import { AuditableModel, BaseResponse } from '@globals/types/common';




export interface IRankDocument extends Document, AuditableModel {
  _id?: ObjectId | string;
  rankName: string;
  rankCode: string;

}

export interface IRankRequest {
  rankName: string;
  rankCode: string;
}

export interface IRankResponse extends BaseResponse {
  data: IRankDocument;
}
