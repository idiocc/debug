#!/usr/bin/env node
'use strict';
const tty = require('tty');
const util = require('util');             
function g(a) {
  var b = b || {};
  var c = typeof a;
  if ("string" === c && 0 < a.length) {
    return k(a);
  }
  if ("number" === c && !1 === isNaN(a)) {
    return b.g ? (b = Math.abs(a), a = 864E5 <= b ? p(a, b, 864E5, "day") : 36E5 <= b ? p(a, b, 36E5, "hour") : 6E4 <= b ? p(a, b, 6E4, "minute") : 1000 <= b ? p(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function k(a) {
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
function p(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;var r = tty;
var t = util;
const u = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, f) => f.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), B = {init:v, log:w, formatArgs:x, save:y, load:z, useColors:A, colors:[6, 2, 3, 4, 5, 1], inspectOpts:u};
function A() {
  return "colors" in u ? !!u.colors : r.isatty(process.stderr.fd);
}
function x(a) {
  const {namespace:b, useColors:c, color:d, diff:f} = this;
  if (c) {
    const h = "\u001b[3" + (8 > d ? d : "8;5;" + d), e = `  ${h};1m${b} \u001B[0m`;
    a[0] = e + a[0].split("\n").join("\n" + e);
    a.push(h + "m+" + g(f) + "\u001b[0m");
  } else {
    a[0] = (u.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}
function w(...a) {
  return process.stderr.write(t.format(...a) + "\n");
}
function y(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}
function z() {
  return process.env.DEBUG;
}
function v(a) {
  a.inspectOpts = {};
  const b = Object.keys(u);
  for (let c = 0; c < b.length; c++) {
    a.inspectOpts[b[c]] = u[b[c]];
  }
}
;function C(a) {
  function b(...e) {
    if (b.enabled) {
      var q = Number(new Date);
      b.diff = q - (h || q);
      b.prev = h;
      h = b.curr = q;
      e[0] = D(e[0]);
      "string" != typeof e[0] && e.unshift("%O");
      var l = 0;
      e[0] = e[0].replace(/%([a-zA-Z%])/g, (m, n) => {
        if ("%%" === m) {
          return m;
        }
        l++;
        n = c[n];
        "function" === typeof n && (m = n.call(b, e[l]), e.splice(l, 1), l--);
        return m;
      });
      d.call(b, e);
      (b.log || f).apply(b, e);
    }
  }
  const c = a.f, d = a.formatArgs, f = a.log;
  let h;
  return b;
}
function E(a) {
  const b = C(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function F(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function G(a) {
  var b = B.load();
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
class H {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.a = [];
    this.b = [];
    this.c = [];
    this.f = {};
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
function D(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;(function() {
  const a = new H(B);
  return function(b) {
    const c = E(a);
    c.namespace = b;
    c.useColors = B.useColors();
    c.enabled = a.enabled(b);
    c.color = F(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, f) {
      d = this.namespace + (void 0 === f ? ":" : f) + d;
      d.log = this.log;
      return d;
    };
    G(a);
    return c;
  };
})()("test")("test");


//# sourceMappingURL=index_.js.map