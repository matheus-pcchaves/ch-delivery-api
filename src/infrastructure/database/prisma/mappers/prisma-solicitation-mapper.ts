import { Solicitations as PrismaSolicitation, Prisma } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique.entity.id";
import { Solicitation } from "src/domain/entities/solicitation";

export class PrismaSolicitationMapper {
    static toDomain(raw: PrismaSolicitation): Solicitation{
        return Solicitation.create(
            {
                customerId: new UniqueEntityID(raw.customerId),
                productName: raw.productName,
                category: raw.category,
                shipperAddress: raw.shipperAddress,
                receiverAddress: raw.receiverAddress
            },
            new UniqueEntityID(raw.id)
        )
    }

    static toPrisma(solicitation: Solicitation): Prisma.SolicitationsUncheckedCreateInput {
        return {
            id: solicitation.id.toString(),
            customerId: solicitation.customerId.toString(),
            productName: solicitation.productName,
            category: solicitation.category,
            shipperAddress: solicitation.shipperAddress,
            receiverAddress: solicitation.receiverAddress
        }
    }
}