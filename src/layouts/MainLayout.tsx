import Logo from "../assets/botbuddy-logo.png";

interface IMainLayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
  centerGif?: boolean;
}
export const MainLayout = ({
  children,
  showLogo = false,
  centerGif = true,
}: IMainLayoutProps) => {
  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-pink-50 overflow-x-hidden">
      {showLogo && (
        <div className="w-full max-w-6xl mx-auto px-4 pt-4">
          <img src={Logo} alt="Bot Buddy Logo" className="w-40" />
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex">
        <div className="w-2/3 pr-8 flex flex-col justify-center">
          <div className="flex flex-col justify-center">{children}</div>
        </div>
        <div className={`w-1/3 ${centerGif ? "flex items-center" : ""}`}>
          <iframe
            className="w-full h-96 max-w-md"
            src="https://lottie.host/embed/9fb0ec9e-d9a7-4bb3-98d1-996497f2ae5e/IeKDVPiKUJ.lottie"
          ></iframe>
        </div>
      </div>
    </main>
  );
};
