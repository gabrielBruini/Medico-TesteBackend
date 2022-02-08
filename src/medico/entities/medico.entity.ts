import { Local } from '../../local/entities/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToOne, JoinColumn} from 'typeorm'

export enum Especialidade {
    Alergologia = "Alergologia",
    Angiologia = "Angiologia",
    Buco_Maxilo = "Buco Maxilo",
    Cardiologia_Clinica = "Cardiologia_Clinica",
    Cardiologia_Infatil = "Cardiologia_Infatil",
    Cirurgia_Cabeca_Pescoco = "Cirurgia cabeca e pescoco",
    Cirurgia_Cardiaca = "Cirurgia cardiaca",
    Cirurgia_Torax = "Cirurgia de torax"
    
}

@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120})
    nome:string;

    @Column("char", { length: 12 })
    cep: string; 

    @Column()
    crm: number;    

    @Column("varchar", { length: 20 })
    telefone_fixo: string;

    @Column("varchar", { length: 20 })
    telefone_celular: string;

    @Column({type: "enum", enum: Especialidade})
    especialidade: Especialidade;      

    @OneToOne( type => Local, local => local.medico,  {            
        eager: true,
        cascade: true
    })
    @JoinColumn({name: "id_local"})
    local: Local;
    

    @DeleteDateColumn()
    deletedAt: Date;

    constructor(medico?: Partial<Medico>) {
        this.id = medico?.id;
        this.nome = medico?.nome;
        this.crm = medico?.crm;
        this.cep = medico?.cep
        this.telefone_fixo = medico?.telefone_fixo;
        this.telefone_celular = medico?.telefone_celular;
        this.especialidade = medico?.especialidade;
        this.deletedAt = medico?.deletedAt;  
        
      
    }
}
