import chatgptLogo from "@/public/chatgpt-logo.svg";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-5 flex flex-col h-screen w-screen items-center">
      <div className="auth-header">
        <Image src={chatgptLogo} alt="" className="hover-will-spin"></Image>
        {/* <div className="wrapper w-full h-full">
          <div className="btn-sensor sensor-n"></div>
          <div className="btn-sensor sensor-ne"></div>
          <div className="btn-sensor sensor-e"></div>
          <div className="btn-sensor sensor-se"></div>
          <div className="btn-sensor sensor-s"></div>
          <div className="btn-sensor sensor-sw"></div>
          <div className="btn-sensor sensor-w"></div>
          <div className="btn-sensor sensor-nw"></div>
          <button className="btn-button">
            <div className="btn-lid"></div>
            <div className="btn-pupil"></div>
          </button>
          <button className="btn-button">
            <div className="btn-lid"></div>
            <div className="btn-pupil"></div>
          </button>
        </div> */}
      </div>
      <div className="auth-body flex-grow z-highest">{children}</div>
      <div className="auth-footer flex flex-row items-center justify-center gap-2">
        <p className="">Term of Use</p>
        <p>|</p>
        <p className="">Privacy Policy</p>
      </div>
    </div>
  );
}
