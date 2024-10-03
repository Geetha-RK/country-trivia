import "./Quiz.scss";
import flag from "../../assets/images/hero.jpeg";

function Quiz() {
  return (
    <>
      <section className="quiz">
        <div className="quiz__timer">timer</div>
        <div className="quiz__flagContainer">
          <img src={flag} alt="" className="quiz__flag" />
        </div>

        <div className="quiz__buttonContainer">
          <button className="quiz__button">options</button>
          <button className="quiz__button">options</button>
          <button className="quiz__button">options</button>
          <button className="quiz__button">options</button>
        </div>
      </section>
    </>
  );
}

export default Quiz;
