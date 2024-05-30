
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateClassDto {
    @ApiProperty({ description: 'Digite nombre de la clase' })
    @IsString({ message: 'El campo name debe ser cadena de texto' })
    readonly name: string;

    @ApiProperty({ description: 'Digite apellido del Profesor' })
    @IsString({ message: 'El campo descripcion debe ser cadena de texto' })
    readonly description: string;

    // @ApiProperty({ description: 'El Id del profesor' })
    // @IsNumber()
    // readonly teacherId: number;

    
}