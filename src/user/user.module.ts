import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './service/user.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    forwardRef(() => ProductModule), ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
