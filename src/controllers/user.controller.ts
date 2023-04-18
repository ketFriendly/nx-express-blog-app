import { JsonController, Post, Body} from "routing-controllers";
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

}