
import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductServices } from './products.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './productsSchema/products.schema';
import { JwtService } from '@nestjs/jwt';


@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [ProductServices, JwtService],
})
export class ProductsModule {
    constructor() {
        console.log('ProductsModule');
    }
}
