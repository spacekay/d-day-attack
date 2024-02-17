import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { UserSignUpDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>) {}

    async getUser(email: string): Promise<any> {
        const user = await this.userModel.findOne({userMail: email});

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.makeUserResponseDto(user);
    }

    async signUpUser(body: UserSignUpDto): Promise<any> {
        const {email, name, password} = body;
        const isUser = await this.userModel.exists({userMail: email});

        if (isUser) {
            throw new UnauthorizedException('Sign up error (user exists)');
        }

        const hashedPassword = await this.hashPassword(password);

        const user = await this.userModel.create({
            userMail: email, userName: name, password: hashedPassword
        })

        return this.makeUserResponseDto(user);
    }

    makeUserResponseDto(user: User) : UserResponseDto {
        return {
            email: user.userMail, name: user.userName,
            isUsingEmailAlarm: user.isUsingEmailAlarm,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt };
    }

    async hashPassword(password:string) : Promise<string> {
        return await argon2.hash(password);
    }

}
