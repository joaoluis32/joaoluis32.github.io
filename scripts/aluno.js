var http_request = false;
var xmlDoc;
var exemplo;


function makeRequest(url) {
	
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
			// See note below about this line
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("GET",url,false);
	http_request.send("");
}

function loadXML(xmlFile) {
	makeRequest(xmlFile);
	xmlDoc=http_request.responseXML;
	
	div="<TABLE id='Disciplinas' border='0' width='100%'>"+
	'<TH id="tabela_header">ANO</TH>'+
	'<TH id="tabela_header">UNIDADE CURRICULAR</TH>'+
	'<TH id="tabela_header">DOCENTE</TH>'+
	'<TH></TH>';
	
	var x=xmlDoc.getElementsByTagName("DISCIPLINA");
	for (i=0;i<x.length;i++){
		div+='<TR><TD>'+x[i].getElementsByTagName("ANO")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("UNIDADECURRICULAR")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("DOCENTE")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD><input type="button" value="Entrar" name="Entrar" onclick="avaliacoes()"></TD></TR>';
	}
	
	document.getElementById("content_SubLeft").innerHTML = div;
}
function avaliacoes() {
	makeRequest('./xml/aluno_avaliacoes.xml');
	xmlDoc=http_request.responseXML;
	div="<TABLE id='Avaliações' border='0' width='100%'>"+
	'<TH id="tabela_header">EPOCA</TH>'+
	'<TH id="tabela_header">TIPO DE AVALIAÇÃO</TH>'+
	'<TH id="tabela_header">DATA</TH>'+
	'<TH id="tabela_header">HORA</TH>'+
	'<TH id="tabela_header">SALA PREVISTA</TH>'+
	'<TH id="tabela_header">PESO NA NOTA FINAL</TH>'+
	'<TH></TH>';
	
	var x=xmlDoc.getElementsByTagName("AVALIACAO");
	for (i=0;i<x.length;i++){
		div+='<TR><TD>'+x[i].getElementsByTagName("EPOCA")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("TIPODEAVALIACAO")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("DATA")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("HORA")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("SALAPREVISTA")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("PESONANOTAFINAL")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD><input type="button" value="Inscrever" name="Inscrever" onclick="location.href=' + 
				"'aluno3.html?" + i + "'" + '"></TD></TR>';
	}
	
	document.getElementById("content_SubLeft").innerHTML = div;
}

function inscreverDisciplina(xmlFile) {
	makeRequest(xmlFile);
	xmlDoc=http_request.responseXML;
	var x=xmlDoc.getElementsByTagName("AVALIACAO");
	var query = window.location.search;
	// Skip the leading ?
	if (query.substring(0, 1) == '?') {
		query = query.substring(1);
	}
	epoca = x[query].getElementsByTagName("EPOCA")[0].childNodes[0].nodeValue;
	tipodeavaliacao = x[query].getElementsByTagName("TIPODEAVALIACAO")[0].childNodes[0].nodeValue;
	data = x[query].getElementsByTagName("DATA")[0].childNodes[0].nodeValue;
	hora = x[query].getElementsByTagName("HORA")[0].childNodes[0].nodeValue;
	salaprevista = x[query].getElementsByTagName("SALAPREVISTA")[0].childNodes[0].nodeValue;
	pesonanotafinal = x[query].getElementsByTagName("PESONANOTAFINAL")[0].childNodes[0].nodeValue;
	div = '<b>Epoca : </b> ' + epoca + '<br><br>';
	div += '<b>Tipo de Avaliação : </b> ' + tipodeavaliacao + '<br><br>';
	div += '<b>Data : </b> ' + data + '<br><br>';
	div += '<b>Hora: </b> ' + hora + '<br><br>';
	div += '<b>Sala Prevista : </b> ' + salaprevista + '<br><br>';
	div += '<b>Peso na Nota Final : </b> ' + pesonanotafinal + '<br><br>';
	div += '<b>Confirmar Inscrição a este momento de avaliação? <br><br>';
	div += '<input type="button" value="SIM" name="sim" onclick="inscreverFeedback()">&nbsp&nbsp'  + 
			'<input type="button" value="NÃO" name="nao" onclick="location.href=' + "'aluno2.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;	
}

function inscreverFeedback() {

	div = '<b>Inscrição efectuada com sucesso!<br><br>Detalhes:<br><br>Tema: </b>';
	div += '<b>Epoca : </b> ' + epoca + '<br><br>';
	div += '<b>Tipo de Avaliação : </b> ' + tipodeavaliacao + '<br><br>';
	div += '<b>Data : </b> ' + data + '<br><br>';
	div += '<b>Hora: </b> ' + hora + '<br><br>';
	div += '<b>Sala Prevista : </b> ' + salaprevista + '<br><br>';
	div += '<b>Peso na Nota Final : </b> ' + pesonanotafinal + '<br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'alunoHome.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
}


///-------------------------



	
function detalheAv1(){
	limparDiv="";
	div = '<b><br><br>Detalhes:<br><br>Disciplina:</b> MA <br><br>';
	div += '<b>Ano:</b> 1º ano <br><br>';
	div += '<b>Tipo de Prova:</b> Teste <br><br>';
	div += '<b>Sala:</b> Lab12  <br><br>';
	div += '<b>Hora:</b>  14H00 <br><br>';
	div += '<b>Peso na Nota Final:</b>30%  <br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'aluno4.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
}

function detalheAv2(){
	
	limparDiv="";
	div = '<b><br><br>Detalhes:<br><br>Disciplina:</b> LP <br><br>';
	div += '<b>Ano:</b> 3º ano <br><br>';
	div += '<b>Tipo de Prova:</b> Trabalho <br><br>';
	div += '<b>Sala:</b> Lab8  <br><br>';
	div += '<b>Hora:</b> 16H00  <br><br>';
	div += '<b>Peso na Nota Final:</b>30%  <br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'aluno4.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
}

function detalheAv3(){
	
	limparDiv="";
	div = '<b><br><br>Detalhes:<br><br>Disciplina:</b> SRC <br><br>';
	div += '<b>Ano:</b> 3º ano <br><br>';
	div += '<b>Tipo de Prova:</b> Teste<br><br>';
	div += '<b>Sala:</b> 6  <br><br>';
	div += '<b>Hora:</b> 18H00  <br><br>';
	div += '<b>Peso na Nota Final:</b>5%  <br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'aluno4.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
}

function formCalendario(){
	
	div = "<form name=calendario align=center >";
	div += "<table border=1 width=100%>";
	div += "<tr><td>";
	div += "<table width=100%><tr>";
	div += "<td align=right>";
	div += "<input type=button value=Anterior onClick='mesAnterior();'></input>";
	div += "<select name=selSemestre id=selSemestre onChange='changeSemes()'><option>1º semestre</option><option>2º Semestre</option></select>";
	div += "<select name=selMonth id=selMonth onChange='changeMonth()' ><option value=0>Outubro</option><option value=1>Novembro</option><option value=2>Dezembro</option><option value=3>Janeiro</option value=4><option>Fevereiro</option>";
	div += "</select>";
	div += "</td>";
	div += "<td align=left>";
	div += "<select name=selYear onChange='changeCal()'><option>2012/2013</option>";
	div += "</select>";
	div += "<input type=button value=VistaGeral align=right onClick='location.href=" + '"aluno5.html?"' + "'></input>";
	div += "<input type=button value=Seguinte align=right onClick='mesSeguinte();'></input>";
	div += "</td>";
	div += "</tr></table></form>";
	document.getElementById("content_SubLeft").innerHTML = div;
	
}
function mesAnterior(){
	document.calendario.selMonth.value--;
	changeMonth();
}
function mesSeguinte(){
	
	document.calendario.selMonth.value++;
	changeMonth();
}
function changeSemes(){
	
	 var semeSelec = document.getElementById("selSemestre");
	 if (semeSelec.selectedIndex === 0 )
	 {
		
		 document.getElementById("selMonth").options.length = 0;
		 var outubro = selMonth.appendChild(document.createElement('option'));
		 var novembro = selMonth.appendChild(document.createElement('option'));
		 var dezembro = selMonth.appendChild(document.createElement('option'));
		 var janeiro = selMonth.appendChild(document.createElement('option'));
		 var fevereiro = selMonth.appendChild(document.createElement('option'));
		 var option = document.createElement("option");
		// var combo = document.getElementById("selMonth");
		 //ex.options.length = 0;
		 outubro.text = "Outubro";
		 novembro.text = "Novembro";
		 dezembro.text = "Dezembro";
		 janeiro.text = "Janeiro";
		 fevereiro.text = "Fevereiro";
		//CAHNGE the below variable to the CURRENT YEAR
	    	year=2012;
	    	//first day of the week of the new year
	    	today= new Date("October 0, "+year);
	    	start_day = today.getDay() + 1  ; // starts with 0
	    	fill_table("Outubro",31);
	 }
	 if (semeSelec.selectedIndex === 1 )
	 {
		
		 document.getElementById("selMonth").options.length = 0;
		 var marco = selMonth.appendChild(document.createElement('option'));
		 var abril = selMonth.appendChild(document.createElement('option'));
		 var maio = selMonth.appendChild(document.createElement('option'));
		 var junho = selMonth.appendChild(document.createElement('option'));
		 var julho = selMonth.appendChild(document.createElement('option'));
		 var option = document.createElement("option");
		// var combo = document.getElementById("selMonth");
		 //ex.options.length = 0;
		 marco.text = "Março";
		 abril.text = "Abril";
		 maio.text = "Maio";
		 junho.text = "Junho";
		 julho.text = "Julho";
		//CAHNGE the below variable to the CURRENT YEAR
	    	year=2013;
	    	//first day of the week of the new year
	    	today= new Date("March 0, "+year);
	    	start_day = today.getDay() + 1  ; // starts with 0
	    	fill_table("Março",31);
	 }
}
function changeMonth()
{
	var semeSelec  = document.getElementById('selSemestre');
    var mesSelec = document.getElementById('selMonth');
  
		    if(mesSelec.selectedIndex === 0 && semeSelec.selectedIndex ===0) {
		    	//CAHNGE the below variable to the CURRENT YEAR
		    	year=2012;
		    	//first day of the week of the new year
		    	today= new Date("October 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	fill_table("Outubro",31);
		    }
	       if(mesSelec.selectedIndex === 1 && semeSelec.selectedIndex ===0) {
	    	   //CAHNGE the below variable to the CURRENT YEAR
		    	year=2012;
		    	//first day of the week of the new year
		    	today= new Date("november 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	fill_table("Novembro",30);
	       }
	       if(mesSelec.selectedIndex === 2 && semeSelec.selectedIndex ===0) {
	    	 //CAHNGE the below variable to the CURRENT YEAR
		    	year=2012;
		    	//first day of the week of the new year
		    	today= new Date("December 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	
	    	   fill_table("Dezembro",31);
	       }
	       if(mesSelec.selectedIndex === 3 && semeSelec.selectedIndex ===0) {
	    	   year=2013;
	    	  //first day of the week of the new year
	    	   today= new Date("January 0, "+year);
	    		start_day = today.getDay() + 1  ; // starts with 0
	    	   fill_table("Janeiro",31);
	       }
	       if(mesSelec.selectedIndex === 4 && semeSelec.selectedIndex ===0) {
	    	   year=2013;
		    	 //first day of the week of the new year
		    	today= new Date("February 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		       fill_table("Fevereiro",28);
	       }
	       if(mesSelec.selectedIndex === 0 && semeSelec.selectedIndex ===1) {
		    	//CAHNGE the below variable to the CURRENT YEAR
		    	year=2013;
		    	//first day of the week of the new year
		    	today= new Date("March 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	fill_table("Março",31);
		    }
	       if(mesSelec.selectedIndex === 1 && semeSelec.selectedIndex ===1) {
	    	   //CAHNGE the below variable to the CURRENT YEAR
		    	year=2013;
		    	//first day of the week of the new year
		    	today= new Date("April 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	fill_table("Abril",30);
	       }
	       if(mesSelec.selectedIndex === 2 && semeSelec.selectedIndex ===1) {
	    	 //CAHNGE the below variable to the CURRENT YEAR
		    	year=2013;
		    	//first day of the week of the new year
		    	today= new Date("May 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		    	
	    	   fill_table("Maio",31);
	       }
	       if(mesSelec.selectedIndex === 3 && semeSelec.selectedIndex ===1) {
	    	   year=2013;
	    	  //first day of the week of the new year
	    	   today= new Date("June 0, "+year);
	    		start_day = today.getDay() + 1  ; // starts with 0
	    	   fill_table("Junho",31);
	       }
	       if(mesSelec.selectedIndex === 4 && semeSelec.selectedIndex ===1) {
	    	   year=2013;
		    	 //first day of the week of the new year
		    	today= new Date("July 0, "+year);
		    	start_day = today.getDay() + 1  ; // starts with 0
		       fill_table("Julho",28);
	       }
}
function contruirCalendario()
{ 

	//CAHNGE the below variable to the CURRENT YEAR
	year=2012;
	
	//first day of the week of the new year
	today= new Date("October 0, "+year);
	start_day = today.getDay() + 1  ; // starts with 0
	div= "<form name=calForm align=center >";
	div += "<TABLE border=1 width=100%  >";

	div+="<TABLE align=center><TR><TD>";
	//fill_table("Janeiro",31)
	//div+="</TD><TD>";
	//fill_table("Fevereiro",29)
	//div+="</TD><TD>";
	//fill_table("Março",31)
	//div+="</TD><TD>";
	//fill_table("Abril",30)
	//div+="</TD></TR><TR><TD>";
	//fill_table("Maio",31)
	//div+="</TD><TD>";
	//fill_table("Junho",30)
	//div+="</TD><TD>";
	//fill_table("Julho",31)
	//div+="</TD><TD>";
	//fill_table("Agosto",31)
	//div+="</TD></TR><TR><TD>";
	//fill_table("Setembro",30)
	//div+="</TD><TD>";
	fill_table("Outubro",31);
	
	div+="</TR></TABLE>";
	div += "</td><tr><td>";
	
	div+="</TABLE>";

	document.getElementById("content_SubLeft2").innerHTML = div;
}
///----------------------------------------------------------------------------------------------
//Calendário Vista Geral

function day_title(day_name){
    div+="<TD ALIGN=center width=200 height=50>"+day_name+"</TD>";
    document.getElementById("content_SubLeft2").innerHTML = div;
}
//fills the month table with numbers
function fill_table(month,month_length)
{ 
	 day=1;
	 // begin the new month table
	 
	 div="<TABLE BORDER=2 CELLSPACING=2 CELLPADDING=%20  height=50    >";
	 div+="<TD COLSPAN=7 ALIGN=center height=50><B>"+month+"   "+(year)+"</B><TR>";
	 // column headings
	 
	 day_title("Segunda");
	 day_title("Terça");
	 day_title("Quarta");
	 day_title("Quinta");
	 day_title("Sexta");
	 day_title("Sabado");
	 day_title("Domingo");
	 // pad cells before first day of month
	 div+="</TR><TR>";
	 for (var i=1;i<start_day;i++){
	       div+="<TD>";
	 }
	 // fill the first week of days
	 for (var i=start_day;i<8;i++){
	       div+="<TD ALIGN=center height=50  >"+day+"</TD>";
	       day++;
	 }
	 div+="<TR>";
	 // fill the remaining weeks
	 while (day <= month_length) {
	    for (var i=1;i<=7 && day<=month_length;i++){
	    	
	    	
	    	if (day==12)
			{
	    		div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick='detalheAv1()'>1º Ano</br>MA Teste 30%</u></a>"+"</TD>";
	    		
			}
	    	
	    	else if (day==19)
			{
				 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick='detalheAv2()'>3º Ano <br> LP Trabalho 30%</br></a>"+"</TD>";
			
			}
	    	else if (day==23)
			{
				 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick='detalheAv3()'>3º Ano<br>SRC Teste 5%</br></a>"+"</TD>";
			}
	    	else
	    		div+="<TD ALIGN=center height=50>"+day+"</TD>";
	    		day++;
	    }
	    div+="</TR>";
	    // the first day of the next month
	    start_day=i;
	 }
	 div+="</TR></TABLE>";
	 div+="<TABLE border=1 width=100%><TR><TD>";
	 div += "<label>SRC - Segurança em Redes de Comunicação </label><br>";
	 div += "<label>MA - Microprocessadores e Arquitecturas </label><br>";
	 div += "<label>LP - Linguagens de Programação </label></td>";
	 div +="</TABLE>";
	
	 div += "<input type=button align=left value='Voltar à página inicial' onClick=location.href='alunoHome.html'></input>";
	  document.getElementById("content_SubLeft2").innerHTML = div;
}
function day_title2(day_name){
    div+="<TD ALIGN=center width=300 height=50>"+day_name+"</TD>";
    document.getElementById("content_SubLeft2").innerHTML = div;
}
//end hiding -->
function fill_table2(month,month_length)
{ 
	 day=1;
	 // begin the new month table
	 
	 div+="<TABLE BORDER=2 CELLSPACING=2 CELLPADDING=%20 width=405>";
	 div+="<TD COLSPAN=7 ALIGN=center><B>"+month+"   "+year+"</B><TR>";
	 // column headings
	
	 day_title2("Seg");
	 day_title2("Ter");
	 day_title2("Quar");
	 day_title2("Quin");
	 day_title2("Sex");
	 day_title2("Sab");
	 day_title2("Dom");
	 // pad cells before first day of month
	 div+="</TR><TR>";
	 for (var i=1;i<start_day;i++){
	       div+="<TD>";
	 }
	 // fill the first week of days
	 for (var i=start_day;i<8;i++){
	       div+="<TD ALIGN=center width=300>"+day+"</TD>";
	       day++;
	 }
	 div+="<TR>";
	 // fill the remaining weeks
		 while (day <= month_length) {
			    for (var i=1;i<=7 && day<=month_length;i++){
			    	
			    	
			    	if (day==12)
			    	{
			    		div+="<TD ALIGN=center  >"+day+"<a href='#' onClick='detalheAv1()'><br>1ºano MA</u></a>"+"</TD>";
			    		
			    		}
			    	else if (day==20)
			    	{
			    		div+="<TD ALIGN=center  >"+day+"<a href='#' onClick='detalheAv1()'><br>2ºano LP</u></a>"+"</TD>";
			    		
			    		}
			    	else
			    	
			    		div+="<TD ALIGN=center>"+day+"</TD>";
			    		day++;
			    	
			    }
	    div+="</TR>";
	    // the first day of the next month
	    start_day=i;
	 }
	 div+="</TR></TABLE>";
 document.getElementById("content_SubLeft2").innerHTML = div;
}
function formVistaGeral()
{ 

//CAHNGE the below variable to the CURRENT YEAR
year=2013;

//first day of the week of the new year
today= new Date("January 1, "+year);
start_day = today.getDay() + 1  ; // starts with 0
	div= "<form name=calForm align=center >";
	div += "<TABLE border=1 width=100% >";
	div += "<tr><td align=center>";
	div += "<input type=button value=Anterior onClick='mesAnterior();'></input>";
	div += "<select name=selSemestreG id=selSemestreG onChange='vGeralSemes(this.value)'><option>1º semestre</option><option>2º Semestre</option></select>";
	div += "<select name=selAno onChange='changeCal()'><option>2012/2013</option><option>2013/2014</option></select>";
	div += "<input type=button value=VistaMensal align=right onClick='location.href=" + 
			'"aluno4.html"' +  "'></input>";
	div += "<input type=button value=Seguinte align=right onClick='mesSeguinte();'></input>";
		

	document.getElementById("content_SubLeft").innerHTML = div;
}

function calendarioGeral()
{
	//CAHNGE the below variable to the CURRENT YEAR
	year=2012;

	//first day of the week of the new year
	today= new Date("January 1, "+year);
	start_day = today.getDay() + 1  ; // starts with 0
	div="<table><tr><td>";

	fill_table2("Outubro",31);
	div+="</TD><TD>";
	fill_table2("Novembro",30);
	//div+="</TD></TR><TR><TD>";
	//fill_table("Maio",31)
	div+="</TD><TD>";
	fill_table2("Dezembro",30);
	div+="</TD></TR><TR><TD>";
	//div+="</TD><TD>";
	//CAHNGE the below variable to the CURRENT YEAR
	year=2013;

	//first day of the week of the new year
	today= new Date("January 0, "+year);
	start_day = today.getDay() + 1  ; // starts with 0
	fill_table2("Janeiro",31);
	div+="</TD><TD>";
	fill_table2("Fevereiro",28)
	div+="</TD>";
	div+="</TR></TABLE>";
	div += "</td><tr><td>";
	 div+="<TABLE border=1 width=100%><TR><TD>";
	div += "<label>SRC - Segurança em Redes de Comunicação </label><br>";
	div += "<label>MA - Microprocessadores e Arquitecturas </label><br>";
	div += "<label>LP - Linguagens de Programação </label>";
	div+="</TABLE>";
	div += "<input type=button align=left value='Voltar à página inicial' onClick=location.href='alunoHome.html'></input>";

	document.getElementById("content_SubLeft2").innerHTML = div;
	
	
}