import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Buscar todos os usuários
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        product: true,
      },
    });
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!user)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return user;
  }

  // Buscar usuários cujo nome contenha parte do nome informado
  async findAllByNome(nome: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { product: true },
    });
  }

  // Criar novo usuário (aletarção com inclusão de cadastro unico de nome)
  async create(user: User): Promise<User> {
    const usuarioExistente = await this.userRepository.findOne({
      where: { usuario: user.usuario },
    });

    if (usuarioExistente) {
      throw new HttpException(
        'Usuário já cadastrado com este e-mail!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.imc = Number((user.weight / (user.height * user.height)).toFixed(2));

    return await this.userRepository.save(user);
  }

  // Atualizar usuário (inclusao da busca por duplicidade do nome)
  async update(user: User): Promise<User> {
    const buscaUser = await this.findById(user.id);
    const existingUser = await this.userRepository.findOne({
      where: {
        nome: user.nome,
        id: Not(user.id), // Procura em todos, EXCETO no usuário que estamos atualizando
      },
    });

    if (!buscaUser || !user.id)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    // Se encontrou, lança o erro de conflito
    if (existingUser) {
      throw new HttpException(
        'Nome de usuário já cadastrado!',
        HttpStatus.CONFLICT,
      );
    }
    user.imc = Number((user.weight / (user.height * user.height)).toFixed(2));

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
