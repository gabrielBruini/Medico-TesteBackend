import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { Local } from 'src/local/entities/local.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Medico, Local]), HttpModule],
  controllers: [MedicoController],  
  providers: [MedicoService],
  exports: [MedicoService]
})
export class MedicoModule {}
