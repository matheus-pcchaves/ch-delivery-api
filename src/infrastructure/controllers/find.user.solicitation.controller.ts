import { Controller, Get, Param, Response, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { PrismaService } from "../database/prisma/prisma.service";
import { CurrentUser } from "../auth/current.user.decorator";
import { UserPayLoad } from "../auth/jwt.strategy";


@Controller('/mySolicitations')
@UseGuards(JwtAuthGuard)
export class FindUserSolicitationController {
    constructor(private prisma: PrismaService){}

    @Get()
    async updateReceiverAddress(
        @CurrentUser() user: UserPayLoad,
    ) {
        const userId = user.sub
        const solicitations = await this.prisma.solicitations.findMany({
            where: {
                customerId: userId
            },
            select: {
                productName: true,
                status: true,
                receiverAddress: true,
                createdAt: true
            }
        })

        return { solicitations }
     }
}
