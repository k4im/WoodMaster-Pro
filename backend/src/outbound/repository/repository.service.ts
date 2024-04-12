import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RepositoryService {
    
    constructor(private databaseService: DatabaseService) {
    }
}
