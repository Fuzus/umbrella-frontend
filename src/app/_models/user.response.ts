import { User } from "./user";

export interface UserResponse {
    success: boolean;
    message: string;
    data: User[]
}
