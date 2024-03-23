import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dday, DdayDocument } from 'src/dday/schema/dday.schema';
import { AlarmRequestDto } from './dto/alarm.request.dto';
import { Alarm, AlarmDocument } from './schema/alarm.schema';
import { AlarmResponseDto } from './dto/alarm.response.dto';

@Injectable()
export class AlarmService {
    constructor(
        @InjectModel(Dday.name) private ddayModel: Model<DdayDocument>,
        @InjectModel(Alarm.name) private alarmModel: Model<AlarmDocument>
        ) {}

    async getAlarmList(ddayId: string): Promise<any> {
        const dday = await this.ddayModel.findOne({ddayId: ddayId, isActive: true});

        if (!dday) {
            throw new NotFoundException('Dday not found');
        }
        
        const ddayAlarmList = await this.alarmModel.find({ddayId: ddayId, isActive: true});

        const alarmList = ddayAlarmList != null
            ? ddayAlarmList.map(alarm => new AlarmResponseDto(alarm)) : [];

        return alarmList;
      }

    async putAlarmList(ddayId: string, alarmList: AlarmRequestDto[]): Promise<any> {
        const dday = await this.ddayModel.findOne({ddayId: ddayId, isActive: true});

        if (!dday) {
            throw new NotFoundException('Dday not found');
        }

        const ddayAlarmList = (await this.alarmModel.find({ddayId: ddayId, isActive: true, isUsed: false})).forEach(alarm => {
            alarm.isActive = false;
            alarm.save();
        });

        alarmList.forEach(alarm => {
            this.alarmModel.create({
                ddayId: dday.ddayId, alarmDateTime: alarm.alarmDateTime,
                alarmEmail: dday.user.userMail
            });
        });
        
        const newAlarmList = await this.alarmModel.find({'dday.ddayId': ddayId, isActive: true});

        return newAlarmList;
    }

}
