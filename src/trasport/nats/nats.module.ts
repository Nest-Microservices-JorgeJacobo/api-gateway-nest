import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICES, envs } from 'src/config';


@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICES,
                transport: Transport.NATS,
                options: {
                    servers: envs.natServers
                }
            }
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: NATS_SERVICES,
                transport: Transport.NATS,
                options: {
                    servers: envs.natServers
                }
            }
        ])
    ]
})
export class NatsModule {


}
