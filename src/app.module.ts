import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Category } from './category/entities/category.entity';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entities';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fithub',
      entities: [User, Category, Product],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
