import React, { useEffect, useMemo, useState } from "react";
import { IImage } from "../../types/Types";
import { Column } from "react-table";
import axios from "axios";
import AdminTable from "./AdminTable";
import styled from "styled-components";
import AdminSearchingBar from "./AdminSearchingBar";
function ManageImages() {
  const [images, setImages] = useState<IImage[]>([]);
  const [searchingPhrase, setSearchingPhrase] = useState<string>("")
  const imageColumns: Column<IImage>[] = useMemo(
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
        Header: "name",
        accessor: "name",
      },
      {
        Header: "description",
        accessor: "description",
      },
      {
        Header: "date_added",
        accessor: "date_added",
      },
      {
        Header: "AVGRating",
        accessor: "AVGRating",
      },
    ],
    []
  );
  //filtering data
  const keys = ["username", "name", "description", "date_added", "AVGRating"];
  const search = (data: IImage[]) => {
  return data.filter(
    (item: any) =>
      keys.some((key) => item[key] !== null ? item[key].toLowerCase().includes(searchingPhrase) : false)
  );
};
  //delete image
  const deleteImage = (imageId: string) => {
      const storageString = localStorage.getItem("token");
      if (storageString) {
        let user = JSON.parse(storageString);
  
      axios
        .delete(`http://127.0.0.1:3001/admin/image-delete/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
        )
        .then((data) => {
          console.log(data);
  
          setImages(images.filter((item) => item.ID !== imageId));
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };
  //fetch data from the database
  useEffect(() => {
      (async () => {
        const storage = localStorage.getItem("token");
        if(storage){
          const { token, ID } = JSON.parse(storage);
          const result = await axios("http://127.0.0.1:3001/admin/all-images", { 
            headers: {
          authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data)
          setImages(result.data);
      }
        })();
    }, [])

  return (
    <Box>
      <AdminSearchingBar searchingPhrase={searchingPhrase} setSearchingPhrase={setSearchingPhrase} />
      <AdminTable
        data={search(images)}
        columns={imageColumns}
        deleteItem={deleteImage}

      />
    </Box>
  );
}

export default ManageImages;

const Box = styled.div`
  width: 100%;
`;
