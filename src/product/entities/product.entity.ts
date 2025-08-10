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


  @ManyToOne(() => User, (user) => user.product, {
    onDelete: 'CASCADE'
  }) 
  user: User;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: 'CASCADE'
  }) 
  category: Category;

}