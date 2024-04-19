import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  // the client instances cache object
  constructor(private readonly jwtServ: JwtService) {}
  private clients: { [key: string]: PrismaClient } = {};

  getTenantId(request: Request) {
    const req = request.headers["authorization"];
    const jwt = this.jwtServ.decode(req);
    return ''
  }

  getClient(request: Request): PrismaClient {
    const tenantId = this.getTenantId(request);
    let client = this.clients[tenantId];

    // create and cache a new client when needed
    if (!client) {
      const databaseUrl = process.env.DATABASE_URL!.replace('WoodMaster_master', `WoodMaster_${tenantId}`);

      client = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      this.clients[tenantId] = client;
    }
    return client;
  }

  async onModuleDestroy() {
    // wait for every cached instance to be disposed
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
