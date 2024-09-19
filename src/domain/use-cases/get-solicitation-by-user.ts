import { Injectable } from "@nestjs/common";
import { SolicitationsRepository } from "../repositories/solicitations-repository";
import { Solicitation } from "../entities/solicitation";
import { Either, left, right } from "src/core/either";
import { ResourceNotFoundError } from "src/core/errors/resource-not-found-error";


interface SolicitationByUserUseCaseRequest {
    customerId: string
}
  
type SolicitationByUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    solicitation: Solicitation
  }
>

@Injectable()
export class GetQuestionByUser {
    constructor(private solicitationsRepository: SolicitationsRepository){}

    async execute({customerId}: SolicitationByUserUseCaseRequest): Promise<SolicitationByUserUseCaseResponse>{
      const solicitation = await this.solicitationsRepository.findByUser((customerId))

      if(!solicitation){
          return left(new ResourceNotFoundError())
      }

      return right({solicitation})
    }
}