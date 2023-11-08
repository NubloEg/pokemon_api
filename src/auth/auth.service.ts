import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    console.log(user)
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {

    const findUser=await this.userService.findOne(createUserDto)

    if(findUser) {
      throw new BadRequestException('this email use')
    }
    const createUser = await this.userService.create(createUserDto);

    return {
      id:createUser._id,
      email:createUser.email,
      access_token: this.jwtService.sign({email:createUser.email,password:createUser.password}),
    };
  }


  async findAll() {
    return await this.userService.findAll();
     
  }
}
