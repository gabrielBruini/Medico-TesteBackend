import { Medico } from '../../medico/entities/medico.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm'


@Entity()
export class Local {

   @PrimaryGeneratedColumn()
   id_local: number;    

   @Column("varchar", { length: 150 })
   logradouro: string;

   @Column("varchar", { length: 50 })
   complemento: string;

   @Column("varchar", { length: 50 })
   bairro: string;

   @Column("varchar", { length: 50 })
   localidade: string;
   
   @Column("char", { length: 2})
   uf:string;
   
   @OneToOne(() => Medico, medico => medico.local)
   medico: Medico;

   constructor(local?: Partial<Local>) {
      this.id_local = local?.id_local;
      this.logradouro = local?.logradouro;
      this.complemento = local?.complemento;
      this.bairro = local?.bairro;
      this.uf = local?.uf     

   }


}
