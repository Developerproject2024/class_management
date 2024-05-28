import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
    @ApiProperty({ description: 'El nombre del usuario registrado' })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    readonly username: string;

    @ApiProperty({ description: 'El password del usuario registrado' })
    @IsString({ message: 'El password debe ser una cadena de texto' })
    readonly password: string;
}