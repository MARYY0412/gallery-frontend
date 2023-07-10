import React, { useState } from "react";
import styled from "styled-components";
function Contact() {
  const [words, setWords] = useState<number>();

  return (
    <ContactBox>
      <form action="" className="contact-form">
        <h3 className="form-title-class">Contact</h3>
        <p className="contact-p">*name:</p>
        <input
          type="text"
          className="contact-text"
          placeholder="enter your name"
        />
        <p className="contact-p">*email:</p>
        <input
          type="text"
          className="contact-text"
          placeholder="enter your email"
        />
        <p className="contact-p">*your message:</p>
        <textarea className="contact-text-area" />
        <button className="form-button-class-2">send message</button>
      </form>
    </ContactBox>
  );
}

export default Contact;

const ContactBox = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .contact-form {
    width: 350px;
    background-color: rgba(217, 217, 214, 0.2);
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .contact-p {
    font-size: 18px;
    padding: 20px 5px;
    font-weight: 600;
  }
  .contact-text {
    border: none;
    border-radius: 3px;
    padding: 10px 15px;
    border-bottom: 2px solid green;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }
  .contact-text-area {
    resize: none;
    border: none;
    height: 200px;
    border-radius: 5px;
    padding: 10px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 16px;

    transition: 2s all;
    :focus {
      /* border: 2px solid green; */
      outline: none;
      -webkit-box-shadow: inset 0px 0px 10px 0px green;
      -moz-box-shadow: inset 0px 0px 10px 0px green;
      box-shadow: inset 0px 0px 10px 0px green;
    }
  }

  .form-button-class-2 {
    margin: 20px 10px;
  }
`;
