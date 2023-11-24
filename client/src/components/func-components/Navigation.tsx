import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
        <div className="pl-0 sm:pl-2 md:pl-3 lg:pl-5 w-[50%]">
          <div className="flex justify-center items-center gap-2.5 w-[150px]">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
            </svg>
            <h3 className=" scroll-m-20 text-2xl font-semibold tracking-tight text-white">
              medico.ai
            </h3>
          </div>
        </div>
        <ul className="sm:hidden md:flex md:flex-row justify-center items-center md:gap-7 lg:gap-15 w-[30%]">
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
          <div className="w-[20%]">
            <SignUpFromLogin
              onSignUp={signUpFromLogin}
              onHandleSignUp={handleSignUpFromLogin}
            >
              Sign up
            </SignUpFromLogin>
            <div className="sm:hidden md:flex md:flex-row justify-center items-center md:gap-3 lg:gap-5 pr-0 sm:pr-2 md:pr-3 lg:pr-5">
              <SignUp styles="lg:w-[120px] lg:min-w-[100px] md:[70px] bg-white text-[#008080] hover:text-white">
                Try Now
              </SignUp>
              <Login onHandleSignUp={handleSignUpFromLogin}>Login</Login>
            </div>
          </div>
        ) : (
          <div className="w-[20%]">
            <div className="sm:hidden md:flex md:flex-row justify-center items-center md:gap-3 lg:gap-5 pr-0 sm:pr-2 md:pr-3 lg:pr-5">
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
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
