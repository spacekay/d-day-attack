import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    MongooseModule.forFeature([ {name: User.name, schema: UserSchema}]),
    PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: {expiresIn: '86400s'}
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule {
  constructor(private readonly config: ConfigService) {}
}
