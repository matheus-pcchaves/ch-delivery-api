import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/domain/repositories/users-repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/domain/entities/user";
import { PrismaUsersMapper } from "../mappers/prisma-users-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.users.findUnique({
            where: {
                email
            },
        })

        if(!user) {
            return null
        }

        return PrismaUsersMapper.toDomain(user)
    }

    async create(user: User): Promise<void> {
        const data = PrismaUsersMapper.toPrisma(user)

        await this.prisma.users.create({
            data,
        })
    }

    
}