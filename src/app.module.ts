import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"
import { UserModule } from './user/user.mdule';

dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL)
    , ProductsModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log("AppModule");
  }

}
