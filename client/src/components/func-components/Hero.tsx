import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectUserValues,
  userLogOutAction,
} from "@/state/reducers/userReducer";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignUp from "./Signup";
import { useState } from "react";
import SignUpFromLogin from "./SignUpFromLogin";
import Login from "./Login";
import Logo from "../../assets/logo/newLogo.png";

const Hero = () => {
  const dispatch = useAppDispatch();
  const userValues = useAppSelector(selectUserValues);
  const { user } = userValues;
  const [signUpFromLogin, setAuthSignUpFromLogin] = useState<boolean>(false);

  const handleSignUpFromLogin = () => {
    setAuthSignUpFromLogin(!signUpFromLogin);
  };

  const logOutHandler = () => {
    dispatch(userLogOutAction({}));
  };

  return (
    <div
      className={`flex flex-col items-center px-5 md:px-0 bg-slate-600 h-screen bg-[url('@/assets/hero.jpeg')] bg-cover bg-center font-instrument font-semibold`}
    >
      <div className="flex flex-row max-md::flex-col max-md:justify-between justify-between items-center bg-gradient-to-t from-transparent to-[#F6FDFF] w-full pt-10 h-40 px-10 mb-[50px]">
        <NavLink to="/" className="xs:w-20 sm:w-30 lg:w-40">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div
          className="hidden md:flex flex-row gap-10 w-80 text-slate-600 justify-center items-center font-normal
         text-lg"
        >
          <a
            className={`hover:cursor-pointer hover:scale-105 hover:text-black`}
            href={`#about`}
          >
            how it works
          </a>
          <a
            className={`hover:cursor-pointer hover:scale-105 hover:text-black`}
            href={`#team`}
          >
            Team
          </a>
          <a
            className={`hover:cursor-pointer hover:scale-105 hover:text-black`}
            href={`#about`}
          >
            The Mission
          </a>
        </div>
        <div className="xs:hidden md:block">
          {user ? (
            <div className="flex gap-2">
              <NavLink to="/dashboard">
                <Button
                  variant="default"
                  className="bg-[#56C1FA] text-slate-700 w-[100px] border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50"
                >
                  Talk Now
                </Button>
              </NavLink>
              <Button
                variant="default"
                onClick={logOutHandler}
                className="bg-[#56C1FA] text-slate-700 w-[100px] border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <SignUpFromLogin
                onSignUp={signUpFromLogin}
                onHandleSignUp={handleSignUpFromLogin}
              >
                Sign up
              </SignUpFromLogin>
              <div className="min-[320px]:flex min-[320px]:justify-center min-[320px]:items-center min-[320px]:gap-3 md:flex md:flex-row justify-center items-center md:gap-3 lg:gap-5 pr-0 sm:pr-2 md:pr-3 lg:pr-5">
                <SignUp styles="lg:w-[120px] lg:min-w-[100px] md:[70px] text-[#008080 bg-[#56C1FA] text-slate-700 border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50">
                  Try For Free
                </SignUp>
                <Login
                  styles="bg-[#56C1FA] text-black border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50"
                  onHandleSignUp={handleSignUpFromLogin}
                >
                  Login
                </Login>
              </div>
            </>
          )}
        </div>
        <div className="xs:block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <GiHamburgerMenu size={23} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 flex flex-col gap-y-2 p-3">
              <a href="#">Home</a>
              <a href="#team">Team</a>
              <a href="#about">The Mission / pricing</a>
              {user ? (
                <>
                  <NavLink to="/dashboard">Talk Now</NavLink>
                  <div onClick={logOutHandler}>Log Out</div>
                </>
              ) : (
                <>
                  <SignUpFromLogin
                    onSignUp={signUpFromLogin}
                    onHandleSignUp={handleSignUpFromLogin}
                  >
                    Sign up
                  </SignUpFromLogin>

                  <SignUp noStyle={true}>Try For Free</SignUp>

                  <Login noStyle={true} onHandleSignUp={handleSignUpFromLogin}>
                    Login
                  </Login>
                </>
              )}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* mid section */}
      <div className="flex flex-row max-md::flex-col max-md:justify-start w-full items-center justify-center h-[75%] px-2">
        <div className="flex flex-col gap-10 items-center mb-30">
          <div className="lg:scale-125 border-2 border-[#F6FDFF] p-2 rounded-xl bg-gradient-to-tl from-transparent to-[#F6FDFF]">
            <span className="italic font-thin">
              Private. NO paywalls, free forever, Loved by 50k+ hoomans
            </span>
          </div>
          <div className="lg:scale-[2] xs:scale-100 xsm:scale-150 flex flex-col items-center gap-1 [text-shadow:1px_1px_1px_gray] font-medium">
            <div>
              <span className="italic">{`Everyone `}</span>
              <span>deserves a better mental health.</span>
            </div>
            <div>
              <span>And so do</span>
              <span className="italic">{` you! `}</span>
              <span className="scale-75 border-2 border-white rounded-md bg-[#F6FDFF] ">
                🫶
              </span>
            </div>
          </div>
          <div className="items-center h-auto w-auto scale-150 mt-5">
            {user ? (
              <NavLink to={`/dashboard`}>
                <Button
                  variant="default"
                  className="bg-[#56C1FA] text-[12px] xsm:text-[16px] text-slate-700 w-[80px] xsm:w-[100px] border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50"
                >
                  Talk Now
                </Button>
              </NavLink>
            ) : (
              <SignUp styles="bg-[#56C1FA] text-slate-700 w-[100px] border-[1px] border-slate-400 border-t-whiter rounded-full hover:scale-105 hover:bg-[#3ea5dd] hover:text-black hover:border-black duration-200 shadow-lg shadow-black/10 hover:shadow-black/50">
                Try for Free
              </SignUp>
            )}
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className="flex flex-row max-md::flex-col max-md:justify-start justify-between bg-gradient-to-t from-[#F6FDFF] to-transparent w-full items-center h-150 px-2"></div>
    </div>
  );
};

export default Hero;
