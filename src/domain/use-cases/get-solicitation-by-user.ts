import { Injectable } from "@nestjs/common";
import { SolicitationsRepository } from "../repositories/solicitations-repository";
import { right } from "src/core/either";

interface SolicitationByUserUseCaseRequest {
  customerId: string
}

@Injectable()
export class GetQuestionByUserUseCase {
    constructor(private solicitationsRepository: SolicitationsRepository){}

    async execute({customerId}: SolicitationByUserUseCaseRequest){
      const solicitations = await this.solicitationsRepository.findByUser(customerId)
      
      return right({solicitations})
    }
}