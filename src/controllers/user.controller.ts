import { JsonController, Post, Body, Res} from "routing-controllers";
import { Response }  from "express";
import Container, { Service } from "typedi";
import { UserService } from "../services/user.service";
import { UserDto } from "../dtos/user.dto";

@JsonController('/user')
@Service()
export class UserController {
    constructor(
        private userService: UserService,
    ) { 
        this.userService = Container.get<UserService>(UserService)
    }

    @Post('/register')
    async createUser(@Body({ required: true, validate: true, type: UserDto }) user: UserDto): Promise<String|undefined>  {
        try {
            return await this.userService.create(user)
        } catch (e) {
            console.log(e)
       }
    }

    @Post('/login')
    async login (@Body({ required: true, validate: true, type: UserDto }) user: UserDto, @Res() res: Response): Promise<String|undefined>  {
        try {
            const jwt =  await this.userService.login(user)
            res.cookie("jwt",jwt, { maxAge: 36000000, httpOnly: true })
            return jwt
        } catch (e) {
            console.log(e)
       }
    }
}