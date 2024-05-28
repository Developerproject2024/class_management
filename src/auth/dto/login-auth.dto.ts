import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
    @ApiProperty({ description: 'El nombre del usuario registrado' })
    @IsString({ message: 'El usuario debe ser una cadena de texto' })
    readonly username: string;

    @ApiProperty({ description: 'El password del usuario registrado' })
    @IsString({ message: 'El password debe ser una cadena de texto' })
    readonly password: string;
}