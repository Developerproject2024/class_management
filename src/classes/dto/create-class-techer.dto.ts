import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class CreateClassTeacherDto {

    @ApiProperty({ description: 'El Id del clase' })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ description: 'El Id del profesor' })
    @IsNumber()
    readonly teacherId: number;

    
}