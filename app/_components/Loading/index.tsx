import CircularProgress from "@mui/material/CircularProgress"

const Loading = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-100">
            <CircularProgress size={80} />
        </div>
    )
}

export { Loading }