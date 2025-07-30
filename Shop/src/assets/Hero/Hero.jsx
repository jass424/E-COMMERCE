import './Hero.css';
import Hand from '../Hand.jpg'; // waving hand image
import CapGirl from '../hero_image.png'; // model image

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <p className="tagline">NEW ARRIVALS ONLY</p>
        <h1 className="headline">
          new <img src={Hand} alt="hand" className="hand-icon" />
          <br />
          collections <br />
          for everyone
        </h1>

        <button className="latest-btn">
          Latest Collection <span>→</span>
        </button>
      </div>

      <div className="hero-right">
        <img src={CapGirl} alt="Fashion Girl" className="hero-image" />
      </div>
    </div>
  );
}

export default Hero;
