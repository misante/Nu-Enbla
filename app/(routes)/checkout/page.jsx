"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_utils/GlobalApi";
import { CartContext } from "@/app/_context/CartContext";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

const checkout = () => {
  const params = useSearchParams();
  const restauroName = params.get("restaurant");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [subtotal, setSubtotal] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [tax, setTax] = useState();
  const [totals, setTotals] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const [userCart, setUserCart] = useState([]);
  // const [restauroName, setRestauroName] = useState("");

  const router = useRouter();

  useEffect(() => {
    setUpdateCart(updateCart);
  }, []);

  useEffect(() => {
    user && getCartDetail();
  }, [updateCart && user]);

  const getCartDetail = () => {
    GlobalApi.GetUserCart(
      user?.primaryEmailAddress.emailAddress,
      restauroName
    ).then((resp) => {
      setUserCart(resp?.userCarts);
      calculatTotals(resp?.userCarts);
    });
  };
  const calculatTotals = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });
    setSubtotal(total.toFixed(2));
    setDeliveryCharge((total * 0.09).toFixed(2));
    setTax((total * 0.05).toFixed(2));
    setTotals((total + total * 0.09 + total * 0.05).toFixed(2));
  };

  const addToOrder = () => {
    setLoading(true);
    const data = {
      email: user.primaryEmailAddress.emailAddress,
      orderAmount: totals,
      restaurantName: params.get("restaurant"),
      userName: user.fullName,
      phoneNumber: phone,
      zipCode: zip,
      address: address,
    };
    GlobalApi.createOrder(data).then(
      (resp) => {
        const orderId = resp.createOrder.id;
        if (orderId) {
          userCart.forEach((item) => {
            GlobalApi.updateOrderDetail(
              item.price,
              item.productName,
              orderId,
              user?.primaryEmailAddress.emailAddress
            ).then((resp) => {
              toast("order updated successfully!!");
              setLoading(false);
              setUpdateCart(!updateCart);
              sendEmail();
              router.replace("confirmation");
            });
          });
        }
      },
      (error) => {
        setLoading(false);
        toast("something wrong", error);
      }
    );
  };
  const sendEmail = async () => {
    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // email: user?.primaryEmailAddress.emailAddress,
          userCart,
          totals,
          deliveryCharge,
          tax,
        }),
      });
      if (!response.ok) {
        toast("error while sending email");
      } else {
        toast("Email sent successfully");
      }
    } catch (error) {
      toast("error while sending email");
    }
  };
  return (
    <>
      <div className="mx-10 mt-10">
        <h1 className="text-2xl font-bold my-4">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name"
              />{" "}
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {" "}
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />{" "}
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip code"
              />
            </div>
            <div>
              {" "}
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
          </div>
          <div className="border ml-10 flex flex-col gap-2 rounded-lg shadow-lg px-1">
            <div className="bg-gray-300 text-center">
              <h3 className="font-bold">Cart Item Count ({userCart.length})</h3>
              <p className=" capitalize text-sm">(all amounts in AED)</p>
            </div>
            <div className="flex justify-between">
              <h2 className="capitalize font-bold">subtotal</h2>
              <p>{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="capitalize">delivery charge</h3>
              <p>{deliveryCharge}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="capitalize">tax</h3>
              <p>{tax}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="capitalize font-bold">total</h2>
              <p>{totals}</p>
            </div>
            <div className="mt-2">
              {/* <Button
                onClick={() => createOrder()}
                className="w-full bg-yellow-400 font-bold hover:bg-yellow-600 hover:text-2xl transition-all duration-1000"
              >
                {loading ? (
                  <Loader className=" animate-spin" />
                ) : (
                  "Make Payment"
                )}
              </Button> */}
              {totals > 5 && (
                <PayPalButtons
                  disabled={!(userName, email, zip, address, phone) || loading}
                  style={{ layout: "horizontal" }}
                  onApprove={addToOrder}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totals,
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default checkout;
