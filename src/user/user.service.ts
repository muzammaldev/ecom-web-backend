import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { verifySignupDto } from './dto/verifySignup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User & Document>,
    private readonly jwtService: JwtService,
  ) { }
  async signup(signupDto: SignupDto): Promise<{
    message: string;
    varifcationCode: number;
    Email: string;
  }> {
    const { name, email, password } = signupDto;

    const alreadyUser = await this.userModel.findOne({ email });

    if (alreadyUser) {
      throw new UnauthorizedException('Email Already Exits');
    }
    const randomBytes = crypto.randomBytes(3);

    // Convert randomBytes to a Promise-based function
    const randomBytesAsync = () =>
      new Promise<Buffer>((resolve) => resolve(randomBytes));

    // Use async/await to generate the random number
    const randomNumber =
      (parseInt((await randomBytesAsync()).toString('hex'), 16) % 900000) +
      100000;

    const user = await this.userModel.create({
      name,
      email,
      password,
      varifcationCode: randomNumber,
      isVerified: false,
    });

    const Email = user.email;
    const varifcationCode = user.varifcationCode;

    return {
      message: 'Email Sent to Your Email',
      Email,
      varifcationCode,
    };
  }

  async signupVerify(
    verifySignupDto: verifySignupDto,
  ): Promise<{ message: string }> {
    const { email, varifcationCode } = verifySignupDto;

    const user = await this.userModel.findOne({ varifcationCode });

    console.log(user, 'user');

    if (user.varifcationCode) {
      user.isVerified = true
      user.save()
      return { message: 'User verified' };
    } else {
      return { message: 'code not found' };
    }

  }


  async login(loginDto: LoginDto): Promise<{ message: string, token: string }> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({
      email: email,
      password: password
    })

    if (!user) {
      throw new UnauthorizedException('User not Found')
    }

    const token = await this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
        id: user._id,
      },

      {
        secret: process.env.SECRET_KEY,
      },
    );


    return { token, message: "User Login Success" }
  }

}
