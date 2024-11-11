const commonPasswords = ["password", "12345", "qwerty", "admin"];
let form = document.getElementById("form");
form.addEventListener("submit", function (e){
    e.preventDefault();

    //Getting the value of the password and the username
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Declaring a function. It is inside the event listener because it is a small task and I do not need to use outside the event.
    function passwordStrength(username, password){
        let strengthScore = 0;
        let userFeedback = [];

        //a. Length: The password should be at least 8 characters long;
        if(password.length>=8){
            strengthScore += 2;
        }else{
            userFeedback.push("Password should be at least 8 characters long.");
        }

        //Complexity
        //1 lowercase letter (a-z)
        if(/[a-z]/.test(password)){
            strengthScore += 1;
        } else{
            userFeedback.push("Password should contain at least 1 lowercase letter");
        }

        //1 uppercase letter (A-Z)
        if(/[A-Z]/.test(password)){
            strengthScore += 1;
        }else{
            userFeedback.push("Password should contain at least 1 uppercase letter ")
        }

        //1 digit number (0-9)
        if(/\d/.test(password)){
            strengthScore += 1;
        }else{
            userFeedback.push("Password should contain at least 1 number");
        }

        //1 special character (!,./;'[])
        if(/[`!@#%&,_.';:()-]/.test(password)){  
            strengthScore += 1;
        } else {
            userFeedback.push("Password should contain at least 1 special character");
        }

        //c.Avoiding common words
        if(commonPasswords.includes(password.toLowerCase())){
            strengthScore -=1;
            userFeedback.push("Password is too common.")
        }
        
        //d.Password should not be identical to the username
        if(username && password.toLowerCase() === username.toLowerCase()){
            strengthScore -= 2;
            userFeedback.push("Password should not be the same as the username");
        }

        //Calculating the strength score
        let strength = "Weak";

        if(strengthScore >= 6){
            strength = "Strong";
        } else if (strengthScore >= 4){
            strength = "Medium"
        }

        return {
            strength: strength,
            score: strengthScore,
            userFeedback: userFeedback
          };
    }

    const result = passwordStrength(username, password);
    
    //Displaying the results
    let resultBox = document.getElementById("result");
    resultBox.innerHTML = `<h3 class="strength">Password Strength: ${result.strength}</h3><br>
    <p class = "score">Score:${result.score}/6 <br></p>
    <p class='feedback'>${result.userFeedback.join("<br>")}</p>
    `

})