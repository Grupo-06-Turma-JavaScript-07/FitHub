import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entities/product.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find(
      { relations: { user: true, category: true } },
    );
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: { user: true, category: true }
    });

    if (!product)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return product;
  }

  async findAllByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: { user: true, category: true }
    });
  }

  async create(exercicio: Product): Promise<Product> {
    return await this.productRepository.save(exercicio);
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
