import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('admin')
@ApiTags('admin')
export default class AuthAdminController  {
    
    /** TODO */

    @Post('auth')
    @ApiOperation({summary: 'ROTA EM DESENVOLVIMENTO.'})
    async handle(@Body() {email, password}: any) {

    }
}