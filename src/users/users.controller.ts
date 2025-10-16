import { Controller, Get , Param, Body, Put, Post, Delete, Patch} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Get()
    getAllUsers(){
        return this.userService.getAll();
    }

    // get user usin id
    @Get(":id")
    getUserId(@Param("id") id:string){
        return this.userService.getUserById(Number(id));
    }

    // post user using data
    @Post()
    createUser(@Body() body:{username:string; email:string}){
        return this.userService.createUser(body)
    }

    // update full user info
    @Put(":id")
    update(@Param("id") id:string, @Body() body:{username:string; email:string}){
        return this.userService.updateUser(Number(id), body)
    }

    // partially update user info
    @Patch(":id")
    partialUpdate(@Param("id") id:string, @Body() body: Partial<{username:string; email:string}>){
        return this.userService.partialUpdateUser(Number(id), body)
    }
    
    // delete user using its id
    @Delete(":id")
    deleteUser(@Param("id") id:string){
        return this.userService.deleteUser(Number(id))
    }

}
