import { Entity } from "src/core/entities/entity"
import { UniqueEntityID } from "src/core/entities/unique.entity.id"

export interface SolicitationProps {
    customerId: UniqueEntityID,
    productName: string,
    category: string,
    tracking: number,
    shipperAddress: string,
    receiverAddress: string
}

export class Solicitation extends Entity<SolicitationProps> {
    get customerId() {
        return this.props.customerId
    }

    get productName() {
        return this.props.productName
    }

    set productName(productName: string) {
        this.props.productName = productName
    }

    get category() {
        return this.props.category
    }

    set category(category: string) {
        this.props.category = category
    }

    get tracking() {
        return this.props.tracking
    }

    get shipperAddress() {
        return this.props.shipperAddress
    }

    set shipperAddress(shipperAddress: string) {
        this.props.shipperAddress = shipperAddress
    }

    get receiverAddress() {
        return this.props.receiverAddress
    }

    set receiverAddress(receiverAddress: string) {
        this.props.receiverAddress = receiverAddress
    }

    static create(props: SolicitationProps, id?: UniqueEntityID){
        const user = new Solicitation(props, id)

        return user
    }
}