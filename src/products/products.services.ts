import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./productsSchema/products.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { ProductsDto } from "./productsDto/products.dto";

@Injectable()
export class ProductServices {
    constructor(
        @InjectModel(Product.name)
        private readonly productsModel: Model<Product>,
        private readonly jwtService: JwtService
    ) {
        console.log("ProductsServices");
    }


    async createProducts(productsdto: ProductsDto): Promise<{ token: string, message: string }> {

        const { src, name, description, price, discount } = productsdto

        const alreadyCreateProducts = await this.productsModel.findOne({ name })

        if (alreadyCreateProducts) {
            throw new UnauthorizedException('This product Already Created')
        }


        const product = await this.productsModel.create({
            src: src,
            name: name,
            description: description,
            price: price,
            discount: discount
        })

        const token = this.jwtService.sign({
            src: product.src,
            name: product.name,
            descriptiondes: product.description,
            price: product.price,
            discount: discount
        },
            {
                secret: process.env.JWT_SECRET
            })

        return { message: 'Products created', token }


    }

    async getAllProducts(): Promise<Product[]> {
        return this.productsModel.find().exec();
    }

}