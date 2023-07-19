import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { Organization } from './organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([Organization]),
  ],
  controllers: [AppController, RepositoryController, OrganizationController],
  providers: [AppService, RepositoryService, OrganizationService],
})
export class AppModule {}
