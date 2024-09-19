import { Module } from '@nestjs/common'
import { PrismaService } from './infrastructure/database/prisma/prisma.service'
import { CreateUserController } from './infrastructure/controllers/create.user.controller'
import { AuthModule } from './infrastructure/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthenticateController } from './infrastructure/controllers/authenticate.controller'
import { CreateSolicitationController } from './infrastructure/controllers/create.solicitation.controller'
import { UpdateReceiverAddress, UpdateSolicitationAddressController } from './infrastructure/controllers/update.solicitation.address.controller'
import { DeletesolicitationController } from './infrastructure/controllers/delete.solicitation.controller'
import { FindUserSolicitationController } from './infrastructure/controllers/find.user.solicitation.controller'
import { DatabaseModule } from './infrastructure/database/database.module'
import { CreateUserUseCase } from './domain/use-cases/create-user'
import { CryptographyModule } from './infrastructure/auth/cryptography.module'
import { GetQuestionByUserUseCase } from './domain/use-cases/get-solicitation-by-user'
import { CreateSolicitationUseCase } from './domain/use-cases/create-solicitation'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    CryptographyModule
  ],
  controllers: [
    CreateUserController, 
    AuthenticateController, 
    CreateSolicitationController, 
    UpdateSolicitationAddressController, 
    UpdateReceiverAddress,
    FindUserSolicitationController,
    DeletesolicitationController
  ],
  providers: [
    CreateUserUseCase,
    CreateSolicitationUseCase,
    GetQuestionByUserUseCase
  ]
})
export class AppModule {}
