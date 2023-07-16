import React, { ReactHTMLElement, useEffect, useState } from "react";
import { Column, useTable, useSortBy, usePagination } from "react-table";
import styled from "styled-components";
import { IMessage } from "../../types/Types";
import { Row } from "react-table";
interface Props {
  data: IMessage[];
  columns: Column<IMessage>[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
}

const MessagesTable: React.FC<Props> = ({
  selected,
  setSelected,
  data,
  columns,
}) => {
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

  let [activeMessages, setActiveMessages] = useState<string[]>([]);

  const changeSelected = (id: string) => {
    const isSelected = selected.includes(id);
    if (isSelected) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleMessage = (
    e: React.MouseEvent<HTMLTableCellElement>,
    ID: string
  ) => {
    if (activeMessages.includes(ID))
      setActiveMessages(activeMessages.filter((item) => item !== ID));
    else setActiveMessages([...activeMessages, ID]);
  };

  return (
    <div className="App">
      <AdminTableBox>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`my-header ${column.Header}-header`}
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
              <>
                <tr {...row.getRowProps()} className="my-row">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`my-cell ${cell.column.Header}-values`}
                        onClick={(e) => handleMessage(e, row.values.ID)}
                      >
                        {cell.value === null || cell.value === ""
                          ? "none"
                          : cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td>
                    <input
                      className="my-checkbox"
                      type="checkbox"
                      value={row.values.ID}
                      // onChange={() => changeSelected(row)}
                      onChange={() => changeSelected(row.values.ID)}
                      id={row.values.ID}
                      checked={selected.includes(row.values.ID)}
                    />
                  </td>
                </tr>
                {activeMessages.includes(row.values.ID) && (
                  <tr className="tr-content">
                    <td className="td-content" colSpan={columns.length + 1}>
                      <div className="message-content">
                        <p>{row.values.content}</p>
                        <button
                          className="answer-button"
                          onClick={() => console.log("siemka")}
                        >
                          ANSWER
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
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

export default MessagesTable;

const AdminTableBox = styled.table`
  max-width: 500px;
  background-color: rgba(217, 217, 214, 0.2);
  .my-header {
    font-weight: 600;
    padding: 10px;
    margin-bottom: 20px;
  }
  .my-row {
    width: 600px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  .my-cell {
    text-align: center;
    padding: 20px;
    width: 150px;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .my-checkbox {
    margin: 0px 10px;
  }
  .message-content {
    display: block;
    text-align: left;
    padding: 10px;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 5px;
    > p {
      font-family: sans-serif;
      color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      min-height: 30px;
    }
    .answer-button {
      padding: 0px 15px;
      margin-right: 0px;
      font-size: 12px;
    }
  }

  @media (max-width: 1000px) {
    .content-values {
      display: none;
    }
    .content-header {
      display: none;
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
