import { Controller, Get, Post, Body,  Param,  Inject, Query, ParseIntPipe, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICES) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(this.ordersClient.send('createOrder', createOrderDto));
      return order;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: OrderPaginationDto) {
    try {
      const orders = await this.ordersClient.send("findAllOrders", paginationDto);
      return orders;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
    // return paginationDto;
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(this.ordersClient.send("findOneOrder", { id }));
      return order;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto, 
    @Query() paginationDto: PaginationDto) {
    try {

      const orders = await firstValueFrom(this.ordersClient.send("findAllOrders", {
        ...paginationDto,
        status: statusDto.status
      }));
      return orders;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    console.log('llegnaod..');
    try {
      const orders = await firstValueFrom (this.ordersClient.send("changeOrderStatus", {
        id,
        status: statusDto.status
      }));
      return orders;
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }
}
