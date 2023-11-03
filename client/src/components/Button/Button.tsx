type ButtonProps = {
    children: string,
    type: string,
    click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}

export default function Button({ children, type, click }: ButtonProps)
{
    const classBtnPrimary = "mt-16 py-3.5 px-14 w-full bg-green-700 rounded-full font-semibold text-white";

    const classBtnSecondary = "mt-16 py-3.5 px-14 w-full bg-white border-2 border-black rounded-full font-semibold text-black";

    return (
        <button className={type === "primary" ? classBtnPrimary : classBtnSecondary} onClick={click}>{children}</button>
    )
}