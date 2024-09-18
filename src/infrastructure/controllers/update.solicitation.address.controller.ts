import { BadRequestException, Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infrastructure/auth/jwt.auth.guard";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "src/infrastructure/validation-pipe/zod-validation-pipe";
import { z } from "zod";

const updateShipperAddress = z.object ({
    id: z.string(),
    shipperAddress: z.string()
})

const ShipperValidationPipe = new ZodValidationPipe(updateShipperAddress)

type updateShipperAddress = z.infer<typeof updateShipperAddress>

// VALIDAÇÃO DE ENDEREÇO DO DESTINO 
const updateReceiverAddress = z.object ({
    id: z.string(),
    receiverAddress: z.string()
})

const ReceiverValidationPipe = new ZodValidationPipe(updateReceiverAddress)

type updateReceiverAddress = z.infer<typeof updateReceiverAddress>

@Controller('/updateShipper')
@UseGuards(JwtAuthGuard)
export class UpdateSolicitationAddressController {
    constructor(private prisma: PrismaService){}

    @Patch()
    async updateShipperAddress(
        @Body(ShipperValidationPipe) body: updateShipperAddress
    ) {
        const { id, shipperAddress} = body

        try {
            const newShipper = await this.prisma.solicitations.update({
                where: {
                    id,
                },
                data: {
                    shipperAddress
                }
            })
            return { newShipper }

        } catch (error) {
            throw new BadRequestException()
        }
    }
}

@Controller('/updateReceiver')
@UseGuards(JwtAuthGuard)
export class UpdateReceiverAddress {
    constructor(private prisma: PrismaService){}

    @Patch()
    async updateReceiverAddress(
        @Body(ReceiverValidationPipe) body: updateReceiverAddress
    ) {
        const { id, receiverAddress} = body

        try {
            const newReceiver = await this.prisma.solicitations.update({
                where: {
                    id,
                },
                data: {
                    receiverAddress
                }
            })
            return { newReceiver }

        } catch (error) {
            throw new BadRequestException()
        }
    }
}