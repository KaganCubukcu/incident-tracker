import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { UpdateIncidentDto } from "./dto/update-incident.dto";

@Injectable()

export class IncidentService {
    constructor(private prisma: PrismaService) { }

    async create(createIncidentDto: CreateIncidentDto) {
        return this.prisma.incident.create({
            data: createIncidentDto
        });
    }

    async findAll() {
        return this.prisma.incident.findMany({
            where: { deletedAt: null },
        });
    }

    async findOne(id: number) {
        return this.prisma.incident.findUnique({
            where: { id, deletedAt: null },
        });
    }

    async update(id: number, updateIncidentDto: UpdateIncidentDto) {
        return this.prisma.incident.update({
            where: { id },
            data: updateIncidentDto,
        });
    }

    async remove(id: number) {
        return this.prisma.incident.delete({
            where: { id },
        });
    }
}