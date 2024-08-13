import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICES } from 'src/config';
import { NatsModule } from 'src/trasport/nats/nats.module';
@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
  //   ClientsModule.register([
  //   // {
  //   //   name: PRODUCTS_SERVICES,
  //   //   transport: Transport.TCP,
  //   //   options: {
  //   //     host: envs.productsMicroservicesHost,
  //   //     port: envs.productsMicroservicesPort
  //   //   }
  //   // } 

  //   // {
  //   //   name: NATS_SERVICES,
  //   //   transport: Transport.NATS,
  //   //   options: {
  //   //     // port: envs.port
  //   //     servers: envs.natServers
  //   //   }
  //   // } 
  // ])

],
})
export class ProductsModule { }
