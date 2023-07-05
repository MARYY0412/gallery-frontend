import React from "react";
import styled from "styled-components";
function Subscribe() {
  return (
    <Sub>
      <p className="subscribe-p">
        Do you want to get informations about your best photto gallery? You can
        join to our <span style={{ fontWeight: "bold" }}>newsletter</span>! Just
        add your's email and you will be kept!
      </p>
      <form action="" className="subscribe-form">
        <input
          type="text"
          className="form-input-class-2"
          placeholder="enter email"
        />
        <button className="form-button-class-2"> SEND</button>
      </form>
    </Sub>
  );
}

export default Subscribe;

const Sub = styled.div`
  width: 70%;
  min-width: 500px;
  padding: 150px 10%;
  .subscribe-p {
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
  }
  .subscribe-form {
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
  }
`;
