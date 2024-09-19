import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateSolicitationUseCase } from "src/domain/use-cases/create-solicitation";
import { CurrentUser } from "src/infrastructure/auth/current.user.decorator";
import { JwtAuthGuard } from "src/infrastructure/auth/jwt.auth.guard";
import { UserPayLoad } from "src/infrastructure/auth/jwt.strategy";
import { ZodValidationPipe } from "src/infrastructure/validation-pipe/zod-validation-pipe";
import { z } from "zod";

const CreateSolicitationBodySchema = z.object ({
    productName: z.string(),
    category: z.string(),
    shipperAddress: z.string(),
    receiverAddress: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(CreateSolicitationBodySchema)

type createSolicitationBodySchema = z.infer<typeof CreateSolicitationBodySchema>

@Controller('/solicitations')
@UseGuards(JwtAuthGuard)
export class CreateSolicitationController {
    constructor(private createSolicitationUseCase: CreateSolicitationUseCase){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: createSolicitationBodySchema,
        @CurrentUser() user: UserPayLoad
    ) {
        const { productName, category, shipperAddress, receiverAddress } = body
        const userId = user.sub

        const newSolicitation = await this.createSolicitationUseCase.execute({
            customerId: userId,
            productName,
            category,
            shipperAddress,
            receiverAddress
        })

        return { newSolicitation }
    }
}