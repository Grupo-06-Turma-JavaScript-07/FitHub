import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 100, nullable: false })
  usuario: string; 

  @IsOptional()
  @Column({ length: 255, nullable: true })
  foto?: string; 

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;
}
