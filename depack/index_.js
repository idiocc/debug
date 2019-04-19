'use strict';
let DEPACK_EXPORT;
const tty = require('tty');
const util = require('util');function f(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function k(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : {next:f(a)};
}
function l(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
}
;var u = {default:function(a, b) {
  b = b || {};
  var c = typeof a;
  if ("string" === c && 0 < a.length) {
    return p(a);
  }
  if ("number" === c && !1 === isNaN(a)) {
    return b.f ? (b = Math.abs(a), a = 864E5 <= b ? t(a, b, 864E5, "day") : 36E5 <= b ? t(a, b, 36E5, "hour") : 6E4 <= b ? t(a, b, 6E4, "minute") : 1000 <= b ? t(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}};
function p(a) {
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
function t(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;var v = tty;
var w = util, x = w.format, y = w.inspect;
var z = u.default || u, A = Object.keys(process.env).filter(function(a) {
  return /^debug_/i.test(a);
}).reduce(function(a, b) {
  var c = b.substring(6).toLowerCase().replace(/_([a-z])/g, function(d, g) {
    return g.toUpperCase();
  });
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), B = {init:function(a) {
  a.inspectOpts = Object.assign({}, A);
}, log:function(a) {
  for (var b = [], c = 0; c < arguments.length; ++c) {
    b[c] = arguments[c];
  }
  return process.stderr.write(x.apply(null, b instanceof Array ? b : l(k(b))) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color, d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = "  " + c + ";1m" + b + " \u001b[0m", a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + z(d) + "\u001b[0m")) : a[0] = (A.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in A ? !!A.colors : v.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:A, formatters:{o:function(a) {
  var b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return y(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  var b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return y(a, b);
}}};
function C() {
  this.colors = B.colors;
  this.formatArgs = B.formatArgs;
  this.inspectOpts = B.inspectOpts;
  this.log = B.log;
  this.save = B.save;
  this.init = B.init;
  this.formatters = B.formatters || {};
  this.a = [];
  this.b = [];
  this.c = [];
}
function D(a) {
  var b = E(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function E(a) {
  function b(J) {
    for (var e = [], h = 0; h < arguments.length; ++h) {
      e[h] = arguments[h];
    }
    if (b.enabled) {
      h = Number(new Date);
      b.diff = h - (q || h);
      b.prev = q;
      q = b.curr = h;
      e[0] = F(e[0]);
      "string" != typeof e[0] && e.unshift("%O");
      var m = 0;
      e[0] = e[0].replace(/%([a-zA-Z%])/g, function(n, r) {
        if ("%%" == n) {
          return n;
        }
        m++;
        if (r = c[r]) {
          n = r.call(b, e[m]), e.splice(m, 1), m--;
        }
        return n;
      });
      d.call(b, e);
      (b.log || g).apply(b, e);
    }
  }
  var c = a.formatters, d = a.formatArgs, g = a.log, q;
  return b;
}
function G(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function H(a) {
  var b = B.load();
  a.save(b);
  a.b = [];
  a.c = [];
  var c, d = ("string" == typeof b ? b : "").split(/[\s,]+/), g = d.length;
  for (c = 0; c < g; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.c.push(new RegExp("^" + b.substr(1) + "$")) : a.b.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
C.prototype.destroy = function(a) {
  a = this.a.indexOf(a);
  return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
};
C.prototype.enabled = function(a) {
  if ("*" == a[a.length - 1]) {
    return !0;
  }
  var b;
  var c = 0;
  for (b = this.c.length; c < b; c++) {
    if (this.c[c].test(a)) {
      return !1;
    }
  }
  c = 0;
  for (b = this.b.length; c < b; c++) {
    if (this.b[c].test(a)) {
      return !0;
    }
  }
  return !1;
};
function I() {
  var a = new C;
  return function(b) {
    var c = D(a);
    c.namespace = b;
    c.useColors = B.useColors();
    c.enabled = a.enabled(b);
    c.color = G(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, g) {
      d = this.namespace + (void 0 === g ? ":" : g) + d;
      d.log = this.log;
      return d;
    };
    H(a);
    return c;
  };
}
function F(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;DEPACK_EXPORT = function(a) {
  return I()(a);
};


module.exports = DEPACK_EXPORT
//# sourceMappingURL=index_.js.map