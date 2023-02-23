import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import { useAccount, useContract, useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from 'wagmi'

const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true
  },
  {
  inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "freeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
]

const goerliAddress = '0x4a346B116989DfF45cd7FF8c4f7DFD64B780881D'

export const FreeMint = () => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const { chain } = useNetwork();
  const [tx, setTx] = useState('N/A');

  const mainContract: any = useContract({
    address: goerliAddress,
    abi: contractAbi,
    signerOrProvider: signer,
  });

  const mint = async () => {
    setMinting(true);
    const amount = 1;
    const ether = "" + 0.005 * amount;
    const options = {
      value: BigNumber.from('10000000000000') 
    }
    const pending = await mainContract.functions['freeMint(uint256)'](amount);
    const txResult = await pending.wait();
    setTx(txResult.blockHash);
    console.log(`Transaction completed!`, txResult)
    setMinting(false);
    setMinted(true);
  };

  return (
    <>
      <button onClick={() => mint()}
      disabled={minting || minted}>
        Click me for a free mint!
      </button>
      {minted && <h1>Minted with {tx}</h1>}
    </>
  );
}