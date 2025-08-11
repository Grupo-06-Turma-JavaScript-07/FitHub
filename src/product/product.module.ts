import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({

  imports: [TypeOrmModule.forFeature([Product]),
  forwardRef(() => UserModule),
  forwardRef(() => CategoryModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule],
})
export class ProductModule { }