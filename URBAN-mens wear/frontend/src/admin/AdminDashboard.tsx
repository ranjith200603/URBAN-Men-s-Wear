import {
  BarChart3,
  Box,
  ShoppingBag,
  Users,
  Image,
  Mail,
  Settings,
  LogOut,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("urban-admin-logged-in");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-[#f5f4f0]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-black/10 bg-[#171717] text-white lg:block">

        <div className="flex h-full flex-col">

          {/* LOGO */}
          <div className="border-b border-white/10 px-7 py-7">
            <p className="text-2xl font-bold tracking-[-0.06em]">
              URBAN
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/30">
              Admin Panel
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-4 py-8">

            <p className="px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
              Management
            </p>

            <div className="mt-4 space-y-1">

              <AdminNav
                icon={<BarChart3 size={17} />}
                label="Dashboard"
                active
              />

              <AdminNav
                icon={<Box size={17} />}
                label="Products"
              />

              <AdminNav
                icon={<ShoppingBag size={17} />}
                label="Orders"
              />

              <AdminNav
                icon={<Users size={17} />}
                label="Customers"
              />

              <AdminNav
                icon={<Image size={17} />}
                label="Website Content"
              />

              <AdminNav
                icon={<Mail size={17} />}
                label="Newsletter"
              />

            </div>

            <p className="mt-10 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
              System
            </p>

            <div className="mt-4">
              <AdminNav
                icon={<Settings size={17} />}
                label="Settings"
              />
            </div>

          </nav>

          {/* LOGOUT */}
          <div className="border-t border-white/10 p-4">

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>

        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:ml-64">

        {/* HEADER */}
        <header className="border-b border-black/10 bg-white px-6 py-5 lg:px-10">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/30">
                Overview
              </p>

              <h1 className="mt-1 text-2xl font-semibold">
                Dashboard
              </h1>
            </div>

            <button
              onClick={() => navigate("/")}
              className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 transition hover:text-black"
            >
              View Store →
            </button>

          </div>

        </header>

        {/* CONTENT */}
        <section className="px-6 py-8 lg:px-10">

          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Products"
              value="8"
              icon={<Box size={19} />}
              change="+2 this month"
            />

            <StatCard
              title="Total Orders"
              value="24"
              icon={<ShoppingBag size={19} />}
              change="+12% this month"
            />

            <StatCard
              title="Customers"
              value="18"
              icon={<Users size={19} />}
              change="+5 this month"
            />

            <StatCard
              title="Revenue"
              value="₹48,920"
              icon={<BarChart3 size={19} />}
              change="+18% this month"
            />

          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-8">

            <div className="flex items-end justify-between">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/30">
                  Store Management
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Quick Actions
                </h2>
              </div>

            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <QuickAction
                icon={<Plus size={20} />}
                title="Add Product"
                description="Create a new product"
              />

              <QuickAction
                icon={<Box size={20} />}
                title="Manage Products"
                description="Edit or delete products"
              />

              <QuickAction
                icon={<ShoppingBag size={20} />}
                title="Manage Orders"
                description="Update order status"
              />

              <QuickAction
                icon={<Image size={20} />}
                title="Edit Website"
                description="Update homepage content"
              />

            </div>

          </div>

          {/* RECENT ORDERS */}
          <div className="mt-8 bg-white">

            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/30">
                  Activity
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Recent Orders
                </h2>
              </div>

              <button className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-black">
                View All
                <ArrowUpRight size={13} />
              </button>

            </div>

            <div className="divide-y divide-black/5">

              <OrderRow
                id="#URB-1024"
                customer="Customer"
                amount="₹3,398"
                status="Delivered"
              />

              <OrderRow
                id="#URB-1023"
                customer="Customer"
                amount="₹2,299"
                status="Shipped"
              />

              <OrderRow
                id="#URB-1022"
                customer="Customer"
                amount="₹1,899"
                status="Confirmed"
              />

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

/* =========================================================
   NAV ITEM
========================================================= */

function AdminNav({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 px-3 py-3 text-sm transition ${
        active
          ? "bg-white text-black"
          : "text-white/50 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) {
  return (
    <div className="bg-white p-6">

      <div className="flex items-start justify-between">

        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
          {title}
        </p>

        <div className="text-black/40">
          {icon}
        </div>

      </div>

      <p className="mt-5 text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-2 text-[10px] text-black/30">
        {change}
      </p>

    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="group flex items-center gap-4 bg-white p-6 text-left transition hover:bg-black hover:text-white">

      <div className="flex h-10 w-10 items-center justify-center border border-black/10 transition group-hover:border-white/20">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-[10px] text-black/40 group-hover:text-white/40">
          {description}
        </p>
      </div>

    </button>
  );
}

/* =========================================================
   ORDER ROW
========================================================= */

function OrderRow({
  id,
  customer,
  amount,
  status,
}: {
  id: string;
  customer: string;
  amount: string;
  status: string;
}) {
  return (
    <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <p className="text-sm font-semibold">
          {id}
        </p>

        <p className="mt-1 text-xs text-black/40">
          {customer}
        </p>
      </div>

      <div className="flex items-center gap-8">

        <p className="text-sm font-semibold">
          {amount}
        </p>

        <span className="border border-black/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
          {status}
        </span>

      </div>

    </div>
  );
}