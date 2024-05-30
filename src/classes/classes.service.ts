import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/class.entity';
import { Repository } from 'typeorm';
import { TeacherService } from 'src/teacher/teacher.service';
import { CreateClassTeacherDto } from './dto/create-class-techer.dto';
import { StudentsService } from 'src/students/students.service';
import { CreateClassStudentDto } from './dto/create-class-student.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classRepository: Repository<Classes>,
    private readonly servicesTeacher: TeacherService,
    private readonly servicesStudents: StudentsService
  ) { }
  async create(createClassDto: CreateClassDto): Promise<Classes> {
    const classe = this.classRepository.create(createClassDto);
    return this.classRepository.save(classe);
  }
  async findAll(): Promise<Classes[]> {
    return await this.classRepository.find();
  }

  async findOne(id: number) {
    return await this.classRepository.findOneBy({ id });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const classe = await this.classRepository.findOneBy({ id });
    if (!classe) {
      throw new NotFoundException(`classe with ID ${id} not found`);
    }

    const updatedclasse = Object.assign(classe, updateClassDto);
    return this.classRepository.save(updatedclasse);
  }

  async remove(id: number): Promise<string> {
    const classe = await this.findOne(id);
    if (!classe) {
      throw new NotFoundException(`classe with ID ${id} not found`);
    }
    await this.classRepository.delete(id);
    return `classe with ID ${id} has been deleted successfully`;
  }

  async createRelationClassTeacher(id: number, createClassTeacherDto: CreateClassTeacherDto) {

    const classe = await this.classRepository.findOne({ where: { id: id } });
    const teacher = await this.servicesTeacher.findOne(createClassTeacherDto.teacherId);
    if (!teacher && !classe) {
      throw new NotFoundException('Profesor not found');
    }

    classe.teacher = teacher
    return await this.classRepository.save(classe);
  }

  async createRelationClassStudents(id: number, createClassStudentDto: CreateClassStudentDto) {

    const classe = await this.classRepository.findOne({ where: { id: id } });
    const student = await this.servicesStudents.findOne(createClassStudentDto.studentId);
    if (!classe && !student) {
      throw new NotFoundException('Profesor not found');
    }
    const existe = await this.classRepository.findOne({
      where: { id: id},
      relations: ['students'],
    })
    console.log('existe',existe)
    // classe.students = [student]
    // console.log(classe)

    // return await this.classRepository.save(classe);
  }

  async getStudentsByClaseId(claseId: number) {
    const classe = await this.classRepository.findOne({
      where: { id: claseId},
      relations: ['students'],
    })
    if (!classe) {
        throw new NotFoundException('Clase not found');
    }
    return classe.students;
}
}
