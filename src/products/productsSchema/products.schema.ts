

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop({ required: true })
    src: string

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    discount: number;

    // @Prop({ default: Date.now })
    // createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
