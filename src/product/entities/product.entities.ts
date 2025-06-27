// src/product/product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column('float', { nullable: true })
  height?: number; // em metros

  @Column('float', { nullable: true })
  weight?: number; // em kg

  // IMC = peso / (altura * altura)
  get imc(): number | null {
    if (this.height && this.weight) {
      return Number((this.weight / (this.height * this.height)).toFixed(2));
    }
    return null;
  }
}
