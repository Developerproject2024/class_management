import { IsEmail, IsString } from "class-validator";
import { Classes } from "src/classes/entities/class.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    readonly  id: number;

    @Column()
    @IsString()
    readonly name: string;

    @Column()
    @IsString()
    readonly last_name: string;

    @Column({ unique: true })
    @IsEmail()
    readonly email: string; 

    @OneToMany(() => Classes, classes => classes.teacher)
    classes: Classes[];
}
