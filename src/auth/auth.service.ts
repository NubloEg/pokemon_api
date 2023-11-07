import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.findOne(createUserDto);
    if (user && user.password === createUserDto.password) {
      const { password, ...result } = user;
      return result;
    }
    null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    console.log(user)
    const createUser = await this.userService.create(user);
    console.log(createUser)
    return {
      ...createUser,
      access_token: this.jwtService.sign({email:createUser.email,password:createUser.password}),
    };
  }


  async findAll() {
    return await this.userService.findAll();
     
  }
}
