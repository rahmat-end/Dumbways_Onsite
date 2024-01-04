import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity()
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.replies)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Timestamp

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Timestamp

}
