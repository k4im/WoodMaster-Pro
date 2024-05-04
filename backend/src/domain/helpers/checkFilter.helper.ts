import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { filter } from "../enum/filter.enum";

export async function CheckFilter(filterStatement: filter, logger: LoggerGateway) {
    switch (filterStatement) {
        case filter.client:
            logger.log("Where Statement IsClient=true... [PersonRepository]")
            return {IsClient: true};
        case filter.operator:   
            logger.log("Where Statement IsOperator=true... [PersonRepository]")
            return {IsOperator: true}
        case filter.collaborator:   
            logger.log("Where Statement IsCollaborator=true... [PersonRepository]")
            return {IsCollaborator: true}
        case filter.supplier:   
            logger.log("Where Statement IsSupplier=true... [PersonRepository]")
            return {isSupplier: true}
        default:
            break;
    };
}