import { ArticleDto } from "src/dtos/article.dto";
import { Service } from "typedi";
import db from "../main"
import { Article } from "../db/models/article.model";
import { PaginationDto } from "../dtos/pagination.dto";

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

    async getPublished(paginationDto?: PaginationDto){
        const startDate = new Date(Date.now()).toISOString().split('T')[0];
        const entriesToSkip = (paginationDto.page-1) * paginationDto.perPage
        const results = await this.db.getRepository(Article).createQueryBuilder('article').orderBy(paginationDto.sortBy, paginationDto.sortType)
        .take(paginationDto.perPage)
        .skip(entriesToSkip)
        .where('article.published_at < :startDate', {startDate: startDate}).getMany();
        return results
    }
}