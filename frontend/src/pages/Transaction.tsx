    import { Card } from '@/components/ui/card'
    import { Input } from '@/components/ui/input'
    import { Label } from '@radix-ui/react-label'
    import React, { useEffect } from 'react'
    import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa'
    import { useDispatch, useSelector } from 'react-redux'
    import { getExpenseCategories, getIncomeCategories } from '../features/categories/categorieSlice'
    import { createTransaction } from '@/features/transaction/transactionSlice'

    const Transaction = () => {
        const { incomeCategories, expenseCategories } = useSelector((state) => state.categories)
        const {selectedWallet} = useSelector((state) => state.wallet)
        const [formData, setFormData] = React.useState({
            amount: '',
            description: '' || null,
            category_id: incomeCategories.length > 0 ? incomeCategories[0].id : '',
        })

        const dispatch = useDispatch()

        useEffect(() => {
            if (selectedWallet?.id){
                dispatch(getIncomeCategories(selectedWallet.id))
                dispatch(getExpenseCategories(selectedWallet.id))
            }
        }, [dispatch, selectedWallet])

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("ENVIANDO:", formData);
            if (selectedWallet?.id){
                dispatch(createTransaction({ ...formData, type: 'income' }))
            }
        }

        const handleSubmitExpense = (e) => {
            e.preventDefault();
            console.log("ENVIANDO:", formData);
            if (selectedWallet?.id){
                dispatch(createTransaction({ ...formData, type: 'expense' }))
                setFormData({
                    amount: '',
                    description: '' || null,
                    category_id: expenseCategories.length > 0 ? expenseCategories[0].id : '',
                })
            }
        }

    return (
        <section className='bg-background py-32 flex flex-col justify-center items-center gap-4'>
            <Card className='bg-green-100 p-4 w-6/7 min-h-64 text-xs border-green-200'>
                <h3 className='text-base font-bold pt-2 text-green-700 flex items-center gap-2'><FaRegArrowAltCircleUp/> Adicionar Receita</h3>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <Label htmlFor='amount'>Quantia</Label>
                    <Input onChange={handleChange} type='number' id='amount' name='amount' value={formData.amount} className='bg-white'/>
                    <Label htmlFor='description'>Descrição</Label>
                    <Input onChange={handleChange} type="text" name='description' id='description' value={formData.description} className='bg-white'/>
                    <select onChange={handleChange}
  key={incomeCategories.length}
  id="category_id"
  name='category_id'
  value={formData.category_id}
  required
  className="p-2 border border-gray-300 rounded bg-white w-full focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring"
>
<option value="" disabled>Selecione uma categoria</option>
  {incomeCategories.map((categorie) => (
    <option key={categorie.id} value={categorie.id}>
      {categorie.name}
    </option>
  ))}
</select>
                    <button type='submit' className='text-white font-bold p-2 rounded bg-green-600'>Adicionar</button>
                </form>
            </Card>
            <Card className='bg-red-100 p-4 w-6/7 min-h-64 text-xs border-red-200'>
                <h3 className='text-base font-bold pt-2 text-red-700 flex items-center gap-2'><FaRegArrowAltCircleDown/> Adicionar Despesa</h3>
                <form onSubmit={handleSubmitExpense} className='flex flex-col gap-2'>
                    <Label htmlFor='amount'>Quantia</Label>
                    <Input onChange={handleChange} type='number' id='amount' name='amount' value={formData.amount} className='bg-white'/>
                    <Label htmlFor='description'>Descrição</Label>
                    <Input onChange={handleChange} type="text" name='description' id='description' value={formData.description} className='bg-white'/>
                    <select onChange={handleChange}
  key={expenseCategories.length}
    id="category_id"
    name='category_id'
    value={formData.category_id}
    className="p-2 border border-gray-300 rounded bg-white w-full focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring"
>
    <option value="" disabled>Selecione uma categoria</option>
  {expenseCategories.map((categorie) => (
    <option key={categorie.id} value={categorie.id}>
      {categorie.name}
    </option>
  ))}
</select>
                    <button type='submit' className='text-white font-bold p-2 rounded bg-red-600'>Adicionar</button>
                </form>
            </Card>
        </section>
    )
    }

    export default Transaction