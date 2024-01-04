import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Follow {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.follows, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({name: "followerId"})
    followerId: User

    @Column({ nullable: true })
    followedId: number

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true })
    username: string

    @Column({ nullable: true })
    profile_picture: string

    @Column({ nullable: true })
    profile_description: string

}