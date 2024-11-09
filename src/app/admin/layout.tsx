import UserManager from "./overview/_components/user-manager";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative">
      <div className="flex min-h-screen w-screen">
        {children}
      </div>
      <Navigation />
    </div>
  );
};

const Navigation = () => {
  return (
    <div className="w-full h-20 bg-green-200 fixed bottom-0 left-0">
      {/* <UserManager /> */}
    </div>
  );
};
