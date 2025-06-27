import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './../../product/entities/product.entities';

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

  @IsNotEmpty()
  @Column({ length: 10, nullable: false })
  senha: string;

  @IsOptional()
  @Column({ length: 255, nullable: true })
  foto?: string;

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];
}
