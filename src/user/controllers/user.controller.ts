import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities/User.entity';
import { UserService } from '../services/User.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  FindById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.FindById(id);
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
