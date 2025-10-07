import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWallets, setSelectedWallet } from '../features/wallet/walletSlice'
import { FaWallet } from 'react-icons/fa'

const WalletNav = () => {
    const {wallets} = useSelector((state) => state.wallet)
    
      const dispatch = useDispatch()
    
       const handleChange = (event) => {
          const newWalletId = event.target.value
          dispatch(setSelectedWallet(newWalletId))
        }
    
      useEffect(() => {
        dispatch(getWallets())
      }, [dispatch])
  return (
    <nav className='fixed inset-0 left-0 top-0 w-full p-4 bg-white border-b border-border text-secondary-foreground flex justify-between items-center max-h-24'>
      <div className='flex'>
      <h2 className='font-bold text-lg'>Junto</h2>
      <h2 className='font-light text-lg'>Cash</h2>
      </div>
      <div className='flex px-4 gap-x-10 items-center'>
      <div className='flex w-24 flex-col items-center bg-secondary rounded-xl p-2 font-semibold'>
        <p className='flex justify-center items-center gap-1 overflow-hidden'><FaWallet/>Wallet:</p>
      <select className='w-full' onChange={handleChange}>
      {wallets.map((wallet) => (
        <option key={wallet.id} value={wallet.id}>
          {wallet.name}
        </option>
      ))}
    </select>
      </div>
      <p>Mês:</p>
      </div>
    </nav>
  )
}

export default WalletNav