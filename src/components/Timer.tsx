import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
interface Props {
  label: string;
  placeToRedirect: string;
}
function Timer({ label, placeToRedirect }: Props) {
  const [timer, setTimer] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    function countdown(seconds: number) {
      if (seconds < 0) {
        navigate(`/${placeToRedirect}`);
        window.location.reload();
        return;
      }

      setTimeout(function () {
        setTimer(seconds);
        countdown(seconds - 1);
      }, 1000);
    }

    countdown(timer);
  }, []);

  return (
    <TimerBox>
      <span>{label}, you will be riderected in:</span>
      <p>{timer}</p>
    </TimerBox>
  );
}

export default Timer;

const TimerBox = styled.div`
  text-align: center;
  color: green;
  font-size: 18px;
`;
