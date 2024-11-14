import Header from "./_components/header";
import Navigation from "./_components/navigation";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative">
      <Header />
      <Navigation />
      <div className="flex min-h-screen w-screen">{children}</div>
    </div>
  );
};
