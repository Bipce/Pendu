import { IsNotEmpty, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";

export class JoinDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Transform(({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value))
  username!: string;
}
