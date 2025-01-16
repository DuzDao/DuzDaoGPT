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
      </div>
      <div className="auth-body flex-grow">{children}</div>
      <div className="auth-footer flex flex-row items-center justify-center gap-2">
        <p className="">Term of Use</p>
        <p>|</p>
        <p className="">Privacy Policy</p>
      </div>
    </div>
  );
}
