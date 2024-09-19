import { ConflictException, HttpCode, Controller, Body, Post, UsePipes, BadRequestException } from '@nestjs/common'
import { CreateUserUseCase, UserExistsError } from 'src/domain/use-cases/create-user'
import { ZodValidationPipe } from 'src/infrastructure/validation-pipe/zod-validation-pipe'
import { z } from 'zod'

const createAccountBodySchema = z.object ({
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users')
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema){
        const { name, cpf, email, password } = body

        const data = await this.createUserUseCase.execute({
            name,
            cpf,
            email,
            password
        })

        if(data.isLeft()) {
            const error = data.value

            switch(error.constructor){
                case UserExistsError:
                    throw new ConflictException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }
    }
}