import { useContext } from "react";
import { GameContext } from "../App";



export const clearGameContext = () => {
    const {setOtherPlayers, setPlayer } = useContext(GameContext);
    
    return <></>
}

export default clearGameContext;