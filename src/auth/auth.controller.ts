import { Controller, Post, Inject, Get, Body, Req, UseGuards } from '@nestjs/common';
import { NATS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth-guard';
import { User } from './guards/decorators';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './guards/decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICES) private readonly authClient: ClientProxy
  ) {}

  @Post('register')
  async registerUser(@Body() registerUser:RegisterUserDto){
    return  this.authClient.send('auth.register.user', registerUser).pipe(
      catchError((error)=>{
        throw new RpcException(error);
      }),
    );
  }


  @Post('login')
  async loginUser(@Body() loginUserDto:LoginUserDto){
    return  this.authClient.send('auth.login.user', loginUserDto).pipe(
      catchError((error)=>{
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyToken( @User() user: CurrentUser, @Token() token: string ){
    // console.log(user);
    return {user, token};

    // return  this.authClient.send('auth.verify.user', {}).pipe(
    //   catchError((error)=>{
    //     throw new RpcException(error);
    //   }),
    // );
  }


  
}
