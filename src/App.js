import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  //initialize formart of 2 number
  const formatNumber = (number) => number.toString().padStart(2, '0');

  const [currentTime, setCurrentTime] = useState({
    minutes: 25,
    seconds: 0
  });
  const [breakTime, setBreakTime] = useState({
    minutes: 5,
    seconds: 0
  });
  const [trigger, setTrigger] = useState(false);
  const [lengthActivation, setLengthActivation] =useState(false);
  let intervalId = null;

  const playAudio = () => {
    const audio = document.querySelector("#beep");

    if (audio) {
      audio.currentTime = 0; // Reset audio to the beginning before playing

      // Check if the audio element has a play method
      if (typeof audio.play === 'function') {
        audio.play().then(() => {}).catch(error => console.error(error));
      } else {
        console.error("Audio play method not available");
      }
    } else {
      console.error("Audio element not found");
    }
  };

  const pauseAudio = () => {
    const audio = document.getElementById("beep");
    if (audio) {
      audio.pause();
    }
  };

  const handleReset = () => {
    setCurrentTime({
      minutes: 25,
      seconds: 0
    });
    setBreakTime({
      minutes: 5,
      seconds: 0
    });
    setTrigger(!trigger);
    playAudio();
  };

  useEffect(() => {
    if (trigger) {

      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          let updatedMinutes = prevTime.minutes*1;
          let updatedSeconds = Math.max(prevTime.seconds - 1, 0);

          if (updatedSeconds === 0 && updatedMinutes > 0) {
            updatedSeconds = 59;
            updatedMinutes = updatedMinutes - 1;
          }
          console.log(updatedMinutes, updatedSeconds);

          if (updatedMinutes === 0 && updatedSeconds === 0) {
            playAudio();

              let breakMinutes = breakTime.minutes * 1;
              let breakSeconds = Math.max(breakTime.seconds - 1, 0) * 1;
              console.log(breakMinutes, breakSeconds);

              if (breakSeconds === 0 && breakMinutes > 0) {
                breakSeconds = 59;
                breakMinutes -= 1;

              } else if (breakSeconds === 0 && breakMinutes === 0) {
                playAudio();
               handleReset();
              } else if (breakSeconds === 59) {
                breakSeconds--; // Corrected the decrement operator
                handleReset();
              }




              // Correct assignment

              let newestMinutes = breakMinutes;
              let newestSeconds = breakSeconds;


              return { minutes:  updatedMinutes= newestMinutes, seconds:  updatedSeconds= newestSeconds}

          }
          setLengthActivation(!lengthActivation)
          return {
            minutes: formatNumber(updatedMinutes),
            seconds: formatNumber(updatedSeconds),
          };

        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    // Clean-up function to clear the interval when the component is unmounted or trigger is changed
    return () => {
      clearInterval(intervalId);
    };
  }, [trigger,setCurrentTime, setBreakTime]);


  const handleStartStop = () => {
    setTrigger(!trigger);
  };

  return (
    <Container align="center" style={{ backgroundColor: 'rgba(96, 36, 67, 0.2)' }} className='text-dark p-3 my-5'>
      <Row align="center" sm={1} md={1} className='p-5 border border-light'>
        <Row className='mx-auto'>
          <p>Title: 25+5 Clock</p>
        </Row>
        <Row className='mx-auto'>
          <Col>
            <p id="break-label" >Break Length</p>
            <Col>
              <Button id="break-decrement" onClick={() => setBreakTime({...breakTime, minutes: Math.max(Math.min(breakTime.minutes-1, 59), 1) })}>-</Button>
              <span id="break-length">{breakTime.minutes===("0"+breakTime.minutes)?breakTime.minutes:breakTime.minutes==="00"?1:breakTime.minutes}</span>
              <Button id="break-increment" onClick={() => setBreakTime({ ...breakTime, minutes: Math.max(Math.min(breakTime.minutes+1, 59), 1) })}>+</Button>
            </Col>
          </Col>
          <Col>
            <p id="session-label">Session Length</p>
            <Col>
              <Button id="session-decrement" onClick={() =>!trigger? (setCurrentTime({ ...currentTime, minutes: Math.max(Math.min(currentTime.minutes-1, 59), 1) })):(setCurrentTime({ ...currentTime, minutes: Math.max(Math.min(currentTime.minutes-0, 59), 1) }))}>-</Button>
              <span id="session-length">{currentTime.minutes===("0"+currentTime.minutes)?currentTime.minutes:currentTime.minutes==="00"?1:currentTime.minutes}</span>
              <Button id="session-increment" onClick={() =>!trigger? (setCurrentTime({ ...currentTime, minutes: Math.max(Math.min(currentTime.minutes+1, 59), 1) })):(setCurrentTime({ ...currentTime, minutes: Math.max(Math.min(currentTime.minutes, 59), 1)}))}>+</Button>
            </Col>
          </Col>
        </Row>
        <Row className='mx-auto' id="timer-label">
          <p id="timer-label">Session</p>

          <p id="time-left">{`${formatNumber(currentTime.minutes)}:${(formatNumber(currentTime.seconds))}`}</p>
        </Row>
        <Row sm={1} md={3} className='mx-auto'>
          <Col id="start_stop">
            <Button onClick={handleStartStop}>Start</Button>
          </Col>
          <Col id="start_stop">
            <Button onClick={handleStartStop}>Stop</Button>
          </Col>
          <Col>
            <Button id="reset" onClick={handleReset}>Reset</Button>
          </Col>
        </Row>
        <Row className='mx-auto'>
          <p>Design By Hau</p>
          {/* Attach Audio */}
          <audio id="beep">
            <source  src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" type="audio/mpeg" />
          </audio>
        </Row>
      </Row>
    </Container>
  );
}
