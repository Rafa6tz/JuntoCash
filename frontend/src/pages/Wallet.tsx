import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWalletBalance } from '../features/wallet/walletSlice'
import { Card } from '@/components/ui/card'

const Wallet = () => {
  const {wallets, selectedWallet, balance, isLoading, isError, message} = useSelector((state) => state.wallet)

  const dispatch = useDispatch()


  useEffect(() => {
    if (selectedWallet){
      dispatch(getWalletBalance(selectedWallet))
    }
  }, [dispatch, selectedWallet])

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
    </section>
      
  )
}

export default Wallet