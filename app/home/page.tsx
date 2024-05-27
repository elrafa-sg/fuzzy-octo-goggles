'use client'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../_helpers/localStorage";

import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Appbar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"

import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<{ email: string, name: string, accessToken: string }>()

  const [drawerOpen, setDrawerOpen] = useState(true)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const storedUserData = LocalStorage.get('userData')
    if (storedUserData) {
      setUserData(storedUserData)
    }
    else {
      router.push('/')
    }
  }, [router])

  const Map = useMemo(() => {
    return dynamic(() => import("../_components/Map"), { ssr: false })
  }, [])

  function logout() {
    LocalStorage.clear()
    router.push('/')
  }

  function toggleMenu() {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div className="h-screen w-screen flex bg-slate-100">
      <Appbar position="fixed" className="h-16 m-h-16">
        <Toolbar className="flex items-center">
          <IconButton onClick={() => toggleMenu()}>
            <MenuIcon className="text-white" />
          </IconButton>
        </Toolbar>
      </Appbar>
      <Map />

      <Drawer open={drawerOpen} anchor={isMobile ? 'top' : 'left'} onClose={() => setDrawerOpen(false)}>
        <div className="h-full min-w-64 p-2 flex flex-col justify-between gap-4">

          <div className="flex flex-col items-center gap-2">
            <Avatar>{userData?.name.substring(0, 1)}</Avatar>
            <Typography textAlign='center' sx={{ fontWeight: 'bold' }}>Bem vindo, {userData?.name}!</Typography>
          </div>

          <Button fullWidth variant="contained" color="error" onClick={() => logout()}>
            LOGOUT
          </Button>
        </div>
      </Drawer>

    </div>
  );
}
