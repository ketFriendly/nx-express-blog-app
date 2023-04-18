import { Service } from "typedi";
import jwt from "jsonwebtoken";
import { instanceToPlain } from "class-transformer"
import db from "../main"
import { UserDto } from "../dtos/user.dto";
import { User } from "../db/models/user.model";


@Service()
export class UserService {
    private db: any 
    constructor() {
        this.db = db.datasource
    }

    async create(userDto: UserDto){
        try {
            const user = await this.db.getRepository(User).create(userDto)
            const results = await this.db.getRepository(User).save(user)
            return results
        } catch (error) {
            console.log(error.detail)
            return error.detail
        }
    }

    async login(userDto: UserDto){
        const results = await this.db.getRepository(User).findOneBy({
            username: userDto.username,
        })
        if(results && userDto.password === results.password){
            return jwt.sign(instanceToPlain(userDto), process.env.JWT_SECRET, {expiresIn:"1h"})
        }
        return "Failed login attempt"
    }
}