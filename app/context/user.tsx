import React from 'react';

interface UserContextType {
  walletAddress: string;
  connectWallet: () => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

/**
 * @author
 * @function @UserProvider
 **/

export const UserProvider: React.FC = ({ children }) => {
  const [walletAddress, setWalletAddress] = React.useState('');
  const checkIfWalletIsConnected = async () => {
    try {
      /*
       * First make sure we have access to window.ethereum
       */
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log('Make sure you have metamask!');

        return;
      }
      console.log('We have the ethereum object', ethereum);

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts?.length > 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setWalletAddress(account);
      } else {
        console.log('No authorized account found.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <UserContext.Provider value={{ connectWallet, walletAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => React.useContext(UserContext);
