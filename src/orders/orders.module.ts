import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICES, ORDERS_SERVICES } from 'src/config';
import { NatsModule } from 'src/trasport/nats/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    NatsModule
  //   ClientsModule.register([
  //    {
  //      name: ORDERS_SERVICES,
  //      transport: Transport.TCP,
  //      options: {
  //       //  host: envs.ordersMicroservicesHost,
  //       //  port: envs.ordersMicroservicesPort
  //      }
  //    },
    
  // ])

],
})
export class OrdersModule {}
