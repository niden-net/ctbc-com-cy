/*
	krpano Flash/HTML5 Embedding script
	krpano 1.0.8.15 (build 2012-10-05)

	Usage informations:
		http://krpano.com/docu/html/

	This script has the SWFObject v1.5 script embedded:
		SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
		SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
		http://www.opensource.org/licenses/mit-license.php
*/
if (typeof deconcept == "undefined") var deconcept = {};
if (typeof deconcept.util == "undefined") deconcept.util = {};
if (typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = {};
deconcept.SWFObject = function (a, b, c, e, f, g) {
    this.params = {};
    this.variables = {};
    this.attributes = [];
    this.vchk = function (d) {
        d = ("" + d).toLowerCase();
        return d != "menu"
    };
    a && this.setAttribute("swf", a);
    b && this.setAttribute("id", b);
    c && this.setAttribute("width", c);
    e && this.setAttribute("height", e);
    f && this.setAttribute("version", new deconcept.PlayerVersion(f.toString().split(".")));
    this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) deconcept.SWFObject.doPrepUnload =
        true;
    g && this.addParam("bgcolor", g)
};
deconcept.SWFObject.prototype = {
    setAttribute: function (a, b) {
        this.attributes[a] = b
    }, getAttribute: function (a) {
        return this.attributes[a]
    }, addParam: function (a, b) {
        this.params[a] = b
    }, getParams: function () {
        return this.params
    }, addVariable: function (a, b) {
        this.variables[a] = b
    }, getVariable: function (a) {
        return this.variables[a]
    }, getVariables: function () {
        return this.variables
    }, getVariablePairs: function () {
        var a = [], b, c = this.getVariables();
        for (b in c) if (this.vchk(b)) a[a.length] = b + "=" + c[b];
        return a
    }, getSWFHTML: function () {
        var a =
            "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            a = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '"';
            a += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var b = this.getParams();
            for (var c in b) if (this.vchk(c)) a += [c] + '="' + b[c] + '" ';
            b = this.getVariablePairs().join("&");
            if (b.length > 0) a += 'flashvars="' + b + '"';
            a +=
                "/>"
        } else {
            a = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">';
            a += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            b = this.getParams();
            for (c in b) if (this.vchk(c)) a += '<param name="' + c + '" value="' + b[c] + '" />';
            b = this.getVariablePairs().join("&");
            if (b.length > 0) a += '<param name="flashvars" value="' + b + '" />';
            a += "</object>"
        }
        return a
    },
    write: function (a) {
        if (this.installedVer.versionIsValid(this.getAttribute("version"))) {
            (typeof a == "string" ? document.getElementById(a) : a).innerHTML = this.getSWFHTML();
            return true
        }
        return false
    }
};
deconcept.SWFObjectUtil.getPlayerVersion = function () {
    var a = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var b = navigator.plugins["Shockwave Flash"];
        if (b && b.description) a = new deconcept.PlayerVersion(b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."))
    } else {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
        } catch (c) {
        }
        if (b != null) a = new deconcept.PlayerVersion(b.GetVariable("$version").split(" ")[1].split(","))
    }
    return a
};
deconcept.PlayerVersion = function (a) {
    this.major = a[0] != null ? parseInt(a[0]) : 0;
    this.minor = a[1] != null ? parseInt(a[1]) : 0;
    this.rev = a[2] != null ? parseInt(a[2]) : 0
};
deconcept.PlayerVersion.prototype.versionIsValid = function (a) {
    if (this.major < a.major) return false;
    if (this.major > a.major) return true;
    if (this.minor < a.minor) return false;
    if (this.minor > a.minor) return true;
    if (this.rev < a.rev) return false;
    return true
};
deconcept.util = {
    getRequestParameter: function (a) {
        var b = document.location.search || document.location.hash;
        if (a == null) return b;
        if (b) {
            b = b.substring(1).split("&");
            for (var c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return b[c].substring(b[c].indexOf("=") + 1)
        }
        return ""
    }
};
deconcept.SWFObjectUtil.cleanupSWFs = function () {
    for (var a = document.getElementsByTagName("OBJECT"), b = a.length - 1; b >= 0; b--) {
        a[b].style.display = "none";
        for (var c in a[b]) if (typeof a[b][c] == "function") a[b][c] = function () {
        }
    }
};
if (deconcept.SWFObject.doPrepUnload) if (!deconcept.unloadSet) {
    deconcept.SWFObjectUtil.prepUnload = function () {
        __flash_unloadHandler = function () {
        };
        __flash_savedUnloadHandler = function () {
        };
        window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs)
    };
    window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
    deconcept.unloadSet = true
}
var getQueryParamValue = deconcept.util.getRequestParameter,
    SWFObject = deconcept.SWFObject;

function SWFkrpanoMouseWheel2(l) {
    function m(a) {
        if (!a) {
            a = d.event;
            a.target = a.srcElement
        }
        n = a ? a.target : null
    }

    function o(a) {
        if (!a) {
            a = d.event;
            a.target = a.srcElement
        }
        var c = 0, i = g.length;
        for (c = 0; c < i; c++) {
            var e = g[c];
            if (e) {
                var f = h[e.id];
                if (f && e.needfix) {
                    var b = f.getBoundingClientRect();
                    e = f == n;
                    b = a.clientX >= b.left && a.clientX < b.right && a.clientY >= b.top && a.clientY < b.bottom;
                    if ((f == a.target || e) && b == false) try {
                        f.externalMouseEvent2 && f.externalMouseEvent2(0, "mouseUp")
                    } catch (q) {
                    }
                }
            }
        }
        return true
    }

    function j(a) {
        if (!a) {
            a = d.event;
            a.target = a.srcElement
        }
        var c = 0, i = false;
        if (a.wheelDelta) {
            c = a.wheelDelta / 120;
            if (d.opera && k) c /= 4 / 3
        } else if (a.detail) {
            c = -a.detail;
            if (k == false) c /= 3
        }
        if (c) {
            var e = 0, f = g.length;
            for (e = 0; e < f; e++) {
                var b = g[e];
                if (b) if (b = h[b.id]) if (b == a.target) {
                    try {
                        if (b.jswheel) b.jswheel(c); else if (b.externalMouseEvent) b.externalMouseEvent(c); else if (b.enable_mousewheel_js_bugfix) {
                            b.enable_mousewheel_js_bugfix();
                            b.externalMouseEvent && b.externalMouseEvent(c)
                        }
                    } catch (q) {
                    }
                    i = true;
                    break
                }
            }
        }
        if (i) {
            a.stopPropagation && a.stopPropagation();
            a.preventDefault &&
            a.preventDefault();
            a.cancelBubble = true;
            a.cancel = true;
            return a.returnValue = false
        }
    }

    var d = window, h = document,
        k = navigator.appVersion.toLowerCase().indexOf("mac") >= 0,
        g = SWFkrpanoMouseWheel2.instances, n = null;
    if (!g) {
        g = SWFkrpanoMouseWheel2.instances = [];
        if (d.addEventListener) {
            d.addEventListener("DOMMouseScroll", j, false);
            d.addEventListener("mousewheel", j, false);
            h.addEventListener("mousedown", m, false);
            h.addEventListener("mouseup", o, false)
        } else {
            if (d.opera) d.attachEvent("onmousewheel", j); else d.onmousewheel = h.onmousewheel =
                j;
            h.onmousedown = m;
            h.onmouseup = o
        }
    }
    var p = ("" + l.params.wmode).toLowerCase();
    g.push({
        id: l.getAttribute("id"),
        needfix: k || !!d.chrome || p == "opaque" || p == "transparent"
    })
};

function createkrpanoJSviewer(c, a, b, e, d, i, l) {
    function m() {
        var h = null;
        if (typeof krpanoJS === "undefined") h = l ? "ERROR:<br/><br/>Adobe Flashplayer 10 or higher needed!<br/><br/><br/><br/>" : "ERROR:<br/><br/>HTML5 Version not available!<br/><br/><br/><br/>"; else if (krpanojs_init(f) == false) h = "LICENSE ERROR";
        if (h) document.getElementById(f.htmltarget).innerHTML = '<table width="100%" height="100%"><tr valign="middle"><td><center>' + h + "</center></td></tr></table>"
    }

    if (e === undefined) e = "";
    var j = false;
    if (d === undefined ||
        d == true) {
        if (!window.krpanoreg || !window.krpanokey) {
            document.write('<script src="' + e + 'krpanoiphone.license.js" type="text/javascript" charset="UTF-8"><\/script>');
            j = true
        }
        if (typeof krpanoJS === "undefined") {
            document.write('<script src="' + e + 'krpanoiphone.js" type="text/javascript"><\/script>');
            j = true
        }
    }
    var f = {};
    f.params = {};
    f.params.id = c ? c : "krpanoSWFObject";
    f.params.width = a ? a : "100%";
    f.params.height = b ? b : "100%";
    f.params.basepath = e;
    f.params.bgcolor = i;
    f.vars = {};
    f.addVariable = function (h, n) {
        f.vars[String(h).toLowerCase()] =
            n
    };
    f.addParam = function (h, n) {
        f.params[String(h).toLowerCase()] = n
    };
    f.passQueryParameters = function () {
        var h = document.location.search || document.location.hash;
        if (h) {
            h = h.substring(1).split("&");
            for (var n = 0; n < h.length; n++) {
                var o = h[n], g = o.indexOf("=");
                if (g == -1) g = o.length;
                var k = o.substring(0, g);
                o = o.substring(g + 1);
                f.addVariable(k, o)
            }
        }
    };
    f.embed = function (h) {
        f.htmltarget = h;
        j ? window.addEventListener("load", m, false) : m(null)
    };
    return f
}

function createkrpanoSWFviewer(c, a, b, e, d, i, l) {
    if (typeof a === "undefined") a = "krpanoSWFObject";
    if (typeof b === "undefined") b = "100%";
    if (typeof e === "undefined") e = "100%";
    if (typeof d === "undefined") d = "#000000";
    var m = navigator.userAgent, j = m.toLowerCase(), f = false, h = 0, n = "",
        o = false;
    if (j.indexOf("ipad") >= 0 || j.indexOf("iphone") >= 0 || j.indexOf("ipod") >= 0) f = true; else {
        h = deconcept.SWFObjectUtil.getPlayerVersion().major;
        if (h == 0) {
            f = createPanoViewer().isHTML5possible();
            o = true
        }
    }
    if (i === false) f = false;
    if (f) {
        i = "./";
        m = c.lastIndexOf("/");
        if (m >= 0) i = c.slice(0, m + 1);
        c = true;
        if (l && l.html5licenseload === false) c = false;
        return createkrpanoJSviewer(a, b, e, i, c, d, o)
    }
    if (h >= 9) {
        for (; ;) if (document.getElementById(a)) a += String.fromCharCode(48 + Math.floor(9 * Math.random())); else break;
        var g = new SWFObject(c, a, b, e, "9.0.28", d);
        g.addParam("allowFullScreen", "true");
        g.addParam("allowScriptAccess", "always");
        g.setAttribute("style", "outline:none;");
        g.addVariable("browser.useragent", m);
        g.embed = function (k) {
            g.write(k) && SWFkrpanoMouseWheel2(g)
        };
        g.passQueryParameters =
            function () {
                var k = document.location.search || document.location.hash;
                if (k) {
                    k = k.substring(1).split("&");
                    for (var r = 0; r < k.length; r++) {
                        var p = k[r], q = p.indexOf("=");
                        if (q == -1) q = p.length;
                        var s = p.substring(0, q);
                        p = p.substring(q + 1);
                        g.addVariable(s, p)
                    }
                }
            };
        return g
    } else n = 'Adobe Flashplayer 10 or higher needed<br/><br/><br/><a href="http://www.adobe.com/go/getflashplayer/" target="_blank" style="text-decoration:none;"><small>...click here to download...</small></a><br/><br/>';
    g = {};
    g.addVariable = function () {
    };
    g.addParam =
        function () {
        };
    g.passQueryParameters = function () {
    };
    g.embed = function (k) {
        document.getElementById(k).innerHTML = '<table width="100%" height="100%"><tr valign="middle"><td><center>ERROR:<br/><br/>' + n + "<br/><br/></center></td></tr></table>"
    };
    return g
}

var createswf = createkrpanoSWFviewer;

function embedpano(c) {
    c || (c = {});
    var a = c.swf ? c.swf : "krpano.swf",
        b = c.xml ? c.xml : a.split(".swf").join(".xml"),
        e = c.id ? c.id : "krpanoSWFObject", d = c.target ? c.target : null,
        i = c.width ? c.width : "100%", l = c.height ? c.height : "100%",
        m = c.bgcolor ? c.bgcolor : "#000000";
    if (d) {
        a = createPanoViewer({swf: a, id: e, width: i, height: l, bgcolor: m});
        a.addVariable("xml", b);
        c.useHTML5 && a.useHTML5(c.useHTML5);
        c.html5 && a.useHTML5(c.html5);
        c.wmode && a.addParam("wmode", c.wmode);
        c.passQueryParameters && a.passQueryParameters();
        if (c.vars) for (var j in c.vars) typeof c.vars[j] !=
        "function" && a.addVariable(j, c.vars[j]);
        a.embed(d)
    } else alert("ERROR: embedpano() - target needed")
}

var embedPanoViewer = embedpano;

function createPanoViewer(c) {
    c || (c = {});
    var a = {};
    a.pswfpath = c.swf ? c.swf : "krpano.swf";
    a.pxml = c.xml ? c.xml : a.pswfpath.split(".swf").join(".xml");
    a.pid = c.id ? c.id : "krpanoSWFObject";
    a.ptarget = c.target ? c.target : null;
    a.pwidth = c.width ? c.width : "100%";
    a.pheight = c.height ? c.height : "100%";
    a.bgcolor = c.bgcolor ? c.bgcolor : "#000000";
    a.pvars = [];
    a.pparams = [];
    a.HTML5 = "auto";
    if (c.useHTML5) a.HTML5 = c.useHTML5;
    if (c.html5) a.HTML5 = c.html5;
    a.useHTML5 = function (b) {
        a.HTML5 = b
    };
    a.isFlashpossible = function () {
        return deconcept.SWFObjectUtil.getPlayerVersion().major >=
            9
    };
    a.isHTML5possible = function () {
        var b, e = navigator.userAgent, d = e.toLowerCase();
        if (d.indexOf("ipad") >= 0 || d.indexOf("iphone") >= 0 || d.indexOf("ipod") >= 0) return true;
        if (d.indexOf("safari") > 0) {
            b = d.indexOf("version");
            if (b > 0) {
                b = parseInt(d.slice(b + 8));
                if (b >= 5) return true
            }
            b = d.indexOf("chrome");
            if (b > 0) {
                b = parseInt(d.slice(b + 7));
                if (b >= 20) return true
            }
            b = d.indexOf("android");
            if (b > 0) {
                b = parseInt(d.slice(b + 8));
                if (b >= 4) return true
            }
        } else {
            b = d.indexOf("firefox");
            if (b > 0) {
                b = parseInt(d.slice(b + 8));
                if (b >= 10) return true
            }
            b = e.indexOf("MSIE ");
            if (b > 0) {
                b = parseInt(e.slice(b + 5));
                if (b >= 10) return true
            }
        }
        return false
    };
    a.setSWFPath = function (b) {
        a.pswfpath = b;
        if (a.pxml == "krpano.swf") a.pxml = a.pswfpath.split(".swf").join(".xml")
    };
    a.setViewerID = function (b) {
        a.pid = b
    };
    a.setSize = function (b, e) {
        a.pwidth = b;
        a.pheight = e
    };
    a.isDevice = function (b) {
        var e = "all", d = navigator.userAgent.toLowerCase();
        if (d.indexOf("ipad") >= 0) e += "|ipad";
        if (d.indexOf("iphone") >= 0) e += "|iphone";
        if (d.indexOf("ipod") >= 0) e += "|ipod";
        if (d.indexOf("android") >= 0) e += "|android";
        b = String(b).toLowerCase().split("|");
        if (b == null) return true;
        var i = b.length;
        for (d = 0; d < i; d++) if (e.indexOf(b[d]) >= 0) return true;
        return false
    };
    a.addVariable = function (b, e) {
        b = String(b).toLowerCase();
        if (b == "xml" || b == "pano") a.pxml = e; else a.pvars[b] = e
    };
    a.addParam = function (b, e) {
        a.pparams[b] = e
    };
    a.passQueryParameters = function () {
        var b = document.location.search || document.location.hash;
        if (b) {
            b = b.substring(1).split("&");
            for (var e = 0; e < b.length; e++) {
                var d = b[e], i = d.indexOf("=");
                if (i == -1) i = d.length;
                var l = d.substring(0, i);
                d = d.substring(i + 1);
                if (l == "useHTML5" ||
                    l.toLowerCase() == "html5") a.HTML5 = d; else a.addVariable(l, d)
            }
        }
    };
    a.embed = function (b) {
        if (b) a.ptarget = b;
        if (a.ptarget) {
            b = null;
            b = String(a.HTML5).toLowerCase();
            if (b == "always" || b == "force" || (b == "whenpossible" || b == "prefer") && a.isHTML5possible()) {
                b = "./";
                var e = a.pswfpath.lastIndexOf("/");
                if (e >= 0) b = a.pswfpath.slice(0, e + 1);
                e = true;
                if (c.html5licenseload === false) e = false;
                b = createkrpanoJSviewer(a.pid, a.pwidth, a.pheight, b, e, a.bgcolor)
            } else b = createkrpanoSWFviewer(a.pswfpath, a.pid, a.pwidth, a.pheight, a.bgcolor, b != "never" &&
                b != "no" && b != "false", c);
            for (var d in a.pparams) typeof a.pparams[d] != "function" && b.addParam(d, a.pparams[d]);
            for (var i in a.pvars) typeof a.pvars[i] != "function" && b.addVariable(i, a.pvars[i]);
            b.addVariable("xml", a.pxml);
            b.embed(a.ptarget)
        } else alert("ERROR: createPanoViewer.embed() - target needed")
    };
    c.wmode && a.addParam("wmode", c.wmode);
    c.passQueryParameters && a.passQueryParameters();
    return a
};
