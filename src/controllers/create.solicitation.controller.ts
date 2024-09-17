import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current.user.decorator";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { UserPayLoad } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/validation-pipe/zod-validation-pipe";
import { z } from "zod";

const createSolicitationBodySchema = z.object ({
    productName: z.string(),
    category: z.string(),
    shipperAddress: z.string(),
    receiverAddress: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(createSolicitationBodySchema)

type createSolicitationBodySchema = z.infer<typeof createSolicitationBodySchema>

@Controller('/solicitations')
@UseGuards(JwtAuthGuard)
export class CreateSolicitationController {
    constructor(private prisma: PrismaService){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: createSolicitationBodySchema,
        @CurrentUser() user: UserPayLoad
    ) {
        const { productName, category, shipperAddress, receiverAddress } = body
        const userId = user.sub

        const newSolicitation = await this.prisma.solicitations.create({
            data: {
                customerId: userId,
                productName,
                category,
                shipperAddress,
                receiverAddress
            }
        })

        return { newSolicitation }
    }
}