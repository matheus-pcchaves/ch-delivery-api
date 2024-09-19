import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { ZodValidationPipe } from "src/infrastructure/validation-pipe/zod-validation-pipe";
import { z } from "zod";

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
    constructor (
        private prisma: PrismaService,
        private jwt: JwtService
    ){}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema){
        const {email, password} = body

        const user = await this.prisma.users.findUnique({
            where:{
                email
            }
        })

        if(!user){
            throw new UnauthorizedException('E-mail ou senha incorretos')
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('E-mail ou senha incorretos')
        }

        const accessToken = this.jwt.sign({ sub: user.id })

        return {
            access_token: accessToken
        }
    }
}