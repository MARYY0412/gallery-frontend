import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types/Types";
import { Cell, Column } from "react-table";
import styled from "styled-components";
import AdminTable from "./AdminTable";
import AdminSearchingBar from "./AdminSearchingBar";

function ManageUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchingPhrase, setSearchingPhrase] = useState<string>("")
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
  //filtering data
  const keys = ["username", "role", "email", "avatar", "date_of_birth"];
    const search = (data: IUser[]) => {
    return data.filter(
      (item: any) =>
        keys.some((key) => item[key] !== null ? item[key].toLowerCase().includes(searchingPhrase) : false)
    );
  };
  //delete user function  
  const deleteUser = (userId: string) => {

    const storageString = localStorage.getItem("token");
    if (storageString) {
      let user = JSON.parse(storageString);
    
    
    axios
      .delete(`http://127.0.0.1:3001/admin/user-delete/${userId}`, 
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      )
      .then((data) => {
        console.log(data);

        setUsers(users.filter((item) => item.ID !== userId));
      })
      .catch((err) => {
        console.log(err);
      });

    }
  };
  //fetching data from database
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if(storage){
      const { token, ID } = JSON.parse(storage);
      axios("http://127.0.0.1:3001/admin/all-users", { 
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then(result => {
        setUsers(result.data);
      }).catch(err => {
        console.log(err)
      })
    }
    
  }, []);

  return (
    <Box>
      <AdminSearchingBar searchingPhrase={searchingPhrase} setSearchingPhrase={setSearchingPhrase} />
      <AdminTable data={search(users)} columns={userColumns} deleteItem={deleteUser} />
    </Box>
  );
}

export default ManageUsers;

const Box = styled.div`
  width: 100%;
`;
