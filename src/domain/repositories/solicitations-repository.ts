import { Solicitation } from "../entities/solicitation";

export abstract class SolicitationsRepository {
    abstract create(solicitation: Solicitation): Promise<void>
    abstract findByUser(customerId: string): Promise<Solicitation | null>
    abstract findById(id: string): Promise<Solicitation | null>
    abstract updateShipperAddress(id: string): Promise<Solicitation | null>
    abstract updateReceiverAddress(id: string): Promise<Solicitation | null>
}