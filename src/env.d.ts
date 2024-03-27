/// <reference types="astro/client" />
declare global {
    interface EfovElement extends HTMLInputElement {
        efov: {
            delay: number; // Uses the value in data-efov and the data-efov-form as fallback
            isValid: boolean; // Keeps track if the input is Valid but not in realtime for that use V that performs the validation and returns if it ir valid, isValid only stores latest validity check

            C?: function[]; // Custom Validity functions, return a string if it fails a check accepts a single string. if not can Add strings to efov.E
            E: string[]; // Error List
            T: HTMLElement; // Target Element to insert the Error List
            F: EfovElement; // Element to Focus if validity fails. Reduces code size
            I?: function; // Function that checks for input with the corresponding delay can be null if only checks on submit
            V: () => boolean; // Validates input and returns if it isValid

            notTrim?: boolean; // true if u don't want to trim the input before checking its validity

            maxlength?: string; // Converted to int, allows user to type more than maxlength if no maxlength is provided but displays maxlengthMSG if it is too long
            maxlengthMSG?: string; // Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            minlengthMSG?: string;// Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            patternMSG?: string;// Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            minMSG?: string;// Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            maxMSG?: string;// Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            stepMSG?: string;// Validity Error message if none is povided will use default browser message (which is localized for the user by the browser)
            requiredMSG?: string; // checks if it has a value, in case of fieldset checks if at least one of the radio has a value checked
            typeMSG?: string; // Validity Error Message, if it exists validates if file type selected corresponds to the accept attribute of the input, accept must be only file extensions separated by commas. Replaces {filename} for actual filename
            size?: string; // Converted to float representing max file size in MB. Validates the individual file size, if it doesn't pass uses sizeMSG. Replaces {filename} for actual filename
            sizeMSG?: string; // Validity Error message
            totalSize?: string; // Converted to float representing max file size in MB. Validates the total file size of all files selected only useful if input has attribute multiple, if it doesn't pass uses totalSizeMSG
            totalSizeMSG?: string; // Validity Error message
        };
    }
}
export {};