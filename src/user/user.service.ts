import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthResponseDto } from './dto/authUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new BadRequestException(
        'fields username and password cannot be empty',
      );
    }
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtToken = this.jwtService.sign({ username });

    user.token = jwtToken;
    await this.userRepository.save(user);

    return new AuthResponseDto(username, jwtToken);
  }
}
