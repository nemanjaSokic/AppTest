import { User } from './user.model';

export interface Task{
    id: String,
    title: String,
    description: String,
    status:String,
    owner:User,
    assignee:User
}