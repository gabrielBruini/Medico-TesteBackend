
import { IsEnum, IsOptional, Length, MaxLength } from 'class-validator';
import { Especialidade } from '../entities/medico.entity';

export class UpdateMedicoDto {

    @MaxLength(100, { message: " O nome deve ter até 100 caracteres"})
    @IsOptional()
    nome?: string;

    @IsOptional()
    @Length(0, 12, {message: "O telefone celular só aceita até 12 caracteres"})
    telefone_celular?: string;

    @IsOptional()
    @IsEnum(Especialidade, {message: "Escolha um valor válido na especialidade"})
    especialidade?: Especialidade;

    @MaxLength(7, { message: " O crm deve ter até 7 caracteres"})
    @IsOptional()
    crm?: number;

    @IsOptional()
    @MaxLength(12, {message: "O cep só pode até 12 caracteres"})
    cep?: string;
}
