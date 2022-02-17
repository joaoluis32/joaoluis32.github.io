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
	div='<div id="defRegras"><form name="regras"> <label>Época:</label><br>'+ 
	'<input type="radio" name="regrasEpoca" id="epNormal" value="Normal"> Normal <br></input>'+
	'<input type="radio" name="regrasEpoca" id="epRecurso" value="Recurso" > Recurso <font color="#FF0000">*</font><br><br></input>'+
	'<label>Numero Máximo de Momentos de Avaliação por dia? <br></label>'+
	'<select name="nuMaxAvDia" id ="nuMaxAvDia" onchange="mudarMomentoDia()"  >';
	var x=xmlDoc.getElementsByTagName("REGRAS");
	for (i=0;i<x[0].getElementsByTagName("NUMOMENTOSDIA").length;i++) {
	if (i == 0) {
		div += '<option selected value="' + x[0].getElementsByTagName("NUMOMENTOSDIA")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("NUMOMENTOSDIA")[i].childNodes[0].nodeValue + '</option>';
	}
	else {
		div += '<option value="' + x[0].getElementsByTagName("NUMOMENTOSDIA")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("NUMOMENTOSDIA")[i].childNodes[0].nodeValue + '</option>';
	}

	}
	div+='</select><font color="#FF0000">*</font><br><label>Numero Máximo de Momentos de Avaliações por Semana?</label>'+
	'<br><select name="nuMaxAvSem" id ="nuMaxAvSem" onchange="mudarMomentoSem()" >';
	var x=xmlDoc.getElementsByTagName("REGRAS");
	for (i=0;i<x[0].getElementsByTagName("NUMOMENTOSSEM").length;i++) {
	if (i == 0) {
		div += '<option selected value="' + x[0].getElementsByTagName("NUMOMENTOSSEM")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("NUMOMENTOSSEM")[i].childNodes[0].nodeValue + '</option>';
	}
	else {
		div += '<option value="' + x[0].getElementsByTagName("NUMOMENTOSSEM")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("NUMOMENTOSSEM")[i].childNodes[0].nodeValue + '</option>';
	}

	}
	div+='</select><font color="#FF0000">*</font>'+
	'<form name="condicaoMomento"><table id="A" cellpadding="0" cellspacing="0" border="0" style="margin-left: 40px"><tr><br><label style="margin-left: 40px">Momento De Avaliação</label><tr><tr>'+
	'<td rowspan="2"><select name="condicao" >';
	var x=xmlDoc.getElementsByTagName("REGRAS");
	for (i=0;i<x[0].getElementsByTagName("CONDICAO").length;i++) {
	if (i == 0) {
		div += '<option selected value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	}
	else {
		div += '<option value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	}

	}
	div+='</select><input type="text" name="peso" value="0" style="text-align: right;width:25px;height:15px;font-weight:bold;" /><label>%</label></td>'+
	'<td><input type="button" value="Cima" onclick="if(this.form.peso.value<100)this.form.peso.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	'</tr>'+
	'<tr>'+
	'<td><input type=button value="Baixo" onclick="if(this.form.peso.value>0)this.form.peso.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	'</tr>'+
	'</table>'+
	'</form></div>';
	document.getElementById("content_SubLeft").innerHTML = div;
	document.defRegras.epNormal.focus();
}

function mudarMomentoDia()
{
	
	var eSelect = document.getElementById('nuMaxAvDia');
	
     eSelect.onclick = function() {
	       if(eSelect.selectedIndex === 0) {
	    	   document.getElementById("nuMaxAvSem").options[0].selected = "1 Momento de Avaliação";
	    		div='<div></div>';
	    		
	    		document.getElementById("content_SubLeft2").innerHTML = div;
	     }if (eSelect.selectedIndex === 1) {
	    	    
	    	    document.getElementById("nuMaxAvSem").options[1].selected = "2 Momentos de Avaliações";
	    	 	div='<form name="condicaoMomento1" id="condicaoMomento1"><table id="A" cellpadding="0" cellspacing="0" border="0" style="margin-left: 40px"><tr><br><label style="margin-left: 40px">Momento De Avaliação</label><tr><tr>'+
	    		'<td rowspan="2"><select name="condicao1" id="condicao1" >';
	    		
	    		var x=xmlDoc.getElementsByTagName("REGRAS");
	    		for (i=0;i<x[0].getElementsByTagName("CONDICAO").length;i++) {
	    		if (i == 0) {
	    			
	    			div += '<option selected value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}
	    		else {
	    			div += '<option value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}

	    		}
	    		
	    		div+='</select><input type="text" name="peso1" value="0" style="text-align: right;width:25px;height:15px;font-weight:bold;" /><label>%</label></td>'+
	    		'<td><input type="button" value="Cima" onclick="if(this.form.peso1.value<100)this.form.peso1.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'<tr>'+
	    		'<td><input type=button value="Baixo" onclick="if(this.form.peso1.value>0)this.form.peso1.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'</table>'+
	    		'</form></div>';
	    		
	    		document.getElementById("content_SubLeft2").innerHTML = div;
	   }
	 };
} 
function mudarMomentoSem()
{
	var eSelect = document.getElementById('nuMaxAvSem');
    
    eSelect.onclick = function() {
	       if(eSelect.selectedIndex === 0) {
	    		div='<div></div>';
	    		document.getElementById("nuMaxAvDia").options[0].selected = "1 Momento de Avaliação";
	    		document.getElementById("content_SubLeft2").innerHTML = div;
	     }if (eSelect.selectedIndex === 1) {
	    	    
	    		div='<form name="condicaoMomento2"><table id="A" cellpadding="0" cellspacing="0" border="0" style="margin-left: 40px"><tr><br><label style="margin-left: 40px">Momento De Avaliação</label><tr><tr>'+
	    		'<td rowspan="2"><select id="condicao2" name="condicao2" >';
	    		
	    		var x=xmlDoc.getElementsByTagName("REGRAS");
	    		for (i=0;i<x[0].getElementsByTagName("CONDICAO").length;i++) {
	    		if (i == 0) {
	    			
	    			div += '<option selected value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}
	    		else {
	    			div += '<option value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}

	    		}
	    		
	    		div+='</select><input type="text" name="peso2" value="0" style="text-align: right;width:25px;height:15px;font-weight:bold;" /><label>%</label></td>'+
	    		'<td><input type="button" value="Cima" onclick="if(this.form.peso2.value<100)this.form.peso2.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'<tr>'+
	    		'<td><input type=button value="Baixo" onclick="if(this.form.peso2.value>0)this.form.peso2.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'</table>'+
	    		'</form></div>';
	    		
	    		document.getElementById("content_SubLeft2").innerHTML = div;
	   }
	     else if (eSelect.selectedIndex === 2) {
	    	
	    	 div='<form name="condicaoMomento3" id="condicaoMomento3"><table id="A" cellpadding="0" cellspacing="0" border="0" style="margin-left: 40px"><tr><br><label style="margin-left: 40px">Momento De Avaliação</label><tr><tr>'+
	    		'<td rowspan="2"><select name="condicao3" id="condicao3" >';
	    		
	    		var x=xmlDoc.getElementsByTagName("REGRAS");
	    		for (i=0;i<x[0].getElementsByTagName("CONDICAO").length;i++) {
	    		if (i == 0) {
	    			
	    			div += '<option selected value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}
	    		else {
	    			div += '<option value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}

	    		}
	    		
	    		div+='</select><input type="text" name="peso3" value="0" style="text-align: right;width:25px;height:15px;font-weight:bold;" /><label>%</label></td>'+
	    		'<td><input type="button" value="Cima" onclick="if(this.form.peso3.value<100)this.form.peso3.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'<tr>'+
	    		'<td><input type=button value="Baixo" onclick="if(this.form.peso3.value>0)this.form.peso3.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'</table>'+
	    		'</form></div>';
	    		div+='<form name="condicaoMomento4"><table id="A" cellpadding="0" cellspacing="0" border="0" style="margin-left: 40px"><tr><br><label style="margin-left: 40px">Momento De Avaliação</label><tr><tr>'+
	    		'<td rowspan="2"><select name="condicao4" id="condicao4" >';
	    		
	    		var x=xmlDoc.getElementsByTagName("REGRAS");
	    		for (i=0;i<x[0].getElementsByTagName("CONDICAO").length;i++) {
	    		if (i == 0) {
	    			
	    			div += '<option selected value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}
	    		else {
	    			div += '<option value="' + x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue  + '">' + 
	    					x[0].getElementsByTagName("CONDICAO")[i].childNodes[0].nodeValue + '</option>';
	    		}

	    		}
	    		
	    		div+='</select><input type="text" name="peso4" value="0" style="text-align: right;width:25px;height:15px;font-weight:bold;" /><label>%</label></td>'+
	    		'<td><input type="button" value="Cima" onclick="if(this.form.peso4.value<100)this.form.peso4.value++;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'<tr>'+
	    		'<td><input type=button value="Baixo" onclick="if(this.form.peso4.value>0)this.form.peso4.value--;" style="font-size:9px;margin:0;padding:0;width:35px;height:19px;" ></td>'+
	    		'</tr>'+
	    		'</table>'+
	    		'</form></div>';
	    		document.getElementById("content_SubLeft2").innerHTML = div;
	     }
	 };
	
	
}
function loadXML2(xmlFile) {
	makeRequest(xmlFile);
	xmlDoc=http_request.responseXML;
	
	div='<form name="regras2"><label>Proximidade Minima Entre Os Momentos De Avaliação? <br></label>'+
		'<select name="proMinMomAv" id ="proMinMomAv"><br>';
	var x=xmlDoc.getElementsByTagName("REGRAS");
	for (i=0;i<x[0].getElementsByTagName("PROXIMIDADE").length;i++) {
	if (i == 0) {
		div += '<option selected value="' + x[0].getElementsByTagName("PROXIMIDADE")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("PROXIMIDADE")[i].childNodes[0].nodeValue + '</option>';
	}
	else {
		div += '<option value="' + x[0].getElementsByTagName("PROXIMIDADE")[i].childNodes[0].nodeValue  + '">' + 
				x[0].getElementsByTagName("PROXIMIDADE")[i].childNodes[0].nodeValue + '</option>';
	}

	}
	div += '</select><font color="#FF0000">*</font><br><font color="#FF0000">*</font> Campos de preenchimento obrigatório<br><div id="avisoForm"></div>' +
	'<input type="button" value="Cancelar" name="cancelar" onclick="location.href=' + "'coordenadorHome.html'" +  '">' + 
	'<input type="button" value="Submeter" name="submeter" onclick="confirmarRegras()">' +  
	'<input type="button" value="Limpar Dados" name="limparDados" onclick="confirmarPublicarNovo()">'+
	'</form>';
			
	document.getElementById("content_SubLeft3").innerHTML = div;
}


function confirmarRegras() {
	if ( verif_campObrig_preench() ) 
	{
		
		
		epoca = get_radioButton_value();
		nuMaxAvDia = document.regras.nuMaxAvDia.value;
		condicao = document.regras.condicao.value;
		peso = document.regras.peso.value ;
		nuMaxAvSem = document.regras.nuMaxAvSem.value;
		proMinMomAv = document.regras2.proMinMomAv.value;
		selectIndDia = document.getElementById("nuMaxAvDia").selectedIndex;
	    selectIndSem = document.getElementById("nuMaxAvSem").selectedIndex;
		
		div = '<b>Época: </b>' + epoca + '<br><br>';
		div += '<b>Numero De Avaliações por Dia: </b>' + nuMaxAvDia + '<br><br>';
		div += '<b>Numero De Avaliações por Semana: </b>' + nuMaxAvSem + '<br><br>';
		div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
		div += '<b style="margin-left:40px">Condição: </b>'+condicao+'<b>    Peso:</b>'+peso+'%'+'<br><br>';
		if (selectIndDia == 1   )
		{
			
			condicao1 = document.getElementById("condicao1").value;
			peso1 = document.condicaoMomento1.peso1.value ;
			div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
			div += '<b style="margin-left:40px">Condição: </b>'+condicao1+'<b> Peso:</b>'+peso1+'%'+'<br><br>';
			
		
		}
		if (selectIndSem == 1  && selectIndDia == 0 )
		{
			condicao2 = document.getElementById("condicao2").value;
			peso2 = document.condicaoMomento2.peso2.value ;
			div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
			div += '<b style="margin-left:40px">Condição: </b>'+condicao2+'<b>    Peso:</b>'+peso2+'%'+'<br><br>';
			
		
		}
		if (selectIndSem == 2 )
		{
			condicao3 = document.getElementById("condicao3").value;
			peso3 = document.condicaoMomento3.peso3.value ;
			div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
			div += '<b style="margin-left:40px">Condição: </b>'+condicao3+'<b>    Peso:</b>'+peso3+'%'+'<br><br>';
			condicao4 = document.getElementById("condicao4").value;
			peso4 = document.condicaoMomento4.peso4.value ;
			div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
			div += '<b style="margin-left:40px">Condição: </b>'+condicao4+'<b>    Peso:</b>'+peso4+'%'+'<br><br>';
				
		}
		div += '<b>Proximidade minima entre os momentos de avaliação: </b>' + proMinMomAv + '<br><br>';
		div += '<b>Tem a certeza que deseja submeter esta proposta de Avaliação?</b><br><br>';
		div += '<input type="button" value="SIM" name="sim" onclick="submeterRegraFeedback()">'  + 
				'<input type="button" value="NÃO" name="nao" onclick="location.href=' + "'coordenador2.HTML'" +  '">';
	
		document.getElementById("content_SubLeft").innerHTML = div;
		document.getElementById("content_SubLeft2").innerHTML = "";
		document.getElementById("content_SubLeft3").innerHTML = "";
	}
	else 
	{
		document.getElementById("avisoForm").innerHTML = '<font color="#FF0000">Verifique se preencheu todos os campos obrigatórios!</font>';
	}
}

/* Devolve o valor do radioButton*/
function get_radioButton_value()  
{
	for (var i=0; i < document.regras.regrasEpoca.length; i++)
   {
		if (document.regras.regrasEpoca[i].checked)
		{
			return document.regras.regrasEpoca[i].value;
		}
   }
}

/* Caso o seja submetido a proposta de Estágio/Projecto,
   devolve um feedback ao utilizador */
function submeterRegraFeedback()
{
	div = '<b>Proposta de avaliação submetida com sucesso! ' ;
	div += '<br><br>Detalhes:<br><br>Época:</b> ' + epoca+'<br><br>';
	div += '<b>Numero De Avaliações por Dia: </b>' + nuMaxAvDia + '<br><br>';
	div += '<b>Numero De Avaliações por Semana: </b>' + nuMaxAvSem + '<br><br>';
	div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
	div += '<b style="margin-left:40px">Condição: </b>'+condicao+'<b>    Peso:</b>'+peso+'%'+'<br><br>';
	if (selectIndDia == 1   )
	{
		div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
		div += '<b style="margin-left:40px">Condição: </b>'+condicao1+'<b> Peso:</b>'+peso1+'%'+'<br><br>';
	}
	if (selectIndSem == 1  && selectIndDia == 0 )
	{
		div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
		div += '<b style="margin-left:40px">Condição: </b>'+condicao2+'<b>    Peso:</b>'+peso2+'%'+'<br><br>';
	}
	if (selectIndSem == 2 )
	{
		div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
		div += '<b style="margin-left:40px">Condição: </b>'+condicao3+'<b>    Peso:</b>'+peso3+'%'+'<br><br>';
		div += '<b style="margin-left:30px">Momento De Avalição: </b><br>';
		div += '<b style="margin-left:40px">Condição: </b>'+condicao4+'<b>    Peso:</b>'+peso4+'%'+'<br><br>';
	}
	div += '<b>Proximidade minima entre os momentos de avaliação: </b>' + proMinMomAv + '<br><br>';
	
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'coordenadorHome.html'" +  '">';
			
	document.getElementById("content_SubLeft").innerHTML = div;
}

/* Verifica se os campos obrigatórios estão preenchidos*/
function verif_campObrig_preench() 
{
	if ( verif_radioButton_assina() &&
		document.regras.nuMaxAvDia.value != ""&&
		document.regras.nuMaxAvSem.value != ""&&
		document.regras.condicao.value != ""&&
		document.regras.peso.value != ""&&
		document.regras2.proMinMomAv.value != "")
		
	{
			return true;
	}
	return false;
}

/* Verificar o se o radioButtons estao assinalados */
function verif_radioButton_assina() 
{
	if (document.regras.epNormal.checked ||
		document.regras.epRecurso.checked) 
	{
		return true;
	}
	return false;
}



function detalheMA(){
	var limparDiv="";
	div = '<b>Detalhes: </b> <br><br>';
	div += '<b>Disciplina: </b>LP <br><br>';
	div += '<b>Ano: </b>2ºAno <br><br>';
	div += '<b>Tipo de Prova: </b> Teste<br><br>';
	div += '<b>Sala: </b> Lab 8<br><br>';
	div += '<b>Hora: </b> 16H00<br><br>';
	div += '<b>Peso Percebtual da Nota Final: </b> 30%<br><br>';
	div += '<input type="button" value="Voltar" name="voltar" onclick="location.href=' + "'coordenador3.HTML'" +  '">'  + 
	'<input type="button" value="Remover Avaliação" name="removerAva" onclick="location.href=' + "'coordenador4.HTML'" +  '" >';

	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
	
}


///----------------------------------------------------------------------------------------------
//Calendário Vista Geral


function aprovarCalViGeral(){
	
	semestre = document.vistaGeral.seleSemestre.value;
	
	ano = document.vistaGeral.seleAno.value;
	div = '<b><br><br>Semestre:  </b>'+semestre+ '<br><br>';
	div += '<b>Ano: </b>'+ano+ '  <br><br>';

	div += '<b>Tem a certesa que pretende aprovar o calendário? </b> <br><br>';
	div += '<input type="button" value="SIM" name="sim" onclick="feedAprovarCalendario()">'  + 
	'<input type="button" value="NÃO" name="nao" onclick="location.href=' + "'coordenador3.HTML'" +  '">';

	document.getElementById("content_SubLeft").innerHTML = div;
}
function feedAprovarCalendario()
{
	semestre = document.calForm.selSemestre.value;
	mes = document.calForm.selMonth.value;
	ano = document.calForm.selYear.value;
	
	div = '<b>Proposta de avaliação submetida com sucesso! ' ;
	div += '<br><br>Detalhes:<br><br>Época:</b> ' ;
	div += '<b><br><br>Semestre:</b> '+semestre+ ' <br><br>';
	div += '<b>Ano:</b>2012/2013 <br><br>';
	div += '<b>Meses:</b> Outubro|Novembro|Dezembro|Janeiro|Fevereiro <br><br>';
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'coordenadorHome.html'" +  '">';
			
	document.getElementById("content_SubLeft").innerHTML = div;
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
	       div+="<TD ALIGN=center height=50>"+day+"<br></TD>";
	       day++;
	 }
	 div+="<TR>";
	 // fill the remaining weeks
	 while (day <= month_length) {
	    for (var i=1;i<=7 && day<=month_length;i++){
	    	if (day==11)
			{
	    		div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick='detalheMA()'>1º Ano</br>MA Teste 30%</u></a>"+"</TD>";
	    		
			}
	    	
	    	else if (day==12)
			{
				 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick=''>3º Ano <br> LP Trabalho 30%</br></a>"+"</TD>";
			
			}
	    	else if (day==23)
			{
				 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick=''>3º Ano<br>SRC Teste 5%</br></a>"+"</TD>";
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
	 div += "<input type=button align=left value='Cancelar' onClick=location.href='coordenadorHome.html'></input>";
	 div +="<input type=button align=left value='Aprovar' onClick='aprovarCalendario();'></input>";
	  document.getElementById("content_SubLeft2").innerHTML = div;
}
function aprovarCalendario(){
	
	var limparDiv ="";
	semeSelec  = document.getElementById('selSemestre');
	semestre = document.calendario.selSemestre.value;
	ano = document.calendario.selYear.value;
	div = '<b><br><br>Semestre:</b> '+semestre+ ' <br><br>';
	div += '<b>Ano:</b>'+ano + ' <br><br>';
	if (semeSelec.selectedIndex === 0 ){
		
	div += '<b>Meses:</b> Outubro | Novembro | Dezembro | Janeiro | Fevereiro <br><br>';
	}
	else if (semeSelec.selectedIndex === 1 )
	{
	div += '<b>Meses:</b> Março | Abril | Maio | Junho | Julho <br><br>';
	}
	div += '<b>Tem a certesa que pretende aprovar o calendário? </b> <br><br>';
	div += '<input type="button" value="SIM" name="sim" onclick="feedAprovarCalendario()">'  + 
	'<input type="button" value="NÃO" name="nao" onclick="location.href=' + "'coordenador3.HTML'" +  '">';
	

	document.getElementById("content_SubLeft").innerHTML = div;
	document.getElementById("content_SubLeft2").innerHTML = limparDiv;
}

function feedAprovarCalendario()
{
	
	div = '<b>Proposta de avaliação submetida com sucesso!</b> ' ;
	div += '<b><br><br>Semestre:</b> '+semestre+ ' <br><br>';
	div += '<b>Ano:</b>'+ano+ '  <br><br>';
	if (semeSelec.selectedIndex === 0 ){
		
		div += '<b>Meses:</b> Outubro | Novembro | Dezembro | Janeiro | Fevereiro <br><br>';
	}
	else if (semeSelec.selectedIndex === 1 )
	{
		div += '<b>Meses:</b> Março | Abril | Maio | Junho | Julho <br><br>';
	}
	
	div += '<br><br><input type="button" value="Voltar à página inicial" name"botaoVoltar" onclick="location.href=' + 
			"'coordenadorHome.html'" +  '">';
	document.getElementById("content_SubLeft").innerHTML = div;
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
	div += "<input type=button value=VistaGeral align=right onClick=></input>";
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
//------------------------------------------------------------------
function day_title2(day_name){
	  div+="<TD ALIGN=center width=200 height=50>"+day_name+"</TD>";
	  document.getElementById("content_SubLeft2").innerHTML = div;
	}
	//fills the month table with numbers
function fill_table2(month,month_length)
	{ 
		 day=1;
		 // begin the new month table
		 
		 div="<TABLE BORDER=2 CELLSPACING=2 CELLPADDING=%20  height=50    >";
		 div+="<TD COLSPAN=7 ALIGN=center height=50><B>"+month+"   "+(year)+"</B><TR>";
		 // column headings
		 
		 day_title2("Segunda");
		 day_title2("Terça");
		 day_title2("Quarta");
		 day_title2("Quinta");
		 day_title2("Sexta");
		 day_title2("Sabado");
		 day_title2("Domingo");
		 // pad cells before first day of month
		 div+="</TR><TR>";
		 for (var i=1;i<start_day;i++){
		       div+="<TD>";
		 }
		 // fill the first week of days
		 for (var i=start_day;i<8;i++){
		       div+="<TD ALIGN=center height=50>"+day+"<br></TD>";
		       day++;
		 }
		 div+="<TR>";
		 // fill the remaining weeks
		 while (day <= month_length) {
		    for (var i=1;i<=7 && day<=month_length;i++){
		    
		    	
		    	if (day==12)
				{
					 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick=''>3º Ano <br> LP Trabalho 30%</br></a>"+"</TD>";
				
				}
		    	else if (day==23)
				{
					 div+="<TD ALIGN=center height=50>"+day+"<br><a href='#' onClick=''>3º Ano<br>SRC Teste 5%</br></a>"+"</TD>";
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
		 div += "<input type=button align=left value='Cancelar' onClick=location.href='coordenadorHome.html'></input>";
		 div +="<input type=button align=left value='Aprovar' onClick='aprovarCalendario();'></input>";
		  document.getElementById("content_SubLeft2").innerHTML = div;
}
function contruirCalendario2()
{ 

	//CAHNGE the below variable to the CURRENT YEAR
	year=2012;
	
	//first day of the week of the new year
	today= new Date("October 0, "+year);
	start_day = today.getDay() + 1  ; // starts with 0
	div= "<form name=calForm align=center >";
	div += "<TABLE border=1 width=100%  >";
	div+="<TABLE align=center><TR><TD>";
	fill_table2("Outubro",31);
	div+="</TR></TABLE>";
	div += "</td><tr><td>";
	div+="</TABLE>";

	document.getElementById("content_SubLeft2").innerHTML = div;
}