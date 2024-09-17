import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateUserController } from './controllers/create.user.controller'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateSolicitationController } from './controllers/create.solicitation.controller'
import { UpdateReceiverAddress, UpdateSolicitationAddressController } from './controllers/update.solicitation.address.controller'
import { DeletesolicitationController } from './controllers/delete.solicitation.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CreateUserController, 
    AuthenticateController, 
    CreateSolicitationController, 
    UpdateSolicitationAddressController, 
    UpdateReceiverAddress,
    DeletesolicitationController
  ],
  providers: [PrismaService],
})
export class AppModule {}
