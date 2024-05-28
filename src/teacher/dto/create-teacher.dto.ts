import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({ description: 'Digite nombre del Profesor' })
    @IsString({ message: 'El campo name debe ser cadena de texto' })
    readonly name: string;

    @ApiProperty({ description: 'Digite apellido del Profesor' })
    @IsString({ message: 'El campo last_name debe ser cadena de texto' })
    readonly last_name: string;

    @ApiProperty({ description: 'El email del profesor' })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    readonly email: string;

    
}
