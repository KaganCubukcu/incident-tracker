import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { incidentService } from '../services/incident.service'
import type { CreateIncidentDto, UpdateIncidentDto } from '../types'

const QUERY_KEY = 'incidents'

// Fetch all incidents
export function useIncidents(page = 1, limit = 10) {
    return useQuery({
        queryKey: [QUERY_KEY, { page, limit }],
        queryFn: () => incidentService.getAll(page, limit),
    })
}

// Fetch single incident
export function useIncident(id: string) {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => incidentService.getById(id),
        enabled: !!id,
    })
}

// Create incident mutation
export function useCreateIncident() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateIncidentDto) => incidentService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        },
    })
}

// Update incident mutation
export function useUpdateIncident() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateIncidentDto }) =>
            incidentService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] })
        },
    })
}

// Delete incident mutation
export function useDeleteIncident() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => incidentService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        },
    })
}

// Upload attachment mutation
export function useUploadAttachment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, file }: { id: string; file: File }) =>
            incidentService.uploadAttachment(id, file),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] })
        },
    })
}
