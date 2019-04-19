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
;function p(a) {
  var b = b || {};
  var c = typeof a;
  if ("string" === c && 0 < a.length) {
    return t(a);
  }
  if ("number" === c && !1 === isNaN(a)) {
    return b.f ? (b = Math.abs(a), a = 864E5 <= b ? u(a, b, 864E5, "day") : 36E5 <= b ? u(a, b, 36E5, "hour") : 6E4 <= b ? u(a, b, 6E4, "minute") : 1000 <= b ? u(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function t(a) {
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
function u(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;var v = tty;
var w = util.inspect;
var x = Object.keys(process.env).filter(function(a) {
  return /^debug_/i.test(a);
}).reduce(function(a, b) {
  var c = b.substring(6).toLowerCase().replace(/_([a-z])/g, function(d, g) {
    return g.toUpperCase();
  });
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), y = {init:function(a) {
  a.inspectOpts = Object.assign({}, x);
}, log:function(a) {
  for (var b = [], c = 0; c < arguments.length; ++c) {
    b[c] = arguments[c];
  }
  return process.stderr.write(util.format.apply(util, b instanceof Array ? b : l(k(b))) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color, d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = "  " + c + ";1m" + b + " \u001b[0m", a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + p(d) + "\u001b[0m")) : a[0] = (x.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in x ? !!x.colors : v.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:x, formatters:{o:function(a) {
  var b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return w(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  var b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return w(a, b);
}}};
function z() {
  this.colors = y.colors;
  this.formatArgs = y.formatArgs;
  this.inspectOpts = y.inspectOpts;
  this.log = y.log;
  this.save = y.save;
  this.init = y.init;
  this.formatters = y.formatters || {};
  this.a = [];
  this.b = [];
  this.c = [];
}
function A(a) {
  var b = B(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function B(a) {
  function b(G) {
    for (var e = [], h = 0; h < arguments.length; ++h) {
      e[h] = arguments[h];
    }
    if (b.enabled) {
      h = Number(new Date);
      b.diff = h - (q || h);
      b.prev = q;
      q = b.curr = h;
      e[0] = C(e[0]);
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
function D(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function E(a) {
  var b = y.load();
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
z.prototype.destroy = function(a) {
  a = this.a.indexOf(a);
  return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
};
z.prototype.enabled = function(a) {
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
function F() {
  var a = new z;
  return function(b) {
    var c = A(a);
    c.namespace = b;
    c.useColors = y.useColors();
    c.enabled = a.enabled(b);
    c.color = D(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, g) {
      d = this.namespace + (void 0 === g ? ":" : g) + d;
      d.log = this.log;
      return d;
    };
    E(a);
    return c;
  };
}
function C(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;DEPACK_EXPORT = function(a) {
  return F()(a);
};


module.exports = DEPACK_EXPORT
//# sourceMappingURL=index_.js.map