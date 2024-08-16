import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);

export async function GET(req: NextApiRequest, res: NextResponse) {
  try {
    const product = await stripe.products.list();
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("there is an error");
  }
}
