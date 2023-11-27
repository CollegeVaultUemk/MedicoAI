import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import SignUp from "./Signup";
import SignUpFromLogin from "./SignUpFromLogin";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  selectUserValues,
  userLogOutAction,
} from "@/state/reducers/userReducer";
import Logo from "@/assets/logo/updatedLogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router";

export default function Navbar() {
  const userValues = useAppSelector(selectUserValues);
  const { user } = userValues;
  const dispatch = useAppDispatch();
  const [signUpFromLogin, setAuthSignUpFromLogin] =
    React.useState<boolean>(false);
  const handleSignUpFromLogin = () => {
    setAuthSignUpFromLogin(!signUpFromLogin);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full h-[70px] bg-[#008080] font-Montserrat">
        <div className="pl-0 sm:pl-2 md:pl-3 lg:pl-5 min-[320px]:w-[15%] sm:w-[30%] md:w-[40%] lg:w-[50%]">
          <div className="flex justify-center items-center gap-2.5 w-[150px]">
            <NavLink to="/">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
        </div>
        <ul className="min-[320px]:hidden sm:hidden md:flex md:flex-row justify-center items-center md:gap-7 lg:gap-15 w-[30%]">
          <NavLink
            to="/"
            className="lg:min-w-[50px] text-white hover:text-black"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="lg:min-w-[50px] text-white hover:text-black"
          >
            About
          </NavLink>
          <NavLink
            to="/pricing"
            className="lg:min-w-[50px] text-white hover:text-black"
          >
            Pricing
          </NavLink>
        </ul>
        {!user ? (
          <div className="min-[320px]:w-[40%] lg:w-[20%]">
            <SignUpFromLogin
              onSignUp={signUpFromLogin}
              onHandleSignUp={handleSignUpFromLogin}
            >
              Sign up
            </SignUpFromLogin>
            <div className="min-[320px]:flex min-[320px]:justify-center min-[320px]:items-center min-[320px]:gap-3 md:flex md:flex-row justify-center items-center md:gap-3 lg:gap-5 pr-0 sm:pr-2 md:pr-3 lg:pr-5">
              <SignUp styles="lg:w-[120px] lg:min-w-[100px] md:[70px] bg-white text-[#008080] hover:text-white">
                Try Now
              </SignUp>
              <Login onHandleSignUp={handleSignUpFromLogin}>Login</Login>
            </div>
          </div>
        ) : (
          <div className="min-[320px]:w-[40%] lg:w-[20%]">
            <div className="min-[320px]:flex min-[320px]:justify-center min-[320px]:items-center min-[320px]:gap-3 md:flex md:flex-row justify-center items-center md:gap-3 lg:gap-5 pr-0 sm:pr-2 md:pr-3 lg:pr-5">
              <NavLink to="/dashboard">
                <Button
                  variant="default"
                  className="lg:w-[120px] lg:min-w-[100px] md:[70px] bg-white text-[#008080] hover:text-white"
                >
                  Dashboard
                </Button>
              </NavLink>
              <Button
                variant="outline"
                onClick={() => dispatch(userLogOutAction({}))}
                className="lg:w-[120px] lg:min-w-[60px] md:w-[100px] text-white"
              >
                Log Out
              </Button>
            </div>
          </div>
        )}

        <div className="md:hidden pr-0 sm:pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <GiHamburgerMenu size={23} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <NavLink to="/">
                <DropdownMenuItem>Home</DropdownMenuItem>
              </NavLink>
              <NavLink to="/about">
                <DropdownMenuItem>About</DropdownMenuItem>
              </NavLink>
              <NavLink to="/pricing">
                <DropdownMenuItem>Pricing</DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Outlet />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
