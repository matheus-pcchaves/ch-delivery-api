import { Solicitation } from "../entities/solicitation";

export abstract class CreateSolicitationsRepository {
    abstract create(solicitation: Solicitation): Promise<void>
}