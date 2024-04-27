"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "../_utils/GlobalApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cart from "./Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const params = usePathname();
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const [userCart, setUserCart] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const router = useRouter();
  useEffect(() => {
    setUpdateCart(!updateCart);
  }, []);

  useEffect(() => {
    setRestaurantName(params.split("/")[2]);
    user &&
      getCartDetail(user?.primaryEmailAddress.emailAddress, restaurantName);
  }, [updateCart && user]);

  const getCartDetail = (userEmail, slug) => {
    GlobalApi.GetUserCart(userEmail, slug).then((resp) => {
      setUserCart(resp?.userCarts);
    });
  };
  useEffect(() => {
    const refreshPage = () => {
      router.refresh(); // This reloads the current route
    };
    refreshPage();
  }, []);
  return (
    <>
      <nav className="p-6 flex w-full mb-4 shadow-md h-20 items-center justify-between">
        <Link href="/" className="flex gap-0.5">
          <Image
            height={75}
            width={75}
            src="/nuEnbla_logo1.png"
            alt="Nu Enbla"
            className="hover:animate-spin rounded-full"
          />
          <Image
            height={75}
            width={75}
            src="/nuEnbla_text_logo1.png"
            alt="Nu Enbla"
            className="bg-white  transition-all duration-1000"
          />
        </Link>
        <div className="hidden bg-gray-200 border p-2 md:flex w-120 rounded-lg">
          <input type="text" className="w-full bg-transparent outline-none" />
          <Search />
        </div>
        {isSignedIn ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex relative">
                  <ShoppingCart className="hover:cursor-pointer hover:scale-105 hover:text-green-500" />
                  <h6 className="bg-red-600 text-white flex rounded-full absolute -top-2.5 -right-3 w-4 h-4 justify-center text-xs">
                    {userCart?.length}
                  </h6>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Cart userCart={userCart} />
              </PopoverContent>
            </Popover>

            {/* <UserButton afterSignOutUrl="/" /> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user.imageUrl}
                  width={35}
                  height={35}
                  alt="user"
                  className="rounded-full cursor-pointer outline-none border-none"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="cursor-pointer">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/User"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href={"/User"}>
                  <DropdownMenuItem className="cursor-pointer">
                    My Orders
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <Button className="font-bold text-red-500 outline-red-500 bg-transparent border-2 border-red-400">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>SignUp</Button>
            </SignUpButton>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
