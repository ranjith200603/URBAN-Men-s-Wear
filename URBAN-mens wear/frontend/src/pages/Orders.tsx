import { useState } from "react";

import {
  Package,
  Check,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useOrders,
  type OrderStatus,
} from "../context/OrderContext";

import BackToHome from "../components/BackToHome";

const statuses: OrderStatus[] = [
  "Order Placed",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function getStatusIndex(status: OrderStatus) {
  return statuses.indexOf(status);
}

export default function Orders() {
  const { orders } = useOrders();

  const [expandedOrder, setExpandedOrder] =
    useState<string | null>(
      orders.length > 0 ? orders[0].id : null
    );

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((current) =>
      current === orderId ? null : orderId
    );
  };

  /* =========================
     NO ORDERS
  ========================== */

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">

        <div className="mx-auto max-w-5xl">

          {/* =========================
              TOP HEADER
          ========================== */}

          <div className="border-b border-black/10 pb-8">

            {/* BACK TO HOME */}

            <div className="mb-10">
              <BackToHome />
            </div>

            {/* PAGE TITLE */}

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
              Account
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              My Orders
            </h1>

            <p className="mt-4 text-sm text-black/50">
              Track your purchases and delivery status.
            </p>

          </div>

          {/* =========================
              EMPTY STATE
          ========================== */}

          <div className="flex min-h-[55vh] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white">
                <ShoppingBag
                  size={38}
                  strokeWidth={1.2}
                />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                My Orders
              </p>

              <h2 className="mt-3 text-4xl font-black md:text-5xl">
                No orders yet.
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/50">
                You haven't placed any orders yet.
                Start shopping and your orders will
                appear here automatically.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
              >
                Start Shopping
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* =========================
     ORDERS PAGE
  ========================== */

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">

      <div className="mx-auto max-w-5xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="border-b border-black/10 pb-8">

          {/* BACK TO HOME */}

          <div className="mb-10">
            <BackToHome />
          </div>

          {/* ACCOUNT */}

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
            Account
          </p>

          {/* TITLE */}

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            My Orders
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-4 text-sm text-black/50">
            Track your purchases and delivery status.
          </p>

        </div>

        {/* =========================
            ORDERS
        ========================== */}

        <div className="mt-10 space-y-6">

          {orders.map((order) => {

            const isExpanded =
              expandedOrder === order.id;

            const currentStatusIndex =
              getStatusIndex(order.status);

            const itemCount =
              order.items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              );

            return (
              <div
                key={order.id}
                className="overflow-hidden border border-black/10 bg-white"
              >

                {/* =========================
                    ORDER HEADER
                ========================== */}

                <button
                  type="button"
                  onClick={() =>
                    toggleOrder(order.id)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition hover:bg-[#faf9f6]"
                >

                  {/* ORDER INFO */}

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                      <Package
                        size={21}
                        strokeWidth={1.4}
                      />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-widest text-black/40">
                        Order
                      </p>

                      <p className="mt-1 font-bold tracking-wide">
                        {order.id}
                      </p>

                    </div>

                  </div>

                  {/* TOTAL */}

                  <div className="hidden text-right sm:block">

                    <p className="text-xs uppercase tracking-widest text-black/40">
                      Total
                    </p>

                    <p className="mt-1 font-bold">
                      ₹
                      {order.total.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                  {/* ARROW */}

                  <div className="ml-4">

                    {isExpanded ? (
                      <ChevronUp
                        size={20}
                        strokeWidth={1.4}
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        strokeWidth={1.4}
                      />
                    )}

                  </div>

                </button>

                {/* =========================
                    ORDER DETAILS
                ========================== */}

                {isExpanded && (
                  <div className="border-t border-black/10">

                    {/* =========================
                        ORDER SUMMARY
                    ========================== */}

                    <div className="grid border-b border-black/10 sm:grid-cols-4">

                      <Info
                        label="Order Date"
                        value={order.date}
                      />

                      <Info
                        label="Items"
                        value={`${itemCount} ${
                          itemCount === 1
                            ? "Item"
                            : "Items"
                        }`}
                      />

                      <Info
                        label="Payment"
                        value={order.paymentMethod}
                      />

                      <Info
                        label="Expected Delivery"
                        value={order.deliveryDate}
                      />

                    </div>

                    {/* =========================
                        PRODUCTS
                    ========================== */}

                    <div className="p-6">

                      <h2 className="text-lg font-black">
                        Products
                      </h2>

                      <div className="mt-5 space-y-4">

                        {order.items.map(
                          (item) => (
                            <div
                              key={`${item.id}-${item.size}`}
                              className="flex gap-4 border border-black/10 p-4"
                            >

                              {/* PRODUCT IMAGE */}

                              <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#eeeae3]">

                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />

                              </div>

                              {/* PRODUCT DETAILS */}

                              <div className="min-w-0 flex-1">

                                <p className="font-bold">
                                  {item.name}
                                </p>

                                <p className="mt-1 text-xs uppercase tracking-widest text-black/40">
                                  {item.category}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-4 text-xs text-black/50">

                                  <span>
                                    Size:{" "}
                                    <strong className="text-black">
                                      {item.size}
                                    </strong>
                                  </span>

                                  <span>
                                    Quantity:{" "}
                                    <strong className="text-black">
                                      {item.quantity}
                                    </strong>
                                  </span>

                                </div>

                              </div>

                              {/* PRODUCT PRICE */}

                              <div className="text-right">

                                <p className="font-bold">
                                  ₹
                                  {(
                                    item.price *
                                    item.quantity
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    {/* =========================
                        DELIVERY TRACKING
                    ========================== */}

                    <div className="border-t border-black/10 bg-[#faf9f6] p-6">

                      {/* TRACKING HEADER */}

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                            Delivery Tracking
                          </p>

                          <h2 className="mt-2 text-2xl font-black">
                            {order.status}
                          </h2>

                        </div>

                        <div className="hidden sm:block">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">

                            {order.status ===
                            "Delivered" ? (
                              <Check
                                size={21}
                                strokeWidth={1.5}
                              />
                            ) : (
                              <Truck
                                size={21}
                                strokeWidth={1.5}
                              />
                            )}

                          </div>

                        </div>

                      </div>

                      {/* =========================
                          TIMELINE
                      ========================== */}

                      <div className="mt-8">

                        {statuses.map(
                          (
                            status,
                            index
                          ) => {

                            const completed =
                              index <=
                              currentStatusIndex;

                            const isCurrent =
                              index ===
                              currentStatusIndex;

                            return (
                              <div
                                key={status}
                                className="relative flex gap-5"
                              >

                                {/* TIMELINE LINE */}

                                {index <
                                  statuses.length -
                                    1 && (
                                  <div
                                    className={`absolute left-[15px] top-8 h-full w-px ${
                                      index <
                                      currentStatusIndex
                                        ? "bg-black"
                                        : "bg-black/10"
                                    }`}
                                  />
                                )}

                                {/* STATUS ICON */}

                                <div
                                  className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                                    completed
                                      ? "border-black bg-black text-white"
                                      : "border-black/15 bg-white text-black/20"
                                  }`}
                                >

                                  {index === 0 && (
                                    <Package
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                  {index === 1 && (
                                    <Check
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                  {index === 2 && (
                                    <Package
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                  {index === 3 && (
                                    <Truck
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                  {index === 4 && (
                                    <MapPin
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                  {index === 5 && (
                                    <Check
                                      size={14}
                                      strokeWidth={1.5}
                                    />
                                  )}

                                </div>

                                {/* STATUS TEXT */}

                                <div
                                  className={`pb-8 ${
                                    isCurrent
                                      ? "text-black"
                                      : completed
                                      ? "text-black"
                                      : "text-black/30"
                                  }`}
                                >

                                  <p
                                    className={`text-sm ${
                                      isCurrent
                                        ? "font-black"
                                        : "font-semibold"
                                    }`}
                                  >
                                    {status}
                                  </p>

                                  {isCurrent && (
                                    <p className="mt-1 text-xs text-black/50">
                                      Your order is
                                      currently
                                      at this stage.
                                    </p>
                                  )}

                                </div>

                              </div>
                            );
                          }
                        )}

                      </div>

                      {/* =========================
                          DELIVERY INFORMATION
                      ========================== */}

                      <div className="border-t border-black/10 pt-5">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-xs uppercase tracking-widest text-black/40">
                              Estimated Delivery
                            </p>

                            <p className="mt-1 font-bold">
                              {order.deliveryDate}
                            </p>

                          </div>

                          <p className="text-xs font-bold uppercase tracking-widest text-black/40">
                            {order.status}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </main>
  );
}

/* =========================
   INFO COMPONENT
========================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-black/10 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">

      <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}