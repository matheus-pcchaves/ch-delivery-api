import { Injectable } from "@nestjs/common";
import { SolicitationsRepository } from "src/domain/repositories/solicitations-repository";
import { PrismaService } from "../prisma.service";
import { PrismaSolicitationMapper } from "../mappers/prisma-solicitation-mapper";
import { Solicitation } from "src/domain/entities/solicitation";

@Injectable()
export class PrismaSolicitationRepository implements SolicitationsRepository {
    constructor(
        private prisma: PrismaService
    ) {}
    
    async create(solicitation: Solicitation): Promise<void> {
        const data = PrismaSolicitationMapper.toPrisma(solicitation)

        await this.prisma.solicitations.create({
            data,
        })
    }

    async findByUser(customerId: string): Promise<Solicitation[] | null> {
        const solicitationByUser = await this.prisma.solicitations.findMany({
            where: {
                customerId
            },
            select: {
                productName: true,
                status: true,
                receiverAddress: true,
                createdAt: true
            }
        })

        return solicitationByUser.map(PrismaSolicitationMapper.toDomain)
    }
}