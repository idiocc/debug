'use strict';
let DEPACK_EXPORT;
const tty = require('tty');
const util = require('util');'use strict';
var n = {default:function(a, b) {
  b = b || {};
  var c = typeof a;
  if ("string" === c && 0 < a.length) {
    return h(a);
  }
  if ("number" === c && !1 === isNaN(a)) {
    return b.f ? (b = Math.abs(a), a = 864E5 <= b ? k(a, b, 864E5, "day") : 36E5 <= b ? k(a, b, 36E5, "hour") : 6E4 <= b ? k(a, b, 6E4, "minute") : 1000 <= b ? k(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}};
function h(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
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
function k(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;var r = tty;
const {format:t, inspect:u} = util;
const v = n.default || n, w = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, f) => f.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), x = {init:function(a) {
  a.inspectOpts = Object.assign({}, w);
}, log:function(...a) {
  return process.stderr.write(t(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:f} = this;
  if (c) {
    const g = "\u001b[3" + (8 > d ? d : "8;5;" + d), e = `  ${g};1m${b} \u001B[0m`;
    a[0] = e + a[0].split("\n").join("\n" + e);
    a.push(g + "m+" + v(f) + "\u001b[0m");
  } else {
    a[0] = (w.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in w ? !!w.colors : r.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:w, formatters:{o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return u(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return u(a, b);
}}};
function y(a) {
  function b(...e) {
    if (b.enabled) {
      var p = Number(new Date);
      b.diff = p - (g || p);
      b.prev = g;
      g = b.curr = p;
      e[0] = z(e[0]);
      "string" != typeof e[0] && e.unshift("%O");
      var l = 0;
      e[0] = e[0].replace(/%([a-zA-Z%])/g, (m, q) => {
        if ("%%" == m) {
          return m;
        }
        l++;
        if (q = c[q]) {
          m = q.call(b, e[l]), e.splice(l, 1), l--;
        }
        return m;
      });
      d.call(b, e);
      (b.log || f).apply(b, e);
    }
  }
  const c = a.formatters, d = a.formatArgs, f = a.log;
  let g;
  return b;
}
function A(a) {
  const b = y(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function B(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function C(a) {
  var b = x.load();
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
class D {
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
function E() {
  const a = new D(x);
  return function(b) {
    const c = A(a);
    c.namespace = b;
    c.useColors = x.useColors();
    c.enabled = a.enabled(b);
    c.color = B(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, f) {
      d = this.namespace + (void 0 === f ? ":" : f) + d;
      d.log = this.log;
      return d;
    };
    C(a);
    return c;
  };
}
function z(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;DEPACK_EXPORT = function(a) {
  return E()(a);
};


module.exports = DEPACK_EXPORT