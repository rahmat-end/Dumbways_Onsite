import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"
import { Follow } from "./Follow"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    fullname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    profile_picture: string

    @Column()
    profile_description: string

    @OneToMany(() => Thread, (thread) => thread.user)
    threads: Thread[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]

    @OneToMany(() => Reply, (reply) => reply.user)
    replies: Reply[]

    @OneToMany(() => Follow, (follow) => follow.followerId)
    follows: Follow[]

    // @OneToMany(() => Follow, (followed) => {
    //     followed.followedId
    // })
    // followed: Follow

    // @ManyToMany(() => User, {
    //     cascade: true
    // })
    // @JoinTable({
    //     name: "follow",
    //     joinColumn: {
    //         name: "followerId",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "followedId",
    //         referencedColumnName: "id"
    //     }
    // })
    // users: User[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Timestamp

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Timestamp

}
