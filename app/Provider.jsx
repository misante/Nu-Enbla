"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartContext } from "./_context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const Provider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <CartContext.Provider value={{ updateCart, setUpdateCart }}>
        <div>
          <Header />
          <Toaster />
          {children}
        </div>
      </CartContext.Provider>
    </PayPalScriptProvider>
  );
};
