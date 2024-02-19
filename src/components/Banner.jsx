// function Banner({ closeBanner }) {
//   return (
//     <div className="lg:container mx-auto p-4 relative">
//       <div
//         className="close-banner absolute top-9 right-9 cursor-pointer"
//         onClick={closeBanner}
//       >
//         <svg
//           width="25"
//           height="25"
//           viewBox="0 0 32 32"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="none"
//             stroke="#fff"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M2 30L30 2m0 28L2 2"
//           />
//         </svg>
//       </div>
//       <img
//         src="/assets/banner.jpg"
//         alt=""
//         className="w-full max-h-80 object-cover"
//       />
//     </div>
//   );
// }

// export default Banner;

// The Banner component looks good! It's a simple component for displaying a banner image with a close button. Here are a few minor suggestions:

// Accessibility: Ensure that the close button is accessible to keyboard users by adding a tabIndex attribute and an aria-label for screen reader users.

// Styling: Consider adding some additional styles to make the close button more visually appealing, such as a hover effect or transition.

function Banner({ closeBanner }) {
  return (
    <div className="lg:container mx-auto p-4 relative">
      <div
        className="close-banner absolute top-9 right-9 cursor-pointer"
        onClick={closeBanner}
        tabIndex={0}
        aria-label="Close banner"
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
