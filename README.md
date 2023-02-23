# Sample minting dApp
The purpose of this dAapp is to demonstrate how to make a smart contract call using wagmi when that smart contract uses a payable minting function.

Make sure you're pointing to the Goerli testnet.

This is a [wagmi](https://wagmi.sh) + [ConnectKit](https://docs.family.co/connectkit) + [Next.js](https://nextjs.org) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

# Getting Started

Update `infuraApiKey` in `/src/wagmi.ts` to yours.

Run `npm run dev` in your terminal, and then open [localhost:3000](http://localhost:3000) in your browser.

## Noteworthy
If you're going to use this against the existing contract, please note that the freeMint wont work unless your address is approved for a specific role. (Submit an issue request with your wallet address and I'm happy to add you). Otherwise, point this to your own smart contract and functions

## Author
stevers.x