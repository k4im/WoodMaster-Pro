import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { filter } from "../enum/filter.enum";

export function CheckFilter(tenantId: string, filterStatement: filter, logger: LoggerGateway) {   
    switch (filterStatement) {
        case filter.client:
            logger.log("Where Statement IsClient=true... [PersonRepository]")
            return {IsClient: true, Tenant: {Uuid: tenantId}};
        case filter.operator:   
            logger.log("Where Statement IsOperator=true... [PersonRepository]")
            return {IsOperator: true, Tenant: {Uuid: tenantId}}
        case filter.collaborator:   
            logger.log("Where Statement IsCollaborator=true... [PersonRepository]")
            return {IsCollaborator: true, Tenant: {Uuid: tenantId}}
        case filter.supplier:   
            logger.log("Where Statement IsSupplier=true... [PersonRepository]")
            return {isSupplier: true, Tenant: {Uuid: tenantId}}
        default:
            break;
    };
}
