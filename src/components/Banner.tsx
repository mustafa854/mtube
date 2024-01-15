function Banner() {
  return (
    <div className="container mx-auto p-4 relative">
      <div className="close-banner absolute top-6 right-6">
        {/* <img src="/src/assets/close.svg" className="header-icon" alt="" /> */}
      </div>
      <img
        src="/src/assets/banner.jpg"
        alt=""
        className="w-full max-h-80 object-cover"
      />
    </div>
  );
}

export default Banner;
