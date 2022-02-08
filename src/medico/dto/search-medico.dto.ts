import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Especialidade} from '../entities/medico.entity'


export class searchDto {

    @IsOptional()
    @MaxLength(8, {message: "Somente até 8 caracteres, (por enquanto) no id"})
    id?: number

    @IsOptional()
    @MaxLength(120, { message: " O Nome deve ter até 120 caracteres"})
    nome?: string;

    @IsOptional()
    @MaxLength(7, { message: " O Crm deve ter até 7 caracteres"})
    crm?: string;

    @IsOptional()
    @MaxLength(12, { message: " O Telefone fixo deve ter até 12 caracteres"})
    telefone_fixo?: string;

    @IsOptional()
    @MaxLength(12, { message: " O Telefone fixo deve ter até 12 caracteres"})
    telefone_celular?: string;   

    @IsOptional()
    @IsEnum(Especialidade)
    especialidade?: Especialidade;    


    @IsOptional()
    @MaxLength(12, { message: " O Cep deve ter até 12 caracteres"})
    cep?: string;

    @IsOptional()
    @IsString()
    logradouro?: string;

    @IsOptional()
    complemento?: number;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
    localidade?: string;

    @IsOptional()
    @MaxLength(2, {message: "Insira apenas siglas em UF"})
    uf?: string;

}