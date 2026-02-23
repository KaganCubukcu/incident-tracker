import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class IncidentService {
  constructor(private prisma: PrismaService) {}

  async create(createIncidentDto: CreateIncidentDto, authorId: number) {
    return this.prisma.incident.create({
      data: {
        ...createIncidentDto,
        authorId,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.incident.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { email: true } },
        },
      }),
      this.prisma.incident.count({ where: { deletedAt: null } }),
    ]);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.incident.findUnique({
      where: { id, deletedAt: null },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
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

  async getStats() {
    const stats = await this.prisma.incident.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
      where: { deletedAt: null },
    });

    const defaultStats = {
      OPEN: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      CLOSED: 0,
      TOTAL: 0,
    };

    const result = stats.reduce(
      (acc, curr) => {
        acc[curr.status] = curr._count.id;
        acc.TOTAL += curr._count.id;
        return acc;
      },
      defaultStats as Record<string, number>,
    );

    return result;
  }
}
