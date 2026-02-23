import api from "../lib/api";
import type {
  Incident,
  CreateIncidentDto,
  UpdateIncidentDto,
  PaginatedResponse,
} from "../types";

const ENDPOINT = "/incidents";

export const incidentService = {
  // Get all incidents with optional pagination
  getAll: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Incident>> => {
    const response = await api.get(ENDPOINT, { params: { page, limit } });
    return response.data;
  },

  // Get single incident by ID
  getById: async (id: string): Promise<Incident> => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
  },

  // Create new incident
  create: async (data: CreateIncidentDto): Promise<Incident> => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
  },

  // Update incident
  update: async (id: string, data: UpdateIncidentDto): Promise<Incident> => {
    const response = await api.patch(`${ENDPOINT}/${id}`, data);
    return response.data;
  },

  // Delete incident
  delete: async (id: string): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  // Upload attachment
  uploadAttachment: async (id: string, file: File): Promise<Incident> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`${ENDPOINT}/${id}/attachment`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getStats: async (): Promise<Record<string, number>> => {
    const response = await api.get(`${ENDPOINT}/stats`);
    return response.data;
  },
};

export default incidentService;
