import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { Category } from './entities/category.entity';
import { CategoryService } from './service/category.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Category]),
    forwardRef(() => ProductModule)],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
