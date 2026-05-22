import "../styling/DisplayGif.css";

import { useAuth } from "../components/AuthManager";

const DisplayGif = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        {!user ? <h1>GIF Missing</h1> : <img src={user.url} id="image-display"></img>}
      </div>
    </>
  );
};

export default DisplayGif;
