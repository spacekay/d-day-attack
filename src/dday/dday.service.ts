import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlarmService } from 'src/alarm/alarm.service';
import { DdayPostRequestDto } from './dto/dday.post.request.dto';
import { DdayPutRequestDto } from './dto/dday.put.request.dto';
import { DdaySimpleResponseDto } from './dto/dday.simple.response.dto';
import { Dday, DdayDocument } from './schema/dday.schema';

@Injectable()
export class DdayService {
    constructor(
        @InjectModel(Dday.name) 
        private ddayModel: Model<DdayDocument>) {}

    async getDdayList(email: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async getDday(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async postDday(body: DdayPostRequestDto): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async putDday(body: DdayPutRequestDto): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async patchDday(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

}
