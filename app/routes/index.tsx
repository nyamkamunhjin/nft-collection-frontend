import { useUser } from '../context/user';

export default function Index() {
  const user = useUser();

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <span className="text-5xl font-semibold">Mint your NFT</span>
      {!user?.walletAddress && user?.connectWallet && (
        <button
          className="px-2.5 py-1.5 rounded-lg bg-purple-400 text-white"
          onClick={user?.connectWallet}
        >
          Connect your wallet
        </button>
      )}
    </div>
  );
}
