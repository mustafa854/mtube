function VideoCard() {
  return (
    <div className="video-card">
      <div className="video-card--img">
        <img
          src="https://img.youtube.com/vi/JZjAg6fK-BQ/maxresdefault.jpg"
          className="border rounded-xl	"
          alt=""
        />
      </div>
      <div className="video-card--content flex flex-row pt-4">
        <div>
          <img
            className="channel-img"
            src="https://img.youtube.com/vi/JZjAg6fK-BQ/maxresdefault.jpg"
            alt=""
          />
        </div>
        <div className="video-details pl-4">
          <h4 className="video-title font-medium leading-6 text-lg">
            Lorem ipsum dolor sit amet consec.
          </h4>
          <div className="pt-1">
            <p className="channel-name text-sm font-normal text-gray-500">
              The Weeknd
            </p>
            <div className="video-meta flex flex-row">
              <p className="view-count text-sm font-normal text-gray-500">
                492M views
              </p>

              <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                •
              </p>
              <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                3 Months Ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
