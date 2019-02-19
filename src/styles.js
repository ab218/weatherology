import React from 'react';
import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100%;
  text-align: center;
  overflow: hidden;
`;

export const LocationName = styled.h3`
  color: white;
  font-family: 'Palanquin', 'sans-serif';
  font-size: 2em;
  margin: 0;
`;

export const SearchBarContainer = styled.div`
  display: flex; 
  text-align: center;
  justify-content: center;
  height: 2em;
  padding: 0; 
  margin: 1em;
`;

export const SearchItem = styled.div`
  color: ${props => (props ? 'white' : 'black')};
  background-color: ${props => (props ? '#4095bf' : 'white')};
`;

const moveClouds = keyframes`
  0% {
    margin-left: 1000px;
  }
  100% {
    margin-left: -300px;
  }
`;

const rainFall = keyframes`
  0% {
      top:-10%
  }
  100% {
      top:100%
  }
`;

const rayAnim = keyframes`
  0% { 
      -webkit-transform: rotate(0deg); 
      transform: rotate(0deg);
    }    
  100% { 
    -webkit-transform: rotate(360deg); 
    transform: rotate(360deg);
  }
`;

const snowflakesFall = keyframes`
  0% {
      top:-10%
  }
  100% {
      top:100%
  }
`;

const snowflakesShake = keyframes`
  0%,100% {
      transform:translateX(0)
  } 
  50% {
      transform:translateX(80px)
  }
`;

const Cloud = styled.div`
  width: 200px;
  background: #fff;
  z-index: -1;
  position: relative; 

  &:before, &:after {
    content: '';
    background: #fff;
    width: 100px; 
    height: 80px;
    position: absolute; 
    top: -15px; 
    left: 10px;
    border-radius: 50%;
    transform: rotate(30deg);
  }

  &:after {
    width: 120px; 
    height: 120px;
    top: -55px; 
    left: auto; 
    right: 15px;
  }

  &:nth-of-type(0) {
    animation: ${moveClouds} 15s linear infinite;
  }

  &:nth-of-type(1) {
    left: 200px;
    transform: scale(0.6);
    opacity: 0.3;
    animation: ${moveClouds} 25s linear infinite;
  }

  &:nth-of-type(2) {
    left: -250px; 
    top: 200px;
    transform: scale(0.8);
    opacity: 0.5;
    animation: ${moveClouds} 20s linear infinite;
  }

  &:nth-of-type(3) {
    left: 470px; 
    top: 250px;
    transform: scale(0.75);
    opacity: 0.4;
    animation: ${moveClouds} 18s linear infinite;
  }

  &:nth-of-type(4) {
    left: -150px; 
    top: 150px;
    transform: scale(0.8);
    opacity: 0.5;
    animation: ${moveClouds} 20s linear infinite;
  }

  &:nth-of-type(5) {
    left: 150px; 
    top: 10vh;
    transform: scale(1.5);
    opacity: 0.5;
    animation: ${moveClouds} 30s linear infinite;
  }

  &:nth-of-type(6) {
    left: -50px;
    top: 15vh;
    transform: scale(2.5);
    opacity: 0.4;
    animation: ${moveClouds} 25s linear infinite;
  }

  &:nth-of-type(7) {
    left: -100px; 
    top: 5vh;
    transform: scale(3);
    opacity: 0.3;
    animation: ${moveClouds} 20s linear infinite;
  }

  &:nth-of-type(8) {
    left: -100px; 
    top: 8vh;
    transform: scale(2);
    opacity: 0.2;
    animation: ${moveClouds} 10s linear infinite;
  }

  &:nth-of-type(9) {
    left: 100px; 
    top: 12vh;
    transform: scale(1);
    opacity: 0.5;
    animation: ${moveClouds} 30s linear infinite;
  }
`;

const Raindrop = styled.div`
  position:fixed;
  width:2px;
  height:30px;
  border-radius:50%;
  background:white;
  opacity:0.8;
  top:-10%;
  z-index:-1;
  user-select:none;
  cursor:default;
  animation:${rainFall} 1s linear infinite;

  &:nth-of-type(0) {
    left:1%;
    animation-delay:0s;
  }

  &:nth-of-type(1) {
    left:10%;
    animation-delay:1s;
  }

  &:nth-of-type(2) {
    left:20%;
    animation-delay:.6s;
  }

  &:nth-of-type(3) {
    left:30%;
    animation-delay:.4s;
  }

  &:nth-of-type(4) {
    left:40%;
    animation-delay:.2s;
  }

  &:nth-of-type(5) {
    left:50%;
    animation-delay:.8s;
  }

  &:nth-of-type(6) {
    left:60%;
    animation-delay:.6s;
  }

  &:nth-of-type(7) {
    left:70%;
    animation-delay:1.5s;
  }

  &:nth-of-type(8) {
    left:80%;
    animation-delay:1.2s;
  }

  &:nth-of-type(9) {
    left:90%;
    animation-delay:1.3s;
  }

  &:nth-of-type(10) {
    left:25%;
    animation-delay:2s;
  }

  &:nth-of-type(11) {
    left:65%;
    animation-delay:1.4s;
  }
`;

const Ray = styled.div`
  height:500px;
  width:50px;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%); 
  border-radius:80% 80% 0 0;
  position: absolute;
  opacity:0.8;
  z-index: -1;

  &:nth-of-type(1) {
    transform: rotate(45deg);
    top: 200px;
    left: -300px;
  }

  &:nth-of-type(2) {
    transform: rotate(90deg);
    top: -100px;
    left: -400px;
  }

  &:nth-of-type(3) {
    transform: rotate(135deg);
    top:-375px;
    left: -300px;
  }

  &:nth-of-type(4) {
    transform: rotate(180deg);
    top:-500px;
    left: 0;
  }

  &:nth-of-type(5) {
    transform: rotate(-45deg);
    top:200px;
    left: 300px;
  }

  &:nth-of-type(6) {
    transform: rotate(-90deg);
    top:-100px;
    left: 400px;
  }

  &:nth-of-type(7) {
    transform: rotate(-135deg);
    top: -400px;
    left: 300px;
  }

  &:nth-of-type(8) {    
      transform: rotate(0deg);
      top: 300px;
      left: 0px;
  }
`;

const RayBox = styled.div`
  position: absolute;
  margin: auto;
  top:0px;
  left:0;
  right:0;
  bottom:0;
  width:70px;  
  animation: rayAnim 45s linear infinite;
  z-index: -1;
`;

const Snowflake = styled.div`
  position:fixed;
  width:15px;
  height:15px;
  border-radius:50%;
  background:white;
  opacity:0.8;
  top:-10%;
  z-index:-1;
  user-select:none;
  cursor:default;
  animation: ${snowflakesFall} 3s linear infinite, ${snowflakesShake} 2s ease-in-out infinite;

  &:nth-of-type(0) {
    left:1%;
    animation-delay:0s,0s
  }

  &:nth-of-type(1) {
    left:10%;
    animation-delay:1s,1s
  }

  &:nth-of-type(2) {
    left:20%;
    animation-delay:6s,.5s
  }

  &:nth-of-type(3) {
    left:30%;
    animation-delay:4s,2s
  }

  &:nth-of-type(4) {
    left:40%;
    animation-delay:2s,2s
  }

  &:nth-of-type(5) {
    left:50%;
    animation-delay:8s,3s
  }

  &:nth-of-type(6) {
    left:60%;
    animation-delay:6s,2s
  }

  &:nth-of-type(7) {
    left:70%;
    animation-delay:2.5s,1s
  }

  &:nth-of-type(8) {
    left:80%;
    animation-delay:1s,0s
  }

  &:nth-of-type(9) {
    left:90%;
    animation-delay:3s,1.5s
  }

  &:nth-of-type(10) {
    left:25%;
    animation-delay:2s,0s
  }

  &:nth-of-type(11) {
    left:65%;
    animation-delay:4s,2.5s
  }
`;

const Sun = styled.div`
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: 15vh auto;  
  height: 300px;
  width: 300px;
  border-radius:50%;
  background:rgb(234, 238, 18);
  opacity:0.9;
  box-shadow: 0px 0px 40px 15px rgb(234, 238, 18);  
  z-index: -1;
  animation: ${rayAnim} 20s linear infinite;
`;

export const Title = styled.h1`
  font-size: 8vw;
  margin: 20vh 0;
  color: white;
  font-family: 'Palanquin Dark', cursive;
`;

export const renderSunny = () => (
  <Sun>
    <RayBox>
      <Ray />
      <Ray />
      <Ray />
      <Ray />
      <Ray />
      <Ray />
      <Ray />
      <Ray />
    </RayBox>
  </Sun>
);

export const renderPartlyCloudy = () => (
  <div>
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
  </div>
);

export const renderCloudy = () => (
  <div>
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
    <Cloud />
  </div>
);

export const renderSnowy = () => (
  <div>
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
    <Snowflake />
  </div>
);

export const renderRainy = () => (
  <div>
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
    <Raindrop />
  </div>
);

export const cardStyles = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: '1.5em 0',
  },
  weekContainer: {
    display: 'inline-block',
    padding: '1em',
    width: '8em',
  },
  card: {
    maxWidth: 345,
  },
  weekCard: {
    width: '8em',
    height: '19em',
  },
  dateTime: {
    padding: '0 1em',
  },
  icon: {
    height: '7em',
    width: 'auto',
  },
  currentlyIcon: {
    height: '10em',
    width: 'auto',
  },
  media: {
    height: 140,
  },
  currentlyFont: {
    fontSize: 28,
    marginBottom: '0',
    color: 'black',
  },
  temps: {
    display: 'flex',
    justifyContent: 'center',
  },
  highTemp: {
    fontSize: 20,
    paddingRight: '1em',
    color: '#878787',
  },
  lowTemp: {
    fontSize: 20,
    color: '#bababa',
  },
  summary: {
    margin: '0 1em',
  },
  summaryh4: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '0.75em',
    margin: '0',
  },
  currentSummaryh2: {
    margin: '0',
    padding: '0',
  },
  currentSummary: {
    margin: '0',
    padding: '0 0 2em 0',
  },
};

export const searchBarStyles = {
  submitButton: {
    backgroundColor: 'white',
    borderRadius: '0',
    border: '1px solid lightgrey',
  },
  currentLocationButton: {
    backgroundColor: 'white',
    borderRadius: '0',
    border: '1px solid lightgrey',
    borderRight: 'none',
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
  },
  wrapperStyles: {
    position: 'relative',
    display: 'inline-block',
    width: '50%',
    height: '100%',
    zIndex: '2',
  },
  inputProps: {
    opacity: '0.8',
    width: '95%',
    height: '100%',
    fontSize: '1.5em',
    margin: '0',
    padding: '0 0 0 5%',
    border: 'none',
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
  },
};
