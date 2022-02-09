import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MedicoModule } from './medico/medico.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico/entities/medico.entity';
import { Local } from './local/entities/local.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "apimedico",
    entities: [Medico, Local],
    synchronize: true,
    migrations: ["migration/*.js"],
    cli: {
        migrationsDir: "migration"
    }
  }),HttpModule, MedicoModule],
})
export class AppModule {}
