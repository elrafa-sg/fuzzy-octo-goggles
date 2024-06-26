'use client'
import { useRouter } from "next/navigation";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, SubmitHandler } from 'react-hook-form'
import { LocalStorage } from './_helpers/localStorage'
import { useToast } from "./_hooks/useToast";
import { useLoading } from "./_hooks/useLoading";

import Paper from '@mui/material/Paper'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";

type Inputs = {
  email: string,
  password: string,
}

const userFormSchema: z.ZodType<Inputs> = z.object({
  email: z.string().trim().toLowerCase().email({ message: "Email inválido" }),
  password: z.string().trim().min(8, { message: "Sua senha deve conter no mínimo 8 caracteres." }),
});


const IndexPage = () => {
  const router = useRouter()
  const { setToastData, showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const { setLoading } = useLoading()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(userFormSchema)
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => signIn(data)

  async function signIn(data: Inputs) {
    setLoading(true)
    const dataobj = JSON.stringify({ email: data.email, password: data.password })

    const res = await fetch('/api/sign-in',
      {
        method: 'POST',
        body: JSON.stringify(dataobj)
      })

    const userData = await res.json()
    if (res.status === 200) {
      LocalStorage.set('userData', userData)
      router.push('/home')
    }
    else {
      setToastData({ severity: 'error', children: userData.message })
      showToast()
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center pt-28 bg-slate-100">
      <Paper elevation={1} className="bg-white p-4 w-80">
        <form className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          id="formUsuario">
          <TextField fullWidth label="Email"  {...register('email')} type="email"
            helperText={errors.email?.message} error={errors.email != null} />

          <TextField fullWidth label="Senha" type={showPassword ? 'text' : 'password'}
            {...register('password')}
            helperText={errors.password?.message}
            error={errors.password != null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button form="formUsuario" type='submit' variant="contained">
            CONECTAR
          </Button>

          <Divider>
            Não tem uma conta ?
          </Divider>

          <Button onClick={() => router.push('/sign-up')} variant="contained" color="secondary">
            CADASTRE-SE
          </Button>
        </form>
      </Paper>
    </div >
  )
}

export default IndexPage 