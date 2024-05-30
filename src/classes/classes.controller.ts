import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { Classes } from './entities/class.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateClassStudentDto } from './dto/create-class-student.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClassDto: CreateClassDto): Promise<Classes> {
    try {
    return await this.classesService.create(createClassDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Classes[]> {
    try {
      return await this.classesService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.classesService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    try {
      return this.classesService.update(+id, updateClassDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    try {
      const message = await this.classesService.remove(parseInt(id, 10));
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/assign-teacher')
  async createRelationClassTeacher(@Param('id') id: string, @Body() req) {
    try {
      const message = await this.classesService.createRelationClassTeacher(+id, req);
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/assign-students')
  async createRelationClassStudents(@Param('id') id: string, @Body() createClassStudentDto: CreateClassStudentDto) {
    try {
      const message = await this.classesService.createRelationClassStudents(+id, createClassStudentDto);
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/students')
  async getStudentsByClaseId(@Param('id') id: string) {
    try {
      const message = await this.classesService.getStudentsByClaseId(+id);
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
