import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Teacher')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
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
  async findAll(): Promise<Teacher[]> {
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
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    try {
      return this.teacherService.update(+id, updateTeacherDto);
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
