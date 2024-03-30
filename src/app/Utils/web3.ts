import Web3 from 'web3'
import Cryat from './abi/Cryat.json'

// const providerUrl =
//   'https://goerli.infura.io/v3/af12bb5a50ba4edeba26b0662c4184a8'

let web3: any
// let contractAddress = '0xE20E5a307737DEE4Ed7612799223C88ABd9EF543'
let contractAddress = '0xbbc930ca8593eb30f663f4a4bd6c187d6fe0e28b'

export const ConnectWalllet = async () => {
  let provider = window.ethereum
  if (typeof provider != 'undefined') {
    web3 = new Web3(provider)
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      const chainId = await web3.eth.getChainId()
      const balance = await getWalletBalance(accounts[0])
      console.log('Wallet balance fetched successfully',chainId.toString())
      return { balance: balance, account: accounts[0],chainId:chainId.toString() }
    } catch (error) {
      console.log('Error:', error)
      return { balance: '0.00', account: '' }
    }
  } else {
    return { balance: '0.00', account: '' }
  }
}

export const getWalletBalance = async (account: string) => {
  const bal = await web3.eth.getBalance(account)
  let val = web3.utils.fromWei(bal, 'ether')
  let accountBalance = parseFloat(val).toFixed(4)
  return accountBalance
}

export const getContract = async () => {
  let contract = new web3.eth.Contract(Cryat.abi, contractAddress)
  return contract
}

export const sendTransaction = async (walletAddress: string, value: string) => {
  const contract = await getContract()
  try {
    const tx = await contract.methods.sendToken().send({
      from: walletAddress,
      value: web3.utils.toWei(value, 'ether'),
    })
    console.log(walletAddress, value)
    console.log('transaction:', tx)
  } catch (error) {
    console.log(error)
  }
}
