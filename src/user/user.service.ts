import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>) {}

    async getUser(userName: string): Promise<any> {
        try {
            const result = await this.userModel.findOne({userName}).lean();
            console.log('success! '+result);
        } catch (error) {
            console.log('error check: '+error );
        }
    }

}
