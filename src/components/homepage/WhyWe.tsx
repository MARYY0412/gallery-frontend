import React from "react";
import styled from "styled-components";
import {
  FcApprove,
  FcLike,
  FcMoneyTransfer,
  FcAcceptDatabase,
} from "react-icons/fc";

export default function WhyWe() {
  return (
    <Con>
      <ul className="content-ul">
        <li className="item-li">
          <div className="icon-class">
            <FcMoneyTransfer />
          </div>
          <p>We are free</p>
        </li>
        <li className="item-li">
          <div className="icon-class">
            <FcLike />
          </div>
          <p>A lot of satisfied users</p>
        </li>
        <li className="item-li">
          <div className="icon-class">
            <FcApprove />
          </div>
          <p>top level of security</p>
        </li>
        <li className="item-li">
          <div className="icon-class">
            <FcAcceptDatabase />
          </div>
          <p>big database to store your own images</p>
        </li>
      </ul>
    </Con>
  );
}

const Con = styled.div`
  width: 100%;
  .content-ul {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }

  .item-li {
    width: 25%;
    height: 25%;
    font-size: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .icon-class {
    width: 100px;
    font-size: 120px;
  }

  @media (max-width: 600px) {
    > h3 {
      padding: 30px 10px;
      border-bottom: 1px solid white;
    }
    .content-ul {
      flex-direction: column;
      align-items: center;
    }

    .item-li {
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    > h3 {
      padding: 30px 10px;
      border-bottom: 1px solid white;
    }

    .item-li {
      margin: 20px 0px;
      width: 50%;
    }
  }
`;
