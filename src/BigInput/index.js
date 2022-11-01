import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function BigInput({ placeholder, nameIcon, inputHook }) {

    // Validaciones
    function isValidInput(value) {
        if (value.length <= 4) {
            return false;
        }

        if (value === "doublevpartners") {
            alert("The value of the text field cannot be equal to doublevpartners.");
            return false;
        }

        return true;
    }

    return (
        <div className="big-input form-floating mt-5">
            <input type="text" className="form-control" id="floatingInput" onInputCapture={e => { if (isValidInput(e.target.value)) { inputHook(e.target.value) } else { inputHook("") } }} />
            <label for="floatingInput">{placeholder}</label>
            <FontAwesomeIcon className="position-absolute top-50 end-0 me-3 translate-middle" icon={solid('magnifying-glass')} />
        </div>
    );
}

export { BigInput }