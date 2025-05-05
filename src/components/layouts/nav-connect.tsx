"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, Wallet } from "lucide-react";
// import {
//   useAccount,
//   useConnect,
//   useDisconnect,
//   useSwitchChain,
//   useConfig,
// } from "wagmi";

export default function NavConnect() {
  // const { error: connectError } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { switchChain } = useSwitchChain();
  // const { chains } = useConfig();
  // const { address } = useAccount();

  return <ConnectButton />;
  // return (
  //   <ConnectButton.Custom>
  //     {({
  //       account,
  //       chain,
  //       mounted,
  //       authenticationStatus,
  //       openConnectModal,
  //       openChainModal,
  //     }) => {
  //       const ready = mounted && authenticationStatus !== "loading";
  //       const connected =
  //         ready &&
  //         account &&
  //         chain &&
  //         (!authenticationStatus || authenticationStatus === "authenticated");

  //       if (!connected) {
  //         return (
  //           <Button
  //             variant="default"
  //             onClick={openConnectModal}
  //             className="flex items-center space-x-2"
  //           >
  //             <Wallet className="w-5 h-5" />
  //             <span>Connect Wallet</span>
  //           </Button>
  //         );
  //       }

  //       if (chain.unsupported) {
  //         return (
  //           <Button variant="destructive" onClick={openChainModal}>
  //             Wrong network
  //           </Button>
  //         );
  //       }

  //       return (
  //         <div className="flex space-x-2">
  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <Button
  //                 variant="outline"
  //                 size="sm"
  //                 className="flex items-center"
  //               >
  //                 {chain.name}
  //                 <ChevronDown className="w-4 h-4 ml-1" />
  //               </Button>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent>
  //               {chains.map((x) => (
  //                 <DropdownMenuItem
  //                   key={x.id}
  //                   onSelect={() => switchChain?.({ chainId: x.id })}
  //                   disabled={x.id === chain.id}
  //                 >
  //                   {x.name}
  //                 </DropdownMenuItem>
  //               ))}
  //             </DropdownMenuContent>
  //           </DropdownMenu>

  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <Button
  //                 variant="default"
  //                 size="sm"
  //                 className="flex items-center"
  //               >
  //                 {account.displayName}
  //                 <ChevronDown className="w-4 h-4 ml-1" />
  //               </Button>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent>
  //               <DropdownMenuItem disabled>
  //                 {address?.substring(0, 6)}…{address?.slice(-4)}
  //               </DropdownMenuItem>
  //               <DropdownMenuItem onSelect={() => disconnect()}>
  //                 Disconnect
  //               </DropdownMenuItem>
  //               {connectError && (
  //                 <DropdownMenuItem disabled>
  //                   {connectError.message}
  //                 </DropdownMenuItem>
  //               )}
  //             </DropdownMenuContent>
  //           </DropdownMenu>
  //         </div>
  //       );
  //     }}
  //   </ConnectButton.Custom>
  // );
}
