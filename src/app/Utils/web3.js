import Web3 from 'web3'

export const ConnectWalllet = async () => {
  const providerUrl =
    'https://goerli.infura.io/v3/af12bb5a50ba4edeba26b0662c4184a8'
  let web3 = new Web3(providerUrl)

  let provider = window.ethereum
  if (typeof provider != 'undefined') {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      console.log('Wallet connected successfully')
      const balance = await getWalletBalance(web3, accounts[0])
      console.log('Wallet balance fetched successfully')
      return { balance: balance, account: accounts[0] }
    } catch (error) {
      console.log('Error:', error)
      return { balance: '0.00', account: '' }
    }
  } else {
    return { balance: '0.00', account: '' }
  }
}

export const getWalletBalance = async (web3, account) => {
  const bal = await web3.eth.getBalance(account)
  let val = await web3.utils.fromWei(bal, 'ether')
  let accountBalance = parseFloat(val).toFixed(4)
  return accountBalance
}
