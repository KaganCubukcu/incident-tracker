import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { IncidentService } from "./incidents.service";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { UpdateIncidentDto } from "./dto/update-incident.dto";

@Controller('incidents')
export class IncidentsController {
    constructor(private readonly incidentService: IncidentService) { }

    @Post()
    create(@Body() createIncidentDto: CreateIncidentDto) {
        return this.incidentService.create(createIncidentDto);
    }

    @Get()
    findAll() {
        return this.incidentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.incidentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
        return this.incidentService.update(+id, updateIncidentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.incidentService.remove(+id);
    }
}
