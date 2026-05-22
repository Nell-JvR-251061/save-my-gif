import "../styling/Landing.css";

import PixelSnow from "../components/PixelSnow";
import { useAuth } from "../components/AuthManager";

const Landing = () => {
  const { user } = useAuth();

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
        {!user ? <p>Storing your GIFs securely <br/>  since 2026</p> : <p>Howdy, {user.name}! <br/> Your GIF awaits... </p>}
      </div>
    </>
  );
};

export default Landing;
