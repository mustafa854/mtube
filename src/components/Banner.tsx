function Banner() {
  return (
    <div className="container mx-auto p-4 relative">
      <div className="close-banner absolute top-6 right-6">
        <img src="/src/assets/close.svg" className="header-icon" alt="" />
      </div>
      <img
        src="https://assets.visme.co/templates/banners/thumbnails/i_Memories-Facebook-Page_full.jpg"
        alt=""
        className="w-full max-h-80 object-cover"
      />
    </div>
  );
}

export default Banner;
