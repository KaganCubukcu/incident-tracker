import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentsModule } from './incidents/incidents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IncidentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
