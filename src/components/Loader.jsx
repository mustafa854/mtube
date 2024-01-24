import "./../styles/loader.css";

function Loader({ height }) {
  return (
    <div
      className="container flex flex-row"
      style={{ width: "100vw", height: height }}
    >
      <div class="loader mx-auto my-auto"></div>;
    </div>
  );
}

export default Loader;
