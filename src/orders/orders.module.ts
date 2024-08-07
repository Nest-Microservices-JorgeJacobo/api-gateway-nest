import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICES } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [ClientsModule.register([
    {
      name: ORDERS_SERVICES,
      transport: Transport.TCP,
      options: {
        host: envs.ordersMicroservicesHost,
        port: envs.ordersMicroservicesPort
      }
    }
  ])],
})
export class OrdersModule {}
