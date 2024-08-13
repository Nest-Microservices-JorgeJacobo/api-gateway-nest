import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/common/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/common/dto/product/update-product.dto';
import { NATS_SERVICES, PRODUCTS_SERVICES } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICES) private readonly client: ClientProxy
  ) {

  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'create_product' }, createProductDto));
      return product;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe ) id: number) {
    // return 'Returning product by id '+ id;

    // return this.productsClient.send({cmd: 'find_one_product'}, {id})
    // .pipe(
    //   catchError(error => {throw new RpcException(error)})
    // )

    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'find_one_product' }, { id }));
      return product;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }


  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'delete_product' }, { id }));
      return product;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }


  @Patch(':id')
  async updateProduct(
    @Param('id',  ParseIntPipe) id: number,
    @Body() body: UpdateProductDto) {
    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'update_product' }, {
        id, 
        ...body
      }));
      return product;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }



}
