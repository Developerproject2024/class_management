import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Classes } from './entities/class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classes, Teacher, Student])],
  controllers: [ClassesController],
  providers: [ClassesService, TeacherService, StudentsService],
})
export class ClassesModule {}
