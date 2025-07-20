console.log('Welcome to The Prescription Tool');

// Set default date to today
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('date').value = `${yyyy}-${mm}-${dd}`;

    //document.getElementById('date').value = today;
});

// ADD MEDICINE FIELD
function addMedicineField() {
    const container = document.getElementById('medicines');
    const warning = document.getElementById('medicineWarning');

    // Count current medicine groups
    const currentCount = document.querySelectorAll('.medicine-group').length;

    // Show warning if more than 7
    if (currentCount >= 7) {
        warning.style.display = 'block';
    }

    // Create a new medicine block
    let newNode = document.createElement('div');
    newNode.classList.add('medicine-group', 'border', 'rounded', 'p-3', 'mb-5', 'position-relative');

    let formInput = document.createElement('input');
    formInput.classList.add('form-control', 'mb-2');
    formInput.setAttribute('placeholder', 'Form (e.g., TAB, SYR)');

    let nameInput = document.createElement('input');
    nameInput.classList.add('form-control', 'mb-2');
    nameInput.setAttribute('placeholder', 'Medicine Name');

    let qtyInput = document.createElement('input');
    qtyInput.classList.add('form-control', 'mb-2');
    qtyInput.setAttribute('placeholder', 'Quantity');

    let doseInput = document.createElement('input');
    doseInput.classList.add('form-control', 'mb-2');
    doseInput.setAttribute('placeholder', 'Dosage (e.g., 1-1-1 x3 days)');

    let foodInput = document.createElement('input');
    foodInput.classList.add('form-control', 'mb-2');
    foodInput.setAttribute('placeholder', 'Food Instruction (e.g., After food)');

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('btn', 'btn-danger', 'position-absolute', 'top-5', 'end-2', 'm-1');
    removeBtn.onclick = () => {
        newNode.remove();

        // Hide warning if count drops below 8 after removal
        const updatedCount = document.querySelectorAll('.medicine-group').length;
        if (updatedCount < 8) {
            warning.style.display = 'none';
        }
    };

    newNode.appendChild(formInput);
    newNode.appendChild(nameInput);
    newNode.appendChild(qtyInput);
    newNode.appendChild(doseInput);
    newNode.appendChild(foodInput);
    newNode.appendChild(removeBtn);

    container.appendChild(newNode);
}



// GENERATE PRESCRIPTION
function generatePrescription() {
    // NAME
    let name = document.getElementById('name').value;
    let nameT = document.getElementById('nameT');
    nameT.innerHTML = name;

    // AGE
    let age = document.getElementById('age').value;
    let ageT = document.getElementById('ageT');
    ageT.innerHTML = age;

    // DATE
    let rawDate = document.getElementById('date').value;
    let [yyyy, mm, dd] = rawDate.split("-");
    let date = `${dd}-${mm}-${yyyy}`;

    let dateT = document.getElementById('dateT');
    dateT.innerHTML = date;

    // GENDER
    let gender = document.getElementById('gender').value;
    let genderT = document.getElementById('genderT');
    genderT.innerHTML = gender;

    // VITALS
    document.getElementById("temperatureT").innerText = document.getElementById("temperature").value;
    document.getElementById("spo2T").innerText = document.getElementById("spo2").value;
    document.getElementById("bpT").innerText = document.getElementById("bp").value;
    document.getElementById("weightT").innerText = document.getElementById("weight").value;

    // MEDICINE DETAILS
    let medGroups = document.querySelectorAll('.medicine-group');
    let medList = document.getElementById('medicineDetailsT');
    medList.innerHTML = '';

    medGroups.forEach(group => {
        const inputs = group.querySelectorAll('input');
        const form = inputs[0].value.trim().toUpperCase();   // TAB, SYR
        const name = inputs[1].value.trim();   // Crocin
        const qty = inputs[2].value.trim();    // 10
        const dose = inputs[3].value.trim();   // 1-1-1 x3 days
        const food = inputs[4].value.trim();   // After food
    
        if (name || dose || qty || form) {
            const li = document.createElement('li');
        
            // First line: form, name, quantity in circle
            let firstLine = `<strong>${form || ''} ${name || ''}</strong>`;
            if (qty) firstLine += ` <span class="circled">${qty}</span>`;
        
            // Second line: dose and food
            let secondLine = '';
            if (dose) secondLine += `${dose}`;
            if (food) secondLine += ` (${food})`;
        
            // Combine with <br> for line break
            li.innerHTML = `${firstLine}<br>${secondLine}`;
            medList.appendChild(li);
        }
        
    });
    

    // DISPLAY PRESCRIPTION and HIDE FORM & TITLE
    document.getElementById('prescriptionForm').style.display = 'none';
    document.getElementById('title').style.display = 'none';
    document.getElementById('prescriptionTemplate').style.display = 'block';
}

function editPrescription() {
    // Show the form and title again
    document.getElementById('prescriptionForm').style.display = 'block';
    document.getElementById('title').style.display = 'block';
  
    // Hide the template
    document.getElementById('prescriptionTemplate').style.display = 'none';
  }
  

// PRINT PRESCRIPTION
function printPrescription() {
    window.print();
}