import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookmarkDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsNotEmpty()
    @IsString()
    link: string;
}

export class EditBookmarkDTO {
    @IsOptional()
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsString()
    link?: string;
}