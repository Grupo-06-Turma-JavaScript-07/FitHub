import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<User[]> {
    return this.userService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/logar')
  @HttpCode(HttpStatus.OK)
  async logar(@Body() user: User): Promise<User> {
    const buscaUsuario = await this.userService.findByUsuario(user.usuario);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    // Esta é uma verificação de senha simples. SEM criptografia (bcrypt).
    if (buscaUsuario.senha !== user.senha)
      throw new ForbiddenException('Senha inválida!');

    return buscaUsuario;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() user: User): Promise<User> {
    return this.userService.update(user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
