import { IsEmail, IsString } from "class-validator";
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    @IsString()
    readonly name: string;

    @Column()
    @IsString()
    readonly last_name: string;

    @Column()
    @IsString()
    readonly descripcion: string;

    @ManyToOne(() => Teacher, teacher => teacher.classes)
    teacher: Teacher;

    @ManyToMany(() => Student, student => student.classes)
    students: Student[];

}
