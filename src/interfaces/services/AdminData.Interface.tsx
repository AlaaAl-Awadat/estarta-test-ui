
export interface AdminDataAuditLogInterface {
    logId: number;
    applicationId?: number | null;
    applicationType?: string | null;
    companyId: number | null;
    actionType: string | null;
    ip: string | null;
    userAgent: string | null;
    userId: number | null;
    source: string | null;
    ownerId: number | null;
    logInfo: string | null;
    creationTimestamp: Date | null;
}
export interface AdminDataResultInterface {
    totalPages: number;
    number: number;
    recordsTotal: number;
    recordsFiltered: number;
    auditLog: AdminDataAuditLogInterface[];
}
// main interface
export interface AdminDataInterface {
    success: boolean;
    elapsed: number;
    result: AdminDataResultInterface;
}
