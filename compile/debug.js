'use strict';
let DEPACK_EXPORT;
const tty = require('tty');
const util = require('util');'use strict';
var h = tty;
const {format:k, inspect:l} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function m(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return n(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.v ? (b = Math.abs(a), a = 864E5 <= b ? r(a, b, 864E5, "day") : 36E5 <= b ? r(a, b, 36E5, "hour") : 6E4 <= b ? r(a, b, 6E4, "minute") : 1000 <= b ? r(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function n(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function r(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const v = /\B(?=(\d{3})+(?!\d))/g, w = /(?:\.0*|(\.[^0]+)0+)$/, x = {s:1, i:1024, j:1048576, h:1073741824, m:Math.pow(1024, 4), l:Math.pow(1024, 5)};
function y(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.w || "", f = b && b.B || "", g = b && void 0 !== b.g ? b.g : 2, e = !(!b || !b.u);
  (b = b && b.A || "") && x[b.toLowerCase()] || (b = c >= x.l ? "PB" : c >= x.m ? "TB" : c >= x.h ? "GB" : c >= x.j ? "MB" : c >= x.i ? "KB" : "B");
  a = (a / x[b.toLowerCase()]).toFixed(g);
  e || (a = a.replace(w, "$1"));
  d && (a = a.replace(v, d));
  return a + f + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const z = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function A(a, b) {
  return (b = z[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var B = {f:y, ["fy"](a) {
  return A(y(a) || "", "yellow");
}, ["fr"](a) {
  return A(y(a) || "", "red");
}, ["fb"](a) {
  return A(y(a) || "", "blue");
}, ["fg"](a) {
  return A(y(a) || "", "green");
}, ["fc"](a) {
  return A(y(a) || "", "cyan");
}, ["fm"](a) {
  return A(y(a) || "", "magenta");
}};
const C = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, f) => f.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), D = Object.assign({}, {o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return l(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return l(a, b);
}}, B), E = {init:function(a) {
  a.inspectOpts = Object.assign({}, C);
}, log:function(...a) {
  return process.stderr.write(k(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:f} = this;
  if (c) {
    const g = "\u001b[3" + (8 > d ? d : "8;5;" + d), e = `  ${g};1m${b} \u001B[0m`;
    a[0] = e + a[0].split("\n").join("\n" + e);
    a.push(g + "m+" + m(f) + "\u001b[0m");
  } else {
    a[0] = (C.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in C ? !!C.colors : h.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:C, formatters:D};
function F(a) {
  function b(...e) {
    if (b.enabled) {
      var t = Number(new Date);
      b.diff = t - (g || t);
      b.prev = g;
      g = b.curr = t;
      e[0] = G(e[0]);
      "string" != typeof e[0] && e.unshift("%O");
      var p = 0;
      e[0] = e[0].replace(/%([a-zA-Z%])/g, (q, u) => {
        if ("%%" == q) {
          return q;
        }
        p++;
        if (u = c[u]) {
          q = u.call(b, e[p]), e.splice(p, 1), p--;
        }
        return q;
      });
      d.call(b, e);
      (b.log || f).apply(b, e);
    }
  }
  const c = a.formatters, d = a.formatArgs, f = a.log;
  let g;
  return b;
}
function H(a) {
  const b = F(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function I(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function J(a) {
  var b = E.load();
  a.save(b);
  a.b = [];
  a.c = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), f = d.length;
  for (c = 0; c < f; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.c.push(new RegExp("^" + b.substr(1) + "$")) : a.b.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class K {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.b = [];
    this.c = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.c.length; b < c; b++) {
      if (this.c[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.b.length; b < c; b++) {
      if (this.b[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function L() {
  const a = new K(E);
  return function(b) {
    const c = H(a);
    c.namespace = b;
    c.useColors = E.useColors();
    c.enabled = a.enabled(b);
    c.color = I(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, f) {
      d = this.namespace + (void 0 === f ? ":" : f) + d;
      d.log = this.log;
      return d;
    };
    J(a);
    return c;
  };
}
function G(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;DEPACK_EXPORT = function(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return L()(a);
};


module.exports = DEPACK_EXPORT
//# sourceMappingURL=debug.js.map