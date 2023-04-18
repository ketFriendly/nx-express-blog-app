import { JsonController, Get, Post, Delete, Body, Param, QueryParam, Authorized, Req } from "routing-controllers";
import Container, { Service } from "typedi";
import { ArticleService } from "../services/article.service";
import { ArticleDto } from "../dtos/article.dto";
import { IdDto } from "../dtos/id.dto";
import { PaginationDto } from "../dtos/pagination.dto";
import { Request } from "express";


@JsonController('/article')
@Service()
export class ArticleController {
    constructor(
        private articleService: ArticleService,
    ) { 
        this.articleService = Container.get<ArticleService>(ArticleService)
    }

    @Authorized()
    @Post('/create-article')
    async createArticle(@Body({ required: true, validate: true, type: ArticleDto }) article: ArticleDto): Promise<String|undefined>  {
        try {
            return await this.articleService.create(article)
        } catch (e) {
            console.log(e)
       }
        
    }

    @Authorized()
    @Delete('/delete-article/:id')
    async deleteArticle(@Param('id') id: IdDto): Promise<string> {
        try {
            return await this.articleService.delete(id.id)
        } catch (e) {
            console.log(e)
       }
    }

    @Get('/published')
    async getPublished(@Req() request: Request, @QueryParam('pagination', {required:false}) pagination?: PaginationDto): Promise<string> {
        try {
            if(!pagination){
                pagination = new PaginationDto()
            }
            return await this.articleService.getPublished(pagination, request.headers.cookie)
        } catch (e) {
            console.log(e)
       }
    }

    @Get('/:id')
    async getById(@Param('id') id: IdDto): Promise<string> {
        try {
            return await this.articleService.getById(id.id)
        } catch (e) {
            console.log(e)
        }
    }

}