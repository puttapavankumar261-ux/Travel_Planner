import { useEffect, useState } from "react";
import "./BackgroundSlider.css";

import bg1 from "../../../assets/images/User/User-Dash-bg1.jpg";
import bg2 from "../../../assets/images/User/User-Dash-bg2.jpg";
import bg3 from "../../../assets/images/User/User-Dash-bg3.jpg";
import bg4 from "../../../assets/images/User/User-Dash-bg4.jpg";
import bg5 from "../../../assets/images/User/User-Dash-bg5.jpg";

const images = [bg1, bg2, bg3, bg4, bg5];

const BackgroundSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-slider">
      <img
        src={images[currentImage]}
        alt="Background"
        className="background-image"
      />

      <div className="background-overlay"></div>
    </div>
  );
};

export default BackgroundSlider;
