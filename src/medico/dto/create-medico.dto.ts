import {  IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { Especialidade } from "../entities/medico.entity";

export class CriarMedicoDto {

    @IsNotEmpty({message: "O campo nome não pode ser vazio"})
    @MaxLength(120, { message: " O Nome deve ter até 120 caracteres"})
    nome: string;  
    
    
    @MaxLength(7, { message: " O Crm deve ter até 7 caracteres"})
    readonly crm: number;   
    
    
    @MaxLength(12, { message: " O telefone fixo deve ter até 12 caracteres"})
    readonly telefone_fixo: string;

    
    @MaxLength(12, { message: " O telefone celular deve ter até 12 caracteres"})
    readonly telefone_celular: string;
   
    
    @MaxLength(10, { message: "O Cep deve ter até 10 digitos"})
    @IsNotEmpty({message: "O Cep não pode ser vazio"})
    readonly cep: string;


    @IsNotEmpty({message: "O campo deve haver uma especialidade válida"})
    @IsEnum(Especialidade)
    especialidade: Especialidade

    
}  
    
    
    

