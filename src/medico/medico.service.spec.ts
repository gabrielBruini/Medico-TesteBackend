import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from '../local/entities/local.entity';
import { Especialidade, Medico } from './entities/medico.entity';
import { MedicoService } from './medico.service';



const localEntityList =[new Local({id_local :1 , logradouro: "Rua Augusta", complemento: "de 700 a 1680 - lado par", bairro:"Consolação", localidade: "São Paulo", uf: "SP",})]


const MedicoEntityList = [
  new Medico({ id: 1, nome: "Junior", crm: 1234567, telefone_celular: "12345678", telefone_fixo: "90907050", especialidade: Especialidade.Alergologia, cep: "01310942"}), 
]


const updateMedicoEntity =  new Medico({id: 1, nome: "Marcos", crm: 145356, telefone_celular: "12345678", telefone_fixo: "194389454", especialidade: Especialidade.Angiologia, cep: "01304-001"})

describe('MedicoService', () => {
  let medicoService: MedicoService;
  let medicoRepository: Repository<Medico>
  let localRepository: Repository<Local>


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicoService, {
        provide: getRepositoryToken(Medico), 
        useValue: {         
         find: jest.fn().mockResolvedValue(MedicoEntityList),
          findOneOrFail: jest.fn().mockResolvedValue(MedicoEntityList[0]),
          softDelete: jest.fn().mockResolvedValue(undefined),
          save: jest.fn().mockResolvedValue(MedicoEntityList[0]),
          restore: jest.fn().mockResolvedValue(undefined)
        }
       
      }, {provide: getRepositoryToken(Local),
      useValue: {       
        save: jest.fn().mockResolvedValue(localEntityList[0])
      }}]
    }).compile();
    medicoService = module.get<MedicoService>(MedicoService);
    medicoRepository = module.get(getRepositoryToken(Medico));
    localRepository = module.get(getRepositoryToken(Local));
  });

  it('should be defined', () => {
    expect(medicoService).toBeDefined();
    expect(medicoRepository).toBeDefined();
    expect(localRepository).toBeDefined();
  });

  
  describe('findAll', () => {
    it("Deve retornar todos os médicos",async () => {
      const resultado = await medicoService.findAll()

      expect(resultado).toEqual(MedicoEntityList)
      expect(medicoRepository.find).toHaveBeenCalledTimes(1)
    })
    it("Deve retornar um erro", () => {
      

      jest.spyOn(medicoRepository, 'find').mockRejectedValueOnce(new Error())

      expect(medicoService.findAll()).rejects.toThrowError()
    })
  })
  describe('FindOneOrFail', () => {
    it("Deve retornar um médico", async () => {
      const resultado = await medicoService.findMedicoById(1);    
      
      expect(resultado).toEqual(MedicoEntityList[0])
    })
    it("Deve retornar um erro", () => {
      jest.spyOn(medicoRepository, 'findOneOrFail').mockRejectedValue(new Error())

      expect(medicoService.findMedicoById(1)).rejects.toThrowError(HttpException)

    })

  })

  describe('save', () => {
    it("Deve criar um usuário com sucesso", async () => {

      const data = {
        nome: "João", crm: 1234567, telefone_celular: "12345678", telefone_fixo: "90907050", especialidade: Especialidade.Alergologia, cep: "01310942"}

      const resultadoMedico = await medicoService.save(data)
     
        expect(resultadoMedico).toEqual(MedicoEntityList[0])

    })
    it("Deve retornar uma localização", async () => {
      const resultado = await medicoService.getCep("01304-001")

      const dados = { logradouro: "Rua Augusta", complemento: "de 700 a 1680 - lado par", bairro:"Consolação", localidade: "São Paulo", uf: "SP", cep: "01304-001", ddd: "11", ibge: "3550308", siafi:"7107", gia: "1004"}

      expect(resultado).toEqual(dados)

    })
    it("Deve retornar um erro", async () => {
      const data = {
        nome: "João", crm: 1234567, telefone_celular: "12345678", telefone_fixo: "90907050", especialidade: Especialidade.Alergologia}

      jest.spyOn(medicoRepository, 'save').mockRejectedValueOnce(new Error())

      expect(medicoService.save(data)).rejects.toThrow(HttpException)

    })  
    it("Deve retornar uma exception", () => {
      const data = {cep: "020439325"}

      jest.spyOn(medicoRepository, 'save').mockRejectedValueOnce(new Error())

      expect(medicoService.getCep(data)).rejects.toThrow(HttpException)


    })
  })

  /*
  describe("update", () => { // Não consegui fazer
    it("Deve atualizar o usuário", async () => {   
      
        const data = {nome: "Junior", crm: 1234567, telefone_celular: "12345678", telefone_fixo: "90907050", especialidade: Especialidade.Alergologia, cep: "01310942"} 

        jest
        .spyOn(medicoRepository, 'save')
        .mockResolvedValueOnce(updateMedicoEntity);

        const resultado = await medicoService.update(1, data)

        expect(resultado).toEqual(updateMedicoEntity)
    })
  }) */

  describe("Soft Delete" , () => {
    it("Deve deletar um usuário", async () => {
      const resultado = await medicoService.softdelete(1)

      expect(resultado).toBeUndefined()
      expect(medicoRepository.findOneOrFail).toHaveBeenCalledTimes(1)
      expect(medicoRepository.softDelete).toHaveBeenCalledTimes(1)
      
    })
    it("Deve retornar um not found exception", () => {
      jest.spyOn(medicoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error())

      expect(medicoService.findMedicoById(1)).rejects.toThrowError(HttpException)
    })
    it("Deve retornar um erro", () => {
      jest.spyOn(medicoRepository, 'softDelete').mockRejectedValueOnce(new Error())

      expect(medicoService.softdelete(1)).rejects.toThrowError()


    })
  })
  describe("Restore", () => {
    it("Deve restaurar um usuário", async () => {
      const resultado = await medicoService.recuperarMedico(1)

      expect(resultado).toBeUndefined()
      expect(medicoRepository.findOneOrFail).toHaveBeenCalledTimes(1)
      expect(medicoRepository.restore).toHaveBeenCalledTimes(1)
    })
    it("Deve retornar um erro", () => {
      jest.spyOn(medicoRepository, 'restore').mockRejectedValue(new Error())

      expect(medicoService.recuperarMedico(1)).rejects.toThrowError(Error)
    })
  })

 


});
