var ZYEDITOR_TEXT_ID=0,ZYEDITOR_TEXT_A=[];
function ZYEDITOR_TEXT(obj){
	this.id=ZYEDITOR_TEXT_ID++;
	this.author='http://www.zhangyan.name';
	this.version='1.00';
	this.copyright='GPL 3.0';
	this.ie=(document.all)?1:0;
	this.content=this.author;
	this.width="100%";
	this.height="350px";
	ZYEDITOR_TEXT_A[this.id]=this;
	if(obj==null)return;
	for(i in obj){
		eval('this.'+i)=obj.i;
	}
}
ZYEDITOR_TEXT.prototype.get_cobj=function(){
	return document.getElementById("zyeditor_text_t_"+this.id);
}
ZYEDITOR_TEXT.prototype.get_content=function(){
	return this.get_cobj().value;
}
ZYEDITOR_TEXT.prototype.set_content=function(v){
	this.content=v;
	this.get_cobj().value=v;
}
ZYEDITOR_TEXT.prototype.content_changed=function(){
	return (this.content!=this.get_content());
}
ZYEDITOR_TEXT.prototype.show_editor=function(obj){
	var o,s=this.show_buttons();
	if(obj==null){
		document.write(s);
	}else{
		obj.innerHTML=s;
	}
}
ZYEDITOR_TEXT.prototype.show_buttons=function(){
	var bs1,bs2,i,s='',thisid=this.id;
	function create_button(innerHTML,cmd,title){
		var s='';
		s+='<td style="border:1px solid;cursor:pointer;background-color:#CCCCCC;"';
		s+=' title="'+title+'"';
		s+=' onclick="ZYEDITOR_TEXT_A['+thisid+'].cmd(\''+cmd+'\')"';
		s+='>';
		s+=innerHTML;
		s+='</td>'
		return s;
	}
	bs=Array(
	Array('H2','H2','标题2'),
	Array('H3','H3','标题3'),
	Array('EM','EM','强调'),
	Array('I','I','斜体'),
	Array('B','B','粗体'),
	Array('BR','BR','换行'),
	Array('HR','HR','直线'),
	Array('Q','BLOCKQUOTE','BLOCKQUOTE'),
	Array('PRE','PRE','TEXT format'),
	Array('P','P','段落'),
	Array('PP','PP','每行段落'),
	Array('UL','UL',''),
	Array('OL','OL',''),
	Array('LI','LI',''),
	Array('ULI','ULI',''),
	Array('OLI','OLI',''),
	Array('T','TAB',''),
	Array('TT','TABTAB',''),
	Array('-TT','-TABTAB',''),
	Array('IMG','IMG',''),
	Array('A','A','链接'),
	Array('CONVERT','CONVERT','转义'),
	Array('BLANK','BLANK','删除选定空行')
	)
	s='<div id="zyeditor_text_d1_'+this.id+'" style="width:'+this.width+'";>';
	s+='<div style="height:10px;"></div>';
	s+='<table cellpadding="2" cellspacing="2"><tr>';
	for(i=0;i<bs.length;i++){
		s+=create_button(bs[i][0],bs[i][1],bs[i][2]);
	}
	s+='</tr></table>';
	s+='<div style="height:5px;"></div>';
	s+='<div id="zyeditor_text_d2_'+this.id+'" style="height:'+this.height+';width:100%;">';
	s+='<textarea id="zyeditor_text_t_'+this.id+'" style="width:100%;height:100%;">'+this.author+'</textarea>';
	s+='</div></div>';
	return s;
}
ZYEDITOR_TEXT.prototype.cmd=function(cmd){
	function get_se(){
		var s1=startPos,e1=endPos;
		while(s1>-1){
			if(txtarea.value.substr(s1,1) == "\n"){ s1++; break; }
			s1--;
		}
		while(e1<txtarea.value.length){
			if(txtarea.value.substr(e1,1) == "\n"){ e1--; break; }
			e1++;
		}
		startPos = s1; endPos = e1;
		selText = txtarea.value.substring(startPos, endPos);
	}
	var txtarea = this.get_cobj();
	var selText, newText='';
	if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
		var textScroll = txtarea.scrollTop;
		txtarea.focus();
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		selText = txtarea.value.substring(startPos, endPos);
		switch(cmd) {
		case 'H2':
		case 'H3':
		case 'B':
		case 'I':
		case 'UL':
		case 'OL':
		case 'LI':
		case 'P':
		case 'EM':
		case 'CITE':
		case 'PRE':
		case 'BLOCKQUOTE':
			newText = '<' + cmd + '>' + selText + '</' + cmd + '>';
			break;
		case 'A':
			newText = '<A href="" target="_blank">' + selText + '</A>';
			break;
		case 'BR':
		case 'HR':
			newText = '<' + cmd + ' />';
			break;
		case 'IMG':
			newText = '<IMG src="" />';
			break;
		case 'TAB':
			newText = '\t' + selText;
			break;
		case 'TABTAB':
			get_se();
			newText = "\t" + selText.split("\n").join("\n\t");
			break;
		case 'PP':
			get_se();
			newText = '<P>'+selText.split("\n").join("</P>\n<P>")+'</P>';
			break;
		case '-TABTAB':
			get_se();
			var ls=selText.split("\n"),k;
			for(k=0;k<ls.length;k++){
			   	if(ls[k] != '' &&(ls[k].substr(0,1)=="\t" || ls[k].substr(0,1) == " " || ls[k].substr(0,1) == '　'))
					ls[k] = ls[k].substring(1);
			}
			newText = ls.join("\n");
			break;
		case 'ULI':
		case 'OLI':
			var ls=selText.split("\n"),k,lu=cmd.substr(0,2);
			for(k=0;k<ls.length;k++){
			   	if(ls[k]!='')
					ls[k] = "\t" + '<LI>' + ls[k] + '</LI>';
			}
			newText = '\n<'+lu+'>\n' + ls.join('\n') + '\n</'+lu+'>\n'
			break;
		case 'BLANK':
			var ls=selText.split("\n"),k;nls=Array();
			for(k=0;k<ls.length;k++){
			   	if(ls[k]!='')
					nls[nls.length] =  ls[k] ;
			}
			newText = nls.join('\n');
			break;
		case 'CONVERT':
			get_se();newText = selText;
			newText = newText.split("&").join("&amp;");
			newText = newText.split("<").join("&lt;");
			newText = newText.split(">").join("&gt;");
			break;
		default:
			newText = selText;
		}
		txtarea.value = txtarea.value.substring(0, startPos)
		+ newText
		+ txtarea.value.substring(endPos, txtarea.value.length);
		//set new selection
		txtarea.selectionStart = startPos;
		txtarea.selectionEnd = startPos + newText.length;
		txtarea.scrollTop = textScroll;
	} 

}
