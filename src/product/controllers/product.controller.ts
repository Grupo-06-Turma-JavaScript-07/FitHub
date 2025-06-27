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
import { ProductService } from '../services/product.service';
import { Product } from './../entities/product.entities';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('/exercicio/:exercicio')
  @HttpCode(HttpStatus.OK)
  findByAllNome(@Param('nome') nome: string): Promise<Product[]> {
    return this.productService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(Product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: Product): Promise<Product> {
    return this.productService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
