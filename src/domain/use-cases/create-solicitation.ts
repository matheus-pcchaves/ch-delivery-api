import { Injectable } from "@nestjs/common"
import { SolicitationsRepository } from "../repositories/solicitations-repository"
import { Solicitation } from "../entities/solicitation"
import { Either, right } from "src/core/either"
import { UniqueEntityID } from "src/core/entities/unique.entity.id"

interface CreateSolicitationUseCaseRequest {
    customerId,
    productName: string,
    category: string,
    tracking: number,
    shipperAddress: string,
    receiverAddress: string
}

type CreateSolicitationUseCaseResponse = Either <null,{
    solicitation: Solicitation
}>

@Injectable()
export class CreateSolicitationUseCase {
    constructor(
        private solicitationRepository: SolicitationsRepository,
    ) {}

    async execute({
        customerId,
        productName,
        category,
        tracking,
        shipperAddress,
        receiverAddress
    }: CreateSolicitationUseCaseRequest): Promise<CreateSolicitationUseCaseResponse> {

        const solicitation = Solicitation.create({
            customerId: new UniqueEntityID(customerId),
            productName,
            category,
            tracking,
            shipperAddress,
            receiverAddress
        })

        await this.solicitationRepository.create(solicitation)

        return right({
            solicitation
        })
    }
}