// UI var
const UIamount = document.getElementById('amount');
const UIinterest = document.getElementById('interest');
const UIyears = document.getElementById('years');
const UImonthlyPayment = document.getElementById('monthly-payment');
const UItotalPayment = document.getElementById('total-payment');
const UItotalInterest = document.getElementById('total-interest');

// listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //   Hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(showResults, 2000);


    e.preventDefault();
});

// listen for new loan
document.getElementById('new-loan').addEventListener('submit', newLoan);


function newLoan(e) {
    UIamount.value = '';
    UIinterest.value = '';
    UIyears.value = '';


    e.preventDefault();
}

// calculate Results
function calculateResults() {

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayment = parseFloat(UIyears.value) * 12;

    // Calculate Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayment).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

    } else {
        showError('Please check your numbers!');

        console.log('please check your number');
    }

}

// Show results
function showResults() {
    // Show results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';

    calculateResults();
}


//Show Error
function showError(error) {
     // Show results
     document.getElementById('results').style.display = 'none';
     // Hide loader
     document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and Append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 5000);
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}