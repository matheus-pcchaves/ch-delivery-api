import { Solicitation } from "../entities/solicitation";

export abstract class SolicitationsRepository {
    abstract create(solicitation: Solicitation): Promise<void>
    abstract findByUser(customerId: string): Promise<Solicitation[] | null>
}