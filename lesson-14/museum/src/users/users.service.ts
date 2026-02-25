import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { APP_CONSTANTS } from '../constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.userRepo.findOne({ where: { username: createUserDto.username } });
    if (exist) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, APP_CONSTANTS.SECURITY.BCRYPT_SALT_ROUNDS);
    const user = this.userRepo.create({ ...createUserDto, password: hashedPassword });
    const savedUser = await this.userRepo.save(user);
    const { password, ...result } = savedUser;
    
    return result;
  }

  findOne(username: string) {
    return this.userRepo.findOne({ where: { username }, select: ['id', 'username', 'password'] });
  }
  
  findById(id: number) {
     return this.userRepo.findOne({ where: { id } });
  }
  
  findAll() {
      return this.userRepo.find();
  }
}