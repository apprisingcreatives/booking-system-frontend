import TableRow from "./TableRow";
import { User } from "../../models";

type Props = {
  users: User[];
  onEditUserClick: (user: User) => void;
};

const TableBody = ({ users, onEditUserClick }: Props) => {
  return (
    <tbody className="text-sm text-gray-700 divide-y">
      {users?.map((user) => (
        <TableRow
          user={user}
          key={user._id}
          onEditUserClick={onEditUserClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
