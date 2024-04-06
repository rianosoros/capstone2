import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TamagotchiApi from "../../api";

function Logout() {
    const history = useHistory();

    useEffect(() => {
        TamagotchiApi.logout();
        history.push("/");
    }, [history]);

    return null;
}

export default Logout;