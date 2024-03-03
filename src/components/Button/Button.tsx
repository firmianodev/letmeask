type ButtonProps = {
    text?: String;
}

export function Button(props: ButtonProps) {
    return (
        <button>{props.text || 'Default'}</button>
    )
}