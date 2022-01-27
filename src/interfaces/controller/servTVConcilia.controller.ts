import { Query, Controller, HttpCode, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestDTO } from '../../domain/request.dto';
import { ResponseDTO } from '../../domain/response.dto';
import { ServiceTVConcilia } from '../../application/use_case/servTVConcilia.service';
import { CONST_DATA } from 'src/infrastructure/common/resources/constData';

@Controller()
export class TVConciliaController {
  constructor(private readonly service: ServiceTVConcilia) {}

  @HttpCode(200)
  @Get('/validate/Account')
  @ApiTags(CONST_DATA.SWAGGER_TITLE)
  @ApiOkResponse({
    status: 1,
    type: ResponseDTO,
    description: CONST_DATA.SWAGGER_DESCRIPTION,
  })
  MSServTVConcilia(@Query() requestDTO: RequestDTO) {
    return this.service.getTVConcilia(requestDTO);
  }
}
