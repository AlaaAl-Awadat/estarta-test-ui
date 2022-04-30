import { AdminDataAuditLogInterface } from './AdminData.Interface';

export interface AdminFilterInterface {
  userAgent: string;
  applicationId: string;
  fromDate: string | null;
  toDate: string | null;
  actionType?: AdminDataAuditLogInterface | null;
  applicationType?: AdminDataAuditLogInterface | null;
}
