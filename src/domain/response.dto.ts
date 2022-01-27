import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty()
  result: any;
  @ApiProperty()
  statusCode: any;

  constructor(result: any, statusCode: any) {
    this.result = result;
    this.statusCode = statusCode;
  }
}
