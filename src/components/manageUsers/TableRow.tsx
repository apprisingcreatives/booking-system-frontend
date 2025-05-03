import { User } from "../../models";
import { Button } from "../common";

type Props = {
  user: User;
  onEditUserClick: (user: User) => void;
};

const TableRow = ({ user, onEditUserClick }: Props) => {
  const { _id: id, name, email, role } = user || {};

  return (
    <tr key={id}>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4 capitalize">{role}</td>
      <td className="px-6 py-4 text-right gap-x-2 gap-y-2 flex flex-wrap justify-end">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEditUserClick(user)}
        >
          Edit Role
        </Button>
        <Button size="sm" variant="primary">
          View
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
