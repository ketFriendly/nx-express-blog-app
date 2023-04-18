export class PaginationDto {
    sortBy?: string = 'published_at'; 
    sortType?: SORT_TYPE = SORT_TYPE.ASC;
    page?: number = 1; 
    perPage?:number = 10
}

enum SORT_TYPE {"ASC"="ASC","DESC"="DESC"}