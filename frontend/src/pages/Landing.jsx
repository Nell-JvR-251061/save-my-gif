import "../styling/Landing.css";

import PixelSnow from "../components/PixelSnow";

const Landing = () => {
  return (
    <>
      <div id="snow-container">
        <PixelSnow
          color="#a0b2a6"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={250}
          speed={2}
          density={0.5}
          direction={90}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>

      <div id="catch-phrase" className="ubuntu-bold">
        <p>STORE YOUR GIFS SAFELY AND SECURELY</p>
      </div>
    </>
  );
};

export default Landing;
