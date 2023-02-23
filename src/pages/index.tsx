import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { Account } from '../components'
import { FreeMint } from '../components/FreeMint'
import { PayableMint } from '../components/PayableMint'
import { SendTransaction } from '../components/SendTransaction'

function Page() {
  const marginStyling = {
    margin: '25px'
  }
  const { isConnected } = useAccount()
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg" style={marginStyling}>
        <h1>My basic minting dApp</h1>
        <h3>brought to you by stevers.x</h3>
        </div>
        <div className="col-lg" style={marginStyling}>
          <ConnectKitButton />
        </div>
      </div>
      {isConnected && 
        <>
          <div className="row">
            <div className="col-lg-4">
              <h1>Account</h1>
              <Account />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <h1>Send Tx</h1>
              <SendTransaction />
            </div>  
            <div className="col-lg-4">
              <h1>Payable Mint</h1>
              <PayableMint />
            </div>
            <div className="col-lg">
              <h1>Free Mint</h1>
              <FreeMint />
            </div>
          </div>
        </>}
    </div>
  )
}

export default Page
