import { Injectable } from "@nestjs/common"
import { CreateSolicitationsRepository } from "../repositories/create-solicitations-repository"
import { Solicitation } from "../entities/solicitation"
import { Either, right } from "src/core/either"
import { UniqueEntityID } from "src/core/entities/unique.entity.id"

interface CreateSolicitationUseCaseRequest {
    customerId,
    productName: string,
    category: string,
    shipperAddress: string,
    receiverAddress: string
}

type CreateSolicitationUseCaseResponse = Either <null,{
    solicitation: Solicitation
}>

@Injectable()
export class CreateSolicitationUseCase {
    constructor(
        private solicitationRepository: CreateSolicitationsRepository,
    ) {}

    async execute({
        customerId,
        productName,
        category,
        shipperAddress,
        receiverAddress
    }: CreateSolicitationUseCaseRequest): Promise<CreateSolicitationUseCaseResponse> {

        const solicitation = Solicitation.create({
            customerId: new UniqueEntityID(customerId),
            productName,
            category,
            shipperAddress,
            receiverAddress
        })

        await this.solicitationRepository.create(solicitation)

        return right({
            solicitation
        })
    }
}