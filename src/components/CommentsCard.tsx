import { useEffect, useState } from "react";

function CommentsCard({ comment }) {
  const [datePublished, setDatePublished] = useState("");
  useEffect(() => {
    const date = new Date(comment.datePublished.seconds * 1000);
    console.log(date.getMonth() + 1);
    if (
      isNaN(date.getDate()) ||
      isNaN(date.getMonth()) ||
      isNaN(date.getFullYear())
    ) {
      setDatePublished("Just Now");
    } else {
      setDatePublished(
        String(date.getDate()) +
          "/" +
          String(date.getMonth() + 1) +
          "/" +
          String(date.getFullYear())
      );
    }
  }, [comment]);
  return (
    <>
      <div className="container flex flex-row mt-5">
        <div className="flex-none">
          <img
            src={comment.userImage}
            className="rounded-full"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="pl-4 grow">
          <div className="container flex flex-row my-auto">
            <p className="text-sm text-black font-medium my-auto">
              {comment.commentUserName}
            </p>
            <p
              className="mt-auto text-xs ml-2"
              style={{
                color: "#606060",
                marginBottom: "1px",
              }}
            >
              {datePublished}
            </p>
          </div>
          <div className="container mt-1">
            <p
              className="text-black"
              style={{ fontSize: "14px", marginTop: "2px" }}
            >
              {comment.commentText}
            </p>
          </div>
          {/* <div className="contianer flex flex-row justify-start items-start gap-4 mt-3">
            <div className=" flex flex-row gap-2">
              <div className="my-auto">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                  />
                </svg>
              </div>
              <div>2</div>
            </div>
            <div className=" my-auto">
              <svg
                className="rotate-180"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"
                />
              </svg>
            </div>
            <div className="">Reply</div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
