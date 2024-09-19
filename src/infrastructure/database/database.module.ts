import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "src/domain/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { SolicitationsRepository } from "src/domain/repositories/solicitations-repository";
import { PrismaSolicitationRepository } from "./prisma/repositories/prisma-solicitation-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository
        },
        {
            provide: SolicitationsRepository,
            useClass: PrismaSolicitationRepository
        }
    ],
    exports: [
        PrismaService,
        UsersRepository,
        SolicitationsRepository
    ]
})
export class DatabaseModule {}