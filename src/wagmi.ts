import { getDefaultClient } from 'connectkit'
import { createClient, configureChains } from 'wagmi'
import { mainnet, polygon, goerli, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'

const infuraApiKey = '...'

const { chains, provider, webSocketProvider  } = configureChains(
  [goerli, polygonMumbai],
  [infuraProvider({ apiKey: infuraApiKey })],
)

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    chains,
    provider,
    webSocketProvider,
    appName: 'Basic minting dApp, brought to you by stevers.x',
  })
)