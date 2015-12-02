function $(id) {return document.getElementById(id);}
function array_dump(a, t)
{
    var str="";
    if (t == undefined)
        t='';
    if(typeof(a) != 'object')
        return '';
    var key, value;
    for ( key in a ) {
        value = a[key];
        str += t + key;
        if(typeof(value) == "string")
            str += " : "+value+"\n";
        else
            str += "\n"+array_dump(value, t +'     ');
    }
    return str;
}
function htmlFormat(str, img, folder, uid)
{
    if(img == null) img = false;
    var nms= "_htmlformat9f22131254512149", my_url;
    var uu, i=0;
    var cvRegExps= Array();
    var ccc, cc, events;
    //cc = ["background", "src", "href", "class"];
    cc = ["background", "src", "href", "style", "class"];
    events=["onactivate","onbeforeactivate","onbeforecut","onbeforedeactivate","onbeforeeditfocus","onbeforepaste","onblur","onclick","oncontextmenu","oncontrolselect","oncut","ondblclick","ondeactivate","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","onfilterchange","onfocus","onfocusin","onfocusout","onhelp","onkeydown","onkeypress","onkeyup","onlosecapture","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onmove","onmoveend","onmovestart","onpaste","onpropertychange","onreadystatechange","onresize","onresizeend","onresizestart","onselectstart","ontimeerror"]; /* event */
    ccc = cc.concat(events);
    /* init convertAttributeName RegExp */
    for (i in ccc)  cvRegExps[i] = new RegExp(ccc[i] + "[\\t\\s]*=", "gi");
    while(true){
        uu="0" + Math.random();
        uu = "_"+uu.substring(3);
        if(str.indexOf(uu) == -1)
            break;
        //if(i++ >10000) alert("made");
    }
    function get_my_url(){var url = window.location.href;var tmp = url.split("://");tmp = tmp[1].split("/");return(tmp[0]);}
    my_url = get_my_url();
    function is_myurl(url){
        var tmp = url.split("://");
        if(tmp.length == 1) return true;
        tmp = tmp[1].split("/");
        if(my_url != tmp[0]) return false;
        return true;
    }
    function convertAttributeName(ts){
        var i, r, n, tmp;       
        r = /^(<[\/]?)([A-Za-z][^>=\s\'\"]*)([^<>]*)([\/]?>)/;
        if(r.test(ts)){
            if(RegExp.$1=="</")
                return ts;
        }else return ts;
        for(i=0;i<ccc.length;i++){
            ts = ts.replace(cvRegExps[i], ccc[i].toUpperCase()+uu+"=");
        }
        if(r.test(ts)){
            if(RegExp.$2.toUpperCase() == "SCRIPT" || RegExp.$2.toUpperCase() == "STYLE" ){
                ts=RegExp.$1 + RegExp.$2 +" type=\"noscript\" " + RegExp.$3 + RegExp.$4;
            }
        }
        return ts;
    }
    function antiFaulseCAN(str){if(str==null)return ''; return(str.replace(uu, ''));}
    //var can='<table width="443" border="0" cellpadding="0" cellspacing="0" background="coco.gif" class="ss">';alert(convertAttributeName(can));return;
    function removeABI(str){
        if(str == undefined) return '';
        var r=/([^\:\s\t]+)[\s\t]*:[\s\t]*(.+)/
        var nvs=Array(), as=str.split(";"), n, v;
        for(var i =0; i< as.length; i++){
            if (!r.test(as[i])) continue;
            n = RegExp.$1;v =RegExp.$2;
            if(n.toUpperCase() == "BACKGROUND-IMAGE" || n.toUpperCase() == "BACKGROUND"){
                nvs[n]=v.replace(/url[\t\s]*\([\t\s]*([^\t\s]+)[\t\s]*\)/g, function (a,b){if(is_myurl(b)||img)return a;else return 'url()';});
            }
            else nvs[n] = v;
        }
        //alert(array_dump(nvs));
        return nvs;
    }
    //var s='a:b; c:d; a:b; border:thin; background-image   :   url(http://sfsdf.com/cc.gif) ; background-color:#000066;  background : repeat % url ( http://sfsdf.com/dd.gif )  #FF0000 ssf ff ss over;';removeABI(s);return;
    function removeTA(node){
        var rstr="";
        var tmp, i, k, len, ns, nn, n, rf=false;
        //alert(node.nodeName + "                   "+ node.nodeType);
        if(node.childNodes.length == 0) return '';
        ns = node.childNodes; len = ns.length; 
        for(i=0;i<len;i++){
            n = ns[i];
            if(n == undefined) continue;
            if(n.nodeType==3) {n.nodeValue = antiFaulseCAN(n.nodeValue);continue;} //FIXME an-convert uu
            else if(n.nodeName=='#cdata-section') continue;
            else if(n.nodeType==1){
                rf = false;
                nn = n.nodeName.toUpperCase();
                //alert(nn);
                switch (nn){
                case "IMG":
                    src = n.getAttribute("SRC"+uu);
                    if(src == undefined)
                        break;
                    if(src.indexOf("cid:") == 0) {
                        cid = src.substring(4);
                        n.removeAttribute("SRC"+uu);
                        tmp = "?box=" + folder +"&uid="+ uid + "&cid=" + cid;
                        n.setAttribute("src", tmp);
                    } else {
                        n.removeAttribute("SRC"+uu);
                        if(is_myurl(src)||img)
                            n.setAttribute("src", src);
                        else
                            n.setAttribute("alt", "disabled img");
                
                    }
                    /*if(tmp!=undefined){
                        n.removeAttribute("SRC"+uu);
                        if(is_myurl(tmp)||img){
                            n.setAttribute("src", tmp);
                        }else
                            n.setAttribute("alt", "disabled img");
                    }*/
                    break;
                case "CID":
                    break;
                case "STYLE":
                    break;
                case "SCRIPT":
                    break;
                case "BASE":
                    break;
                case "META":
                    break;
                case "LINK":
                    rf=true;
                    node.removeChild(n);
                    break;
                case "A":
                    tmp = n.getAttribute("HREF"+uu);
                    if(tmp!=undefined){
                        n.removeAttribute("HREF"+uu);
                        n.setAttribute("HREF", tmp);
                    }
                    break;
                default:
                    break;  
                }
                //alert(nn);
                if(!rf){
                    for (k in events){
                        n.removeAttribute(events[k].toUpperCase()+uu);//n.removeAttribute(events[k]+uu);
                    }
                    n.removeAttribute("CLASS"+uu);//n.removeAttribute("class"+uu);
                    //
                    tmp = n.getAttribute("STYLE"+uu);
                    if(tmp != undefined){
                        var nvs = removeABI(tmp);
                    //  for(var nv in nvs) n.style[nv] = nvs[nv];
                        for(var nv in nvs) n.style.setProperty(nv, nvs[nv], "");
                        n.removeAttribute("STYLE"+uu)
                    }
                    //
                    tmp = n.getAttribute("BACKGROUND"+uu);
                    if(tmp != undefined){
                        if(is_myurl(tmp)||img)
                            n.setAttribute("background", tmp);
                        n.removeAttribute("BACKGROUND"+uu);
                    }
                    removeTA(n);
                }
            }
        }
    }
    //
    var rp, cv;
    rp=/<(?:(?:\/?[A-Za-z][^<>=\s]*(?:[=\s](?:(?!['"])[\s\S]*?|'[^']*'|"[^"]*"))*)|(?:!--[\s\S]*?--))>/g;
    cv = str.replace(rp, function(a){return convertAttributeName(a)});
    //alert(cv);return;
    var div = document.createElement("div");div.innerHTML = cv;//alert(div.innerHTML);
    //var ss="";for ( i in div.getElementsByTagName("table")[0].getAttributeNode("style"+uu)){ss += i + "\n";}$("dis4").value = ss;
    //alert(div.getElementsByTagName("table")[0].getAttribute("style"));
    removeTA(div);
    return div.innerHTML;
}
function htmlToTxt(str)
{
    var div = document.createElement("div");div.innerHTML = str;
    if(document.all)
        return div.innerText;
    else
        return div.textContent;
}

function va()
{
    var hs=document.getElementById("hv").value, tmp, tmp2;
    tmp= htmlFormat(hs)
    tmp2 = htmlToTxt(tmp);
    document.getElementById("dis1").innerHTML = tmp;
    document.getElementById("dis3").value = tmp;
    document.getElementById("dis5").innerHTML = tmp2;
    
}
function v()
{
    document.getElementById("dis1").innerHTML=document.getElementById("hv").value;
}

