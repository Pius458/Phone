const Notification = ({message}) => {
    const styling = {
        color : 'red',
        background: 'grey',
        boader: 'solid black'
    }
    return (
        <div style={styling}>{message}</div>
    )
}

export default Notification