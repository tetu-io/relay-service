import { Controller, Get, Post, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}

  @Get('/error')
  @HttpCode(HttpStatus.OK)
  getContractErrorNameByHex(@Query() getContractErrorNameDto: GetContractErrorNameDto) {
    return this.relayService.web3Service.getContractErrorNameByHex(getContractErrorNameDto);
  }

  @Post('/call-from-delegator')
  @HttpCode(HttpStatus.OK)
  callFromDelegator(@Body() callFromDelegatorDto: CallFromDelegatorDto) {
    return this.relayService.callFromDelegator(callFromDelegatorDto, callFromDelegatorDto.chain);
  }

  @Post('/call-from-operator')
  @HttpCode(HttpStatus.OK)
  callFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.callFromOperator(callFromOperatorDto, callFromOperatorDto.chain);
  }

  @Post('/user-call-from-operator')
  async userCallFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.userCallFromOperator(callFromOperatorDto, callFromOperatorDto.chain);
  }
}
