import "./Home.scss";
import heroImg from "../../assets/images/hero.jpeg";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Create navigate function

  const handleClick = () => {
    navigate("/quiz"); // Navigate to /quiz when button is clicked
  };

  return (
    <div className="home">
      <img src={heroImg} alt="" className="home__hero" />
      <h1 className="home__title">World Trivia Challenge</h1>
      <button className="home__button" onClick={handleClick}>
        Begin
      </button>{" "}
      {/* Attach onClick */}
    </div>
  );
}

export default Home;
