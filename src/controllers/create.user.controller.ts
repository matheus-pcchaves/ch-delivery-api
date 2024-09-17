import { ConflictException, HttpCode, Controller, Body, Post, UsePipes } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/validation-pipe/zod-validation-pipe'
import { z } from 'zod'

const createAccountBodySchema = z.object ({
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type createAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users')
export class CreateUserController {
    constructor(private prisma: PrismaService){}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: createAccountBodySchema){
        const { name, cpf, email, password } = createAccountBodySchema.parse(body)

        const userWithSameEmail = await this.prisma.users.findUnique({
            where: {
                email,
            },
        })

        if(userWithSameEmail) {
            throw new ConflictException(
                'Este e-mail já está em uso na plataforma.'
            )
        }

        const userWithSameCPF = await this.prisma.users.findUnique({
            where: {
                cpf,
            },
        })

        if(userWithSameCPF) {
            throw new ConflictException(
                'CPF incorreto.'
            )
        }

        const hashedPassword = await hash(password, 8)

        const newUser = await this.prisma.users.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword
            }
        })

        return console.log(newUser)
    }

}