import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DdayService } from './dday.service';
import { DdayDetailResponseDto } from './dto/dday.detail.response.dto';
import { DdayPostRequestDto } from './dto/dday.post.request.dto';
import { DdayPutRequestDto } from './dto/dday.put.request.dto';
import { DdaySimpleResponseDto } from './dto/dday.simple.response.dto';

@ApiTags('ddays')
@Controller('dday')
export class DdayController {
    constructor(private readonly ddayService: DdayService) {}

    @ApiResponse({type: DdaySimpleResponseDto})
    @Get(':userMmail')
    async getDdayList(@Param('userEmail') email: string) : Promise<DdaySimpleResponseDto> {
      return await this.ddayService.getDdayList(email);
    }

    @ApiResponse({type: DdayDetailResponseDto})
    @Get(':ddayId')
    async getDday(@Param('ddayId') id: string) : Promise<DdayDetailResponseDto> {
      return await this.ddayService.getDday(id);
    }

    @ApiCreatedResponse({type: DdayDetailResponseDto})
    @Post()
    async postDday(@Body() body: DdayPostRequestDto) : Promise<DdayDetailResponseDto> {
      return await this.ddayService.postDday(body);
    }

    @ApiResponse({type: DdayDetailResponseDto})
    @Put()
    async putDday(@Body() body: DdayPutRequestDto) : Promise<DdayDetailResponseDto> {
      return await this.ddayService.putDday(body);
    }

    @ApiResponse({ status: 200, description: 'OK'})
    @Patch(':ddayId')
    async patchDday(@Param('ddayId') id: string) : Promise<any> {
      return await this.ddayService.patchDday(id);
    }

}
