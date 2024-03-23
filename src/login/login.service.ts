import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class LoginService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>){}

    async login(email: string, password: string) : Promise<any> {

        const user = await this.userModel.findOne({userMail: email, isActive: true})
        if (!user) {
            throw new UnauthorizedException('Login error (not a vaild user');
        } else {
            const isPasswordValid = await this.validatePassword(password, user.password);
            console.log(isPasswordValid);

            if (isPasswordValid) {
                const payload = {email: email, name: user.userName};
                return this.makeLoginResponseDto(email, payload.name, this.jwtService.sign(payload));
            } else {
                throw new UnauthorizedException('Login error (wrong password)');
            }
        }
    }

    makeLoginResponseDto(email:string, name:string, jwt:string): LoginResponseDto {
        return {email: email, name: name, jwt: jwt};
    }

    async validatePassword(password:string, storedHashedPassword:string) : Promise<boolean> {
        return await argon2.verify(storedHashedPassword, password);
    }
}
