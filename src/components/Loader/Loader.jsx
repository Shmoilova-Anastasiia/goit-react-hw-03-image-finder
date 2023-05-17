import { TailSpin } from "react-loader-spinner";
import { LoaderStyled } from "./Loader.styled";

export const Loader = () => {
    return (
        <LoaderStyled>
            <TailSpin/>
        </LoaderStyled>
    )
}