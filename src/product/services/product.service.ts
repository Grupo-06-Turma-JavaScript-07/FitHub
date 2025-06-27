import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entities/product.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private postagemRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.cadastroRepository.findOne({
      where: {
        id,
      },
    });

    if (!product)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return product;
  }

  async findAllByNome(nome: string): Promise<Product[]> {
    return await this.nomeRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(exercicio: Product): Promise<Product> {
    return await this.exercicio.Repository.save(exercicio);
  }

  async update(exercicio: Product): Promise<Product> {
    const buscaExercicio = await this.findById(exercicio.id);

    if (!buscaExercicio || !exercicio.id)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);

    return await this.exercicioRepository.save(exercicio);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaExercicio = await this.findById(id);

    if (!buscaExercicio)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);

    return await this.exercicioRepository.delete(id);
  }
}
