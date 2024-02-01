'use client'
import Image from 'next/image'
import { JSX, SVGProps, useState } from 'react'
import { ConnectWalllet } from './Utils/web3'

export default function Home() {
  const [walletLoading, setWalletLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalance, setWalletBalance] = useState('0.00')

  const handleConnectWalllet = async () => {
    if (walletLoading) return
    setWalletLoading(true)
    const result = await ConnectWalllet()
    if (result.account != '') {
      setWalletAddress(result.account)
      setWalletConnected(true)
      setWalletBalance(result.balance)
    }
    setWalletLoading(false)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900'>
      <div className='w-3/6'>
        <div className='bg-[#a17914] py-4 flex items-center justify-center rounded-t-lg'>
          <h1 className='text-3xl'>Cryat - Swap ETH to Naira</h1>
        </div>
        <div className='bg-slate-950 p-6 rounded-b-lg'>
          {walletConnected ? (
            <WalletDetails address={walletAddress} balance={walletBalance} />
          ) : (
            <button
              className='bg-[#1ba34d] hover:bg-[#12803a] py-2 w-full rounded-lg flex items-center justify-center'
              onClick={handleConnectWalllet}
            >
              {walletLoading ? (
                <>Connecting...</>
              ) : (
                <>
                  <WalletIcon className='h-5 w-5 mr-2' />
                  Connect wallet
                </>
              )}
            </button>
          )}

          <div className='pt-6'>
            <label htmlFor='ethAmount'>Amount in ETH</label>
            <input
              type='number'
              name='ethAmount'
              className='w-full rounded-sm text-white py-1 px-2 mt-2 bg-slate-900'
              id=''
              placeholder='0.1'
            />
          </div>
          <div className='pt-6'>
            <label htmlFor='fiatAmount'>Equivalent in Naira</label>
            <input
              type='number'
              name='fiatAmount'
              className='w-full rounded-sm text-white p-2 mt-2 bg-slate-900'
              id=''
              placeholder='250000'
            />
          </div>
          <div className='pt-6'>
            <label htmlFor='banks'>Select Bank</label>
            <br />
            <select
              name='banks'
              id='banks'
              className='w-full rounded-sm text-white p-2 mt-2 bg-slate-900'
              defaultValue={'default'}
            >
              <option value='default' className=''>
                Select a bank
              </option>
              <option value='access' className=''>
                Access Bank
              </option>
              <option value='opay' className=''>
                Opay
              </option>
            </select>
          </div>
          <div className='pt-6'>
            <label htmlFor='accountNumber'>Bank Account Number</label>
            <input
              type='number'
              name='accountNumber'
              className='w-full rounded-sm text-white p-2 mt-2 bg-slate-900'
              id=''
              placeholder='8921764523'
            />
          </div>
          <button className='bg-[#2371ed] hover:bg-[#1855b8] py-2 mt-6 w-full rounded-lg flex items-center justify-center'>
            Swap
          </button>
        </div>
      </div>
    </main>
  )
}

function WalletDetails({
  address,
  balance,
}: {
  address: string
  balance: string
}) {
  const trimAddress = () => {
    return `${address.substring(0, 7)}...${address.substring(
      address.length - 5
    )}`
  }
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='bg-slate-900 py-2 px-4 mb-2 rounded-lg hover:cursor-pointer'>
        {trimAddress()}
      </div>
      <h1 className='text-3xl'>{balance} ETH</h1>
      <h2>#2,500,000</h2>
    </div>
  )
}

function WalletIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 12V7H5a2 2 0 0 1 0-4h14v4' />
      <path d='M3 5v14a2 2 0 0 0 2 2h16v-5' />
      <path d='M18 12a2 2 0 0 0 0 4h4v-4Z' />
    </svg>
  )
}
