

import { Body, Controller, Get, Injectable, Post } from "@nestjs/common";
import { ProductsDto } from "./productsDto/products.dto";
import { ProductServices } from "./products.services";
import { Product } from "./productsSchema/products.schema";

@Controller('/products')
export class ProductController {
    constructor(
        private readonly productsServices: ProductServices
    ) {
        console.log("ProductController");

    }


    @Post('/createProduct')
    async createProducts(@Body() productsDto: ProductsDto) {
        const product = await this.productsServices.createProducts(productsDto)

        const { message, token } = product

        return { message, token }

    }


    @Get('/allProducts')
    async getAllProducts(): Promise<Product[]> {
        return this.productsServices.getAllProducts();
    }

}