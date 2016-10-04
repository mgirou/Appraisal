/* global XMLHttpRequest, ActiveXObject, google, rta:true */
/* jslint browser:true, nomen:true, plusplus:true */
/* jshint bitwise:false, curly:true, eqeqeq:true, eqnull:true, forin:true, immed:true, loopfunc:true,
   maxerr:100, newcap:true, noarg:true, noempty:false, nonew:true, strict:true, undef:true, unused:true,
   laxcomma:true, -W068 */
// Don't use /*jshint indent:2*/ -- our outermost self-calling function has no indentation.
// Don't use /*jshint camelcase:true*/ -- we use the Google standard of opt_xxx for optional args.

// FYI: I added function-names to almost all function-expressions - this is a best-practice to aid in debugging

// DONE: In dox.js (c:/Dropbox/npm/node_modules/dox-foundation/node_modules/dox/lib/dox.js and
// c:/Dropbox/npm/node_modules/dox/lib/dox.js), fix 'exports.parseTag = function(str)' so it doesn't coalesce
// adjacent spaces (since that screws up <pre>...</pre> blocks). E.g., change:
//
//   var tag = {};
//   var parts = str.split(/ +/);
//   var type = tag.type = parts.shift().replace('@', '');
//
//   switch (type) {
//     case 'param':
//       tag.types = exports.parseTagTypes(parts.shift());
//       tag.name = parts.shift() || '';
//       tag.description = parts.join(' ');
//       break;
//     case 'return':
//       tag.types = exports.parseTagTypes(parts.shift());
//       tag.description = parts.join(' ');
//       break;
//     ...
//
// to something like this:
//
//   var m;
//   if (!!(m = str.match(/^\s*@(param)\s*(\{[^{}\n]+\})?\s*([a-zA-Z0-9_$]*\b|\[[a-z_$][a-zA-Z0-9_$]*(?:=[^\[\]]+)\])?\s*([\s\S]*)$/))) {
//     return {type: m[1], types: m[2] ? exports.parseTagTypes(m[2]) : void 0, name: m[3], description: m[4]};
//   }
//   if (!!(m = str.match(/^\s*@(return)\s*(\{[^{}\n]+\})?\s*([\s\S]*)$/))) {
//     return {type: m[1], types: m[2] ? exports.parseTagTypes(m[2]) : void 0, description: m[3]};
//   }
//   ...

// TODO: Drop atan2Rad() and atan2Deg(), instead allow both 1 and 2 args in atanRad() and atanDeg(), detecting
// whether the denominator is provided by typeof denominator === 'number'.

// DONE: Create GeoPatches - the 'contains' method counts an odd# contained children. Needs an add() method.
// The children should be cloned when adding.

// TODO: Add unit-tests for the geo-patches class.

// DONE: Add a clone() method to all geo-region classes.

// TODO: Add unit-tests for the geo-region clone() method.

// TODO: Create IntersectRegion - the 'contains' method returns true if/only if 'p' is contained in ALL
// children. The children should be cloned when adding. Then add an intersect() method to each region
// subclass; GeoBox.prototype.intersection() should do the 'fast' intersection if 'that instanceof GeoBox';
// else they should all 'return new IntersectRegion(this, that)'. Change the contract for intersection():
// should never return null, though it might return an EmptyRegion object - but definitely add an isEmpty()
// method.

// TODO: Add an intersect() method to all geo-region classes: 'return new rta.GeoIntersection(this, that)'.
// However GeoBox.prototype.intersection() is special: it should do the 'fast intersection' if 'that
// instanceof GeoBox'; otherwise it should fall back onto the normal method, above. If the 'usual'
// implementation is sufficiently generic, we can attach it to each prototype without reimplementing it each
// time (or stash it in a base class). IMPORTANT: change the contract for GeoBox's intersection(), since it
// NEVER returns null. Is there a GeoBox object that never contains anything? What happens if we don't give
// ANY points to a GeoBox ctor? Or what happens if those points are both 'new GeoPos(0,0)'? Is that empty?
// Creating a separate class, e.g., GeoEmptyRegion, seems too "classic OO"...

// TODO: Change the "Override?" button so it is sticky - until they change that particular field again, the
// override remains in place. The UX should be that each distinct field has its own override flag. The
// override flag for field X gets cleared whenever field X gets changed, and gets set whenever the user clicks
// field X's "Override?" button. The 'doit' in function assessNow() fails only if a field is invalid AND that
// particular field's override flag is falsy.

// TODO: Replace rta.pseudoShallowCopy(obj) with Object.create(obj, {})

// TODO: Can we replace rta.shallowCopy(obj) with Object.extend({}, obj)?? If so, replace CALLS to
// rta.shallowCopy(obj) and replace implementation of rta.applyDefaults() and rta.objectUnion().

// TODO: Reimplement rta.inPlaceExtendObject() using Object.assign()

// TODO: Check out http://ericleads.com/h5validate/

// TODO: Change <input type="..."> to type="number" for tumblers; see http://www.the-art-of-web.com/html/html5-form-validation/

// TODO: Check out http://ericleads.com/h5validate/

// TODO: Integrate log4javascript:
//   - http://log4javascript.org/docs/index.html
//   - http://sourceforge.net/projects/log4javascript/

// TODO: Augment the specification of rta.interpolate()
// Old: Arguments are entirely positional.
//      That means template must be {0.x}, {1.y}, {2.z}, ...
// New: Arguments are allowed to be positional OR named.
//      Named args always refer to the first arg, so:
//        {foo} is a shorthand for {0.foo}.
//        {foo[3]} is a shorthand for {0.foo[3]}.
//        {foo.bar} is a shorthand for {0.foo.bar}.
// Reationale: this will make templates MUCH cleaner, e.g., in the "magic" fields, such as prose2.html:
//   old: <span class="magic">{0.target.cduName}</span>...<td>{1.houseValPerSqft.currency(0)}</td>...<td>{2.toFixed(1)}</td>...
//   new: <span class="magic">{target.cduName}</span>...<td>{comp.houseValPerSqft.currency(0)}</td>...<td>{distance.toFixed(1)}</td>...

// TODO: The blur handler for every <input type="text"> element should check the pattern="..." and the required attribute.
// The SUBMIT button should call the blur handler for each of those.
// Example: enter 97.x into a numeric field and it will silently use the default value (due to failed numeric conversion).

// TODO: See if we can remove the leading jshint-directive comments and move them into a .jshint file.

// TODO: Check caniuseit.com for the JSON object; consider loading http://github.com/douglascrockford/JSON-js

// TODO: Change to promises (via Q), then provide a way to get progress on just about anything.
// Rationale: It can take a lonnnnngggg time to download a lot of parcels, e.g., if the radius is large.
// All of Dallas County takes around 2 minutes and consumes around a GB of memory.

// TODO: After converting to promises, we SHOULD be able to get error-info back to the caller. Today if the
// caller passes in an illegal parameter, such as 'yardz' for the distanceUnits parameter, the query silently
// fails - the exception is thrown in an synchronous callback so the error message is completely lost.

// TODO: Prepend a version# as the 0th element of each Parcel's raw-info.
// Rationale: Future-proofing/migrateability - lets us change this raw-info structure.
// Migration: The Parcel ctor will check raw-info array-length; if 29, it is in v1 format.

// TODO: Pre-fetch neighboring grid-elems - and do that pre-fetch at low-priority, trickle-feed rate.
// Rationale: Makes things snap faster if the user wanders incrementally from their current location.
// E.g., if they look in a neighborhood, then wander just beyond the edge, the parcels are already ready.
// Tech goal #1: Consume CPU only when the browser is doing nothing else.
// Tech goal #2: Consume only a small percentage of the user's network capacity.
// Tech goal #3: Consume only a small percentage of the browser's finite number of outstanding HTTP requests.
// Tech goal #4: Make it configurable - it will consume some resources, so make it easy to turn on/off.
// Solution: When a user requests a 'box' of parcels, tee up a 'low priority list' with neighboring grid-elems.
// Put those grid-elems into a queue, and create a 'app is idle' function that the app can call when idle.
// That function will keep track of the number of outstanding 'low priority HTTP requests'.
// It dequeues/submits those low-priority HTTP requests only if this number of outstanding requests is less than some threshold, N.
// For now, suggest N=1 or N=2, meaning we will consume only 20% or 40% of the allowed parallel HTTP requests.
// Additionally attach an HTTP header (or whatever the right mechanism) to mark those requests as low priority.

// TODO: If we commit to using es6-shim.js, then use getter-properties via this pattern:
//   SomeClass = function(...) {
//     ...;
//     Object.defineProperty(this, 'size', {
//       configurable: true,
//       enumerable: false,
//       get: (function() {
//         return this._size;
//       }).bind(this)
//     });
//     ...;
//   };

// TODO: Learn more about ES-classes and Google's compiler.

// TODO: Use getter/setter properties for dependent pairs of rta.Parcel properties, e.g., cduName and
// cduLevel, depreciationPct and depreciationRatio, etc. Here is the set-up code in the ctor:
//   MyClass = function() {
//     this._foo = ...;
//     Object.defineProperty(this, "foo", {
//       get: function() {
//         return this._foo;
//       },
//       set: function(val) {
//         _foo = val;
//       }
//     });
//   };
//
// Note: Object.defineProperty() can also be used to define a read-only property:
//   Object.defineProperty(this, "foo", { value: 42, writable: false });
//   // writing to the property throws a TypeError in strict-mode, or a no-op in non-strict.
//
// Note: Object.defineProperty() can also be used to make the object non-extensible:
//   Object.preventExtensions(this);
//   this.newProp = "whatever"; // throws a TypeError in strict-mode
//
// Check out: http://afarkas.github.io/webshim/demos/demos/es5.html

// Use of Q:
//   var asyncOperationUsingPromise = function asyncOperationUsingPromise(foo, bar) {
//     var deferred = Q.defer();
//     asyncOperationUsingCallback(foo, bar, function(result) {
//       if (successful) {
//         deferred.resolve(successResults);
//       } else {
//         deferred.reject(new Error(errmsg));
//       }
//     });
//     return deferred.promise;
//   };

// FUTURE: if we need inheritance, here is the pattern:
// function Base() { }
// Base.prototype.f = function Base_f() { }
// Base.prototype.g = function Base_g() { }
// function Der() {
//   Base.call(this, x, y);
//   ...
// }
// Der.prototype = Object.create(Base.prototype);
// Der.prototype.constructor = Der;
// Der.prototype.f = function Der_f() {
//   // override
//   Base.prototype.f.call(this, blah, blah);  // optionally call Base::f(blah, blah);
//   ...
// };
// Der.prototype.h = function Der_h() { }  // 'new' method not declared in Base

/**
 * @fileoverview Residential Tax Analysis (RTA) v0.2.0.
 *
 * @license Copyright 2012-2013, Sierra Technology Partners, LLC. All rights reserved.
 * Unauthorized usage is prohibited.
 *
 * @author <a href="mailto:mikegirou@gmail.com">Mike Girou</a>
 * @author <a href="mailto:marshall.p.cline@gmail.com">Marshall Cline</a>
 */

rta = (function() {
// We hide all the installation inside a self-calling 'strict' function.
// Reason: to have truly local items, plus so we can universally apply 'use strict'.
'use strict';

/**
 * The global namespace, e.g., `window` in a browser or `global` in Node.
 * @api private
 */
var global = (function() { return this; })();

/**
 * Exists so the half-braindead JSDoc parser doesn't get confused; sigh.
 * @api private
*/
var slashStarDotDotDot = '/' + '*' + '...' + '*' + '/';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta namespace /////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Namespace for the rta library
 * @static
 * @namespace
 */
var rta = {};

/**
 * The version of this library.
 * Always exactly three '.'-separated values, so rta.version.split(/\./g) is always a triple.
 *
 * @static
 * @type {!string}
 */
rta.version = '0.3.0';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Time utilities ////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns the number of millisec that have passed since some arbitrary point in the past (possibly, but not
 * necessarily, since the Unix epoch). Since the "zero time" is ill-defined, this function useful *only* for
 * time differences, for example, to get a high performance timing of a particular operation.
 */
rta.millisec
  = !window.performance ? function() { return +new Date().getTime(); }
  : window.performance.now ? window.performance.now
  : window.performance.webkitNow ? window.performance.webkitNow
  : window.performance.msNow ? window.performance.msNow
  : window.performance.mozNow ? window.performance.mozNow
  : function() { return +new Date().getTime(); };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Log utilities (part #1 of 2) //////////////////////////////////////////////////////////////////////////////

// These specific log-utilities are completely standalone, requiring zero services from rta, therefore these
// and only these may be reliably called during startup before all rta functions have been defined.

// TODO: Change this to use log4javascript.

rta.LOG_NOTHING = 0;
rta.LOG_ERRORS = 1;
rta.LOG_WARNINGS = 2;
rta.LOG_INFO = 3;
rta.LOG_DEBUG = 4;

rta.logLevel = rta.LOG_NOTHING; //rta.logLevel = rta.LOG_WARNINGS; //rta.LOG_ERRORS;

/**
 * Writes the `msg` string to the log, preceded by a timestamp. Any newlines embedded within the
 * msg are printed as `'\n> '` (newline + greater-than + space-char).
 *
 * @static
 *
 * @param {!string} msg The message to be written to the log-file.
 *
 * @param {boolean} [opt_appendCallStack=false] Appends the call-stack to the message if/only if truthy.
 */
rta.writeLogMessage = function writeLogMessage(msg, opt_appendCallStack) {
  // Be extremely defensive - degrade as necessary to avoid throwing exceptions
  try {
    if (opt_appendCallStack) {
      msg = msg.trim() + '\n' + new Error('').stack.replace(/^Error *\n/, '');
    }
    msg = new Date().toISOString() + ': ' + msg.trim().replace(/\n/g, '\n> ');
  } catch (e) {
    // intentionally left blank
  }

  try {
    if (global.console && global.console.log) {
      global.console.log(msg);
      return;
    }
  } catch (e) {
    // intentionally left blank
  }

  try {
    if (global.alert) {
      global.alert(msg);
      return;
    }
  } catch (e) {
    // intentionally left blank
  }

  // If we get here, we unfortunately have to (for now) drop the message.
  // TODO: replace the above with a logger mechanism that works with Node.js as well as browsers.
};

rta.internalErrorNoInterpolate = function internalErrorNoInterpolate(msg) {
  rta.writeLogMessage('[INTERNAL-ERROR] ' + msg, true);
};

rta.errorNoInterpolate = function errorNoInterpolate(msg) {
  if (rta.logLevel >= rta.LOG_ERRORS) {
    rta.writeLogMessage('[ERROR] ' + msg);
  }
};

rta.warningNoInterpolate = function warningNoInterpolate(msg) {
  if (rta.logLevel >= rta.LOG_WARNINGS) {
    rta.writeLogMessage('[WARNING] ' + msg);
  }
};

rta.infoNoInterpolate = function infoNoInterpolate(msg) {
  if (rta.logLevel >= rta.LOG_INFO) {
    rta.writeLogMessage('[INFO] ' + msg);
  }
};

rta.debugNoInterpolate = function debugNoInterpolate(msg) {
  if (rta.logLevel >= rta.LOG_DEBUG) {
    rta.writeLogMessage('[DEBUG] ' + msg);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Trig utilities ////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A factor that when multiplied by an angle in degrees results in the equivalent angle in radians.
 * @static
 * @type {number}
 * @const
 */
rta.deg2rad = Math.PI / 180;

/**
 * A factor that when multiplied by an angle in radians results in the equivalent angle in degrees.
 * @static
 * @type {number}
 * @const
 */
rta.rad2deg = 180 / Math.PI;

/**
 * Sine of the angle in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} deg The angle in degrees.
 * @return {!number} Sine of the angle.
 */
rta.sinDeg = function sinDeg(deg) {
  return Math.sin(rta.deg2rad * deg);
};

/**
 * Cosine of the angle in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} deg The angle in degrees.
 * @return {!number} Cosine of the angle.
 */
rta.cosDeg = function cosDeg(deg) {
  return Math.cos(rta.deg2rad * deg);
};

/**
 * Tangent of the angle in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} deg The angle in degrees.
 * @return {!number} Tangent of the angle.
 */
rta.tanDeg = function tanDeg(deg) {
  return Math.tan(rta.deg2rad * deg);
};

/**
 * Inverse of the sine, returning an angle in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The value of the sine.
 * Should normally be in [-1, 1], but graciously handles cases outside this range.
 * Reason: floating point is inexact, so 1+epsilon or -1-epsilon can happen.
 * If &lt; -1, result is the same as if it was -1.
 * If &gt; +1, result is the same as if it was +1.
 *
 * @return {!number} The angle in degrees.
 */
rta.asinDeg = function asinDeg(x) {
  return rta.rad2deg * rta.asinRad(x);
};

/**
 * Inverse of the cosine, returning an angle in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The value of the cosine.
 * Should normally be in [-1, 1], but graciously handles cases outside this range.
 * Reason: floating point is inexact, so 1+epsilon or -1-epsilon can happen.
 * If &lt; -1, result is the same as if it was -1.
 * If &gt; +1, result is the same as if it was +1.
 *
 * @return {!number} The angle in degrees.
 */
rta.acosDeg = function acosDeg(x) {
  return rta.rad2deg * rta.acosRad(x);
};

/**
 * Inverse of the tangent, returning an angle in degrees.
 *
 * This function has no side-effects.
 *
 * Warning: prefer `rta.atan2Deg(a,b)` over `rta.atanDeg(a/b)` since the former
 * handles the case when the denominator is 0.
 *
 * @static
 *
 * @param {!number} x The value of the tangent.
 *
 * @return {!number} The angle in degrees.
 *
 * @see rta.atan2Deg()
 * @see rta.atanRad()
 */
rta.atanDeg = function atanDeg(x) {
  return rta.rad2deg * rta.atanRad(x);
};

/**
 * Inverse of the quotient x/y, returning an angle in degrees.
 *
 * This is like rta.atanDeg(x/y), however this correctly handles the case when y is 0.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The numerator of the tangent.
 *
 * @param {!number} y The denominator of the tangent.
 *
 * @return {!number} The angle in degrees.
 *
 * @see rta.atanDeg()
 * @see rta.atan2Rad()
 */
rta.atan2Deg = function atan2Deg(x, y) {
  return rta.rad2deg * rta.atan2Rad(x, y);
};

/**
 * Sine of the angle in radians.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} rad The angle in radians.
 * @return {!number} Sine of the angle.
 */
rta.sinRad = Math.sin;

/**
 * Cosine of the angle in radians.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} rad The angle in radians.
 * @return {!number} Cosine of the angle.
 */
rta.cosRad = Math.cos;

/**
 * Tangent of the angle in radians.
 *
 * This function has no side-effects.
 *
 * @static
 * @param {!number} rad The angle in radians.
 * @return {!number} Tangent of the angle.
 */
rta.tanRad = Math.tan;

/**
 * Inverse of the sine, returning an angle in radians.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The value of the sine.
 * Should normally be in [-1, 1], but graciously handles cases outside this range.
 * Reason: floating point is inexact, so 1+epsilon or -1-epsilon can happen.
 * If &lt; -1, result is the same as if it was -1.
 * If &gt; +1, result is the same as if it was +1.
 *
 * @return {!number} The angle in radians.
 */
rta.asinRad = function asinRad(x) {
  return Math.asin(x < -1 ? -1 :
                   x > +1 ? +1 :
                   x);
};

/**
 * Inverse of the cosine, returning an angle in radians.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The value of the cosine.
 * Should normally be in [-1, 1], but graciously handles cases outside this range.
 * Reason: floating point is inexact, so 1+epsilon or -1-epsilon can happen.
 * If &lt; -1, result is the same as if it was -1.
 * If &gt; +1, result is the same as if it was +1.
 *
 * @return {!number} The angle in radians.
 */
rta.acosRad = function acosRad(x) {
  return Math.acos(x < -1 ? -1 :
                   x > +1 ? +1 :
                   x);
};

/**
 * Inverse of the tangent, returning an angle in radians.
 *
 * Warning: prefer `rta.atan2Rad(a,b)` over `rta.atanRad(a/b)` since the former
 * handles the case when the denominator is 0.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The value of the tangent.
 *
 * @return {!number} The angle in radians.
 *
 * @see rta.atan2Rad()
 * @see rta.atanDeg()
 */
rta.atanRad = Math.atan;

/**
 * Inverse of the quotient x/y, returning an angle in radians.
 *
 * This is like rta.atanRad(x/y), however this correctly handles the case when y is 0.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The numerator of the tangent.
 *
 * @param {!number} y The denominator of the tangent.
 *
 * @return {!number} The angle in radians.
 *
 * @see rta.atanRad()
 * @see rta.atan2Deg()
 */
rta.atan2Rad = Math.atan2;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String utilities //////////////////////////////////////////////////////////////////////////////////////////

/**
 * Makes a best effort to return JavaScript source-code that a JavaScript parser would parse back into
 * `x`. Doesn't always succeed, so this is mostly useful for error messages, not for round-tripping
 * through `eval()`.
 *
 * Caveats:
 *
 *  - `"xyz"` and `new String("xyz")` are both rendered `"\"xyz\""`.
 *  - `42` and `new Number(42)` are both rendered `"42"`.
 *  - `true` and `new Boolean(true)` are both rendered `"true"`.
 *
 * Please do not "fix" those without also changing `rta.interpolate()`: the latter wraps
 * primitive values in objects for the purpose of applying object-pseudo-methods.
 *
 * This function has no side-effects.
 *
 * @param {*} x The value to be rendered as JavaScript source-code.
 *
 * @param {number|string} [opt_whitespace=2] Adds pretty-print whitespace to arrays and objects. Uses the
 * specified number of space-chars if it is a non-zero number (up to 10); uses the specified pad-string if it
 * is a non-empty string (up to the first 10 chars); or uses no whitespace if not provided or '' or 0.
 *
 * @param {number} [opt_maxLength=Infinity] The maximum length of the returned string (must be at least 8).
 * If the string is longer than opt_maxLength, truncates the string to 7 characters less than this amount and
 * then appends /\*...*\/, that is, slash-star-dot-dot-dot-star-slash.
 */
rta.toSource = function toSource(x, opt_whitespace, opt_maxLength) {
  var ans;
  var tname = rta.typeName(x);

  switch (tname) {
  case 'undefined':
  case 'null':
    ans = tname;
    break;

  case 'number':
  case 'Number':
  case 'boolean':
  case 'Boolean':
  case 'function':
  case 'undefined':
  case 'RegExp':
    ans = String(x);
    break;

  case 'string':
  case 'String':
  case 'Object':
  case 'Array':
    ans = JSON.stringify(x, void 0, opt_whitespace);
    break;

  case 'Date':
    ans = 'new ' + tname + '(' + x.valueOf() + ')';
    break;

  default:
    ans = 'new ' + tname + '(' + JSON.stringify(x, void 0, opt_whitespace) + ')';
    break;
  }

  return typeof opt_maxLength === 'number' && ans.length > opt_maxLength ?
    ans.slice(0, Math.max(opt_maxLength - 7, 1)) + slashStarDotDotDot :
    ans;
};

/**
 * Returns a string containing `str` repeated `count` times.
 *
 * FUTURE: Change callers so they use String.prototype.repeat() if we adopt es6, such as via es6-shim.js at
 * http://github.com/paulmillr/es6-shim.
 *
 * @static
 */
rta.repeat = function repeat(str, count) {
  var doit = function doit(n) {
    // doit() precondition: n must be a whole number (not a fraction) that is >= 0.
    // doit() postcondition: returns a string containing n copies of str.
    var partial;
    if (n % 2) {
      // n is odd, so it must be >= 1
      partial = doit((n - 1) / 2);  // meets precondition: (n-1)/2 is whole and >=0
      return partial + partial + str;
    }
    if (n) {
      // n is even, so it must be >= 2
      partial = doit(n / 2);  // meets precondition: n/2 is whole and >=0
      return partial + partial;
    }
    // n is zero
    return '';
  };

  if (count < 0 || count !== count || count > rta.uint32.max || count === Infinity) {
    throw new RangeError();
  }

  str = String(str);
  return doit(rta.uint32(count));

  // OLD: return new Array(count + 1).join(String(str));
};

/**
 * Similar to `str.slice(0, maxlen)` but this optionally includes a trailing suffix when
 * `str` is too long.
 *
 * Examples:
 *
 * | Call                            | Result   | Comments
 * | ------------------------------- | -------- | ---------------------------
 * | `rta.head('',      3)`          | `''`     | Not truncated (nor padded)
 * | `rta.head('a',     3)`          | `'a'`    | (Ditto)
 * | `rta.head('ab',    3)`          | `'ab'`   | (Ditto)
 * | `rta.head('abc',   3)`          | `'abc'`  | (Ditto)
 * | `rta.head('abcd',  3)`          | `'abc'`  | First 3 chars
 * | `rta.head('abcde', 3)`          | `'abc'`  | (Ditto)
 * | `rta.head('abcde', 3, void 0)`  | `'abc'`  | (Ditto)
 * | `rta.head('abcde', 3, null)`    | `'abc'`  | (Ditto)
 * | `rta.head('abcde', 3, '')`      | `'ab1'`  | (Ditto)
 * | `rta.head('abcde', 3, '1')`     | `'ab1'`  | First 2 chars
 * | `rta.head('abcde', 3, '12')`    | `'a12'`  | First 1 char
 * | `rta.head('abcde', 3, '123')`   | `'123'`  | None of `str`
 * | `rta.head('abcde', 3, '1234')`  | `'123'`  | 0 of `str`, 3 of `opt_suffix`
 * | `rta.head('abcde', 2, '1234')`  | `'12'`   | 0 of `str`, 2 of `opt_suffix`
 * | `rta.head('abcde', 1, '1234')`  | `'1'`    | 0 of `str`, 1 of `opt_suffix`
 * | `rta.head('abcde', 0, '1234')`  | `''`     | You wanted nothing, you got nothing
 * | `rta.head('abcde', -5, '1234')` | `''`     | Negative `maxlen` is like 0
 *
 * @static
 *
 * @param {!string} str The string to be optionally truncated.
 *
 * @param {!number} maxlen The maximum length of the returned string. Must be &gt;= 0. If
 * `opt_suffix` is provided, must be &gt;= `opt_suffix.length`.
 *
 * @param {string} [opt_suffix=""] This suffix will be included at the end of the returned string if
 * `str` is longer than `maxlen`. Must be shorter than `maxlen`.
 *
 * @return {!string} A (possibly truncated) copy of `str`. Will either be an exact copy of
 * `str` or will be a truncated copy of `str` that ends end with a copy of
 * `opt_suffix` if
 */
rta.head = function head(str, maxlen, opt_suffix) {
  str = String(str);
  return typeof maxlen !== 'number' || maxlen !== maxlen || str.length <= maxlen ? str :  // leave str as-is
    !opt_suffix ? str.slice(0, Math.max(maxlen, 0)) :  // ignore opt_suffix - it is missing or empty
    opt_suffix.length <= maxlen ? str.slice(0, maxlen - opt_suffix.length) + opt_suffix :  // keep ALL of opt_suffix
    opt_suffix.slice(0, Math.max(maxlen, 0));          // none of str and only the leftmost chars of opt_suffix
};

/**
 * Returns a (possibly) padded copy of string `str`. Pads with `opt_fillchar` (or space)
 * until the result is `width` chars long. Truncates `str` if it is longer than
 * `opt_maxWidth` chars.
 *
 * @static
 *
 * @param {!string} justificationDirection Justifies `str` to the (left, center, right) if
 * `jusificationDirection` is, respectively, (`'left'`, `'center'`,
 * `'right'`). Throws an `Error` if none of these.
 *
 * @param {!string} str The string to be padded/truncated/justified.
 *
 * @param {!number} width The minimum width of the padded string.
 *
 * @param {string} [opt_fillchar=' '] The fill character, the first char of which is used for padding.
 *
 * @param {number} [opt_maxWidth=Infinity] Truncates the result if longer than this many chars.
 *
 * @return {!string} The justified copy of `str`, possibly equal to `str`.
 *
 * @throws {Error} if `justificationDirection` is not one of the valid choices.
 */
rta.justified = function justified(justificationDirection, str, width, opt_fillchar, opt_maxWidth) {
  var fill;
  str = String(str);
  if (width > str.length) {
    fill = rta.repeat((opt_fillchar || ' ').charAt(0), width - str.length);
    if (justificationDirection === 'left') {
      str += fill;
    } else if (justificationDirection === 'center') {
      str = fill.substr(0, fill.length >> 1) + str + fill.substr(fill.length >> 1);
    } else if (justificationDirection === 'right') {
      str = fill + str;
    } else {
      throw new Error('Invalid justification-direction: ' + justificationDirection);
    }
  }
  if (typeof opt_maxWidth === 'number' && str.length > opt_maxWidth) {
    str = str.slice(0, opt_maxWidth);
  }
  return str;
};

/**
 * Returns a string containing `str`, padded (but not truncated) on the right with
 * `opt_fillchar` until it is `width` chars, and truncated if it is longer than
 * `opt_maxWidth` chars.
 *
 * @static
 *
 * @param {!string} str The string to be padded/truncated/justified.
 *
 * @param {!number} width The minimum width of the padded string.
 *
 * @param {string} [opt_fillchar=' '] The fill character, the first char of which is used for padding.
 *
 * @param {number} [opt_maxWidth=Infinity] Truncates the result if longer than this many chars.
 */
rta.leftJustified = rta.justified.bind(void 0, 'left');

/**
 * Returns a string containing `str`, padded (but not truncated) on the left with
 * `opt_fillchar` until it is `width` chars, and truncated if it is longer than
 * `opt_maxWidth` chars.
 *
 * @static
 *
 * @param {!string} str The string to be padded/truncated/justified.
 *
 * @param {!number} width The minimum width of the padded string.
 *
 * @param {string} [opt_fillchar=' '] The fill character, the first char of which is used for padding.
 *
 * @param {number} [opt_maxWidth=Infinity] Truncates the result if longer than this many chars.
 */
rta.rightJustified = rta.justified.bind(void 0, 'right');

/**
 * Returns a string containing `str`, padded (but not truncated) on left and right with
 * `opt_fillchar` until it is `width` chars, and truncated if it is longer than
 * `opt_maxWidth` chars.
 *
 * @static
 *
 * @param {!string} str The string to be padded/truncated/justified.
 *
 * @param {!number} width The minimum width of the padded string.
 *
 * @param {string} [opt_fillchar=' '] The fill character, the first char of which is used for padding.
 *
 * @param {number} [opt_maxWidth=Infinity] Truncates the result if longer than this many chars.
 */
rta.centered = rta.justified.bind(void 0, 'center');

/**
 * Returns a copy of `str` converted To Title Case.
 *
 * Very simple; applies the Title Case pattern to every string of letters, even short-words like 'To' or
 * 'At', URLs like 'Http:Www.Google.Com', and everything else.
 *
 * This function has no side-effects.
 *
 * @static
 * @see http://github.com/gouch/to-title-case for a much more sophisticated algorithm.
 */
rta.toTitleCase = function toTitleCase(str) {
  return String(str).replace(/([a-zA-Z0-9])([a-zA-Z0-9\']*)/g, function replacement(all, first, rest) {
    return first.toUpperCase() + rest.toLowerCase();
  });
};

/**
 * Returns HTML that is equivalent to the specified text, where "equivalent" means the result would, if sent
 * to a browser, render the specified text on the browser's screen.
 *
 * @static
 *
 * @param {!string} text The text that is to be turned into HTML.
 *
 * @return {!string} HTML that is equivalent to the text in `text`. Any HTML meta-chars ('&lt;',
 * '&gt;', '&amp;') and/or newlines and/or runs of sequential whitespace and/or non-ASCII chars within
 * `text` will be transformed/escaped in the result.
 */
rta.textToHtml = (function() {
  // Maintenance note: the following code probably works and is fast, but its exact output is
  // browser-dependent - it is not predictable. That makes it harder to test, e.g., in unit-test.js.
  //     if (global.document && global.document.createElement) {
  //       return function textToHtml(text) {
  //         var elem = global.document.createElement('pre');
  //         elem.appendChild(global.document.createTextNode(String(text)));
  //         return elem.innerHTML;
  //       };
  //     }

  // Maps text to HTML
  var t2h = {
      '<': '&lt;'
    , '>': '&gt;'
    , '&': '&amp;'
    , '\'': '&#39;'     // don't use '&apos;' - it fails validation at http://validator.w3.org
    , '\"': '&quot;'
    , '\r': '<br>'      // ambiguously map all vertical ws to <br>
    , '\n': '<br>'      // ditto
    , '\u2028': '<br>'  // ditto; '\u2028' is the line separator (per ECMA spec 7.3)
    , '\u2029': '<br>'  // ditto; '\u2029' is the paragraph separator (per ECMA spec 7.3)
    , '\r\n': '<br>'    // ditto; treat '\r\n' as a single <br>, not as two vertical-ws chars

    // You may uncomment as many or as few of the following as you like.
    // Uncomment to beautify the generated HTML - numeric-entities become named-entities.
    // Leave them commented to keep the JavaScript file (slightly) smaller.
    //
    // , '\u00A0': '&nbsp;'      // char(160)
    // , '\u00A1': '&iexcl;'     // char(161)
    // , '\u00A2': '&cent;'      // char(162)
    // , '\u00A3': '&pound;'     // char(163)
    // , '\u00A4': '&curren;'    // char(164)
    // , '\u00A5': '&yen;'       // char(165)
    // , '\u00A6': '&brvbar;'    // char(166)
    // , '\u00A7': '&sect;'      // char(167)
    // , '\u00A8': '&uml;'       // char(168)
    // , '\u00A9': '&copy;'      // char(169)
    // , '\u00AA': '&ordf;'      // char(170)
    // , '\u00AB': '&laquo;'     // char(171)
    // , '\u00AC': '&not;'       // char(172)
    // , '\u00AD': '&shy;'       // char(173)
    // , '\u00AE': '&reg;'       // char(174)
    // , '\u00AF': '&macr;'      // char(175)
    // , '\u00B0': '&deg;'       // char(176)
    // , '\u00B1': '&plusmn;'    // char(177)
    // , '\u00B2': '&sup2;'      // char(178)
    // , '\u00B3': '&sup3;'      // char(179)
    // , '\u00B4': '&acute;'     // char(180)
    // , '\u00B5': '&micro;'     // char(181)
    // , '\u00B6': '&para;'      // char(182) AKA pilcrow
    // , '\u00B7': '&middot;'    // char(183)
    // , '\u00B8': '&cedil;'     // char(184)
    // , '\u00B9': '&sup1;'      // char(185)
    // , '\u00BA': '&ordm;'      // char(186)
    // , '\u00BB': '&raquo;'     // char(187)
    // , '\u00BC': '&frac14;'    // char(188)
    // , '\u00BD': '&frac12;'    // char(189)
    // , '\u00BE': '&frac34;'    // char(190)
    // , '\u00BF': '&iquest;'    // char(191)
    // , '\u00C0': '&Agrave;'    // char(192)
    // , '\u00C1': '&Aacute;'    // char(193)
    // , '\u00C2': '&Acirc;'     // char(194)
    // , '\u00C3': '&Atilde;'    // char(195)
    // , '\u00C4': '&Auml;'      // char(196)
    // , '\u00C5': '&Aring;'     // char(197)
    // , '\u00C6': '&AElig;'     // char(198)
    // , '\u00C7': '&Ccedil;'    // char(199)
    // , '\u00C8': '&Egrave;'    // char(200)
    // , '\u00C9': '&Eacute;'    // char(201)
    // , '\u00CA': '&Ecirc;'     // char(202)
    // , '\u00CB': '&Euml;'      // char(203)
    // , '\u00CC': '&Igrave;'    // char(204)
    // , '\u00CD': '&Iacute;'    // char(205)
    // , '\u00CE': '&Icirc;'     // char(206)
    // , '\u00CF': '&Iuml;'      // char(207)
    // , '\u00D0': '&ETH;'       // char(208)
    // , '\u00D1': '&Ntilde;'    // char(209)
    // , '\u00D2': '&Ograve;'    // char(210)
    // , '\u00D3': '&Oacute;'    // char(211)
    // , '\u00D4': '&Ocirc;'     // char(212)
    // , '\u00D5': '&Otilde;'    // char(213)
    // , '\u00D6': '&Ouml;'      // char(214)
    // , '\u00D7': '&times;'     // char(215)
    // , '\u00D8': '&Oslash;'    // char(216)
    // , '\u00D9': '&Ugrave;'    // char(217)
    // , '\u00DA': '&Uacute;'    // char(218)
    // , '\u00DB': '&Ucirc;'     // char(219)
    // , '\u00DC': '&Uuml;'      // char(220)
    // , '\u00DD': '&Yacute;'    // char(221)
    // , '\u00DE': '&THORN;'     // char(222)
    // , '\u00DF': '&szlig;'     // char(223)
    // , '\u00E0': '&agrave;'    // char(224)
    // , '\u00E1': '&aacute;'    // char(225)
    // , '\u00E2': '&acirc;'     // char(226)
    // , '\u00E3': '&atilde;'    // char(227)
    // , '\u00E4': '&auml;'      // char(228)
    // , '\u00E5': '&aring;'     // char(229)
    // , '\u00E6': '&aelig;'     // char(230)
    // , '\u00E7': '&ccedil;'    // char(231)
    // , '\u00E8': '&egrave;'    // char(232)
    // , '\u00E9': '&eacute;'    // char(233)
    // , '\u00EA': '&ecirc;'     // char(234)
    // , '\u00EB': '&euml;'      // char(235)
    // , '\u00EC': '&igrave;'    // char(236)
    // , '\u00ED': '&iacute;'    // char(237)
    // , '\u00EE': '&icirc;'     // char(238)
    // , '\u00EF': '&iuml;'      // char(239)
    // , '\u00F0': '&eth;'       // char(240)
    // , '\u00F1': '&ntilde;'    // char(241)
    // , '\u00F2': '&ograve;'    // char(242)
    // , '\u00F3': '&oacute;'    // char(243)
    // , '\u00F4': '&ocirc;'     // char(244)
    // , '\u00F5': '&otilde;'    // char(245)
    // , '\u00F6': '&ouml;'      // char(246)
    // , '\u00F7': '&divide;'    // char(247)
    // , '\u00F8': '&oslash;'    // char(248)
    // , '\u00F9': '&ugrave;'    // char(249)
    // , '\u00FA': '&uacute;'    // char(250)
    // , '\u00FB': '&ucirc;'     // char(251)
    // , '\u00FC': '&uuml;'      // char(252)
    // , '\u00FD': '&yacute;'    // char(253)
    // , '\u00FE': '&thorn;'     // char(254)
    // , '\u00FF': '&yuml;'      // char(255)
    // , '\u0152': '&OElig;'     // char(338)
    // , '\u0153': '&oelig;'     // char(339)
    // , '\u0160': '&Scaron;'    // char(352)
    // , '\u0161': '&scaron;'    // char(353)
    // , '\u0178': '&Yuml;'      // char(376)
    // , '\u0192': '&fnof;'      // char(402)
    // , '\u02C6': '&circ;'      // char(710)
    // , '\u02DC': '&tilde;'     // char(732)
    // , '\u0391': '&Alpha;'     // char(913)
    // , '\u0392': '&Beta;'      // char(914)
    // , '\u0393': '&Gamma;'     // char(915)
    // , '\u0394': '&Delta;'     // char(916)
    // , '\u0395': '&Epsilon;'   // char(917)
    // , '\u0396': '&Zeta;'      // char(918)
    // , '\u0397': '&Eta;'       // char(919)
    // , '\u0398': '&Theta;'     // char(920)
    // , '\u0399': '&Iota;'      // char(921)
    // , '\u039A': '&Kappa;'     // char(922)
    // , '\u039B': '&Lambda;'    // char(923)
    // , '\u039C': '&Mu;'        // char(924)
    // , '\u039D': '&Nu;'        // char(925)
    // , '\u039E': '&Xi;'        // char(926)
    // , '\u039F': '&Omicron;'   // char(927)
    // , '\u03A0': '&Pi;'        // char(928)
    // , '\u03A1': '&Rho;'       // char(929)
    // , '\u03A3': '&Sigma;'     // char(931)
    // , '\u03A4': '&Tau;'       // char(932)
    // , '\u03A5': '&Upsilon;'   // char(933)
    // , '\u03A6': '&Phi;'       // char(934)
    // , '\u03A7': '&Chi;'       // char(935)
    // , '\u03A8': '&Psi;'       // char(936)
    // , '\u03A9': '&Omega;'     // char(937)
    // , '\u03B1': '&alpha;'     // char(945)
    // , '\u03B2': '&beta;'      // char(946)
    // , '\u03B3': '&gamma;'     // char(947)
    // , '\u03B4': '&delta;'     // char(948)
    // , '\u03B5': '&epsilon;'   // char(949)
    // , '\u03B6': '&zeta;'      // char(950)
    // , '\u03B7': '&eta;'       // char(951)
    // , '\u03B8': '&theta;'     // char(952)
    // , '\u03B9': '&iota;'      // char(953)
    // , '\u03BA': '&kappa;'     // char(954)
    // , '\u03BB': '&lambda;'    // char(955)
    // , '\u03BC': '&mu;'        // char(956)
    // , '\u03BD': '&nu;'        // char(957)
    // , '\u03BE': '&xi;'        // char(958)
    // , '\u03BF': '&omicron;'   // char(959)
    // , '\u03C0': '&pi;'        // char(960)
    // , '\u03C1': '&rho;'       // char(961)
    // , '\u03C2': '&sigmaf;'    // char(962)
    // , '\u03C3': '&sigma;'     // char(963)
    // , '\u03C4': '&tau;'       // char(964)
    // , '\u03C5': '&upsilon;'   // char(965)
    // , '\u03C6': '&phi;'       // char(966)
    // , '\u03C7': '&chi;'       // char(967)
    // , '\u03C8': '&psi;'       // char(968)
    // , '\u03C9': '&omega;'     // char(969)
    // , '\u03D1': '&thetasym;'  // char(977)
    // , '\u03D2': '&upsih;'     // char(978)
    // , '\u03D6': '&piv;'       // char(982)
    // , '\u2002': '&ensp;'      // char(8194)
    // , '\u2003': '&emsp;'      // char(8195)
    // , '\u2009': '&thinsp;'    // char(8201)
    // , '\u200C': '&zwnj;'      // char(8204)
    // , '\u200D': '&zwj;'       // char(8205)
    // , '\u200E': '&lrm;'       // char(8206)
    // , '\u200F': '&rlm;'       // char(8207)
    // , '\u2013': '&ndash;'     // char(8211)
    // , '\u2014': '&mdash;'     // char(8212)
    // , '\u2018': '&lsquo;'     // char(8216)
    // , '\u2019': '&rsquo;'     // char(8217)
    // , '\u201A': '&sbquo;'     // char(8218)
    // , '\u201C': '&ldquo;'     // char(8220)
    // , '\u201D': '&rdquo;'     // char(8221)
    // , '\u201E': '&bdquo;'     // char(8222)
    // , '\u2020': '&dagger;'    // char(8224)
    // , '\u2021': '&Dagger;'    // char(8225)
    // , '\u2022': '&bull;'      // char(8226)
    // , '\u2026': '&hellip;'    // char(8230) ellipsis, like '...'
    // , '\u2030': '&permil;'    // char(8240)
    // , '\u2032': '&prime;'     // char(8242)
    // , '\u2033': '&Prime;'     // char(8243)
    // , '\u2039': '&lsaquo;'    // char(8249)
    // , '\u203A': '&rsaquo;'    // char(8250)
    // , '\u203E': '&oline;'     // char(8254)
    // , '\u2044': '&frasl;'     // char(8260)
    // , '\u20AC': '&euro;'      // char(8364)
    // , '\u2111': '&image;'     // char(8465)
    // , '\u2118': '&weierp;'    // char(8472)
    // , '\u211C': '&real;'      // char(8476)
    // , '\u2122': '&trade;'     // char(8482)
    // , '\u2135': '&alefsym;'   // char(8501)
    // , '\u2190': '&larr;'      // char(8592)
    // , '\u2191': '&uarr;'      // char(8593)
    // , '\u2192': '&rarr;'      // char(8594)
    // , '\u2193': '&darr;'      // char(8595)
    // , '\u2194': '&harr;'      // char(8596)
    // , '\u2196': '&nwarr;'     // char(8598) north-west arrow
    // , '\u2197': '&nearr;'     // char(8599) north-east arrow
    // , '\u2198': '&drarr;'     // char(8600) south-east arrow
    // , '\u2199': '&dlarr;'     // char(8601) south-west arrow
    // , '\u21B5': '&crarr;'     // char(8629)
    // , '\u21D0': '&lArr;'      // char(8656)
    // , '\u21D1': '&uArr;'      // char(8657)
    // , '\u21D2': '&rArr;'      // char(8658)
    // , '\u21D3': '&dArr;'      // char(8659)
    // , '\u21D4': '&hArr;'      // char(8660)
    // , '\u2200': '&forall;'    // char(8704)
    // , '\u2202': '&part;'      // char(8706)
    // , '\u2203': '&exist;'     // char(8707)
    // , '\u2205': '&empty;'     // char(8709)
    // , '\u2207': '&nabla;'     // char(8711)
    // , '\u2208': '&isin;'      // char(8712)
    // , '\u2209': '&notin;'     // char(8713)
    // , '\u220B': '&ni;'        // char(8715)
    // , '\u220F': '&prod;'      // char(8719)
    // , '\u2211': '&sum;'       // char(8721)
    // , '\u2212': '&minus;'     // char(8722)
    // , '\u2217': '&lowast;'    // char(8727)
    // , '\u221A': '&radic;'     // char(8730)
    // , '\u221D': '&prop;'      // char(8733)
    // , '\u221E': '&infin;'     // char(8734)
    // , '\u2220': '&ang;'       // char(8736)
    // , '\u2227': '&and;'       // char(8743)
    // , '\u2228': '&or;'        // char(8744)
    // , '\u2229': '&cap;'       // char(8745)
    // , '\u222A': '&cup;'       // char(8746)
    // , '\u222B': '&int;'       // char(8747)
    // , '\u2234': '&there4;'    // char(8756)
    // , '\u223C': '&sim;'       // char(8764)
    // , '\u2245': '&cong;'      // char(8773)
    // , '\u2248': '&asymp;'     // char(8776)
    // , '\u2260': '&ne;'        // char(8800)
    // , '\u2261': '&equiv;'     // char(8801)
    // , '\u2264': '&le;'        // char(8804)
    // , '\u2265': '&ge;'        // char(8805)
    // , '\u2282': '&sub;'       // char(8834)
    // , '\u2283': '&sup;'       // char(8835)
    // , '\u2284': '&nsub;'      // char(8836)
    // , '\u2286': '&sube;'      // char(8838)
    // , '\u2287': '&supe;'      // char(8839)
    // , '\u2295': '&oplus;'     // char(8853)
    // , '\u2297': '&otimes;'    // char(8855)
    // , '\u22A5': '&perp;'      // char(8869)
    // , '\u22C5': '&sdot;'      // char(8901)
    // , '\u2308': '&lceil;'     // char(8968)
    // , '\u2309': '&rceil;'     // char(8969)
    // , '\u230A': '&lfloor;'    // char(8970)
    // , '\u230B': '&rfloor;'    // char(8971)
    // , '\u2329': '&lang;'      // char(9001)
    // , '\u232A': '&rang;'      // char(9002)
    // , '\u25CA': '&loz;'       // char(9674)
    // , '\u2660': '&spades;'    // char(9824)
    // , '\u2663': '&clubs;'     // char(9827)
    // , '\u2665': '&hearts;'    // char(9829)
    // , '\u2666': '&diams;'     // char(9830)
  };

  return function textToHtml(text) {
    // Replace 'interesting' ws (leading | trailing | runs of 2+ | vertical) and non-ws (HTML meta | non-ASCII):
    return String(text).replace(/^\s+|\s+$|\s{2,}|[\r\n\u2028\u2029]|[<>&'"]|[^ -~\s]/g, function replacement(special) {
      return t2h[special] ||  // a mapped substring
        special.replace(/(\r\n|\s)|[\w\W]/g, function replacement2(x, ws) {  // unmapped substring = unmapped ws or non-ASCII
          return t2h[x] ||  // mapped char-or-'\r\n' WITHIN an unmapped substring
            (ws ? '&nbsp;' : '&#' + x.charCodeAt(0) + ';');  // unmapped char within unmapped substring
        });
    });
  };
})();

/**
 * Returns a component of a URI that is equivalent to the specified text, where "equivalent" means the result
 * would, if included within a URI, be parsed by a standard URI parser back into the original text. The output
 * conforms with the rules for application/x-www-form-urlencoded (POST) and RFC 3986 (respectively,
 * http://www.w3.org/TR/html401/interact/forms.html#form-content-type and http://tools.ietf.org/html/rfc3986).
 *
 * @static
 *
 * @param {!string} text The text that is to be turned into a URI component.
 *
 * @return {!string} URI component that is equivalent to the text in `text`. Any URI meta-chars
 * ('%', '/', '&amp;', '=') and/or newlines and/or non-ASCII chars within `text` will be
 * transformed/escaped in the result.
 */
rta.textToUriComponent = function textToUriComponent(text) {
  return encodeURIComponent(String(text)).replace(/%20|[!'()*]/g, function replacement(s) {
    return _textToUriComponentExtras[s];
  });
};
var _textToUriComponentExtras = {
    '%20': '+'  // because this is required for application/x-www-form-urlencoded (POST)
  , '!': '%21'  // because RFC 3986 reserves this: http://tools.ietf.org/html/rfc3986
  , '\'': '%27' // because RFC 3986 reserves this: http://tools.ietf.org/html/rfc3986
  , '(': '%28'  // because RFC 3986 reserves this: http://tools.ietf.org/html/rfc3986
  , ')': '%29'  // because RFC 3986 reserves this: http://tools.ietf.org/html/rfc3986
  , '*': '%2A'   // because RFC 3986 reserves this: http://tools.ietf.org/html/rfc3986
};

/**
 * Returns a non-null array of zero or more non-null match-objects, each of which represents a non-overlapping
 * match of the specified regexp against the string.
 *
 * If the regexp was compiled with 'g', the result includes all zero or more matches (up to
 * `opt_maxMatches`); otherwise the result includes at most one match - the first.
 *
 * If the regexp doesn't match at all, returns `[]` rather than null, so it is always safe to use
 * `.forEach()`, `.filter()`, `.map()`, etc. on the result.
 *
 * If the regexp was compiled with 'g', you may pre-specify `re.lastIndex` to the index of
 * `str` where the first match should start. For example, if `re.lastIndex` is 3, then
 *
 * Note: This never goes into an infinite loop, even if `re` is able to match zero chars.
 *
 * Sample usage: `rta.allMatches(/^(.+?): (.*)$/gm, httpHeaderString).forEach(function(m) {
 * doSomethingWith(m[1], m[2]); });`
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!RegExp} re Regular expression to find within `str`. Compile with 'g' to find/return
 * all (non-overlapping) matches, or without 'g' to find/return at most one match. Note:
 * `re.lastIndex` is neither used nor changed.
 *
 * @param {!string} str Source string that will be searched.
 *
 * @param {number} [opt_startIndex=0] Zero-based position within `str` to start searching. Note:
 * this function intentionally ignores `re.lastIndex`, instead using parameter
 * `opt_startIndex`.
 *
 * @param {number} [opt_maxMatches=Infinity] Maximum number of matches to return. Regardless of how big this
 * is, the function never returns more than one match if `re` was compiled without
 * `'g'`, for example, `/xyz/` rather than `/xyz/g`. If it is explicitly
 * specified as zero, negative, or NaN, always returns `[]`.
 *
 * @return {!Array<object>} Non-null but possibly-empty array of match objects. Each match object is a
 * non-null array containing (1 + the number of capture groups in `re`) possibly
 * `undefined` strings. If `m` is one of those match objects, `m[0]` is the
 * entire matched substring (`$&`), `m[1]` is the first capture group (`$1`),
 * etc. If a given capture group did not match at all, the corresponding array element will be
 * `undefined`, e.g., `/(a?)(b?)(c)?/` matches the string 'ab' with 3 capture-groups:
 * `['a', 'b', undefined]`. Each match object `m` also has property `m.index`
 * = the 0-based index within `str` of the start of this match, and `m.input` = a copy
 * of `str`. If `re` didn't match `str` at all, returns an empty array,
 * `[]`.
 */
rta.allMatches = function allMatches(re, str, opt_startIndex, opt_maxMatches) {
  var matches = [];
  var p = new rta.Parser(str, opt_startIndex || 0);
  opt_maxMatches = Math.min(typeof opt_maxMatches === 'number' ? opt_maxMatches : Infinity,
                            re.global ? Infinity : 1);
  while (matches.length < opt_maxMatches && p.skipTo(re, void 0, matches.length !== 0).result) {
    matches.push(p.result);
  }
  return matches;
};

/**
 * Pseudo methods to apply in `interpolateGetMember`.
 *
 * @api private
 * @see rta.interpolate()
 * @see interpolateGetMember()
 */
var interpolatePseudoMethods = {
  object: {
    source: function source(opt_whitespace, opt_maxLength) {
      var ans = rta.toSource(this, opt_whitespace);
      return typeof opt_maxLength === 'number' ? rta.head(ans, opt_maxLength, slashStarDotDotDot) : ans;
    },
    keys: function keys() {
      return Object.keys(this);
    },
    join: function join(sep) {
      return this.join(sep);
    }
  },
  string: {
    uppercase: function uppercase() {  // '{x.uppercase}' changes 'nOw iS tHe tImE' to 'NOW IS THE TIME'
      return String(this).toUpperCase();
    },
    lowercase: function lowercase() {  // '{x.lowercase}' changes 'nOw iS tHe tImE' to 'now is the time'
      return String(this).toLowerCase();
    },
    titlecase: function titlecase() {  // '{x.titlecase}' changes 'nOw iS tHe tImE' to 'Now Is The Time'
      return rta.toTitleCase(this);
    },
    alignLeft: function alignLeft(width, opt_fillchar) {
      return rta.leftJustified(this, width, opt_fillchar);
    },
    alignRight: function alignRight(width, opt_fillchar) {
      return rta.rightJustified(this, width, opt_fillchar);
    },
    alignCenter: function alignCenter(width, opt_fillchar) {
      return rta.centered(this, width, opt_fillchar);
    },
    head: function head(maxlen, opt_suffix) {  // like {x.slice(0,maxlen)} but appends opt_suffix if truncates
      return rta.head(this, maxlen, opt_suffix);
    },
    tail: function tail(maxlen) {              // convenience; same as {x.toString.slice(0,maxlen)}
      return String(this).slice(-maxlen);
    },
    charAt: function charAt(index) {           // '{x.charAt(3)}' is the 4th char in the stringifed x
      return String(this).charAt(index);
    },
    slice: function slice(begin, opt_end) {    // '{x.slice(3,5)}' is the (up to) 2 chars starting at the 4th char of the stringified x
      return String(this).slice(begin, opt_end);
    },
    html: function html() {                    // '{x.html}' is stringifed x encoded for HTML, e.g., '<' becomes '&lt;', etc.
      return rta.textToHtml(String(this));
    },
    uriComponent: function uriComponent() {    // '{x.uriComponent}' is stringifed x encoded as a URI component, e.g., ' ' becomes '+', etc.
      return rta.textToUriComponent(String(this));
    }
  },
  number: {
    currency: function currency(opt_precision) {  // a string with exactly that #trailing digits
      return rta.numberToCurrency(this, opt_precision);
    },
    commas: function commas(opt_precision) {      // adds commas, produces exactly that #trailing digits
      return rta.numberToLocale(this, opt_precision);
    },
    round: function round(opt_precision) {        // a number rounded as close as possible to that #trailing digits
      return rta.round(this, opt_precision);
    }

    // Here are some other pseudo-methods that could trivially be included:
    //   round: function round() {        // shorthand for '{x.toFixed(0)}'
    //     return this.toFixed();
    //   },
    //   floor: function floor() {
    //     return String(Math.floor(this));
    //   },
    //   ceil: function ceil() {
    //     return String(Math.ceil(this));
    //   },
    //   fixed: function fixed(opt_numFractionDigits) {
    //     return this.toFixed(opt_numFractionDigits);
    //   },
    //   hex: function hex() {            // shorthand for '{x.radix(16)}'
    //     return this.toString(16).toLowerCase();
    //   },
    //   octal: function octal() {        // shorthand for '{x.radix(8)}'
    //     return this.toString(8);
    //   },
    //   binary: function binary() {      // shorthand for '{x.radix(2)}'
    //     return this.toString(2);
    //   },
    //   radix: function radix(radix) {
    //     return this.toString(radix);
    //   },
    // Docs for those other options:
    //   | `�{x.floor}�`         | `�1234567�`        | `'�' + Math.floor(obj.x) + '�'` (rounds toward -Infinity)
    //   | `�{x.ceil}�`          | `�1234568�`        | `'�' + Math.ceil(obj.x) + '�'` (rounds toward +Infinity)
    //   | `�{x.round}�`         | `�1234568�`        | `'�' + Math.round(obj.x) + '�'` (rounds to nearest integer)
    //   | `�{x.hex}�`           | `�deadbeef�`       | `'�' + obj.x.toString(16) + '�'` (base 16, lower-case)
    //   | `�{x.hex.uppercase}�` | `�DEADBEEF�`       | `'�' + obj.x.toString(16).toUpperCase() + '�'`
    //   | `�{x.octal}�`         | `�655702�`         | `'�' + obj.x.toString(8) + '�'` (like `�{x.radix(8)}�`)
    //   | `�{x.binary}�`        | `�101000010110�`   | `'�' + obj.x.toString(2) + '�'` (like `�{x.radix(2)}�`)
    //   | `�{x.radix(36)}�`     | `�23az3m2j14r3�`   | `'�' + obj.x.toString(36) + '�'` (base 36)
  }
};

/**
 * Roughly equivalent to `parent[key]`, meaning it returns the member of `parent` named
 * `key`. However this also handles cases where `key` is the name of a pseudo-method in
 * either the type of `parent` or in type `string` or `object`, and this
 * automatically calls the member if it is either a method or pseudo-method.
 *
 * Never throws exceptions. If the member is invalid/unknown, or if it is a method/pseudo-method that
 * throws an exception, or any other bad thing, emits a warning message via rta.warningNoInterpolate() and
 * returns something sensible, typically undefined.
 *
 * This function has no side-effects.
 *
 * @api private
 * @see rta.interpolate()
 * @see interpolatePseudoMethods
 */
var interpolateGetMember = function interpolateGetMember(parent, key, opt_params) {
  // parentAndMember is undefined if member not (yet) found; else 2-elem array w/ new parent and member.
  var parentAndMember, ans;

  // Pseudo-method of parent's exact type?
  if (!parentAndMember && interpolatePseudoMethods[typeof parent] && interpolatePseudoMethods[typeof parent][key]) {
    parentAndMember = [parent, interpolatePseudoMethods[typeof parent][key]];
  }

  // Property of parent?
  if (!parentAndMember && typeof parent === 'object') {
    try {
      if (key in parent) {
        parentAndMember = [parent, parent[key]];
      }
    } catch (e) { }
  }

  // Property of boxed parent?
  if (!parentAndMember && typeof parent !== 'object') {
    try {
      if (key in Object(parent)) {
        parentAndMember = [Object(parent), Object(parent)[key]];
      }
    } catch (e) { }
  }

  // Pseudo-method of string-type?
  if (!parentAndMember && interpolatePseudoMethods.string[key]) {
    try {
      parentAndMember = [parent == null ? '' : String(parent), interpolatePseudoMethods.string[key]];  // intentionally == not ===
    } catch (e) { }
  }

  // Pseudo-method of object-type?
  if (!parentAndMember && interpolatePseudoMethods.object[key]) {
    try {
      parentAndMember = [Object(parent), interpolatePseudoMethods.object[key]];
    } catch (e) { }
  }

  if (!parentAndMember) {
    // Bad property name
    rta.warningNoInterpolate('rta.interpolate(): No ' + rta.toSource(key) + ' property in ' + rta.toSource(parent, void 0, 30));
    ans = void 0;
  } else if (typeof parentAndMember[1] === 'function') {
    // Method or pseudo-method
    try {
      ans = parentAndMember[1].apply(parentAndMember[0], opt_params || []);  // this might throw an exception
    } catch (e) {
      rta.warningNoInterpolate('rta.interpolate(): ' + ('message' in e ? e.message : e) + ('stack' in e ? '\n' + e.stack : ''));
      ans = void 0;
    }
  } else if (opt_params) {
    // Not a method/pseudo-method, but the template had explicit params
    rta.warningNoInterpolate('rta.interpolate(): ' + key + ' is a non-method of ' + rta.toSource(parent, void 0, 30));
    ans = parentAndMember[1];
  } else {
    // Not a method/pseudo-method, and template did not have explicit params
    ans = parentAndMember[1];
  }

  return ans;
};

/**
 * Utility function to interpolate args into a template-string, returning the populated string.
 *
 * Numeric keys (`{0}`, `{1}`, etc.) in the template string refer to the positional
 * args passed to this function. E.g., `{0}` refers to arg `x` and `{1}`
 * refers to arg `y` in `rta.interpolate(template, x, y)`.
 *
 * Named keys (`{foo}`, `{bar}`, etc.) in the template string refer to key-names in
 * the first positional arg passed to this function. E.g., `{foo}` refers to `x.foo`
 * (same as `{0.foo}`) and `{bar}` refers to `x.bar` (same as
 * `{0.bar}`) in `rta.interpolate(template, x, y)`.
 *
 * Examples with named parameters: `rta.interpolate(template, {name: x, age: y})`
 *
 * | Sample template                    | As if you typed
 * | ---------------------------------- | ---------------
 * | `{name} is age {age}`              | `x + ' is age ' + y`
 * | `{age} years ago {name} was born`  | `y + ' years ago ' + x + ' was born'`
 *
 * Examples with positional parameters: `rta.interpolate(template, x, y)`
 *
 * | Sample template               | As if you typed
 * | ----------------------------- | ---------------
 * | `{0} is age {1}`              | `x + ' is age ' + y`
 * | `{1} years ago {0} was born`  | `y + ' years ago ' + x + ' was born'`
 *
 * You can also provide 'dotted' expressions:
 *
 * | Sample template | As if you typed
 * | --------------- | ---------------
 * | `�{0}�`         | `'�' + x + '�'`
 * | `�{0.bar}�`     | `'�' + x.bar + '�'`
 * | `�{0.bar[3]}�`  | `'�' + x.bar[3] + '�'`
 * | `�{0[3].bar}�`  | `'�' + x[3].bar + '�'`
 *
 * You can also add *pseudo-methods*.
 * These pseudo-methods are usable when `{0}` any type - object, string, number, array, etc.:
 *
 * | Sample Template        | Sample Output        | As if you typed
 * | ---------------------- | -------------------- | ---------------
 * | `�{0.keys.join(',')}�` | `�foo,bar,baz�`      | `'�' + Object.keys(x).length + '�'`
 * | `�{0.keys.length}�`    | `�3�`                | `'�' + Object.keys(x).length + '�'`
 * | `�{0.source}�`         | `�"\"foo\\n\""�`     | `'�' + rta.toSource(x) + '�'`
 * | `�{0.source}�`         | `�{"x":7}�`          | `'�' + rta.toSource(x) + '�'`
 * | `�{0.source(2)}�`      | `�{\n  "x": 7\n}�`   | `'�' + rta.toSource(x, 2) + '�'`
 * | `�{0.source(0, 15)}�`  | `�\"VeryLon{*...*}�` | `'�' + rta.toSource(x, 0, 15) + '�'`
 *
 * These pseudo-methods are usable when `{0}` is a string or number (numbers are automatically stringified first):
 *
 * | Sample Template            | Sample Output | As if you typed
 * | -------------------------- | ------------- | ---------------
 * | (Object pseudo-methods)    | &nbsp;        | (Object pseudo-methods work on strings and numbers)
 * | `�{0.uppercase}�`          | `�FOO BAR�`   | `'�' + String(x).toUpperCase() + '�'`
 * | `�{0.lowercase}�`          | `�foo bar�`   | `'�' + String(x).toLowerCase() + '�'`
 * | `�{0.titlecase}�`          | `�Foo Bar�`   | `'�' + rta.toTitleCase(x) + '�'`
 * | `�{0.alignLeft(7)}�`       | `�xyz    �`   | `'�' + rta.leftJustified(x, 7) + '�'`
 * | `�{0.alignRight(7)}�`      | `�    xyz�`   | `'�' + rta.rightJustified(x, 7) + '�'`
 * | `�{0.alignCenter(7)}�`     | `�  xyz  �`   | `'�' + rta.centered(x, 7) + '�'`
 * | `�{0.alignLeft(7,'.')}�`   | `�xyz....�`   | `'�' + rta.leftJustified(x, 7, '.') + '�'`
 * | `�{0.alignRight(7,'.')}�`  | `�....xyz�`   | `'�' + rta.rightJustified(x, 7, '.') + '�'`
 * | `�{0.alignCenter(7,'.')}�` | `�..xyz..�`   | `'�' + rta.centered(x, 7, '.') + '�'`
 * | `�{0.head(6)}�`            | `�Trunca�`    | `'�' + rta.head(x, 6) + '�'`
 * | `�{0.head(6, '..')}�`      | `�Trun..�`    | `'�' + rta.head(x, 6, '..') + '�'`
 * | `�{0.tail(6)}�`            | `�uncate�`    | `'�' + String(x).slice(-6) + '�'`
 * | `�{0.charAt(3)}�`          | `�n�`         | `'�' + String(x).charAt(3) + '�'`
 *
 * Pseudo-methods usable when `{0}` is a number:
 *
 * | Sample Template         | Sample Output      | As if you typed
 * | ----------------------- | ------------------ | ---------------
 * | (Object pseudo-methods) | &nbsp;             | (Object pseudo-methods work on numbers)
 * | (String pseudo-methods) | &nbsp;             | (String pseudo-methods work on numbers after stringifying)
 * | `�{0.commas}�`          | `�1,234,567.894�`  | `'�' + rta.numberToLocale(x) + '�'`
 * | `�{0.commas(0)}�`       | `�1,234,568�`      | `'�' + rta.numberToLocale(x, 0) + '�'`
 * | `�{0.commas(4)}�`       | `�1,234,567.8937�` | `'�' + rta.numberToLocale(x, 4) + '�'`
 * | `�{0.currency}�`        | `�$1,234,567.89�`  | `'�' + rta.numberToCurrency(x) + '�'`
 * | `�{0.currency(0)}�`     | `�$1,234,568�`     | `'�' + rta.numberToCurrency(x, 0) + '�'`
 * | `�{0.round(3)}�`        | `�1234567.894�`    | `'�' + rta.round(x, 3) + '�'` (result is a number so is approx)
 *
 * Note that 'currency' and 'commas' add locale-specific grouping-separators: '1,234,567.89' in the US,
 * '1.234.567,89' in Germany, etc. The currency symbol is currency-specific, e.g., leading '$' for USD,
 * trailing euro-symbol '\u20AC' for Germany, etc.
 *
 * The template can omit the empty-parens if calling a method with no args:
 * `{x.toString.toUpperCase}` is the same as `{foo.toString().toUpperCase()}`; similarly
 * with positional args: `{3.method}`.
 *
 * Skips invalid/missing keys and/or members with value null or undefined: `{x.noSuchProperty}`
 * or `{x.noSuchMethod(...)}` are simply skipped in the output, as if they are replaced by the
 * empty-string, "". Same with non-existant positional args, e.g., using `{3}` but passing less
 * than 4 args.
 *
 * Occurrences of `{{` in `template` will be replaced by a single `{` in
 * the output, and similarly `}}` will be replaced by a `}`-literal. Example #1:
 * `{{x}}` will be replaced by a literal `{x}` - `x` is not
 * interpolated. Example #2: `{{{x}}}` will be replaced by a `{`-literal, the
 * interpolated value of field `x`, then another `}`-literal.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template The template-string which may optionally contain substrings as described above.
 *
 * @param {*} arg0 Template-occurrences of `{0}` are replaced with `arg0`, and
 * template-occurrences of named args, e.g., `{foo}`, are replaced by `arg0.foo`.
 *
 * @return {string} A copy of `template` with all keys replaced by corresponding args.
 *
 * @throws {Error} if `template` is ill-formed, e.g., a `{` not followed by a
 * name/index, inbalanced `(...)` in a method parameter list, dangling `}` not preceded
 * by a matching `{`, etc. Important: exceptions are strictly on the basis of whether
 * `template` is ill-formed, never on the basis of the args passed with the template. This means
 * you the programmmer can statically determine whether this will / will not throw an exception solely by
 * looking at the template string irrespective of whether you pass in args that "match" that template string.
 */
rta.interpolate = function interpolate(template, arg0) {
  var parser = new rta.Parser(template);
  var ans = '';

  while (parser.skipTo(/\{\{?|\}\}?/).result) {  // '{' or '{{' or '}' or '}}'
    ans += parser.skippedChars();
    if (parser.result[0] === '{') {
      parser.eat(/([$_a-zA-Z][$_a-zA-Z0-9]*)|(\d+)/).elseThrow(typeof arg0 === 'object' ? 'name or index' : 'index');
      var val = parser.result[1] ? arg0 : Array.prototype.slice.call(arguments, 1);  // FUTURE: change to 'let'
      do {
        var key = parser.result[1] || Number(parser.result[2]);  // FUTURE: change to 'let'
        if (parser.eat('(').result) {
          val = interpolateGetMember(val, key, parser.eatMulti(/\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[Ee][-+]?\d+)?)|\s*\'([^\']*)\'|\s*\"([^\"]*)\"/, /,\s*/).map(function mapper(m) {
            return m[1] ? Number(m[1]) : m[2] != null ? m[2] : m[3];
          }));
          parser.eat(')').elseThrow();
        } else {
          val = interpolateGetMember(val, key);
        }
      } while (parser.eat(/\.([a-zA-Z_$][a-zA-Z_$0-9]*)|\[(\d+)\]/).result);
      ans += (val === null || val === void 0 ? '' : val);
      parser.eat('}').elseThrow();
    } else if (parser.result[0] === '}') {
      rta.errorNoInterpolate('rta.interpolate(): template has an extra/dangling "}"');  // not rta.error() - avoid infinite recursion
    } else {
      ans += parser.result[0][0];  // '{{' or '}}' ==> emit exactly one char
    }
  }

  ans += parser.nextSrc();
  return ans;
};

/**
 * Same as `rta.interpolate()` but is very defensive - it degrades the result-string as much as
 * necessary to guarantee it never throws exceptions, e.g., if the template-string and/or args are illformed.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.interpolateNoThrow = function interpolateNoThrow() {  // args: (template, arg0...)
  try {
    return rta.interpolate.apply(void 0, arguments);
  } catch (e) {
    return Array.prototype.slice.call(arguments, 0).map(function mapper(arg) {
      return rta.toSource(arg);
    }).join(', ');
  }
};

/**
 * A regexp that matches any wellformed JavaScript tokens other than '{' or '}'.
 * Correctly skips braces within comments or string-literals, '//' or '/*' within string-literals, quotes within comments, etc.
 *
 * Subtle: it doesn't guarantee it will match ALL tokens prior to the next '{' or '}' or end-of-string.
 * Therefore if you want to consume all such tokens until the next '{' or '}' or end-of-string, put this into a loop.
 *
 * Subtle: We *could* embed the loop inside this RegExp, and naively that would seem to make things faster/better.
 * However that would cause certain illformed JavaScript to take a loooooonnnnngggg time to match.
 * Reason: loops within loops take exponential time (since the JS RegExp machinery does not support no-backtrack loops).
 *
 * Details:
 * Special chars are either quote('"' or "'"), either brace({ or }), or a slash(/).
 * Match:
 *
 *  - one or more non-special chars, *or*
 *  - a '"'-delimited string-literal (correctly handling backslashes), *or*
 *  - a "'"-delimited string-literal (correctly handling backslashes), *or*
 *  - a slash-slash comment, *or*
 *  - a slash-star comment, *or*
 *  - a '/' that is not followed by a '*' or another '/' (but don't consume the second char in case it is a brace or quote).
 *
 * @const
 * @api private
 */
var nonBracesRe = new RegExp([
  /[^\"\'\/\{\}]+/.source,  // one or more non-special chars
  /\"(?:[^\"\\]|\\[\s\S])*\"/.source,  // '"'-delimited string-literal
  /\'(?:[^\'\\]|\\[\s\S])*\'/.source,  // "'"-delimited string-literal
  /\/(?:\/[^\n]*|\*[\s\S]*?\*\/|(?![\/\*]))/.source  // a slash-slash-comment or slash-star-comment or a naked '/' (not followed by '*' or '/')
].join('|'));  // don't need 'm' since '//'-comments are defined in terms of //[^\n]* rather than //.*

/**
 * Poor-man's version of ES6-quasi functionality - returns an array of `eval`able strings.
 *
 * @param {string} template - The string to be parsed into an array, which may contain an arbitrary number of
 * replacement-expressions wrapped in braces, for example, `'foo {x} bar {y} baz'`. To include a literal
 * brace, use a string literal, such as `'left-brace={'{'} right-brace={'}'}'`. Comments (both slash-star and
 * slash-slash) are also alowed, and are handled correctly. The expression within the `{...}` must be a valid
 * JavaScript exression, which implies, among other things, that the `{` and `}` must be balanced (except, of
 * course, for braces within string literals or comments).
 *
 * @return {Array<string>} Length always at least one and always odd. Elements with an even index (0, 2, 4,
 * ...) are guaranteed to be strings that can be validly parsed via `eval` or `JSON.parse()` -- these are the
 * literals between the {replacement} expressions. Elements with an odd index, if any, contain whatever
 * JavaScript expressions were within the {...} within the template string.
 */
rta.quasiArray = function quasiArray(template) {
  var p = new rta.Parser(template);
  var eatNonBraces = (function eatNonBraces() {
    // Intentionally use JS loop, not '+' in RegExp; @see nonBracesRe for why
    while (p.eat(nonBracesRe).result) {
      // Intentionally left blank
    }
  });
  var eatUntilCloseBrace = (function eatUntilCloseBrace() {
    eatNonBraces();
    while (p.eat('{').result) {
      eatUntilCloseBrace();  // recurse
      p.eat('}').elseThrow();
      eatNonBraces();
    }
  });
  var ans = [];

  var beginArg;
  while (p.skipTo(/\$\{/).result) {
    beginArg = p.beginMatch;
    ans.push(JSON.stringify(p.skippedChars()));
    eatUntilCloseBrace();
    p.eat('}').elseThrow();
    ans.push(p.src.slice(beginArg + 2, p.beginMatch));
    if (ans[ans.length - 1].trim().length === 0) {
      // Do not change rta.errorNoInterpolate() to rta.error() - that could cause infinite recursion
      rta.errorNoInterpolate('rta.quasi(): substitution-expression is empty: ' + p.src.slice(beginArg, p.endMatch));
      throw new Error('Substitution-expression is empty: ' + p.src.slice(beginArg, p.endMatch));
    }
  }

  ans.push(JSON.stringify(p.nextSrc()));
  return ans;
};

/**
 * Poor-man's version of ES6-quasi functionality - returns an `eval`able array.
 *
 * Typical usage: `var str = eval(rta.quasi('Foo {a} bar {b} baz'));`. The use of `eval` here is perfectly
 * safe *provided* the `template` string comes from a trusted source, for example, burned into your source
 * code or from a trusted file. If the `template` is burned into your own source code, the evaluated
 * expressions are no worse than any other JavaScript expressions you write - if you don't trust your own
 * code, don't write JavaScript (or C or C++ or any other language with sufficient power / efficacy).
 *
 * @param {string} template - The string to be parsed into an array, which may contain an arbitrary number of
 * replacement-expressions wrapped in braces, for example, `'foo {x} bar {y} baz'`. To include a literal
 * brace, use a string literal, such as `'left-brace={'{'} right-brace={'}'}'`. Comments (both slash-star and
 * slash-slash) are also alowed, and are handled correctly. The expression within the `{...}` must be a valid
 * JavaScript exression, which implies, among other things, that the `{` and `}` must be balanced (except, of
 * course, for braces within string literals or comments).
 *
 * @return {string} JavaScript source-code which you, the caller, can choose to evaluate, for example via
 * `eval` or `Function(...)`. Once evaluated, JavaScript code within replacements, `{...}`, will be evaluated
 * and the result included in the final string, and any characters between replacement expressions, if any,
 * will be included verbatim.
 */
rta.quasi = function quasi(template) {
  return '[' + rta.quasiArray(template).join(', ') + '].join("")';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.Parser - object for parsing strings ///////////////////////////////////////////////////////////////////

/**
 * Constructor of a lightweight parser that can be used to parse the specified string.
 *
 * Sample to process an optional foo followed by an optional bar:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     p.eat(/foo/).eat(/bar/);
 *     if (p.result) {
 *       processBar(p.result);
 *     }
 *
 * Like `/ foo (bar) /`, though this does not backtrack / revert if foo matches but bar fails.
 *
 * Sample to process a required foo followed by a required bar:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     p.eat(/foo/).elseThrow('Missing foo').eat(/bar/).elseThrow('Missing bar');
 *     processBar(p.result);
 *
 * Like `/ foo (bar) /`, though this does not backtrack / revert if foo matches but bar fails.
 *
 * Sample to process an adjacent list of foos:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     p.forEach(/foo/, function(foo, index, sepMatch) {
 *       processFoo(foo);
 *     });
 *
 * Like `/ (foo)* /`, though this captures all the matches.
 *
 * Sample to process list of foos, each *separated* by a ','-separator.
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     p.forEach(/foo/, ',', function(foo, index, sepMatch) {
 *       processFoo(foo);
 *     });
 *
 * Like `/ (?: (foo) (?:, (foo))* )? /`, though this captures all the matches.
 *
 * Or you can use an explicit loop, e.g., to optionally break out early:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     while (p.eat(/foo/).result) {  // or pass true if /foo/ can match nothing
 *       processFoo(p.result);
 *     }
 *
 *
 * Sample to find all *not necessarily adjacent* matches:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     if (p.skipTo(/foo/).result) {
 *       processFoo(p.result, p.skippedChars());  // p.skippedChars() is the substring prior to the /foo/
 *     }
 *
 * Like `/ (.*?) (foo) /`, capturing both the skipped chars and the foo.
 *
 * Sample to capture an optional parenthesized param-list (add whitespace to the patterns as desired):
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     ...
 *     var params = void 0;  // undefined if there was no param-list
 *     if (p.eat('(').result) {
 *       params = p.eatMulti(param, /,/);
 *       p.eat(')').elseThrow();
 *     }
 *     ...
 *
 * Supports a backtracking facility for more complex patterns of multiple matches.
 * Examples below assume the following preamble:
 *
 *     var p = new rta.Parser(str, 8);  // 8 is an optional start-position
 *     var targets = [a, b, c];     // a, b, and c are RegExp's and/or string-literals
 *     var state = p.state();       // capture the state so we can backtrack (via 'p.revertTo(state)')
 *
 *
 * Backtracking example #1: like `/(a)|(b)|(c)/`, attempts each target from the same starting point:
 *
 *     var results = targets.map(function(target) { return p.revertTo(state).eat(target).result; });
 *
 * Backtracking example #2: like `/(a)(b)(c)/`, attempts each consecutively, backtrack if any fail:
 *
 *     var i;
 *     for (i = 0; i < targets.length && p.eat(targets[i]).result; i++) {
 *       optionallyDoSomethingWith(p.result);
 *     }
 *     if (i < targets.length) {
 *       p.revertTo(state);
 *     }
 *
 * @class rta.Parser
 * @constructor
 * @this {rta.Parser}
 */
rta.Parser = function Parser(src, opt_initPos) {
  /**
   * The string being parsed.
   * @const
   */
  this.src = src;

  /**
   * In the most recent match attempt, this is an array of matched capture-groups on success or null on
   * failure.
   *
   * Note: every match attempt (e.g., `this.eat()`, `this.skipTo()`, etc.) updates
   * five data members: the target, the matched capture groups, and the indices of the first char attempted,
   * the first char matched, and one past the last char matched.
   *
   * If non-null, `this.result[0]` is the substring of `this.src` (possibly "") that
   * was matched by the target, and, for `i` from 1 through `this.result.length-1`,
   * `this.result[i]` is the `this.src`-substring (possibly "") matched by the regexp's
   * capture-group `i`, or `this.result[i]` is null if the overall target matched but
   * capture group `i` did not match (e.g., `/...(abc)?.../`).
   *
   * @type {?Array<string>}
   */
  this.result = null;

  /**
   * In the most recent match attempt, this is the target searched for.
   *
   * Note: every match attempt (e.g., `this.eat()`, `this.skipTo()`, etc.) updates
   * five data members: the target, the matched capture groups, and the indices of the first char attempted,
   * the first char matched, and one past the last char matched.
   *
   * @type {RegExp|string|null}
   */
  this.target = null;

  /**
   * In the most recent match attempt, this is the 0-based `this.src`-index of the first char that
   * was attempted to be matched.
   *
   * Note: every match attempt (e.g., `this.eat()`, `this.skipTo()`, etc.) updates
   * five data members: the target, the matched capture groups, and the indices of the first char attempted,
   * the first char matched, and one past the last char matched.
   *
   * @type {number}
   */
  this.beginScan = opt_initPos || 0;

  /**
   * In the most recent match attempt, this is the 0-based `this.src`-index of the first char
   * successfully matched, or the same as `this.beginScan` if unsuccessful.
   *
   * Note: every match attempt (e.g., `this.eat()`, `this.skipTo()`, etc.) updates
   * five data members: the target, the matched capture groups, and the indices of the first char attempted,
   * the first char matched, and one past the last char matched.
   *
   * Warning: do *not* assume `this.beginMatch === this.beginScan` necessarily means the
   * most recent match attempt failed. Those will be equal on unsuccessful matches *or* if the match
   * attempt skipped nothing before successfully matching.
   *
   * @type {number}
   */
  this.beginMatch = opt_initPos || 0;

  /**
   * In the most recent match attempt, this is the 0-based `this.src`-index one past the end of a
   * successful match, or the same as `this.beginScan` if unsuccessful.
   *
   * Note: every match attempt (e.g., `this.eat()`, `this.skipTo()`, etc.) updates
   * five data members: the target, the matched capture groups, and the indices of the first char attempted,
   * the first char matched, and one past the last char matched.
   *
   * Warning: do *not* assume `this.endMatch === this.beginScan` necessarily means the
   * most recent match attempt failed. Those will be equal on unsuccessful matches *or* if the match
   * attempt skipped nothing then successfully matched zero chars.
   *
   * @type {number}
   */
  this.endMatch = opt_initPos || 0;
};

/**
 * Maps regexp-source to private, static RegExp objects.
 * @static
 * @api private
 */
var _Parser_regexps = {};

/**
 * Maps literal-source to private, static RegExp objects.
 * @static
 * @api private
 */
var _Parser_literals = {};

/**
 * True if/only if `this` parser is at the very beginning of `str`.
 *
 * @return {boolean}
 */
rta.Parser.prototype.isBof = function isBof() {
  return this.endMatch === 0;
};

/**
 * True if/only if `this` parser is at the very end of `str`.
 *
 * @return {boolean}
 */
rta.Parser.prototype.isEof = function isEof() {
  return this.endMatch === this.src.length;
};

rta.Parser.prototype.skipTo = function skipTo(target, opt_maxSkippedChars, opt_prescanSkipIfPreviouslyConsumedNothing) {
  var self = this;

  // Get a private, cloned RegExp, even if target is already a RegExp (so we know it is compiled with 'g' [so
  // we can use re.lastIndex], plus so so we don't change the original's .lastIndex):
  var re;
  if (target.source) {
    re = _Parser_regexps[target.source] ||
      (_Parser_regexps[target.source] = new RegExp(target.source, 'g' + (target.multiline ? 'm' : '') + (target.ignoreCase ? 'i' : '')));
  } else {
    re = _Parser_literals[target] ||
      (_Parser_literals[target] = new RegExp(String(target).replace(/[^\s\w]/g, '\\$&'), 'g'));
  }

  // Scan for re in [self.endMatch, self.src.length]:
  self.target = target;
  re.lastIndex = self.beginMatch = self.endMatch +
    (opt_prescanSkipIfPreviouslyConsumedNothing && self.beginScan === self.endMatch ? 1 : 0);
  self.beginScan = self.endMatch;
  self.result = re.exec(self.src);

  // Fail if we skipped too many chars:
  if (self.result &&
      typeof opt_maxSkippedChars === 'number' &&
      self.result.index - self.beginScan > opt_maxSkippedChars) {
    self.result = null;
  }

  // If success, set self.endMatch to the char AFTER the matched region:
  if (self.result) {
    self.beginMatch = self.result.index;
    self.endMatch = re.lastIndex;
  }

  return self;
};

rta.Parser.prototype.eat = function eat(target, opt_prescanSkipIfPreviouslyConsumedNothing) {
  return this.skipTo(target, 0, opt_prescanSkipIfPreviouslyConsumedNothing);
};

rta.Parser.prototype.elseThrow = function elseThrow(opt_expected) {
  if (!this.result) {
    throw new Error(typeof opt_expected === 'function' ?
                    opt_expected(this) :
                    rta.interpolate('Missing {0} between {1.prevSrc(10).source} and {1.nextSrc(10).source}', opt_expected || this.target, this));
  }
  return this;
};

rta.Parser.prototype.eatMulti = function eatMulti(target, opt_sep, opt_maxMatches) {
  var results = [];
  this.forEach(target, opt_sep, function elem(result /*, index, precedingSepResult*/) {
    results.push(result);
    return typeof opt_maxMatches !== 'number' || results.length < opt_maxMatches;
  });
  return results;
};

/**
 * @param {Function(Object, number, Object)} callback Breaks out of the loop if `callback()` returns false.
 */
rta.Parser.prototype.forEach = function forEach(target, opt_sep, callback) {
  var self = this;

  if (!callback && typeof opt_sep === 'function') {
    callback = opt_sep;
    opt_sep = void 0;
  }

  self.eat(target);  // consume the first target

  var saved;
  var sepResult = null;
  var callbackCounter = 0;
  while (self.result && callback(self.result, callbackCounter++, sepResult) !== false) {
    saved = self.state();  // capture our state so we can revert
    if (!opt_sep || (sepResult = self.eat(opt_sep).result)) {  // consume the next sep
      if (self.endMatch === saved.beginScan) {
        self.endMatch++;  // prevent infinite loop - neither prev target nor curr sep consumed anything
      }
      self.eat(target);  // consume the next target
    }
  }

  // Revert if we got here because of a failed match (as opposed to callback() returning false)
  if (!self.result && saved) {
    self.revertTo(saved);
  }

  return self;
};

rta.Parser.prototype.numSkippedChars = function numSkippedChars() {
  return this.beginMatch - this.beginScan;
};

rta.Parser.prototype.skippedChars = function skippedChars() {
  return this.src.slice(this.beginScan, this.beginMatch);
};

/**
 * The current (1-based) line-number.
 *
 * Note: the performance of this should is certainly acceptable for things like error messages, but it should
 * not be called on an inner loop since it scans `this.src`.
 *
 * @return {number} One more than the number of '\n's in `this.src` up through the end of the
 * most recently successful match.
 */
rta.Parser.prototype.linenum = function linenum() {
  return (this.src.slice(0, this.beginMatch).match(/\n/g) || []).length + 1;
};

/**
 * Returns the last chars of `this.src` that were parsed/consumed.
 *
 * | Sample Usage       | Description of Result
 * | ------------------ | ---------------------
 * | `this.prevSrc()`   | All previously parsed/consumed chars
 * | `this.prevSrc(10)` | The last 10 chars that were parsed/consumed<br>(or all if we have parsed/consumed less than 10 chars).
 *
 * @param {number} [opt_length=Infinity] The maximum number of chars of `this.src` to be
 * returned. By default, returns all previously parsed/consumed chars of `this.src`.
 *
 * @return {string} The designated substring of `this.src`.
 */
rta.Parser.prototype.prevSrc = function prevSrc(opt_length) {
  var begin = typeof opt_length === 'number' ?
    Math.max(0, this.endMatch - opt_length) :
    0;
  return this.src.slice(begin, this.endMatch);
};

/**
 * Returns the next chars of `this.src` to be parsed/consumed.
 *
 * | Sample Usage       | Description of Result
 * | ------------------ | ---------------------
 * | `this.nextSrc()`   | All remaining not-yet-parsed/consumed chars
 * | `this.nextSrc(10)` | The next 10 chars to be parsed/consumed<br>(or all if we have less than 10 to go).
 *
 * @param {number} [opt_length=Infinity] The maximum number of chars of `this.src` to be
 * returned. By default, returns all not-yet-parsed chars of `this.src`.
 *
 * @return {string} The designated substring of `this.src`.
 */
rta.Parser.prototype.nextSrc = function nextSrc(opt_length) {
  var end = typeof opt_length === 'number' ?
    this.endMatch + Math.max(opt_length, 0) :
    void 0;
  return this.src.slice(this.endMatch, end);
};

/**
 * Returns the following slice of `this.src`: [pos + relativeBegin, pos + opt_relativeEnd), where
 * pos is the index of the first char after the last successful match, that is, is the number of chars of
 * `src` successfully consumed. If `opt_relativeEnd` is missing, returns through the end
 * of `src`, as if via `this.src.slice(pos + relativeBegin)`.
 *
 * | Sample Usage            | Same As                              | Description of Result
 * | ----------------------- | ------------------------------------ | ---------------------
 * | `this.context(-10, 0)`  | `this.prevSrc(10)`                   | The last 10 chars that were parsed/consumed<br>(or all if we have parsed/consumed less than 10 chars).
 * | `this.context(0, 10)`   | `this.nextSrc(10)`                   | The next 10 chars to be parsed/consumed<br>(or all if we have less than 10 to go).
 * | `this.context(0)`       | `this.nextSrc()`                     | All remaining not-yet-parsed/consumed chars.
 * | `this.context(-10, 5)`  | `this.prevSrc(10) + this.prevSrc(5)` | The last 10 chars up through the next 5 chars.
 * | `this.context(-10, -3)` | `this.prevSrc(10).slice(0, -3)`      | The (up to) 7 chars we parsed/consumed at least 3 chars ago.
 */
rta.Parser.prototype.context = function context(relativeBegin, opt_relativeEnd) {
  var begin = Math.max(0, this.endMatch + relativeBegin);
  var end = typeof opt_relativeEnd === 'number' ?
    Math.max(0, this.endMatch + opt_relativeEnd) :
    void 0;
  return this.src.slice(begin, end);
};

rta.Parser.prototype.state = function state() {
  return {
    target: this.target,
    result: this.result,
    beginScan: this.beginScan,
    beginMatch: this.beginMatch,
    endMatch: this.endMatch
  };
};

rta.Parser.prototype.revertTo = function revertTo(state) {
  this.target = state.target;
  this.result = state.result;
  this.beginScan = state.beginScan;
  this.beginMatch = state.beginMatch;
  this.endMatch = state.endMatch;
  return this;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Number utilities //////////////////////////////////////////////////////////////////////////////////////////

rta.defaultLocaleName = 'en-US';
rta.defaultCurrencyName = 'USD';
rta.defaultCurrencyPrecision = 2;

/**
 * Returns the number truncated toward zero, as if it is stored in a 32-bit signed integer.
 *
 * Acts as though it first truncates the number toward zero, as if by `Math.sign(x) *
 * Math.floor(Math.abs(x))`, then forces the result into a 32-bit signed integer.
 *
 * If the truncated value of x is N greater than rta.int32.max, the result wraps around to
 * `rta.int32.min - 1 + N`.
 *
 * If the truncated value of x is N less than rta.int32.min, the result wraps around to `rta.int32.max
 * + 1 - N`.
 *
 * | Sample Usage                     | Result
 * | -------------------------------- | ---------------------
 * | `rta.int32(3.9)`                 | 3
 * | `rta.int32(-0.9)`                | 0 (truncates toward zero)
 * | `rta.int32(-3.9)`                | -3 (truncates toward zero)
 * | `rta.int32(rta.int32.max)`       | `rta.int32.max` (== 2147483647)
 * | `rta.int32(rta.int32.max + 0.9)` | `rta.int32.max` (== 2147483647)
 * | `rta.int32(rta.int32.max + 1)`   | `rta.int32.min` (== -2147483648)
 * | `rta.int32(rta.int32.max + 2)`   | `rta.int32.min + 1` (== -2147483647)
 * | `rta.int32(rta.int32.min)`       | `rta.int32.min` (== -2147483648)
 * | `rta.int32(rta.int32.min - 0.9)` | `rta.int32.min` (== -2147483648)
 * | `rta.int32(rta.int32.min - 1)`   | `rta.int32.max` (== 2147483647)
 * | `rta.int32(rta.int32.min - 2)`   | `rta.int32.max - 1` (== 2147483646)
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x the number to be truncated.
 *
 * @return {!number} the number truncated toward zero and wrapped into a 32-bit signed integer. Guaranteed
 * to be in [rta.int32.min, rta.int32.max].
 */
rta.int32 = function int32(x) {
  return x >> 0;
};

/**
 * Maximum possible value returned from `rta.int32(x)`, as if stored in a 32-bit signed integer.
 * Numerically the same value as 2147483647 === `Math.pow(2,31) - 1`.
 *
 * @static
 * @const
 */
rta.int32.max = rta.int32(2147483647);  // AKA ((-1 >>> 1) >> 0)

/**
 * Minimum possible value returned from `rta.int32(x)`, as if stored in a 32-bit signed integer.
 * Numerically the same value as -2147483648 === `-Math.pow(2,31)`.
 *
 * @static
 * @const
 */
rta.int32.min = rta.int32(-2147483648);  // AKA (1 << 31)

/**
 * Returns the number truncated toward zero, as if it is stored in a 32-bit unsigned integer.
 *
 * Acts as though it first truncates the number toward zero, as if by `Math.sign(x) *
 * Math.floor(Math.abs(x))`, then forces the result into a 32-bit unsigned integer.
 *
 * If the truncated value of x is N greater than rta.uint32.max, the result wraps around to N (geek: to
 * `rta.uint32.min - 1 + N`).
 *
 * If the truncated value of x is negative N (geek: N less than rta.uint32.min), the result wraps around to
 * `rta.uint32.max + 1 - N`.
 *
 * | Sample Usage                       | Result
 * | ---------------------------------- | ---------------------
 * | `rta.uint32(3.9)`                  | 3
 * | `rta.uint32(0)`                    | 0
 * | `rta.uint32(-0.9)`                 | 0 (truncates toward zero *before* treating as an unsigned integer)
 * | `rta.uint32(-1)`                   | `rta.uint32.max` (== 4294967295)
 * | `rta.uint32(-2)`                   | `rta.uint32.max - 1` (== 4294967294)
 * | `rta.uint32(rta.uint32.max)`       | `rta.uint32.max` (== 4294967295)
 * | `rta.uint32(rta.uint32.max + 0.9)` | `rta.uint32.max` (== 4294967295)
 * | `rta.uint32(rta.uint32.max + 1)`   | 0 (== `rta.uint32.min`)
 * | `rta.uint32(rta.uint32.max + 2)`   | 1 (== `rta.uint32.min + 1`)
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x the number to be truncated.
 *
 * @return {!number} the number truncated toward zero and wrapped into a 32-bit unsigned integer. Guaranteed
 * to be in [rta.uint32.min, rta.uint32.max].
 */
rta.uint32 = function uint32(x) {
  return x >>> 0;
};

/**
 * Maximum possible value returned from `rta.uint32(x)`, as if stored in a 32-bit unsigned integer.
 * Numerically the same value as 4294967295 === `Math.pow(2,32) - 1`.
 *
 * @static
 * @const
 */
rta.uint32.max = rta.uint32(4294967295);  // AKA (-1 >>> 0)

/**
 * Minimum possible value returned from `rta.uint32(x)`, as if stored in a 32-bit unsigned integer.
 * Numerically the same value as 0.
 *
 * @static
 * @const
 */
rta.uint32.min = rta.uint32(0);  // AKA (0 >>> 0)

/**
 * True if/only if the parameter is a finite, non-NaN number with no fractional part that has value between
 * `-Number.MAX_INTEGER` and `Number.MAX_INTEGER`, inclusive.
 *
 * FUTURE: Change callers to use Number.isInteger() if we commit to es6, such as es6-shim.js.
 *
 * This function has no side-effects.
 *
 * @static
 */
rta.isInteger = (function() {
  return typeof Number.isInteger === 'function' ?
    Number.isInteger :
    function isInteger(n) {
      return typeof n === 'number' &&
        isFinite(n) &&
        n >= -9007199254740992 &&
        n <= 9007199254740991 &&
        Math.floor(n) === n;
    };
})();

/**
 * Returns a close approximation to the number rounded to the specified number of digits after the decimal
 * point (default to zero, i.e., same as Math.round(x)).
 *
 * Note: 'a close approximation to' is because many base-10 fractions cannot be exactly represented in base-2
 * floating point numbers. That means stringifying the result might produce a string that shows more than
 * `opt_precision` trailing digits. If you want a stringified number with exactly
 * `opt_precision` digits, use `x.toFixed(opt_precision)` instead.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} x The number to be rounded.
 *
 * @param {number} [opt_precision=0] The desired number of digits after the decimal point.
 */
rta.round = function round(x, opt_precision) {
  var factor = opt_precision ? Math.pow(10, opt_precision) : 1;
  return Math.round(x * factor) / factor;
};

/**
 * Returns a string representation of the number based on the specified precision and locale, which default,
 * respectively, to 3 and rta.defaultLocaleName.
 *
 * Samples when `rta.defaultLocaleName` is `'en-US'`:
 *
 * | Usage                                    | Result             | Comments
 * | ---------------------------------------- | ------------------ | --------
 * | `rta.numberToLocale(1234567.7654321)`    | `'1,234,567.766'`  | ',' grouping-sep and '.' fractional-sep
 * | `rta.numberToLocale(-1234567.7654321)`   | `'-1,234,567.766'` | negative number uses leading '-'
 * | `rta.numberToLocale(1234567.7654321, 0)` | `'1,234,568'`      | whole number
 *
 * Samples when `rta.defaultLocaleName` is `'de-DE'`:
 *
 * | Usage                                    | Result             | Comments
 * | ---------------------------------------- | ------------------ | --------
 * | `rta.numberToLocale(1234567.7654321)`    | `'1.234.567,766'`  | '.' grouping-sep and ',' fractional-sep
 * | `rta.numberToLocale(-1234567.7654321)`   | `'-1.234.567,766'` | negative number uses leading '-'
 * | `rta.numberToLocale(1234567.7654321, 0)` | `'1.234.568'`      | whole number
 *
 * Note: degrades the results if the user agent's `Number.prototype.toLocaleString()` is less than ideal.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} value The numeric value to be converted into a locale-specific string-representation.
 *
 * @param {number} [opt_precision=3] Rounds the result to this many digits in the fractional part. The most
 * common reason to explicitly pass this parameter is to pass 0 to force it to be rounded to a whole number.
 *
 * @param {string} [opt_localeName=rta.defaultLocaleName] The locale name, such as 'en-US'.
 *
 * @return {!string} The stringified number, e.g., '1,234,567.766'.
 */
rta.numberToLocale = function numberToLocale(value, opt_precision, opt_localeName) {
  var precision = typeof opt_precision === 'number' ? opt_precision : 3;
  // TODO: change to Intl.NumberFormat.format()
  return value.toLocaleString(opt_localeName || rta.defaultLocaleName,
                              {
                                maximumFractionDigits: precision,
                                minimumFractionDigits: precision
                              });
};

/**
 * Returns a string representation of the number based on the specified precision, locale and currency, which
 * default, respectively, to rta.defaultCurrencyPrecision, rta.defaultLocaleName, and rta.defaultCurrencyName.
 *
 * Samples when `rta.defaultLocaleName` is `'en-US'` and `rta.defaultCurrencyName` is `'USD'`:
 *
 * | Usage                                      | Result              | Comments
 * | ------------------------------------------ | ------------------- | --------
 * | `rta.numberToCurrency(1234567.7654321)`    | `'$1,234,567.77'`   | ',' grouping-sep and '.' fractional-sep
 * | `rta.numberToCurrency(-1234567.7654321)`   | `'($1,234,567.77)'` | negative number uses parens
 * | `rta.numberToCurrency(1234567.7654321, 0)` | `'$1,234,568'`      | whole number
 *
 * Samples when `rta.defaultLocaleName` is `'de-DE'` and `rta.defaultCurrencyName` is `'EUR'`:
 *
 * | Usage                                      | Result                    | Comments
 * | ------------------------------------------ | ------------------------- | --------
 * | `rta.numberToCurrency(1234567.7654321)`    | `'1.234.567,77 \u20AC'`   | '.' grouping-sep and ',' fractional-sep
 * | `rta.numberToCurrency(-1234567.7654321)`   | `'(1.234.567,77 \u20AC)'` | negative number uses parens
 * | `rta.numberToCurrency(1234567.7654321, 0)` | `'1.234.568 \u20AC'`      | whole number
 *
 * Note: degrades the results if the user agent's Number.prototype.toLocaleString() is less than ideal.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} value The numeric value to be converted into a currency-string.
 *
 * @param {number} [opt_precision] If explicitly provided, rounds the result to this many digits in the
 * fractional part; otherwise uses the currency's 'natural' number of fractional digits, e.g., 2 with 'USD'.
 * The most common reason to explicitly pass this parameter is to pass 0 to force it to be rounded to a whole
 * number.
 *
 * @param {string} [opt_localeName=rta.defaultLocaleName] The locale name, such as 'en-US'.
 *
 * @param {string} [opt_currencyName=rta.defaultCurrencyName] The currency name, such as 'USD'.
 *
 * @return {string} The stringified number, e.g., '$1,234,567.77'.
 */
rta.numberToCurrency = function numberToCurrency(value, opt_precision, opt_localeName, opt_currencyName) {
  // TODO: change to Intl.NumberFormat.format()
  return typeof opt_precision !== 'number' ?
    value.toLocaleString(opt_localeName || rta.defaultLocaleName,
                         {
                           style: 'currency',
                           currency: opt_currencyName || rta.defaultCurrencyName,
                           minimumFractionDigits: opt_precision,
                           maximumFractionDigits: opt_precision
                         }) :
    value.toLocaleString(opt_localeName || rta.defaultLocaleName,
                         {
                           style: 'currency',
                           currency: opt_currencyName || rta.defaultCurrencyName
                         });
};

// Replace 'rta.numberToLocale()' if the browser's toLocaleString() is broken.
try {
  if (rta.numberToLocale(12345678.2345678, void 0, 'en-US') !== '12,345,678.235' ||
      rta.numberToLocale(-12345678.2345678, 5, 'en-US') !== '-12,345,678.23457') {
    throw new Error('Number.toLocaleString() gave wrong results');
  }
} catch (e) {
  rta.warningNoInterpolate('Rolling our own rta.numberToLocale(): ' + e.message);
  rta.numberToLocale = function numberToLocale(value, opt_precision /*, opt_localeName is ignored*/) {
    var precision = typeof opt_precision === 'number' ? opt_precision : 3;
    return (value < 0 ? '-' : '') +
      Math.abs(value).toFixed(precision).replace(/^\d+/, function replacement(digits) {
        // Optimize for very short strings and almost always <= 2 iterations, usually no iterations:
        var tail = '';
        while (digits.length > 3) {
          tail = ',' + digits.slice(-3) + tail;  // hard-code ',' as the thousands-separator
          digits = digits.slice(0, -3);
        }
        return digits + tail;
      });
  };
}

// Replace 'rta.numberToCurrency()' if the browser's toLocaleString() is broken.
try {
  if (rta.numberToCurrency(12345678.5678, void 0, 'en-US', 'USD') !== '$12,345,678.57' ||
      rta.numberToCurrency(-12345678.5678, 5, 'en-US', 'USD') !== '($12,345,678.56780)') {
    throw new Error('Number.toLocaleString() gave wrong results');
  }
} catch (e) {
  rta.warningNoInterpolate('Rolling our own rta.numberToCurrency(): ' + e.message);
  rta.numberToCurrency = function numberToCurrency(value, opt_precision, opt_localeName, opt_currencyName) {
    // This is a degraded output format; it's not perfect, but it should be mostly okay.
    // Use '(...)' for negative; use leading '$' for USD and trailing for everything else.
    opt_currencyName = opt_currencyName || rta.defaultCurrencyName;
    return (value < 0 ? '(' : '') +
      (opt_currencyName === 'USD' ? '$' : '') +
      rta.numberToLocale(Math.abs(value), typeof opt_precision === 'number' ? opt_precision : 2, opt_localeName) +
      (opt_currencyName === 'USD' ? '' : ' ' + opt_currencyName) +
      (value < 0 ? ')' : '');
  };
}

/**
 * Like the built-in `parseFloat(input)` and `parseInt(input)`, but without those
 * functions sloppiness and ambiguity, and dynamically choosing between the two.
 *
 * Succeeds if/only if `input` is...
 *
 *  - a valid number with no leading/trailing whitespace or other junk char; a fractional part and/or
 *    exponent are allowed if/only if `opt_allowFloat` is provided and truthy; or
 *  - `"Infinity"` (optionally preceded by '+' or '-') and `opt_allowInfinity` is
 *    provided and truthy; or
 *  - `"NaN"` and `opt_allowNaN` is truthy and `opt_allowInfinity` is
 *    provided and truthy.
 *
 * Sample usage:
 *
 *  - `var foo = rta.parseNumberStrict(expr);  // undefined if bad`
 *  - `var foo = rta.parseNumberStrict(expr, -1);  // -1 if bad OR if -1`
 *  - `var foo = rta.parseNumberStrict(expr, NaN);  // NaN if bad`
 *  - `var foo = rta.parseNumberStrict(expr, 'xyzzy');  // 'xyzzy' if bad`
 *  - `var foo = rta.parseNumberStrict(expr, function(x) { throw new Error('Bad foo: ' + x); });`
 *
 * Why this function is important: the built-in `parseFloat(input)` and
 * `parseInt(input)` functions are sloppy, succeeding even if there are trailing 'junk' characters
 * after the number, e.g., `42xxx`. (They also succeed if there is leading/trailing whitespace,
 * which is forgiveable.) The built-in `Number(input)` function is strict about trailing
 * non-whitespace 'junk' chars, but it is worse when it comes to empty strings: it succeeds if the string is
 * empty, has nothing but whitespace, is an empty array, is an array containing a number, is an array of an
 * array of an array of a string with arbitrary whitespace, etc., etc. Plus both
 * `parseFloat(input)` and `Number(input)` functions have an ambiguous failure
 * condition: a return of `Number.NaN` means both failure and validly parsing the string
 * `"NaN"`.
 *
 * This routine solves all these problems by, in every case, giving you the caller control:
 *
 *  - It disallows leading/trailing whitespace (so you, the caller, can decide whether to allow those by
 *    pre-trimming the input string, e.g., `rta.parseNumber(input.trim())`),
 *  - It disallows leading/trailing junk-chars (so you, the caller, can decide whether to allow those by
 *    pre-stripping them from the `input` parameter),
 *  - It gives you control over the return code so `Number.NaN` can indicate success (if you also
 *    pass `opt_allowNaN`),
 *  - It lets you pass an error-back function so you can use exceptions rather than return codes,
 *  - It gives you fine grained control over whether the Infinity values should be considered legal.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string|number} input The input string or number (or any object which can be stringified as if
 * via the `String(input)` function). If `input` is of type number, this function
 * succeeds (returning `input` itself)...
 *
 *  - if `input` is `Number.NaN` and `opt_allowNaN`, or
 *  - if `input` is +/- Infinity and `opt_allowInfinity`, or
 *  - if `input` is finite with a non-zero fractional part and `opt_allowFloat`, or
 *  - if `input` is finite with a zero fractional part,
 *
 * where the fractional part is determined as if via `Math.floor(input) - input`.
 * If `input` is not of type number, it treated as a string (stringifying, if necessary, as if via
 * the `String()` function), and this function succeeds (returning the approriate number)...
 *
 *  - if `input` is `"NaN"` and `opt_allowNaN`, or
 *  - if `input` is "Infinity" (case sensitive, optionally preceded by "+" or "-") and
 *    `opt_allowInfinity`, or
 *  - if `input` can be parsed as an optionally signed, base-10 integer (no "." or exponent part,
 *    no leading/trailing whitespace or other chars) (irrespective of `opt_allowFloat`), or
 *  - if `input` can be parsed as an optionally signed, base-16 integer (leading "0x" or "0X", no
 *    "." or exponent part, no leading/trailing whitespace or other chars) (irrespective of
 *    `opt_allowFloat`), or
 *  - if `input` can be parsed as an optionally signed, base-10 floating point number if
 *    `opt_allowFloat`.
 *
 * @param {*} otherwise If `input` is not successful (see above for what that means), returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 *
 * @param {boolean} [opt_allowFloat=false] If truthy, succeeds when `input` has a fractional part
 * and/or an exponent. If it is not provided or is falsy, fails if `input` has a fractional part
 * and/or an exponent.
 *
 * @param {boolean} [opt_allowNaN=false] If truthy, succeeds when `input` is
 * `Infinity` (positive or negative) or `"Infinity"` (case-sensitive, optionally
 * preceded by "+" or "-"). If falsy, fails in those cases.
 *
 * @param {boolean} [opt_allowNaN=false] If truthy, succeeds when `input` is
 * `Number.NaN` or `"NaN"` (case-sensitive). If falsy, fails in those cases.
 *
 * @return {*} On success (see above for what that means) returns the numeric value; on failure returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 */
rta.parseNumberStrict = function parseNumberStrict(input, otherwise, opt_allowFloat, opt_allowInfinity, opt_allowNaN) {
  var ans;

  if (typeof input === 'number') {
    ans = input;
    if (ans !== ans ? opt_allowNaN :          // if it's NaN, okay iff opt_allowNaN
        !isFinite(ans) ? opt_allowInfinity :  // if it's infinite, okay iff opt_allowInfinity
        opt_allowFloat ? true :               // if it's opt_allowFloat, okay irrespective of fractional part
        ans === Math.floor(ans)) {            // it's !opt_allowFloat; okay iff fractional part is zero
      return ans;
    } // else fail - processed below
  } else {
    // Treat 'input' AS IF it is a string, stringifying it as needed, e.g., in string comparisons.
    // No need to stringify calls to parseFloat(), parseInt(), or RegExp.test() - those auto-stringify.
    if ((/^[-+]?\d+$/i).test(input)) {      // optionally signed base-10 integer
      ans = parseInt(input, 10);            // use parseInt() since it *looks* integral
      if (ans === ans && (isFinite(ans) || opt_allowInfinity)) {
        return ans;                         // okay: parsed and either finite or opt_allowInfinity
      } // else fail - processed below
    } else if ((/^[-+]?0x[0-9A-F]+$/i).test(input)) {  // optionally signed base-16 integer
      ans = parseInt(input, 16);            // use parseInt() since it *looks* integral
      if (ans === ans && (isFinite(ans) || opt_allowInfinity)) {
        return ans;                         // okay: parsed and either finite or opt_allowInfinity
      } // else fail - processed below
    } else if (opt_allowFloat && (/^[-+]?(?:\d+\.?\d*|\.\d+)(?:[Ee][-+]?\d+)?$/).test(input)) {
      ans = parseFloat(input);              // use parseInt() since it *looks* floating-point
      if (ans === ans && (isFinite(ans) || opt_allowInfinity)) {
        return ans;                         // okay: parsed and either finite or opt_allowInfinity
      } // else fail - processed below
    } else if (opt_allowNaN && String(input) === 'NaN') {
      return NaN;                           // okay: "NaN" and opt_allowNaN
    } else if (opt_allowInfinity && (/^[-+]?Infinity$/).test(input)) {
      return String(input)[0] === '-' ?     // okay: +/- "Infinity" and opt_allowInfinity
        Number.NEGATIVE_INFINITY :
        Number.POSITIVE_INFINITY;
    } // else fail - processed below
  }

  // Fail
  return typeof otherwise === 'function' ?
    otherwise(input) :  // reminder that 'input' might not be a string
    otherwise;
};


/**
 * Like the built-in `parseFloat(input)`, but without that function's sloppiness or ambiguity.
 *
 * Succeeds if/only if `input` is...
 *
 *  - a valid number with no leading/trailing whitespace or other junk chars; or
 *  - `"Infinity"` (optionally preceded by '+' or '-') and `opt_allowInfinity` is
 *    truthy; or
 *  - `"NaN"` and `opt_allowNaN` is truthy.
 *
 * Sample usage:
 *
 *  - `var foo = rta.parseFloatStrict(expr);  // undefined if bad`
 *  - `var foo = rta.parseFloatStrict(expr, -1);  // -1 if bad OR if -1`
 *  - `var foo = rta.parseFloatStrict(expr, NaN);  // NaN if bad`
 *  - `var foo = rta.parseFloatStrict(expr, 'xyzzy');  // 'xyzzy' if bad`
 *  - `var foo = rta.parseFloatStrict(expr, function(x) { throw new Error('Bad foo: ' + x); });`
 *
 * Why this function is important: the built-in `parseFloat(input)` function is sloppy, succeeding even if
 * there is trailing garbage characters after the number, e.g., `42xxx`, and/or leading/trailing
 * whitespace. The built-in `Number(input)` function disallows trailing junk chars, but it succeeds if the
 * string has nothing but whitespace or is empty, or if it is an empty array, or an array containing a number,
 * or an array containing an array containing an array containing a string containing arbitrary whitespace,
 * etc., etc. Plus both `parseFloat(input)` and `Number(input)` functions have an ambiguous failure condition:
 * `Number.NaN` indicates both failure and validly parsing the string `"NaN"`. This routine solves both these
 * problems: it disallows leading/trailing whitespace or other junk-chars, it gives you control over the
 * return code so `Number.NaN` can indicate success (if you also pass `opt_allowNaN`), it lets you pass an
 * error-back function so you can use exceptions rather than return codes, and it gives you fine grained
 * control over whether the Infinity values should be considered legal.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string|number} input The input string or number. If a string, it is parsed as a base-10 floating
 * point number. If a number, it is checked to see if it is `Number.POSITIVE_INFINITY`,
 * `Number.NEGATIVE_INFINITY` or `Number.NaN`. Technically it can also be any other
 * type, so long as it can be converted to a string *as if* via the `String` function.
 *
 * @param {*} otherwise If `input` is not successful (see above for what that means), returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 *
 * @param {boolean} [opt_allowNaN=false] If truthy, succeeds when `input` is
 * `Infinity` (positive or negative) or `"Infinity"` (case-sensitive, optionally
 * preceded by "+" or "-"). If falsy, fails in those cases.
 *
 * @param {boolean} [opt_allowNaN=false] If truthy, succeeds when `input` is
 * `Number.NaN` or `"NaN"` (case-sensitive). If falsy, fails in those cases.
 *
 * @return {*} On success (see above for what that means) returns the numeric value; on failure returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 */
rta.parseFloatStrict = function parseFloatStrict(input, otherwise, opt_allowInfinity, opt_allowNaN) {
  return rta.parseNumberStrict(input, otherwise, true, opt_allowInfinity, opt_allowNaN);
};

/**
 * Like the built-in `parseInt(input)`, but without that function's sloppiness.
 *
 * Succeeds if/only if `input` is a valid number without a '.', exponent, leading/trailing
 * whitespace, or other "junk chars," and in range of an integer: -MAX_INTEGER .. MAX_INTEGER. Always parses
 * in base 10 unless `input` starts with `"0x"` or `"0X"`, in which case it
 * parses in hexadecimal.
 *
 * Sample usage:
 *
 *  - `var foo = rta.parseIntStrict(expr);  // undefined if bad`
 *  - `var foo = rta.parseIntStrict(expr, -1);  // -1 if bad OR if -1`
 *  - `var foo = rta.parseIntStrict(expr, NaN);  // NaN if bad`
 *  - `var foo = rta.parseIntStrict(expr, 'xyzzy');  // 'xyzzy' if bad`
 *  - `var foo = rta.parseIntStrict(expr, function(x) { throw new Error('Bad foo: ' + x); });`
 *
 * Why this function is important: the built-in `parseInt(input)` function is sloppy, succeeding even if there
 * is trailing garbage characters after the number, e.g., `42xxx`, and/or leading/trailing whitespace. The
 * built-in `Number(input)` function disallows trailing junk chars, but it succeeds if the string has nothing
 * but whitespace or is empty, or if it is an empty array, or an array containing a number, or an array
 * containing an array containing an array containing a string containing arbitrary whitespace, etc.,
 * etc. This routine solves that problem: it disallows leading/trailing whitespace or other junk-chars, it
 * gives you control over the return code, and it lets you pass an error-back function so you can use
 * exceptions rather than return codes. Note however that this routine does not allow a radix parameter - it
 * always forces the radix to be 10 (though it still parses the input in hexadecimal if the input starts with
 * '0x' or '0X').
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string|number} input The input string or number. If a string, it is parsed using base 10 or, if
 * it starts with '0x' or '0X', base 16. If a number, it is successful if it is an integer, as if via
 * `rta.isInteger()`. Technically it can also be any other type, so long as it can be converted to
 * a string *as if* via the `String` function.
 *
 * @param {*} otherwise If `input` is not successful (see above for what that means), returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 *
 * @return {*} On success (see above for what that means) returns the numeric value; on failure returns
 * `otherwise` or, if `otherwise` is a function, `otherwise(input)`.
 */
rta.parseIntStrict = function parseIntStrict(input, otherwise, opt_allowInfinity, opt_allowNaN) {
  return rta.parseNumberStrict(input, otherwise, false, opt_allowInfinity, opt_allowNaN);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Log utilities (part #2 of 2) //////////////////////////////////////////////////////////////////////////////

// These log-utilities require rta.interpolate(); unlike those defined in log-utilities-part-#1, these must
// not be called while rta is definining its functions, though they may be validly called from inside those
// rta functions.

/**
 * Logs an INTERNAL-ERROR message followed by the call-stack.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.internalError = function internalError() {  // args: (template, arg0...)
  rta.internalErrorNoInterpolate(rta.interpolateNoThrow.apply(void 0, arguments));
};

/**
 * Logs an ERROR-level message, or does nothing if rta.logLevel < rta.LOG_ERRORS.
 *
 * Idiom to include the call-stack: `rta.error('Blah {0} blah\nStack: {1.stack}', blah, new
 * Error(''));` Or explicitly call `rta.writeLogMessage()` with the formatted message and a
 * truthy second parameter.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.error = function error() {  // args: (template, arg0...)
  if (rta.logLevel >= rta.LOG_ERRORS) {
    rta.errorNoInterpolate(rta.interpolateNoThrow.apply(void 0, arguments));
  }
};

/**
 * Logs an WARNING-level message, or does nothing if rta.logLevel < rta.LOG_WARNINGS.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.warning = function warning() {  // args: (template, arg0...)
  if (rta.logLevel >= rta.LOG_WARNINGS) {
    rta.warningNoInterpolate(rta.interpolateNoThrow.apply(void 0, arguments));
  }
};

/**
 * Logs a INFO-level message, or does nothing if rta.logLevel < rta.LOG_INFO.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.info = function info() {  // args: (template, arg0...)
  if (rta.logLevel >= rta.LOG_INFO) {
    rta.infoNoInterpolate(rta.interpolateNoThrow.apply(void 0, arguments));
  }
};

/**
 * Logs a DEBUG-level message, or does nothing if rta.logLevel < rta.LOG_DEBUG.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} template A template-string optionally containing positional-args ({0}, {1}, etc.) that
 * must be in the same format required by `rta.interpolate()`.
 *
 * @param {*} arg0 The first positional-param, which is used for any occurrences of `{0}` in
 * `template`.
 */
rta.debug = function debug() {  // args: (template, arg0...)
  if (rta.logLevel >= rta.LOG_DEBUG) {
    rta.debugNoInterpolate(rta.interpolateNoThrow.apply(void 0, arguments));
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Array utilities ///////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an array containing the integers in [a, b) or, if end is missing, [0, a).
 *
 * FUTURE: if needed, generalize to allow an optional `step` param.<br>
 * FUTURE: if needed, generalize so `a` and `b` can optionally be strings.
 *
 * | Sample Usage                             | Result
 * | ---------------------------------------- | ------
 * | `rta.range(0)` *or*<br>`rta.range(0, 0)` | `[]`
 * | `rta.range(1)` *or*<br>`rta.range(0, 1)` | `[0]`
 * | `rta.range(2)` *or*<br>`rta.range(0, 2)` | `[0, 1]`
 * | `rta.range(3)` *or*<br>`rta.range(0, 3)` | `[0, 1, 2]`
 * | `rta.range(10, 10)`                      | `[]`
 * | `rta.range(10, 11)`                      | `[10]`
 * | `rta.range(10, 12)`                      | `[10, 11]`
 * | `rta.range(10, 13)`                      | `[10, 11, 12]`
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!number} a The minimim (first result) in the range if `b` is a number; otherwise one
 * greater than the last in the returned range.
 *
 * @param {number} [b] If provided, one greater than the last in the returned range.
 */
rta.range = function range(a, b) {
  if (typeof b !== 'number') {
    // rta.range(5) is the same as rta.range(0,5)
    b = a;
    a = 0;
  }
  var ans = [];
  while (a < b) {
    ans.push(a++);
  }
  return ans;
};

/**
 * Utility function to return a filtered copy of the array containing the array's distinct elements. When the
 * array contains two or more indistinct elements (elements in the same equivalence class), always includes
 * the first of them in the result.
 *
 * Sample usage: pretend `x.myProperty` is well defined for objects `a`, `b`, `c`, `d`. Then `rta.distinct([a,
 * b, c, d], function(x){return x.myProperty})` returns a subset of `[a, b, c, d]` for each distinct value of
 * `x.myProperty`. Note: returns (a subset of) the original elements, not of the preprocessed elements:
 * preprocessing is done only to check for distinctiveness, and once distinctivness is established, it returns
 * the original un-preprocessed element.
 *
 * Sample usage: `rta.distinct([3, '5', 5, 5.0, 7])` returns `[3, '5', 7]`. Keeps `'5'` (the string) since no
 * previous value stringified to `'5'`. Drops `5` and `5.0` (the numbers) since those do not stringify to
 * distinct values - values are distinct if/only if their stringified to distinct strings.
 *
 * Sample usage: `rta.distinct(['FOO', 'BAR', 'FoO', 'BAZ'], function(x){return x.toString().toLowerCase()})`
 * returns `['FOO', 'BAR', 'BAZ']` because it performs case-insensitive matching. Keeps `'FOO'` not `'foo'`
 * since the `preprocessElement` function is used only to check for distinctiveness, not to preprocess the
 * elements in the returned list. Once distinctivness is established, `rta.distinct()` returns the original,
 * non-preprocessed elements. If you want to apply a manipulation function on the result, use `.map()` on
 * either the returned result-array or on the input array.
 *
 * Sample usage: `rta.distinct([10, 3, 27, 8, 20, 23, 13, 7], function(x){return x % 10})` returns `[10, 3,
 * 27, 8]`. Note: `20` is not included in the result because `20 % 10` is the same as `10 % 10`. For an
 * analogous reason, `23` is not included.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Array} array The universe of elements to scan for distinct elements.
 *
 * @param {Function(string elem, number index, Array arr)} [opt_preprocessElement] If provided, must be
 * callable as 'preprocessElem(x,index,arr)' where 'x' is an element, 'index' is its zero-based index, and
 * 'arr' is a reference to 'array'. Preprocessing is used strictly to determine whether the element is
 * distinct; it does not modify the elements that are returned - use '.map()' for that.
 *
 * @return {Array} A new Array containing, for each equivalence class in 'array', the first element in that
 * equivalence class.
 */
rta.distinct = function distinct(array, opt_preprocessElement) {
  var seen = {};
  return array.filter(function checkElem(elem, index) {
    var key = opt_preprocessElement ? opt_preprocessElement(elem, index) : elem;
    return (seen[key] = 1 + (seen[key] || 0)) === 1;
  });
};

/**
 * Returns a copy of array, with any sub-arrays flattened into the result (one level of flattening only).
 *
 * Sub-arrays directly contained in `array` are flattened into the result, thus
 * `rta.flattenArrayOnce([1, [3, 5], 7])` returns `[1, 3, 5, 7]`.
 *
 * Sub-arrays nested within sub-arrays are *not* flattened into the result, thus
 * `rta.flattenArrayOnce([1, [3, [5]], 7])` returns `[1, 3, [5], 7]`.
 *
 * Sub-arrays nested within objects are *not* flattened into the result, thus
 * `rta.flattenArrayOnce([1, {a: [3, 5]}, 7])` returns `[1, {a: [3, 5]}, 7]`.
 *
 * Note: this can safely be called even if the array contains a reference to itself.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Array} array The array to be flattened.
 *
 * @return {Array} A shallow-copy of array, except any arrays directly and immediately contained in
 * `array` will be flattened into the result.
 */
rta.flattenArrayOnce = function flattenArrayOnce(array) {
  return Array.prototype.concat.apply([], array);
};

/**
 * Returns a copy of the array, flattening into the result any sub-arrays, or sub-arrays of sub-arrays,
 * recursively.
 *
 * Precondition: `array` must not contain a reference to itself, either directly or via a sub-array, sub-array
 * of a sub-array, etc., recursively. However it is safe if an element is an *object* which contains a
 * reference to `array`. This precondition is not checked; you have been warned.
 *
 * Sub-arrays directly contained in `array` are flattened into the result, thus `rta.flattenArrayAll([1, [3,
 * 5], 7])` returns `[1, 3, 5, 7]`.
 *
 * Sub-arrays nested within sub-arrays are also flattened into the result, thus `rta.flattenArrayAll([1, [3,
 * [5]], 7])` returns `[1, 3, 5, 7]`.
 *
 * Sub-arrays nested within objects are *not* flattened into the result, thus `rta.flattenArrayAll([1, {a: [3,
 * 5]}, 7])` returns `[1, {a: [3, 5]}, 7]`.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Array} array The array to be flattened.
 *
 * @return {Array} A shallow-copy of array, except any arrays (or arrays of arrays, etc., recursively)
 * contained in `array` will be flattened into the result.
 */
rta.flattenArrayAll = function flattenArrayAll(array) {
  // FUTURE: protect against infinite recursion if array contains (at any nesting level) a reference to itself.
  return array.reduce(function handleElem(ans, elem) {
    return ans.concat(Array.isArray(elem) ? rta.flattenArrayAll(elem) : [elem]);
  }, []);
};

/**
 * Speeds up sorting when the comparison function is expensive.
 *
 * For example, when sorting parcels by distance, computing that distance requires 6 trigonometric functions
 * plus around ten floating point multiplications. This computation occurs *O(N*logN)* times. However this
 * sort wrapper causes the computation to occur exactly *N* times (that is, once per array element), after
 * which sorting is accomplished by simply subtracting the pre-computed distances.
 *
 * If you can decompose the comparison function `cmp(a, b)` so it is of the form `cmp2(op(a), op(b))` where
 * most of the cost is in the two `op()` calls, then this function will tend to speed things up.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Array} elems The elements to be sorted; can be any type.
 *
 * @param {Function()} elemToKey The function that, when passed an element, will do part of the comparison
 * function (and hopefully the most expensive part of the comparison function). This function must accept any
 * element and must return an arbitrary object/value which will be passed to `compareKeys()`.
 *
 * @param {Function()} compareKeys This function accepts two 'keys' which are returned from `elemToKey()`, and
 * does the final step of the comparison function. The complete comparison function to compare element `a` to
 * `b` is then `compareKeys(elemToKey(a), elemToKey(b))`.
 */
rta.sort = function sort(elems, elemToKey, compareKeys) {
  return elems.
    // Step 1: wrap each element in an object and pre-compute its associated key
    map(function wrap(e) {
      return {elem: e, key: elemToKey(e)};
    }).
    // Step 2: sort the wrapped elements by passing the keys to compareKeys()
    sort(function compare(a, b) {
      return compareKeys(a.key, b.key);
    }).
    // Step 3: unwrap the elements
    map(function unwrap(w) {
      return w.elem;
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object utilities //////////////////////////////////////////////////////////////////////////////////////////

/**
 * Makes a best-effort to return the name of the object's class, where "class" is used in the traditional
 * sense of classical OOP. Also properly handles primitive objects like `null`, `undefined`, `"string
 * literals"`, `42`, `true`, etc.
 *
 * Examples:
 *
 * | Call                                                  | Result                | Comments
 * | ----------------------------------------------------- | --------------------- | --------
 * | `function X() {}`<br>`rta.typeName(new X())`          | `"X"`                 | (fn declaration)
 * | `var X = function Y() {};`<br>`rta.typeName(new X())` | `"Y"` *(sic!)*        | (named fn expr)
 * | `var X = function() {};`<br>`rta.typeName(new X())`   | `"Object"`            | (anonymous fn expr)
 * | `function X() {}`<br>`X.prototype._rtaTypeName = 'Z';`<br>`rta.typeName(new X())` | `"Z"` *(sic!)* | (overridden fn decl)
 * | `var X = function Y() {};`<br>`X.prototype._rtaTypeName = 'Baz';`<br>`rta.typeName(new X())` | `"Baz"` *(sic!)* | (overridden named fn expr)
 * | `var X = function() {};`<br>`X.prototype._rtaTypeName = 'Z';`<br>`rta.typeName(new X())` | `"Z"` *(sic!)* | (overridden anonymous)
 * | `rta.typeName({a:3, b:5})`                            | `"Object"`            | &nbsp;
 * | `rta.typeName([3, 5])`                                | `"Array"`             | &nbsp;
 * | `rta.typeName('xyz')`                                 | `"string"`            | (string value)
 * | `rta.typeName(new String('xyz'))`                     | `"String"`            | (string object)
 * | `rta.typeName(42.3)`                                  | `"number"`            | (number value)
 * | `rta.typeName(Number('42.3'))`                        | `"number"`            | (number value)
 * | `rta.typeName(new Number(42.3))`                      | `"Number"`            | (number object)
 * | `rta.typeName(Infinity)`                              | `"number"`            | (number value)
 * | `rta.typeName(NaN)`                                   | `"number"`            | (number value)
 * | `rta.typeName(true)`                                  | `"boolean"`           | (boolean value)
 * | `rta.typeName(Boolean(3))`                            | `"boolean"`           | (boolean value)
 * | `rta.typeName(new Boolean(true))`                     | `"Boolean"`           | (boolean object)
 * | `rta.typeName(/abc.*def/i)`                           | `"RegExp"`            | &nbsp;
 * | `rta.typeName(new RegExp('abc.*def', 'i'))`           | `"RegExp"`            | (essentially the same)
 * | `rta.typeName(function () {})`                        | `"function"`          | (anonymous fn)
 * | `rta.typeName(function foo() {})`                     | `"function"`          | (named fn expr)
 * | `function foo() {}`<br>`rta.typeName(foo)`            | `"function"`          | (fn declaration)
 * | `var x = {a:3};`<br>`rta.typeName(x.toString)`        | `"function"`          | (method)
 *
 * Never throws an exception.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {*} x Object to be examined.
 *
 * @return {!string} Best-effort class or type of the object.
 */
rta.typeName = function typeName(x) {
  if (typeof x !== 'object') {
    return typeof x;  // e.g., 'string', 'number', 'boolean', 'undefined'
  }

  if (x === null) {
    return 'null';
  }

  try {
    if (x._rtaTypeName) {
      return x._rtaTypeName;  // e.g., 'GeoPos', 'GeoBox', etc.
    }
  } catch (e) { }

  try {
    if (x.constructor && x.constructor.name) {
      return x.constructor.name;  // e.g., 'RegExp', 'Parser', etc.
    }
  } catch (e) { }

  try {
    return Object.prototype.toString.call(x).replace(/^\[object |\]$/gi, '');
  } catch (e) { }

  return typeof x;
};

/**
 * In-place modifies object `target` by inserting key/value pairs from `src1`, `opt_src2`, `opt_src3`, etc.
 * into `target`. Parameter `target` is allowed to start out empty. Returns the modified/populated `target`
 * object.
 *
 * FUTURE: Change callers so they use Object.assign(target, src) if we adopt es6, such as via es6-shim.js at
 * http://github.com/paulmillr/es6-shim. Callers can use reduce() for multiple src objects, and they can
 * decide whether their reduce() function needs to check if any given src is null/undefined.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!Object} target The target object to be modified by copying key/value pairs from src1, etc.
 *
 * @param {Object} src1 The first source Object for key/value pairs to be shallow-copied into target. Ignored
 * if null or undefined.
 *
 * @param {Object} [opt_src2] The second (optional) source Object. Ignored if null or undefined.
 *
 * @param {Object} [opt_src2] The third (optional) source Object. Ignored if null or undefined.
 *
 * @return {!Object} Returns a reference to 'target', which will have been modified in-place.
 */
rta.inPlaceExtendObject = function inPlaceExtendObject(target /*, any number of src objects*/) {
  Array.prototype.slice.call(arguments, 1).forEach(function handleSrc(src) {
    var key;
    if (src) {
      for (key in src) {
        if (src.hasOwnProperty(key)) {
          target[key] = src[key];
        }
      }
    }
  });
  return target;
};

/**
 * Non-destructively creates and returns a new Object which will contain the key/values of src1, src2, etc. If
 * the same key appears in any two of those src objects, the latter wins, for example, rta.objectUnion({x:3},
 * {x:5}, {x:7}) will return {x:7}.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Object} src1 The first source Object for key/value pairs to be shallow-copied into the result.
 * Ignored if null or undefined.
 *
 * @param {Object} src2 The second source Object for key/value pairs to be shallow-copied into the result.
 * Ignored if null or undefined.
 *
 * @param {Object} [opt_src3] The third (optional) source Object. Ignored if null or undefined.
 *
 * @return {!Object} Returns a new Object, which will contain the union of the various keys/values.
 */
rta.objectUnion = function objectUnion() {  // args: (src1, src2, ...)
  // TODO: Learn about ES6's Object.assign() to see if this can be replaced by Object.extend() or .assign().
  var target = {};
  Array.prototype.forEach.call(arguments, function handleSrc(src) {
    var key;
    if (src) {
      for (key in src) {
        if (src.hasOwnProperty(key)) {
          target[key] = src[key];
        }
      }
    }
  });
  return target;
};

/**
 * Non-destructively creates and returns a new bundle of args by applying defaults to a set of actual args.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Object|null|undefined} actuals An Object containing key/value pairs for each actual arg, e.g., `{x:
 * 3, y: 5}`. If null or undefined, acts as though `{}` was passed instead, i.e., as if there are no actual
 * args so the result will contain the set of all default args.
 *
 * @param {Object|Array<{Object|null|undefined}>|null|undefined} [default0] Optional key/value pairs
 * representing default values as an object, an Array of such objects, null, or undefined. If it is an array,
 * that array is flattened into the arg-list, so the array can contain defaults packaged in an Object, or null
 * or undefined, but it cannot contain an array.
 *
 * @param {Object|Array<{Object|null|undefined}>|null|undefined} [default1] see description of `default0`.
 *
 * @param {Object|Array<{Object|null|undefined}>|null|undefined} [default2] see description of `default0`.
 *
 * @return {Object} The result Object, containing keys and non-undefined values. Contains the rightmost
 * non-undefined value from `actuals` and all the default objects, where 'rightmost' is determined by
 * following, in depth-first order, all the parameters passed to this function.
 */
rta.applyDefaults = function applyDefaults(actuals/*, default0... */) {
  // DEFAULT_LIST := Array.prototype.slice.call(arguments, 1) = list of {Object|null|undefined|Array<{Object|null|undefined}>}.
  // DEFAULT_LIST.concat(actuals) puts 'actuals' last (rightmost default beats other defaults, but actuals beat ALL defaults).
  return Array.prototype.slice.call(arguments, 1).concat(actuals).reduce(function handleSrc(combo, obj) {
    var key;
    if (obj) {
      for (key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== void 0) {  // do not apply undefined values
          combo[key] = obj[key];
        }
      }
    }
    return combo;
  }, {});
};

/**
 * rta.shallowCopy(src) returns a shallow-copy of Object src. This means it returns a distinct object that has
 * the same key/value pairs as src.
 *
 * The result is a copy: `RESULT !== src`, so `RESULT.a = 7` will not result in any changes to src.
 *
 * The result is a *shallow* copy: `RESULT.b === src.b`, and if `src.b` was `{}` ahead of time, then
 * `RESULT.b.c = 7` will also cause `src.b.c` to be 7.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!Object} src The Object to be shallow-copied.
 *
 * @return {Object} A newly created Object that has the same keys and identical values as src.
 *
 * @see rta.pseudoShallowCopy()
 */
rta.shallowCopy = function shallowCopy(src) {
  var target = {};
  for (var key in src) {  // FUTURE: change to 'let'
    if (src.hasOwnProperty(key)) {
      target[key] = src[key];
    }
  }
  return target;
};

/**
 * `rta.pseudoShallowCopy(src)` returns an object which has `src` as its prototype. This acts like a shallow
 * copy in many ways, though not in every way. It is extremely efficient - it is constant time irrespective of
 * the number of properties in `src`.
 *
 * Ways `dest = rta.pseudoShallowCopy(src)` *is* like a shallow copy:
 *
 *  - `dest !== src`: `dest` is a distinct object.
 *  - `for (var key in dest) {...}` will iterate over exactly the same keys as `for (var key in src) {...}`.
 *  - `dest.a === src.a` for all property names `a` (including when `src.a` is undefined). Corollary: modifying
 *    `dest.a.b` also modifies `obj.a.b`, and vice versa (shallow, not deep).
 *  - `dest[e] === src[e]` for all expressions `e` (including when `src[e]` is undefined). Corollary: modifying
 *    `dest.a[e]` also modifies `obj.a[e]`, and vice versa (shallow, not deep).
 *  - `dest.a = value` will modify `dest.a` and will *not* modify `src.a` (including both the case where
 *    `src.a` exists or does not exist).
 *  - `dest.a++` will 'do the right thing' (it returns the old value of `dest.a`, and it increments `dest.a`),
 *    plus it will not affect `src.a`. Ditto for `dest.a--` and other *op=* operators.
 *
 * Ways `dest = rta.pseudoShallowCopy(src)` is *not* like a shallow copy:
 *
 *  - `Object.keys(dest)` will (initially) be `[]`, even if `Object.keys(src)` is not `[]`.
 *  - `dest.hasOwnProperty('a')` will always be false, even if `src.hasOwnProperty('a')` is true.
 *  - Changes to `src` are mirrored in `dest`, e.g., `src.a = value` will modify `dest.a`.
 *  - `JSON.stringify(dest)` will be `"{}"` even if `JSON.stringify(src)` is not `"{}"`.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Object} src The source of key/value pairs to be pseudo-shallow-copied into the result.
 *
 * @return {Object} A newly created object that is initially empty, and that has src as its prototype.
 *
 * @see rta.shallowCopy()
 */
rta.pseudoShallowCopy = function pseudoShallowCopy(src) {
  var PseudoClass = function() {};
  PseudoClass.prototype = src;
  return new PseudoClass();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSV utilities /////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Parses an entire CSV file, using a callback to pass back each row individually as an array of strings.
 * Throws an Error if the CSV cannot be parsed.
 *
 * | CSV Input | Resulting Arrays | Commentary |
 * | --------- | ---------------- | ---------- |
 * | `'a,b,c'` | `['a', 'b', 'c']` | Fields are separated by commas |
 * | `'a,b,'` | `['a', 'b', '']` | Commas are field *separators*, not field *terminators* |
 * | `',b,'` | `['', 'b', '']` | (Ditto) |
 * | `'a,b\nd,e'` | `['a', 'b']` then `['d', 'e']` | Each row is individually passed to `rowHandler()` |
 * | `'a,"b,c"'` | `['a', 'b,c']` | Use double-quotes to escape a field-separator (comma) |
 * | `'a,"b\nd,e"'` | `['a', 'b\nd,e']` | Use double-quotes to escape a row-separator (newline) |
 * | `'a,"b""c",d'` | `['a', 'b"c', 'd']` | Use an adjacent pair of double-quotes to escape a double-quote |
 * | `a"b"c,"d"e"f"` | `['abc', 'def']` | Allows any arbitrary combination of quoted and/or unquoted sections within the same field |
 * | `' a , b , "c" '` | `['a', 'b', 'c']` | Per the spec, unquoted horizontal whitespace (spaces or tabs)<br>is discarded at the beginning or ending of any field |
 * | `'" a "," "b" "` | `[' a ', ' b ']` | Quotes preserve horizontal whitespace |
 * | `'a,b\n\nc,d'` | `['a', 'b']` then `[]` then `['c', 'd']` | Blank lines become `[]`, not `['']` |
 * | `'a,b\n  \nc,d'` | `['a', 'b']` then `[]` then `['c', 'd']` | Horizontal whitespace is discarded; middle line is still blank |
 * | `'a,b\n "" \nc,d'` | `['a', 'b']` then `[]` then `['c', 'd']` | (Ditto) |
 * | `'a,b\n " " \nc,d'` | `['a', 'b']` then `[' ']` then `['c', 'd']` | Quotes preserve horizontal whitespace; middle line is no longer blank |
 * | `'a \r\n b \r c'` | `['a']` then `['b']` then `['c']` | Row separators are `'\n'`, `'\r'`, or `'\r\n'` |
 * | `'a,b\n\n'` | `['a', 'b']` (if arg2 is falsy) | Trailing whitespace is discarded if `preserveTrailingEmptyRows` is falsy |
 * | `'a,b\n\n'` | `['a', 'b']` then `[]` then `[]` (if arg2 is truthy) | Trailing row-separators are preserved if `preserveTrailingEmptyRows` is truthy |
 *
 * This function has no side-effects.
 *
 * @param {!string} csv The input source to parse using the CSV rules.
 *
 * @param {boolean} preserveTrailingEmptyRows If truthy, trailing newline(s) cause empty row(s) at the end of
 * the result, so `'a,b\n'` results in `['a','b']` then `[]`. If falsy, trailing newlines in `csv` are
 * ignored, so `'a,b\n'` results in `['a','b']` only.
 *
 * @param {Function} rowHandler Function to be called on each row. Two parameters will be passed to this
 * function at each row: a non-null array of zero or more strings representing the fields in the row, and a
 * 0-based index of the row. All these callbacks are called before `rta.parseCsvAsRows()` returns to its caller.
 * `rta.parseCsvAsRows()` halts the parse and immediately returns if `rowHandler()` returns `false` (not just falsy,
 * but the specific falsy value `false`).
 *
 * @throws {Error} if `csv` is an invalid CSV document.
 *
 * @return {number} The number of times `rowHandler()` was called, that is, the number of rows that were
 * produced.
 *
 * @see http://www.creativyst.com/Doc/Articles/CSV/CSV01.htm CSV-format definition used in this algorithm
 */
rta.parseCsvAsRows = function parseCsvAsRows(csv, preserveTrailingEmptyRows, rowHandler) {
  var FIELD_OR_DELIM_RE = /([^\"\,\n\r]+)|\"((?:[^\"]|\"\")*)\"|([,\n]|\r\n?)/g;
  var QUOTE_QUOTE_RE = /\"\"/g;
  var LEADING_WS_RE = /^\s+/;
  var TRAILING_WS_RE = /\s+$/;

  var nrows = 0;
  var row = [''];
  var pos = 0;
  var nempties = 0;  // when !preserveTrailingEmptyRows, empty rows get queued in case they are trailing

  var m;
  while (!!(m = FIELD_OR_DELIM_RE.exec(csv)) && m.index === pos) {
    if (m[1] !== void 0) {
      // Unquoted field
      var field = m[1];  // FUTURE: change to 'let'
      if (pos === 0 || csv[pos - 1] !== '"') {     // IF prev char was BOF or field-sep or record-sep,
        field = field.replace(LEADING_WS_RE, '');  // ...THEN strip leading horizontal whitespace.
      }
      if (csv[FIELD_OR_DELIM_RE.lastIndex] !== '"') {  // IF next char is field-sep or record-sep or EOF,
        field = field.replace(TRAILING_WS_RE, '');     // ...THEN strip trailing horizontal whitespace.
      }
      row[row.length - 1] += field;
    } else if (m[2] !== void 0) {
      // Quoted field
      row[row.length - 1] += m[2].replace(QUOTE_QUOTE_RE, '"');
    } else if (m[3] === ',') {
      // Field-separator
      row.push('');
    } else {
      // Record-separator
      row = row.length === 1 && row[0].length === 0 ? [] : row;
      if (row.length || preserveTrailingEmptyRows) {
        while (nempties) {
          if (rowHandler([], nrows++) === false) {
            return nrows;
          }
          nempties--;
        }
        if (rowHandler(row, nrows++) === false) {
          return nrows;
        }
      } else {
        nempties++;
      }
      row = [''];
    }
    pos += m[0].length;  // equivalent to: pos = FIELD_OR_DELIM_RE.lastIndex;
  }

  if (pos !== csv.length) {
    throw new Error('Malformed CSV at row ' + (nrows + nempties) + ', field ' + (row.length - 1) + ': ' +
                    csv.slice(pos, pos + 10).replace(/\r/g, '<CR>').replace(/\n/g, '<LF>'));
  }

  row = row.length === 1 && row[0].length === 0 ? [] : row;
  if (row.length || preserveTrailingEmptyRows) {
    while (nempties) {
      if (rowHandler([], nrows++) === false) {
        return nrows;
      }
      nempties--;
    }
    if (rowHandler(row, nrows++) === false) {
      return nrows;
    }
  }
  return nrows;
};

// Maintenance note: the following is a functionally-equivalent drop-in replacement for rta.parseCsvAsRows().
// It is implemented using the rta.Parser object, and is ever so slightly simpler than the above non-Parser
// based solution. It is also (very) slightly slower, and it has a dependency on the rta.Parser object, so we
// elected to use the above by default. Nonetheless as a Maintenance note, if a bug is detected in the above,
// or for some other reason, it should be possible to swap this with the above without breaking anything.
//
// rta.parseCsvAsRows = function parseCsvAsRows(csv, preserveTrailingEmptyRows, rowHandler) {
//   var FIELD_OR_DELIM_RE = /([^\"\,\n\r]+)|\"((?:[^\"]|\"\")*)\"|([,\n]|\r\n?)/g;
//   var QUOTE_QUOTE_RE = /\"\"/g;
//   var LEADING_WS_RE = /^\s+/;
//   var TRAILING_WS_RE = /\s+$/;
//
//   var p = new Parser(csv);
//   var nrows = 0;
//   var row = [''];
//   var nempties = 0;  // when !preserveTrailingEmptyRows, empty rows get queued in case they are trailing
//
//   while (p.eat(FIELD_OR_DELIM_RE).result) {
//     if (p.result[1] !== void 0) {
//       // Unquoted field
//       var field = p.result[1];  // FUTURE: change to 'let'
//       if (p.beginMatch === 0 || p.src[p.beginMatch - 1] !== '"') {  // IF prev char was BOF or field-sep or record-sep,
//         field = field.replace(LEADING_WS_RE, '');                   // ...THEN strip leading horizontal whitespace.
//       }
//       if (p.src[p.endMatch] !== '"') {              // IF next char is field-sep or record-sep or EOF,
//         field = field.replace(TRAILING_WS_RE, '');  // ...THEN strip trailing horizontal whitespace.
//       }
//       row[row.length - 1] += field;
//     } else if (p.result[2] !== void 0) {
//       // Quoted field
//       row[row.length - 1] += p.result[2].replace(QUOTE_QUOTE_RE, '"');
//     } else if (p.result[3] === ',') {
//       // Field-separator
//       row.push('');
//     } else {
//       // Record-separator
//       row = row.length === 1 && row[0].length === 0 ? [] : row;
//       if (row.length || preserveTrailingEmptyRows) {
//         while (nempties) {
//           if (rowHandler([], nrows++) === false) {
//             return nrows;
//           }
//           nempties--;
//         }
//         if (rowHandler(row, nrows++) === false) {
//           return nrows;
//         }
//       } else {
//         nempties++;
//       }
//       row = [''];
//     }
//   }
//
//   if (!p.isEof()) {
//     throw new Error('Malformed CSV at row ' + (nrows + nempties) + ', field ' + (row.length - 1) + ': ' +
//                     p.nextSrc(10).replace(/\r/g, '<CR>').replace(/\n/g, '<LF>'));
//   }
//
//   row = row.length === 1 && row[0].length === 0 ? [] : row;
//   if (row.length || preserveTrailingEmptyRows) {
//     while (nempties) {
//       if (rowHandler([], nrows++) === false) {
//         return nrows;
//       }
//       nempties--;
//     }
//     if (rowHandler(row, nrows++) === false) {
//       return nrows;
//     }
//   }
//   return nrows;
// };

/**
 * Parses a CSV file into JavaScript objects, using the column-names in the header-row (first row) for the
 * objects' key-names.
 *
 * | CSV Input | Resulting Objects<br>(assumes header-row is `'X,Y'`) | Commentary |
 * | --------- | ---------------------------------------------------- | ---------- |
 * | `'a,b'` | `{X:'a', Y:'b'}` | Fields are separated by commas |
 * | `'a,'` | `{X:'a', Y:''}` | Commas are field *separators*, not field *terminators* |
 * | `','` | `{X:'', Y:''}` | (Ditto) |
 * | `'a,b\nd,e'` | `{X:'a', Y:'b'}` then `{X:'d', Y:'e'}` | Each row is individually passed to `rowHandler()` |
 * | `'a,"b,c"'` | `{X:'a', Y:'b,c'}` | Use double-quotes to escape a field-separator (comma) |
 * | `'a,"b\nd,e"'` | `{X:'a', Y:'b\nd,e'}` | Use double-quotes to escape a row-separator (newline) |
 * | `'a,"b""c"'` | `{X:'a', Y:'b"c'}` | Use an adjacent pair of double-quotes to escape a double-quote |
 * | `a"b"c,"d"e"f"` | `{X:'abc', Y:'def'}` | Allows any arbitrary combination of quoted and/or unquoted sections within the same field |
 * | `' a , "b" '` | `{X:'a', Y:'b'}` | Per the spec, unquoted horizontal whitespace (spaces or tabs)<br>is discarded at the beginning or ending of any field |
 * | `'" a "," "b" "` | `{X:' a ', Y:' b '}` | Quotes preserve horizontal whitespace |
 * | `'a'` | `{X:'a', Y:''}` | Missing elements become `''` |
 * | `'\n\nc'` | `{X:'', Y:''}` then `{X:'', Y:''}` then `{X:'c', Y:''}` | (Ditto) |
 * | `'a,b \r\n c,d \r e,f'` | `{X:'a', Y:'b'}` then `{X:'c', Y:'d'}` then `{X:'e', Y:'f'}` | Row separators are `'\n'`, `'\r'`, or `'\r\n'` |
 * | `'a,b\n\n'` | `{X:'a', Y:'b'}` | Trailing whitespace is discarded |
 *
 * @param {!string} csv The input source to parse using the CSV rules.
 *
 * @param {Function} rowHandler Function to be called on each row-object *except* the header-row.
 * `rta.parseCsvAsObjects()` halts the parse and immediately returns if `rowHandler()` returns `false` (not just
 * falsy, but the specific falsy value `false`). `rta.parseCsvAsObjects()` passes three parameters to
 * `rowHandler()`: a non-null JavaScript key/value object representing the current row (the keys will be the
 * names from the header row; the values will be strings from the row or the empty-string, `''`, for any
 * fields that are in the header-row but missing from the current row), a 0-based index of the row-object, a
 * non-null array containing the row as an array of string (e.g., can be used to discover if the row has a
 * different length from the header-row or to get any "extra" values if the current row is longer than the
 * header row), and a non-null array containing the header-row. Any changes that `rowHandler()` makes to the
 * header row will be applied on subsequent rows (for example, if `rowHandler()` renames one or more columns or
 * adds/removes column names.
 *
 * @return {number} The number of times `rowHandler()` was called, that is, the number of rows in the `csv` source
 * that are *after* the header row.
 *
 * @throws {Error} if `csv` is an invalid CSV document.
 *
 * @see http://www.creativyst.com/Doc/Articles/CSV/CSV01.htm CSV-format definition
 */
rta.parseCsvAsObjects = function parseCsvAsObjects(csv, rowHandler) {
  var colnames;
  return rta.parseCsvAsRows(csv, false, function(row, rowIndex) {
    var obj, ncols, i;
    if (rowIndex === 0) {
      colnames = row;
    } else {
      obj = {};
      ncols = colnames.length;
      for (i = 0; i < ncols; i++) {
        obj[colnames[i]] = i < row.length ? row[i] : '';
      }
      rowHandler(obj, rowIndex - 1, row, colnames);
    }
  }) - 1;
};

/**
 * Parses the CSV file contents into an in-memory array of rows, each of which is an array of fields
 * (strings).
 *
 * | CSV Input | Resulting array of arrays | Commentary |
 * | --------- | ------------------------- | ---------- |
 * | `'a,b,c'` | `[['a', 'b', 'c']]` | Fields are separated by commas |
 * | `'a,b,'` | `[['a', 'b', '']]` | Commas are field *separators*, not field *terminators* |
 * | `',b,'` | `[['', 'b', '']]` | (Ditto) |
 * | `'a,b\nd,e'` | `[['a', 'b'], ['d', 'e']]` | Each row is individually passed to the callback |
 * | `'a,"b,c"'` | `[['a', 'b,c']]` | Use double-quotes to escape a field-separator (comma) |
 * | `'a,"b\nd,e"'` | `[['a', 'b\nd,e']]` | Use double-quotes to escape a row-separator (newline) |
 * | `'a,"b""c",d'` | `[['a', 'b"c', 'd']]` | Use an adjacent pair of double-quotes to escape a double-quote |
 * | `a"b"c,"d"e"f"` | `[['abc', 'def']]` | Allows any arbitrary combination of quoted and/or unquoted sections within the same field |
 * | `' a , b , "c" '` | `[['a', 'b', 'c']]` | Per the spec, unquoted horizontal whitespace (spaces or tabs)<br>is discarded at the beginning or ending of any field |
 * | `'" a "," "b" "` | `[[' a ', ' b ']]` | Quotes preserve horizontal whitespace |
 * | `'a,b\n\nc,d'` | `[['a', 'b'], [], ['c', 'd']]` | Blank lines become `[]`, not `['']` |
 * | `'a,b\n  \nc,d'` | `[['a', 'b'], `[], `['c', 'd']]` | Horizontal whitespace is discarded; middle line is still blank |
 * | `'a,b\n "" \nc,d'` | `[['a', 'b'], [], ['c', 'd']]` | (Ditto) |
 * | `'a,b\n " " \nc,d'` | `[['a', 'b'], [' '], ['c', 'd']]` | Quotes preserve horizontal whitespace; middle line is no longer blank |
 * | `'a \r\n b \r c'` | `[['a'], ['b'], ['c']]` | Row separators are `'\n'`, `'\r'`, or `'\r\n'` |
 * | `'a,b\n\n'` | `[['a', 'b']]` (if arg2 is falsy) | Trailing whitespace is discarded if `preserveTrailingEmptyRows` is falsy |
 * | `'a,b\n\n'` | `[['a', 'b'], [], []]` (if arg2 is truthy) | Trailing row-separators are preserved if `preserveTrailingEmptyRows` is truthy |
 *
 * @param {!string} csv The input source to parse using the CSV rules.
 *
 * @param {boolean} preserveTrailingEmptyRows If truthy, trailing newline(s) cause empty row(s) at the end of
 * the result, so `'a,b\n'` results in `['a','b']` then `[]`. If falsy, trailing newlines in `csv` are
 * ignored, so `'a,b\n'` results in `['a','b']` only.
 *
 * @return {Array} An array of zero or more rows (arrays), each of which is an array of zero or more fields
 * (strings).
 *
 * @throws {Error} if `csv` is an invalid CSV document.
 *
 * @see http://www.creativyst.com/Doc/Articles/CSV/CSV01.htm CSV-format definition
 */
rta.parseCsvAsArrayOfRows = function parseCsvAsArrayOfRows(csv, preserveTrailingEmptyRows) {
  var ans = [];
  rta.parseCsvAsRows(csv, preserveTrailingEmptyRows, function captureRow(row) {
    ans.push(row);
  });
  return ans;
};

/**
 * Parses the CSV file contents into an in-memory array of rows, each of which is an object with key-names
 * taken from the header-row (first row).
 *
 * | CSV Input | Resulting array of objects | Commentary |
 * | --------- | -------------------------- | ---------- |
 * | `'X,Y'` | `[]` | The header row is not included in the result |
 * | `'X,Y\na,b'` | `[{X:'a', Y:'b'}]` |  |
 * | `'X,Y\na,b\nd,e'` | `[{X:'a', Y:'b'}, {X:'d', Y:'e'}]` |  |
 * | `'X,Y\na,b,c,d,e'` | `{X:'a', Y:''}` | Extra fields are elided |
 * | `'X,Y\na,"b,c"'` | `[{X:'a', Y:'b,c'}]` | Use double-quotes to escape a field-separator (comma) |
 * | `'X,Y\na,"b\nd,e"'` | `[{X:'a', Y:'b\nd,e'}]` | Use double-quotes to escape a row-separator (newline) |
 * | `'X,Y\na,"b""c"'` | `[{X:'a', Y:'b"c'}]` | Use an adjacent pair of double-quotes to escape a double-quote |
 * | `'X,Y\na"b"c,"d"e"f"'` | `[{X:'abc', Y:'def'}]` | You can combine quoted and unquoted sections in the same field |
 * | `' X , Y \n a , "b" '` | `[{X:'a', Y:'b'}]` | Unquoted horizontal whitespace (spaces or tabs)<br>is elided at the beginning or ending of any field |
 * | `'X,Y\n" a "," "b" "` | `[{X:' a ', Y:' b '}]` | Use quotes to preserve horizontal whitespace |
 * | `'X,Y\na'` | `{X:'a', Y:''}` | Missing trailing fields become `''` |
 * | `'X,Y\n,b'` | `{X:'', Y:'b'}` | (Ditto) |
 * | `'X,Y\na,b \r\n c,d \r e,f'` | `[{X:'a', Y:'b'}, {X:'c', Y:'d'}, {X:'e', Y:'f'}]` | Row separators are `'\n'`, `'\r'`, or `'\r\n'` |
 * | `'X,Y\n\n\n'` | `[]` | Trailing empty rows are elided |
 * | `'X,Y\n  \n  \n'` | `[]` | Horizontal whitespace is still an empty row |
 * | `'X,Y\n\n\nc'` | `[{X:'', Y:''}, {X:'', Y:''}, {X:'c', Y:''}]` | Blank lines in the middle are not elided |
 *
 * @param {!string} csv The input source to parse using the CSV rules.
 *
 * @return {Array} An array of zero or more row-objects, each of which is an object with the same keys as the
 * names in the header-row. If the row is shorter than the header-row, the corresponding value will be the
 * empty string, `''`.
 *
 * @throws {Error} if `csv` is an invalid CSV document.
 *
 * @see http://www.creativyst.com/Doc/Articles/CSV/CSV01.htm CSV-format definition
 */
rta.parseCsvAsArrayOfObjects = function parseCsvAsArrayOfObjects(csv) {
  var ans = [];
  rta.parseCsvAsObjects(csv, function captureRow(obj) {
    ans.push(obj);
  });
  return ans;
};

/**
 * Produces a string that, if written to a .csv file then read and parsed, will hydrate back into rows. There
 * is no explicit header-record; if you want one, prepend it to the list of rows.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!Array} rows An array of array of cells. So rows[i] is a row, and rows[i][j] is a cell. The cells
 * must be stringifiable by passing to `String(x)`, for example, strings and/or numbers and/or booleans, etc.
 * Stringified cells are allowed to contain commas or quotes or newlines.
 *
 * @return {string} A string suitable to be written to a .csv file. Records are separated by '\n' (the spec
 * allows either '\n' or '\r\n'). The file is never terminated with a trailing '\n'; if you want one, add it.
 *
 * @see http://www.creativyst.com/Doc/Articles/CSV/CSV01.htm CSV-format definition used in this algorithm
 */
rta.makeCsv = function makeCsv(rows) {
  return rows.map(function handleRow(row) {
    return row.map(function handleCell(cell) {
      return (/^\s|[,\"\n\r]|\s$/).test(String(cell)) ?
        '"' + String(cell).replace(/\"/g, '""') + '"' :
        String(cell);
    }).join(',');
  }).join('\n');  // use '\n' as a line separator, not a line terminator; though either would be correct
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTTP utilities ////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function to perform an asychronous HTTP request with the specified HTTP method, URI, headers, body.
 * Callers supply a callback function which is called when the HTTP request is complete.
 *
 * Note: allows cross-domain requests, i.e., request.uri is allowed to refer to a domain-name other than the
 * domain-name of the user-agent's current page. The restriction on cross-domain requests are [[[PROVIDE
 * RESTRICTIONS HERE]]].
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!Object} request An Object containing the request, such as the following exemplar:
 *
 *     {
 *       method: 'GET',      // the HTTP method, such as 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', etc.; default is 'GET'
 *       uri: '//example.com/foo/bar?baz=fred',  // URI of the target; required
 *       username: 'fred',   // optional; the username if the resource requires authentication
 *       password: 'blah',   // optional; the password if the resource requires authentication
 *       timeout: 0,         // optional; defaults to 0 meaning infinite; number of millisec allowed before timing out
 *       parseJson: false,   // optional; defaults to false; if true, the 'body' of the response will be a JavaScript object parsed from JSON
 *       headers: {Accept: 'application/json'},  // optional; if provided, an Object with headers as key/values
 *       body: ...           // optional (but forbidden for GET and DELETE); the request body; may be null, a string, an Object, or an Array
 *     }
 *
 * If `request.headers['X-Requested-With']` is not provided, it defaults to 'XMLHttpRequest'.
 *
 * If `request.parseJson` is truthy and `request.headers['Accept']` is not provided, it defaults to
 * `'application/json'`.
 *
 * @param {Function(Object response)} [opt_whenDone] Optional callback function that will, if provided, be
 * called when the response has completely arrived. When called, it is passed a response object with
 * properties like the examplar below:
 *
 *     {
 *       isSuccess: true,   // true if status is 2xx or 304; false otherwise.
 *       status: 200,       // the numeric HTTP response-code, e.g., 200, 404, etc.
 *       statusText: "OK",  // a textual description of the HTTP response, e.g., "OK", "Not Found", etc.
 *       body: '...',       // body of the HTTP response as a string
 *       parsed: ...,       // JSON.parse(response.body) if response.isSuccess and request.parseJson; otherwise undefined.
 *       headers: {...},    // key/values representing the HTTP response-headers - with keys forced to all-lowercase.
 *       request: request   // a reference to the request-object (e.g., for request/response pairing).
 *     }
 *
 * @see rta.httpMulti()
 */
rta.http = function http(request, opt_whenDone) {
  // TODO: Convert this to the Promise pattern
  request = typeof request === 'string' ? {uri: request} : request;
  rta.debug('rta.http({0.source})', request);
  var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var requestHeaders = rta.applyDefaults(request.headers,
                                         {'X-Requested-With': 'XMLHttpRequest'},
                                         request.parseJson ? {Accept: 'application/json'} : null);
  var response = {
    isSuccess: void 0,
    status: void 0,
    statusText: void 0,
    body: void 0,
    parsed: void 0,
    headers: {},
    request: request
  };

// TODO: REMOVE THIS HACK (PATCH FOR A BROKEN SERVER)
if (requestHeaders.Accept) { requestHeaders.Accept = '*' + '/' + '*'; }  // TODO: REMOVE THIS HACK (PATCH FOR A BROKEN SERVER)
// TODO: REMOVE THIS HACK (PATCH FOR A BROKEN SERVER)
  xhr.open(request.method || 'GET', request.uri, true/*asynchronous*/, request.username/*optional*/, request.password/*optional*/);
  xhr.timeout = request.timeout || 0;
  Object.keys(requestHeaders).forEach(function(key) {
    try {  // Firefox needs this
      xhr.setRequestHeader(key, requestHeaders[key]);
    } catch (e) { }
  });
  if (opt_whenDone) {
    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        rta.allMatches(/^([^\s:]+):[ \t]*([^\r\n]*)\r?$/mg, xhr.getAllResponseHeaders()).forEach(function(m) {
          // TODO: What should we do if a header-name appears more than once?
          response.headers[m[1].toLowerCase()] = m[2];
        });
      } else if (xhr.readyState === xhr.DONE) {
        response.isSuccess = (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304;
        response.status = xhr.status;
        response.statusText = xhr.statusText;
        response.body = xhr.responseText;
        if (response.isSuccess && request.parseJson) {
          try {
            response.parsed = JSON.parse(xhr.responseText);   //does this really handle array of rows?
          } catch (jsonParseError) {
            // TODO: Remove this as soon as we have migrated from CSV to JSON
            try {
              response.parsed = rta.parseCsvAsArrayOfRows(xhr.responseText);
            } catch (csvParseError) {
              response.isSuccess = false;
              response.statusText =
                'Neither JSON (' + (jsonParseError.message || jsonParseError) +
                ') nor CSV (' + (csvParseError.message || csvParseError) + ')';
              response.parsed = null;
            }
          }
        }
        opt_whenDone(response);
      }
    };
  }
  xhr.send(request.body);  // request.body might be null
};

/**
 * Utility function to perform, in parallel, a set of asychronous HTTP requests, each with their own method,
 * URI, request headers, request body, and callback function to be called when the individual HTTP request is
 * complete. Another (optional) callback function is called when all the HTTP requests have completed.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {Array<object>} requests The array of HTTP requests. See `rta.http()` for details about each of the
 * individual HTTP request objects in this array.
 *
 * @param {Function(Object response)} [opt_whenDoneEach] An optional callback function that will, if
 * provivded, be called after each of the individual requests is complete. Will be passed a response object
 * with properties like the examplar below:
 *
 *     {
 *       isSuccess: true,   // true if status is 2xx or 304; false otherwise.
 *       status: 200,       // the numeric HTTP response-code, e.g., 200, 404, etc.
 *       statusText: "OK",  // a textual description of the HTTP response, e.g., "OK", "Not Found", etc.
 *       body: '...',       // body of the HTTP response as a string
 *       parsed: ...,       // JSON.parse(response.body) if response.isSuccess and request.parseJson; otherwise undefined.
 *       headers: {...},    // key/values representing the HTTP response-headers - with keys forced to all-lowercase.
 *       request: request   // a reference to the request-object (e.g., for request/response pairing).
 *     }
 *
 * Subtle: the order that these responses are called has nothing to with the order of `requests[]`.
 *
 * @param {Function(Array<object> responses)} [opt_whenDoneAll] An optional callback function that will, if
 * provided, be called when all the requests are complete. Will be passed an array of response objects;
 * `opt_whenDoneEach` for details about each of the individual response objects in this array.
 *
 * Subtle: if `requests.length` is 0, `opt_whenDoneAll([])` (if supplied) will be called immediately
 * (synchronously) before this function returns.
 *
 * Subtle: the order of `responses` has nothing to with the order of `requests`, so do not assume
 * `responses[i]` corresponds to `requests[i]`. Instead, you may assume `responses[i]` corresponds to
 * `responses[i].request`.
 *
 * @see rta.http()
 */
rta.httpMulti = function httpMulti(requests, opt_whenDoneEach, opt_whenDoneAll) {
  // TODO: Convert this to the Promise pattern??
  var responses = [];  // the response objects to be passed to opt_whenDoneAll
  requests.forEach(function(request) {
    // TODO: After converting to the Promise pattern, change this to:
    // rta.http(request).always(opt_whenDoneEach || function(){}).always(function(response) { ... });
    rta.http(request, function(response) {
      if (opt_whenDoneEach) {
        opt_whenDoneEach(response);
      }
      responses.push(response);
      if (opt_whenDoneAll && responses.length === requests.length) {
        opt_whenDoneAll(responses);
      }
    });
  });

  if (!requests.length && opt_whenDoneAll) {
    opt_whenDoneAll([]);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Distance Utilities ////////////////////////////////////////////////////////////////////////////////////////

/**
 * An Object mapping from distance unit names ('miles', 'mi', etc.) to an Object containing info about the
 * named distance unit. Each named property is an Object which contains the following properties:
 *
 *  - `longName`: the unit's full canonical name, e.g., 'miles', 'kilometers', 'radians', etc.
 *  - `shortName`: the unit's short canonical name, e.g., 'mi', 'km', 'rad', etc.
 *  - `isLinear`: true if the unit is linear (mi, km, ...), false if it is angular (deg, rad).
 *  - `earthRadius`: the approx radius of the earth in the specified units (as if spherical).
 *
 * Maintenance note: feel free to add other units to it (and update docs of rta.distanceUnitNames(), etc.).
 *
 * @api private
 * @static
 * @const
 * @see distanceInfo()
 * @see rta.distanceUnitNames()
 */
var _distanceInfo = [
  // [longName, shortName, isLinear, earthRadius]
  ['miles', 'mi', true, 6371009 * 100 / 12 / 2.54 / 5280],
  ['yards', 'yd', true, 6371009 * 100 / 12 / 2.54 / 3],
  ['feet', 'ft', true, 6371009 * 100 / 12 / 2.54],
  ['kilometers', 'km', true, 6371009 / 1000],
  ['meters', 'm', true, 6371009],         // Earth's mean radius per http://en.wikipedia.org/wiki/Earth_radius
  ['radians', 'rad', false, 1],           // R=1 so circumference will be 2*PI
  ['degrees', 'deg', false, rta.rad2deg]  // R=180/PI so circumference will be 180
].reduce(function(ans, record) {
  ans[record[0]] = ans[record[1]] = {
    longName: record[0],
    shortName: record[1],
    isLinear: record[2],
    earthRadius: record[3]
  };
  return ans;
}, {});

/**
 * Returns an Object with this info about the specified distance-units-name:
 *
 *  - `longName`: the unit's full canonical name, e.g., 'miles', 'kilometers', 'radians', etc.
 *  - `shortName`: the unit's short canonical name, e.g., 'mi', 'km', 'rad', etc.
 *  - `isLinear`: true if the unit is linear (mi, km, ...), false if it is angular (deg, rad).
 *  - `earthRadius`: the approx radius of the earth in the specified units (as if spherical).
 *
 * This function has no side-effects.
 *
 * @api private
 * @static
 *
 * @param {!string} units The name of the distance units, defaults to 'miles' if ''. The units name is
 * considered valid if it is one of the strings returned from `rta.distanceUnitNames()`, modulo
 * leading/trailing whitespace (' miles ' = 'miles'), modulo upper/lower case ('MiLeS' = 'miles') and modulo a
 * trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @param {boolean} [opt_throwOnFailure=false] If truthy, throws an `Error` if `units` is an invalid name;
 * otherwise returns `undefined` if `units` is an invalid name.
 *
 * @return {Object} Object containing info about the named distance units, or `undefined` if the units name is
 * invalid (but see `opt_throwOnFailure`).
 *
 * @throws {Error} if the units name is invalid and if `opt_throwOnFailure` is specified and truthy.
 *
 * @see _distanceInfo
 * @see rta.distanceUnitNames()
 */
var distanceInfo = function distanceInfo(units, opt_throwOnFailure) {
  var cleaned = String(units || 'miles').toLowerCase().trim();
  var info =
    _distanceInfo[cleaned] ||
    _distanceInfo[cleaned + 's'] ||            // e.g., 'mile' ==> 'miles'
    _distanceInfo[cleaned.replace(/s$/, '')];  // e.g., 'yds' ==> 'yd'
  if (!info) {
    rta.error('Unknown distance units {0.source}; expected one of {1.keys.join(", ")}', units, _distanceInfo);
    if (opt_throwOnFailure) {
      throw new Error('Bad distance units: ' + rta.toSource(units));
    }
  }
  return info;
};

/**
 * Returns the approximate radius of the Earth in the specified distaince-units ('miles', 'km', etc.), as if
 * the Earth were spherical.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {string} [opt_units='miles'] The name of the desired distance units. It is valid name if it is one
 * of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with leading/trailing
 * whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or with/without a trailing
 * 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {number} Radius of the Earth (as if the Earth were spherical) in the specified units.
 *
 * @throws {Error} if `opt_units` is an invalid units name.
 *
 * @see rta.distanceUnitNames()
 * @see rta.canonicalDistanceUnitName()
 * @see rta.GeoPos.prototype.distanceTo()
 * @see rta.GeoPos.prototype.boundingBoxByDist()
 */
rta.earthRadius = function earthRadius(opt_units) {
  return distanceInfo(opt_units, true).earthRadius;
};

/**
 * Returns the canonical name of the specified distance-unit name, for example, returns 'miles' if the
 * parameter is (case insensitive) 'miles', 'mile', 'mi' or 'mis'.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {string} [opt_units='miles'] The name of the desired distance units. It is valid name if it is one
 * of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with leading/trailing
 * whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or with/without a trailing
 * 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @param {boolean} [opt_throwOnFailure=false] If truthy, throws an `Error` if `opt_units` is invalid;
 * otherwise returns `undefined` if `opt_units` is invalid.
 *
 * @param {boolean} [opt_shorthand=false] If truthy, returns the canonical shorthand-name ('mi' rather than
 * 'miles', 'km' rather than 'kilometers', etc.). By default it returns the canonical long name.
 *
 * @return {string|undefined} The non-empty canonical name on success, or `undefined` on failure (but see
 * `opt_throwOnFailure`).
 *
 * @throws {Error} if the units name is invalid and if `opt_throwOnFailure` is specified and truthy.
 *
 * @see rta.earthRadius()
 * @see rta.distanceUnitNames()
 * @see rta.GeoPos.prototype.distanceTo()
 * @see rta.GeoPos.prototype.boundingBoxByDist()
 */
rta.canonicalDistanceUnitName = function canonicalDistanceUnitName(opt_units, opt_throwOnFailure, opt_shorthand) {
  var dinfo = distanceInfo(opt_units, opt_throwOnFailure);
  return !dinfo ? void 0 : opt_shorthand ? dinfo.shortName : dinfo.longName;
};

/**
 * Returns an array containing the string-names of all the allowed distance units. Guaranteed to return at
 * least these names: 'miles' and 'mi', 'yards' and 'yd', 'feet' and 'ft', 'kilometers' and 'km', 'meters' and
 * 'm', 'degrees' and 'deg', 'radians' and 'rad'.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @return {!Array<string>} The names of all known distance-units. The order is unspecified and may be
 * inconsistent on subsequent calls. Sort the result if you need a consistent, predictable order.
 *
 * @see rta.earthRadius()
 * @see rta.distanceUnitNames()
 * @see rta.canonicalDistanceUnitName()
 * @see rta.GeoPos.prototype.distanceTo()
 * @see rta.GeoPos.prototype.boundingBoxByDist()
 */
rta.distanceUnitNames = function distanceUnitNames() {
  return Object.keys(_distanceInfo);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.GeoPos - object holding a geo-position = (latitude, longitude) pair ///////////////////////////////////

/**
 * A Latitude/Longitude pair, with methods `lat()` and `lng()` to get the latitude and longitude in degrees.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @class rta.GeoPos
 * @constructor
 * @this {rta.GeoPos}
 */
rta.GeoPos = google.maps.LatLng;
// Maintenance note: Currently this happens to be a synonym for google.maps.LatLng, but that may change in the future.

/**
 * Used internally within `rta.typeName()`.
 *
 * Rationale: Google obfuscates/minifies its type-name, changing it to something that's not human-readable.
 *
 * @api private
 * @const
 */
rta.GeoPos.prototype._rtaTypeName = 'GeoPos';

/**
 * Returns a vector (bearing and distance) from 'this' geo-pos to 'that' geo-pos.
 *
 * Postcondition: `this.addVector(RESULT)` will be very close to `that` ("very close" because of the limits of
 * floating point arithmetic).
 *
 * Note: because of the curvature of the Earth, `x.vectorTo(y)` will not, in general, have a `bearing` 180
 * degrees different from `y.vectorTo(x)`. For the same reason, a vector between two points with the same
 * latitude will not necessarily have a bearing of 90 (due East) or 270 (due West).
 *
 * This function has no side-effects.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} that The other location. Can be any object where either
 * `that.geoPos` or `that` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @param {string} [opt_distanceUnits='miles'] The name of the result's distance units. It is valid name if it
 * is one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {!Object} An object with three properties:
 *
 *  - `bearing`: the compass bearing (direction) in degrees, wrapped into [0, 360), where 0 is due North, 90 is
 *    East, 180 is South, 270 is West.
 *  - `distance`: the distance in the specified distance-units.
 *  - `distanceUnits`: the canonical name of the specified distance-units, `opt_distanceUnits`.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see rta.distanceUnitNames()
 * @see rta.GeoPos.prototype.distanceTo()
 * @see rta.GeoPos.prototype.bearingTo()
 * @see rta.GeoPos.prototype.addVector()
 */
rta.GeoPos.prototype.vectorTo = function vectorTo(that, opt_distanceUnits) {
  var dinfo = distanceInfo(opt_distanceUnits, true);
  return {
    bearing: this.bearingTo(that),
    distance: this.distanceTo(that, dinfo.longName),
    distanceUnits: dinfo.longName
  };
};

/**
 * The great-circle as-the-bird-flies distance (in the specified units) along the surface of the Earth from
 * 'this' geo-pos to 'that' geo-pos. Limitation: approximates the Earth as a sphere.
 *
 * `this.distanceTo(that, opt_units)` is a shorthand for `this.vectorTo(that, opt_units).distance`.
 *
 * This function has no side-effects.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} that The other location. Can be any object where either
 * `that.geoPos` or `that` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @param {string} [opt_units='miles'] The name of the result's distance units. It is valid name if it is one
 * of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with leading/trailing
 * whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or with/without a trailing
 * 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {number} Distance in the specified distance-units.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see rta.distanceUnitNames()
 */
rta.GeoPos.prototype.distanceTo = function distanceTo(that, opt_units) {
  // Similar to algorithm used in Perl's Math::Trig::great_circle_distance():
  that = that.geoPos || that;
  that = Array.isArray(that) ? new rta.GeoPos(that[0], that[1]) : that;
  return rta.earthRadius(opt_units) *
    rta.acosRad(rta.cosDeg(this.lat()) * rta.cosDeg(that.lat()) * rta.cosDeg(this.lng() - that.lng()) +
                rta.sinDeg(this.lat()) * rta.sinDeg(that.lat()));

  // The following algorithm is a translation of the Haversine formula.
  // @see http://en.wikipedia.org/wiki/Haversine_formula Haversine formula
  // @see http://www.movable-type.co.uk/scripts/latlong.html Translation of the Haversine formula into JavaScript
  // var sinHalfLatDelta = rta.sinDeg((that.lat() - this.lat()) / 2),  // sine of half the difference in latitude
  //     sinHalfLngDelta = rta.sinDeg((that.lng() - this.lng()) / 2),  // sine of half the difference in longitude
  //     cosThisLat      = rta.cosDeg(this.lat()),  // cosine of this.lat()
  //     cosThatLat      = rta.cosDeg(that.lat()),  // cosine of that.lat()
  //     a = sinHalfLatDelta * sinHalfLatDelta + sinHalfLngDelta * sinHalfLngDelta * cosThisLat * cosThatLat,
  //     c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // return rta.earthRadius(opt_units) * c;
};

/**
 * Returns the compass bearing (AKA compass direction) from 'this' geo-pos to 'that' geo-pos. Meaning if you
 * are standing at 'this', returns the compass bearing you would travel to get to 'that'.
 *
 * `this.bearingTo(that)` is a shorthand for `this.vectorTo(that).bearing`.
 *
 * This function has no side-effects.
 *
 * @param {rta.GeoPos} that The other geo-pos.
 *
 * @return {number} Compass bearing (direction) in degrees, wrapped into [0, 360). 0 is due North, 90 is East,
 * 180 is South, 270 is West.
 *
 * @see rta.GeoPos.prototype.distanceTo()
 * @see rta.GeoPos.prototype.addVector()
 */
rta.GeoPos.prototype.bearingTo = function bearingTo(that) {
  // Uses an algorithm similar to the one in Perl's Math::Trig::great_circle_direction():
  var ans = -rta.rad2deg *
    rta.atan2Rad(rta.sinDeg(this.lng() - that.lng()) * rta.cosDeg(that.lat()),
                 rta.cosDeg(this.lat()) * rta.sinDeg(that.lat()) -
                 rta.sinDeg(this.lat()) * rta.cosDeg(that.lat()) * rta.cosDeg(this.lng() - that.lng()));

  // Wrap it to [0,360)
  return (ans + 3600) % 360;  // or ans += 3600; return ans - 360*Math.floor(ans / 360);
};

/**
 * The geo-pos that would result if you started at 'this', faced a particular compass bearing, then traveled
 * for a certain distance. Returns a newly created geo-pos object, leaving 'this' geo-pos unchanged.
 *
 * Can be called with either a vector-object (`this.addVector({bearing: 37, distance: 10, distanceUnits:
 * 'miles'})`) or positional parameters (`this.addVector(37, 10, 'miles')`). Either way, the `distanceUnits`
 * parameter is optional.
 *
 * Postcondition: `this.bearingTo(RESULT)` will be `vector.bearing` if the latter is forced into [0,360), and
 * `this.distanceTo(RESULT, vector.distanceUnits)` will be `vector.distance`.
 *
 * Since the Earth is not flat, you are not guaranteed that adding the opposite vector to the resulting
 * geo-pos will return you to 'this'. For example, `RESULT.addVector({bearing: vector.bearing + 180, distance:
 * vector.distance, distanceUnits: vector.distanceUnits})` will not, in general, be the same geo-pos as
 * `this`.
 *
 * This function has no side-effects.
 *
 * @param {!object} vector Bearing and distance to add to `this`, e.g., `{bearing: 37, distance: 10,
 * distanceUnits: 'miles'}`. Property `bearing` is the compass direction (in degrees) to aim, where 0 is due
 * North, 90 is East, 180 is South, 270 is West; negative values or values greater than 360 are allowed and
 * act as though they are "wrapped" modulus 360, so due West can also be specified as -90 or 270+360 or
 * 270+5*360, etc. Property `distance` is the distance to "travel" in the specified bearing. Property
 * `distanceUnits` is optional, and defaults to 'miles'; if specified, it must be one of the strings returned
 * from `rta.distanceUnitNames()`, otherwise throws a 'bad distance units' exception.
 *
 * @return {rta.GeoPos} The geo-pos resulting from adding the indicated vector to `this`.
 *
 * @throws {Error} if `vector.distanceUnits` is defined but is not one of the strings returned from
 * `rta.distanceUnitNames()`.
 *
 * @see rta.distanceUnitNames()
 */
rta.GeoPos.prototype.addVector = function addVector(vector) {
  // Allow it to be called with positional parameters
  if (typeof vector === 'number') {
    vector = {
      bearing: arguments[0],
      distance: arguments[1],
      distanceUnits: arguments[2]
    };
  }

  // Uses an algorithm similar to the one in Perl's Math::Trig::great_circle_destination():
  var distanceRad = vector.distance / rta.earthRadius(vector.distanceUnits);  // distance in radians
  var latRad = rta.asinRad(rta.sinDeg(this.lat()) * rta.cosRad(distanceRad) +
                           rta.cosDeg(this.lat()) * rta.sinRad(distanceRad) * rta.cosDeg(vector.bearing));
  var lngRad = rta.deg2rad * this.lng() +
    rta.atan2Rad(rta.sinDeg(vector.bearing) * rta.sinRad(distanceRad) * rta.cosDeg(this.lat()),
                 rta.cosRad(distanceRad) - rta.sinDeg(this.lat()) * rta.sinRad(latRad));
  return new rta.GeoPos(rta.rad2deg * latRad, rta.rad2deg * lngRad);
};

/**
 * Creates and returns a new rta.GeoBox, centered at 'this', with dimensions (height, width) in the specified
 * units (default is 'miles'; use 'degrees' to specify a bounding-box by degrees).
 *
 * Postconditions:
 *
 *  - `RESULT.center()` will be *approximately* the same as `this`.
 *  - Postcondition: `RESULT.width(opt_units)` will be *approximately* equal to `width`.
 *  - Postcondition: `RESULT.height(opt_units)` will be *approximately* equal to `height`.
 *
 * Note: the word *approximately* is used because floating point arithmetic is inexact.
 *
 * This function has no side-effects.
 *
 * @param {!number} height The desired vertical (latitudinal) span in `opt_units` (default: 'miles'). Note:
 * this is the geo-box's entire span, not the distance from `this` to the upper/lower boundary.
 *
 * @param {!number} width The desired horizontal (longitudinal) span in `opt_units` (default: 'miles'). Note:
 * this is the geo-box's entire span, not the distance from `this` to the left/right boundary.
 *
 * @param {string} [opt_units='miles'] The name of the distance units for `height` and `width`. It is valid
 * name if it is one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {rta.GeoBox} A new geo-box centered at `this` with the specified `height` and `width` in
 * `opt_units`.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see rta.distanceUnitNames()
 * @see rta.GeoPos.prototype.geoCircle()
 */
rta.GeoPos.prototype.geoBox = function geoBox(height, width, opt_units) {
  // Algorithm:
  //   degPerUnit := 360-degrees / circumference of earth in opt_units;
  //   latSpan := vertical span in degrees == degPerUnit * height in opt_units;
  //   lngSpan := horizontal == ditto but also multiply by the cosine of the latitude.
  var dinfo = distanceInfo(opt_units, true);
  var degPerUnit = rta.rad2deg / dinfo.earthRadius;
  var latSpan = degPerUnit * height;
  var lngSpan = degPerUnit * width * (dinfo.isLinear ? rta.cosDeg(this.lat()) : 1);
  return new rta.GeoBox(new rta.GeoPos(this.lat() - latSpan / 2, this.lng() - lngSpan / 2),
                        new rta.GeoPos(this.lat() + latSpan / 2, this.lng() + lngSpan / 2));
};

/**
 * Overrides the behavior of JSON.stringify() since Google's minifier obfuscates the key-names.
 */
rta.GeoPos.prototype.toJSON = function toJSON() {
  return {
    lat: this.lat(),
    lng: this.lng()
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.GeoBox - a rectangular (in the non-Euclidian/geolocation sense) bounding-box //////////////////////////

// Maintenance note: we capture the original so we can augment it then call it:
var orig_GeoBox_contains = google.maps.LatLngBounds.prototype.contains;

/**
 * A subtype of geo-region, in this case defined by a rectangle. Supports the two methods required by all
 * geo-region types: `this.contains(p)` and `this.geoBox()`.
 *
 * As with all geo-region types, the region is on the surface of the Earth and the Earth is modeled as a
 * sphere. Some planar/Euclidian properties of polygons will not apply, for example, the interior angles of
 * the rectangle will be larger than 90-degrees, the area will be larger than length x width, etc.
 *
 * @class rta.GeoBox
 * @constructor
 * @this {rta.GeoBox}
 *
 * @param {!rta.GeoPos} sw The geo-box's southwest corner, which must be an `rta.GeoPos`.
 *
 * @param {!rta.GeoPos} ne The geo-box's northeast corner, which must be an `rta.GeoPos`.
 */
rta.GeoBox = google.maps.LatLngBounds;
// Maintenance note: For now, this happens to be a synonym for google.maps.LatLngBounds; but that may change in the future.

/**
 * Used internally within `rta.typeName()`.
 *
 * Rationale: Google obfuscates/minifies its type-name, changing it to something that's not human-readable.
 *
 * @api private
 */
rta.GeoBox.prototype._rtaTypeName = 'GeoBox';

/**
 * Returns a new geo-region object that is equivalent to `this` but is a copy. Subsequent changes made to
 * `this` will not affect the returned object, and vice versa.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @return {rta.GeoBox}
 */
rta.GeoBox.prototype.clone = function clone() {
  return new rta.GeoBox(this.sw(), this.ne());
};

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.contains(p)` returns truthy if/only if the specified geo-pos or parcel is within or on the boundary
 * of `this`.
 *
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.contains(p)` is stronger than `this.geoBox().contains(p)`. The former implies the latter but,
 * depending on the shape of this region, the inverse implication might not be guaranteed.
 *
 * Specific to this particular geo-region class (rta.GeoBox): `this` and `this.geoBox()` happen to be same, so
 * the inverse implication (above) is also guaranteed. Caveat: callers should rely on that only if they know
 * for sure `this` region happens to be a geo-box (translation: callers shouldn't rely on that :-).
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} p The location to be checked for containment. Can be any
 * object where either `p.geoPos` or `p` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @return {boolean} Truthy if/only `p` is within or on the boundary of `this`.
 */
rta.GeoBox.prototype.contains = function contains(p) {
  p = p.geoPos || p;
  p = Array.isArray(p) ? new rta.GeoPos(p[0], p[1]) : p;
  return orig_GeoBox_contains.call(this, p);
};
// Maintenance note: the above assignment also changes google.maps.LatLngBounds.prototype.contains

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.geoBox()` returns a newly created `rta.GeoBox` that contains everything within `this` but may,
 * depending on the shape of `this` geo-region, contain geo-positions not contained in `this` geo-region.
 * Therefore if `this.contains(p)` is truthy, `this.geoBox().contains(p)` will also be truthy. However,
 * depending on the shape of the geo-region object, the inverse implication is not guaranteed.
 *
 * Specific to this particular geo-region class (rta.GeoBox): since `this` is already an `rta.GeoBox`,
 * `this.geoBox()` returns a copy of `this`, so in this particular case, `this.geoBox()` will not happen to
 * contain any geo-pos's not contained in `this`. Caveat: callers should rely on that only if they know for
 * sure `this` region happens to be a geo-box (translation: callers shouldn't rely on that :-).
 *
 * @return {!rta.GeoBox} A new `rta.GeoBox` containing everything within `this`.
 */
rta.GeoBox.prototype.geoBox = rta.GeoBox.prototype.clone;

/**
 * The southwest corner of 'this' geo-box.
 * Note: this method is not generic to all geo-regions.
 * @return {rta.GeoPos}
 */
rta.GeoBox.prototype.sw = google.maps.LatLngBounds.prototype.getSouthWest;

/**
 * The northeast corner of 'this' geo-box.
 * Note: this method is not generic to all geo-regions.
 * @return {rta.GeoPos}
 */
rta.GeoBox.prototype.ne = google.maps.LatLngBounds.prototype.getNorthEast;

/**
 * The northwest corner of 'this' geo-box.
 * Note: this method is not generic to all geo-regions.
 * @return {rta.GeoPos}
 */
rta.GeoBox.prototype.nw = function nw() {
  return new rta.GeoPos(this.ne().lat(), this.sw().lng());
};

/**
 * The southeast corner of 'this' geo-box.
 * Note: this method is not generic to all geo-regions.
 * @return {rta.GeoPos}
 */
rta.GeoBox.prototype.se = function se() {
  return new rta.GeoPos(this.sw().lat(), this.ne().lng());
};

/**
 * The height (latitudinal) span of `this` geo-box in the specified units (default: 'miles').
 *
 * Note: this is the geo-box's entire span, not the distance from `this` to the upper/lower boundary.
 *
 * This function has no side-effects.
 *
 * @param {string} [opt_units='miles'] The name of the distance units for the result. It is valid name if it
 * is one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {!number} The entire height of `this` geo-box in the specified units.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see this.width()
 * @see rta.distanceUnitNames()
*/
rta.GeoBox.prototype.height = function height(opt_units) {
  var latDiffDeg = this.ne().lat() - this.sw().lat();          // latitude difference in degrees
  var unitsPerDeg = rta.earthRadius(opt_units) / rta.rad2deg;  // ratio of opt_units over degrees
  return latDiffDeg * unitsPerDeg;
};

/**
 * The width (longitudinal) span of `this` geo-box in the specified units (default: 'miles').
 *
 * Note: this is the geo-box's entire span, not the distance from `this` to the left/right boundary.
 *
 * This function has no side-effects.
 *
 * @param {string} [opt_units='miles'] The name of the distance units for the result. It is valid name if it
 * is one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {!number} The entire width of `this` geo-box in the specified units.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see this.height()
 * @see rta.distanceUnitNames()
*/
rta.GeoBox.prototype.width = function width(opt_units) {
  var dinfo = distanceInfo(opt_units, true);
  var avgLatDeg = (this.ne().lat() + this.sw().lat()) / 2;  // average latitude in degrees
  var lngDiffDeg = this.ne().lng() - this.sw().lng();       // longitude difference in degrees
  var unitsPerDeg = dinfo.earthRadius / rta.rad2deg;        // ratio of opt_units over degrees
  return lngDiffDeg * unitsPerDeg / (dinfo.isLinear ? rta.cosDeg(avgLatDeg) : 1);
};

/**
 * Returns a new rta.GeoBox containing the intersection of 'this' and 'that', or null if the two do not
 * intersect.
 *
 * Note: this method is not generic to all geo-regions.
 *
 * Guarantee: if `this.contains(p)` and/or `that.contains(p)`, then `RESULT.contains(p)` will also be truthy
 * (assuming `RESULT` is not null). However the inverse implication is not guaranteed: `RESULT.contains(p)`
 * does not imply that either `this.contains(p)` or `that.contains(p)`.
 *
 * Bug: the current implementation does not handle cases where either geo-box "wraps around" the
 * zero-boundary, for example, when either geo-box includes the North or South poles, or where either geo-box
 * crosses the 180th meridian (sometimes loosely but inaccurately referred to as the International Date Line).
 *
 * This function has no side-effects.
 *
 * @param {rta.GeoBox} that The other geo-box.
 *
 * @return {rta.GeoBox} A 'new' geo-box containing the intersection of 'this' and 'that', or null if those do
 * not intersect.
 */
rta.GeoBox.prototype.intersection = function intersection(that) {
  var latMin = Math.max(this.sw().lat(), that.sw().lat());
  var latMax = Math.min(this.ne().lat(), that.ne().lat());
  var lngMin = Math.max(this.sw().lng(), that.sw().lng());
  var lngMax = Math.min(this.ne().lng(), that.ne().lng());
  return latMin <= latMax && lngMin <= lngMax ?
    new rta.GeoBox(new rta.GeoPos(latMin, lngMin), new rta.GeoPos(latMax, lngMax)) :
    null;
};

/**
 * Overrides the behavior of JSON.stringify() since Google's internal data structure is different from what we
 * want shown, plus Google's minifier obfuscates its key-names.
 */
rta.GeoBox.prototype.toJSON = function toJSON() {
  return {
    sw: this.sw(),
    ne: this.ne()
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.GeoCircle - a circular (in the non-Euclidian/geolocation sense) boundary //////////////////////////////

/**
 * A subtype of geo-region, in this case defined by a circle. Supports the two methods required by all
 * geo-region types: `this.contains(p)` and `this.geoBox()`.
 *
 * As with all geo-region types, the region is on the surface of the Earth and the Earth is modeled as a
 * sphere. Some planar/Euclidian properties of circles will not apply, for example, the circumference will be
 * less than 2*PI*radius, etc.
 *
 * @class rta.GeoCircle
 * @constructor
 * @this {rta.GeoCircle}
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} center The geo-circle's center. Can be any object where either
 * `that.geoPos` or `that` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @param {!number} radius The geo-circle's radius in `opt_units` (default: 'miles').
 *
 * @param {string} [opt_units='miles'] The name of the distance units for `radius`. It is valid name if it is
 * one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @throws {Error} if the distance-units-name is invalid.
 */
rta.GeoCircle = function GeoCircle(center, radius, opt_units) {
  center = center.geoPos || center;
  center = Array.isArray(center) ? new rta.GeoPos(center[0], center[1]) : center;
  this.center = center;
  this.radius = radius;
  this.units = opt_units || 'miles';
};

/**
 * Returns a new geo-region object that is equivalent to `this` but is a copy. Subsequent changes made to
 * `this` will not affect the returned object, and vice versa.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @return {rta.GeoCircle}
 */
rta.GeoCircle.prototype.clone = function clone() {
  return new rta.GeoCircle(this.center, this.radius, this.units);
};

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.contains(p)` returns truthy if/only if the specified geo-pos or parcel is within or on the boundary
 * of `this`.
 *
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.contains(p)` is stronger than `this.geoBox().contains(p)`. The former implies the latter but,
 * depending on the shape of this region, the inverse implication might not be guaranteed.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} p The location to be checked for containment. Can be any
 * object where either `p.geoPos` or `p` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @return {boolean} Truthy if/only `p` is within or on the boundary of `this`.
 */
rta.GeoCircle.prototype.contains = function contains(p) {
  return this.center.distanceTo(p, this.units) <= this.radius;
};

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon, rta.GeoPatches):
 * `this.geoBox()` returns a newly created `rta.GeoBox` that contains everything within `this` but may,
 * depending on the shape of `this` geo-region, contain geo-positions not contained in `this` geo-region.
 * Therefore if `this.contains(p)` is truthy, `this.geoBox().contains(p)` will also be truthy. However,
 * depending on the shape of the geo-region object, the inverse implication is not guaranteed.
 *
 * @return {!rta.GeoBox} A new `rta.GeoBox` containing everything within `this`.
 */
rta.GeoCircle.prototype.geoBox = function geoBox() {
  return this.center.geoBox(2 * this.radius, 2 * this.radius, this.units);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.GeoPolygon - a closed polygon (in the non-Euclidian/geolocation sense) boundary ///////////////////////

/**
 * A subtype of geo-region, in this case defined by a closed polygon. Supports the two methods required by all
 * geo-region types: `this.contains(p)` and `this.geoBox()`.
 *
 * As with all geo-region types, the region is on the surface of the Earth and the Earth is modeled as a
 * sphere. Some planar/Euclidian properties of polygons will not apply, for example, the sum of the interior
 * angles of the polygon will larger than would be on a plane (an equilateral triangle will not have 60-degree
 * interior angles, etc.).
 *
 * @class rta.GeoPolygon
 * @constructor
 * @this {rta.GeoPolygon}
 *
 * @param {Array<rta.GeoPos>} [opt_vertices] The vertices of this geo-polygon. If missing, equivalent to
 * passing `[]`, that is, an empty list of vertices.
 */
rta.GeoPolygon = function GeoPolygon(opt_vertices) {
  this.vertices = opt_vertices ? opt_vertices.slice(0) : [];
};

/**
 * Returns a new geo-region object that is equivalent to `this` but is a copy. Subsequent changes made to
 * `this` will not affect the returned object, and vice versa.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @return {rta.GeoPolygon}
 */
rta.GeoPolygon.prototype.clone = function clone() {
  return new rta.GeoPolygon(this.vertices);
};

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon): `this.contains(p)` returns
 * truthy if/only if the specified geo-pos or parcel is within or on the boundary of `this`.
 *
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon): `this.contains(p)` is
 * stronger than `this.geoBox().contains(p)`. The former implies the latter but, depending on the shape of
 * this region, the inverse implication might not be guaranteed.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} p The location to be checked for containment. Can be any
 * object where either `p.geoPos` or `p` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @return {boolean} Truthy if/only `p` is within or on the boundary of `this`.
 */
rta.GeoPolygon.prototype.contains = function contains(p) {
  var self = this;
  p = p.geoPos || p;
  p = Array.isArray(p) ? new rta.GeoPos(p[0], p[1]) : p;
  var targetLat = p.lat();
  var targetLng = p.lng();
  return self.vertices.reduce(function(isWithin, curr, i) {
    var next = self.vertices[(i + 1) % self.vertices.length];
    if ((targetLng > curr.lng() && targetLng <= next.lng()) ||  // curr is west of next, and target is in (curr, next]
        (targetLng > next.lng() && targetLng <= curr.lng())) {  // next is west of curr, and target is in (next, curr]
      // Note: divide-by-zero cannot happen below, since the above 'if' guarantees an east/west gap
      if (curr.lat() + (targetLng - curr.lng()) / (next.lng() - curr.lng()) * (next.lat() - curr.lat()) < targetLat) {
        return !isWithin;
      }
    }
    return isWithin;
  }, false);
};

/**
 * Common to all geo-region classes (rta.GeoBox, rta.GeoCircle, rta.GeoPolygon): `this.geoBox()` returns a
 * newly created `rta.GeoBox` that contains everything within `this` but may, depending on the shape of `this`
 * geo-region, contain geo-positions not contained in `this` geo-region. Therefore if `this.contains(p)` is
 * truthy, `this.geoBox().contains(p)` will also be truthy. However, depending on the shape of the geo-region
 * object, the inverse implication is not guaranteed.
 *
 * @return {!rta.GeoBox} A new `rta.GeoBox` containing everything within `this`.
 */
rta.GeoPolygon.prototype.geoBox = function geoBox() {
  return this.vertices.reduce(function handleVertex(box, vertex) {
    return box.extend(vertex);
  }, new rta.GeoBox());
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.GeoPatches - an arbitrary but 'clean' set of patches of any shape /////////////////////////////////////

/**
 * A subtype of geo-region defined by an arbitrary set of 'patches'.
 *
 * A geo-patches can have one or more disjoint islands, and inside those islands an arbitrary number of holes
 * (think the Park Cities: they are not part of Dallas County even though they are geographically within
 * Dallas County - they are 'holes'), and inside those holes any arbitrary number of islands, etc. to an
 * arbitrary depth.
 *
 * The patches can be of arbitrary region-subtypes, including mixures. A geo-box island might contain a
 * geo-circle hole which in turn contains an island that is an intersection of a geo-polygon and a different
 * geo-patches object. Or any other combination in any order and to any depth.
 *
 * The patches must be *clean*: two patches (whether holes or islands or mixtures) may touch each other at
 * zero points or one point, but they may not overlap each other, and they must not share a line segment with
 * each other. By way of example and not limitation, a geo-polygon vertex is allowed to touch the boundary of
 * a different patch (can touch anywhere along the other patch's boundary, whether one of its vertices, or
 * along a line segment, or along the curve if it is a geo-circle); but must never share a line segment or
 * portion of a line segment, and must never overlap.
 *
 * When you provide regions that geographically fit inside each other, they form rings. They are interpreted
 * as alternating between islands and holes: the largest outline/region of any of these rings is always an
 * island; the ones immediately within that are holes; the ones inside that/those are islands, etc.
 *
 * You can add these regions in arbitrary order: you needn't go strictly smallest to largest or vice versa.
 * You can even query a geo-patches (for example, `this.contains(p)` or `this.intersect(that)`), then add more
 * islands and/or holes, then query it again; it all just works.
 *
 * @class rta.GeoPatches
 * @constructor
 * @this {rta.GeoPatches}
 *
 * @param {Array} [opt_regions=Array()] The initial geo-regions of `this` geo-patches. If none are provided,
 * the geo-patches is empty meaning `this.contains(p)` will always be false. If you provide one geo-region, it
 * is an island. If you provide two or more geo-regions, they are logically laid out on the globe, and if any
 * are contained inside others, they are stacked as rings. For each such ring, the outermost is an island,
 * then alternating holes and islands from there. Defaults to empty, as if you passed `[]`.
 *
 * Note that the regions are cloned into `this`, therefore any changes you make to the arg object(s) after
 * this call will not affect `this` geo-patches object.
 */
rta.GeoPatches = function GeoPatches(opt_regions) {
  this.regions = [];
  if (opt_regions) {
    this.add(opt_regions);
  }
};

/**
 * Add a hole or island (or plural if the arg is an array) to `this` geo-patches object.
 *
 * @param {region|Array} regionOrRegions The geo-region or geo-regions to add to `this` geo-patches object.
 * Note that the regions are cloned into `this`, therefore any changes you make to the arg object(s) after
 * this call will not affect `this` geo-patches object.
 *
 * @return {rta.GeoPatches} `this` so you can use method-chaining.
 *
 * @see rta.GeoPatches()
 */
rta.GeoPatches.prototype.add = function add(regionOrRegions) {
  var self = this;
  var regions = Array.isArray(regionOrRegions) ? regionOrRegions : [regionOrRegions];
  self.regions.push.apply(self.regions, regions.map(function(region) {
    return region.clone();
  }));
  return self;
};

/**
 * Returns a new geo-region object that is equivalent to `this` but is a copy. Subsequent changes made to
 * `this` will not affect the returned object, and vice versa.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @return {rta.GeoPatches}
 */
rta.GeoPatches.prototype.clone = function clone() {
  return new rta.GeoPatches(this.regions);
};

/**
 * Truthy if/only if the specified geo-pos or parcel is contained in or on a boundary of `this` geo-region.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} p The location to be checked for containment. Can be any
 * object where either `p.geoPos` or `p` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @return {boolean} Truthy if/only `p` is within or on the boundary of `this`.
 */
rta.GeoPatches.prototype.contains = function contains(p) {
  p = p.geoPos || p;
  p = Array.isArray(p) ? new rta.GeoPos(p[0], p[1]) : p;
  return self.regions.reduce(function handlePatch(numSuccesses, region) {
    return numSuccesses + (region.contains(p) ? 1 : 0);
  }, 0) % 2 ? true : false;
};

/**
 * Returns a newly created `rta.GeoBox` that is the smallest possible geo-box that still contains everything
 * in `this`.
 *
 * Although every point in `this` is contained in the returned geo-box, the reverse may not always be true,
 * depending on the shape of `this` geo-region. So `this.contains(p)` implies `this.geoBox().contains(p)`, but
 * the reverse implication is not always guaranteed.
 *
 * Note: this method is guaranteed to be available and have consistent semantics for all objects of all
 * subtypes of geo-region.
 *
 * @return {!rta.GeoBox} A new `rta.GeoBox` containing everything within `this`.
 */
rta.GeoPatches.prototype.geoBox = function geoBox() {
  return this.vertices.reduce(function handlePatch(box, region) {
    var b = region.geoBox();
    return box.extend(b.sw()).extend(b.ne());
  }, new rta.GeoBox());
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.County ////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns the mixed-case combination of countyName and stateName that is both humanly readable and is, after
 * lower-casing, used as the lookup key for `countyRawInfo[]` and `countyObjects[]`.
 *
 * This exists as a separate function both because of the DRY principle, and especially to guarantee we are
 * consistent in all uses of the above lookup-keys.
 *
 * This function has no side-effects.
 *
 * @api private
 */
var fullCountyName = function fullCountyName(countyName, stateName) {
  return countyName + ' County, ' + stateName;
};

/**
 * Maps from a lookup key in the format returned from fullCountyName(...).toLowerCase() to an in-memory
 * rta.County object. Gets populated exclusively by `rta.County.byName()`.
 *
 * @api private
 *
 * @see rta.County.byName()
 */
var countyObjects = {};

/**
 * Holds raw info about the supported counties.
 *
 * The keys and values are tied as follows: if `raw` is `countyRawInfo[key]` where
 * `key` is some string, string `key` will always be
 * `fullCountyName(...).toLowerCase()` when passed the `raw` object's
 * `countyName` and `stateName`.
 *
 * The values of `countyRawInfo` are arrays with elements similar to the following examplar:
 *
 *     [
 *       1,           // [0] the version# of the format of this raw-info (for future-proofing when we move this info to the server)
 *       'Dallas',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
 *       'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
 *       32.5,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
 *       -97.1,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
 *       33.0,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
 *       -96.4,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
 *       50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
 *       50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
 *       0.0271,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
 *       '/data/texas/dallas-county/parcel-grid/{0}',        // [10] gridElemUri
 *       '/data/texas/dallas-county/county/{0}',             // [11] countyDataUri (not currently used)
 *       '//www.dallascad.org/AcctDetailCom.aspx?ID={0}',    // [12] taxUri (not currently used)
 *       '//roamdallaspropertyrecords.com/ailis/search.do?searchType=1&searchable=Name%2CInstrument' +
 *         '%2CRECDATE%2CDESIGSTATUS%2CPartyRole%2CIndexType%2CDocType%2CBook%2CPage%2CLot%2CBlock%2CCityBlock' +
 *         '%2CMapBook%2CMapPage%2CMapInstrumentNumber%2CSubdivision%2CCityTown%2CFreeform%2CLocation' +
 *         '&indexName=dallasclerkopr&templateName=&q={0}',  // [13] clerkUri (not currently used)
 *       'Dallas County-TX'                                  // [14] legacyName (not currently used)
 *     ]
 *
 * FUTURE: someday this raw-data will get loaded from the server.
 *
 * @api private
 */
var countyRawInfo = {};

/*
 * Populates countyRawInfo.
 * For now we do this in the .js file.
 * In the future we may do this via a call to the server.
 * Note: add new elements to the following array as desired.
 */
[
  [
      4,           // [0] the version# of the data-format in this raw-County-info bundle (for future-proofing)
      'Collin',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
      'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
      32.981519163756026,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
      -96.84412175672682,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
      33.40546471571436,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
      -96.29438608218096,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
      50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
      50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
      0.0231,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
      'http://' +  (window.location.href.slice(0,4) === 'file' ? 'localhost' : 'www.leadelitepro.com') +
        ':61116/data/texas/collin-county/parcel-grid/{0}',        // [10] gridElemUri
      'http://localhost:61116/data/texas/collin-county/county/{0}'             // [11] countyDataUri (not currently used)
  ],
  [
    4,           // [0] the version# of the data-format in this raw-County-info bundle (for future-proofing)
    'Dallas',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
    'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
      32.545363374470355,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
      -97.03838539666411,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
      32.98968862644958,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
      -96.51731151934374,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
    50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
    50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
    0.0271,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
      'http://' + (window.location.href.slice(0,4) === 'file' ? 'localhost' : 'www.leadelitepro.com') +
        ':61116/data/texas/dallas-county/parcel-grid/{0}',        // [10] gridElemUri
    'http://localhost:61116/data/texas/dallas-county/county/{0}'             // [11] countyDataUri (not currently used)
  ],
  [
      4,           // [0] the version# of the data-format in this raw-County-info bundle (for future-proofing)
      'Denton',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
      'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
      32.987457719061965,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
      -97.39851458126468,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
      33.43034050693903,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
      -96.83386800189818,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
      50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
      50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
      0.0250,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
      'http://' + (window.location.href.slice(0,4) === 'file' ? 'localhost' : 'www.leadelitepro.com') +
        ':61116/data/texas/denton-county/parcel-grid/{0}',        // [10] gridElemUri
      'http://localhost:61116/data/texas/denton-county/county/{0}'             // [11] countyDataUri (not currently used)
  ],
  [
      4,           // [0] the version# of the data-format in this raw-County-info bundle (for future-proofing)
      'Tarrant',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
      'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
      32.54866230739841,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
      -97.55297767366795,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
      32.994003740732225,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
      -97.03100719626592,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
      50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
      50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
      0.02734,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
      'http://' +   (window.location.href.slice(0,4) === 'file' ? 'localhost' : 'www.leadelitepro.com') +
        ':61116/data/texas/tarrant-county/parcel-grid/{0}',        // [10] gridElemUri
      'http://localhost:61116/data/texas/tarrant-county/county/{0}'             // [11] countyDataUri (not currently used)
  ]
].forEach(function(raw) {
  countyRawInfo[fullCountyName(raw[1], raw[2]).toLowerCase()] = raw;
});

/**
 * Constructor for a County object. This is logically private - it should be called by the static methods of
 * class County only, never by an apps-programmer.
 *
 * This function has no side-effects.
 *
 * @class rta.County
 * @constructor
 * @this {rta.County}
 *
 * @param {!Array} raw An array containing the 'raw' County info, with elements similar to the following examplar:
 *
 *     [
 *       1,           // [0] the version# of the format of this raw-info (for future-proofing when we move this info to the server)
 *       'Dallas',    // [1] unqualName: County name; must equal geocoder result for type 'administrative_area_level_2'
 *       'Texas',     // [2] stateName: State name; must equal geocoder result for type 'administrative_area_level_1'
 *       32.5,        // [3] sw.lat: lat of SW corner of the County's geo-box; must match server's grid-elems
 *       -97.1,       // [4] sw.lng: lng of SW corner of the County's geo-box; must match server's grid-elems
 *       33.0,        // [5] ne.lat: lat of NE corner of the County's geo-box; must match server's grid-elems
 *       -96.4,       // [6] ne.lng: lng of NE corner of the County's geo-box; must match server's grid-elems
 *       50,          // [7] gridCountLat: number of grid-elems in latitudinal (i.e., North-South) direction
 *       50,          // [8] gridCountLng: number of grid-elems in longituidinal (i.e., East-West) direction
 *       0.0271,      // [9] taxRate: the tax rate of this County as ratio, for example, 0.0271 means 2.71%.
 *       '/data/texas/dallas-county/parcel-grid/{0}',        // [10] gridElemUri
 *       '/data/texas/dallas-county/county/{0}',             // [11] countyDataUri (not currently used)
 *       '//www.dallascad.org/AcctDetailCom.aspx?ID={0}',    // [12] taxUri (not currently used)
 *       '//roamdallaspropertyrecords.com/ailis/search.do?searchType=1&searchable=Name%2CInstrument' +
 *         '%2CRECDATE%2CDESIGSTATUS%2CPartyRole%2CIndexType%2CDocType%2CBook%2CPage%2CLot%2CBlock%2CCityBlock' +
 *         '%2CMapBook%2CMapPage%2CMapInstrumentNumber%2CSubdivision%2CCityTown%2CFreeform%2CLocation' +
 *         '&indexName=dallasclerkopr&templateName=&q={0}',  // [13] clerkUri (not currently used)
 *       'Dallas County-TX'                                  // [14] legacyName (not currently used)
 *     ]
 *
 * @property {!Array<?Array<!rta.Parcel>>} gridElem Logically private - application programmers should ignore
 * this. An array of length `this.gridCountLat * this.gridCountLng`, each of which is either
 * `undefined` or an array of the zero or more non-null, arbitrarily ordered
 * `rta.Parcel` objects that are both within `this` County and within the zero-based
 * `gridElem` index. For example, if `this.gridCountLat` and
 * `this.gridCountLng` are 20 and 30 respectively, then `this.gridElem.length` would be
 * 600.
 *
 * Backdrop: for performance reasons, parcels are retrieved from the server in groups called grid-elems.
 * Grid elems are always rectangular in the non-Euclidian geospatial sense of that word, so you can imagine
 * that each is defined by a rta.GeoBox (though for performance reasons we don't actually create those
 * rta.GeoBox objects). Each County specifies how many grid elems it has, typically in the hundreds or
 * thousands. Each County also defines the span of its grid-elems. Every grid-elem within any given County has
 * the same span, where 'span' is understood in terms of angular measures in the latitude / longitude
 * spherical coordinate system, not in terms of linear measures like miles or meters. There is a simple and
 * fast algorithm to determine the containing grid-elem from the county and a geo-pos.
 *
 * See `this.getParcels()` for the routine that actually loads this.gridElem[]. See also
 * this.gridCountLat and this.gridCountLng
 *
 * @property {!rta.GeoBox} geoBox A geo-box that surrounds all parcels in this County.
 *
 * @property {!string} fullName Fully qualified name of this county and state, for example, `'Dallas
 * County, Texas'`. See this.unqualName and this.stateName
 *
 * @property {!string} unqualName Unqualified name of this county without the corresponding state name, for
 * example, `'Dallas'`. Guarantee: same as the name returned from the geocoder's
 * `'administrative_area_level_2'`. See this.fullName and this.stateName
 *
 * @property {!string} stateName Name of this county's state, for example, `'Texas'`. Guarantee:
 * same as the name returned from the geocoder's `'administrative_area_level_1'`. See
 * this.countyName and this.fullName
 *
 * @property {!number} taxRatePct The tax rate of this County as a percentage, for example, 2.71 means 2.71%.
 * See also this.taxRateRatio
 *
 * @property {!number} taxRateRatio The tax rate of this County as a ratio, for example, 0.0271 means 2.71%.
 * See also this.taxRatePct
 *
 * @property {!number} gridCountLat Logically private: should be ignored by apps programmers. The number of
 * grid-elems in the latitudinal (i.e., North-South) direction. See this.gridElem for semantics. See also
 * this.getParcels() for how it is used.
 *
 * @property {!number} gridCountLng Logically private: should be ignored by apps programmers. The number of
 * grid-elems in the longitudinal (i.e., East-West) direction. See this.gridElem for semantics. See also
 * this.getParcels() for how it is used.
 *
 * @property {!string} gridElemUri A URI pattern used to retrieve the grid-elems for this County. This is in a
 * form suitable to be passed as the `template` arg of `rta.interpolate()`. See
 * this.getParcels()
 *
 * @property {!string} legacyName Deprecated - instead use this.fullName or this.unqualName or this.stateName.
 *
 * TODO: Can we drop legacyName? If not, what is a reasonably precise description?
 */
rta.County = function County(raw) {
  if (raw[0] === 4 && raw.length === 12) {
    this.unqualName = raw[1];
    this.stateName = raw[2];
    this.geoBox = new rta.GeoBox(new rta.GeoPos(raw[3], raw[4]), new rta.GeoPos(raw[5], raw[6]));
    this.gridCountLat = raw[7];
    this.gridCountLng = raw[8];
    this.taxRate = raw[9];
    this.gridElemUri = raw[10];
  } else {
    rta.internalError('Invalid county-raw-data: {0.source(2)}', raw);
    throw new Error('Internal Error: invalid county-raw-data');
  }

  this.gridElem = this.gridCountLat * this.gridCountLng === 1 ?
    [void 0] :  // paranoia: unlikely to happen, but if it did, prevent the SERIOUS problems that would result from new Array(1)
    new Array(this.gridCountLat * this.gridCountLng);

  // Maintenance note: Do NOT change the next line: this.unqualName, this.stateName, and this.fullName are
  // 'tied' to each other via function fullCountyName(). You are allowed to change the raw info's countyName
  // and/or stateName, and/or you can change the algorithm within function fullCountyName(); but you must
  // retain the 'tie' between those three properties and that function:
  this.fullName = fullCountyName(this.unqualName, this.stateName);
};

/**
 * Synchronously returns an array with one element for each of the known counties. Each array element contains
 * some basic information about the county.
 *
 * FUTURE: return this info from the server and change the semantics to asynchronous.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @return {Array<object>} Each returned object contains at least these fields:
 *
 *     {
 *       countyName: 'Dallas',     // County name; must match geocoder result for type 'administrative_area_level_2'
 *       stateName: 'Texas',       // State name; must match geocoder result for type 'administrative_area_level_1'
 *       box: new rta.GeoBox(...)  // A geo-box that encompassing the County
 *     }
 */
rta.County.names = function names() {
  return Object.keys(countyRawInfo).map(function handleCounty(key) {
    var raw = countyRawInfo[key];
    if (raw[0] === 1) {
      return {
        countyName: raw[1],
        stateName: raw[2],
        box: new rta.GeoBox(new rta.GeoPos(raw[3], raw[4]),
                            new rta.GeoPos(raw[5], raw[6]))
      };
    } else {
      rta.internalError('Invalid county-raw-data: {0.source(2)}', raw);
      throw new Error('Internal Error: invalid county-raw-data');
    }
  });
};

/**
 * Synchronously returns the one and only, unique County object that has the specified county/state name, or
 * throws an exception if that county/state name is unsupported.
 *
 * The returned object is "by identity," meaning the same[*] county/state names will always produce the
 * exact same identical County object, and distinct[*] names will always produce distinct County objects.
 *
 * [*]Both name-parameters are case-insensitive, so `rta.County.byName('Dallas','Texas')` will
 * return the same identical reference as `rta.County.byName('DaLLaS','teXAs')` - either both will
 * return the same identical `rta.County` object or both will throw an exception.
 *
 * Postconditions (assuming the call does not throw an exception):
 *
 *  - rta.County.byName(c, s).countyName.toLowerCase() === c.toLowerCase()
 *  - rta.County.byName(c, s).stateName.toLowerCase() === s.toLowerCase()
 *
 * Performance note: extremely efficient; you may reasonably call this inside an inner loop.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!string} countyName The proper name of the county, e.g., 'Dallas'. Case insensitive, so 'DaLLaS'
 * and 'Dallas' are equivalent.
 *
 * @param {!string} stateName The proper name of the county's state, e.g., 'Texas'. Case insensitive, so
 * 'teXAs' and 'Texas' are equivalent.
 *
 * @return {rta.County} The named County, or null if that county name is unsupported.
 *
 * @throws {Error} If the `countyName` and `stateName` represent an unsupported County.
 */
rta.County.byName = function byName(countyName, stateName) {
 var key = fullCountyName(countyName, stateName).toLowerCase();

  var ans = countyObjects[key];
  if (ans) {
    return ans;
  }

  var raw = countyRawInfo[key];
  if (!raw) {
    rta.error('Unsupported County: {0}', fullCountyName(countyName, stateName));
    throw new Error('Unsupported County: ' + fullCountyName(countyName, stateName));
  }

  rta.debug('new rta.County({0[1].source}, {0[2].source}); this is County object# {1}', raw, Object.keys(countyObjects).length + 1);
  // FUTURE: Watch the logged cache-size to see if users (contrary to expectations) wander into many different
  // counties during the same session. If so, add this.lastUsed to the County object, insert
  // ans.lastUsed = performance.now(); just before the return ans below, then add
  // this logic here:
  //
  // if (Object.keys(countyObjects).length >= rta.County.MAX_IN_MEMORY) {
  //   var keyOfOldest = Object.keys(countyObjects).reduce(function(oldest, next) {
  //     return countyObjects[next].lastUsed < countyObjects[oldest].lastUsed ? next : oldest;
  //   });
  //   delete countyObjects[keyOfOldest];
  // }
  //
  // Note: At this time it appears smarter to cull the list of rta.Parcel objects rather than the list of
  // rta.County objects. If so, the onus would be on rta.County.prototype.getParcels() instead.

  ans = countyObjects[key] = new rta.County(raw);
  return ans;
};

/**
 * Synchronously returns the County that contains the specified geocoder result, or throws an exception if the
 * geocoder result is from an unsupported County.
 *
 * The returned object is "by identity," meaning the same geo-pos will always produce the exact same
 * identical County object.
 *
 * This function has no side-effects.
 *
 * @static
 *
 * @param {!Object} geocoderResult One of the result-elements passed into the 'results' parameter of the
 * callback to google.maps.Geocoder.geocode(). Must be an object with these properties:
 *
 *     {
 *       types: Array<string>,
 *       formatted_address: string,
 *       address_components: Array<{
 *         short_name: string,
 *         long_name: string,
 *         types: Array<string>
 *       }>,
 *       geometry: {
 *         location: rta.GeoPos,
 *         location_type: google.maps.GeocoderLocationType
 *         viewport: rta.GeoBox,
 *         bounds: rta.GeoBox
 *       }
 *     }
 *
 * @return {rta.County} The County containing the geocoded location.
 *
 * @throws {Error} If the `geocoderResult` represents a geolocation within an unsupported County.
 */
rta.County.byGeocoderResult = function byGeocoderResult(geocoderResult) {
  // Step 1: look for countyName and stateName in geocoderResult.address_components[]:
  var countyName, stateName, i;
  geocoderResult.address_components.forEach(function handleGeocoderAddressComponent(x) {
    if (x.types[0] === 'administrative_area_level_2') {

      countyName = x.long_name;   //3/5/2014 google geocoder suddenly returns ' County' appended to countName!!
        i = countyName.indexOf(' County');
        if (i < 0) i = countyName.length;
        countyName = countyName.slice(0, i);
    } else if (x.types[0] === 'administrative_area_level_1') {
      stateName = x.long_name;
    }
  });

  return rta.County.byName(countyName || '?', stateName || '?');
};

/**
 * Gets (via callback, possibly asychronously) all rta.Parcel objects that are both within the specified
 * geo-region and within 'this' County.
 *
 * Very efficient: avoids large/slow network responses (chops the County's parcels into smallish chunks,
 * and can often avoid network requests entirely by keeping track of which of these chunks have already been
 * loaded).
 *
 * @param {rta.GeoBox|rta.GeoCircle|rta.GeoPolygon|rta.GeoPatches} region The geo-region that delimits the
 * desired parcels. It is not an error if the desired region has no parcels, even if it is completely outside
 * the county.
 *
 * @param {Function(Array<rta.Parcel>)} [opt_whenDone] Callback which, if provided, is passed an array of
 * the zero or more rta.Parcel objects that are within both 'this' County and the specified geo-box. Might be
 * called immediately (synchronously, before the function returns) or might be called asychronously (e.g., if
 * it detects the need to perform network transactions).
 */
rta.County.prototype.getParcels = function getParcels(region, opt_whenDone) {
  var self = this;
  var gridIndices = [];

  var intersection = self.geoBox.intersection(region.geoBox());
  if (intersection) {
    var integralRatio = function integralRatio(count, actual, min, max) {
      var n = Math.floor(count * (actual - min) / (max - min));
      return n < 0 ? 0 : n >= count ? count - 1 : n;
    };
    var iLatMin = integralRatio(self.gridCountLat, intersection.sw().lat(), self.geoBox.sw().lat(), self.geoBox.ne().lat());
    var iLatMax = integralRatio(self.gridCountLat, intersection.ne().lat(), self.geoBox.sw().lat(), self.geoBox.ne().lat());
    var iLngMin = integralRatio(self.gridCountLng, intersection.sw().lng(), self.geoBox.sw().lng(), self.geoBox.ne().lng());
    var iLngMax = integralRatio(self.gridCountLng, intersection.ne().lng(), self.geoBox.sw().lng(), self.geoBox.ne().lng());
    for (var iLat = iLatMin; iLat <= iLatMax; iLat++) {
      for (var iLng = iLngMin; iLng <= iLngMax; iLng++) {
        gridIndices.push(self.gridCountLng * iLat + iLng);
      }
    }
  }
  // Create an HTTP request for each grid-elem that is both in intersection AND not already loaded.
  var requests = gridIndices.filter(function checkGridElem(gridIndex) {
    return !self.gridElem[gridIndex];
  }).map(function makeGridElemQuery(gridIndex) {
    return {
      method: 'GET',
      uri: rta.interpolate(self.gridElemUri, gridIndex),
      parseJson: true,
      gridIndex: gridIndex
    };
  });

  // TODO: Change this to use the Promise API. This should return an array of Promise objects, one for EACH of
  // the grid-elems INCLUDING the grid-elems that are already loaded into memory. This should return a single
  // 'master' promise. This master-promise should allow registration of callbacks for 'progress', 'done', and
  // 'error'. RESULT.progress(X) would register a 'progress' callback on the master-promise, which would be
  // implemented by looping through the individual promises, registering that same callback X as a 'done'
  // callback on each. The final 'done done' callback (RESULT.done(Y)) would not be passed the list of matched
  // parcels, since that would require us to keep all the parcels in memory for longer. That might mean
  // callers NEED to register a progress-callback to get the parcels, which is certainly inconvenient (the
  // results will always come to them piecemeal), but it MIGHT be expedient. However if the individual
  // promises cache their FILTERED results, it would be cheap to concat those result-arrays one last time:
  // master_promise.call_success_handlers(rta.flattenArrayOnce(mini_promise_list.map(function(p){return
  // p.array_of_results}))).
  rta.httpMulti(requests,
                function handleOneResponse(response) {
                  if (self.gridElem[response.request.gridIndex]) {
                    // skip grid-elems that were asynchronously loaded by another request (race case)
                  } else if (response.isSuccess && response.parsed) {
                      self.gridElem[response.request.gridIndex] = response.parsed.map(function(rawParcel, i) {
                          return new rta.Parcel(rawParcel, self);
                      });
                  } else {
                    // TODO: Should we call the failure handler here??
                    rta.error('Cannot Load Grid-Elem: {0.statusText}', response);
                  }
                },
                function handleAllResponses(/*responses ==> ignored; we care WHERE parcels are, not whether they were loaded now vs. previously*/) {
                  if (opt_whenDone) {
                    opt_whenDone(rta.flattenArrayOnce(gridIndices.map(function handleGridElem(gridIndex) {
                      return (self.gridElem[gridIndex] || []).filter(function handleParcel(parcel) {
                        return region.contains(parcel);
                      });
                    })));
                  }
                });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.Geocoder //////////////////////////////////////////////////////////////////////////////////////////////

var geocodeCacheKey = function geocodeCacheKey(address, geoBox) {
  return (geoBox ? geoBox.toString() : 'no-geo-box') + ': ' + address.trim().toLowerCase();
};

/**
 * Maps from `geocodeCacheKey(address, geoBox)` to an Object containing these properties:
 *
 *  - `whenConfirmed`: a timestamp of when the address was last looked up via the cloud service.
 *  - `whenUsed`: a timestamp of when the address was last used by the client-program.
 *  - `results`: an array of zero-or-more geocoder-result objects.
 *
 * @api private
 */
var geocodeCache = {};

/**
 * Gets the geocoder results for the specified address and geoBox. These results are always returned via
 * callback, and are often (but not always!!) returned asynchronously - you the caller must be prepared for
 * the possibility that the callback might get called before this function returns.
 *
 * Never returns anything or throws an exception. Results are provided exclusively via the callbacks, never
 * via `return` or `throw`.
 *
 * TODO: use the Promise Pattern, then fix the sloppy "often...not always...possibility...might" postcondition.
 *
 * TODO: clean up the Google geocoder result-object: camelCase names, preprocess results[i].types, etc.
 *
 * @static
 *
 * @param {string} address The address to be geocoded, e.g., `"37 Main St, Richardson, TX"`.
 *
 * @param {rta.County|rta.GeoBox|rta.GeoCircle|rta.GeoPolygon|rta.GeoPatches|undefined|null} bounds An
 * optional boundary that, if provided, restricts the returned results. Use this to resolve ambiguous
 * addresses and/or to eliminate impossible results.
 *
 * @param {number} [opt_minResults=0] Used to demand a certain minimum number of results, usually 0 (which
 * means optional) or 1 (which means required). If fewer than this many results can be found, calls
 * `onfailure` even if the geocoder was successfully able to resolve the `address`. Pass
 * `0` if you don't care.
 *
 * @param {number} [opt_maxResults=1] Used to forbid ambiguous results, or perhaps "too" ambiguous. If the
 * geocoder succeeds but returns more than this many results, calls `onfailure`. Pass
 * `1` if you want a unique address; pass `Infinity` if you are willing to accept an
 * arbitrary number of results.
 *
 * @param {function(Array<Object>)} [onsuccess] Called when successful, passing a non-null array of
 * `opt_minResults` to `opt_maxResults` geocoder-result objects. Reminder:
 * `onsuccess()` might get called before `geocode()` returns.
 *
 * @param {function(Object)} [onfailure] Called when the geocoder fails (network error, etc.) *or* if
 * the geocoder succeeds but returns fewer than `opt_minResults` results *or* if the
 * geocoder succeeds but returns more than `opt_maxResults` results. Reminder:
 * `onfailure()` might get called before `geocode()` returns.
 */
rta.geocode = function geocode(address, bounds, opt_minResults, opt_maxResults, onsuccess, onfailure) {
  opt_minResults = typeof opt_minResults === 'number' && opt_minResults === opt_minResults ? opt_minResults : 0;
  opt_maxResults = typeof opt_maxResults === 'number' && opt_maxResults === opt_maxResults ? opt_maxResults : 1;
  onsuccess = onsuccess || function() {};
  onfailure = onfailure || function() {};
  var done = function done(results) {
    if (results.length < opt_minResults) {
      onfailure({
        message: (results.length === 0 ? 'Unknown Address' :      // they wanted something but got nothing (typical)
                  results.length === 1 ? 'Unambiguous Address' :  // they wanted 2+ but got just 1 (hmmm)
                  'Not Ambiguous Enough'),                        // they got 2+, but it still wasn't enough (hmmm)
        address: results.length ? results.map(function getBeautifiedAddress(r) { return r.formatted_address; }).join('\n') : address
      });
    } else if (results.length > opt_maxResults) {
      onfailure({
        message: (opt_maxResults === 0 ? 'Not Unknown' :          // they wanted nothing but got something (hmmm)
                  opt_maxResults === 1 ? 'Ambiguous Address' :    // they wanted one but got more than one (typical case)
                  'Address is Too Ambiguous'),                    // they wanted 2+ but got too many (hmmm)
        address: results.length ? results.map(function getBeautifiedAddress(r) { return r.formatted_address; }).join('\n') : address
      });
    } else {
      onsuccess(results);
    }
  };
  var geoBox
    = !bounds || rta.typeName(bounds) === 'GeoBox' ? bounds                   // use bounds itself if it's null/undef or a GeoBox
    : bounds.geoBox && typeof bounds.geoBox === 'function' ? bounds.geoBox()  // call its geoBox method (a geo-region object?)
    : bounds.geoBox ? bounds.geoBox                                           // use its geoBox property (an rta.County object?)
    : bounds;                                                                 // leave it as-is; we don't know what it is; an error??

  var now = Date.now();
  var key = geocodeCacheKey(address, geoBox);
  var cached = geocodeCache[key];
  if (cached) {
    cached.whenUsed = now;
    done(cached.results);  // TODO: change this to Promises so the callback will ALWAYS occur after we return...
    return void 0;
  }
 // new google.maps.Geocoder().geocode({address: address, bounds: geoBox}, function handleGeocoderResults(results, status) {
    new google.maps.Geocoder().geocode({address: address}, function handleGeocoderResults(results, status) {
    // Paranoia: coalesce multiple results that have the same formatted_address.
    // E.g., one with the rooftop's lat/lng and another with an interpolated lat/lng.
    results = rta.distinct(results || [], function preprocessAddress(r) {
      return r.formatted_address.toLowerCase();
    });

    if (status === google.maps.GeocoderStatus.OK ||
        status === google.maps.GeocoderStatus.ZERO_RESULTS) {
      // FUTURE: implement an LRU strategy if Object.keys(geocodeCache).length gets too large
      geocodeCache[key] = {
        whenConfirmed: now,
        whenUsed: now,
        results: results
      };
      done(results);
    } else {
      // 'status' is probably 'ERROR', 'INVALID_REQUEST', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR'.
      // Don't cache it in case it is a transient error.
      onfailure({message: 'Geocoder ' + rta.toTitleCase(status.replace(/_/g, ' ')), address: address});
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.Parcel ////////////////////////////////////////////////////////////////////////////////////////////////

var LANDUOM_BY_INDEX = [
  {index: 0, name: 'SQFT',    toSqftFactor: 1},
  {index: 1, name: 'ACRE',    toSqftFactor: 43560},
  {index: 2, name: 'UNKNOWN', toSqftFactor: 0},
  {index: 3, name: 'LOT',    toSqftFactor: 0},
  {index: 4, name: 'FRONTFT', toSqftFactor: 0}
];

var LANDUOM = rta.LANDUOM = {};
LANDUOM_BY_INDEX.forEach(function(uom) {
  LANDUOM[uom.name] = uom;
});
LANDUOM['FLAT'] = LANDUOM.LOT;
LANDUOM['FLAT PRICE'] = LANDUOM.LOT;
LANDUOM['SQUARE FEET'] = LANDUOM['SQUARE FOOT'] = LANDUOM.SQFT;
LANDUOM['FRONT FEET'] = LANDUOM['FRONT FOOT'] = LANDUOM.FRONTFT;
LANDUOM['UNASSIGNED'] = LANDUOM['MIXED'] = LANDUOM[''] = LANDUOM.UNKNOWN;

/**
 * Maps CDU-level (0=worst, 7=best) to the Title-Case version of the CDU Name.
 *
 * @api private
 * @const
 * @static
 */
var CDU_LEVEL_TO_TCNAME = [
  'Unsound',
  'Very Poor',
  'Poor',
  'Fair',
  'Average',
  'Good',
  'Very Good',
  'Excellent',
  'Unknown'
];

/**
 * Maps CDU-name (all lowercase, no spaces) to CDU numeric level.
 * Numeric levels are 0 (worst) through 7 (best).
 *
 * @api private
 * @const
 * @static
 */
var CDU_LCNAME_TO_LEVEL = {};
CDU_LEVEL_TO_TCNAME.forEach(function addCduNameToLevel(tcname, level) {
  CDU_LCNAME_TO_LEVEL[tcname.replace(/ /g, '').toLowerCase()] = level;
});

/**
 * Constructor for rta.Parcel. This is logically private - it should be called by county.getParcels() only,
 * never by an apps-programmer.
 *
 * @class rta.Parcel
 * @constructor
 * @this {rta.Parcel}
 *
 * @param {!Array} raw The raw info from the server that lets us initialize `this` rta.Parcel
 * object.
 *
 * @param {!Array} county The rta.County object to which this Parcel belongs.
 *
 * @property {number} cduLevel The property's numeric condition/desirability/utility: 0 (worst) through 7
 * (best). See also this.cduName
 *
 * @property {string} cduName The property's human-readable condition/desirability/utility: 'Unsound', 'Very
 * Poor', 'Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Excellent' (in order from worst to best). See also
 * this.cduLevel
 *
 * @property {string} countyName Same as `this.county().fullName`, that is, the full county and
 * state name of this parcel's rta.County. For example, `'Dallas County, Texas'`. See also
 * this.county()
 *
 *
 * @property {rta.GeoPos} geoPos The geo-pos of this parcel.
 *
 * @property {number} gridIndex The county-specific grid-index containing this parcel. Beware: this is not a
 * good measure of "nearness": a parcel could have a vastly different `gridIndex` as its next door
 * neighbor, but have the same `gridIndex` as a parcel that has many parcels in between.
 *
 * @property {boolean} hasPool True if the parcel has a pool.
 *
 * @property {boolean} hasSauna True if the parcel has a sauna.
 *
 * @property {boolean} hasSpa True if the parcel has a spa.
 *
 * @property {number} houseAge House/improvement's age in years, based on Effective Year Built. See
 * this.houseYearBuilt
 *
 * @property {number} houseNumBaths Effective total number of bathrooms in this parcel = full-baths plus half
 * the number of half-baths. Invariant: `this.houseNumBaths === this.houseNumFullBaths +
 * this.houseNumHalfBaths/2`. See this.houseNumFullBaths and this.houseNumHalfBaths
 *
 * @property {number} houseNumBedrooms Number of bedrooms in this parcel.
 *
 * @property {number} houseNumFullBaths Number of full-bathrooms in this parcel. See this.houseNumBaths and
 * this.houseNumHalfBaths
 *
 * @property {number} houseNumHalfBaths Number of half-bathrooms in this parcel. See this.houseNumBaths and
 * this.houseNumFullBaths
 *
 * @property {number} houseNumSqft Number of square feet in the house/improvement.
 *
 * @property {number} houseNumStories Number of stories in this parcel's house/improvement, for example, 1.0,
 * 1.5, 2.0, etc. Will be 0 if this parcel either does not have a house/improvement or the number of stories
 * unknown,
 *
 * @property {number} houseVal Dollar-amount of the house/improvement.
 *
 * @property {number} houseValPerSqft House-dollars per house-square-foot.
 *
 * @property {number} houseYearBuilt Effective Year Built of this parcel's house/improvement, e.g., 1978. See
 * this.houseAge
 *
 * @property {string} id County-specific parcel-ID. Guaranteed to be unique within this.county(), but not
 * guaranteed to be unique across different counties.
 *
 * @property {number} landAdjustmentPct Percentage of change in land value due to local conditions.
 * Specifically, this is the percentage of ___ to ___. Allowed range: ___(-100.0??) to ___(100.0??). See also
 * this.landAdjustmentRatio
 * TODO: this.landAdjustmentPct needs description & semantics. Rename based on semantics.
 *
 * @property {number} landAdjustmentRatio Ratio of change in land value due to local conditions. Specifically,
 * this is the ratio of ___ to ___. Allowed range: ___(-1.0??) to ___(1.0??). See also this.landAdjustmentPct.
 * TODO: this.landAdjustmentRatio needs description & semantics. Rename based on semantics.
 *
 * @property {number} landNumSqft Land size in sqft, or 0 if `this.landUom` is neither `LANDUOM.ACRE` nor
 * `LANDUOM.SQFT`.
 *
 * @property {number} landNumUnits Land size in whatever land-units are specified in `this.landUom`.
 *
 * @property {object} landUom Always refers to one of the members of rta.LANDUOM[...], that is, to
 * rta.LANDUOM.ACRE or rta.LANDUOM.SQFT or rta.LANDUOM.FLAT or rta.LANDUOM.FRONTFT or rta.LANDUOM.UNKNOWN. The
 * referrent-object has properties `index` (an integer), `name` (a string), and `toSqftFactor` (a non-negative
 * number). For example, `{index: 1, name: 'ACRE', toSqftFactor: 43560}`.
 *
 * @property {number} landVal Dollar-amount of the land.
 *
 * @property {number} landValPerSqftLand - Land-dollars per land-square-foot, or 0 if `this.landUom` is
 * neither `LANDUOM.ACRE` nor `LANDUOM.SQFT`.
 *
 * @property {number} landValPerUnit Land-dollars per whatever land-units are specified in `this.landUom`.
 *
 * @property {string} landZoning DESCRIPTION IS TBD.
 * TODO: landZoning needs description & semantics. Is it open-ended string? enum? Rename based on semantics.
 *
 * @property {string} mapsco A string describing the MAPSCO area, or '' if that is unknown.
 *
 * @property {string} nhood County-specific neighborhood-ID. Guaranteed to be unique within `this.county()`,
 * but not guaranteed to be unique across different counties.
 *
 * @property {!Array<string>} ownerNames Array containing the name(s) of the parcel's owner(s). Never null,
 * though it can be zero-length, e.g., if owners are not currently known.
 *
 * @property {number} otherVal Dollar-amount of the parcel not including `this.LandVal` and `this.houseVal`.
 *
 * @property {Array<string>} parcelAcctIds Array containing county-specific account IDs of the parcel (not IDs
 * of the owner). Never null, though it can be zero-length, e.g., if parcel acct IDs are not currently known.
 * TODO: how is a parcelAcctIds different from a parcelId?
 *
 * @property {string} partialAddress The parcel's address, likely incomplete, may or may not be resolvable via
 * geocoder. See `this.getBeautifiedAddress()`
 *
 * @property {number} totalVal Total dollar-amount of the land plus improvements/house plus other
 * (`this.totalVal === this.landVal + this.houseVal + this.otherVal`).
 */
/*rta.Parcel = function Parcel(raw, county) {
  this.countyName = county.fullName;
  var rawFormatVersion = '';
  var initMethod = rta.Parcel.prototype['_initV4' + rawFormatVersion];
  if (initMethod) {
    initMethod.call(this, raw, county);
  } else {
    rta.internalError('County {0.fullName} has invalid parcel-raw-data: {1.source(2)}', county, raw);
    throw new Error('Internal Error: invalid parcel-raw-data');
  }

  // Paranoia: confirm the County's GeoBox contains this.geoPos
  if (!county.geoBox.contains(this)) {
    rta.error('{0.fullName} box {0.geoBox} does not contain {1.geoPos} = parcel# {1.id} at {1.partialAddress}', county, this);
  }
};  */

/**
 * Helper-function to initialize the `this` object on behalf of the rta.Parcel constructor. This is
 * logically private - it should be called by rta.Parcel() ctor only, never by an apps-programmer.
 *
 * @api private
 * @this {rta.Parcel}
 *
 * @param {!Array} raw The raw info from the server that lets us initialize `this` rta.Parcel object.
 */
rta.Parcel = function Parcel(raw, county) {
    this.countyName = county.fullName;
  // Mapping from index of raw[] to property-name:

  // Index  Property-Name      Description or Required Transformation
  // =====  =============      ======================================
  //   0    (N/A)              Always 4; the version# of 'raw' format
  //   1    gridIndex          (none)
  //   2    id                 (none)
  //   3    parcelAcctIds      (none)
  //   4    ownerNames         (none)
  //   5    partialAddress     Arrives as an Array<string>; must be joined
  //   6    geoPos.lat         (none)
  //   7    geoPos.lng         (none)
  //   8    houseVal           (none)
  //   9    landVal            (none)
  //  10    (N/A)              Set this.totalVal to this.houseVal + this.landVal + raw[9]
  //  11    houseNumSqft       (none)
  //  12    landUom (sort of)  0=sqft, 1=acre, 2=unknown, 3=flat, 4=frontft, 5=mixed; xform -1 and 5 to 2=unknown
  //  13    landNumUnits       (none)
  //  14    houseYearBuilt     (none)
  //  15    landValPerUnit     (none)  QUESTION: Why send this? Is this not == this.landVal / this.landNumUnits?
  //  16    houseNumBedrooms   Uses -1 for unknown; but xform -1 to 0
  //  17    houseNumFullBaths  Uses -1 for unknown, but xform -1 to 0
  //  18    houseNumHalfBaths  Uses -1 for unknown, but xform -1 to 0
  //  19    houseNumStories    Uses -1 for unknown, but xform -1 to 0
  //  20    cduLevel           Rename cduLevel to cduIndex; add 8 to mean 'Unknown'
  //  21    hasPool            this.hasPool  = raw[21] === 1 (raw[21] is (-1,0,1) for (unknown,false,true))
  //  22    hasSpa             this.hasSpa   = raw[22] === 1 (raw[22] is (-1,0,1) for (unknown,false,true))
  //  23    hasSauna           this.hasSauna = raw[23] === 1 (raw[23] is (-1,0,1) for (unknown,false,true))
  //  24    mapsco             {string}; this is a new field to be added
  //  25    ownerAddress       array of String
  //  26    deedDate           String date of deed transfer, could be ''
  //  27    homesteaded      (-1,0,1) for (unknown,false,true) homesteaded?
  //  28    senior           (-1,0,1) for (unknown,false,true) 65+?
  //  29    disableded       (-1,0,1) for (unknown,false,true) normal disabled?
  //  30    vet              (-1,0,1) for (unknown,false,true) veteran disabled?
  //  31    homesteadable    (-1,0,1) for (unknown,false,true) eligible for homesteading?
  //  32    deferred        (-1,0,1) for (unknown,false,true) has owner deferred paying taxes?
  //  33    totalTaxVal         how much for property taxes
  //  34    homesteadWorthVal   dollar value of homestead exemption
  this.county= county;
  this.gridIndex = requiredInt(1, 0, county.gridCountLat * county.gridCountLng);
  this.id = raw[2];
  this.parcelAcctIds = requiredArray(3, 'string', 1).join('/').replace(/\s+/g, ' ').trim();
  this.ownerNames = requiredArray(4, 'string', 1);
  this.partialAddress = requiredArray(5, void 0, 1).join(' ').replace(/\s+/g, ' ').trim();
  this.geoPos = new rta.GeoPos(requiredFloat(6, -90, 90), requiredFloat(7, -180, 180));
  this.lat =  requiredFloat(6, -90, 90);
  this.lng =  requiredFloat(7, -180, 180);
  this.houseVal = requiredFloat(8, 0, 100*1000*1000);  //mg 102313 used to be min of 1
  this.landVal = requiredFloat(9, 0, 100*1000*1000);   //mg 102313 used to be min of 1
  this.otherVal = requiredFloat(10, 0, 100*1000*1000); //mg 102113 used to require min value of 1--bad idea
  this.houseNumSqft = requiredInt(11, 0, 100*1000*1000);  //mg 102113 used to have min 1
  var raw12 = requiredInt(12, -1, 5);
  this.landUom = (raw12 === -1 || raw12 === 5 || raw12 === 8) ? 'UNKNOWN' : LANDUOM_BY_INDEX[raw12].name;
  this.landNumUnits = requiredFloat(13, 0); //could have less than 1 acre, eg 5419 Bent Tree has 0.54 acres mg 102213
  this.houseYearBuilt = Math.max(1900, requiredInt(14, -1, new Date().getFullYear())); //mg 102213 optional field
  // TODO: Why send raw[15] at all? Is it not this.landVal / this.landNumUnits?   //no, it is not, particularly in Dallas
  this.landValPerUnit = requiredFloat(15, 0, 100*1000*1000);//mg 102213
  this.houseNumBedrooms = requiredInt(16, -1, 20);
  this.houseNumFullBaths = requiredInt(17, -1, 20);
  this.houseNumHalfBaths = requiredInt(18, -1, 20);
  this.houseNumStories = requiredFloat(19, -1, 5);  // can have 1.5 stories
  this.cduLevel = requiredInt(20, 0, CDU_LEVEL_TO_TCNAME.length - 1);
  this.hasPool = requiredInt(21, -1, 1);
  this.hasSpa = requiredInt(22, -1, 1);
  this.hasSauna = requiredInt(23, -1, 1);
  this.mapsco = requiredString(24); //mg 102213
  this.ownerAddresses = requiredArray(25, 'string', 1);
  this.deedDate = requiredString(26);
  var firstSpace = this.deedDate.indexOf(' ');
  this.deedDate = firstSpace < 0 ? this.deedDate : this.deedDate.slice(0, firstSpace);
  this.homesteaded = requiredInt(27, -1, 1);
  this.senior = requiredInt(28, -1, 1);
  this.disabled = requiredInt(29, -1, 1);
  this.vet = requiredInt(30, -1, 1);
  this.homesteadable = requiredInt(31, -1, 1);
  this.deferred= requiredInt(32, -1, 1);
  this.totalTaxVal = parseFloat(requiredString(33));
  this.totalTaxVal = Math.floor(this.totalTaxVal / 100.0)  * 100;
  this.homesteadWorthVal = parseFloat(requiredString(34));
  this.homesteadWorthVal = Math.floor(this.homesteadWorthVal / 50.0) * 50;
  ////////////////////////////////////////////////////////////////////////
  // Computed properties; we set these after setting the stated properties
  // TODO: Change all(?) these to getters, that way they will stay current after changes; add setters which change the underlying 'real' value
  this.ownerAddressDesc = this.ownerAddresses.join(' ').replace(/\s+/g, ' ').replace(/\b(\d\d\d)(\d\d\d)$/, '$1-$2').trim();
  this.ownerNameDesc = this.ownerNames.join(' ').replace(/\s+/g, ' ').replace(/\b(\d\d\d)(\d\d\d)$/, '$1-$2').trim();
  this.houseAge = new Date().getFullYear() - this.houseYearBuilt;  // TODO: or add one if more than half-way through the year??
  this.houseAgeDesc = this.houseYearBuilt == 1900 ? '?' : new Date().getFullYear() - this.houseYearBuilt;  // TODO: or add one if more than half-way through the year??
  this.houseYearBuiltDesc = this.houseYearBuilt == 1900 ? '?' : this.houseYearBuilt;
  this.cduName = CDU_LEVEL_TO_TCNAME[this.cduLevel];
  this.totalVal = this.houseVal + this.landVal + this.otherVal;
  this.savingsWorth = this.totalVal == 0 ? 0 : this.totalTaxVal / this.totalVal;
  this.houseValPerSqft = this.houseNumSqft ? Math.min(399, this.houseVal / this.houseNumSqft) : 399; // mg102413 complicated story
  if (this.cduLevel == 8) this.cduName = '?';
  this.misc = (this.hasPool === 1 ? 'Pool ' : '') +
      (this.hasSpa === 1 ? ' Spa ' : '') +
      (this.hasSauna === 1  ? ' Sauna ' : '').replace(/\s+/g, ' ').trim();
  if (this.misc.length === 0) {
      this.misc = 'None';
  }
  this.houseNumStoriesDesc = this.houseNumStories == -1 ? '?' : this.houseNumStories.toString();
  this.deedDateDesc = this.deedDate === -1 ? '?' : this.deedDate;
  this.homesteadedDesc = ['?', 'No', 'Yes'][this.homesteaded + 1];
  this.homesteadableDesc = ['?', 'No', 'Yes'][this.homesteadable + 1];
  this.seniorDesc = ['?', 'No', 'Yes'][this.senior + 1];
  this.disabledDesc = ['?', 'No', 'Yes'][this.disabled + 1];
  this.vetDesc = ['?', 'No', 'Yes'][this.vet + 1];
  this.deferredDesc = ['?', 'No', 'Yes'][this.deferred + 1];
  this.houseNumFullBathsDesc = this.houseNumFullBaths === -1 ? '?' : this.houseNumFullBaths.toString();
  this.houseNumHalfBathsDesc = this.houseNumHalfBaths === -1 ? '?' : this.houseNumHalfBaths.toString();
  this.houseNumBedroomsDesc = this.houseNumBedrooms === -1 ? '?' : this.houseNumBedrooms.toString();
  this.totalValDesc = '$ ' +  rta.addCommas(this.totalVal);
  this.houseValDesc = '$ ' +  rta.addCommas(this.houseVal);
  this.landValDesc = '$ ' +  rta.addCommas(this.landVal);
  this.otherValDesc = '$ ' +  rta.addCommas(this.otherVal);
  this.totalTaxDesc =  '$ ' +  rta.addCommas(this.totalTaxVal);
  this.homesteadWorthDesc = '$ ' +  rta.addCommas(this.homesteadWorthVal);
  this.houseNumSqftDesc = rta.addCommas(this.houseNumSqft) + ' sqft';
  this.landDesc = rta.addCommas(this.landNumUnits) + ' ' + this.landUom;
  function requiredString(i, opt_regexp) {
    var ans = raw[i];
    if (opt_regexp && !opt_regexp.test(ans)) {
      fieldError(i, 'does not match ' + rta.toSource(opt_regexp));
    }
    return ans;
  }

  function requiredArray(i, opt_elemType, opt_minLen, opt_maxLen) {
    var ans = raw[i];
    var errmsg
      = !Array.isArray(ans) ? 'is not an array'
      : typeof opt_minLen === 'number' && ans.length < opt_minLen ? 'fewer than ' + opt_minLen + ' elems'
      : typeof opt_maxLen === 'number' && ans.length > opt_maxLen ? 'more than ' + opt_maxLen + ' elems'
      : opt_elemType && ans.some(function(elem) { return typeof elem !== opt_elemType; }) ? 'has non-' + opt_elemType + ' elems'
      : null;
    if (errmsg) {
      fieldError(i, errmsg);
      ans = [];
      if (opt_minLen) {
        var elem = !opt_elemType || opt_elemType === 'string' ? 'x' : opt_elemType === 'number' ? 0 : '?';
        while (ans.length < opt_minLen) {
          ans.push(elem);
        }
      }
    }
    return ans;
  }

  function requiredInt(i, opt_min, opt_max) {
    var ans = raw[i];
    if (typeof ans !== 'number' || ans !== ans) {
      fieldError(i, 'not a number');
      ans = typeof opt_min !== 'number' ? 0
        : typeof opt_max !== 'number' ? opt_min
        : Math.floor((opt_min + opt_max) / 2);
    } else if (typeof opt_min === 'number' && ans < opt_min) {
      fieldError(i, 'less than ' + opt_min);
      ans = opt_min;
    } else if (typeof opt_max === 'number' && ans > opt_max) {
      fieldError(i, 'greater than ' + opt_max);
      ans = opt_max;
    } else if (ans !== Math.floor(ans)) {
      fieldError(i, 'not a whole number');
      ans = Math.floor(ans);
    }
    return ans;
  }

  function requiredFloat(i, opt_min, opt_max) {
    var ans = raw[i];
    if (typeof ans !== 'number' || ans !== ans) {
      fieldError(i, 'not a number');
      ans = typeof opt_min !== 'number' ? 0
        : typeof opt_max !== 'number' ? opt_min
        : (opt_min + opt_max) / 2;
    } else if (typeof opt_min === 'number' && ans < opt_min) {
      fieldError(i, 'less than ' + opt_min);
      ans = opt_min;
    } else if (typeof opt_max === 'number' && ans > opt_max) {
      fieldError(i, 'greater than ' + opt_max);
      ans = opt_max;
    }
    return ans;
  }

  function requiredFlexBool(i) {
    switch (raw[i]) {
    case 1:
      return true;

    case -1:
    case 0:
      return false;

    default:
      fieldError(i, 'expected -1, 0, or 1');
      return false;
    }
  }

  function fieldError(i, problem, isInternalError) {
      alert('field error ' + i + ' ' + problem);
    var errfn = isInternalError ? rta.internalError : rta.error;
    errfn('Bad v{raw[0]}-parcel data: raw[{i}] is {rawval.source} - {problem}\n\tRaw version {raw[0]}, county {countyName}, gridIndex {raw[1]}, parcel ID {raw[2]}',
          {raw:raw, i:i, problem:problem, rawval:raw[i], countyName:this.countyName});
  }

};

// TODO: finish this JSDoc
/**
 * Gets (via a callback) the unique Parcel from the specified street-address.
 *
 * @param {rta.County|rta.GeoBox|rta.GeoCircle|rta.GeoPolygon|rta.GeoPatches|undefined|null} opt_bounds An
 * optional boundary that, if provided, restricts the returned results. Use this to resolve ambiguous
 * addresses and/or to eliminate impossible results.
 *
 * @static
 */
rta.Parcel.byAddress = function byAddress(address, onsuccess, onfailure, opt_bounds) {
    onsuccess = onsuccess || function() {};
    onfailure = onfailure || function() {};
    // we look for Parcel-objects within this radius of the geolocated address
    var SLOP_RADIUS = 1000;          // FUTURE: use 'const'
    var SLOP_RADIUS_UNITS = 'feet';  // FUTURE: use 'const'
    //calculates the distance between an rta parcel p and a Google geocoded location q
    var calculateDistance =   function calculateDistance (p, q) {
        "use strict";
        var R = 6371,
            lat1 = p.lat,
            lon1 = p.lng,
            lat2 = q.lat(),
            lon2 = q.lng(),
            dLat = (lat2 - lat1) * Math.PI / 180,
            dLon = (lon2 - lon1) * Math.PI / 180,
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 0.62137119; //distance in miles
        //return google.maps.geometry.computeDistanceBetween(latLng1, latLng2);
    };
    rta.geocode(address, opt_bounds, 1, 1, function processGeocoderResult(results) {
        var result = results[0];
        var geocodedAddr = result.formatted_address;
        var geocodedPos = result.geometry.location;
        if (!result.types.some(function isStreetAddress(type) { return type === 'street_address'; })) {
            onfailure({message: 'Not Residence: ' + rta.toTitleCase(result.types.join('/').replace(/_/g, '-')), address: geocodedAddr});
            return;
        }
        var county;
        try {
            county = rta.County.byGeocoderResult(result);
        } catch (e) {
            onfailure({message: e.message, address: geocodedAddr});  // Unsupported County
            return;
        }
    // TODO: after embracing es6-shim.js, chg 2nd part of if-expr to: ... && Object.is(county, opt_bounds)
        if (rta.typeName(opt_bounds) === 'County' && county !== opt_bounds) {
            onfailure({message: 'Not In ' + opt_bounds.fullName, address: geocodedAddr});
            return;
        }
    // We can't expect the geocoded geo-pos to be exactly the same as the geo-pos of the parcel-object (from
    // the DB). In fact, the desired parcel-object might not even be the parcel-object that is CLOSEST to the
    // geocoded geo-pos. Solution: winnow the parcel-objects to those that are both "near" the geocoded
    // geo-pos and have the same street-address-number as the geocoded address, then of those that survive,
    // select the parcel-object that is closest to the geocoded geo-pos.
        county.getParcels(new rta.GeoCircle(geocodedPos, SLOP_RADIUS, SLOP_RADIUS_UNITS),
                      function processParcelsInSlopRadius(parcels) {
                          // TODO: use Promise Pattern to capture the error-message from county.getParcels() so we can use that in a call to onfailure()
                           var best = null;  // will be the best parcel-object, or null if there are none
                           var goalStreetNum = rta.Parcel.streetNumDo(geocodedAddr).toLowerCase();
                          parcels.forEach(function processParcel(p, i) {
                              //if (p.streetNum().toLowerCase() === goalStreetNum &&   //very old
                              //if (rta.Parcel.streetNumDo(p.partialAddress).toLowerCase() === goalStreetNum &&
                              //    (!best || p.distanceTo(geocodedPos) < best.distanceTo(geocodedPos))) {
                               //   best = p;
                             // }
                              if (rta.Parcel.streetNumDo(p.partialAddress).toLowerCase() === goalStreetNum &&
                                  (!best || calculateDistance(p, geocodedPos) < calculateDistance(best, geocodedPos))) {
                                 best = p;
                              }
                          });
                          if (best) {
                              onsuccess({parcel: best, beautifiedAddress: geocodedAddr, geocodedPos: geocodedPos});
                          } else {
                              onfailure({message: 'No Residential Property Record in Our Files', address: geocodedAddr});
                          }
                      });
    }, onfailure);

};

/**
 * This parcel's county-object.
 *
 * @return {rta.County} The county-object that contains this parcel. Never null.
 */
rta.Parcel.prototype.county = function county() {
  var ans = countyObjects[this.countyName.toLowerCase()];
  if (!ans) {
    rta.internalError('No such preexisting county-object at {countyName.source} for parcel {id}', this);
    throw new Error('Parcel has invalid/unknown county: ' + this.countyName);
  }
  return ans;
};

/**
 * The street-number portion of `this.partialAddress`, for example, returns
 * '221B' if `this.partialAddress` is '221B Baker St',
 * '221' if `this.partialAddress` is '221-B Baker St',
 * '' if `this.partialAddress` is 'One Park St'.
 *
 * Strips leading 0's from the result, but leaving at least one digit, e.g., returns
 * '221B' if `this.partialAddress` is '00221B Baker St',
 * '0' if `this.partialAddress` is '0 Baker St' or '0000 Baker St'.
 *
 * @return {!string} The street-number portion of `this.partialAddress`, or "" if
 * `this.partialAddress` does not begin with one or more digits.
 */
rta.Parcel.prototype.streetNum = function streetNum() {
  return rta.Parcel.streetNumDo(this.partialAddress);
};

/**
 * The street-number portion of the explicitly passed address, for example, returns
 * '221B' if `address` is '221B Baker St',
 * '221' if `address` is '221-B Baker St',
 * '' if `address` is 'One Park St'.
 *
 * Strips leading 0's from the result, but leaving at least one digit, e.g., returns
 * '221B' if `address` is '00221B Baker St',
 * '0' if `address` is '0 Baker St' or '0000 Baker St'.
 *
 * @param {!string} address The street address, or at least the first part of that address, e.g., '221B
 * Baker St' or '221B Baker' or '221B Baker St., London, England'.
 *
 * @return {!string} The street-number portion of `address`, or "" if `address` does
 * not begin with one or more digits.
 */
rta.Parcel.streetNumDo = function streetNumDo(address) {
  var match = address.match(/^\s*0*(\d+\w*)/);
  return match ? match[1] : '';
};

/**
 * The great-circle as-the-bird-flies distance (in the specified units) along the surface of the Earth from
 * 'this' parcel to 'that' parcel-or-geo-pos. Limitation: approximates the Earth as a sphere.
 *
 * Convenience method; `x.distanceTo(y)` is equivalent to `x.geoPos.distanceTo(y)`.
 *
 * This function has no side-effects.
 *
 * @param {rta.GeoPos|rta.Parcel|Array<number>} that The other location. Can be any object where either
 * `that.geoPos` or `that` is either a `rta.GeoPos` or an array of two numbers (lat, lng).
 *
 * @param {string} [opt_units='miles'] The name of the distance units for the result. It is valid name if it
 * is one of the names returned from `rta.distanceUnitNames()`, or a variant of one of those with
 * leading/trailing whitespace (' miles ' = 'miles'), different capitalization ('MiLeS' = 'miles') or
 * with/without a trailing 's' ('mile' = 'miles', 'yds' = 'yd').
 *
 * @return {number} Distance in the specified distance-units.
 *
 * @throws {Error} if the distance-units-name is invalid.
 *
 * @see rta.distanceUnitNames()
 * @see rta.GeoPos.prototype.distanceTo()
 */
rta.Parcel.prototype.distanceTo = function distanceTo(that, opt_units) {
  return this.geoPos.distanceTo(that, opt_units);
};

/**
 * Gets (via a callback) this Parcel's 'beautified' address, e.g., '123 Main St., East Podunk, TX 75223 USA'.
 *
 * @param {Function(string, rta.GeoPos)} [onsuccess] Results callback, passed the beautified address and the
 * geocoded rta.GeoPos.
 *
 * @param {Function(Object)} [onfailure] Called on failure, passed an error category (string) and error
 * details (string).
 */
rta.Parcel.prototype.getBeautifiedAddress = function getBeautifiedAddress(onsuccess, onfailure) {
  var self = this;
  onsuccess = onsuccess || function() {};
  onfailure = onfailure || function() {};
  rta.Parcel.byAddress(self.partialAddress,
                       function success(info) {
                         if (info.parcel.id === self.id) {
                           onsuccess(info.beautifiedAddress, info.geocodedPos);
                         } else {
                           // Really bad: rta.Parcel.byAddress() thought it succeeded, but it returned the wrong parcel!
                           rta.error('Wrong parcel returned from rta.Parcel.byAddress({0.partialAddress.source}, {0.countyName.source}): {1.source}', self, info);
                           onfailure({message: 'Cannot Geocode', address: self.partialAddress});
                         }
                       },
                       function failure(info) {
                         // Bad: can't geocode our own address.
                         // TODO: Loop through all parcels in any given County to make sure they are all geocodeable
                         rta.error('Cannot geocode parcel {0.partialAddress} in {0.countyName}: {1.message}', self, info);
                         onfailure(info);
                       },
                       self.county());
};

/**
 * A promise to get all potential-comps of `this`. A parcel is considered a 'potential comp' if it is part of
 * the same County as `this`, within the specified geo-region, and satisfies a few minimal constraints. These
 * minimal constraints are that the comp is not `this`, the comp's house-$/sqft (`comp.houseValPerSqft`) is
 * known and is strictly less than `this.houseValPerSqft`, and the comp has the same land-unit-of-measure
 * (`comp.landUom`) as `this`.
 *
 * @param {rta.GeoBox|rta.GeoCircle|rta.GeoPolygon|rta.GeoPatches} region The geo-region that delimits the
 * desired candidate comps. It is not an error if the desired region has no parcels, even if it is completely
 * outside the county, though obviously those cases mean an empty-list will be passed to `whenDone()`.
 *
 * @param {Function(Array<rta.Parcel>)} whenDone The callback which will be called when the candidate comps
 * have been determined.
 */
rta.Parcel.prototype.getPotentialComps = function getPotentialComps(region, whenDone) {
  var self = this;
  //self.county().getParcels(region, function processPotentialComps(parcels) {
   // alert('county ' + self.county.unqualName);
    self.county.getParcels(region, function processPotentialComps(parcels) {
    whenDone(parcels.filter(function isCompEligible(comp) {
      return comp.houseValPerSqft &&                    // hard-coded comp-constraint: must not have an unknown $/sqft
        comp.houseValPerSqft < self.houseValPerSqft; // hard-coded comp-constraint: strictly less $/sqft
               // mg removed uom test 102413
    }));
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rta.AssessedParcel ////////////////////////////////////////////////////////////////////////////////////////

/**
 * A convenience-object to bundle whatever is known about an assessment on a particular parcel.
 *
 * @class rta.AssessedParcel
 * @constructor
 * @this {rta.AssessedParcel}
 *
 * @param {!rta.Parcel} targetParcel The parcel being assessed.
 *
 * @param {Array<rta.Parcel>} [opt_comps] An optional list of parcels to serve as comps.
 */
rta.AssessedParcel = function AssessedParcel(targetParcel, opt_comps) {
  this.target = targetParcel;
  this.comps = opt_comps ? opt_comps.slice(0) : [];  // shallow-copy the array so we don't change the caller's array
};

/**
 * Finds all comps that (a) are within `maxDistance` of `this`, (b) satisfy some
 * hardcoded constraints, and (c) fulfill whatever additional constraints are within the
 * `meetsConstraints()` callback.
 *
 * The hardcoded constraints are that the comp is not `this`, the house-$/sqft (`comp.houseValPerSqft`) is
 * known, the house-$/sqft is strictly less than `this.houseValPerSqft`, and has the same land-unit-of-measure
 * (`comp.landUom`) as `this`.
 *
 * TODO: Change the semantics so this NEVER throws exceptions - so ALL errors are reported via callback().
 */
rta.AssessedParcel.prototype.autoselectComps = function autoselectComps(options, callback) {
  var self = this;
  var parseNum = function parseNum(description, value, defaultValue, allowFloat) {
    return rta.parseNumberStrict(typeof value === 'number' ? value : (value || defaultValue),
                                 function failed() { throw new Error('Invalid ' + description + ': ' + value); },
                                 allowFloat);
  };
  var maxAgeDiff = parseNum('max-age-diff', options.maxAgeDiff, 2, false);
 // var maxCduDiff = parseNum('max-CDU-diff', options.maxCduDiff, 2, false);
  var maxDistance = parseNum('max-distance', options.maxDistance, 0.5, true);
 // var maxLandDiff = parseNum('max-land-diff', options.maxLandDiff, 0, true);   mg 102113
  var maxNumComps = parseNum('max-num-comps', options.maxNumComps, 5, false);
 // var distanceUnits = rta.canonicalDistanceUnitName(options.distanceUnits, true);  mg 102113
    var maxCduDiff = 9;
  var maxLandDiff = 0;
  var maxNumComps = 5;
  var distanceUnits = 'miles';
  // TODO: Change the above so this function NEVER throws exceptions - so ALL errors are reported via callback().

  // TODO: Either drop this function entirely, or at least defer the hard-coded constraints to rta.Parcel.prototype.getPotentialComps()
  this.target.county().getParcels(new rta.GeoCircle(this.target.geoPos, maxDistance, distanceUnits), function processPotentialComps(parcels) {
    //self.comps = parcels.filter(function isCompEligible(x) {
     // return x.houseValPerSqft &&  // hard-coded comp-constraint: must not have an unknown $/sqft
     //   x.houseValPerSqft < this.target.houseValPerSqft &&  // hard-coded comp-constraint: strictly less $/sqft
      //  x.landUom === this.target.landUom &&                // hard-coded comp-constraint: same land-unit-of-measure (ACRE, etc.)
       // x.houseYearBuilt >= this.target.houseYearBuilt - maxAgeDiff &&
    //    100 * x.landValPerUnit >= this.target.landValPerUnit * (100 - maxLandDiff) &&
      //  x.cduLevel >= this.target.cduLevel - maxCduDiff;
   // }).sort(function compareHouseValPerSqft(a, b) {
    //  return a.houseValPerSqft - b.houseValPerSqft;
    //}).slice(0, maxNumComps);
      self.comps = parcels.filter(function isCompEligible(x) {
          return x.houseValPerSqft &&  // hard-coded comp-constraint: must not have an unknown $/sqft
              x.houseValPerSqft < this.target.houseValPerSqft &&  // hard-coded comp-constraint: strictly less $/sqft
              x.houseYearBuilt >= this.target.houseYearBuilt - maxAgeDiff;
      }).sort(function compareHouseValPerSqft(a, b) {
              return a.houseValPerSqft - b.houseValPerSqft;
          }).slice(0, maxNumComps);
    callback(self);
  });
};

/**
 * Returns the average value of comp-field fieldName across the comps in `this.comps`. For example,
 * `this.averageComp('houseValPerSqft')` is the average of `this.houseValPerSqft` of the
 * comps in `this.comps`.
 *
 * If `this.comps` is empty, returns 0.
 *
 * @param {!string} fieldName The name of the field (or, in an unfortunate collision of lingo, the parcel
 * object's 'property' in JavaScript parlance) to be averaged. Must be a valid parcel field-name.
 *
 * @return {number} The average fieldName of the comps in `this.comps`.
 *
 * @see rta.Parcel()
 */
rta.AssessedParcel.prototype.averageComp = function averageComp(fieldName) {
  var self = this;
  return self.comps.reduce(function add(sum, comp) {
    return sum + comp[fieldName];
  }, 0) / (self.comps.length || 1);
};

/**
 * Returns the theoretical `this.houseVal` value of `this.target` as the product of its
 * `this.houseNumSqft` and the average `this.houseValPerSqft` of the
 * `this.comps`.
 *
 * @return {number} Product of the average `this.houseValPerSqft` of the comps and the target
 * parcel's `this.houseNumSqft`, in dollars.
 */
rta.AssessedParcel.prototype.newHouseVal = function newHouseVal() {
  var self = this;
  return this.target.houseNumSqft * self.averageComp('houseValPerSqft');
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App-Level Functions ///////////////////////////////////////////////////////////////////////////////////////

// TODO: finish this JSDoc
rta.addCommas =  function addCommas(param) {
        var nStr = param.toString() + '';
        var x = nStr.split('.'),
            x1 = x[0],
            x2 = x.length > 1 ? '.' + x[1] : '',
            rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };
/**
 * Finds the parcel based on the street-address, then selects ...[TODO]...
 *
 * @param {Object|string} constraints If a string, treated as if it was `{address: constraints}`.
 * Otherwise must be an Object with at least an `address` key/value, the others being optional:
 *
 *     {
 *       // Target property's street-address.
 *       // Required parameter; there is no default value.
 *       address: '...',
 *
 *       // Comps are disqualified if they are further than this many miles (see 'distanceUnits') from the target.
 *       // Default = 0.5 (miles).
 *       maxDistance: 0.5,
 *
 *       // Comps are disqualified if their houseYearBuilt is older than this many years prior to the target's.
 *       // Default = 2 (years).
 *       maxAgeDiff: 2,
 *
 *       // Comps are disqualified if their CDU is worse than this many condition-grades below the target's.
 *       // Default = 2 (levels).
 *       maxCduDiff: 2,
 *
 *       // Comps are disqualified if their land-val-per-unit is less than this percentage of the target's.
 *       // Default = 0 (percent).
 *       maxLandDiff: 0,
 *
 *       // At most this many comps are selected.
 *       // Default = 5.
 *       maxNumComps: 5,
 *
 *       // Name of the units used in 'maxDistance'. Allowed values are 'miles' or 'mi', 'feet' or 'ft',
 *       // 'yards' or 'yd', 'kilometers' or 'km', 'meters' or 'm', 'degrees' or 'deg', 'radians' or 'rad'.
 *       // Default = 'miles'.
 *       distanceUnits: 'miles',
 *     }
 *
 * @static
 *
 * @param {Function(Object)} onsuccess [TODO]
 * TODO: finish this...
 *
 * @param {Function(Object)} onfailure [TODO]
 * TODO: Note the change to onfailure(): the boolean parameter is no longer present.
 *
 * TODO: Change the semantics so this NEVER throws exceptions - so ALL errors are reported via onfailure().
 */
rta.calculateDistance = function calculateDistance (p, q) {
    "use strict";
    var R = 6371,
        lat1 = p.lat,
        lon1 = p.lng,
        lat2 = q.lat,
        lon2 = q.lng,
        dLat = (lat2 - lat1) * Math.PI / 180,
        dLon = (lon2 - lon1) * Math.PI / 180,
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 0.62137119; //distance in miles
    //return google.maps.geometry.computeDistanceBetween(latLng1, latLng2);
};
rta.populateInfoWindowData = function populateInfoWindowData(self) {
        $('#situs-address').text(self.partialAddress);
        $('#situs-address-href').prop('href', 'http://www.google.com/search?q=' + encodeURIComponent(self.partialAddress));
        $('#owner-names').text(self.ownerNameDesc);
        $('#owner-names-href').prop('href', 'http://www.google.com/search?q=' + encodeURIComponent(self.ownerNameDesc));
        $('#owner-address').text(self.ownerAddressDesc);
        $('#accounts').text(self.parcelAcctIds);
        $('#total-tax-val').text(self.totalTaxDesc);
        $('#homestead-val').text(self.homesteadWorthDesc);
        $('#purchased-date').text(self.deedDateDesc);
        $('#year-built').text(self.houseYearBuiltDesc);
        $('#homesteaded-date').text(self.homesteadedDesc);
        $('#senior-desc').text(self.seniorDesc);
        $('#deferred-desc').text(self.deferredDesc);
        $('#disabled-desc').text(self.disabledDesc);
        $('#veteran-desc').text(self.vetDesc);
        $('#total-val-desc').text(self.totalValDesc);
        $('#house-val-desc').text(self.houseValDesc);
        $('#land-val-desc').text(self.landValDesc);
        $('#other-val-desc').text(self.otherVal ? ' + ' + self.otherValDesc + ' other' : '');
        $('#house-sqft-desc').text(self.houseNumSqftDesc);
        $('#house-num-bedrooms').text(self.houseNumBedroomsDesc);
        $('#house-num-full-baths').text(self.houseNumFullBathsDesc);
        $('#house-num-half-baths').text(self.houseNumHalfBathsDesc);
        $('#house-num-stories').text(self.houseNumStoriesDesc);
        $('#cdu-name').text(self.cduName);
        $('#misc-desc').text(self.misc);
        $('#land-desc').text(self.landDesc);
        $('#mapsco').text(self.mapsco);
};
rta.title = function title(self) {
        return (self.partialAddress);
};
rta.lite = function lite(constraints, onsuccess, onfailure) {
  var parseNum = function parseNum(description, value, defaultValue, allowFloat) {
    return rta.parseNumberStrict(typeof value === 'number' ? value : (value || defaultValue),
                                 function failed() { throw new Error('Invalid ' + description + ': ' + value); },
                                 allowFloat);
  };

  onsuccess = onsuccess || function() {};
  onfailure = onfailure || function() {};
  constraints = typeof constraints === 'string' ? {address: constraints} : constraints;  // '5 Main' ==> {address:'5 Main'}
  constraints = {
    address: constraints.address,
    maxAgeDiff: parseNum('max-age-diff', constraints.maxAgeDiff, 2, false),
    maxCduDiff: parseNum('max-CDU-diff', constraints.maxCduDiff, 2, false),
    maxDistance: parseNum('max-distance', constraints.maxDistance, 0.5, true),
    maxLandDiff: parseNum('max-land-diff', constraints.maxLandDiff, 0, true),
    maxNumComps: parseNum('max-num-comps', constraints.maxNumComps, 5, false),
    distanceUnits: rta.canonicalDistanceUnitName(constraints.distanceUnits, true)
  };
  // TODO: Change the above so this function NEVER throws exceptions - so ALL errors are reported via onfailure().
  rta.Parcel.byAddress(constraints.address, function success(info) {
    var target = info.parcel, potentialComps = [];
      target.county.getParcels(new rta.GeoCircle(target, constraints.maxDistance, constraints.distanceUnits), function processPotentialComps(parcels) {
          potentialComps = parcels.filter(function isCompEligible(comp) {
              return comp.houseValPerSqft &&                    // hard-coded comp-constraint: must not have an unknown $/sqft
                  comp.houseValPerSqft < target.houseValPerSqft; // hard-coded comp-constraint: strictly less $/sqft
          });
    //target.getPotentialComps(new rta.GeoCircle(target, constraints.maxDistance, constraints.distanceUnits), function winnowComps(potentialComps) {
      var eligibleComps = potentialComps.filter(function isCompEligible(comp) {
          return comp.houseAge <= target.houseAge + (constraints.maxAgeDiff);
      }).sort(function compareHouseValPerSqft(a, b) {
                 return a.houseValPerSqft - b.houseValPerSqft;
      });
      var assessment = new rta.AssessedParcel(target, eligibleComps.slice(0, constraints.maxNumComps));
      var avgPerSqft = assessment.averageComp('houseValPerSqft');
      if (assessment.comps.length) {
        onsuccess({
          constraints: constraints,
          beautifiedAddress: info.beautifiedAddress,
          target: target,
          comps: assessment.comps,
          savingsVal: (target.houseValPerSqft - avgPerSqft) * target.houseNumSqft,  // $savings
          savingsPct: 100 * (target.houseValPerSqft - avgPerSqft) / (target.houseValPerSqft || 1),  // %savings
          avgCompHouseValPerSqft: avgPerSqft,
          newHouseVal: avgPerSqft * target.houseNumSqft,
          taxVal: target.savingsWorth * (target.houseValPerSqft - avgPerSqft) * target.houseNumSqft,
          /*compDistances: assessment.comps.map(function distanceToTarget(comp) {  // TODO: Is this useful? It is trivial for the caller to calculate...
            return comp.distanceTo(target, constraints.distanceUnits);
          }),  */
          numPotentialComps: potentialComps.length,  // TODO: Currently this is #parcels in in bounding rectangle around the constraint-circle; okay??
          numEligibleComps: eligibleComps.length     // TODO: Is this important? If not, we can simplify the code slightly by eliding this.
        });
      } else {
        onfailure({
          message: 'No Qualifying Comps',
          address: info.beautifiedAddress
        });
      }
    });
  }, onfailure);
};
    rta.decodeDate = function decodeDate (countyName, s) {   //best solution: put this in data conversion program, not here
        var mo, day, year, j;
        if ((s.length <= 5) || (s.indexOf('1900') >= 0))  //includes -1 as unknown code
            return {month: 0, day: 0, year: 0};
        switch (countyName) {
            case 'TEXAS: Collin County':
                mo = parseInt(s, 10) || 0;
                j = s.slice(s.indexOf('/') + 1);
                day = parseInt(j, 10) || 0;
                j = j.slice(j.indexOf('/') + 1);
                year = parseInt(j, 10) || 0;
                break;
            case 'TEXAS: Dallas County':
                mo = parseInt(s, 0) || 0;
                j = s.slice(s.indexOf('/') + 1);
                day = parseInt(j, 10) || 0;
                j = j.slice(j.indexOf('/') + 1);
                year = parseInt(j, 10) || 0;
                break;
            case 'TEXAS: Denton County':
                mo = parseInt(s.slice(0,2), 10) || 0;
                day = parseInt(s.slice(2,4), 10) || 0;
                year = parseInt(s.slice(4,8), 10) || 0;
                break;
            case 'TEXAS: Tarrant County':
                mo = parseInt(s, 10) || 0;
                j = s.slice(s.indexOf('/') + 1);
                day = parseInt(j, 10) || 0;
                j = j.slice(j.indexOf('/') + 1);
                year = parseInt(j, 10) || 0;
                break;
            default:
                rtaAlert('Programming error-invalid county ' + countyName + ' in decodeDate-call tech support');
        }
        return ({month: mo, day: day, year: year});
    };
    rta.findCountyVertices = function findCountyVertices(name) {
        var answer,
            countyInfos = [
                {
                    "county":"TEXAS: Collin County",
                    "vertices":[[33.39794486356296,-96.38461723220381], [33.39803014855481,-96.40239123348489],
                        [33.3983587648396,-96.4303996998058], [33.39854034073755,-96.46415047956144],
                        [33.39868316199153,-96.47178280708846], [33.39934117965699,-96.52198002666017],
                        [33.3997492539734,-96.55648560570083], [33.399866075008276,-96.5603275203843],
                        [33.39984588121869,-96.56968274482924], [33.40012526331904,-96.58030017061333],
                        [33.40280949571443,-96.72084197493048], [33.402844364829406,-96.72465923132762],
                        [33.403176404383096,-96.74080704264979], [33.40347942813519,-96.75373861444449],
                        [33.40384607744604,-96.77214303663591], [33.404142570967714,-96.78578693428474],
                        [33.4043287519039,-96.79196268791888], [33.404885954564186,-96.81582035923692],
                        [33.40512596313903,-96.82361520052046], [33.40546471571436,-96.83411114695875],
                        [32.98743485312592,-96.84412175672682],[32.9828689176782,-96.51701131668116],
                        [32.98286903241974,-96.51701144777766], [32.98153512682947,-96.29717842107466],
                        [32.981519163756026,-96.29717910991974], [33.35205523564255,-96.29438608218096],
                        [33.35205384176068,-96.29438613658132], [33.35149493740769,-96.29938695762485],
                        [33.3485535769625,-96.32301934209818], [33.347650909718055,-96.32944904502025],
                        [33.33977697391125,-96.384511893394], [33.39794486356296,-96.38461723220381]]
                },
                {
                    "county":"TEXAS: Dallas County",
                    "vertices":[[32.54866230739841,-97.03838539666411], [32.61849543838878,-97.03753030736983],
                        [32.63366939089924,-97.03726984517661], [32.64004230351531,-97.03714605474839],
                        [32.80738695054331,-97.03439886364349], [32.98968862644958,-97.03100719626592],
                        [32.98747258052054,-96.8441937053148], [32.98250030645032,-96.51731151934374],
                        [32.72112942301862,-96.5185948963444], [32.545363374470355,-96.52358188867322],
                        [32.54866230739841,-97.03838539666411]]
                },
                {
                    "county":"TEXAS: Denton County",
                    "vertices":[[32.99172671548808,-97.39851458126468],[33.020887701533944,-97.39753286587782],
                        [33.123658918217615,-97.39440199587938],[33.430306324426084,-97.38290861417146],
                        [33.43034050693903,-97.38291183897515],[33.416593812900665,-96.943154244592],
                        [33.413442410843786,-96.83386800189818],[32.987457719061965,-96.84394667175715],
                        [32.98968862644958,-97.03100719626592],[32.989808294418,-97.04822499719955],
                        [32.989925584603135,-97.06544287682891],[32.990040521013285,-97.08266077186923],
                        [32.99007719622482,-97.08823199787356],[32.99015305855904,-97.09987870495601],
                        [32.990263240305104,-97.11709671688381],[32.99037101737995,-97.13431473899534],
                        [32.99047641660414,-97.15153283517891],[32.99057946474374,-97.16875093887],
                        [32.99068010752262,-97.18596911520221],[32.99075102308416,-97.19834966764147],
                        [32.9907783992098,-97.20318729720256],[32.99087428551139,-97.22040554998375],
                        [32.99096779323024,-97.23762380698554],[32.991058950508645,-97.25484213212397],
                        [32.99114770139262,-97.27206042741086],[32.9912341024556,-97.28927885422321],
                        [32.99131809708781,-97.30649724606181],[32.991399713503746,-97.32371567663255],
                        [32.99147897939142,-97.34093416748075],[32.99155583919477,-97.35815265643924],
                        [32.99163034847975,-97.37537120709734],[32.9917024516773,-97.39258975400482],
                        [32.99172671548808,-97.39851458126468]]
                },
                {
                    "county":"TEXAS: Tarrant County",
                    "vertices":[[32.98968862644958,-97.03100719626592],[32.80738695054331,-97.03439886364349],
                        [32.64004230351531,-97.03714605474839],[32.63366939089924,-97.03726984517661],
                        [32.61849543838878,-97.03753030736983],[32.54866230739841,-97.03838539666411],
                        [32.54925525576946,-97.08705929127387],[32.552364129261335,-97.27827155289502],
                        [32.555400237091376,-97.55297767366795],[32.73716656096679,-97.54892976324712],
                        [32.994003740732225,-97.54360845523868],[32.99275066172373,-97.46243423755976],
                        [32.99247340792771,-97.44492311825239],[32.99172671548808,-97.39851458126468],
                        [32.9917024516773,-97.39258975400482],[32.99163034847975,-97.37537120709734],
                        [32.99155583919477,-97.35815265643924],[32.99147897939142,-97.34093416748075],
                        [32.991399713503746,-97.32371567663255],[32.99131809711906,-97.30649724932321],
                        [32.9912341024556,-97.28927885422321],[32.99114770139262,-97.27206042741086],
                        [32.991058950508645,-97.25484213212397],[32.99096779323024,-97.23762380698554],
                        [32.99087428551139,-97.22040554998375],[32.9907783992098,-97.20318729720256],
                        [32.99068010752262,-97.18596911520221],[32.99057946474374,-97.16875093887],
                        [32.99047641660414,-97.15153283517891],[32.99037101737995,-97.13431473899534],
                        [32.990263240305104,-97.11709671688381],[32.99015305718484,-97.09987870497775],
                        [32.99004052372461,-97.08266076856394],[32.989925584603135,-97.06544287682891],
                        [32.989808294418,-97.04822499719955],[32.98968862644958,-97.03100719626592]]
                }
            ];
        countyInfos.forEach(function (info) {
            if (info.county === name) {
                answer = info.vertices;
            }
        });
        return answer;
    };
return rta;
})();
