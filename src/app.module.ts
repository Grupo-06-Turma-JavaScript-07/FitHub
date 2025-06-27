import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { Category } from './category/entities/category.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fithub',

      entities: [User, Category],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
