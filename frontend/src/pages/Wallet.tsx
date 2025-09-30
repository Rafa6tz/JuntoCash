import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getWalletBalance, getWallets } from '../features/wallet/walletSlice'
import { Card } from '@/components/ui/card'

const Wallet = () => {
  const {wallets, balance, isLoading, isError, message} = useSelector((state) => state.wallet)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getWallets())
  }, [dispatch])

  useEffect(() => {
    dispatch(getWalletBalance("795fe0c6-14d3-491c-8a4e-65ea6b04480b"))
  }, [dispatch])

  return (
    <section className='flex flex-col gap-6 items-center bg-background min-h-screen'>
    <Card className='w-5/6 max-h-4/7 bg-green-100 text-card-foreground mt-8 shadow-2xl flex items-center justify-center font-bold text-2xl border-background'>
    <div className='flex flex-col items-center justify-center'>
    <h4>Saldo</h4>
    <p>
      R$ {balance}
    </p>
    </div>
    </Card>
    <select>
      {wallets.map((wallet) => (
        <option key={wallet.id} value={wallet.id}>
          {wallet.name}
        </option>
      ))}
    </select>
    </section>
      
  )
}

export default Wallet