"use client";


import VendorProfileCard from "@/src/components/Cards/VendorProfileCard";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";

const VendorHome = () => {
  return (
    <div>
      <DashboardSectionTitle heading="Vendor Profile" />

      <VendorProfileCard />
    </div>
  );
};

export default VendorHome;