var tipo;
var tema;
var enunciado;
var anexo;
var notas;
var alteracao;
var seleccionado;
var diaMom;
var http_request = false;
var xmlDoc;

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
	'<TH></TH>';
	
	var x=xmlDoc.getElementsByTagName("DISCIPLINA");
	for (i=0;i<x.length;i++){
		div+='<TR><TD>'+x[i].getElementsByTagName("ANO")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("UNIDADECURRICULAR")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD><input type="button" value="Entrar" name="Entrar" onclick="location.href=' + 
		"'docente6.html?" + i + "'" + '"></TD></TR>';
	}
	
	document.getElementById("content_SubLeft").innerHTML = div;
}
function loadXML2(xmlFile) {
	makeRequest(xmlFile);
	xmlDoc=http_request.responseXML;
	
	div="<TABLE id='Disciplinas' border='0' width='100%'>"+
	'<TH id="tabela_header">ANO</TH>'+
	'<TH id="tabela_header">UNIDADE CURRICULAR</TH>'+
	
	'<TH></TH>';
	
	var x=xmlDoc.getElementsByTagName("DISCIPLINA");
	for (i=0;i<x.length;i++){
		div+='<TR><TD>'+x[i].getElementsByTagName("ANO")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("UNIDADECURRICULAR")[0].childNodes[0].nodeValue+'</TD>';
		
		div+='<TD><input type="button" value="Entrar" name="Entrar" onclick="location.href=' + 
				"'docente4.html?" + i + "'" + '"></TD></TR>';
	}
	
	document.getElementById("content_SubLeft").innerHTML = div;
}
function loadXML3(xmlFile) {
	makeRequest(xmlFile);
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
		div+='<TD><input type="button" value="Consultar" name="Consultar" onclick="location.href=' + 
				"'docente5.html?" + i + "'" + '"></TD></TR>';
	}
	
	document.getElementById("content_SubLeft").innerHTML = div;
}
function loadXML4(xmlFile) {
	makeRequest(xmlFile);
	xmlDoc=http_request.responseXML;
	var counter= 0;
	div="<TABLE id='alunosInscritos' border='0' width='100%'>"+
	'<TH id="tabela_header">Nº</TH>'+
	'<TH id="tabela_header">Nome</TH>'+
	'<TH id="tabela_header">Data</TH>'+
	'<TH id="tabela_header">Hora</TH>'+
	'<TH></TH>';
	var x=xmlDoc.getElementsByTagName("ALUNO");
	for (i=0;i<x.length;i++){
		div+='<TR><TD>'+x[i].getElementsByTagName("NUMERO")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("NOME")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("DATA")[0].childNodes[0].nodeValue+'</TD>';
		div+='<TD>'+x[i].getElementsByTagName("HORA")[0].childNodes[0].nodeValue+'</TD></tr>';
		counter+=1;
	}
	div+="</TABLE>";
	div+='<HR WIDTH=1080 ALIGN=left NOSHADE >'+
	'<h3>Total de Alunos inscritos: '+ counter +' alunos</h3>';
	div += '<input type="button" value="Imprimir" name="imprimir" onclick="">&nbsp&nbsp'  + 
	'<input type="button" value="Voltar à pagina inicial" name="pagInicial" onclick="location.href=' + "'docenteHome.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
}

function marcarAv()
{
	makeRequest('./xml/docente_marcarAvaliacao.xml');
	xmlDoc=http_request.responseXML;
	var limparDiv="";
	div='<FORM name="avaliacao" > <label>Época:</label><br>'+ 
	'<input type="radio" name="regrasEpoca" id="epNormal" value="Normal"> Normal <br></input>'+
	'<input type="radio" name="regrasEpoca" id="epRecurso" value="Recurso" > Recurso <font color="#FF0000">*</font><br></input>'+
	'<label>Tipo de Avaliação: <br></label>'+
	'<select name="tipoAva" id ="tipoAva" onchange=""  >';
	var x=xmlDoc.getElementsByTagName("AVALIACAO");
	for (i=0;i<x[0].getElementsByTagName("TIPOAVALIACAO").length;i++) {
	if (i == 0) {
		div += '<option selected value="' + x[0].getElementsByTagName("TIPOAVALIACAO")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("TIPOAVALIACAO")[i].childNodes[0].nodeValue + '</option>';
	}
	else {
		div += '<option value="' + x[0].getElementsByTagName("TIPOAVALIACAO")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("TIPOAVALIACAO")[i].childNodes[0].nodeValue + '</option>';
	}

	}
	div+='</select><font color="#FF0000">*</font><br><label>Hora</label><label style="margin-left:15px">Min</label>'+
	'<br><input  name="hora" id ="hora" value="" style="width:30px;height:15px;"></input>:<input style="width:30px;height:15px;" name="min" id ="min" value="" ></input>';
	div+='</select><font color="#FF0000">*</font>'+
	'<br><label>Sala Prevista: <br></label>'+
	'<select name="salaPrev" id ="salaPrev" onchange=""  >';
	var x=xmlDoc.getElementsByTagName("AVALIACAO");
	for (i=0;i<x[0].getElementsByTagName("SALAPREVISTA").length;i++) {
		if (i == 0) {
			div += '<option selected value="' + x[0].getElementsByTagName("SALAPREVISTA")[i].childNodes[0].nodeValue  + '">' + 
					x[0].getElementsByTagName("SALAPREVISTA")[i].childNodes[0].nodeValue + '</option>';
		}
		else {
			div += '<option value="' + x[0].getElementsByTagName("SALAPREVISTA")[i].childNodes[0].nodeValue  + '">' + 
					x[0].getElementsByTagName("SALAPREVISTA")[i].childNodes[0].nodeValue + '</option>';
		}
		}
	div+='</select><font color="#FF0000">*</font>'+
	'<br><label>Peso percentual da nota final: <br></label>'+
	'<table id="A" cellpadding="0" cellspacing="0" border="0"><tr><tr><tr>'+
	'<td rowspan="2"><input type="text" name="peso" value="0" style="text-align: right;width:25px;height:15px;" /><label>%</label></td>'+
	'<td><input type="button" value="Cima" onclick="if(this.form.peso.value<100)this.form.peso.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	'</tr>'+
	'<tr>'+
	'<td><input type=button value="Baixo" onclick="if(this.form.peso.value>0)this.form.peso.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ><font color="#FF0000">*</font></td>'+
	'</tr>'+
	'</table>'+
	'<label>Nome do docente: <br></label>'+
	'<input name="nomeDoc" id ="nomeDoc" ></input><font color="#FF0000">*</font>'+
	'<br><label>Observações: <br></label>'+
	'<TEXTAREA COLS=40 ROWS=3 NAME="observacoes"></TEXTAREA><br>'+
	'<font color="#FF0000">*</font> Campos de preenchimento obrigatório<br><br><div id="avisoFORM"></div>' + 
	'<input type="button" value="Cancelar" name="cancelar" onclick="location.href=' + "'docente2.html'" +  '">' + 
	'<input type="button" value="Submeter" name="submeter" onclick="submeterAvalicao(diaMom)">' + 
	'<input type="reset" value="Limpar Dados" name="limpar_dados" onclick="" tabindex="16">' + 
	'</FORM>';
	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
	document.avaliacao.epNormal.focus();
}
function submeterAvalicao(diaMom) 
{
	
	if ( verif_campObrig_preench() ) 
	{
		epoca = get_radioButton_value();
		nomeDoc = document.avaliacao.nomeDoc.value;
		tipoAva = document.avaliacao.tipoAva.value;
		hora = document.avaliacao.hora.value;
		min = document.avaliacao.min.value;
		salaPrev = document.avaliacao.salaPrev.value;
		pesoNota = document.avaliacao.peso.value;
		observacoes  = document.avaliacao.observacoes.value;
		
		
		div = '<b>Época: </b>' + epoca + '<br><br>';
		div += '<b>Tipo de Avaliação: </b>' + tipoAva + '<br><br>';
		div += '<b>Dia: </b>' + diaMom + '<br><br>';
		div += '<b>Hora: </b>'  + hora +':'+min+'<br><br>';
		div += '<b>Sala Prevista: </b>' + salaPrev+ '<br><br>';
		div += '<b>Nome Do docente: </b>' +nomeDoc+ '<br><br>';
		div += '<b>Peso Percentual da nota Final: </b>' +pesoNota + '%<br><br>';
		div += '<b>Observações: </b>' +observacoes + '<br><br>';
		div += '<b>Tem a certeza que deseja submeter esta proposta de Avaliação?</b><br><br>';
		div += '<input type="button" value="SIM" name="sim" onclick="submeterAvaliacaoFeedback()">'  + 
				'<input type="button" value="NÃO" name="nao" onclick="location.href=' + "'docente2.HTML'" +  '">';
	
		document.getElementById("content_SubLeft").innerHTML = div;
	}
	else 
	{
		document.getElementById("avisoFORM").innerHTML = '<font color="#FF0000">Verifique se preencheu todos os campos obrigatórios!</font>';
	}
}

/* Devolve o valor do radioButton*/
function get_radioButton_value()  
{
	for (var i=0; i < document.avaliacao.regrasEpoca.length; i++)
   {
		if (document.avaliacao.regrasEpoca[i].checked)
		{
			return document.avaliacao.regrasEpoca[i].value;
		}
   }
}

/* Caso o seja submetido a proposta de Estágio/Projecto,
   devolve um feedback ao utilizador */
function submeterAvaliacaoFeedback()
{
	
	div = '<b>Proposta de avaliação submetida com sucesso! ' ;
	div += '<br><br>Detalhes:<br><br>Época:</b> ' + epoca+'<br><br>';
	div += '<b>Tipo de Avaliação: </b>' + tipoAva + '<br><br>';
	
	div += '<b>Hora: </b>'  + hora +':'+min+'<br><br>';
	div += '<b>Sala Prevista: </b>' + salaPrev+ '<br><br>';
	div += '<b>Nome Do docente: </b>' +nomeDoc+ '<br><br>';
	div += '<b>Peso Percentual da nota Final: </b>' +pesoNota + '%<br><br>';
	div += '<b>Observações: </b>' +observacoes + '<br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'docenteHome.html'" +  '">';
			
	document.getElementById("content_SubLeft").innerHTML = div;
}

/* Verifica se os campos obrigatórios estão preenchidos*/
function verif_campObrig_preench() 
{
	if ( verif_radioButton_assina() &&
		document.avaliacao.nomeDoc.value != "" && 
		document.avaliacao.tipoAva.value !="" &&
		document.avaliacao.hora.value != "" &&
		document.avaliacao.min.value != "" &&
		document.avaliacao.salaPrev.value !="" &&
		document.avaliacao.peso.value != "") 
	{
			return true;
	}
	return false;
}

/* Verificar o se o radioButtons estao assinalados */
function verif_radioButton_assina() 
{
	if (document.avaliacao.epNormal.checked ||
		document.avaliacao.epRecurso.checked) 
	{
		return true;
	}
	return false;
}
///----------------------------------------------------------------------------------------------
//Construção do Calendário

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
	       div+="<TD ALIGN=center height=50><a href='#' onClick='marcarAv()'>"+day+"<br>Dia Livre</a></TD>";
	       day++;
	 }
	 div+="<TR>";
	 // fill the remaining weeks
	 while (day <= month_length) {
	    for (var i=1;i<=7 && day<=month_length;i++){
	    	
	    	
	    
	    	
	     
	    		div+="<TD ALIGN=center height=50><a href='#' onClick='marcarAv()'>"+day+"<br>Dia Livre</a></TD>";
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
	div += "<input type=button value=VistaGeral align=right onClick='location.href=" + 
			'"docente7.html"' +  "'></input>";
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
	fill_table("Outubro",31);
	div+="</TR></TABLE>";
	div += "</td><tr><td>";
	div+="</TABLE>";

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
	       div+="<TD ALIGN=center width=300><a href='#' onClick='marcarAv()'>"+day+"</a></TD>";
	       day++;
	 }
	 div+="<TR>";
	 // fill the remaining weeks
		 while (day <= month_length) {
			    for (var i=1;i<=7 && day<=month_length;i++){
		    		div+="<TD ALIGN=center><a href='#' onClick='marcarAv()'>"+day+"</a></TD>";
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
	//div+="</TD></TR><TR><TD>";
	//fill_table("Setembro",30)
	//div+="</TD><TD>";
	
	
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