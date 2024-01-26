function Banner({ closeBanner }) {
  return (
    <div className="lg:container mx-auto p-4 relative">
      <div
        className="close-banner absolute top-9 right-9 cursor-pointer"
        onClick={closeBanner}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2 30L30 2m0 28L2 2"
          />
        </svg>
      </div>
      <img
        src="/assets/banner.jpg"
        alt=""
        className="w-full max-h-80 object-cover"
      />
    </div>
  );
}

export default Banner;
