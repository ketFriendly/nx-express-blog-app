import { Matches, IsISO8601 } from "class-validator";

export class ArticleDto {
    title: string
    @Matches(/^[A-Za-z]{3}(?:-[A-Za-z0-9]+)*$/,{message:"Invalid slug"})
    slug: string
    @IsISO8601()
    published_at: Date
}