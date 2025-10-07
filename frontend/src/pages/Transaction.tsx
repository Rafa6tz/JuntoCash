import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const Transaction = () => {

    const dispatch = useDispatch()

    

  return (
    <section className='bg-background py-32 flex flex-col justify-center items-center gap-4'>
        <Card className='bg-green-100 p-4 w-6/7 min-h-64 text-xs border-green-200'>
            <h3 className='text-base font-bold pt-2 text-green-700 flex items-center gap-2'><FaRegArrowAltCircleUp/> Adicionar Receita</h3>
            <form className='flex flex-col gap-2'>
                <Label htmlFor='amount'>Quantia</Label>
                <Input type='number' id='amount' name='amount' className='bg-white'/>
                <Label htmlFor='description'>Descrição</Label>
                <Input type="text" name='description' id='description' className='bg-white'/>
                <select id='categorie'  className='p-2 border border-gray-300 rounded bg-white w-full focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring'>
                    <option value="income" id=''>Salário</option>
                    <option value="expense">Pix</option>
                </select>
                <button type='submit' className='text-white p-2 rounded bg-green-600'>Add Transaction</button>
            </form>
        </Card>
        <Card className='bg-red-100 p-4 w-6/7 h-64 text-xs border-red-200'>
            <h3 className='text-base font-bold pt-2 text-red-700 flex items-center gap-2'><FaRegArrowAltCircleDown/>Adicionar Gasto</h3>
            <form className='flex flex-col gap-2'>
                <input type="number" placeholder='Amount' className='p-2 border border-gray-300 rounded'/>
                <input type="text" placeholder='Description' className='p-2 border border-gray-300 rounded'/>
                <select className='p-2 border border-gray-300 rounded'>
                    <option value="income">Categoria: </option>
                    <option value="expense">Expense</option>
                </select>
                <button type='submit' className='text-white p-2 rounded bg-red-600'>Add Transaction</button>
            </form>
        </Card>
    </section>
  )
}

export default Transaction