function Header() {
  return (
    <>
      <div className="container mx-auto p-4 flex flex-row justify-between	items-center">
        <div className="flex flex-row gap-x-4">
          <div>
            <img className="header-icon" src="/src/assets/menu.svg" alt="" />
          </div>
          <div>
            <img
              className="header-icon--logo"
              src="/src/assets/logo.svg"
              alt=""
            />
          </div>
        </div>
        <div></div>
        <div className="flex flex-row gap-x-2">
          <div>
            <img
              className="header-icon"
              src="/src/assets/popupmenuHeader.svg"
              alt=""
            />
          </div>
          <div className="">
            <button
              type="button"
              className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
            >
              <img
                src="/src/assets/profile.svg"
                className="header-icon pt-1 pr-2 fill-current text-sky-600"
                alt=""
              />
              Signin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
