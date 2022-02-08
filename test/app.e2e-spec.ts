import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/medico/cadastro (POST)', () => {
    return request(app.getHttpServer())
    .post('medico/')
    .send({nome: "Tester", crm: "1234567", telefone_fixo: "90902025", telefone_celular: "19039485",especialidade: "Angiologia", cep: "02434090"})
    .expect(200)
  })
});
