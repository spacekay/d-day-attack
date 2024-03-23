import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { DdayPostRequestDto } from './dto/dday.post.request.dto';
import { DdayPutRequestDto } from './dto/dday.put.request.dto';
import { DdaySimpleResponseDto } from './dto/dday.simple.response.dto';
import { Dday, DdayDocument } from './schema/dday.schema';
import { DdayDetailResponseDto } from './dto/dday.detail.response.dto';

@Injectable()
export class DdayService {
    constructor(
        @InjectModel(Dday.name) private ddayModel: Model<DdayDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
        ) {}

    async getDdayList(email: string): Promise<any> {
        const user = await this.userModel.findOne({userMail: email, isActive: true});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userDdayList = await this.ddayModel.find({'user.userMail': email, isActive: true}).exec();
        
        const ddayList = userDdayList != null 
            ? userDdayList.map(dday => new DdaySimpleResponseDto(dday)) : [];

        return ddayList;
    }

    async getDday(id: string): Promise<any> {
        const dday = await this.ddayModel.findOne({ddayId: id, isActive: true});

        if (!dday) {
            throw new NotFoundException('Dday not found');
        }

        return new DdayDetailResponseDto(dday);
    }

    async postDday(body: DdayPostRequestDto): Promise<any> {
        const user = await this.userModel.findOne({userMail: body.userEmail, isActive: true});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const dday = await this.ddayModel.create({
            ddayId: user._id + new Date().getTime(),
            user: user, ddayDate: body.ddayDate, ddayName: body.ddayName,
            isBirthday: body.isBirthday, isUserBirthday: body.isUserBirthday,
            birthdayName: body.birthdayName
        });

        return new DdayDetailResponseDto(dday);
    }

    async putDday(body: DdayPutRequestDto): Promise<any> {
        const dday = await this.ddayModel.findOne({ddayId: body.ddayId, isActive: true});

        if (!dday) {
            throw new NotFoundException('Dday not found');
        }

        dday.ddayDate = body.ddayDate;
        dday.ddayName = body.ddayName;
        dday.isBirthday = body.isBirthday;
        dday.isUserBirthday = body.isUserBirthday;
        dday.birthdayName = body.birthdayName;

        await dday.save();

        return new DdayDetailResponseDto(dday);
    }

    async patchDday(id: string): Promise<any> {
        const dday = await this.ddayModel.findOne({ddayId: id, isActive: true});

        if (!dday) {
            throw new NotFoundException('Dday not found');
        }
        
        dday.isActive = false;
        await dday.save();
        
        return new DdaySimpleResponseDto(dday);
    }

}
