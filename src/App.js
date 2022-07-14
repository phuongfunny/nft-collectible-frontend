import logo from "./logo.svg";
import "./App.css";
import contractABI from "./contracts/NFTCollectible.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xB25999b4A49cd08AAe558F5d1838e159626946Bc";
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const { ethereum } = window;

  const checkWalletIsConnected = async () => {
    if (!ethereum) {
      console.log("Make sure you installed Metamask!");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
  };

  const connectWalletHandler = async () => {
    if (!ethereum) {
      console.log("Make sure you installed Metamask!");
      return;
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts", accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("nftContract", nftContract);
        console.log("Initialize payment");
        let nftTxn = await nftContract.mint(
          "0xe176253b25a4e9097b43a100ff00249392e2dbaf",
          contractAddress,
          "testNFT",
          10,
          false
        );

        console.log("Mining... pls wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      }
    } catch (error) {
      console.log("vao", error);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const sellTokenHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("nftContract", nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.setPriceAndSell(
          74,
          ethers.utils.parseEther("0.1")
        );

        console.log("Mining... pls wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://testnet.bscscan.com/tx/${nftTxn.hash}`
        );
      }
    } catch (error) {
      console.log("vao", error);
    }
  };
  const sellToken = () => {
    return (
      <button
        onClick={sellTokenHandler}
        className="cta-button connect-wallet-button"
      >
        Sell Token
      </button>
    );
  };

  const getListNFTs = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("nftContract", nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.getAllTokensByPage(73, 78);

        console.log("Mining... pls wait");

        console.log("listNFT", nftTxn);
      }
    } catch (error) {
      console.log("vao", error);
    }
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Scrappy Squirrels Tutorial</h1>
      <div>{currentAccount ? mintNftButton() : connectWalletButton()}</div>
      <div>{sellToken()}</div>
      <button onClick={getListNFTs}>Get List</button>
    </div>
  );
}

export default App;
