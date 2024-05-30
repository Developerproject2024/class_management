
import { IsString } from "class-validator";
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Classes {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    @IsString()
    readonly name: string;

    @Column()
    @IsString()
    readonly description: string;

    @ManyToOne(() => Teacher, teacher => teacher.classes)
    teacher: Teacher;

    @ManyToMany(() => Student, student => student.classes)
    students: Student[];

}
