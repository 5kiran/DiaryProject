import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateBoardDto {
  @IsString()
  @MaxLength(20)
  title: string

  @IsString()
  @MinLength(1)
  content: string

  @IsOptional()
  @IsString()
  image: string | null
}