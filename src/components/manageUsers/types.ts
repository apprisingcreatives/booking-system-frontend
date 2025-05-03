import { User } from "../../models";

export interface EditUserModalInterface {
  open: boolean;
  user: User | null;
}
