import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  sort?: string;
}
