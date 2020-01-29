import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { UserRepository } from "./user.repository";
import { AuthService } from './auth.service';
import { JwtStrategy } from "./jwt-strategy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'monSuperMotDePasse12345',
            signOptions: {
                expiresIn: 60 * 60,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
      JwtStrategy,
      PassportModule,
    ],
})
export class AuthModule {
}
