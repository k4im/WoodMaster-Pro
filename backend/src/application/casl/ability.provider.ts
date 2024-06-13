import { InferSubjects } from "nest-casl";
import { jwtDecoded } from "../dto/interfaces/jwtDecoded.dto";
import UserDomanEntity from "src/domain/entities/user.domain";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, PureAbility } from "@casl/ability";
import { Actions } from "../enum/permissoes.enum";
import {Role as Roles} from '../enum/roles.enum';
import { Action } from "rxjs/internal/scheduler/Action";


export type Subjects = InferSubjects<typeof UserDomanEntity> | 'all';
export type AppAbility = PureAbility<[Actions, Subjects]>;

export default class UserAbilityFactory { 
    defineAbality({Uuid, Email, Role}: jwtDecoded) {
        const {can, cannot, build} = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);
        
        if(Role === Roles.root) 
            can(Actions.manage, 'all');
        
        if(Role === Roles.admin){
            can(Actions.create, UserDomanEntity);
            can(Actions.update, UserDomanEntity);
            can(Actions.remove, UserDomanEntity);
        }
        
        if(Role === Roles.user){
            can(Actions.update, UserDomanEntity, {EmailAddr: Email})
            cannot(Actions.create, UserDomanEntity);
            cannot(Actions.remove, UserDomanEntity);
            can(Actions.read, UserDomanEntity, {EmailAddr: Email})
        }
        
        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subjects>
        })  
    }   
}