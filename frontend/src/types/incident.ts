// Incident Types for the Incident Tracker Platform

export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'

export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type IncidentType = 'SYSTEM_OUTAGE' | 'SOFTWARE_BUG' | 'SECURITY_EVENT' | 'OPERATIONAL_ISSUE'

export interface Incident {
    id: string
    title: string
    description: string
    type: IncidentType
    status: IncidentStatus
    severity: IncidentSeverity
    attachmentUrl?: string
    createdAt: string
    updatedAt: string
    deletedAt?: string
}

export interface CreateIncidentDto {
    title: string
    description: string
    type: IncidentType
    severity: IncidentSeverity
}

export interface UpdateIncidentDto {
    title?: string
    description?: string
    type?: IncidentType
    status?: IncidentStatus
    severity?: IncidentSeverity
}

// API Response types
export interface PaginatedResponse<T> {
    data: T[]
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export interface ApiError {
    message: string
    statusCode: number
    error?: string
}
