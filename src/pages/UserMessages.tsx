import React, { useEffect, useState } from "react";
import styled from "styled-components";
//types
import { IMessage } from "../types/Types";
import { Column } from "react-table";
import MessagesTable from "../components/messages/MessagesTable";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  BsEnvelopeDash,
  BsEnvelopePlus,
  BsEnvelopeExclamation,
} from "react-icons/bs";
// import { BiMessageDetail } from "react-icons/bi";
import {
  deleteMessages,
  fetchReceivedMessages,
  fetchSentMessages,
} from "../utils/BackendMethods";
import NewMessage from "../components/messages/NewMessage";
export default function UserMessages() {
  const userId = useSelector((state: RootState) => state.user.ID);
  const [received, setReceived] = useState<IMessage[]>([]);
  const [sent, setSent] = useState<IMessage[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [activeComponent, setActiveComponent] = useState<
    "sent" | "received" | "new-message"
  >("received");

  const messageColumns2: Column<IMessage>[] = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "ID",
      },
      {
        Header: "theme",
        accessor: "theme",
      },
      {
        Header: "sender",
        accessor: "sender",
      },
      {
        Header: "recipent",
        accessor: "recipent",
      },
      {
        Header: "content",
        accessor: "content",
      },
      {
        Header: "date",
        accessor: "date",
      },
    ],
    []
  );
  const deleteHandler = () => {
    deleteMessages(selected)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchReceivedMessages()
      .then((data) => {
        setReceived(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchSentMessages()
      .then((data) => {
        setSent(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setSelected([]);
  };

  useEffect(() => {
    fetchReceivedMessages()
      .then((data) => {
        setReceived(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchSentMessages()
      .then((data) => {
        setSent(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setSelected([]);
  }, [activeComponent]);
  return (
    <MessagesBox>
      <div className="render-nav">
        <div
          className={
            activeComponent === "received"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("received")}
        >
          <p>Received messages</p>
          <BsEnvelopeExclamation className="render-nav-link-icon" />
        </div>
        <div
          className={
            activeComponent === "sent"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("sent")}
        >
          <p>Sent messages</p>
          <BsEnvelopeDash className="render-nav-link-icon" />
        </div>
        <div
          className={
            activeComponent === "new-message"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("new-message")}
        >
          <p>new message</p>
          <BsEnvelopePlus className="render-nav-link-icon" />
        </div>
      </div>
      {activeComponent === "received" && (
        <>
          <MessagesTable
            data={received}
            columns={messageColumns2}
            setSelected={setSelected}
            selected={selected}
          />

          <button onClick={deleteHandler} className="form-delete-button">
            delete selected
          </button>
        </>
      )}
      {activeComponent === "sent" && (
        <>
          <MessagesTable
            data={sent}
            columns={messageColumns2}
            setSelected={setSelected}
            selected={selected}
          />

          <button onClick={deleteHandler} className="form-delete-button">
            delete selected
          </button>
        </>
      )}
      {activeComponent === "new-message" && <NewMessage setSent={setSent} />}
    </MessagesBox>
  );
}

const MessagesBox = styled.div`
  min-width: 300px;
  padding: 0px 60px;
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
