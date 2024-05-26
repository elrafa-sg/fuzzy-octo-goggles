import Alert, { AlertProps } from '@mui/material/Alert'

const Toast = (props: AlertProps) => {

    return (
        <Alert variant='filled' severity={props.severity} className='z-50 absolute right-4 top-4'>
            {props.children}
        </Alert>
    )
}

export { Toast }