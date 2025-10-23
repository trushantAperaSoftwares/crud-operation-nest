import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service'; // <-- path expects src/prisma.service.ts

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
