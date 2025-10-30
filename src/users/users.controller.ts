import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard.';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }


  // getProject by its id
  @Get('/getProject/:id')
  getById(@Param('id') id: string){
    return this.usersService.getProjectById(id);
  }


  // user post route
  @Post()
  create(@Body() data: { name: string; email: string, password: string }) {
    return this.usersService.createUser(data);
  }

  // update user
  @Put(":id")
  updateUser(@Param("id") id:string, data: {name: string; email:string;password:string}){
    return this.usersService.updateUser(Number(id), data)
    
  }

  // create login route
  @Post('/login')
  login(@Body() data: { email: string, password: string }) {
    return this.usersService.loginUser(data);
  }

  // create project route
  @Post('/createProject')
  createProject(@Body() data) {
    return this.usersService.createProject(data);
  }

  // create employee route
  @Post('/createEmployee')
  createEMp(@Body() data) {
    return this.usersService.createEmployeee(data);
  }
}

