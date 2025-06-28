// src/product/product.entity.ts
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column() 
  name: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  execution: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  time: string;

  @Column('float', { nullable: true })
  height?: number; // em metros

  @Column('float', { nullable: true })
  weight?: number; // em kg

  @ManyToOne(() => User, (user) => user.product, {
    onDelete: 'CASCADE'
  }) 
  user: User;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: 'CASCADE'
  }) 
  category: Category;


  // IMC = peso / (altura * altura)
  get imc(): number | null {
    if (this.height && this.weight) {
      return Number((this.weight / (this.height * this.height)).toFixed(2));
    }
    return null;
  }
}
