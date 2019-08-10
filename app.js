// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Show loader
  document.querySelector("#loading").style.display = "block";

  //   Setting time out for 2 seconds
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate results
function calculateResults() {
  //   UI variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  //   Set variables
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //   Calculate monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  //   Check if numbers entered correctly
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show results
    document.querySelector("#results").style.display = "block";

    // Hide loader
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check you numbers");
  }
  console.log(principal);
}

// Show error
function showError(error) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Hide loader
  document.querySelector("#loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  //   Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //   insert error above heading
  card.insertBefore(errorDiv, heading);

  //   Clear error after 2 seconds
  setTimeout(clearError, 2000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
