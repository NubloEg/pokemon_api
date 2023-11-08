import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {Request, Controller, Post, UseGuards, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto:CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Get('')
  async findAll() {
    return this.authService.findAll()
  }
}
