'use client'
import { useRouter } from "next/navigation";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string,
    password: string,
    name: string
}

const userFormSchema: z.ZodType<Inputs> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(5)
});


const SignUpPage = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(userFormSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => signUp(data)

    async function signUp(data: Inputs) {
        const dataobj = JSON.stringify({ email: data.email, password: data.password, name: data.name })

        console.log('\n\ndataobj', dataobj)

        const res = await fetch('/api/sign-up',
            {
                method: 'POST',
                body: JSON.stringify(dataobj)
            })

        const jsonResponse = await res.json()
        console.log('jsonResponse', jsonResponse)

        local
        //router.push('/home')
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center pt-28">
            <form className="flex flex-col gap-4 bg-white p-4 shadow-sm w-80 rounded-md"
                onSubmit={handleSubmit(onSubmit)}
                id="formUsuario"
            >
                <div className='flex flex-col'>
                    <div className="flex items-center justify-between">
                        <label className="text-black font-bold"
                            htmlFor="email"
                        >
                            Email:</label>
                        <input {...register('email')} name="email" type="email" className="bg-slate-200 text-black p-1 outline-none" />

                    </div>

                    <legend className='font-bold text-red-400 text-right'>{errors.email?.message && <p>{errors.email?.message}</p>}</legend>
                </div>

                <div className='flex flex-col'>
                    <div className="flex items-center justify-between">
                        <label className="text-black font-bold"
                            htmlFor="password"
                        >
                            Senha:</label>
                        <input {...register('password')} name="password" type="password" className="bg-slate-200 text-black p-1 outline-none" />
                    </div>
                    <legend className='font-bold text-red-400 text-right'>{errors.password?.message && <p>{errors.password?.message}</p>}</legend>
                </div>


                <div className='flex flex-col'>
                    <div className="flex items-center justify-between">
                        <label className="text-black font-bold"
                            htmlFor="name"
                        >
                            Nome:</label>
                        <input {...register('name')} name="name" type="text" className="bg-slate-200 text-black p-1 outline-none" />
                    </div>

                    <legend className='font-bold text-red-400 text-right'>{errors.name?.message && <p>{errors.name?.message}</p>}</legend>
                </div>

                <button form="formUsuario" type='submit'
                    className="p-2 rounded text-white font-bold bg-blue-300 outline-none">
                    CADASTRAR
                </button>

                <button onClick={() => router.push('/')} className="p-2 rounded text-white font-bold bg-red-300 outline-none">
                    CANCELAR
                </button>

            </form>
        </div>
    )
}

export default SignUpPage