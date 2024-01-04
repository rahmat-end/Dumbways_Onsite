import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"

@Entity()
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    image: string

    @ManyToOne(() => User, (user) => user.threads)
    user: User

    @OneToMany(() => Like, (like) => like.thread)
    likes: Like[]

    @OneToMany(() => Reply, (reply) => reply.thread)
    replies: Reply[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Timestamp

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Timestamp

}
