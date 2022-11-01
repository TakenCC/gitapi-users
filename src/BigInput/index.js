import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

/**
 * BigInput
 * 
 * @author Taken <takencol@gmail.com>
 * @param {String} placeholder 
 * @param {String} nameIcon 
 * @param {Function} inputHook
 * @returns 
 */
function BigInput({ placeholder, nameIcon, inputHook }) {

    const textInput = useRef(null);

    // Validaciones
    function isValidInput(value) {
        if (value.length <= 4) {
            alert("The value must have more than 4 characters");
            return false;
        }

        if (value === "doublevpartners") {
            alert("The value of the text field cannot be equal to doublevpartners.");
            return false;
        }

        return true;
    }

    function executeHook(event) {
        if (event.keyCode === 13 || event.type === "click" ) {
            var value = "";

            if (isValidInput(textInput.current.value)) {
                value = textInput.current.value;
                inputHook(value);
            }
        } else {
            return false;
        }
    }

    return (
        <div className="big-input form-floating mt-5">
            <input type="text" className="form-control" id="floatingInput" onKeyDown={event => executeHook(event)} ref={textInput} />
            <label for="floatingInput">{placeholder}</label>
            <div className='position-absolute end-0 me-3 translate-middle icon-button' onClick={event => executeHook(event)}>
                <FontAwesomeIcon icon={solid('magnifying-glass')} />
            </div>
            <div id="inputHelp" class="form-text text-start">To search press the enter key or click on the search icon</div>
        </div>        
    );
}

export { BigInput }