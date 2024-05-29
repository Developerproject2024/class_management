import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 201, description: 'usuario autenticado.' })
  @ApiBadRequestResponse({status: 400, description: 'Datos invalidos.' })
  @ApiUnauthorizedResponse({status: 401, description: 'No autorizado' })
  @ApiNotFoundResponse({status: 404, description: 'No existe el usuario' })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}