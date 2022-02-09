import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import axios from 'axios';
import { Local } from '../local/entities/local.entity';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class MedicoService {

  constructor(@InjectRepository(Medico) private medicoRepository: Repository<Medico>, 
  @InjectRepository(Local) private localRepository: Repository<Local>) {}


  async findAll(): Promise<Medico[]> {
  return await this.medicoRepository.find({relations: ["local"]})
  }

  async findMedicoById(id: number) {    
    try {
      return await this.medicoRepository.findOneOrFail(id);
    }
     catch (e){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'O id está inválido',
      }, HttpStatus.BAD_REQUEST);
     }     
  }


  async save(data) {
     const localizacao = await this.getCep(data.cep)             

   if(localizacao) {

    const local = new Local();   
    local.logradouro = localizacao.logradouro
    local.complemento = localizacao.complemento
    local.bairro = localizacao.bairro
    local.localidade = localizacao.localidade
    local.uf = localizacao.uf 

  const medico = new Medico();
   medico.nome = data.nome;
   medico.crm = data.crm;   
   medico.telefone_fixo = data.telefone_fixo;
   medico.telefone_celular = data.telefone_celular;
   medico.especialidade = data.especialidade;
   medico.cep = data.cep   
   medico.local = local 

    
    const dados = await this.medicoRepository.save(medico)
    return dados
  } 

    }



  async getCep(dados) {       
    try {
     const endereco = await axios.get(`https://viacep.com.br/ws/${dados}/json/`) 
     if(endereco.data.erro) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'O cep está inválido',
      }, HttpStatus.BAD_REQUEST);

     }
      return endereco.data

    } catch (e) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'O cep está inválido',
      }, HttpStatus.BAD_REQUEST);
    }
  
  }


  async findbyData(dado)  { 

      const existeMedico = await this.medicoRepository.findOneOrFail(dado).then(resultado => {
        return resultado
      }).catch(() => {
        return false
      })
      if(existeMedico) {
        return existeMedico
      }

      const existeLocal = await this.localRepository.findOneOrFail(dado).then(async resultado => {
       const geral = await this.findMedicoById(resultado.id_local)
        return geral
      }).catch(() => false)

      if(existeLocal) {
        return existeLocal
      }       
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Não foi encontrado o dado informado',
      }, HttpStatus.BAD_REQUEST);
   
  }

  async softdelete(id:number) {
    const verificarMedico = await this.findMedicoById(id)  
   return await this.medicoRepository.softDelete(verificarMedico)
  } 
  

  async recuperarMedico(id:number) {
    const userExiste = await this.findMedicoById(id)
     await this.medicoRepository.restore(id)
     return
  }

  
  async update(id: number, updateMedico) {        
    const medicoExiste = await this.findMedicoById(id)
    const {nome, crm, telefone_celular,cep, especialidade} = updateMedico
   

    if(cep) {
      const enderecoMedico = await this.getCep(cep)

      const local = new Local()
      local.id_local = medicoExiste.id;
      local.bairro = enderecoMedico.bairro;
      local.complemento = enderecoMedico.complemento;
      local.localidade = enderecoMedico.localidade;
      local.logradouro = enderecoMedico.logradouro;
      local.uf = enderecoMedico.uf

       await this.medicoRepository.save({id: medicoExiste.id, nome, crm, telefone_celular,cep: cep.replace('-', ""), especialidade, local})
      return this.findMedicoById(medicoExiste.id)

    } else {
      await this.medicoRepository.save({id: medicoExiste.id, nome, crm, telefone_celular, especialidade})
      return this.findMedicoById(medicoExiste.id)

    }  



   

    }   
 
    
  
  }


