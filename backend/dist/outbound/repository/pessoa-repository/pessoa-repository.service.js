"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../../helpers/logger/logger.service");
const database_service_1 = require("../../database/database.service");
let PessoaRepositoryService = class PessoaRepositoryService {
    constructor(databaseService, logger) {
        this.databaseService = databaseService;
        this.logger = logger;
    }
    criarNovaPessoa(pessoa) {
        try {
            this.databaseService.pessoa.create({ data: pessoa });
            this.logger.log("");
        }
        catch (error) {
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
        }
    }
};
exports.PessoaRepositoryService = PessoaRepositoryService;
exports.PessoaRepositoryService = PessoaRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        logger_service_1.CustomLogger])
], PessoaRepositoryService);
//# sourceMappingURL=pessoa-repository.service.js.map