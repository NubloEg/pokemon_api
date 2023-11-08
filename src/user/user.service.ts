import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    const createUser = await new this.userModel(createUserDto)
    createUser.save()
    return createUser
  }

  async findOne(createUserDto: CreateUserDto):Promise<User | undefined> {
    const findUser= await this.userModel.findOne(createUserDto)
    return findUser
  }

  async findAll():Promise<User[]> {
    const allUsers= await this.userModel.find().exec()
    return allUsers
  }
}
