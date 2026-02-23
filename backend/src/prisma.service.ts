import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    const logger = new Logger('PrismaService');
    try {
      logger.log('Connecting to database...');
      await this.$connect();
      logger.log('Successfully connected to database');
    } catch (error) {
      logger.error('Failed to connect to database', error);
      process.exit(1);
    }
  }
}
