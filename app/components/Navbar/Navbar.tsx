import React from "react";
import Container from "../Container";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px] ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <Search /> */}
            {/* <UserMenu /> */}
          </div>
        </Container>
      </div>
      {/* <Categories /> */}
    </div>
  );
};

export default Navbar;
