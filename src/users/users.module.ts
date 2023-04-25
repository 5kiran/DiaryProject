import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/Users';
import { JwtStrategy } from './auth/auth.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtConfig } from 'src/configs/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({useClass : JwtConfig}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class UsersModule {}
