import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [{
        id: 1 , username: "trushant", email:"trushant@trushant"
    },
    {
        id: 2 , username: "abhinandan", email:"abhinandan@gmail.com"
    },{
        id: 3, username: "bhushan", email: "bhushan@gmail.com"
    }

]
    // get all user data
    async getAll(){
        return this.users;
    }

    // get user using id
    async getUserById(id:number){   
        let user = this.users.find((u)=> u.id === id)
        if(!user) throw new NotFoundException("user not found");
        return user;
    }

    // create user using post
    async createUser(data: {username:string; email:string}){
        let newUser = {
            id : Date.now(),
            ...data,
        }
        this.users.push(newUser)
        return newUser;
    }

    // update user full info
    async updateUser(id:number, data: {username:string; email:string}){
        let index = this.users.findIndex((u)=>u.id === id);
        if(index === -1) throw new NotFoundException("index not found");

        this.users[index] = {id, ...data};
        return this.users[index]
    }

    // partial changes user info
    async partialUpdateUser(id:number, data: Partial<{username:string; email:string}>){
        const user =  this.getUserById(id);
        Object.assign(user, data);
        return user;
    }

    // delete user on basis of id
    async deleteUser(id:number){
        let index = this.users.findIndex((u)=>u.id === id);
        if(index === -1) throw new NotFoundException("index not found");
        
        const deleted = this.users.splice(index, 1);
        return {message:"delete user", deleted:[0]}
    }
}
