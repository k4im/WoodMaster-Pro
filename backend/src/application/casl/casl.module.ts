import { Module } from "@nestjs/common";
import AbilityFactory from "./providers/AbillityFactory.provider";

@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory]
})
export default class CaslModule {}