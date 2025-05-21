const inputEl = document.querySelector ("#password")
const upperCaseCheckEl = document.querySelector ("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"
    
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars

    }

    if (numberCheckEl.checked) {
        chars += numberChars
    }

    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

   
    let password = ""


    for(let i = 0; i< passwordLength; i++) {
     const randomNumer= Math.floor(Math.random() * chars.length)
     password += chars.substring(randomNumer, randomNumer + 1)

    }
    
    inputEl.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
  const percent = Math.round((passwordLength / 64) * 25 + 
    (upperCaseCheckEl.checked ? 15 : 0) +
    (numberCheckEl.checked ? 25 : 0) +
    (symbolCheckEl.checked ? 35 : 0)
  )

    
    securityIndicatorBarEl.style.width = `${percent}%`
    if (percent > 69) {
        //safe
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50) {
        // warning
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    } else {
        // critical
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')    
    }    
    
    if (percent >= 100) {
            securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed")
    }
    
}

function calculateFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs") 
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs") 
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs") 
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs") 
    }
}

function copy(event) {
    navigator.clipboard.writeText(inputEl.value).then(() => {
        // Encontra o botão que foi clicado
        const button = event.target;

        // Cria ou reutiliza um span para mostrar a mensagem
        let messageEl = button.parentElement.querySelector(".copy-message");

        if (!messageEl) {
            messageEl = document.createElement("span");
            messageEl.classList.add("copy-message");
            button.parentElement.appendChild(messageEl);
        }

        messageEl.innerText = "Senha copiada!";
        messageEl.classList.add("show");

        // Esconde a mensagem após 2 segundos
        setTimeout(() => {
            messageEl.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value;
    document.querySelector('#password-length-text').innerText = passwordLength;
    generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();


