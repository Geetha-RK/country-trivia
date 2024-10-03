import "./Home.scss";
import heroImg from "../../assets/images/hero.jpeg";

function Home() {
  return (
    <>
      <div className="home">
        <img src={heroImg} alt="" className="home__hero" />
        <h1 className="home__title">World Trivia Challenge</h1>
        <button className="home__button">Begin</button>
      </div>
    </>
  );
}

export default Home;
