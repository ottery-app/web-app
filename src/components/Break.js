import "../css/Break.css";
import "../css/colors.css";

function Break({display}) {
    return(
        <div className="break">
            <div className="display t3 c3">{display}</div>
            <hr className="line" />
        </div>
    );
}

export default Break;