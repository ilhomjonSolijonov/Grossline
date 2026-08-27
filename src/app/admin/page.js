import { getProducts, getEvents } from "@/lib/data";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const products = await getProducts();
  const events = await getEvents();

  return <DashboardClient products={products} events={events} />;
}
