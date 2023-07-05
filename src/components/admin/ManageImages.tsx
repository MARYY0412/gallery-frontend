import React, { useEffect, useMemo, useState } from "react";
import { IImage } from "../../types/Types";
import { Column } from "react-table";
import axios from "axios";
import AdminTable from "./AdminTable";
import styled from "styled-components";
function ManageImages() {
  const [images, setImages] = useState<IImage[]>([]);

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

  useEffect(() => {
    (async () => {
      const result = await axios("http://127.0.0.1:3001/admin/all-images");
      console.log(result.data);
      setImages(result.data);
    })();
  }, []);

  const deleteImage = (imageId: string) => {
    axios
      .delete(`http://127.0.0.1:3001/admin/image-delete/${imageId}`)
      .then((data) => {
        console.log(data);

        setImages(images.filter((item) => item.ID !== imageId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <AdminTable
        data={images}
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
