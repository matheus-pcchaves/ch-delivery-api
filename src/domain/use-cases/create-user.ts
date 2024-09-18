import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../entities/user";
import { Either, left, right } from "src/core/either";

export interface UseCaseError {
    message: string
}

export class UserExistsError extends Error implements UseCaseError {
    constructor(identifier: string) {
      super(`E-mail "${identifier}" already exists.`)
    }
  }

export abstract class HashGenerator {
    abstract hash(plain: string): Promise<string>
}

interface CreateUserUseCaseRequest {
    name: string
    cpf: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = Either <UserExistsError,{
    user: User
}>

@Injectable()
export class CreateUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private hashGenerator: HashGenerator
    ) {}

    async execute({
        name,
        cpf,
        email,
        password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) {
            return left(new UserExistsError(email))
        }

        const hashedPassword = await this.hashGenerator.hash(password)

        const user = User.create({
            name,
            cpf,
            email,
            password: hashedPassword
        })

        await this.usersRepository.create(user)

        return right({
            user
        })
    }
}