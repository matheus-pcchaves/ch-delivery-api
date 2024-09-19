import { Users as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique.entity.id'
import { User } from "src/domain/entities/user"

export class PrismaUsersMapper {
    static toDomain(raw: PrismaUser): User {
      return User.create(
        {
          name: raw.name,
          cpf: raw.cpf,
          email: raw.email,
          password: raw.password,
        },
        new UniqueEntityID(raw.id),
      )
    }
  
    static toPrisma(user: User): Prisma.UsersUncheckedCreateInput {
      return {
        id: user.id.toString(),
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
      }
    }
  }