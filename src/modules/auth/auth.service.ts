import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserCredentialsRequestDto } from './dtos/user-credentials-request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from './constants/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private compareBcrypt(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }

  private hashBcrypt(data: string) {
    return bcrypt.hash(data, 10);
  }

  private createAccessToken(userId: number) {
    return this.jwtService.signAsync(
      { id: userId },
      { expiresIn: '2d', secret: JwtConstants.JWT_SECRET },
    );
  }

  private async returnToken(userId: number) {
    return { accessToken: await this.createAccessToken(userId) };
  }

  async login(body: UserCredentialsRequestDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (!user) {
      throw new BadRequestException('User is not found.');
    }

    const isPasswordCorrect = await this.compareBcrypt(
      body.password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect password.');
    }

    return this.returnToken(user.id);
  }

  async registration(body: UserCredentialsRequestDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (user) {
      throw new BadRequestException('User already exists.');
    }

    const passwordHash = await this.hashBcrypt(body.password);

    const newUser = await this.userRepository.save({
      email: body.email,
      passwordHash,
    });

    return this.returnToken(newUser.id);
  }
}
