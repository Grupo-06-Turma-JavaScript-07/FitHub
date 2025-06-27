import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Buscar todos os usuários
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return user;
  }

  // Buscar usuários cujo nome contenha parte do nome informado
  async findAllByNome(nome: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  // Criar novo usuário
  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Atualizar usuário
  async update(user: User): Promise<User> {
    const buscaUser = await this.findById(user.id);

    if (!buscaUser || !user.id)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return await this.userRepository.save(user);
  }

  // Deletar usuário por ID
  async delete(id: number): Promise<DeleteResult> {
    const buscaUser = await this.findById(id);

    if (!buscaUser)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return await this.userRepository.delete(id);
  }
}
