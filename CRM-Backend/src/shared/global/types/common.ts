

export interface BaseResponse {
  status: number;
  message: string;
  success: boolean;

}


export interface AuditableModel {
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  status?: string;
}
