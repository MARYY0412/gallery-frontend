import React from "react";
import { Column, useTable, useSortBy, usePagination } from "react-table";
import { IImage, IUser } from "../../types/Types";
import styled from "styled-components";

interface Props {
  data: IUser[] | IImage[];
  columns: Column<IUser>[] | Column<IImage>[];
  deleteItem: Function;
}

const AdminTable: React.FC<Props> = ({ deleteItem, data, columns }) => {
  console.log(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable<any>(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="App">
      <h1>Manage data</h1>
      <AdminTableBox>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="my-header"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="my-row">
                      {cell.value === null || cell.value === ""
                        ? "none"
                        : cell.render("Cell")}
                    </td>
                  );
                })}
                <td>
                  <button
                    onClick={() => deleteItem(row.values.ID)}
                    className="delete-button"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </AdminTableBox>
      <PaginationDiv>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Poprzednia
        </button>
        <span>
          Strona{" "}
          <strong>
            {pageIndex + 1} z {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Następna
        </button>
      </PaginationDiv>
    </div>
  );
};

export default AdminTable;

const AdminTableBox = styled.table`
  width: 100%;
  background-color: rgba(217, 217, 214, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 10px;

  .my-header {
    font-weight: 600;
    padding: 10px;
    margin-bottom: 20px;
  }
  .my-row {
    padding: 20px;
  }
  .delete-button {
    padding: 5px 15px;
    cursor: pointer;
    border-radius: 7px;
    border: none;
    transition: 1s all;
    font-size: 16px;
    :hover {
      color: rgb(255, 0, 51);
    }
  }
`;
const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  button {
    margin: 0px 20px;
    padding: 5px 20px;
  }
`;
