import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { IncidentService } from "./incidents.service";
import { IncidentsController } from "./incidents.controller";

@Module({
    controllers: [IncidentsController],
    providers: [IncidentService, PrismaService],
})
export class IncidentsModule { }
