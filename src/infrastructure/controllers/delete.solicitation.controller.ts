import { Body, Controller, Delete, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infrastructure/auth/jwt.auth.guard";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

type deleteSolicitation = { id: string }

@Controller('/deleteSolicitation')
@UseGuards(JwtAuthGuard)
export class DeletesolicitationController{
    constructor(private prisma: PrismaService){}

    @Delete()
    async deleteSolicitation(@Body() body: deleteSolicitation){
        const { id } = body

        await this.prisma.solicitations.delete({
            where: {id}
        })

        return `Deletado com sucesso ${HttpStatus.ACCEPTED}`
    }

}