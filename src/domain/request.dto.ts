import { ApiProperty } from '@nestjs/swagger';

export class RequestDTO {
  @ApiProperty()
  cuenta: number;
}
