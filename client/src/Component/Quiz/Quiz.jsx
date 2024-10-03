import "./Quiz.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
// import { ToastContainer, toast } from 'react-toastify';
// import flag from "../../assets/images/hero.jpeg";

function Quiz() {
  const [flag, setFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctOption,setCorrectOption] =useState(null);
  const [countryDetails,setCountryDetails] = useState([]);
  // const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const [timer, setTimer] = useState(10); // Example timer
  const [message, setMessage] = useState("");

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const fetchRandomFlags = async () => {
    try {
        const response = await axios.get("http://localhost:8080/country/random-flags");
        console.log(response.data);
        const countrydata = response.data;
        setFlag(countrydata[0].flag);
        setCorrectOption (countrydata[0].country);
        setCountryDetails(countrydata[0]);
        console.log("Console country details:",countrydata[0]);
      // Shuffle the options before setting them
      const shuffledOptions = shuffleArray([...countrydata.map((country) => country.country)]);
      setOptions(shuffledOptions);
        // setOptions(countrydata.map((country) => country.country));
        setMessage(""); // Clear any previous messages
        setTimer(10); // Reset timer to 10 seconds
    } catch (error) {
      console.error("Error fetching flags:", error);
      setMessage("Failed to load flags");
      // toast.error("Failed to load flags");
    }
  };
  
  useEffect(() => {
    fetchRandomFlags();
  },[]);

   // Fetch flags on component mount
  //  useEffect(() => {
  //   fetchRandomFlags();
  // }, []);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setMessage("Time's up!");
      // alert("Timesup");
      // toast.error("Time's up!"); 
    }
  }, [timer]);

  const handleClick = (selectedOption) => {
    if (correctOption === selectedOption ){
      setMessage("Correct! 🎉");
      // setIsConfettiVisible(true);
      setCountryDetails((prev) => ({
        ...prev,
        isCorrect: true, // Add a flag to check if the answer was correct
      }));
      // toast.success("Correct! 🎉"); 
    }else {
      setMessage("Wrong answer. Try again!");
      // toast.error("Wrong answer. Try again!");
    }

  }

  const handleNext = () => {
    fetchRandomFlags();
    setCountryDetails({}); 
    // setIsConfettiVisible(false);
  };

  // Use window.innerWidth and window.innerHeight for confetti size
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   // Update window size when the window is resized
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //   };
    
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <section className="quiz">
      <h1 className="quiz__title">Guess the country</h1> {/* Heading for the game */}
        {/* <button className="quiz__next">Next</button> */}
        <div className="quiz__timer">{timer} seconds left</div>
        <div className="quiz__flagContainer">
          {flag && <img src={flag} alt="Country Flag" className="quiz__flag" />}
        </div>

        {/* <div className="quiz__buttonContainer">
          <button className="quiz__button">{options}</button>
          <button className="quiz__button">options</button>
          <button className="quiz__button">options</button>
          <button className="quiz__button">options</button>
        </div> */}

        <div className="quiz__buttonContainer">
          {options.map((option, index) => (
            <button key={index} className="quiz__button" onClick={() => handleClick(option)}>
              {option}
            </button>
          ))}
        </div>
        {/* {message && <p className="quiz__message">{message}</p>} */}
        {message && <p className={`quiz__message ${message.includes("Correct") ? "quiz__message--correct" : "quiz__message--wrong"}`}>{message}</p>}

        <button className="quiz__nextButton" onClick={handleNext}>
          
        Next
      </button>
      {countryDetails.isCorrect && (
          <div className="quiz__countryDetails">
            <h2>Country Details</h2>
            <p><strong>Country:</strong> {countryDetails.country}</p>

            <p><strong>Language:</strong> {countryDetails.language}</p>
            <p><strong>Currency:</strong> {countryDetails.currency}</p>
            <p><strong>Population:</strong> {countryDetails.population}</p>
          </div>
         )}
      </section>
      {/* <ToastContainer /> Add ToastContainer to render notifications */}
    </>
  );
}

export default Quiz;
