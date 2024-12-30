import CustomerProfile from "@/src/components/Cards/CustomerProfile";


const Customerprofile = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-black lg:hidden mb-5 font-bold">
        Profile
      </h1>
      <CustomerProfile />
    </div>
  );
};

export default Customerprofile;