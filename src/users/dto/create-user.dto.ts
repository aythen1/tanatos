import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username should be a string' })
  @MinLength(10, { message: 'Username should be at least 10 characters long' })
  @MaxLength(30, { message: 'Username should be at most 30 characters long' })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Username should only contain alphabetic characters',
  })
  username: string;

  @IsString({ message: 'Password should be a string' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @MaxLength(25, { message: 'Password should be at most 25 characters long' })
  password: string;

  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/(@yahoo|@hotmail|@gmail|@outlook)/, {
    message:
      'Email should contain either @yahoo, @hotmail, @gmail, or @outlook',
  })
  email: string;
}
