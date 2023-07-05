import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types/Types";
import { Cell, Column } from "react-table";
import styled from "styled-components";
import AdminTable from "./AdminTable";

function ManageUsers() {
  const [users, setUsers] = useState<IUser[]>([]);

  const userColumns: Column<IUser>[] = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "ID",
      },
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "role",
        accessor: "role",
      },
      {
        Header: "date of birth",
        accessor: "date_of_birth",
      },
      {
        Header: "avatar",
        accessor: "avatar",
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const result = await axios("http://127.0.0.1:3001/admin/all-users");
      setUsers(result.data);
    })();
  }, []);

  const deleteUser = (userId: string) => {
    axios
      .delete(`http://127.0.0.1:3001/admin/user-delete/${userId}`)
      .then((data) => {
        console.log(data);

        setUsers(users.filter((item) => item.ID !== userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <AdminTable data={users} columns={userColumns} deleteItem={deleteUser} />
    </Box>
  );
}

export default ManageUsers;

const Box = styled.div`
  width: 100%;
`;
