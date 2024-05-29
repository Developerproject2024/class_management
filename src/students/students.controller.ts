import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly teacherService: StudentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTeacherDto: CreateStudentDto): Promise<Student> {
    try {
    return await this.teacherService.create(createTeacherDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Student[]> {
    try {
      return await this.teacherService.findAll();
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
      return await this.teacherService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    try {
      return this.teacherService.update(+id, updateStudentDto);
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
      const message = await this.teacherService.remove(parseInt(id, 10));
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
