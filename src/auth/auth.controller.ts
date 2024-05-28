import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const {user} = req.body
    return this.authService.login(user);
  }
}