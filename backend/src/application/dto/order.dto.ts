/**
 * Dto utilizado atulamente apenas para estar
 * sendo repassado ao CASLJS para identificação
 * dos subjects.
 * 
 * @author João Victor.
 */
export class OrderDto { 
    Uuid: string
    OrderType: string
    DeliveryAddress: any
    Status: string
    Observations: string
    OrderItens: any
    Tenant: string

    constructor(uuid: string,
        orderType: string,
        deliveryAddress: any,
        status: string,
        observations: string,
        orderItens: any,
        tenant: string,) {
            this.Uuid = uuid,
            this.OrderType = orderType,
            this.DeliveryAddress = deliveryAddress,
            this.Status = status,
            this.Observations = observations,
            this.OrderItens = orderItens
            this.Tenant = tenant
        }
  static get modelName() {
    return 'OrderDto'
  }
}