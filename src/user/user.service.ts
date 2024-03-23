import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { DdayService } from 'src/dday/dday.service';
import { UserPutRequestDto } from './dto/user.put.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserSignUpDto } from './dto/user.signup.dto';
import { User, UserDocument } from './schema/user.schema';
import { DdaySimpleResponseDto } from 'src/dday/dto/dday.simple.response.dto';

@Injectable()
export class UserService {

constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>) {}

    async getUser(email: string): Promise<any> {
        const user = await this.userModel.findOne({userMail: email, isActive: true});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new UserResponseDto(user);
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
        });

        return new UserResponseDto(user);
    }

    async putUser(body: UserPutRequestDto): Promise<any> {
        const user = await this.userModel.findOne({userMail: body.email, isActive: true});

        if (!user) {
            throw new NotFoundException('User not found')
        }

        user.userName = body.name;
        await user.save();

        return new UserResponseDto(user);
    }

    async hashPassword(password:string) : Promise<string> {
        return await argon2.hash(password);
    }

}
