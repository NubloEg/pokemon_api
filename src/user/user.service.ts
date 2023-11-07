import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    console.log(createUserDto)
    const createUser= await new this.userModel(createUserDto)
    console.log(createUser)

    return createUser.save()
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
