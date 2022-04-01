import "../css/SelectedInfo.css";
import "../css/Buttons.css";

SelectedInfo.defaultProps = {
    display: "nothing has been selected"
}

function SelectedInfo( {display, handleClick}) {
    return (
        <div className="selected-info c4 s1">
            <div className="side-bar c5"></div>
            <div className="display">{display}</div>
            <div className="minor-button c2 b0" onClick={handleClick}>Done</div>
        </div>
    );
}

export default SelectedInfo;