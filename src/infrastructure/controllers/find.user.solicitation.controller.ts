import { BadRequestException, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { PrismaService } from "../prisma/prisma.service";
import { ZodValidationPipe } from "../validation-pipe/zod-validation-pipe";
import { z } from "zod";
import { UserPayLoad } from "../auth/jwt.strategy";
import { CurrentUser } from "../auth/current.user.decorator";

const findUserSolicitation = z.object ({
    customerId: z.string(),
    productName: z.string(),
    category: z.string(),
    shipperAddress: z.string(),
    receiverAddress: z.string()
})

const FindUserSolicitation = new ZodValidationPipe(findUserSolicitation)

@Controller('/mySolicitations/:customerId')
@UseGuards(JwtAuthGuard)
export class FindUserSolicitationController {
    constructor(private prisma: PrismaService){}

    @Get()
    async updateReceiverAddress(
        @CurrentUser() user: UserPayLoad,
        @Param('customerId') customerId: string 
    ) {
        const customerId = user.sub

        const userExists = await this.prisma.solicitations.findUnique({
            where: {id: customerId}
        })

        if(!userExists){
            throw new BadRequestException('Usuário não existe')
        }

        const mySolicitations = await this.prisma.solicitations.findMany({
            where: {
                customerId: customerId
            }
        })

        return mySolicitations
    }
}