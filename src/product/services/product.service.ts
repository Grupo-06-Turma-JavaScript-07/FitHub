// src/product/services/product.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CategoryService } from '../../category/service/category.service';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private userService: UserService,
    private categoryService: CategoryService,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { user: true, category: true },
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { user: true, category: true },
    });

    if (!product)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return product;
  }

  async findAllByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
      relations: { user: true, category: true },
    });
  }

  async create(product: Product): Promise<Product> {

    // Se o produto foi enviado sem uma categoria, retorna um erro claro.
    if (!product.category || !product.category.id) {
      throw new HttpException('A categoria do produto não foi especificada.', HttpStatus.BAD_REQUEST);
    }

    // Se o produto foi enviado sem um usuário, retorna um erro claro.
    if (!product.user || !product.user.id) {
      throw new HttpException('O usuário do produto não foi especificado.', HttpStatus.BAD_REQUEST);
    }

    // O código continua daqui apenas se as verificações acima passarem
    await this.userService.findById(product.user.id);
    await this.categoryService.findById(product.category.id);

    return await this.productRepository.save(product);
  }

  async update(exercicio: Product): Promise<Product> {
    const buscaExercicio = await this.findById(exercicio.id);
    if (!buscaExercicio || !exercicio.id)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);
    return await this.productRepository.save(exercicio);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaExercicio = await this.findById(id);
    if (!buscaExercicio)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);
    return await this.productRepository.delete(id);
  }
}