import { IsEmail, IsString } from 'class-validator';
import { PasswordValidatorDecorator } from '../decorators/password-validator.decorator';

export class UserCredentialsRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @PasswordValidatorDecorator()
  password: string;
}
