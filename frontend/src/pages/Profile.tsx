import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { FaExchangeAlt, FaPlus, FaUserFriends } from 'react-icons/fa'

const Profile = () => {
    const [walletModal, setWalletModal] = useState(false)
    const [shareModal, setShareModal] = useState(false)

    const openWalletModal = () =>{
        setWalletModal(!walletModal)
    }

    const openShareModal = () => {
        setShareModal(!shareModal)
    }


  return (
    <>
    {walletModal && (
            <div className='absolute flex items-center justify-center h-full w-full'>
                <div onClick={openWalletModal} className='bg-black h-full w-full z-10 absolute opacity-70'></div>
                <Card className='bg-background rounded-xl z-20 relative w-4/5 min-h-56'>
                <Button onClick={openWalletModal} variant="destructive" className='absolute right-0 top-0 m-2' size="sm">X</Button>
                    <CardHeader className='flex justify-center items-center text-center'>
                        <CardTitle className='w-3/4'>Crie uma Nova Carteira</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='flex flex-col items-center gap-2 w-full'>
                            <Label className='font-semibold text-sm'>Nome</Label>
                            <Input type='text' placeholder='Carteira do Casal'/>
                        <Button className='mt-4 font-bold' size="lg">Criar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )}
        {shareModal && (
            <div className='absolute flex items-center justify-center h-full w-full'>
                <div onClick={openShareModal} className='bg-black h-full w-full z-10 absolute opacity-70'></div>
                <Card className='bg-background rounded-xl z-20 relative w-4/5 min-h-56'>
                <Button onClick={openShareModal} variant="destructive" className='absolute right-0 top-0 m-2' size="sm">X</Button>
                    <CardHeader className='flex justify-center items-center text-center'>
                        <CardTitle className='w-3/4'>Compartilhe a Carteira</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='flex flex-col items-center gap-2 w-full'>
                            <Label className='font-semibold text-sm'>E-mail do usuário</Label>
                            <Input type='email' placeholder='usuario@email.com'/>
                        <Button className='mt-4 font-bold' size="lg">Compartilhar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )}
    <section className='flex flex-col gap-8 items-center justify-center bg-background min-h-screen'>
        
        <Button size="lg" className='font-bold text-lg' onClick={openWalletModal}>
            <FaPlus/>Nova Carteira
        </Button>

        <Button onClick={openShareModal} size="lg" className='font-bold text-lg' >
            <FaUserFriends/>Compartilhar Carteira
        </Button>
    </section>
        </>
  )
}

export default Profile