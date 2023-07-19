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
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import typeorm from './config/typeorm';
import { Tribe } from './tribe.entity';

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
    TypeOrmModule.forFeature([Organization, Tribe]),
  ],
  controllers: [
    AppController,
    RepositoryController,
    OrganizationController,
    TribeController,
  ],
  providers: [AppService, RepositoryService, OrganizationService, TribeService],
})
export class AppModule {}
