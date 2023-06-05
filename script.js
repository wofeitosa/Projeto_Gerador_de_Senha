const inputEl = document.querySelector("#password")

let passwordLength = 16

function generatePassword() {
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]"
    let password = ""
    for(let i = 0; i< passwordLength; i++) {
     const randomNumer= Math.floor(Math.random() * chars.length)
     password += chars.substring(randomNumer, randomNumer + 1)

    }
    
    inputEl.value = password
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function() {
 passwordLength = passwordLengthEl.value
    
    generatePassword()
})

const copyButtonEl = document.querySelector("#copy")
copyButtonEl.addEventListener("click", copy)

generatePassword()


