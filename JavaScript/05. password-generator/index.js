const charSets = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    lower: "abcdefghijklmnopqrstuvwxyz".split(""),
    numbers: "0123456789".split(""),
    symbols: "~`!@#$%^&*()_-+={[}],|:;<>.?/".split("")
};

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");

const useUpper = document.getElementById("useUpper");
const useLower = document.getElementById("useLower");
const useNumbers = document.getElementById("useNumbers");
const useSymbols = document.getElementById("useSymbols");

const checkboxes = [useUpper, useLower, useNumbers, useSymbols];

const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const generateBtn = document.getElementById("generateBtn");

function updateSliderFill() {
    const min = Number(lengthSlider.min);
    const max = Number(lengthSlider.max);
    const val = Number(lengthSlider.value);
    const percent = ((val - min) / (max - min)) * 100;
    lengthSlider.style.setProperty("--fill", percent + "%");
}

function updateLengthDisplay() {
    lengthValue.textContent = lengthSlider.value;
    updateSliderFill();
}

function enforceAtLeastOneChecked() {
    const checkedCount = checkboxes.filter(cb => cb.checked).length;
    checkboxes.forEach(cb => {
        cb.disabled = cb.checked && checkedCount === 1;
    });
}

function getActiveCharacters() {
    let pool = [];
    if (useUpper.checked) pool = pool.concat(charSets.upper);
    if (useLower.checked) pool = pool.concat(charSets.lower);
    if (useNumbers.checked) pool = pool.concat(charSets.numbers);
    if (useSymbols.checked) pool = pool.concat(charSets.symbols);
    return pool;
}

function generatePassword() {
    const pool = getActiveCharacters();
    const length = Number(lengthSlider.value);
    let password = "";

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * pool.length);
        password += pool[index];
    }

    return password;
}

function setPasswordText(el, value) {
    el.textContent = value;
    el.dataset.value = value;
    el.dataset.animating = "false";
    el.classList.remove("copied");
}

function createPassword() {
    setPasswordText(password1, generatePassword());
    setPasswordText(password2, generatePassword());
}

lengthSlider.addEventListener("input", updateLengthDisplay);

decreaseBtn.addEventListener("click", () => {
    lengthSlider.value = Math.max(Number(lengthSlider.min), Number(lengthSlider.value) - 1);
    updateLengthDisplay();
});

increaseBtn.addEventListener("click", () => {
    lengthSlider.value = Math.min(Number(lengthSlider.max), Number(lengthSlider.value) + 1);
    updateLengthDisplay();
});

checkboxes.forEach(cb => cb.addEventListener("change", enforceAtLeastOneChecked));

generateBtn.addEventListener("click", createPassword);

function flashCopied(el) {
    if (el.dataset.animating === "true") return;
    el.dataset.animating = "true";

    const original = el.dataset.value ?? el.textContent;
    el.dataset.value = original;

    el.classList.add("copied");
    el.textContent = "Copied!";

    setTimeout(() => {
        el.classList.remove("copied");
        el.textContent = original;
        el.dataset.animating = "false";
    }, 900);
}

password1.addEventListener("click", () => {
    navigator.clipboard.writeText(password1.dataset.value ?? password1.textContent);
    flashCopied(password1);
});

password2.addEventListener("click", () => {
    navigator.clipboard.writeText(password2.dataset.value ?? password2.textContent);
    flashCopied(password2);
});

updateLengthDisplay();
enforceAtLeastOneChecked();
createPassword();