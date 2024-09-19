import { Module } from '@nestjs/common'
import { HashGenerator } from 'src/domain/use-cases/create-user'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashGenerator],
})
export class CryptographyModule {}