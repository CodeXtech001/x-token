import AuthNav from "./navbar_components/AuthNav"

function NavBar() {
    return (
      <div className="sticky top-0 z-40 px-6 pt-3 pb-1 clear-both flex border-b border-slate-800 bg-black">
          <div className="w-10 h-12 md:w-12 md:h-14 ">
          <svg viewBox="0 0 367 397" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 10)">
            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" fill="white"/>
        </g>
        </svg>
          </div>
          <AuthNav/>
      </div>
    )
  }
  
  export default NavBar