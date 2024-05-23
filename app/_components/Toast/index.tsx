type ToastProps = {
    color: string,
    message: string
}

const Toast = (props: ToastProps) => {
    const { color, message } = props

    function getColors(color: string) {
        let colors = `z-50 absolute right-4 top-4 p-2 rounded-md w-80 `
        switch (color) {
            case 'blue':
                colors += 'bg-blue-400'
                break;
            case 'green':
                colors += 'bg-green-400'
                break;
            case 'red':
                colors += 'bg-red-400'
                break;
            case 'yellow':
                colors += 'bg-yellow-400'
                break;
        }

        return colors
    }

    return (
        <div className={getColors(color)}>
            <p className="text-white font-bold">
                {message}
            </p>
        </div>
    )
}

export { Toast }