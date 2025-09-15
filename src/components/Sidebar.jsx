"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Wallet,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  ReceiptText,
  Users2, // Icon for Subscriptions
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard }, 
  { name: "User Management", href: "/user-management", icon: Users2 },
  { name: "Artist Management", href: "/artist-management", icon: Users },
  { name: "Song Management", href: "/song-management", icon: FileText },
  { name: "Playlist Management", href: "/playlist-management", icon: Users },
  { name: "Follower Management", href: "/follower-management", icon: Wallet },
];

// **NEW**: Data for the Subscriptions dropdown
const subscriptionItems = [
    { 
        name: "Plans", 
        href: "/subscriptions/plans" 
    },
    { 
        name: "Subscribers", 
        href: "/subscriptions/subscribers" 
    },
];

const settingsItems = [
  { 
    name: "Basic", 
    href: "/settings/profile"
  },
  { 
    name: "Notifications", 
    href: "/settings/notification"
  }
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // **NEW**: State to manage the Subscriptions dropdown
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

  // Check if we're on any subscriptions page
  const isSubscriptionsActive = pathname.includes('/subscriptions');
  // Check if we're on any settings page
  const isSettingsActive = pathname.includes('/settings');

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        }`}
      >
        <div className="flex flex-col h-full justify-between border-[#D6D6D6] bg-[linear-gradient(180deg,#6B316C_0%,#312B36_16.11%)]">
          {/* Logo & Close Button */}
          <div className="flex justify-between border-[#D6D6D6] pb-4 pt-6 px-6">
            <Image className="w-[180px] " src="/bangr-logo.png" alt="Logo" width={180} height={50} />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 cursor-pointer rounded text-[#494949]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none"><path d="M10.1775 20.3557C9.75767 20.3557 9.33764 20.1955 9.01769 19.8751L0.81394 11.6713C0.173022 11.0304 0.173022 9.9921 0.81394 9.35118L9.01769 1.14744C9.65861 0.506519 10.6969 0.506519 11.3378 1.14744C11.9787 1.78835 11.9787 2.82664 11.3378 3.46756L4.29387 10.5112L11.3388 17.5562C11.9798 18.1971 11.9798 19.2354 11.3388 19.8763C11.0184 20.1968 10.5979 20.3557 10.1775 20.3557Z" fill="url(#paint0_linear_2_207)"/><path opacity="0.4" d="M20.022 20.3557C19.6021 20.3557 19.1821 20.1955 18.8622 19.8751L10.6584 11.6713C10.0175 11.0304 10.0175 9.9921 10.6584 9.35118L18.8622 1.14744C19.5031 0.506519 20.5414 0.506519 21.1823 1.14744C21.8232 1.78835 21.8232 2.82664 21.1823 3.46756L14.1409 10.5112L21.1859 17.5562C21.8268 18.1971 21.8268 19.2354 21.1859 19.8763C20.8629 20.1968 20.4424 20.3557 20.022 20.3557Z" fill="url(#paint1_linear_2_207)"/><defs><linearGradient id="paint0_linear_2_207" x1="0.333252" y1="10.5112" x2="11.8195" y2="10.5112" gradientUnits="userSpaceOnUse"><stop stopColor="#FBCAFF"/><stop offset="1" stopColor="#C5FFE7"/></linearGradient><linearGradient id="paint1_linear_2_207" x1="10.1777" y1="10.5112" x2="21.6666" y2="10.5112" gradientUnits="userSpaceOnUse"><stop stopColor="#FBCAFF"/><stop offset="1" stopColor="#C5FFE7"/></linearGradient></defs></svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 space-y-2 flex-grow overflow-y-auto px-2">
            {/* Regular Navigation Items */}
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center px-4 w-full mx-auto py-3.5 transition-all rounded-lg ${
                    isActive
                      ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-normal text-[13px]">{name}</span>
                </Link>
              );
            })}
            
            {/* --- **NEW**: SUBSCRIPTIONS DROPDOWN --- */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsSubscriptionsOpen(!isSubscriptionsOpen)}
                className={`flex items-center justify-between px-4 w-full mx-auto py-3.5 transition-all rounded-lg ${
                  isSubscriptionsActive
                    ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <ReceiptText className="w-5 h-5 " />
                  <span className="font-normal text-[13px]">Subscriptions Management</span>
                </div>
                {isSubscriptionsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isSubscriptionsOpen && (
                <div className="pl-6 space-y-2">
                  {subscriptionItems.map((item) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-4 w-full py-3 transition-all rounded-lg ${
                          isItemActive
                            ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white"
                            : "bg-[#00000033] text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3"></div>
                          <span className="font-normal text-sm">{item.name}</span>
                        </div>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Settings Dropdown */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center justify-between px-4 w-full mx-auto py-3.5 transition-all rounded-lg ${
                  isSettingsActive
                    ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal text-[13px]">Settings</span>
                </div>
                {isSettingsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isSettingsOpen && (
                <div className="pl-6 space-y-2">
                  {settingsItems.map((item) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-4 w-full py-3 transition-all rounded-lg ${
                          isItemActive
                            ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white"
                            : "bg-[#00000033] text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3"></div>
                           <span className="font-normal text-sm">{item.name}</span>
                        </div>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

          </nav>

          {/* Logout Button */}
          <div className="border-t border-white/20 p-6">
            <button className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7 18.5583H12.5916C8.89164 18.5583 7.10831 17.1 6.79997 13.8333C6.76664 13.4917 7.01664 13.1833 7.36664 13.15C7.69997 13.1166 8.01664 13.375 8.04997 13.7167C8.29164 16.3333 9.52497 17.3083 12.6 17.3083H12.7083C16.1 17.3083 17.3 16.1083 17.3 12.7167V7.28332C17.3 3.89165 16.1 2.69165 12.7083 2.69165H12.6C9.50831 2.69165 8.27497 3.68332 8.04997 6.34998C8.00831 6.69165 7.71664 6.94998 7.36664 6.91665C7.01664 6.89165 6.76664 6.58332 6.79164 6.24165C7.07497 2.92498 8.86664 1.44165 12.5916 1.44165H12.7C16.7916 1.44165 18.5416 3.19165 18.5416 7.28332V12.7167C18.5416 16.8083 16.7916 18.5583 12.7 18.5583Z" fill="currentColor"/><path d="M3.01672 9.875H12.5001C12.5302 9.87502 12.5614 9.88746 12.587 9.91309C12.6127 9.93872 12.6251 9.96987 12.6251 10C12.6251 10.0301 12.6127 10.0613 12.587 10.0869C12.5614 10.1125 12.5302 10.125 12.5001 10.125H3.01672C2.98658 10.125 2.95545 10.1126 2.92981 10.0869C2.90417 10.0613 2.89172 10.0301 2.89172 10C2.89172 9.96985 2.90417 9.93873 2.92981 9.91309C2.95545 9.88744 2.98658 9.875 3.01672 9.875Z" fill="currentColor" stroke="currentColor"/><path d="M4.92432 7.09521L4.96338 7.12061C4.98473 7.14212 4.99756 7.17281 4.99756 7.2085C4.99754 7.22619 4.99465 7.24262 4.98877 7.25732L4.96338 7.29639L2.61279 9.646L2.25928 10.0005L2.61279 10.354L4.96338 12.7036C4.98479 12.7251 4.99751 12.7558 4.99756 12.7915C4.99756 12.8272 4.98471 12.8579 4.96338 12.8794L4.95752 12.8862L4.95166 12.8921C4.94839 12.8956 4.94108 12.9022 4.92725 12.9077C4.91276 12.9135 4.89424 12.9164 4.87549 12.9165C4.85781 12.9165 4.84194 12.9131 4.82861 12.9077L4.78662 12.8794L1.99561 10.0884C1.97417 10.0669 1.96056 10.0361 1.96045 10.0005C1.96045 9.98253 1.96418 9.96556 1.97021 9.95068L1.99561 9.91162L4.78662 7.12061C4.80815 7.09908 4.83964 7.08545 4.87549 7.08545C4.89325 7.0855 4.90958 7.08925 4.92432 7.09521Z" fill="currentColor" stroke="currentColor"/></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Open Button (When Sidebar is Closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-4 z-50 p-2 text-[#F7009E] rounded-md shadow-lg flex items-center justify-center bg-[#29232A] cursor-pointer transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
    </>
  );
};

export default Sidebar;