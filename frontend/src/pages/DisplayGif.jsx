import "../styling/DisplayGif.css";

const DisplayGif = (_url) => {

  let image = _url._url;

  return (
    <>
      <div>
        <img src={image} id="image-display"></img>
      </div>
    </>
  );
};

export default DisplayGif;
