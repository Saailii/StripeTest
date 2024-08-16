import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE!);
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: "price_1PoVnHBvV0TKcvRNxnZpj1DO",
          quantity: 1,
        },
        {
          price: "price_1PoUYHBvV0TKcvRNrHs5WmXh",
          quantity: 1,
        },
      ],
    });
    return NextResponse.json(paymentLink, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
