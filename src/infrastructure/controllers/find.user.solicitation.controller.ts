import { BadRequestException, Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { CurrentUser } from "../auth/current.user.decorator";
import { UserPayLoad } from "../auth/jwt.strategy";
import { GetQuestionByUserUseCase } from "src/domain/use-cases/get-solicitation-by-user";


@Controller('/mySolicitations')
@UseGuards(JwtAuthGuard)
export class FindUserSolicitationController {
    constructor(private getQuestionByUserUseCase: GetQuestionByUserUseCase){}

    @Get()
    async updateReceiverAddress(
        @CurrentUser() user: UserPayLoad,
    ) {
        const userId = user.sub
        const solicitations = await this.getQuestionByUserUseCase.execute({
            customerId: userId
        })

        if (solicitations.isLeft()) {
            throw new BadRequestException()
        }

        return solicitations
    }
}
