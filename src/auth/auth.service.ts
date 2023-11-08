import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string ,password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if(user){
    const passwordIsMatch = await argon2.verify(user.password,password)
    if(passwordIsMatch){
      return user
    }
    throw new BadRequestException('Email or password incorrect')
  }
  }

  async login(user: {id:string,email:string}) {
    const {id,email}=user;
    return {id,email,
      access_token: this.jwtService.sign({id:user.id,email:user.email}),
    };
  }

  async register(createUserDto: CreateUserDto) {

    const findUser=await this.userService.findOne(createUserDto.email)
    if(findUser) {
      throw new BadRequestException('this email use')
    }
    const createUser = await this.userService.create(createUserDto);

    return {
      id:createUser._id,
      email:createUser.email,
      access_token: this.jwtService.sign({id:createUser._id,email:createUser.email}),
    };
  }


  async findAll() {
    return await this.userService.findAll();
     
  }
}
