function validate() {
	var user = document.loginForm.userName.value;
	var password = document.loginForm.password.value;
	
	if ((user == "Aluno") && (password == "Aluno")) {
		window.location = "alunoHome.html";
	}
	else if ((user == "Docente") && (password == "Docente")) {
		window.location = "docenteHome.html";
	}
	else if ((user == "Coordenador") && (password == "Coordenador")) {
		window.location = "coordenadorHome.html";
	}
	else if ((user == "") && (password == "")) {
		var targetElement = document.getElementById("loginError");
		targetElement.innerHTML = "<span style=\"color:red\">Deve Introduzir um Utilizador e Password válidos!!</span> <br><br>";
	}
	else {
		var targetElement = document.getElementById("loginError");
		targetElement.innerHTML = "<span style=\"color:red\">Dados Incorrectos!!</span> <br><br>";
	}
}



