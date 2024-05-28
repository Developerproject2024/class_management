import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from '../constants/constants';
import { AuthController } from './auth.controller';
import { TeacherModule } from 'src/teacher/teacher.module';
import {SessionSerializer} from './session.serializer'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    PassportModule.register({session:true}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UserService, TeacherModule, LocalStrategy, JwtStrategy, SessionSerializer],
  exports: [AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
