import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// Interface for Video object: 
// {id: number; name: string; url: string; updatedAt: number; createdAt: number}

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column()
    updatedAt: number

    @Column()
    createdAt: number

}
