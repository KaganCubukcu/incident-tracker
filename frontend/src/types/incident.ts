export type IncidentStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Incident {
  id: number;
  title: string;
  description?: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  authorId: number;
  author?: {
    id: number;
    email: string;
  };
  assigneeId?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateIncidentDto {
  title: string;
  description?: string;
  priority: IncidentPriority;
  status?: IncidentStatus;
}

export interface UpdateIncidentDto {
  title?: string;
  description?: string;
  priority?: IncidentPriority;
  status?: IncidentStatus;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
