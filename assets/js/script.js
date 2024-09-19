let googleBookingArea = document.querySelector(".google-booking-iframe");
let bookingBtn = document.querySelector("#booking-btn");
let sendMsgBtn = document.querySelector("#send-msg-btn");
let contactForm = document.querySelector("#contact-form");

const form = document.getElementById("contact-form");
const result = document.getElementById("result");

const firstInput = document.querySelector("#first-input");

bookingBtn.addEventListener("click", function (e) {
	googleBookingArea.style.display = "block";
	contactForm.style.display = "none";
	result.style.display = "none";
});

sendMsgBtn.addEventListener("click", function (e) {
	googleBookingArea.style.display = "none";
	contactForm.style.display = "flex";
	result.style.display = "none";
	firstInput.focus();
});

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);
	result.style.display = "flex";
	result.style.maxWidth = "300px";
	result.style.margin = "4rem auto 0rem auto";
	result.style.textAlign = "center";
	result.innerHTML = "Please wait...";
	form.style.display = "none";

	fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: json
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerHTML = "Form submitted successfully";
				result.style.display = "flex";
			} else {
				console.log(response);
				result.innerHTML = json.message;
			}
		})
		.catch((error) => {
			console.log(error);
			result.innerHTML = "Something went wrong!";
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = "none";
			}, 3000);
		});
});