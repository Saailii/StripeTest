"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "Subscribe") {
      router.replace("/"); // Use replace instead of back to avoid navigating back to the same page
    }
  }, [status, session, router]);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.get("/api/stripe");

        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    handleSubmit();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user.role === "Subscribe") {
    return (
      <div>
        <h1>Dashboard</h1>
        <button
          onClick={async () => {
            const response = await axios.get("/api/stripe/test");
            console.log(response.data.url);
          }}
        >
          buy
        </button>
        {products.map((product: any) => (
          <div key={product.name}>
            <span>{product.name}</span>
            {product.images && <img src={product.images[0]} alt="" />}
          </div>
        ))}
      </div>
    );
  }

  return null; // Render nothing while redirecting
}
