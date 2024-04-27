import Email from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const resp = await req.json();
  const { userCart, totals, deliveryCharge, tax } = resp;
  try {
    const data = await resend.emails.send({
      from: "antenehd@ehtenat.com",
      to: [userCart[0].email],
      subject: "Nu enbla food order confirmation",
      react: (
        <Email
          userCart={userCart}
          totals={totals}
          deliveryCharge={deliveryCharge}
          tax={tax}
        />
      ),
    });
    return NextResponse.json({ data });
  } catch (error) {
    NextResponse.json(error);
  }
}
