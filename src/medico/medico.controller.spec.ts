import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from './entities/medico.entity';
import { MedicoController } from './medico.controller';
import { MedicoService } from './medico.service';
import { Especialidade } from './entities/medico.entity';
import { UpdateMedicoDto } from './dto/update-medico.dto';

const MedicoEntityList: Medico[] = [
  new Medico({id: 1, nome: "Gabriel", crm: 1234567, telefone_celular: 
  "1199283849", telefone_fixo: "1139593432", especialidade: Especialidade.Alergologia}),
  new Medico({id: 2, nome: "João", crm: 1020304, telefone_celular: 
  "113233345", telefone_fixo: "123456789", especialidade: Especialidade.Angiologia})
]


const novoMedico = new Medico({nome: "Gabriel", crm: 123456789, telefone_celular: 
"1199283849", telefone_fixo: "1139593432", especialidade: Especialidade.Alergologia, cep: "01311922"});

const updateMedicoEntity:UpdateMedicoDto = new Medico({nome: "Marcos", crm: 900000, telefone_celular: "9999999"})


describe('MedicoController', () => {
  let medicoController: MedicoController;
  let medicoService: MedicoService
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
      providers: [{
        provide: MedicoService,
        useValue: {
          create: jest.fn().mockResolvedValue(novoMedico),
          findAll: jest.fn().mockResolvedValue(MedicoEntityList),
          findbyData: jest.fn().mockResolvedValue(MedicoEntityList[0]),
          recuperarMedico: jest.fn().mockResolvedValue({mensagem: "Usuário restaurado"}),
          update: jest.fn().mockResolvedValue(updateMedicoEntity),
          softdelete: jest.fn().mockResolvedValue({mensagem: "Usuário removido"})
        }
      }]
    }).compile();
    medicoController = module.get<MedicoController>(MedicoController);
    medicoService = module.get<MedicoService>(MedicoService);
   
  });

  it('should be defined', () => {
    expect(medicoController).toBeDefined();
    expect(medicoService).toBeDefined()
  });

  describe('Find all', () => {
    it('Deve retornar os usuários', async () => {
      const resultado = await medicoController.findAll()

      expect(resultado).toEqual(MedicoEntityList)
    })
  })

  describe('save', () => {
    it('Deve criar um usuário', async () => {
      const medicoteste = {nome: "Gabriel", crm: 123456789, telefone_celular: 
      "1199283849", telefone_fixo: "1139593432", especialidade: Especialidade.Alergologia, cep: "01311922"}
    
      const resultado = await medicoController.create(medicoteste)   
     
      expect(resultado).toEqual(medicoteste);      
    
    });  
   

});
describe("Retorna o usuário", () => {
  it("deve retornar um usuário com o dado passado, não importa qual", async () => {
    const resultado = await medicoController.findOne({id: 1})

   
    expect(resultado).toEqual(MedicoEntityList[0])
  })
  it("Deve dar um erro", () => {

    jest.spyOn(medicoService, 'findbyData').mockRejectedValue(new Error())
  })
})
describe("update" , () => {
  it("Deve atualizar o update", async () => {
    const updateMedico = {nome: "Marcos", crm: 900000, telefone_celular: "9999999"}

    const resultado = await medicoController.update(1,updateMedico)
    

    expect(resultado).toEqual(updateMedicoEntity)

  })
  it("Deve retornar um erro", () => {
    const updateMedico = {nome: "Marcos", crm: 900000, telefone_celular: "9999999"}

    jest.spyOn(medicoService, "update").mockRejectedValue(new Error())

    expect(medicoController.update(1, updateMedico)).rejects.toThrowError()
  })
})
describe("soft delete", () => {
  it("Deve remover um médico", async () => {
    const resultado = await medicoController.remove('1')

    expect(resultado).toEqual({mensagem: "Usuário removido"})

  })
})

describe("recover", () => {
  it("Deve recuperar um usuário apagado anteriormente", async () => {
    const resultado = await medicoController.recuperarMedico('1')

    expect(resultado).toEqual({mensagem: "Usuário restaurado"})
  })
})

})
