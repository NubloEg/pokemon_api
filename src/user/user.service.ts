import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as argon2 from "argon2"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    
    const createUser = await new this.userModel({
      email:createUserDto.email,
      password:await argon2.hash(createUserDto.password)
    })

    createUser.save()

    return createUser
  }

  async findOne(email: string):Promise<any>{
    const findUser=await this.userModel.find({email})
    return findUser[0]
  }

  async findAll():Promise<User[]> {
    const allUsers= await this.userModel.find().exec()
    return allUsers
  }
}
