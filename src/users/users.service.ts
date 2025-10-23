import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { retry } from 'rxjs';
import { env, title } from 'process';
import { create } from 'domain';
var md5 = require('md5');
var jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // Get all users
  async getAll() {
    let users = await this.prisma.user.findMany();
    return users
  }


  // Create user
  async createUser(data: { name: string; email: string, password: string }) {
    let passwordHash = md5(data.password)
    console.log(passwordHash)
    try {
      let createUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: passwordHash
        }
      });
    }
    catch (error) {
      throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);

      console.log("error", error)
    }
    return {
      massage: "User Created",
      "statusCode": 200,
    }
  }

  // create user login
  async loginUser(data: { email: string, password: string }) {
    let jwtToken;
    const getUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    let hashpassword = await md5(data.password)

    if (!getUserByEmail) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (getUserByEmail.password != hashpassword) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }

    try {
      var token = jwt.sign({ user: getUserByEmail.id }, process.env.jwtPrivateKey);
      jwtToken = token;

    } catch (error) {
      console.log("error", error)
      throw new HttpException('Password not match', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      massage: "User login sucesss",
      "statusCode": 200,
      data: token

    }
  }

  // create employee
  async createEmployeee(body) {
    try {
      const craeteEmployeee = await this.prisma.employees.create({
        data: {
          name: body.name,
          userId: Number(body.userId)
        }
      })
    } catch (error) {
      console.log("error", error)
    }

    return {
      massage: "Eployee create sucesss",
      "statusCode": 200,
    }
  }

  // create project
  async createProject(body) {
    try {
      const create = await this.prisma.projects.create({
        data: {
          title: body.title
        }
      })

      // console.log(create)

      const createProject = await this.prisma.employeeProject.create({
        data: {
          projectId: create.id,
          employeeId: Number(body.employeeId)
        }
      })
    } catch (error) {
      console.log("error", error)
    }

    return {
      massage: "project create sucesss",
      "statusCode": 200,
    }
  }

  // get project
  async getProjectById(id) {
    let data;

    try {
      const craete = await this.prisma.employeeProject.findMany({
        where: {
          employeeId: Number(id)
        },
        include: {
          project: true
        }
      })
      data = craete
    } catch (error) {
      console.log("error", error)
    }

    return {
      massage: "project create sucesss",
      "statusCode": 200,
      data: data
    }
  }
 
}
