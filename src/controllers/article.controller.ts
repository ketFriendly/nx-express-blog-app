import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import Container, { Service } from "typedi";
import { ArticleService } from "../services/article.service";
import { ArticleDto } from "../dtos/article.dto";
import { IdDto } from "../dtos/id.dto";

@JsonController('/article')
@Service()
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) { 
        this.articleService = Container.get<ArticleService>(ArticleService)
    }

    @Post('/create-article')
    async createArticle(@Body({ required: true }) article: ArticleDto): Promise<string> {
        return await this.articleService.create(article)
        
    }

    @Delete('/delete-article/:id')
    async deleteArticle(@Param('id') id: IdDto): Promise<string> {
        return await this.articleService.delete(id.id)
    }

    @Get('/:id')
    async getById(@Param('id') id: IdDto): Promise<string> {
        return await this.articleService.getById(id.id)
    }

}