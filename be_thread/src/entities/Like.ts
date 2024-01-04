import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.likes)
    thread: Thread

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Timestamp

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Timestamp

}
