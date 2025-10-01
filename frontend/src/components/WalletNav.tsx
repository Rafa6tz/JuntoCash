import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWallets, setSelectedWallet } from '../features/wallet/walletSlice'

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
    <nav className='w-full p-4 bg-white border-b border-border text-secondary-foreground flex justify-between items-center'>
      <h2 className='font-bold text-lg'>JuntoCash</h2>
      <div className='flex px-4 gap-x-10 items-center'>
      <div className='flex flex-col items-center bg-secondary rounded-xl p-2 font-semibold'>
        <p>Wallet:</p>
      <select onChange={handleChange}>
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