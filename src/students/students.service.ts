import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  
  constructor(
    @InjectRepository(Student)
    private teacherRepository: Repository<Student>,
  ) {}
  async create(createTeacherDto: CreateStudentDto): Promise<Student> {
    const user = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(user);
  }

  async findAll() : Promise<Student[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    return await this.teacherRepository.findOneBy({id});
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const user = await this.teacherRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = Object.assign(user, updateStudentDto);
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
