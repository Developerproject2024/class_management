import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class CreateClassStudentDto {

    @ApiProperty({ description: 'El Id del estudiante' })
    @IsNumber()
    readonly studentId: number;

    
}