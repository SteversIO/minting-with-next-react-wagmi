import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount, useContract, useContractWrite, useNetwork, usePrepareContractWrite, useSigner, useWaitForTransaction } from 'wagmi'

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

export const PayableMint = () => {
  const [amount, setAmount] = useState(0)
  const [debouncedAmount] = useDebounce(amount, 500)
  const etherCost = 0.01 * debouncedAmount;

  console.log(`amount is ${debouncedAmount} and ether cost is ${etherCost}`)

  const overrideEtherValue = ethers.utils.parseEther(etherCost.toString());

  const { config } = usePrepareContractWrite({
    address: goerliAddress,
    abi: contractAbi,
    functionName: "mint",
    args: [
      debouncedAmount
    ],
    overrides: {
      value: overrideEtherValue,
    }
  });

  const {
    data: mintDataFn,
    write: mintTokenFn,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(config);

   // To avoid linting errors; lazy.
   let mintToken: any = mintTokenFn;
   let mintData: any = mintDataFn;

  // Use this to wait for transaction status
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintDataFn?.hash,
  })

  const mintTokens: any = async function() {
    return await mintToken({
      args: [
        amount,
        overrideEtherValue,
      ],
    });
  };

 

  const updateAmount = (e: any) => {
    let value = e.target.value;
    console.log('new amount detected', value);
    value = parseInt(value);
    if(Number.isNaN(value)) {
      value = 0;
    }

    setAmount(value);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mintTokens
        }}
      >
        <input
          aria-label="Number of NFTs"
          onChange={(e) => updateAmount(e)}
          placeholder="1"
          value={amount}
        />
        <button
            onClick={mintTokens}
            disabled={isMintLoading}
          >Mint an NFT</button>
          {isLoading && <p>Minting has begun. Standby for success transaction completion.</p>}
          {isSuccess && <p>Congratulations on minting {debouncedAmount} NFTs. Hash is {mintData.hash}.</p>}
      </form>
    </>
  );
};