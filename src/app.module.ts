import { Module } from '@nestjs/common'
import { PrismaService } from './infrastructure/prisma/prisma.service'
import { CreateUserController } from './infrastructure/controllers/create.user.controller'
import { AuthModule } from './infrastructure/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthenticateController } from './infrastructure/controllers/authenticate.controller'
import { CreateSolicitationController } from './infrastructure/controllers/create.solicitation.controller'
import { UpdateReceiverAddress, UpdateSolicitationAddressController } from './infrastructure/controllers/update.solicitation.address.controller'
import { DeletesolicitationController } from './infrastructure/controllers/delete.solicitation.controller'

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
