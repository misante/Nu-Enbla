"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import MyOrders from "./component_/MyOrders";

const User = () => {
  return (
    <div className="flex justify-center items-center">
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Orders"
          labelIcon={<ShoppingBasket className="h-4 w-4" />}
          url="my-orders"
        >
          <MyOrders />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
};

export default User;
