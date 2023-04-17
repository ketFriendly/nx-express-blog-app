import { ArticleDto } from "src/dtos/article.dto";
import { Service } from "typedi";
//import { DataSource } from "typeorm";
import db from "../main"
import { Article } from "../db/models/article.model";

@Service()
export class ArticleService {
    private db: any 
    constructor() {
        this.db = db.datasource
    }

    async create(articleDto: ArticleDto){
        const article = await this.db.getRepository(Article).create(articleDto)
        const results = await this.db.getRepository(Article).save(article)
        return results
    }

    async delete(articleId: string){
        const results = await this.db.getRepository(Article).delete(articleId)
        return results
    }

    async getById(articleId: string){
        const results = await this.db.getRepository(Article).findOneBy({
            id: articleId,
        })
        return results
    }
}