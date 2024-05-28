import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const user = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(user);
  }

  async findAll() : Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    return await this.teacherRepository.findOneBy({id});
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const user = await this.teacherRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = Object.assign(user, updateTeacherDto);
    return this.teacherRepository.save(updatedUser);
  }

  async remove(id: number): Promise<string> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.teacherRepository.delete(id);
    return `User with ID ${id} has been deleted successfully`;
  }
}
