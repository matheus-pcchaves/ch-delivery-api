import { Entity } from "src/core/entities/entity"
import { UniqueEntityID } from "src/core/entities/unique.entity.id"

export interface UserProps {
    name: string
    cpf: string
    email: string
    password: string
}

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    get cpf() {
        return this.props.cpf
    }

    get email() {
        return this.props.email
    }

    get password() {
        return this.props.password
    }

    static create(props: UserProps, id?: UniqueEntityID){
        const user = new User(props, id)

        return user
    }
}