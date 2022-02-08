import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CriarMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { searchDto } from './dto/search-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}  

  @Get() 
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(":id")  
  findById(@Param('id') id:number) {
    return this.medicoService.findMedicoById(id)
  }

  @Get("recuperar/:id")  
  async recuperarMedico(@Param('id') id:string){
    return this.medicoService.recuperarMedico(+id)
  }
  @Post("cadastro")
 @UsePipes(ValidationPipe)
  async create( @Body() criarMedicoDto: CriarMedicoDto) {     
    return await this.medicoService.save(criarMedicoDto)
  }

  @UsePipes(ValidationPipe)
  @Post("find")
  findOne(@Body() dado: searchDto) {
    return this.medicoService.findbyData(dado);
  }

  @Post("cep")
  cep(@Body() dado: searchDto) {
    return this.medicoService.getCep(dado);
  }
  

  @UsePipes(ValidationPipe)
  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    return this.medicoService.softdelete(+id);
  }
}
