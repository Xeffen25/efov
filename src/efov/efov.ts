const EFOV_PREVENT_TOOLTIP = false; // Will show the custom list of errors to the browser tooltip if false too
const EFOV_VALID_CLASS = 'efov-valid';
const EFOV_INVALID_CLASS = 'efov-invalid';
const EFOV_SHOW_CLASS = 'efov-show';
const EFOV_HIDELIST_CLASS = 'efov-hidden';
const EFOV_TARGET_ATTRIBUTE = 'aria-errormessage';
const EFOV_ERROR_ELEMENT = '<li class="efov-error-li">{error}</li>';

function addMSG(input: EfovElement, msg: any) {
  input.efov.isValid = false;
  if (msg && msg != undefined) {
    input.efov.E.push(msg);
  }
}

function manageAriaLiveForErrorList(errorList: HTMLElement, hasErrors: boolean) {
  if (hasErrors) {
    errorList.setAttribute('aria-live', 'assertive');
    errorList.classList.add(EFOV_SHOW_CLASS);
    errorList.classList.remove(EFOV_HIDELIST_CLASS);
  } else {
    errorList.removeAttribute('aria-live');
    errorList.classList.add(EFOV_HIDELIST_CLASS);
    errorList.classList.remove(EFOV_SHOW_CLASS);
  }
}
function updateErrorList(input: EfovElement) {
  const newErrorContent = input.efov.E.map(error =>
    EFOV_ERROR_ELEMENT.replaceAll('{error}', error)
  ).join('');
  if (input.efov.T.innerHTML !== newErrorContent) {
    manageAriaLiveForErrorList(input.efov.T, input.efov.E.length > 0);
    input.efov.T.innerHTML = newErrorContent;    
  }
}

function markInputAsInvalid(input: EfovElement) {
  if (input.efov.E.length === 0) {
    // if no errors in efovE add default browser Message to list to use that instead  
    addMSG(input, input.validationMessage);
  }else {
    input.setCustomValidity(input.efov.E.join("\n"));
  }
  input.classList.add(EFOV_INVALID_CLASS);
  input.classList.remove(EFOV_VALID_CLASS);
  input.setAttribute('aria-invalid', 'true');
  updateErrorList(input);
  updateListener(input, 0);
}
function markInputAsValid(input: EfovElement) {
  input.classList.add(EFOV_VALID_CLASS);
  input.classList.remove(EFOV_INVALID_CLASS);
  input.setAttribute('aria-invalid', 'false');
  updateErrorList(input);
  updateListener(input, input.efov.delay);
}

function updateInput(input: EfovElement) {
  validateInput(input);
  if (input.efov.isValid) {
    markInputAsValid(input);
  } else {
    markInputAsInvalid(input);
  }
  updateErrorList(input);
  return input.efov.isValid;
}

function validateInput(input: EfovElement) { 
  input.efov.E = [];
  input.efov.isValid = true;
  let value = input.value;
  const validity = input.validity;
  if (!input.efov.notTrim && value){
    value = value.trim();
  }
  if (input.efov.requiredMSG && input.validity.valueMissing) {
    addMSG(input, input.efov.requiredMSG);
  } else{
    switch (input.type) {
      case 'text':
      case 'password':
      case 'textarea':
      case 'tel':
      case 'search':
      case 'email':
      case 'url':
        if (input.efov.maxlength && value.length > parseInt(input.efov.maxlength, 10)) {
          addMSG(input, input.efov.maxlengthMSG);
        }
        if (validity.tooShort) {
          addMSG(input, input.efov.minlengthMSG);
        }
        if (input.type == 'email' || input.type == 'url' || input.pattern) {
          if (validity.patternMismatch) {
            addMSG(input, input.efov.patternMSG);
          }
        }
        break;

        case 'file':
          let totalFileSize = 0;
          const acceptExtensions = input.accept.split(',').map(ext => ext.trim().toLowerCase());

          const maxSizeBytes = input.efov.size ? parseFloat(input.efov.size) * 1024 * 1024 : null;
          const maxTotalSizeBytes = input.efov.totalSize ? parseFloat(input.efov.totalSize) * 1024 * 1024 : null;
          if (input.files) {
            Array.from(input.files).forEach(file => {
              if (maxSizeBytes && file.size > maxSizeBytes) {
                const message = input.efov.sizeMSG?.replace("{filename}", file.name) ?? undefined;
                addMSG(input, message);
              }
              totalFileSize += file.size;
              if (input.efov.typeMSG) {
                const fileExtension = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
                if (!acceptExtensions.includes(fileExtension)) {
                  addMSG(input, input.efov.typeMSG.replace("{filename}", file.name));
                }
              }
            });
          }
          // Total size validation
          if (maxTotalSizeBytes && totalFileSize > maxTotalSizeBytes) {
            addMSG(input, input.efov.totalSizeMSG);
          }
          break;

      case 'range':
      case 'number':
      case 'date':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'time':
        if (input.min && validity.rangeUnderflow) {
          addMSG(input, input.efov.minMSG);
        }
        if (input.max && validity.rangeOverflow) {
          addMSG(input, input.efov.maxMSG);
        }
        if (input.step && validity.stepMismatch) {
          addMSG(input, input.efov.stepMSG);
        }
        break;
    
      case 'radio':
        let anySelected = false;
        input.querySelectorAll('input[type="radio"]').forEach(input => {
          const radio = input as HTMLInputElement;
          if (radio.checked){
            anySelected = true;
          }
        });
        if (!anySelected) {
          addMSG(input, input.efov.requiredMSG);
        }
        break;
    }
  }
  // custom validations functions added
  if (input.efov.C) {
    input.efov.C.forEach(customFunc => {
      const result = customFunc();
      if(result) {
          addMSG(input, result);
      }
    });
  }
  if (!input.validity.valid) {
    input.efov.isValid = false;
  }
  return input.efov.isValid;
}

function updateListener(input: EfovElement, delay: number) {
  input.removeEventListener('input', input.efov.I);
  input.efov.I = () => updateInput(input);
  if (delay === 0) {
      input.addEventListener('input', input.efov.I);
  } else if (delay > 0) {
      let timeoutId: any = null; // fix any
      input.efov.I = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => updateInput(input), delay);
      };
      input.addEventListener('input', input.efov.I);
  }
}

function loadEFOV(input: EfovElement) {
  input.efov = JSON.parse(input.getAttribute('data-efov')!); // expects input | textarea | fieldset to have a data-efov
  input.efov.T = document.getElementById(input.getAttribute(EFOV_TARGET_ATTRIBUTE)!)!; // expects input | textarea | fieldset to have the EFOV_TARGET_ATTRIBUTE with the id of the element where to insert the error messages
  input.efov.E = []; // Aray of Error list of strings, if empty the input is valid for EFOV
  input.efov.F = input;
  input.efov.isValid = false; 
  if (input.nodeName === 'FIELDSET') {
    input.type = 'radio';
    input.efov.F = input.querySelector('input[type="radio"]')!;
  }
  input.efov.V = () => validateInput(input);
}

function initializeEFOV() {
  document.querySelectorAll('input[data-efov-form], textarea[data-efov-form], fieldset[data-efov-form]').forEach(element => {
    const input = element as EfovElement;
    loadEFOV(input);
    if (input.efov.delay == undefined) {
      input.efov.delay = parseInt(input.getAttribute('data-efov-form')!, 10); // expects the data-efov-form to be an int
    }
    updateListener(input, input.efov.delay);
  });
  document.querySelectorAll('form[data-efov-form]').forEach(selected => {
    const form = selected as HTMLFormElement;
    if (EFOV_PREVENT_TOOLTIP) {
      form.setAttribute('novalidate', '');
    }
    const formDelay = parseInt(form.getAttribute('data-efov-form')!, 10); // expects the data-efov-form to be an int
    form.querySelectorAll('input[data-efov], textarea[data-efov], fieldset[data-efov]').forEach(element => {
      const input = element as EfovElement;
      loadEFOV(input);
      if (input.efov.delay == undefined) {
        input.efov.delay = formDelay;
      }
      updateListener(input, input.efov.delay);
    });
    form.addEventListener('submit', event => {
      form.querySelectorAll('input[data-efov], textarea[data-efov], fieldset[data-efov]').forEach(element => {
        const input = element as EfovElement;
        updateInput(input);
      });
      const invalidInput = form.querySelector('.efov-invalid') as EfovElement;
      if (invalidInput !== null) {
        event.preventDefault();
        invalidInput.efov.F.focus();
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initializeEFOV);

/* if the daa-efov ir present on an input it will attempt to add the errors to the ulError list that should be in the aria-describedby="id"
if the form has a data-efov-form when attempting to submit it, it will instead check if there are any elements with the class EFOV_INVALID_CLASS or if input.validity.valid == false, 
if no elements inside the form have meet the criteria if will follow its default behaviour
if data-efov is empty it will just perform the checks in and place the messages in the describedby
*/
// TODO: add the errors to the customValidity() too si that the pseudo-class is set for :valid :invalid ant if the browser tooltip is enabled it shows the customChecks as it won't if not
// TODO add flag at the top like delay to show or not the customValidity Message on submit with our errorE list instead?
// TODO: check if there should be an aria-role on the ul list or something like that to indicate it is an error list for the input, maybe tooltip, try to check with the native error if it has an exixting aria
// TODO: the return of custom functions can be null, undefined or false to signalize they passed the check, and if not it expects an arry of strings(must be array of strings) to add to the error list, the text is pased as html inside the li element
// TODO: create a page that helps generate a form, json or input where u can also add classes, id or whatever
// TODO: add schema to docs
// TODO: When adding the requiredMSG the input should still have a required attribut for screen readers and in most forms only thi optional Value should be marked as optional not mark the required fields. 

/* JSON schema
the input must(requires to) have a aria-describedby="id" pointing to the id of the errorList <ul> element
the input must have a type
The syntax used for the json schema is the default attributes the input accepts by default and its value and requires to also have the same with MSG as a string error message inserted in the aria-describedby as html
ALL elements can have a "delay" in ms to override the default delay, should be used only in very specific occasions
The only check that is manualy entered is the maxlength as this way u can allow the user to type more but dislay a error of maxlength instead of cutting them of. u can add a higher max length value to the input so that they can't type too much
type = 'text' | 'password' | 'tel' | 'search' | 'url' | 'email'
{
  "notTrim" = boolean, if true it will not trim the text input befor performing any of the checks.
  "maxlength" = number,
  "maxlengthMSG" = "string",
  "minlengthMSG" = "string",
  "patternMSG" = "string", if no pattern is passed in the element it uses the standard/default pattern in th email and the url
}
type = 'file'
the sizes are in MB
{
  "size": "string",
  "sizeMSG": "string",
  "toalSize": "string",
  "totalSizeMSG": "string",
  "typeMSG": "string"
}
type = 'date' | 'datetime-local' | 'month' | 'week' | 'time'
{
  "maxMSG": "string",
  "minMSG": "string",
  "stepMSG": "string",
  "requiredMSG": "string"
}
*/