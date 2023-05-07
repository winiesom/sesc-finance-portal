import { Puff } from "react-loader-spinner";

export const PuffSpinner = ({height, width, color, label}) => {
    return (
    <Puff
    height={height}
    width={width}
    color={color}
    ariaLabel={label}
    />
    )
}
