import AreaInput, {AREA} from "./AreaInput";
import DateInput, {DATE} from "./DateInput";
import LocationInput, {LOCATION} from "./LocationInput";
import NumberInput, {NUMBER} from "./NumberInput";
import OptionsInput, {OPTIONS} from "./OptionsInput";
import PasswordInput, {PASSWORD} from "./PasswordInput";
import PhoneInput, { PHONE } from "./PhoneInput";
import RadioInput, {RADIO} from "./RadioInput";
import TextInput, {TEXT} from "./TextInput";
import TimeInput, {TIME} from "./TimeInput";
import AbrCheckBoxInput, {ABRCHECKBOX} from "./AbrCheckBoxInput";
import EmailInput, {EMAIL} from "./EmailInput";
import { createElement } from "react";
import CheckboxInput, { CHECKBOX } from "./CheckboxInput";
import ImageInput, { PICTURE } from "./ImageInput";

export const INPUT = {};
INPUT[AREA] = AreaInput;
INPUT[DATE] = DateInput;
INPUT[LOCATION] = LocationInput;
INPUT[NUMBER] = NumberInput;
INPUT[OPTIONS] = OptionsInput;
INPUT[PASSWORD] = PasswordInput;
INPUT[RADIO] = RadioInput;
INPUT[TEXT] = TextInput;
INPUT[TIME] = TimeInput;
INPUT[PHONE] = PhoneInput;
INPUT[ABRCHECKBOX] = AbrCheckBoxInput;
INPUT[EMAIL] = EmailInput;
INPUT[CHECKBOX] = CheckboxInput;
INPUT[PICTURE] = ImageInput;

export const TYPE = {}
Object.keys(INPUT).forEach((key)=>{
    TYPE[key] = key;
});

export default function Input(props) {
    return createElement(INPUT[props.type || TYPE[TEXT]], props);
}