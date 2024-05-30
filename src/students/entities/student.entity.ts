import { IsEmail, IsString } from "class-validator";
import { Classes } from "src/classes/entities/class.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    @IsString()
    readonly name: string;

    @Column()
    @IsString()
    readonly last_name: string;

    @Column({ unique: true })
    @IsEmail()
    readonly email: string;

    @ManyToMany(() => Classes, classe => classe.students)
    @JoinTable()
    classes: Classes[];
}
