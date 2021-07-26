/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
(function(global, factory) {

  "use strict";

  if (typeof module === "object" && typeof module.exports === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ?
      factory(global, true) :
      function(w) {
        if (!w.document) {
          throw new Error("jQuery requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var flat = arr.flat ? function(array) {
    return arr.flat.call(array);
  } : function(array) {
    return arr.concat.apply([], array);
  };


  var push = arr.push;

  var indexOf = arr.indexOf;

  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call(Object);

  var support = {};

  var isFunction = function isFunction(obj) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === "function" && typeof obj.nodeType !== "number" &&
      typeof obj.item !== "function";
  };


  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };


  var document = window.document;



  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;

    var i, val,
      script = doc.createElement("script");

    script.text = code;
    if (node) {
      for (i in preservedScriptAttributes) {

        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);
        if (val) {
          script.setAttribute(i, val);
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script);
  }


  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module



  var
    version = "3.6.0",

    // Define a local copy of jQuery
    jQuery = function(selector, context) {

      // The jQuery object is actually just the init constructor 'enhanced'
      // Need init if jQuery is called (just allow error to be thrown if not included)
      return new jQuery.fn.init(selector, context);
    };

  jQuery.fn = jQuery.prototype = {

    // The current version of jQuery being used
    jquery: version,

    constructor: jQuery,

    // The default length of a jQuery object is 0
    length: 0,

    toArray: function() {
      return slice.call(this);
    },

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function(num) {

      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this);
      }

      // Return just the one element from the set
      return num < 0 ? this[num + this.length] : this[num];
    },

    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function(elems) {

      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems);

      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;

      // Return the newly-formed element set
      return ret;
    },

    // Execute a callback for every element in the matched set.
    each: function(callback) {
      return jQuery.each(this, callback);
    },

    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },

    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },

    first: function() {
      return this.eq(0);
    },

    last: function() {
      return this.eq(-1);
    },

    even: function() {
      return this.pushStack(jQuery.grep(this, function(_elem, i) {
        return (i + 1) % 2;
      }));
    },

    odd: function() {
      return this.pushStack(jQuery.grep(this, function(_elem, i) {
        return i % 2;
      }));
    },

    eq: function(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },

    end: function() {
      return this.prevObject || this.constructor();
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {

        // Extend the base object
        for (name in options) {
          copy = options[name];

          // Prevent Object.prototype pollution
          // Prevent never-ending loop
          if (name === "__proto__" || target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) ||
              (copyIsArray = Array.isArray(copy)))) {
            src = target[name];

            // Ensure proper type for the source value
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  jQuery.extend({

    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

    // Assume jQuery is ready without the ready module
    isReady: true,

    error: function(msg) {
      throw new Error(msg);
    },

    noop: function() {},

    isPlainObject: function(obj) {
      var proto, Ctor;

      // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj);

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      if (!proto) {
        return true;
      }

      // Objects with prototype are plain iff they were constructed by a global Object function
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },

    isEmptyObject: function(obj) {
      var name;

      for (name in obj) {
        return false;
      }
      return true;
    },

    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval: function(code, options, doc) {
      DOMEval(code, {
        nonce: options && options.nonce
      }, doc);
    },

    each: function(obj, callback) {
      var length, i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },

    // results is for internal usage only
    makeArray: function(arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret,
            typeof arr === "string" ? [arr] : arr
          );
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },

    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },

    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;

      return first;
    },

    grep: function(elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;

      // Go through the array, only saving the items
      // that pass the validator function
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },

    // arg is for internal usage only
    map: function(elems, callback, arg) {
      var length, value,
        i = 0,
        ret = [];

      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }

        // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      }

      // Flatten any nested arrays
      return flat(ret);
    },

    // A global GUID counter for objects
    guid: 1,

    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }

  // Populate the class2type map
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
    function(_i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    });

  function isArrayLike(obj) {

    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
      type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v2.3.6
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://js.foundation/
     *
     * Date: 2021-02-16
     */
    (function(window) {
      var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,

        // Local document vars
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,

        // Instance-specific data
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },

        // Instance methods
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        pushNative = arr.push,
        push = arr.push,
        slice = arr.slice,

        // Use a stripped-down indexOf as it's faster than native
        // https://jsperf.com/thor-indexof-vs-for/5
        indexOf = function(list, elem) {
          var i = 0,
            len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },

        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
        "ismap|loop|multiple|open|readonly|required|scoped",

        // Regular expressions

        // http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",

        // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
        identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

        // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace +

        // "Attribute values must be CSS identifiers [capture 5]
        // or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
        whitespace + "*\\]",

        pseudos = ":(" + identifier + ")(?:\\((" +

        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

        // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

        // 3. anything else (capture 2)
        ".*" +
        ")\\)|)",

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
          whitespace + "+$", "g"),

        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
          "*"),
        rdescend = new RegExp(whitespace + "|>"),

        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),

        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
            whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),

          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          "needsContext": new RegExp("^" + whitespace +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
            "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },

        rhtml = /HTML$/i,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,

        rnative = /^[^{]+\{\s*\[native \w/,

        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        rsibling = /[+~]/,

        // CSS escapes
        // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
        runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
        funescape = function(escape, nonHex) {
          var high = "0x" + escape.slice(1) - 0x10000;

          return nonHex ?

            // Strip the backslash prefix from a non-hex escape sequence
            nonHex :

            // Replace a hexadecimal escape sequence with the encoded Unicode code point
            // Support: IE <=11+
            // For values outside the Basic Multilingual Plane (BMP), manually construct a
            // surrogate pair
            high < 0 ?
            String.fromCharCode(high + 0x10000) :
            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },

        // CSS string/identifier serialization
        // https://drafts.csswg.org/cssom/#common-serializing-idioms
        rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function(ch, asCodePoint) {
          if (asCodePoint) {

            // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
            if (ch === "\0") {
              return "\uFFFD";
            }

            // Control characters and (dependent upon position) numbers get escaped as code points
            return ch.slice(0, -1) + "\\" +
              ch.charCodeAt(ch.length - 1).toString(16) + " ";
          }

          // Other potentially-special ASCII characters get backslash-escaped
          return "\\" + ch;
        },

        // Used for iframes
        // See setDocument()
        // Removing the function wrapper causes a "Permission Denied"
        // error in IE
        unloadHandler = function() {
          setDocument();
        },

        inDisabledFieldset = addCombinator(
          function(elem) {
            return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
          }, {
            dir: "parentNode",
            next: "legend"
          }
        );

      // Optimize for push.apply( _, NodeList )
      try {
        push.apply(
          (arr = slice.call(preferredDoc.childNodes)),
          preferredDoc.childNodes
        );

        // Support: Android<4.0
        // Detect silently failing push.apply
        // eslint-disable-next-line no-unused-expressions
        arr[preferredDoc.childNodes.length].nodeType;
      } catch (e) {
        push = {
          apply: arr.length ?

            // Leverage slice if possible
            function(target, els) {
              pushNative.apply(target, slice.call(els));
            } :

            // Support: IE<9
            // Otherwise append directly
            function(target, els) {
              var j = target.length,
                i = 0;

              // Can't trust NodeList.length
              while ((target[j++] = els[i++])) {}
              target.length = j - 1;
            }
        };
      }

      function Sizzle(selector, context, results, seed) {
        var m, i, elem, nid, match, groups, newSelector,
          newContext = context && context.ownerDocument,

          // nodeType defaults to 9, since context defaults to document
          nodeType = context ? context.nodeType : 9;

        results = results || [];

        // Return early from calls with invalid selector or context
        if (typeof selector !== "string" || !selector ||
          nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

          return results;
        }

        // Try to shortcut find operations (as opposed to filters) in HTML documents
        if (!seed) {
          setDocument(context);
          context = context || document;

          if (documentIsHTML) {

            // If the selector is sufficiently simple, try using a "get*By*" DOM method
            // (excepting DocumentFragment context, where the methods don't exist)
            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

              // ID selector
              if ((m = match[1])) {

                // Document context
                if (nodeType === 9) {
                  if ((elem = context.getElementById(m))) {

                    // Support: IE, Opera, Webkit
                    // TODO: identify versions
                    // getElementById can match elements by name instead of ID
                    if (elem.id === m) {
                      results.push(elem);
                      return results;
                    }
                  } else {
                    return results;
                  }

                  // Element context
                } else {

                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (newContext && (elem = newContext.getElementById(m)) &&
                    contains(context, elem) &&
                    elem.id === m) {

                    results.push(elem);
                    return results;
                  }
                }

                // Type selector
              } else if (match[2]) {
                push.apply(results, context.getElementsByTagName(selector));
                return results;

                // Class selector
              } else if ((m = match[3]) && support.getElementsByClassName &&
                context.getElementsByClassName) {

                push.apply(results, context.getElementsByClassName(m));
                return results;
              }
            }

            // Take advantage of querySelectorAll
            if (support.qsa &&
              !nonnativeSelectorCache[selector + " "] &&
              (!rbuggyQSA || !rbuggyQSA.test(selector)) &&

              // Support: IE 8 only
              // Exclude object elements
              (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {

              newSelector = selector;
              newContext = context;

              // qSA considers elements outside a scoping root when evaluating child or
              // descendant combinators, which is not what we want.
              // In such cases, we work around the behavior by prefixing every selector in the
              // list with an ID selector referencing the scope context.
              // The technique has to be used as well when a leading combinator is used
              // as such selectors are not recognized by querySelectorAll.
              // Thanks to Andrew Dupont for this technique.
              if (nodeType === 1 &&
                (rdescend.test(selector) || rcombinators.test(selector))) {

                // Expand context for sibling selectors
                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                  context;

                // We can use :scope instead of the ID hack if the browser
                // supports it & if we're not changing the context.
                if (newContext !== context || !support.scope) {

                  // Capture the context ID, setting it first if necessary
                  if ((nid = context.getAttribute("id"))) {
                    nid = nid.replace(rcssescape, fcssescape);
                  } else {
                    context.setAttribute("id", (nid = expando));
                  }
                }

                // Prefix every selector in the list
                groups = tokenize(selector);
                i = groups.length;
                while (i--) {
                  groups[i] = (nid ? "#" + nid : ":scope") + " " +
                    toSelector(groups[i]);
                }
                newSelector = groups.join(",");
              }

              try {
                push.apply(results,
                  newContext.querySelectorAll(newSelector)
                );
                return results;
              } catch (qsaError) {
                nonnativeSelectorCache(selector, true);
              } finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }

        // All others
        return select(selector.replace(rtrim, "$1"), context, results, seed);
      }

      /**
       * Create key-value caches of limited size
       * @returns {function(string, object)} Returns the Object data after storing it on itself with
       *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
       *	deleting the oldest entry
       */
      function createCache() {
        var keys = [];

        function cache(key, value) {

          // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
          if (keys.push(key + " ") > Expr.cacheLength) {

            // Only keep the most recent entries
            delete cache[keys.shift()];
          }
          return (cache[key + " "] = value);
        }
        return cache;
      }

      /**
       * Mark a function for special use by Sizzle
       * @param {Function} fn The function to mark
       */
      function markFunction(fn) {
        fn[expando] = true;
        return fn;
      }

      /**
       * Support testing using an element
       * @param {Function} fn Passed the created element and returns a boolean result
       */
      function assert(fn) {
        var el = document.createElement("fieldset");

        try {
          return !!fn(el);
        } catch (e) {
          return false;
        } finally {

          // Remove from its parent by default
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }

          // release memory in IE
          el = null;
        }
      }

      /**
       * Adds the same handler for all of the specified attrs
       * @param {String} attrs Pipe-separated list of attributes
       * @param {Function} handler The method that will be applied
       */
      function addHandle(attrs, handler) {
        var arr = attrs.split("|"),
          i = arr.length;

        while (i--) {
          Expr.attrHandle[arr[i]] = handler;
        }
      }

      /**
       * Checks document order of two siblings
       * @param {Element} a
       * @param {Element} b
       * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
       */
      function siblingCheck(a, b) {
        var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
          a.sourceIndex - b.sourceIndex;

        // Use IE sourceIndex if available on both nodes
        if (diff) {
          return diff;
        }

        // Check if b follows a
        if (cur) {
          while ((cur = cur.nextSibling)) {
            if (cur === b) {
              return -1;
            }
          }
        }

        return a ? 1 : -1;
      }

      /**
       * Returns a function to use in pseudos for input types
       * @param {String} type
       */
      function createInputPseudo(type) {
        return function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === type;
        };
      }

      /**
       * Returns a function to use in pseudos for buttons
       * @param {String} type
       */
      function createButtonPseudo(type) {
        return function(elem) {
          var name = elem.nodeName.toLowerCase();
          return (name === "input" || name === "button") && elem.type === type;
        };
      }

      /**
       * Returns a function to use in pseudos for :enabled/:disabled
       * @param {Boolean} disabled true for :disabled; false for :enabled
       */
      function createDisabledPseudo(disabled) {

        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
        return function(elem) {

          // Only certain elements can match :enabled or :disabled
          // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
          // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
          if ("form" in elem) {

            // Check for inherited disabledness on relevant non-disabled elements:
            // * listed form-associated elements in a disabled fieldset
            //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
            //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
            // * option elements in a disabled optgroup
            //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
            // All such elements have a "form" property.
            if (elem.parentNode && elem.disabled === false) {

              // Option elements defer to a parent optgroup if present
              if ("label" in elem) {
                if ("label" in elem.parentNode) {
                  return elem.parentNode.disabled === disabled;
                } else {
                  return elem.disabled === disabled;
                }
              }

              // Support: IE 6 - 11
              // Use the isDisabled shortcut property to check for disabled fieldset ancestors
              return elem.isDisabled === disabled ||

                // Where there is no isDisabled, check manually
                /* jshint -W018 */
                elem.isDisabled !== !disabled &&
                inDisabledFieldset(elem) === disabled;
            }

            return elem.disabled === disabled;

            // Try to winnow out elements that can't be disabled before trusting the disabled property.
            // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
            // even exist on them, let alone have a boolean value.
          } else if ("label" in elem) {
            return elem.disabled === disabled;
          }

          // Remaining elements are neither :enabled nor :disabled
          return false;
        };
      }

      /**
       * Returns a function to use in pseudos for positionals
       * @param {Function} fn
       */
      function createPositionalPseudo(fn) {
        return markFunction(function(argument) {
          argument = +argument;
          return markFunction(function(seed, matches) {
            var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;

            // Match elements found at the specified indexes
            while (i--) {
              if (seed[(j = matchIndexes[i])]) {
                seed[j] = !(matches[j] = seed[j]);
              }
            }
          });
        });
      }

      /**
       * Checks a node for validity as a Sizzle context
       * @param {Element|Object=} context
       * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
       */
      function testContext(context) {
        return context && typeof context.getElementsByTagName !== "undefined" && context;
      }

      // Expose support vars for convenience
      support = Sizzle.support = {};

      /**
       * Detects XML nodes
       * @param {Element|Object} elem An element or a document
       * @returns {Boolean} True iff elem is a non-HTML XML node
       */
      isXML = Sizzle.isXML = function(elem) {
        var namespace = elem && elem.namespaceURI,
          docElem = elem && (elem.ownerDocument || elem).documentElement;

        // Support: IE <=8
        // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
        // https://bugs.jquery.com/ticket/4833
        return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
      };

      /**
       * Sets document-related variables once based on the current document
       * @param {Element|Object} [doc] An element or document object to use to set the document
       * @returns {Object} Returns the current document
       */
      setDocument = Sizzle.setDocument = function(node) {
        var hasCompare, subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc;

        // Return early if doc is invalid or already selected
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
          return document;
        }

        // Update global variables
        document = doc;
        docElem = document.documentElement;
        documentIsHTML = !isXML(document);

        // Support: IE 9 - 11+, Edge 12 - 18+
        // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if (preferredDoc != document &&
          (subWindow = document.defaultView) && subWindow.top !== subWindow) {

          // Support: IE 11, Edge
          if (subWindow.addEventListener) {
            subWindow.addEventListener("unload", unloadHandler, false);

            // Support: IE 9 - 10 only
          } else if (subWindow.attachEvent) {
            subWindow.attachEvent("onunload", unloadHandler);
          }
        }

        // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
        // Safari 4 - 5 only, Opera <=11.6 - 12.x only
        // IE/Edge & older browsers don't support the :scope pseudo-class.
        // Support: Safari 6.0 only
        // Safari 6.0 supports :scope but it's an alias of :root there.
        support.scope = assert(function(el) {
          docElem.appendChild(el).appendChild(document.createElement("div"));
          return typeof el.querySelectorAll !== "undefined" &&
            !el.querySelectorAll(":scope fieldset div").length;
        });

        /* Attributes
        ---------------------------------------------------------------------- */

        // Support: IE<8
        // Verify that getAttribute really returns attributes and not properties
        // (excepting IE8 booleans)
        support.attributes = assert(function(el) {
          el.className = "i";
          return !el.getAttribute("className");
        });

        /* getElement(s)By*
        ---------------------------------------------------------------------- */

        // Check if getElementsByTagName("*") returns only elements
        support.getElementsByTagName = assert(function(el) {
          el.appendChild(document.createComment(""));
          return !el.getElementsByTagName("*").length;
        });

        // Support: IE<9
        support.getElementsByClassName = rnative.test(document.getElementsByClassName);

        // Support: IE<10
        // Check if getElementById returns elements by name
        // The broken getElementById methods don't pick up programmatically-set names,
        // so use a roundabout getElementsByName test
        support.getById = assert(function(el) {
          docElem.appendChild(el).id = expando;
          return !document.getElementsByName || !document.getElementsByName(expando).length;
        });

        // ID filter and find
        if (support.getById) {
          Expr.filter["ID"] = function(id) {
            var attrId = id.replace(runescape, funescape);
            return function(elem) {
              return elem.getAttribute("id") === attrId;
            };
          };
          Expr.find["ID"] = function(id, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var elem = context.getElementById(id);
              return elem ? [elem] : [];
            }
          };
        } else {
          Expr.filter["ID"] = function(id) {
            var attrId = id.replace(runescape, funescape);
            return function(elem) {
              var node = typeof elem.getAttributeNode !== "undefined" &&
                elem.getAttributeNode("id");
              return node && node.value === attrId;
            };
          };

          // Support: IE 6 - 7 only
          // getElementById is not reliable as a find shortcut
          Expr.find["ID"] = function(id, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var node, i, elems,
                elem = context.getElementById(id);

              if (elem) {

                // Verify the id attribute
                node = elem.getAttributeNode("id");
                if (node && node.value === id) {
                  return [elem];
                }

                // Fall back on getElementsByName
                elems = context.getElementsByName(id);
                i = 0;
                while ((elem = elems[i++])) {
                  node = elem.getAttributeNode("id");
                  if (node && node.value === id) {
                    return [elem];
                  }
                }
              }

              return [];
            }
          };
        }

        // Tag
        Expr.find["TAG"] = support.getElementsByTagName ?
          function(tag, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
              return context.getElementsByTagName(tag);

              // DocumentFragment nodes don't have gEBTN
            } else if (support.qsa) {
              return context.querySelectorAll(tag);
            }
          } :

          function(tag, context) {
            var elem,
              tmp = [],
              i = 0,

              // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
              results = context.getElementsByTagName(tag);

            // Filter out possible comments
            if (tag === "*") {
              while ((elem = results[i++])) {
                if (elem.nodeType === 1) {
                  tmp.push(elem);
                }
              }

              return tmp;
            }
            return results;
          };

        // Class
        Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
            return context.getElementsByClassName(className);
          }
        };

        /* QSA/matchesSelector
        ---------------------------------------------------------------------- */

        // QSA and matchesSelector support

        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
        rbuggyMatches = [];

        // qSa(:focus) reports false when true (Chrome 21)
        // We allow this because of a bug in IE8/9 that throws an error
        // whenever `document.activeElement` is accessed on an iframe
        // So, we allow :focus to pass through QSA all the time to avoid the IE error
        // See https://bugs.jquery.com/ticket/13378
        rbuggyQSA = [];

        if ((support.qsa = rnative.test(document.querySelectorAll))) {

          // Build QSA regex
          // Regex strategy adopted from Diego Perini
          assert(function(el) {

            var input;

            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explicitly
            // setting a boolean content attribute,
            // since its presence should be enough
            // https://bugs.jquery.com/ticket/12359
            docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
              "<select id='" + expando + "-\r\\' msallowcapture=''>" +
              "<option selected=''></option></select>";

            // Support: IE8, Opera 11-12.16
            // Nothing should be selected when empty strings follow ^= or $= or *=
            // The test attribute must be unknown in Opera but "safe" for WinRT
            // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
            if (el.querySelectorAll("[msallowcapture^='']").length) {
              rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
            }

            // Support: IE8
            // Boolean attributes and "value" are not treated correctly
            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }

            // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }

            // Support: IE 11+, Edge 15 - 18+
            // IE 11/Edge don't find elements on a `[name='']` query in some cases.
            // Adding a temporary attribute to the document before the selection works
            // around the issue.
            // Interestingly, IE 10 & older don't seem to have the issue.
            input = document.createElement("input");
            input.setAttribute("name", "");
            el.appendChild(input);
            if (!el.querySelectorAll("[name='']").length) {
              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" +
                whitespace + "*(?:''|\"\")");
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here and will not see later tests
            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }

            // Support: Safari 8+, iOS 8+
            // https://bugs.webkit.org/show_bug.cgi?id=136851
            // In-page `selector#id sibling-combinator selector` fails
            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }

            // Support: Firefox <=3.6 - 5 only
            // Old Firefox doesn't throw on a badly-escaped identifier.
            el.querySelectorAll("\\\f");
            rbuggyQSA.push("[\\r\\n\\f]");
          });

          assert(function(el) {
            el.innerHTML = "<a href='' disabled='disabled'></a>" +
              "<select disabled='disabled'><option/></select>";

            // Support: Windows 8 Native Apps
            // The type and name attributes are restricted during .innerHTML assignment
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");

            // Support: IE8
            // Enforce case-sensitivity of name attribute
            if (el.querySelectorAll("[name=d]").length) {
              rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here and will not see later tests
            if (el.querySelectorAll(":enabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }

            // Support: IE9-11+
            // IE's :disabled selector does not pick up the children of disabled fieldsets
            docElem.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }

            // Support: Opera 10 - 11 only
            // Opera 10-11 does not throw on post-comma invalid pseudos
            el.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
          });
        }

        if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
            docElem.webkitMatchesSelector ||
            docElem.mozMatchesSelector ||
            docElem.oMatchesSelector ||
            docElem.msMatchesSelector)))) {

          assert(function(el) {

            // Check to see if it's possible to do matchesSelector
            // on a disconnected node (IE 9)
            support.disconnectedMatch = matches.call(el, "*");

            // This should fail with an exception
            // Gecko does not error, returns false instead
            matches.call(el, "[s!='']:x");
            rbuggyMatches.push("!=", pseudos);
          });
        }

        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
        rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

        /* Contains
        ---------------------------------------------------------------------- */
        hasCompare = rnative.test(docElem.compareDocumentPosition);

        // Element contains another
        // Purposefully self-exclusive
        // As in, an element does not contain itself
        contains = hasCompare || rnative.test(docElem.contains) ?
          function(a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
              bup = b && b.parentNode;
            return a === bup || !!(bup && bup.nodeType === 1 && (
              adown.contains ?
              adown.contains(bup) :
              a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
            ));
          } :
          function(a, b) {
            if (b) {
              while ((b = b.parentNode)) {
                if (b === a) {
                  return true;
                }
              }
            }
            return false;
          };

        /* Sorting
        ---------------------------------------------------------------------- */

        // Document order sorting
        sortOrder = hasCompare ?
          function(a, b) {

            // Flag for duplicate removal
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }

            // Sort on method existence if only one input has compareDocumentPosition
            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
            if (compare) {
              return compare;
            }

            // Calculate position if both inputs belong to the same document
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            compare = (a.ownerDocument || a) == (b.ownerDocument || b) ?
              a.compareDocumentPosition(b) :

              // Otherwise we know they are disconnected
              1;

            // Disconnected nodes
            if (compare & 1 ||
              (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

              // Choose the first element that is related to our preferred document
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              if (a == document || a.ownerDocument == preferredDoc &&
                contains(preferredDoc, a)) {
                return -1;
              }

              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              if (b == document || b.ownerDocument == preferredDoc &&
                contains(preferredDoc, b)) {
                return 1;
              }

              // Maintain original order
              return sortInput ?
                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                0;
            }

            return compare & 4 ? -1 : 1;
          } :
          function(a, b) {

            // Exit early if the nodes are identical
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }

            var cur,
              i = 0,
              aup = a.parentNode,
              bup = b.parentNode,
              ap = [a],
              bp = [b];

            // Parentless nodes are either documents or disconnected
            if (!aup || !bup) {

              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              /* eslint-disable eqeqeq */
              return a == document ? -1 :
                b == document ? 1 :
                /* eslint-enable eqeqeq */
                aup ? -1 :
                bup ? 1 :
                sortInput ?
                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                0;

              // If the nodes are siblings, we can do a quick check
            } else if (aup === bup) {
              return siblingCheck(a, b);
            }

            // Otherwise we need full lists of their ancestors for comparison
            cur = a;
            while ((cur = cur.parentNode)) {
              ap.unshift(cur);
            }
            cur = b;
            while ((cur = cur.parentNode)) {
              bp.unshift(cur);
            }

            // Walk down the tree looking for a discrepancy
            while (ap[i] === bp[i]) {
              i++;
            }

            return i ?

              // Do a sibling check if the nodes have a common ancestor
              siblingCheck(ap[i], bp[i]) :

              // Otherwise nodes in our document sort first
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              /* eslint-disable eqeqeq */
              ap[i] == preferredDoc ? -1 :
              bp[i] == preferredDoc ? 1 :
              /* eslint-enable eqeqeq */
              0;
          };

        return document;
      };

      Sizzle.matches = function(expr, elements) {
        return Sizzle(expr, null, null, elements);
      };

      Sizzle.matchesSelector = function(elem, expr) {
        setDocument(elem);

        if (support.matchesSelector && documentIsHTML &&
          !nonnativeSelectorCache[expr + " "] &&
          (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
          (!rbuggyQSA || !rbuggyQSA.test(expr))) {

          try {
            var ret = matches.call(elem, expr);

            // IE 9's matchesSelector returns false on disconnected nodes
            if (ret || support.disconnectedMatch ||

              // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11) {
              return ret;
            }
          } catch (e) {
            nonnativeSelectorCache(expr, true);
          }
        }

        return Sizzle(expr, document, null, [elem]).length > 0;
      };

      Sizzle.contains = function(context, elem) {

        // Set document vars if needed
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ((context.ownerDocument || context) != document) {
          setDocument(context);
        }
        return contains(context, elem);
      };

      Sizzle.attr = function(elem, name) {

        // Set document vars if needed
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ((elem.ownerDocument || elem) != document) {
          setDocument(elem);
        }

        var fn = Expr.attrHandle[name.toLowerCase()],

          // Don't get fooled by Object.prototype properties (jQuery #13807)
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
          fn(elem, name, !documentIsHTML) :
          undefined;

        return val !== undefined ?
          val :
          support.attributes || !documentIsHTML ?
          elem.getAttribute(name) :
          (val = elem.getAttributeNode(name)) && val.specified ?
          val.value :
          null;
      };

      Sizzle.escape = function(sel) {
        return (sel + "").replace(rcssescape, fcssescape);
      };

      Sizzle.error = function(msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
      };

      /**
       * Document sorting and removing duplicates
       * @param {ArrayLike} results
       */
      Sizzle.uniqueSort = function(results) {
        var elem,
          duplicates = [],
          j = 0,
          i = 0;

        // Unless we *know* we can detect duplicates, assume their presence
        hasDuplicate = !support.detectDuplicates;
        sortInput = !support.sortStable && results.slice(0);
        results.sort(sortOrder);

        if (hasDuplicate) {
          while ((elem = results[i++])) {
            if (elem === results[i]) {
              j = duplicates.push(i);
            }
          }
          while (j--) {
            results.splice(duplicates[j], 1);
          }
        }

        // Clear input after sorting to release objects
        // See https://github.com/jquery/sizzle/pull/225
        sortInput = null;

        return results;
      };

      /**
       * Utility function for retrieving the text value of an array of DOM nodes
       * @param {Array|Element} elem
       */
      getText = Sizzle.getText = function(elem) {
        var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;

        if (!nodeType) {

          // If no nodeType, this is expected to be an array
          while ((node = elem[i++])) {

            // Do not traverse comment nodes
            ret += getText(node);
          }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {

          // Use textContent for elements
          // innerText usage removed for consistency of new lines (jQuery #11153)
          if (typeof elem.textContent === "string") {
            return elem.textContent;
          } else {

            // Traverse its children
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem);
            }
          }
        } else if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }

        // Do not include comment or processing instruction nodes

        return ret;
      };

      Expr = Sizzle.selectors = {

        // Can be adjusted by the user
        cacheLength: 50,

        createPseudo: markFunction,

        match: matchExpr,

        attrHandle: {},

        find: {},

        relative: {
          ">": {
            dir: "parentNode",
            first: true
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: true
          },
          "~": {
            dir: "previousSibling"
          }
        },

        preFilter: {
          "ATTR": function(match) {
            match[1] = match[1].replace(runescape, funescape);

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = (match[3] || match[4] ||
              match[5] || "").replace(runescape, funescape);

            if (match[2] === "~=") {
              match[3] = " " + match[3] + " ";
            }

            return match.slice(0, 4);
          },

          "CHILD": function(match) {

            /* matches from matchExpr["CHILD"]
            	1 type (only|nth|...)
            	2 what (child|of-type)
            	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
            	4 xn-component of xn+y argument ([+-]?\d*n|)
            	5 sign of xn-component
            	6 x of xn-component
            	7 sign of y-component
            	8 y of y-component
            */
            match[1] = match[1].toLowerCase();

            if (match[1].slice(0, 3) === "nth") {

              // nth-* requires argument
              if (!match[3]) {
                Sizzle.error(match[0]);
              }

              // numeric x and y parameters for Expr.filter.CHILD
              // remember that false/true cast respectively to 0/1
              match[4] = +(match[4] ?
                match[5] + (match[6] || 1) :
                2 * (match[3] === "even" || match[3] === "odd"));
              match[5] = +((match[7] + match[8]) || match[3] === "odd");

              // other types prohibit arguments
            } else if (match[3]) {
              Sizzle.error(match[0]);
            }

            return match;
          },

          "PSEUDO": function(match) {
            var excess,
              unquoted = !match[6] && match[2];

            if (matchExpr["CHILD"].test(match[0])) {
              return null;
            }

            // Accept quoted arguments as-is
            if (match[3]) {
              match[2] = match[4] || match[5] || "";

              // Strip excess characters from unquoted arguments
            } else if (unquoted && rpseudo.test(unquoted) &&

              // Get excess from tokenize (recursively)
              (excess = tokenize(unquoted, true)) &&

              // advance to the next closing parenthesis
              (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

              // excess is a negative index
              match[0] = match[0].slice(0, excess);
              match[2] = unquoted.slice(0, excess);
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice(0, 3);
          }
        },

        filter: {

          "TAG": function(nodeNameSelector) {
            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
            return nodeNameSelector === "*" ?
              function() {
                return true;
              } :
              function(elem) {
                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
              };
          },

          "CLASS": function(className) {
            var pattern = classCache[className + " "];

            return pattern ||
              (pattern = new RegExp("(^|" + whitespace +
                ")" + className + "(" + whitespace + "|$)")) && classCache(
                className,
                function(elem) {
                  return pattern.test(
                    typeof elem.className === "string" && elem.className ||
                    typeof elem.getAttribute !== "undefined" &&
                    elem.getAttribute("class") ||
                    ""
                  );
                });
          },

          "ATTR": function(name, operator, check) {
            return function(elem) {
              var result = Sizzle.attr(elem, name);

              if (result == null) {
                return operator === "!=";
              }
              if (!operator) {
                return true;
              }

              result += "";

              /* eslint-disable max-len */

              return operator === "=" ? result === check :
                operator === "!=" ? result !== check :
                operator === "^=" ? check && result.indexOf(check) === 0 :
                operator === "*=" ? check && result.indexOf(check) > -1 :
                operator === "$=" ? check && result.slice(-check.length) === check :
                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                false;
              /* eslint-enable max-len */

            };
          },

          "CHILD": function(type, what, _argument, first, last) {
            var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";

            return first === 1 && last === 0 ?

              // Shortcut for :nth-*(n)
              function(elem) {
                return !!elem.parentNode;
              } :

              function(elem, _context, xml) {
                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                  dir = simple !== forward ? "nextSibling" : "previousSibling",
                  parent = elem.parentNode,
                  name = ofType && elem.nodeName.toLowerCase(),
                  useCache = !xml && !ofType,
                  diff = false;

                if (parent) {

                  // :(first|last|only)-(child|of-type)
                  if (simple) {
                    while (dir) {
                      node = elem;
                      while ((node = node[dir])) {
                        if (ofType ?
                          node.nodeName.toLowerCase() === name :
                          node.nodeType === 1) {

                          return false;
                        }
                      }

                      // Reverse direction for :only-* (if we haven't yet done so)
                      start = dir = type === "only" && !start && "nextSibling";
                    }
                    return true;
                  }

                  start = [forward ? parent.firstChild : parent.lastChild];

                  // non-xml :nth-child(...) stores cache data on `parent`
                  if (forward && useCache) {

                    // Seek `elem` from a previously-cached index

                    // ...in a gzip-friendly way
                    node = parent;
                    outerCache = node[expando] || (node[expando] = {});

                    // Support: IE <9 only
                    // Defend against cloned attroperties (jQuery gh-1709)
                    uniqueCache = outerCache[node.uniqueID] ||
                      (outerCache[node.uniqueID] = {});

                    cache = uniqueCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex && cache[2];
                    node = nodeIndex && parent.childNodes[nodeIndex];

                    while ((node = ++nodeIndex && node && node[dir] ||

                        // Fallback to seeking `elem` from the start
                        (diff = nodeIndex = 0) || start.pop())) {

                      // When found, cache indexes on `parent` and break
                      if (node.nodeType === 1 && ++diff && node === elem) {
                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                        break;
                      }
                    }

                  } else {

                    // Use previously-cached element index if available
                    if (useCache) {

                      // ...in a gzip-friendly way
                      node = elem;
                      outerCache = node[expando] || (node[expando] = {});

                      // Support: IE <9 only
                      // Defend against cloned attroperties (jQuery gh-1709)
                      uniqueCache = outerCache[node.uniqueID] ||
                        (outerCache[node.uniqueID] = {});

                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex;
                    }

                    // xml :nth-child(...)
                    // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                    if (diff === false) {

                      // Use the same loop as above to seek `elem` from the start
                      while ((node = ++nodeIndex && node && node[dir] ||
                          (diff = nodeIndex = 0) || start.pop())) {

                        if ((ofType ?
                            node.nodeName.toLowerCase() === name :
                            node.nodeType === 1) &&
                          ++diff) {

                          // Cache the index of each encountered element
                          if (useCache) {
                            outerCache = node[expando] ||
                              (node[expando] = {});

                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache = outerCache[node.uniqueID] ||
                              (outerCache[node.uniqueID] = {});

                            uniqueCache[type] = [dirruns, diff];
                          }

                          if (node === elem) {
                            break;
                          }
                        }
                      }
                    }
                  }

                  // Incorporate the offset, then check against cycle size
                  diff -= last;
                  return diff === first || (diff % first === 0 && diff / first >= 0);
                }
              };
          },

          "PSEUDO": function(pseudo, argument) {

            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
              Sizzle.error("unsupported pseudo: " + pseudo);

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as Sizzle does
            if (fn[expando]) {
              return fn(argument);
            }

            // But maintain support for old signatures
            if (fn.length > 1) {
              args = [pseudo, pseudo, "", argument];
              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                markFunction(function(seed, matches) {
                  var idx,
                    matched = fn(seed, argument),
                    i = matched.length;
                  while (i--) {
                    idx = indexOf(seed, matched[i]);
                    seed[idx] = !(matches[idx] = matched[i]);
                  }
                }) :
                function(elem) {
                  return fn(elem, 0, args);
                };
            }

            return fn;
          }
        },

        pseudos: {

          // Potentially complex pseudos
          "not": markFunction(function(selector) {

            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));

            return matcher[expando] ?
              markFunction(function(seed, matches, _context, xml) {
                var elem,
                  unmatched = matcher(seed, null, xml, []),
                  i = seed.length;

                // Match elements unmatched by `matcher`
                while (i--) {
                  if ((elem = unmatched[i])) {
                    seed[i] = !(matches[i] = elem);
                  }
                }
              }) :
              function(elem, _context, xml) {
                input[0] = elem;
                matcher(input, null, xml, results);

                // Don't keep the element (issue #299)
                input[0] = null;
                return !results.pop();
              };
          }),

          "has": markFunction(function(selector) {
            return function(elem) {
              return Sizzle(selector, elem).length > 0;
            };
          }),

          "contains": markFunction(function(text) {
            text = text.replace(runescape, funescape);
            return function(elem) {
              return (elem.textContent || getText(elem)).indexOf(text) > -1;
            };
          }),

          // "Whether an element is represented by a :lang() selector
          // is based solely on the element's language value
          // being equal to the identifier C,
          // or beginning with the identifier C immediately followed by "-".
          // The matching of C against the element's language value is performed case-insensitively.
          // The identifier C does not have to be a valid language name."
          // http://www.w3.org/TR/selectors/#lang-pseudo
          "lang": markFunction(function(lang) {

            // lang value must be a valid identifier
            if (!ridentifier.test(lang || "")) {
              Sizzle.error("unsupported lang: " + lang);
            }
            lang = lang.replace(runescape, funescape).toLowerCase();
            return function(elem) {
              var elemLang;
              do {
                if ((elemLang = documentIsHTML ?
                    elem.lang :
                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                  elemLang = elemLang.toLowerCase();
                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1);
              return false;
            };
          }),

          // Miscellaneous
          "target": function(elem) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice(1) === elem.id;
          },

          "root": function(elem) {
            return elem === docElem;
          },

          "focus": function(elem) {
            return elem === document.activeElement &&
              (!document.hasFocus || document.hasFocus()) &&
              !!(elem.type || elem.href || ~elem.tabIndex);
          },

          // Boolean properties
          "enabled": createDisabledPseudo(false),
          "disabled": createDisabledPseudo(true),

          "checked": function(elem) {

            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !!elem.checked) ||
              (nodeName === "option" && !!elem.selected);
          },

          "selected": function(elem) {

            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if (elem.parentNode) {
              // eslint-disable-next-line no-unused-expressions
              elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
          },

          // Contents
          "empty": function(elem) {

            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
            //   but not by others (comment: 8; processing instruction: 7; etc.)
            // nodeType < 6 works because attributes (2) do not appear as children
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false;
              }
            }
            return true;
          },

          "parent": function(elem) {
            return !Expr.pseudos["empty"](elem);
          },

          // Element/input types
          "header": function(elem) {
            return rheader.test(elem.nodeName);
          },

          "input": function(elem) {
            return rinputs.test(elem.nodeName);
          },

          "button": function(elem) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === "button" || name === "button";
          },

          "text": function(elem) {
            var attr;
            return elem.nodeName.toLowerCase() === "input" &&
              elem.type === "text" &&

              // Support: IE<8
              // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
              ((attr = elem.getAttribute("type")) == null ||
                attr.toLowerCase() === "text");
          },

          // Position-in-collection
          "first": createPositionalPseudo(function() {
            return [0];
          }),

          "last": createPositionalPseudo(function(_matchIndexes, length) {
            return [length - 1];
          }),

          "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument];
          }),

          "even": createPositionalPseudo(function(matchIndexes, length) {
            var i = 0;
            for (; i < length; i += 2) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),

          "odd": createPositionalPseudo(function(matchIndexes, length) {
            var i = 1;
            for (; i < length; i += 2) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),

          "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
            var i = argument < 0 ?
              argument + length :
              argument > length ?
              length :
              argument;
            for (; --i >= 0;) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),

          "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument;
            for (; ++i < length;) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          })
        }
      };

      Expr.pseudos["nth"] = Expr.pseudos["eq"];

      // Add button/input type pseudos
      for (i in {
          radio: true,
          checkbox: true,
          file: true,
          password: true,
          image: true
        }) {
        Expr.pseudos[i] = createInputPseudo(i);
      }
      for (i in {
          submit: true,
          reset: true
        }) {
        Expr.pseudos[i] = createButtonPseudo(i);
      }

      // Easy API for creating new setFilters
      function setFilters() {}
      setFilters.prototype = Expr.filters = Expr.pseudos;
      Expr.setFilters = new setFilters();

      tokenize = Sizzle.tokenize = function(selector, parseOnly) {
        var matched, match, tokens, type,
          soFar, groups, preFilters,
          cached = tokenCache[selector + " "];

        if (cached) {
          return parseOnly ? 0 : cached.slice(0);
        }

        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;

        while (soFar) {

          // Comma and first run
          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {

              // Don't consume trailing commas as valid
              soFar = soFar.slice(match[0].length) || soFar;
            }
            groups.push((tokens = []));
          }

          matched = false;

          // Combinators
          if ((match = rcombinators.exec(soFar))) {
            matched = match.shift();
            tokens.push({
              value: matched,

              // Cast descendant combinators to space
              type: match[0].replace(rtrim, " ")
            });
            soFar = soFar.slice(matched.length);
          }

          // Filters
          for (type in Expr.filter) {
            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                (match = preFilters[type](match)))) {
              matched = match.shift();
              tokens.push({
                value: matched,
                type: type,
                matches: match
              });
              soFar = soFar.slice(matched.length);
            }
          }

          if (!matched) {
            break;
          }
        }

        // Return the length of the invalid excess
        // if we're just parsing
        // Otherwise, throw an error or return tokens
        return parseOnly ?
          soFar.length :
          soFar ?
          Sizzle.error(selector) :

          // Cache the tokens
          tokenCache(selector, groups).slice(0);
      };

      function toSelector(tokens) {
        var i = 0,
          len = tokens.length,
          selector = "";
        for (; i < len; i++) {
          selector += tokens[i].value;
        }
        return selector;
      }

      function addCombinator(matcher, combinator, base) {
        var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;

        return combinator.first ?

          // Check against closest ancestor/preceding element
          function(elem, context, xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                return matcher(elem, context, xml);
              }
            }
            return false;
          } :

          // Check against all ancestor/preceding elements
          function(elem, context, xml) {
            var oldCache, uniqueCache, outerCache,
              newCache = [dirruns, doneName];

            // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
            if (xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  if (matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            } else {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  outerCache = elem[expando] || (elem[expando] = {});

                  // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)
                  uniqueCache = outerCache[elem.uniqueID] ||
                    (outerCache[elem.uniqueID] = {});

                  if (skip && skip === elem.nodeName.toLowerCase()) {
                    elem = elem[dir] || elem;
                  } else if ((oldCache = uniqueCache[key]) &&
                    oldCache[0] === dirruns && oldCache[1] === doneName) {

                    // Assign to newCache so results back-propagate to previous elements
                    return (newCache[2] = oldCache[2]);
                  } else {

                    // Reuse newcache so results back-propagate to previous elements
                    uniqueCache[key] = newCache;

                    // A match means we're done; a fail means we have to keep checking
                    if ((newCache[2] = matcher(elem, context, xml))) {
                      return true;
                    }
                  }
                }
              }
            }
            return false;
          };
      }

      function elementMatcher(matchers) {
        return matchers.length > 1 ?
          function(elem, context, xml) {
            var i = matchers.length;
            while (i--) {
              if (!matchers[i](elem, context, xml)) {
                return false;
              }
            }
            return true;
          } :
          matchers[0];
      }

      function multipleContexts(selector, contexts, results) {
        var i = 0,
          len = contexts.length;
        for (; i < len; i++) {
          Sizzle(selector, contexts[i], results);
        }
        return results;
      }

      function condense(unmatched, map, filter, context, xml) {
        var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;

        for (; i < len; i++) {
          if ((elem = unmatched[i])) {
            if (!filter || filter(elem, context, xml)) {
              newUnmatched.push(elem);
              if (mapped) {
                map.push(i);
              }
            }
          }
        }

        return newUnmatched;
      }

      function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
        if (postFilter && !postFilter[expando]) {
          postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[expando]) {
          postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function(seed, results, context, xml) {
          var temp, i, elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts(
              selector || "*",
              context.nodeType ? [context] : context,
              []
            ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && (seed || !selector) ?
            condense(elems, preMap, preFilter, context, xml) :
            elems,

            matcherOut = matcher ?

            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
            postFinder || (seed ? preFilter : preexisting || postFilter) ?

            // ...intermediate processing is necessary
            [] :

            // ...otherwise use results directly
            results :
            matcherIn;

          // Find primary matches
          if (matcher) {
            matcher(matcherIn, matcherOut, context, xml);
          }

          // Apply postFilter
          if (postFilter) {
            temp = condense(matcherOut, postMap);
            postFilter(temp, [], context, xml);

            // Un-match failing elements by moving them back to matcherIn
            i = temp.length;
            while (i--) {
              if ((elem = temp[i])) {
                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
              }
            }
          }

          if (seed) {
            if (postFinder || preFilter) {
              if (postFinder) {

                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                temp = [];
                i = matcherOut.length;
                while (i--) {
                  if ((elem = matcherOut[i])) {

                    // Restore matcherIn since elem is not yet a final match
                    temp.push((matcherIn[i] = elem));
                  }
                }
                postFinder(null, (matcherOut = []), temp, xml);
              }

              // Move matched elements from seed to results to keep them synchronized
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i]) &&
                  (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                  seed[temp] = !(results[temp] = elem);
                }
              }
            }

            // Add elements to results, through postFinder if defined
          } else {
            matcherOut = condense(
              matcherOut === results ?
              matcherOut.splice(preexisting, matcherOut.length) :
              matcherOut
            );
            if (postFinder) {
              postFinder(null, results, matcherOut, xml);
            } else {
              push.apply(results, matcherOut);
            }
          }
        });
      }

      function matcherFromTokens(tokens) {
        var checkContext, matcher, j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,

          // The foundational matcher ensures that elements are reachable from top-level context(s)
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
              (checkContext = context).nodeType ?
              matchContext(elem, context, xml) :
              matchAnyContext(elem, context, xml));

            // Avoid hanging onto element (issue #299)
            checkContext = null;
            return ret;
          }];

        for (; i < len; i++) {
          if ((matcher = Expr.relative[tokens[i].type])) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)];
          } else {
            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

            // Return special upon seeing a positional matcher
            if (matcher[expando]) {

              // Find the next relative operator (if any) for proper handling
              j = ++i;
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break;
                }
              }
              return setMatcher(
                i > 1 && elementMatcher(matchers),
                i > 1 && toSelector(

                  // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                  tokens
                  .slice(0, i - 1)
                  .concat({
                    value: tokens[i - 2].type === " " ? "*" : ""
                  })
                ).replace(rtrim, "$1"),
                matcher,
                i < j && matcherFromTokens(tokens.slice(i, j)),
                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                j < len && toSelector(tokens)
              );
            }
            matchers.push(matcher);
          }
        }

        return elementMatcher(matchers);
      }

      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem, j, matcher,
              matchedCount = 0,
              i = "0",
              unmatched = seed && [],
              setMatched = [],
              contextBackup = outermostContext,

              // We must always have either seed elements or outermost context
              elems = seed || byElement && Expr.find["TAG"]("*", outermost),

              // Use integer dirruns iff this is the outermost matcher
              dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
              len = elems.length;

            if (outermost) {

              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              outermostContext = context == document || context || outermost;
            }

            // Add elements passing elementMatchers directly to results
            // Support: IE<9, Safari
            // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;

                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if (!context && elem.ownerDocument != document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }

              // Track unmatched elements for set filters
              if (bySet) {

                // They will have gone through all possible matchers
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }

                // Lengthen the array for every element, matched or not
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }

            // `i` is now the count of elements visited above, and adding it to `matchedCount`
            // makes the latter nonnegative.
            matchedCount += i;

            // Apply set filters to unmatched elements
            // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
            // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
            // no element matchers and no seed.
            // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
            // case, which will result in a "00" `matchedCount` that differs from `i` but is also
            // numerically zero.
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }

              if (seed) {

                // Reintegrate element matches to eliminate the need for sorting
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }

                // Discard index placeholder values to get only actual matches
                setMatched = condense(setMatched);
              }

              // Add matches to results
              push.apply(results, setMatched);

              // Seedless set matches succeeding multiple successful matchers stipulate sorting
              if (outermost && !seed && setMatched.length > 0 &&
                (matchedCount + setMatchers.length) > 1) {

                Sizzle.uniqueSort(results);
              }
            }

            // Override manipulation of globals by nested matchers
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }

            return unmatched;
          };

        return bySet ?
          markFunction(superMatcher) :
          superMatcher;
      }

      compile = Sizzle.compile = function(selector, match /* Internal Use Only */ ) {
        var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];

        if (!cached) {

          // Generate a function of recursive functions that can be used to check each element
          if (!match) {
            match = tokenize(selector);
          }
          i = match.length;
          while (i--) {
            cached = matcherFromTokens(match[i]);
            if (cached[expando]) {
              setMatchers.push(cached);
            } else {
              elementMatchers.push(cached);
            }
          }

          // Cache the compiled function
          cached = compilerCache(
            selector,
            matcherFromGroupMatchers(elementMatchers, setMatchers)
          );

          // Save selector and tokenization
          cached.selector = selector;
        }
        return cached;
      };

      /**
       * A low-level selection function that works with Sizzle's compiled
       *  selector functions
       * @param {String|Function} selector A selector or a pre-compiled
       *  selector function built with Sizzle.compile
       * @param {Element} context
       * @param {Array} [results]
       * @param {Array} [seed] A set of elements to match against
       */
      select = Sizzle.select = function(selector, context, results, seed) {
        var i, tokens, token, type, find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));

        results = results || [];

        // Try to minimize operations if there is only one selector in the list and no seed
        // (the latter of which guarantees us context)
        if (match.length === 1) {

          // Reduce context if the leading compound selector is an ID
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
            context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

            context = (Expr.find["ID"](token.matches[0]
              .replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results;

              // Precompiled matchers will still verify ancestry, so step up a level
            } else if (compiled) {
              context = context.parentNode;
            }

            selector = selector.slice(tokens.shift().value.length);
          }

          // Fetch a seed set for right-to-left matching
          i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];

            // Abort if we hit a combinator
            if (Expr.relative[(type = token.type)]) {
              break;
            }
            if ((find = Expr.find[type])) {

              // Search, expanding context for leading sibling combinators
              if ((seed = find(
                  token.matches[0].replace(runescape, funescape),
                  rsibling.test(tokens[0].type) && testContext(context.parentNode) ||
                  context
                ))) {

                // If seed is empty or no tokens remain, we can return early
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results;
                }

                break;
              }
            }
          }
        }

        // Compile and execute a filtering function if one is not provided
        // Provide `match` to avoid retokenization if we modified the selector above
        (compiled || compile(selector, match))(
          seed,
          context,
          !documentIsHTML,
          results,
          !context || rsibling.test(selector) && testContext(context.parentNode) || context
        );
        return results;
      };

      // One-time assignments

      // Sort stability
      support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

      // Support: Chrome 14-35+
      // Always assume duplicates if they aren't passed to the comparison function
      support.detectDuplicates = !!hasDuplicate;

      // Initialize against the default document
      setDocument();

      // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
      // Detached nodes confoundingly follow *each other*
      support.sortDetached = assert(function(el) {

        // Should return 1, but returns 4 (following)
        return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
      });

      // Support: IE<8
      // Prevent attribute/property "interpolation"
      // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
      if (!assert(function(el) {
          el.innerHTML = "<a href='#'></a>";
          return el.firstChild.getAttribute("href") === "#";
        })) {
        addHandle("type|href|height|width", function(elem, name, isXML) {
          if (!isXML) {
            return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
          }
        });
      }

      // Support: IE<9
      // Use defaultValue in place of getAttribute("value")
      if (!support.attributes || !assert(function(el) {
          el.innerHTML = "<input/>";
          el.firstChild.setAttribute("value", "");
          return el.firstChild.getAttribute("value") === "";
        })) {
        addHandle("value", function(elem, _name, isXML) {
          if (!isXML && elem.nodeName.toLowerCase() === "input") {
            return elem.defaultValue;
          }
        });
      }

      // Support: IE<9
      // Use getAttributeNode to fetch booleans when getAttribute lies
      if (!assert(function(el) {
          return el.getAttribute("disabled") == null;
        })) {
        addHandle(booleans, function(elem, name, isXML) {
          var val;
          if (!isXML) {
            return elem[name] === true ? name.toLowerCase() :
              (val = elem.getAttributeNode(name)) && val.specified ?
              val.value :
              null;
          }
        });
      }

      return Sizzle;

    })(window);



  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;

  // Deprecated
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;




  var dir = function(elem, dir, until) {
    var matched = [],
      truncate = until !== undefined;

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };


  var siblings = function(n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };


  var rneedsContext = jQuery.expr.match.needsContext;



  function nodeName(elem, name) {

    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

  }
  var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);



  // Implement the identical functionality for filter and not
  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }

    // Single element
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }

    // Arraylike of elements (jQuery, arguments, Array)
    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function(elem) {
        return (indexOf.call(qualifier, elem) > -1) !== not;
      });
    }

    // Filtered directly for both simple and complex selectors
    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];

    if (not) {
      expr = ":not(" + expr + ")";
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };

  jQuery.fn.extend({
    find: function(selector) {
      var i, ret,
        len = this.length,
        self = this;

      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(
        this,

        // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === "string" && rneedsContext.test(selector) ?
        jQuery(selector) :
        selector || [],
        false
      ).length;
    }
  });


  // Initialize a jQuery object


  // A central reference to the root jQuery(document)
  var rootjQuery,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

    init = jQuery.fn.init = function(selector, context, root) {
      var match, elem;

      // HANDLE: $(""), $(null), $(undefined), $(false)
      if (!selector) {
        return this;
      }

      // Method init() accepts an alternate rootjQuery
      // so migrate can support jQuery.sub (gh-2101)
      root = root || rootjQuery;

      // Handle HTML strings
      if (typeof selector === "string") {
        if (selector[0] === "<" &&
          selector[selector.length - 1] === ">" &&
          selector.length >= 3) {

          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];

        } else {
          match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {

          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;

            // Option to run scripts is true for back-compat
            // Intentionally let the error be thrown if parseHTML is not present
            jQuery.merge(this, jQuery.parseHTML(
              match[1],
              context && context.nodeType ? context.ownerDocument || context : document,
              true
            ));

            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {

                // Properties of context are called as methods if possible
                if (isFunction(this[match])) {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }

            return this;

            // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]);

            if (elem) {

              // Inject the element directly into the jQuery object
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }

          // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
          return (context || root).find(selector);

          // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        }

        // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (isFunction(selector)) {
        return root.ready !== undefined ?
          root.ready(selector) :

          // Execute immediately if ready is not present
          selector(jQuery);
      }

      return jQuery.makeArray(selector, this);
    };

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery(document);


  var rparentsprev = /^(?:parents|prev(?:Until|All))/,

    // Methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };

  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
        l = targets.length;

      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },

    closest: function(selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        targets = typeof selectors !== "string" && jQuery(selectors);

      // Positional selectors never match, since there's no _selection_ context
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ?
                targets.index(cur) > -1 :

                // Don't pass non-elements to Sizzle
                cur.nodeType === 1 &&
                jQuery.find.matchesSelector(cur, selectors))) {

              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },

    // Determine the position of an element within the set
    index: function(elem) {

      // No argument, return index in parent
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }

      // Index in selector
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }

      // Locate the position of the desired element
      return indexOf.call(this,

        // If it receives a jQuery object, the first element is used
        elem.jquery ? elem[0] : elem
      );
    },

    add: function(selector, context) {
      return this.pushStack(
        jQuery.uniqueSort(
          jQuery.merge(this.get(), jQuery(selector, context))
        )
      );
    },

    addBack: function(selector) {
      return this.add(selector == null ?
        this.prevObject : this.prevObject.filter(selector)
      );
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }

  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, _i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, _i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, _i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      if (elem.contentDocument != null &&

        // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        getProto(elem.contentDocument)) {

        return elem.contentDocument;
      }

      // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.
      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== "Until") {
        selector = until;
      }

      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {

        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }

        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);



  // Convert String-formatted options into Object-formatted ones
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }

  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function(options) {

    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
      createOptions(options) :
      jQuery.extend({}, options);

    var // Flag to know if list is currently firing
      firing,

      // Last fire value for non-forgettable lists
      memory,

      // Flag to know if list was already fired
      fired,

      // Flag to prevent firing
      locked,

      // Actual callback list
      list = [],

      // Queue of execution data for repeatable lists
      queue = [],

      // Index of currently firing callback (modified by add/remove as needed)
      firingIndex = -1,

      // Fire callbacks
      fire = function() {

        // Enforce single-firing
        locked = locked || options.once;

        // Execute callbacks for all pending executions,
        // respecting firingIndex overrides and runtime changes
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {

            // Run callback and check for early termination
            if (list[firingIndex].apply(memory[0], memory[1]) === false &&
              options.stopOnFalse) {

              // Jump to end and forget the data so .add doesn't re-fire
              firingIndex = list.length;
              memory = false;
            }
          }
        }

        // Forget the data if we're done with it
        if (!options.memory) {
          memory = false;
        }

        firing = false;

        // Clean up if we're done firing for good
        if (locked) {

          // Keep an empty list if we have data for future add calls
          if (memory) {
            list = [];

            // Otherwise, this object is spent
          } else {
            list = "";
          }
        }
      },

      // Actual Callbacks object
      self = {

        // Add a callback or a collection of callbacks to the list
        add: function() {
          if (list) {

            // If we have memory from a past run, we should fire after adding
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }

            (function add(args) {
              jQuery.each(args, function(_, arg) {
                if (isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {

                  // Inspect recursively
                  add(arg);
                }
              });
            })(arguments);

            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },

        // Remove a callback from the list
        remove: function() {
          jQuery.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);

              // Handle firing indexes
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },

        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function(fn) {
          return fn ?
            jQuery.inArray(fn, list) > -1 :
            list.length > 0;
        },

        // Remove all callbacks from the list
        empty: function() {
          if (list) {
            list = [];
          }
          return this;
        },

        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function() {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function() {
          return !list;
        },

        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function() {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = "";
          }
          return this;
        },
        locked: function() {
          return !!locked;
        },

        // Call all callbacks with the given context and arguments
        fireWith: function(context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },

        // Call all the callbacks with the given arguments
        fire: function() {
          self.fireWith(this, arguments);
          return this;
        },

        // To know if the callbacks have already been called at least once
        fired: function() {
          return !!fired;
        }
      };

    return self;
  };


  function Identity(v) {
    return v;
  }

  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {

      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction((method = value.promise))) {
        method.call(value).done(resolve).fail(reject);

        // Other thenables
      } else if (value && isFunction((method = value.then))) {
        method.call(value, resolve, reject);

        // Other non-thenables
      } else {

        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      }

      // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.
    } catch (value) {

      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({

    Deferred: function(func) {
      var tuples = [

          // action, add listener, callbacks,
          // ... .then handlers, argument index, [final state]
          ["notify", "progress", jQuery.Callbacks("memory"),
            jQuery.Callbacks("memory"), 2
          ],
          ["resolve", "done", jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"), 0, "resolved"
          ],
          ["reject", "fail", jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"), 1, "rejected"
          ]
        ],
        state = "pending",
        promise = {
          state: function() {
            return state;
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          "catch": function(fn) {
            return promise.then(null, fn);
          },

          // Keep pipe for back-compat
          pipe: function( /* fnDone, fnFail, fnProgress */ ) {
            var fns = arguments;

            return jQuery.Deferred(function(newDefer) {
              jQuery.each(tuples, function(_i, tuple) {

                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && isFunction(returned.promise)) {
                    returned.promise()
                      .progress(newDefer.notify)
                      .done(newDefer.resolve)
                      .fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](
                      this,
                      fn ? [returned] : arguments
                    );
                  }
                });
              });
              fns = null;
            }).promise();
          },
          then: function(onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;

            function resolve(depth, deferred, handler, special) {
              return function() {
                var that = this,
                  args = arguments,
                  mightThrow = function() {
                    var returned, then;

                    // Support: Promises/A+ section 2.3.3.3.3
                    // https://promisesaplus.com/#point-59
                    // Ignore double-resolution attempts
                    if (depth < maxDepth) {
                      return;
                    }

                    returned = handler.apply(that, args);

                    // Support: Promises/A+ section 2.3.1
                    // https://promisesaplus.com/#point-48
                    if (returned === deferred.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }

                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                    // https://promisesaplus.com/#point-54
                    // https://promisesaplus.com/#point-75
                    // Retrieve `then` only once
                    then = returned &&

                      // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      (typeof returned === "object" ||
                        typeof returned === "function") &&
                      returned.then;

                    // Handle a returned thenable
                    if (isFunction(then)) {

                      // Special processors (notify) just wait for resolution
                      if (special) {
                        then.call(
                          returned,
                          resolve(maxDepth, deferred, Identity, special),
                          resolve(maxDepth, deferred, Thrower, special)
                        );

                        // Normal processors (resolve) also hook into progress
                      } else {

                        // ...and disregard older resolution values
                        maxDepth++;

                        then.call(
                          returned,
                          resolve(maxDepth, deferred, Identity, special),
                          resolve(maxDepth, deferred, Thrower, special),
                          resolve(maxDepth, deferred, Identity,
                            deferred.notifyWith)
                        );
                      }

                      // Handle all other returned values
                    } else {

                      // Only substitute handlers pass on context
                      // and multiple values (non-spec behavior)
                      if (handler !== Identity) {
                        that = undefined;
                        args = [returned];
                      }

                      // Process the value(s)
                      // Default process is resolve
                      (special || deferred.resolveWith)(that, args);
                    }
                  },

                  // Only normal processors (resolve) catch and reject exceptions
                  process = special ?
                  mightThrow :
                  function() {
                    try {
                      mightThrow();
                    } catch (e) {

                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(e,
                          process.stackTrace);
                      }

                      // Support: Promises/A+ section 2.3.3.3.4.1
                      // https://promisesaplus.com/#point-61
                      // Ignore post-resolution exceptions
                      if (depth + 1 >= maxDepth) {

                        // Only substitute handlers pass on context
                        // and multiple values (non-spec behavior)
                        if (handler !== Thrower) {
                          that = undefined;
                          args = [e];
                        }

                        deferred.rejectWith(that, args);
                      }
                    }
                  };

                // Support: Promises/A+ section 2.3.3.3.1
                // https://promisesaplus.com/#point-57
                // Re-resolve promises immediately to dodge false rejection from
                // subsequent errors
                if (depth) {
                  process();
                } else {

                  // Call an optional hook to record the stack, in case of exception
                  // since it's otherwise lost when execution goes async
                  if (jQuery.Deferred.getStackHook) {
                    process.stackTrace = jQuery.Deferred.getStackHook();
                  }
                  window.setTimeout(process);
                }
              };
            }

            return jQuery.Deferred(function(newDefer) {

              // progress_handlers.add( ... )
              tuples[0][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onProgress) ?
                  onProgress :
                  Identity,
                  newDefer.notifyWith
                )
              );

              // fulfilled_handlers.add( ... )
              tuples[1][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onFulfilled) ?
                  onFulfilled :
                  Identity
                )
              );

              // rejected_handlers.add( ... )
              tuples[2][3].add(
                resolve(
                  0,
                  newDefer,
                  isFunction(onRejected) ?
                  onRejected :
                  Thrower
                )
              );
            }).promise();
          },

          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        },
        deferred = {};

      // Add list-specific methods
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[5];

        // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add
        promise[tuple[1]] = list.add;

        // Handle state
        if (stateString) {
          list.add(
            function() {

              // state = "resolved" (i.e., fulfilled)
              // state = "rejected"
              state = stateString;
            },

            // rejected_callbacks.disable
            // fulfilled_callbacks.disable
            tuples[3 - i][2].disable,

            // rejected_handlers.disable
            // fulfilled_handlers.disable
            tuples[3 - i][3].disable,

            // progress_callbacks.lock
            tuples[0][2].lock,

            // progress_handlers.lock
            tuples[0][3].lock
          );
        }

        // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire
        list.add(tuple[3].fire);

        // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        };

        // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith
        deferred[tuple[0] + "With"] = list.fireWith;
      });

      // Make the deferred a promise
      promise.promise(deferred);

      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }

      // All done!
      return deferred;
    },

    // Deferred helper
    when: function(singleValue) {
      var

        // count of uncompleted subordinates
        remaining = arguments.length,

        // count of unprocessed arguments
        i = remaining,

        // subordinate fulfillment data
        resolveContexts = Array(i),
        resolveValues = slice.call(arguments),

        // the primary Deferred
        primary = jQuery.Deferred(),

        // subordinate callback factory
        updateFunc = function(i) {
          return function(value) {
            resolveContexts[i] = this;
            resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (!(--remaining)) {
              primary.resolveWith(resolveContexts, resolveValues);
            }
          };
        };

      // Single- and empty arguments are adopted like Promise.resolve
      if (remaining <= 1) {
        adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject,
          !remaining);

        // Use .then() to unwrap secondary thenables (cf. gh-3000)
        if (primary.state() === "pending" ||
          isFunction(resolveValues[i] && resolveValues[i].then)) {

          return primary.then();
        }
      }

      // Multiple arguments are aggregated like Promise.all array elements
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject);
      }

      return primary.promise();
    }
  });


  // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function(error, stack) {

    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };




  jQuery.readyException = function(error) {
    window.setTimeout(function() {
      throw error;
    });
  };




  // The deferred used on DOM ready
  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function(fn) {

    readyList
      .then(fn)

      // Wrap jQuery.readyException in a function so that the lookup
      // happens at the time of error handling instead of callback
      // registration.
      .catch(function(error) {
        jQuery.readyException(error);
      });

    return this;
  };

  jQuery.extend({

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Handle when the DOM is ready
    ready: function(wait) {

      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith(document, [jQuery]);
    }
  });

  jQuery.ready.then = readyList.then;

  // The ready event handler and self cleanup method
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }

  // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon
  if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {

    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);

  } else {

    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed);

    // A fallback to window.onload, that will always work
    window.addEventListener("load", completed);
  }




  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null;

    // Sets many values
    if (toType(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }

      // Sets one value
    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {

        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null;

          // ...except when executing function values
        } else {
          bulk = fn;
          fn = function(elem, _key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(
            elems[i], key, raw ?
            value :
            value.call(elems[i], i, fn(elems[i], key))
          );
        }
      }
    }

    if (chainable) {
      return elems;
    }

    // Gets
    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  };


  // Matches dashed string for camelizing
  var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g;

  // Used by camelCase as callback to replace()
  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  }

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)
  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }
  var acceptData = function(owner) {

    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };




  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;

  Data.prototype = {

    cache: function(owner) {

      // Check if the owner object already has a cache
      var value = owner[this.expando];

      // If not, create one
      if (!value) {
        value = {};

        // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return an empty object.
        if (acceptData(owner)) {

          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value;

            // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }

      return value;
    },
    set: function(owner, data, value) {
      var prop,
        cache = this.cache(owner);

      // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)
      if (typeof data === "string") {
        cache[camelCase(data)] = value;

        // Handle: [ owner, { properties } ] args
      } else {

        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ?
        this.cache(owner) :

        // Always use camelCase key (gh-2257)
        owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function(owner, key, value) {

      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined ||
        ((key && typeof key === "string") && value === undefined)) {

        return this.get(owner, key);
      }

      // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //
      this.set(owner, key, value);

      // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
        cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {

        // Support array or space separated string of keys
        if (Array.isArray(key)) {

          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key);

          // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace
          key = key in cache ? [key] :
            (key.match(rnothtmlwhite) || []);
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      }

      // Remove the expando if there's no more data
      if (key === undefined || jQuery.isEmptyObject(cache)) {

        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();

  var dataUser = new Data();



  //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true;
    }

    if (data === "false") {
      return false;
    }

    if (data === "null") {
      return null;
    }

    // Only convert to a number if it doesn't change the string
    if (data === +data + "") {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    var name;

    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);

      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {}

        // Make sure we set the data so it isn't changed later
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }

  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },

    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },

    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },

    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },

    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });

  jQuery.fn.extend({
    data: function(key, value) {
      var i, name, data,
        elem = this[0],
        attrs = elem && elem.attributes;

      // Gets all values
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {

              // Support: IE 11 only
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }

        return data;
      }

      // Sets multiple values
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }

      return access(this, function(value) {
        var data;

        // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.
        if (elem && value === undefined) {

          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);
          if (data !== undefined) {
            return data;
          }

          // Attempt to "discover" the data in
          // HTML5 custom data-* attrs
          data = dataAttr(elem, key);
          if (data !== undefined) {
            return data;
          }

          // We tried really hard, but the data doesn't exist.
          return;
        }

        // Set the data...
        this.each(function() {

          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },

    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });


  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;

      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);

        // Speed up dequeue by getting out quickly if this is just a lookup
        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },

    dequeue: function(elem, type) {
      type = type || "fx";

      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function() {
          jQuery.dequeue(elem, type);
        };

      // If the fx queue is dequeued, always remove the progress sentinel
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {

        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        // Clear up the last queue stop function
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },

    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });

  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;

      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined ?
        this :
        this.each(function() {
          var queue = jQuery.queue(this, type, data);

          // Ensure a hooks for this queue
          jQuery._queueHooks(this, type);

          if (type === "fx" && queue[0] !== "inprogress") {
            jQuery.dequeue(this, type);
          }
        });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },

    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function(type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function() {
          if (!(--count)) {
            defer.resolveWith(elements, [elements]);
          }
        };

      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";

      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


  var cssExpand = ["Top", "Right", "Bottom", "Left"];

  var documentElement = document.documentElement;



  var isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem);
    },
    composed = {
      composed: true
    };

  // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.
  if (documentElement.getRootNode) {
    isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem) ||
        elem.getRootNode(composed) === elem.ownerDocument;
    };
  }
  var isHiddenWithinTree = function(elem, el) {

    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;

    // Inline style trumps all
    return elem.style.display === "none" ||
      elem.style.display === "" &&

      // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      isAttached(elem) &&

      jQuery.css(elem, "display") === "none";
  };



  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted, scale,
      maxIterations = 20,
      currentValue = tween ?
      function() {
        return tween.cur();
      } :
      function() {
        return jQuery.css(elem, prop, "");
      },
      initial = currentValue(),
      unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

      // Starting value computation is required for potential unit mismatches
      initialInUnit = elem.nodeType &&
      (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
      rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {

      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2;

      // Trust units reported by jQuery.css
      unit = unit || initialInUnit[3];

      // Iteratively approximate from a nonzero starting point
      initialInUnit = +initial || 1;

      while (maxIterations--) {

        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);
        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }
        initialInUnit = initialInUnit / scale;

      }

      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit);

      // Make sure we update the tween properties later on
      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;

      // Apply relative offset (+=/-=) if specified
      adjusted = valueParts[1] ?
        initialInUnit + (valueParts[1] + 1) * valueParts[2] :
        +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }


  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp,
      doc = elem.ownerDocument,
      nodeName = elem.nodeName,
      display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");

    temp.parentNode.removeChild(temp);

    if (display === "none") {
      display = "block";
    }
    defaultDisplayMap[nodeName] = display;

    return display;
  }

  function showHide(elements, show) {
    var display, elem,
      values = [],
      index = 0,
      length = elements.length;

    // Determine new display value for elements that need to change
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }

      display = elem.style.display;
      if (show) {

        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;
          if (!values[index]) {
            elem.style.display = "";
          }
        }
        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none";

          // Remember what we're overwriting
          dataPriv.set(elem, "display", display);
        }
      }
    }

    // Set the display of the elements in a second loop to avoid constant reflow
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }

      return this.each(function() {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = (/^(?:checkbox|radio)$/i);

  var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);

  var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);



  (function() {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement("div")),
      input = document.createElement("input");

    // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");

    div.appendChild(input);

    // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

    // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

    // Support: IE <=9 only
    // IE <=9 replaces <option> tags with their contents when inserted outside of
    // the select element.
    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild;
  })();


  // We have to close these tags to support XHTML (#13200)
  var wrapMap = {

    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

    _default: [0, "", ""]
  };

  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

  // Support: IE <=9 only
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }


  function getAll(context, tag) {

    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret;

    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");

    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");

    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  }


  // Mark scripts as having already been evaluated
  function setGlobalEval(elems, refElements) {
    var i = 0,
      l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(
        elems[i],
        "globalEval",
        !refElements || dataPriv.get(refElements[i], "globalEval")
      );
    }
  }


  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem, tmp, tag, wrap, attached, j,
      fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {

        // Add nodes directly
        if (toType(elem) === "object") {

          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

          // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));

          // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }

          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, tmp.childNodes);

          // Remember the top-level container
          tmp = fragment.firstChild;

          // Ensure the created nodes are orphaned (#12392)
          tmp.textContent = "";
        }
      }
    }

    // Remove wrapper from fragment
    fragment.textContent = "";

    i = 0;
    while ((elem = nodes[i++])) {

      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }

      attached = isAttached(elem);

      // Append to fragment
      tmp = getAll(fragment.appendChild(elem), "script");

      // Preserve script evaluation history
      if (attached) {
        setGlobalEval(tmp);
      }

      // Capture executables
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }


  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  }

  // Support: IE <=9 - 11+
  // focus() and blur() are asynchronous, except when they are no-op.
  // So expect focus to be synchronous when the element is already active,
  // and blur to be synchronous when the element is not already active.
  // (focus and blur are always synchronous in other supported browsers,
  // this just defines when we can count on it).
  function expectSync(elem, type) {
    return (elem === safeActiveElement()) === (type === "focus");
  }

  // Support: IE <=9 only
  // Accessing document.activeElement can throw unexpectedly
  // https://bugs.jquery.com/ticket/13393
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  function on(elem, types, selector, data, fn, one) {
    var origFn, type;

    // Types can be a map of types/handlers
    if (typeof types === "object") {

      // ( types-Object, selector, data )
      if (typeof selector !== "string") {

        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }

    if (data == null && fn == null) {

      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {

        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {

        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;
      fn = function(event) {

        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };

      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {

    global: {},

    add: function(elem, types, handler, data, selector) {

      var handleObjIn, eventHandle, tmp,
        events, t, handleObj,
        special, handlers, type, namespaces, origType,
        elemData = dataPriv.get(elem);

      // Only attach events to objects that accept data
      if (!acceptData(elem)) {
        return;
      }

      // Caller can pass in an object of custom data in lieu of the handler
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }

      // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)
      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      }

      // Make sure that the handler has a unique ID, used to find/remove it later
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }

      // Init the element's event structure and main handler, if this is the first
      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null);
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {

          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
            jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }

      // Handle multiple events separated by a space
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue;
        }

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};

        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;

        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);

        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;

          // Only use addEventListener if the special events handler returns false
          if (!special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false) {

            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }

        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }

        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
      }

    },

    // Detach an event or set of events from an element
    remove: function(elem, types, handler, selector, mappedTypes) {

      var j, origCount, tmp,
        events, t, handleObj,
        special, handlers, type, namespaces, origType,
        elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      }

      // Once for each type.namespace in types; type may be omitted
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] &&
          new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

        // Remove matching events
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType) &&
            (!handler || handler.guid === handleObj.guid) &&
            (!tmp || tmp.test(handleObj.namespace)) &&
            (!selector || selector === handleObj.selector ||
              selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (!special.teardown ||
            special.teardown.call(elem, namespaces, elemData.handle) === false) {

            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      }

      // Remove data and the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },

    dispatch: function(nativeEvent) {

      var i, j, ret, matched, handleObj, handlerQueue,
        args = new Array(arguments.length),

        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix(nativeEvent),

        handlers = (
          dataPriv.get(this, "events") || Object.create(null)
        )[event.type] || [],
        special = jQuery.event.special[event.type] || {};

      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this;

      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }

      // Determine handlers
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);

      // Run delegates first; they may want to stop propagation beneath us
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;

        j = 0;
        while ((handleObj = matched.handlers[j++]) &&
          !event.isImmediatePropagationStopped()) {

          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false ||
            event.rnamespace.test(handleObj.namespace)) {

            event.handleObj = handleObj;
            event.data = handleObj.data;

            ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }

      // Call the postDispatch hook for the mapped type
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },

    handlers: function(event, handlers) {
      var i, handleObj, sel, matchedHandlers, matchedSelectors,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;

      // Find delegate handlers
      if (delegateCount &&

        // Support: IE <=9
        // Black-hole SVG <use> instance trees (trac-13180)
        cur.nodeType &&

        // Support: Firefox <=42
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11 only
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        !(event.type === "click" && event.button >= 1)) {

        for (; cur !== this; cur = cur.parentNode || this) {

          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];

              // Don't conflict with Object.prototype properties (#13203)
              sel = handleObj.selector + " ";

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ?
                  jQuery(sel, this).index(cur) > -1 :
                  jQuery.find(sel, this, null, [cur]).length;
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      }

      // Add the remaining (directly-bound) handlers
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        });
      }

      return handlerQueue;
    },

    addProp: function(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,

        get: isFunction(hook) ?
          function() {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function() {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },

        set: function(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },

    fix: function(originalEvent) {
      return originalEvent[jQuery.expando] ?
        originalEvent :
        new jQuery.Event(originalEvent);
    },

    special: {
      load: {

        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {

        // Utilize native event to ensure correct state for checkable inputs
        setup: function(data) {

          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data;

          // Claim the first handler
          if (rcheckableType.test(el.type) &&
            el.click && nodeName(el, "input")) {

            // dataPriv.set( el, "click", ... )
            leverageNative(el, "click", returnTrue);
          }

          // Return false to allow normal processing in the caller
          return false;
        },
        trigger: function(data) {

          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data;

          // Force setup before triggering a click
          if (rcheckableType.test(el.type) &&
            el.click && nodeName(el, "input")) {

            leverageNative(el, "click");
          }

          // Return non-false to allow normal event-path propagation
          return true;
        },

        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function(event) {
          var target = event.target;
          return rcheckableType.test(target.type) &&
            target.click && nodeName(target, "input") &&
            dataPriv.get(target, "click") ||
            nodeName(target, "a");
        }
      },

      beforeunload: {
        postDispatch: function(event) {

          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  };

  // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.
  function leverageNative(el, type, expectSync) {

    // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
    if (!expectSync) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }
      return;
    }

    // Register the controller as a special universal handler for all event namespaces
    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function(event) {
        var notAsync, result,
          saved = dataPriv.get(this, type);

        if ((event.isTrigger & 1) && this[type]) {

          // Interrupt processing of the outer synthetic .trigger()ed event
          // Saved data should be false in such cases, but might be a leftover capture object
          // from an async native handler (gh-4350)
          if (!saved.length) {

            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved);

            // Trigger the native event and capture its result
            // Support: IE <=9 - 11+
            // focus() and blur() are asynchronous
            notAsync = expectSync(this, type);
            this[type]();
            result = dataPriv.get(this, type);
            if (saved !== result || notAsync) {
              dataPriv.set(this, type, false);
            } else {
              result = {};
            }
            if (saved !== result) {

              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault();

              // Support: Chrome 86+
              // In Chrome, if an element having a focusout handler is blurred by
              // clicking outside of it, it invokes the handler synchronously. If
              // that handler calls `.remove()` on the element, the data is cleared,
              // leaving `result` undefined. We need to guard against this.
              return result && result.value;
            }

            // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering the
            // native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.
          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          }

          // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments
        } else if (saved.length) {

          // ...and capture the result
          dataPriv.set(this, type, {
            value: jQuery.event.trigger(

              // Support: IE <=9 - 11+
              // Extend with the prototype to reset the above stopImmediatePropagation()
              jQuery.extend(saved[0], jQuery.Event.prototype),
              saved.slice(1),
              this
            )
          });

          // Abort handling of the native event
          event.stopImmediatePropagation();
        }
      }
    });
  }

  jQuery.removeEvent = function(elem, type, handle) {

    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function(src, props) {

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }

    // Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;

      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined &&

        // Support: Android <=2.3 only
        src.returnValue === false ?
        returnTrue :
        returnFalse;

      // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (#504, #13143)
      this.target = (src.target && src.target.nodeType === 3) ?
        src.target.parentNode :
        src.target;

      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;

      // Event type
    } else {
      this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if (props) {
      jQuery.extend(this, props);
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || Date.now();

    // Mark it as fixed
    this[jQuery.expando] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,

    preventDefault: function() {
      var e = this.originalEvent;

      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;

      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;

      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    }
  };

  // Includes all common event props including KeyEvent and MouseEvent specific props
  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true
  }, jQuery.event.addProp);

  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function(type, delegateType) {
    jQuery.event.special[type] = {

      // Utilize native event if possible so blur/focus sequence is correct
      setup: function() {

        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, expectSync);

        // Return false to allow normal processing in the caller
        return false;
      },
      trigger: function() {

        // Force setup before trigger
        leverageNative(this, type);

        // Return non-false to allow normal event-path propagation
        return true;
      },

      // Suppress native focus or blur as it's already being fired
      // in leverageNative.
      _default: function() {
        return true;
      },

      delegateType: delegateType
    };
  });

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,

      handle: function(event) {
        var ret,
          target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;

        // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });

  jQuery.fn.extend({

    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {

        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(
          handleObj.namespace ?
          handleObj.origType + "." + handleObj.namespace :
          handleObj.origType,
          handleObj.selector,
          handleObj.handler
        );
        return this;
      }
      if (typeof types === "object") {

        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {

        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });


  var

    // Support: IE <=10 - 11, Edge 12 - 13 only
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    rnoInnerhtml = /<script|<style|<link/i,

    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  // Prefer a tbody over its parent table for containing new rows
  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") &&
      nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

      return jQuery(elem).children("tbody")[0] || elem;
    }

    return elem;
  }

  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;

    if (dest.nodeType !== 1) {
      return;
    }

    // 1. Copy private data: events, handlers, etc.
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;

      if (events) {
        dataPriv.remove(dest, "handle events");

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }

    // 2. Copy user data
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);

      dataUser.set(dest, udataCur);
    }
  }

  // Fix IE bugs, see support tests
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();

    // Fails to persist the checked state of a cloned checkbox or radio button.
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;

      // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {

    // Flatten any nested arrays
    args = flat(args);

    var fragment, first, scripts, hasScripts, node, doc,
      i = 0,
      l = collection.length,
      iNoClone = l - 1,
      value = args[0],
      valueIsFunction = isFunction(value);

    // We can't cloneNode fragments that contain checked, in WebKit
    if (valueIsFunction ||
      (l > 1 && typeof value === "string" &&
        !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      }

      // Require either new content or an interest in ignored elements to invoke the callback
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;

        // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).
        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);

            // Keep references to cloned scripts for later restoration
            if (hasScripts) {

              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;

          // Reenable scripts
          jQuery.map(scripts, restoreScript);

          // Evaluate executable scripts on first document insertion
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") &&
              !dataPriv.access(node, "globalEval") &&
              jQuery.contains(doc, node)) {

              if (node.src && (node.type || "").toLowerCase() !== "module") {

                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function remove(elem, selector, keepData) {
    var node,
      nodes = selector ? jQuery.filter(selector, elem) : elem,
      i = 0;

    for (;
      (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter: function(html) {
      return html;
    },

    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements,
        clone = elem.cloneNode(true),
        inPage = isAttached(elem);

      // Fix IE cloning issues
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
        !jQuery.isXMLDoc(elem)) {

        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }

      // Copy the events from the original to the clone
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }

      // Preserve script evaluation history
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }

      // Return the cloned set
      return clone;
    },

    cleanData: function(elems) {
      var data, elem, type,
        special = jQuery.event.special,
        i = 0;

      for (;
        (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);

                  // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }

            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {

            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });

  jQuery.fn.extend({
    detach: function(selector) {
      return remove(this, selector, true);
    },

    remove: function(selector) {
      return remove(this, selector);
    },

    text: function(value) {
      return access(this, function(value) {
        return value === undefined ?
          jQuery.text(this) :
          this.empty().each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value;
            }
          });
      }, null, value, arguments.length);
    },

    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },

    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },

    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },

    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },

    empty: function() {
      var elem,
        i = 0;

      for (;
        (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {

          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false));

          // Remove any remaining nodes
          elem.textContent = "";
        }
      }

      return this;
    },

    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },

    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
          i = 0,
          l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }

        // See if we can take a shortcut and just use innerHTML
        if (typeof value === "string" && !rnoInnerhtml.test(value) &&
          !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {};

              // Remove element nodes and prevent memory leaks
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0;

            // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },

    replaceWith: function() {
      var ignored = [];

      // Make the changes, replacing each non-ignored context element with the new content
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }

        // Force callback invocation
      }, ignored);
    }
  });

  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
        ret = [],
        insert = jQuery(selector),
        last = insert.length - 1,
        i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);

        // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit
        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

  var getStyles = function(elem) {

    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  var swap = function(elem, options, callback) {
    var ret, name,
      old = {};

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.call(elem);

    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };


  var rboxStyle = new RegExp(cssExpand.join("|"), "i");



  (function() {

    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {

      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
        "margin-top:1px;padding:0;border:0";
      div.style.cssText =
        "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
        "margin:auto;border:1px;padding:1px;" +
        "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);

      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";

      // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

      // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't
      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

      // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements
      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

      // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)
      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;

      documentElement.removeChild(container);

      // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed
      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
      reliableTrDimensionsVal, reliableMarginLeftVal,
      container = document.createElement("div"),
      div = document.createElement("div");

    // Finish early in limited (non-browser) environments
    if (!div.style) {
      return;
    }

    // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (#8908)
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    jQuery.extend(support, {
      boxSizingReliable: function() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function() {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function() {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function() {
        computeStyleTests();
        return scrollboxSizeVal;
      },

      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      //
      // Support: Firefox 70+
      // Only Firefox includes border widths
      // in computed dimensions. (gh-4529)
      reliableTrDimensions: function() {
        var table, tr, trChild, trStyle;
        if (reliableTrDimensionsVal == null) {
          table = document.createElement("table");
          tr = document.createElement("tr");
          trChild = document.createElement("div");

          table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
          tr.style.cssText = "border:1px solid";

          // Support: Chrome 86+
          // Height set through cssText does not get applied.
          // Computed height then comes back as 0.
          tr.style.height = "1px";
          trChild.style.height = "9px";

          // Support: Android 8 Chrome 86+
          // In our bodyBackground.html iframe,
          // display for all div elements is set to "inline",
          // which causes a problem only in Android 8 Chrome 86.
          // Ensuring the div is display: block
          // gets around this issue.
          trChild.style.display = "block";

          documentElement
            .appendChild(table)
            .appendChild(tr)
            .appendChild(trChild);

          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = (parseInt(trStyle.height, 10) +
            parseInt(trStyle.borderTopWidth, 10) +
            parseInt(trStyle.borderBottomWidth, 10)) === tr.offsetHeight;

          documentElement.removeChild(table);
        }
        return reliableTrDimensionsVal;
      }
    });
  })();


  function curCSS(elem, name, computed) {
    var width, minWidth, maxWidth, ret,

      // Support: Firefox 51+
      // Retrieving style before computed somehow
      // fixes an issue with getting wrong values
      // on detached elements
      style = elem.style;

    computed = computed || getStyles(elem);

    // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, #12537)
    //   .css('--customProperty) (#3144)
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];

      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;

        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;

        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined ?

      // Support: IE <=9 - 11 only
      // IE returns zIndex value as an integer.
      ret + "" :
      ret;
  }


  function addGetHookIf(conditionFn, hookFn) {

    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function() {
        if (conditionFn()) {

          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        }

        // Hook needed; redefine it so that the support test is not executed again.
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }


  var cssPrefixes = ["Webkit", "Moz", "ms"],
    emptyStyle = document.createElement("div").style,
    vendorProps = {};

  // Return a vendor-prefixed property or undefined
  function vendorPropName(name) {

    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
      i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }

  // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
  function finalPropName(name) {
    var final = jQuery.cssProps[name] || vendorProps[name];

    if (final) {
      return final;
    }
    if (name in emptyStyle) {
      return name;
    }
    return vendorProps[name] = vendorPropName(name) || name;
  }


  var

    // Swappable if display is none or starts with table
    // except "table", "table-cell", or "table-caption"
    // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rcustomProp = /^--/,
    cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };

  function setPositiveNumber(_elem, value, subtract) {

    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ?

      // Guard against undefined "subtract", e.g., when used as in cssHooks
      Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
      value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
      extra = 0,
      delta = 0;

    // Adjustment may not be necessary
    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }

    for (; i < 4; i += 2) {

      // Both box models exclude margin
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
      }

      // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
      if (!isBorderBox) {

        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

        // For "border" or "margin", add border
        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

          // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }

        // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"
      } else {

        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }

        // For "content" or "padding", subtract border
        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }

    // Account for positive content-box scroll gutter when requested by providing computedVal
    if (!isBorderBox && computedVal >= 0) {

      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(
        elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
        computedVal -
        delta -
        extra -
        0.5

        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
        // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }

    return delta;
  }

  function getWidthOrHeight(elem, dimension, extra) {

    // Start with computed style
    var styles = getStyles(elem),

      // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
      // Fake content-box until we know it's needed to know the true value.
      boxSizingNeeded = !support.boxSizingReliable() || extra,
      isBorderBox = boxSizingNeeded &&
      jQuery.css(elem, "boxSizing", false, styles) === "border-box",
      valueIsBorderBox = isBorderBox,

      val = curCSS(elem, dimension, styles),
      offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

    // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }
      val = "auto";
    }


    // Support: IE 9 - 11 only
    // Use offsetWidth/offsetHeight for when box sizing is unreliable.
    // In those cases, the computed value can be trusted to be border-box.
    if ((!support.boxSizingReliable() && isBorderBox ||

        // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !support.reliableTrDimensions() && nodeName(elem, "tr") ||

        // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        val === "auto" ||

        // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&

      // Make sure the element is visible & connected
      elem.getClientRects().length) {

      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

      // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.
      valueIsBorderBox = offsetProp in elem;
      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    }

    // Normalize "" and auto
    val = parseFloat(val) || 0;

    // Adjust for the element's box model
    return (val +
      boxModelAdjustment(
        elem,
        dimension,
        extra || (isBorderBox ? "border" : "content"),
        valueIsBorderBox,
        styles,

        // Provide the current computed size to request scroll gutter calculation (gh-3589)
        val
      )
    ) + "px";
  }

  jQuery.extend({

    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if (computed) {

            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },

    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "gridArea": true,
      "gridColumn": true,
      "gridColumnEnd": true,
      "gridColumnStart": true,
      "gridRow": true,
      "gridRowEnd": true,
      "gridRowStart": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},

    // Get and set the style property on a DOM Node
    style: function(elem, name, value, extra) {

      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }

      // Make sure that we're working with the right name
      var ret, type, hooks,
        origName = camelCase(name),
        isCustomProp = rcustomProp.test(name),
        style = elem.style;

      // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Gets hook for the prefixed version, then unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // Check if we're setting a value
      if (value !== undefined) {
        type = typeof value;

        // Convert "+=" or "-=" to relative numbers (#7345)
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);

          // Fixes bug #9237
          type = "number";
        }

        // Make sure that null and NaN values aren't set (#7116)
        if (value == null || value !== value) {
          return;
        }

        // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.
        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }

        // background-* props affect original clone's values
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }

        // If a hook was provided, use that value, otherwise just set the specified value
        if (!hooks || !("set" in hooks) ||
          (value = hooks.set(elem, value, extra)) !== undefined) {

          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }

      } else {

        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks &&
          (ret = hooks.get(elem, false, extra)) !== undefined) {

          return ret;
        }

        // Otherwise just get the value from the style object
        return style[name];
      }
    },

    css: function(elem, name, extra, styles) {
      var val, num, hooks,
        origName = camelCase(name),
        isCustomProp = rcustomProp.test(name);

      // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Try prefixed name followed by the unprefixed name
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // If a hook was provided get the computed value from there
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }

      // Otherwise, if a way to get the computed value exists, use that
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }

      // Convert "normal" to computed value
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }

      // Make numeric if forced or a qualifier was provided and val looks numeric
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    }
  });

  jQuery.each(["height", "width"], function(_i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function(elem, computed, extra) {
        if (computed) {

          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) &&

            // Support: Safari 8+
            // Table columns in Safari have non-zero offsetWidth & zero
            // getBoundingClientRect().width unless display is changed.
            // Support: IE <=11 only
            // Running getBoundingClientRect on a disconnected node
            // in IE throws an error.
            (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
            swap(elem, cssShow, function() {
              return getWidthOrHeight(elem, dimension, extra);
            }) :
            getWidthOrHeight(elem, dimension, extra);
        }
      },

      set: function(elem, value, extra) {
        var matches,
          styles = getStyles(elem),

          // Only read styles.position if the test has a chance to fail
          // to avoid forcing a reflow.
          scrollboxSizeBuggy = !support.scrollboxSize() &&
          styles.position === "absolute",

          // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
          boxSizingNeeded = scrollboxSizeBuggy || extra,
          isBorderBox = boxSizingNeeded &&
          jQuery.css(elem, "boxSizing", false, styles) === "border-box",
          subtract = extra ?
          boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles
          ) :
          0;

        // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)
        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
            parseFloat(styles[dimension]) -
            boxModelAdjustment(elem, dimension, "border", false, styles) -
            0.5
          );
        }

        // Convert to pixels if value adjustment is needed
        if (subtract && (matches = rcssNum.exec(value)) &&
          (matches[3] || "px") !== "px") {

          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      }
    };
  });

  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
    function(elem, computed) {
      if (computed) {
        return (parseFloat(curCSS(elem, "marginLeft")) ||
          elem.getBoundingClientRect().left -
          swap(elem, {
            marginLeft: 0
          }, function() {
            return elem.getBoundingClientRect().left;
          })
        ) + "px";
      }
    }
  );

  // These hooks are used by animate to expand properties
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function(value) {
        var i = 0,
          expanded = {},

          // Assumes a single number if not a string
          parts = typeof value === "string" ? value.split(" ") : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] =
            parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      }
    };

    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });

  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles, len,
          map = {},
          i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined ?
          jQuery.style(elem, name, value) :
          jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  });


  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;

  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];

      return hooks && hooks.get ?
        hooks.get(this) :
        Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
        hooks = Tween.propHooks[this.prop];

      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](
          percent, this.options.duration * percent, 0, 1, this.options.duration
        );
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;

      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }

      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };

  Tween.prototype.init.prototype = Tween.prototype;

  Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;

        // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.
        if (tween.elem.nodeType !== 1 ||
          tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }

        // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.
        result = jQuery.css(tween.elem, tween.prop, "");

        // Empty strings, null, undefined and "auto" are converted to 0.
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {

        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (
            jQuery.cssHooks[tween.prop] ||
            tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };

  // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };

  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };

  jQuery.fx = Tween.prototype.init;

  // Back compat <1.8 extension point
  jQuery.fx.step = {};




  var
    fxNow, inProgress,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }

      jQuery.fx.tick();
    }
  }

  // Animations created synchronously will run synchronously
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = Date.now());
  }

  // Generate parameters to create a standard animation
  function genFx(type, includeWidth) {
    var which,
      i = 0,
      attrs = {
        height: type
      };

    // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }

    return attrs;
  }

  function createTween(value, prop, animation) {
    var tween,
      collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {

        // We're done with this property
        return tween;
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
      isBox = "width" in props || "height" in props,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHiddenWithinTree(elem),
      dataShow = dataPriv.get(elem, "fxshow");

    // Queue-skipping animations hijack the fx hooks
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;

      anim.always(function() {

        // Ensure the complete handler is called before this completes
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }

    // Detect show/hide animations
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {

          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;

            // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }

    // Bail out if this is a no-op like .hide().hide()
    propTween = !jQuery.isEmptyObject(props);
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    }

    // Restrict "overflow" and "display" styles during box animations
    if (isBox && elem.nodeType === 1) {

      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];

      // Identify a display type, preferring old show/hide data over the CSS cascade
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }
      display = jQuery.css(elem, "display");
      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {

          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      }

      // Animate inline elements as inline-block
      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {

          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(function() {
              style.display = restoreDisplay;
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }
          style.display = "inline-block";
        }
      }
    }

    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }

    // Implement show/hide animations
    propTween = false;
    for (prop in orig) {

      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          });
        }

        // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
        if (toggle) {
          dataShow.hidden = !hidden;
        }

        // Show elements before animating them
        if (hidden) {
          showHide([elem], true);
        }

        /* eslint-disable no-loop-func */

        anim.done(function() {

          /* eslint-enable no-loop-func */

          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }
          dataPriv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      }

      // Per-property setup
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;

    // camelCase, specialEasing and expand cssHook pass
    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }

      if (index !== name) {
        props[name] = value;
        delete props[index];
      }

      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];

        // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }

  function Animation(elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function() {

        // Don't match elem in the :animated selector
        delete tick.elem;
      }),
      tick = function() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

          // Support: Android 2.3 only
          // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;

        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }

        deferred.notifyWith(elem, [animation, percent, remaining]);

        // If there's more to do, yield
        if (percent < 1 && length) {
          return remaining;
        }

        // If this was an empty animation, synthesize a final progress notification
        if (!length) {
          deferred.notifyWith(elem, [animation, 1, 0]);
        }

        // Resolve the animation and report its conclusion
        deferred.resolveWith(elem, [animation]);
        return false;
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end,
            animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function(gotoEnd) {
          var index = 0,

            // If we are going to the end, we want to run all the tweens
            // otherwise we skip this part
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }

          // Resolve when we played the last frame; otherwise, reject
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }),
      props = animation.props;

    propFilter(props, animation.opts.specialEasing);

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
            result.stop.bind(result);
        }
        return result;
      }
    }

    jQuery.map(props, createTween, animation);

    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }

    // Attach callbacks from options
    animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always);

    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue
      })
    );

    return animation;
  }

  jQuery.Animation = jQuery.extend(Animation, {

    tweeners: {
      "*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },

    tweener: function(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }

      var prop,
        index = 0,
        length = props.length;

      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },

    prefilters: [defaultPrefilter],

    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });

  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing ||
        isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    };

    // Go to the end state if fx are off
    if (jQuery.fx.off) {
      opt.duration = 0;

    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];

        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    }

    // Normalize opt.queue - true/undefined/null -> "fx"
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }

    // Queueing
    opt.old = opt.complete;

    opt.complete = function() {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }

      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };

    return opt;
  };

  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {

      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css("opacity", 0).show()

        // Animate to the value specified
        .end().animate({
          opacity: to
        }, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function() {

          // Operate on a copy of prop so per-property easing won't be lost
          var anim = Animation(this, jQuery.extend({}, prop), optall);

          // Empty animations, or finishing resolves immediately
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };

      doAnimation.finish = doAnimation;

      return empty || optall.queue === false ?
        this.each(doAnimation) :
        this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };

      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue) {
        this.queue(type || "fx", []);
      }

      return this.each(function() {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = dataPriv.get(this);

        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }

        for (index = timers.length; index--;) {
          if (timers[index].elem === this &&
            (type == null || timers[index].queue === type)) {

            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }

        // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
          data = dataPriv.get(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;

        // Enable finishing flag on private data
        data.finish = true;

        // Empty the queue first
        jQuery.queue(this, type, []);

        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }

        // Look for any active animations, and finish them
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }

        // Look for any animations in the old queue and finish them
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }

        // Turn off finishing flag
        delete data.finish;
      });
    }
  });

  jQuery.each(["toggle", "show", "hide"], function(_i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ?
        cssFn.apply(this, arguments) :
        this.animate(genFx(name, true), speed, easing, callback);
    };
  });

  // Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });

  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
      i = 0,
      timers = jQuery.timers;

    fxNow = Date.now();

    for (; i < timers.length; i++) {
      timer = timers[i];

      // Run the timer and safely remove it when done (allowing for external removal)
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }

    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };

  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };

  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (inProgress) {
      return;
    }

    inProgress = true;
    schedule();
  };

  jQuery.fx.stop = function() {
    inProgress = null;
  };

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,

    // Default speed
    _default: 400
  };


  // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";

    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };


  (function() {
    var input = document.createElement("input"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));

    input.type = "checkbox";

    // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"
    support.checkOn = input.value !== "";

    // Support: IE <=11 only
    // Must access selectedIndex to make default options select
    support.optSelected = opt.selected;

    // Support: IE <=11 only
    // An input loses its value after becoming a radio
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();


  var boolHook,
    attrHandle = jQuery.expr.attrHandle;

  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },

    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });

  jQuery.extend({
    attr: function(elem, name, value) {
      var ret, hooks,
        nType = elem.nodeType;

      // Don't get/set attributes on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      // Fallback to prop when attributes are not supported
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }

      // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] ||
          (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, value + "");
        return value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name);

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ? undefined : ret;
    },

    attrHooks: {
      type: {
        set: function(elem, value) {
          if (!support.radioValue && value === "radio" &&
            nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },

    removeAttr: function(elem, value) {
      var name,
        i = 0,

        // Attribute names can contain non-HTML whitespace characters
        // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
        attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          elem.removeAttribute(name);
        }
      }
    }
  });

  // Hooks for boolean attributes
  boolHook = {
    set: function(elem, value, name) {
      if (value === false) {

        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };

  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function(elem, name, isXML) {
      var ret, handle,
        lowercaseName = name.toLowerCase();

      if (!isXML) {

        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ?
          lowercaseName :
          null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });




  var rfocusable = /^(?:input|select|textarea|button)$/i,
    rclickable = /^(?:a|area)$/i;

  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },

    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });

  jQuery.extend({
    prop: function(elem, name, value) {
      var ret, hooks,
        nType = elem.nodeType;

      // Don't get/set properties on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return (elem[name] = value);
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },

    propHooks: {
      tabIndex: {
        get: function(elem) {

          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (
            rfocusable.test(elem.nodeName) ||
            rclickable.test(elem.nodeName) &&
            elem.href
          ) {
            return 0;
          }

          return -1;
        }
      }
    },

    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });

  // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {

        /* eslint no-unused-expressions: "off" */

        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {

        /* eslint no-unused-expressions: "off" */

        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }

  jQuery.each([
    "tabIndex",
    "readOnly",
    "maxLength",
    "cellSpacing",
    "cellPadding",
    "rowSpan",
    "colSpan",
    "useMap",
    "frameBorder",
    "contentEditable"
  ], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });




  // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }


  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }
    return [];
  }

  jQuery.fn.extend({
    addClass: function(value) {
      var classes, elem, cur, curValue, clazz, j, finalValue,
        i = 0;

      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classes = classesToArray(value);

      if (classes.length) {
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },

    removeClass: function(value) {
      var classes, elem, cur, curValue, clazz, j, finalValue,
        i = 0;

      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr("class", "");
      }

      classes = classesToArray(value);

      if (classes.length) {
        while ((elem = this[i++])) {
          curValue = getClass(elem);

          // This expression is here for better compressibility (see addClass)
          cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {

              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },

    toggleClass: function(value, stateVal) {
      var type = typeof value,
        isValidValue = type === "string" || Array.isArray(value);

      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      if (isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(
            value.call(this, i, getClass(this), stateVal),
            stateVal
          );
        });
      }

      return this.each(function() {
        var className, i, self, classNames;

        if (isValidValue) {

          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = classesToArray(value);

          while ((className = classNames[i++])) {

            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }

          // Toggle whole class name
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {

            // Store className if set
            dataPriv.set(this, "__className__", className);
          }

          // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.
          if (this.setAttribute) {
            this.setAttribute("class",
              className || value === false ?
              "" :
              dataPriv.get(this, "__className__") || ""
            );
          }
        }
      });
    },

    hasClass: function(selector) {
      var className, elem,
        i = 0;

      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 &&
          (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    }
  });




  var rreturn = /\r/g;

  jQuery.fn.extend({
    val: function(value) {
      var hooks, ret, valueIsFunction,
        elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] ||
            jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks &&
            "get" in hooks &&
            (ret = hooks.get(elem, "value")) !== undefined
          ) {
            return ret;
          }

          ret = elem.value;

          // Handle most common string cases
          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          }

          // Handle cases where value is null/undef or number
          return ret == null ? "" : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);

      return this.each(function(i) {
        var val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }

        // Treat null/undefined as ""; convert numbers to string
        if (val == null) {
          val = "";

        } else if (typeof val === "number") {
          val += "";

        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

        // If set returns undefined, fall back to normal setting
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });

  jQuery.extend({
    valHooks: {
      option: {
        get: function(elem) {

          var val = jQuery.find.attr(elem, "value");
          return val != null ?
            val :

            // Support: IE <=10 - 11 only
            // option.text throws exceptions (#14686, #14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function(elem) {
          var value, option, i,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one",
            values = one ? null : [],
            max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;

          } else {
            i = one ? index : 0;
          }

          // Loop through all the selected options
          for (; i < max; i++) {
            option = options[i];

            // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (#2551)
            if ((option.selected || i === index) &&

              // Don't return options that are disabled or in a disabled optgroup
              !option.disabled &&
              (!option.parentNode.disabled ||
                !nodeName(option.parentNode, "optgroup"))) {

              // Get the specific value for the option
              value = jQuery(option).val();

              // We don't need an array for one selects
              if (one) {
                return value;
              }

              // Multi-Selects return an array
              values.push(value);
            }
          }

          return values;
        },

        set: function(elem, value) {
          var optionSet, option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;

          while (i--) {
            option = options[i];

            /* eslint-disable no-cond-assign */

            if (option.selected =
              jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
            ) {
              optionSet = true;
            }

            /* eslint-enable no-cond-assign */
          }

          // Force browsers to behave consistently when non-matching value is set
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }
  });

  // Radios and checkboxes getter/setter
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set: function(elem, value) {
        if (Array.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });




  // Return jQuery for attributes-only inclusion


  support.focusin = "onfocusin" in window;


  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    stopPropagationCallback = function(e) {
      e.stopPropagation();
    };

  jQuery.extend(jQuery.event, {

    trigger: function(event, data, elem, onlyHandlers) {

      var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
        eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

      cur = lastElement = tmp = elem = elem || document;

      // Don't do events on text and comment nodes
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }

      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf(".") > -1) {

        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;

      // Caller can pass in a jQuery.Event object, Object, or just an event type string
      event = event[jQuery.expando] ?
        event :
        new jQuery.Event(type, typeof event === "object" && event);

      // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ?
        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
        null;

      // Clean up the event in case it is being reused
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }

      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data == null ? [event] :
        jQuery.makeArray(data, [event]);

      // Allow special events to draw outside the lines
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }

      // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {

        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }

      // Fire handlers on the event path
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ?
          bubbleType :
          special.bindType || type;

        // jQuery handler
        handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] &&
          dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }

        // Native handler
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;

      // If nobody prevented the default action, do it now
      if (!onlyHandlers && !event.isDefaultPrevented()) {

        if ((!special._default ||
            special._default.apply(eventPath.pop(), data) === false) &&
          acceptData(elem)) {

          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {

            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            }

            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },

    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function(type, elem, event) {
      var e = jQuery.extend(
        new jQuery.Event(),
        event, {
          type: type,
          isSimulated: true
        }
      );

      jQuery.event.trigger(e, null, elem);
    }

  });

  jQuery.fn.extend({

    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });


  // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {

      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };

      jQuery.event.special[fix] = {
        setup: function() {

          // Handle: regular nodes (via `this.ownerDocument`), window
          // (via `this.document`) & document (via `this`).
          var doc = this.ownerDocument || this.document || this,
            attaches = dataPriv.access(doc, fix);

          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this.document || this,
            attaches = dataPriv.access(doc, fix) - 1;

          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);

          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;

  var nonce = {
    guid: Date.now()
  };

  var rquery = (/\?/);



  // Cross-browser xml parsing
  jQuery.parseXML = function(data) {
    var xml, parserErrorElem;
    if (!data || typeof data !== "string") {
      return null;
    }

    // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {}

    parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
    if (!xml || parserErrorElem) {
      jQuery.error("Invalid XML: " + (
        parserErrorElem ?
        jQuery.map(parserErrorElem.childNodes, function(el) {
          return el.textContent;
        }).join("\n") :
        data
      ));
    }
    return xml;
  };


  var
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {

      // Serialize array item.
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {

          // Treat each array item as a scalar.
          add(prefix, v);

        } else {

          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(
            prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
            v,
            traditional,
            add
          );
        }
      });

    } else if (!traditional && toType(obj) === "object") {

      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }

    } else {

      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function(a, traditional) {
    var prefix,
      s = [],
      add = function(key, valueOrFunction) {

        // If value is a function, invoke it and use its return value
        var value = isFunction(valueOrFunction) ?
          valueOrFunction() :
          valueOrFunction;

        s[s.length] = encodeURIComponent(key) + "=" +
          encodeURIComponent(value == null ? "" : value);
      };

    if (a == null) {
      return "";
    }

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

      // Serialize the form elements
      jQuery.each(a, function() {
        add(this.name, this.value);
      });

    } else {

      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }

    // Return the resulting serialization
    return s.join("&");
  };

  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {

        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;

        // Use .is( ":disabled" ) so that fieldset[disabled] works
        return this.name && !jQuery(this).is(":disabled") &&
          rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
          (this.checked || !rcheckableType.test(type));
      }).map(function(_i, elem) {
        var val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, function(val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });


  var
    r20 = /%20/g,
    rhash = /#.*$/,
    rantiCache = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat("*"),

    // Anchor tag for parsing the document origin
    originAnchor = document.createElement("a");

  originAnchor.href = location.href;

  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports(structure) {

    // dataTypeExpression is optional and defaults to "*"
    return function(dataTypeExpression, func) {

      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }

      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

      if (isFunction(func)) {

        // For each dataType in the dataTypeExpression
        while ((dataType = dataTypes[i++])) {

          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);

            // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }

  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

    var inspected = {},
      seekingTransport = (structure === transports);

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" &&
          !seekingTransport && !inspected[dataTypeOrTransport]) {

          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }

    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }

  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887
  function ajaxExtend(target, src) {
    var key, deep,
      flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }

    return target;
  }

  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses(s, jqXHR, responses) {

    var ct, type, finalDataType, firstDataType,
      contents = s.contents,
      dataTypes = s.dataTypes;

    // Remove auto dataType and get content-type in the process
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }

    // Check if we're dealing with a known content-type
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }

    // Check to see if we have a response for the expected dataType
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {

      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }

      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }

  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev,
      converters = {},

      // Work with a copy of dataTypes in case we need to modify it for conversion
      dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift();

    // Convert to each sequential dataType
    while (current) {

      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }

      // Apply the dataFilter if provided
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }

      prev = current;
      current = dataTypes.shift();

      if (current) {

        // There's only work to do if current dataType is non-auto
        if (current === "*") {

          current = prev;

          // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {

          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current];

          // If none found, seek a pair
          if (!conv) {
            for (conv2 in converters) {

              // If conv2 outputs current
              tmp = conv2.split(" ");
              if (tmp[1] === current) {

                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] ||
                  converters["* " + tmp[0]];
                if (conv) {

                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2];

                    // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }

          // Apply converter (if not an equivalence)
          if (conv !== true) {

            // Unless errors are allowed to bubble, catch and return them
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }

    return {
      state: "success",
      data: response
    };
  }

  jQuery.extend({

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},

    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",

      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */

      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },

      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },

      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },

      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {

        // Convert anything to text
        "* text": String,

        // Text to html (true = no transformation)
        "text html": true,

        // Evaluate text as a json expression
        "text json": JSON.parse,

        // Parse text as xml
        "text xml": jQuery.parseXML
      },

      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function(target, settings) {
      return settings ?

        // Building a settings object
        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

        // Extending ajaxSettings
        ajaxExtend(jQuery.ajaxSettings, target);
    },

    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),

    // Main method
    ajax: function(url, options) {

      // If url is an object, simulate pre-1.5 signature
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }

      // Force options to be an object
      options = options || {};

      var transport,

        // URL without anti-cache param
        cacheURL,

        // Response headers
        responseHeadersString,
        responseHeaders,

        // timeout handle
        timeoutTimer,

        // Url cleanup var
        urlAnchor,

        // Request state (becomes false upon send and true upon completion)
        completed,

        // To know if global events are to be dispatched
        fireGlobals,

        // Loop variable
        i,

        // uncached part of the url
        uncached,

        // Create the final options object
        s = jQuery.ajaxSetup({}, options),

        // Callbacks context
        callbackContext = s.context || s,

        // Context for global events is callbackContext if it is a DOM node or jQuery collection
        globalEventContext = s.context &&
        (callbackContext.nodeType || callbackContext.jquery) ?
        jQuery(callbackContext) :
        jQuery.event,

        // Deferreds
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),

        // Status-dependent callbacks
        statusCode = s.statusCode || {},

        // Headers (they are sent all at once)
        requestHeaders = {},
        requestHeadersNames = {},

        // Default abort message
        strAbort = "canceled",

        // Fake xhr
        jqXHR = {
          readyState: 0,

          // Builds headers hashtable if needed
          getResponseHeader: function(key) {
            var match;
            if (completed) {
              if (!responseHeaders) {
                responseHeaders = {};
                while ((match = rheaders.exec(responseHeadersString))) {
                  responseHeaders[match[1].toLowerCase() + " "] =
                    (responseHeaders[match[1].toLowerCase() + " "] || [])
                    .concat(match[2]);
                }
              }
              match = responseHeaders[key.toLowerCase() + " "];
            }
            return match == null ? null : match.join(", ");
          },

          // Raw string
          getAllResponseHeaders: function() {
            return completed ? responseHeadersString : null;
          },

          // Caches the header
          setRequestHeader: function(name, value) {
            if (completed == null) {
              name = requestHeadersNames[name.toLowerCase()] =
                requestHeadersNames[name.toLowerCase()] || name;
              requestHeaders[name] = value;
            }
            return this;
          },

          // Overrides response content-type header
          overrideMimeType: function(type) {
            if (completed == null) {
              s.mimeType = type;
            }
            return this;
          },

          // Status-dependent callbacks
          statusCode: function(map) {
            var code;
            if (map) {
              if (completed) {

                // Execute the appropriate callbacks
                jqXHR.always(map[jqXHR.status]);
              } else {

                // Lazy-add the new callbacks in a way that preserves old ones
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              }
            }
            return this;
          },

          // Cancel the request
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };

      // Attach deferreds
      deferred.promise(jqXHR);

      // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available
      s.url = ((url || s.url || location.href) + "")
        .replace(rprotocol, location.protocol + "//");

      // Alias method option to type as per ticket #12004
      s.type = options.method || options.type || s.method || s.type;

      // Extract dataTypes list
      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

      // A cross-domain request is in order when the origin doesn't match the current origin.
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");

        // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/
        try {
          urlAnchor.href = s.url;

          // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {

          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      }

      // Convert data if not already a string
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }

      // Apply prefilters
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

      // If request was aborted inside a prefilter, stop there
      if (completed) {
        return jqXHR;
      }

      // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
      fireGlobals = jQuery.event && s.global;

      // Watch for a new set of requests
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }

      // Uppercase the type
      s.type = s.type.toUpperCase();

      // Determine if request has content
      s.hasContent = !rnoContent.test(s.type);

      // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation
      cacheURL = s.url.replace(rhash, "");

      // More options handling for requests with no content
      if (!s.hasContent) {

        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length);

        // If data is available and should be processed, append data to url
        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

          // #9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }

        // Add or update anti-cache param if needed
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce.guid++) +
            uncached;
        }

        // Put hash and anti-cache on the URL that will be requested (gh-1732)
        s.url = cacheURL + uncached;

        // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData &&
        (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      }

      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }

      // Set the correct header, if data is being sent
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }

      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
        s.accepts[s.dataTypes[0]] +
        (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
        s.accepts["*"]
      );

      // Check for headers option
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }

      // Allow custom headers/mimetypes and early abort
      if (s.beforeSend &&
        (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

        // Abort if not done already and return
        return jqXHR.abort();
      }

      // Aborting is no longer a cancellation
      strAbort = "abort";

      // Install callbacks on deferreds
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);

      // Get transport
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

      // If no transport, we auto-abort
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;

        // Send global event
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }

        // If request was aborted inside ajaxSend, stop there
        if (completed) {
          return jqXHR;
        }

        // Timeout
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }

        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {

          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          }

          // Propagate others as results
          done(-1, e);
        }
      }

      // Callback for when everything is done
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified,
          statusText = nativeStatusText;

        // Ignore repeat invocations
        if (completed) {
          return;
        }

        completed = true;

        // Clear timeout if it exists
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || "";

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;

        // Get response data
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }

        // Use a noop converter for missing script but not if jsonp
        if (!isSuccess &&
          jQuery.inArray("script", s.dataTypes) > -1 &&
          jQuery.inArray("json", s.dataTypes) < 0) {
          s.converters["text script"] = function() {};
        }

        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);

        // If successful, handle type chaining
        if (isSuccess) {

          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }

          // if no content
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";

            // if not modified
          } else if (status === 304) {
            statusText = "notmodified";

            // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {

          // Extract error from statusText and normalize for non-aborts
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";

        // Success/Error
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }

        // Status-dependent callbacks
        jqXHR.statusCode(statusCode);
        statusCode = undefined;

        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
            [jqXHR, s, isSuccess ? success : error]);
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

          // Handle the global AJAX counter
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }

      return jqXHR;
    },

    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },

    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });

  jQuery.each(["get", "post"], function(_i, method) {
    jQuery[method] = function(url, data, callback, type) {

      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      // The url can be an options object (which then must have .url)
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });

  jQuery.ajaxPrefilter(function(s) {
    var i;
    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || "";
      }
    }
  });


  jQuery._evalUrl = function(url, options, doc) {
    return jQuery.ajax({
      url: url,

      // Make this explicit, since user can override this through ajaxSetup (#11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,

      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        "text script": function() {}
      },
      dataFilter: function(response) {
        jQuery.globalEval(response, options, doc);
      }
    });
  };


  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        }

        // The elements to wrap the target around
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function() {
          var elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },

    wrapInner: function(html) {
      if (isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function() {
        var self = jQuery(this),
          contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);

        } else {
          self.append(html);
        }
      });
    },

    wrap: function(html) {
      var htmlIsFunction = isFunction(html);

      return this.each(function(i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },

    unwrap: function(selector) {
      this.parent(selector).not("body").each(function() {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });


  jQuery.expr.pseudos.hidden = function(elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };
  jQuery.expr.pseudos.visible = function(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };




  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };

  var xhrSuccessStatus = {

      // File protocol always yields status code 0, assume 200
      0: 200,

      // Support: IE <=9 only
      // #1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr();

  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;

  jQuery.ajaxTransport(function(options) {
    var callback, errorCallback;

    // Cross domain only allowed if supported through XMLHttpRequest
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
            xhr = options.xhr();

          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          );

          // Apply custom fields if provided
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }

          // Override mime type if needed
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }

          // Set headers
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }

          // Callback
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload =
                  xhr.onerror = xhr.onabort = xhr.ontimeout =
                  xhr.onreadystatechange = null;

                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {

                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(

                      // File: protocol always yields status 0; see #8605, #14207
                      xhr.status,
                      xhr.statusText
                    );
                  }
                } else {
                  complete(
                    xhrSuccessStatus[xhr.status] || xhr.status,
                    xhr.statusText,

                    // Support: IE <=9 only
                    // IE9 has no XHR2 but throws on binary (trac-11426)
                    // For XHR2 non-text, let the caller handle it (gh-2498)
                    (xhr.responseType || "text") !== "text" ||
                    typeof xhr.responseText !== "string" ? {
                      binary: xhr.response
                    } : {
                      text: xhr.responseText
                    },
                    xhr.getAllResponseHeaders()
                  );
                }
              }
            };
          };

          // Listen to events
          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

          // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {

              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {

                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }

          // Create the abort callback
          callback = callback("abort");

          try {

            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {

            // #14683: Only rethrow if this hasn't been notified as an error yet
            if (callback) {
              throw e;
            }
          }
        },

        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });




  // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
  jQuery.ajaxPrefilter(function(s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  });

  // Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " +
        "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });

  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });

  // Bind script tag hack transport
  jQuery.ajaxTransport("script", function(s) {

    // This transport only deals with cross domain or forced-by-attrs requests
    if (s.crossDomain || s.scriptAttrs) {
      var script, callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>")
            .attr(s.scriptAttrs || {})
            .prop({
              charset: s.scriptCharset,
              src: s.url
            })
            .on("load error", callback = function(evt) {
              script.remove();
              callback = null;
              if (evt) {
                complete(evt.type === "error" ? 404 : 200, evt.type);
              }
            });

          // Use native DOM manipulation to avoid our domManip AJAX trickery
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });




  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;

  // Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
      this[callback] = true;
      return callback;
    }
  });

  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

    var callbackName, overwritten, responseContainer,
      jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
        "url" :
        typeof s.data === "string" &&
        (s.contentType || "")
        .indexOf("application/x-www-form-urlencoded") === 0 &&
        rjsonp.test(s.data) && "data"
      );

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if (jsonProp || s.dataTypes[0] === "jsonp") {

      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
        s.jsonpCallback() :
        s.jsonpCallback;

      // Insert callback into url or form data
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }

      // Use data converter to retrieve json after script execution
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };

      // Force json dataType
      s.dataTypes[0] = "json";

      // Install callback
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };

      // Clean-up function (fires after converters)
      jqXHR.always(function() {

        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);

          // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        }

        // Save back as free
        if (s[callbackName]) {

          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback;

          // Save the callback name for future use
          oldCallbacks.push(callbackName);
        }

        // Call if it was a function and we have a response
        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }

        responseContainer = overwritten = undefined;
      });

      // Delegate to script
      return "script";
    }
  });




  // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();


  // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }

    var base, parsed, scripts;

    if (!context) {

      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument("");

        // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)
        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];

    // Single tag
    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };


  /**
   * Load a url into a page
   */
  jQuery.fn.load = function(url, params, callback) {
    var selector, type, response,
      self = this,
      off = url.indexOf(" ");

    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }

    // If it's a function
    if (isFunction(params)) {

      // We assume that it's the callback
      callback = params;
      params = undefined;

      // Otherwise, build a param string
    } else if (params && typeof params === "object") {
      type = "POST";
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url: url,

        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {

        // Save response for use in complete callback
        response = arguments;

        self.html(selector ?

          // If a selector was specified, locate the right elements in a dummy div
          // Exclude scripts to avoid IE 'Permission Denied' errors
          jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

          // Otherwise use the full result
          responseText);

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }

    return this;
  };




  jQuery.expr.pseudos.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };




  jQuery.offset = {
    setOffset: function(elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
        position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};

      // Set position first, in-case top/left are set even on static elem
      if (position === "static") {
        elem.style.position = "relative";
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") &&
        (curCSSTop + curCSSLeft).indexOf("auto") > -1;

      // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;

      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {

        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }

      if ("using" in options) {
        options.using.call(elem, props);

      } else {
        curElem.css(props);
      }
    }
  };

  jQuery.fn.extend({

    // offset() relates an element's border box to the document origin
    offset: function(options) {

      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ?
          this :
          this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
          });
      }

      var rect, win,
        elem = this[0];

      if (!elem) {
        return;
      }

      // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error
      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      }

      // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },

    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function() {
      if (!this[0]) {
        return;
      }

      var offsetParent, offset, doc,
        elem = this[0],
        parentOffset = {
          top: 0,
          left: 0
        };

      // position:fixed elements are offset from the viewport, which itself always has zero offset
      if (jQuery.css(elem, "position") === "fixed") {

        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();

      } else {
        offset = this.offset();

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent &&
          (offsetParent === doc.body || offsetParent === doc.documentElement) &&
          jQuery.css(offsetParent, "position") === "static") {

          offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      }

      // Subtract parent offsets and element margins
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },

    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;

        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    }
  });

  // Create scrollLeft and scrollTop methods
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;

    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {

        // Coalesce documents and windows
        var win;
        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(
            !top ? val : win.pageXOffset,
            top ? val : win.pageYOffset
          );

        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });

  // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here
  jQuery.each(["top", "left"], function(_i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
      function(elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop);

          // If curCSS returns percentage, fallback to offset
          return rnumnonpx.test(computed) ?
            jQuery(elem).position()[prop] + "px" :
            computed;
        }
      }
    );
  });


  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {

      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
          extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

        return access(this, function(elem, type, value) {
          var doc;

          if (isWindow(elem)) {

            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ?
              elem["inner" + name] :
              elem.document.documentElement["client" + name];
          }

          // Get document width or height
          if (elem.nodeType === 9) {
            doc = elem.documentElement;

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            return Math.max(
              elem.body["scroll" + name], doc["scroll" + name],
              elem.body["offset" + name], doc["offset" + name],
              doc["client" + name]
            );
          }

          return value === undefined ?

            // Get width or height on the element, requesting but not forcing parseFloat
            jQuery.css(elem, type, extra) :

            // Set width or height on the element
            jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });


  jQuery.each([
    "ajaxStart",
    "ajaxStop",
    "ajaxComplete",
    "ajaxError",
    "ajaxSuccess",
    "ajaxSend"
  ], function(_i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });




  jQuery.fn.extend({

    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },

    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {

      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ?
        this.off(selector, "**") :
        this.off(types, selector || "**", fn);
    },

    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });

  jQuery.each(
    ("blur focus focusin focusout resize scroll click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup contextmenu").split(" "),
    function(_i, name) {

      // Handle event binding
      jQuery.fn[name] = function(data, fn) {
        return arguments.length > 0 ?
          this.on(name, null, data, fn) :
          this.trigger(name);
      };
    }
  );




  // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon
  jQuery.proxy = function(fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!isFunction(fn)) {
      return undefined;
    }

    // Simulated bind
    args = slice.call(arguments, 2);
    proxy = function() {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  };

  jQuery.holdReady = function(hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };
  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;

  jQuery.now = Date.now;

  jQuery.isNumeric = function(obj) {

    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") &&

      // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(obj - parseFloat(obj));
  };

  jQuery.trim = function(text) {
    return text == null ?
      "" :
      (text + "").replace(rtrim, "");
  };



  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.

  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  }




  var

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    _$ = window.$;

  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  };

  // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)
  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
  }




  return jQuery;
});

! function(t, n) {
  "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.bowser = n() : t.bowser = n()
}(this, (function() {
  return function(t) {
    var n = {};

    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }
    return e.m = t, e.c = n, e.d = function(t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: r
      })
    }, e.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, e.t = function(t, n) {
      if (1 & n && (t = e(t)), 8 & n) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (e.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: t
        }), 2 & n && "string" != typeof t)
        for (var i in t) e.d(r, i, function(n) {
          return t[n]
        }.bind(null, i));
      return r
    }, e.n = function(t) {
      var n = t && t.__esModule ? function() {
        return t.default
      } : function() {
        return t
      };
      return e.d(n, "a", n), n
    }, e.o = function(t, n) {
      return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "", e(e.s = 129)
  }([function(t, n, e) {
    var r = e(1),
      i = e(7),
      o = e(14),
      u = e(11),
      a = e(19),
      c = function(t, n, e) {
        var s, f, l, h, d = t & c.F,
          p = t & c.G,
          v = t & c.S,
          g = t & c.P,
          y = t & c.B,
          m = p ? r : v ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
          b = p ? i : i[n] || (i[n] = {}),
          S = b.prototype || (b.prototype = {});
        for (s in p && (e = n), e) l = ((f = !d && m && void 0 !== m[s]) ? m : e)[s], h = y && f ? a(l, r) : g && "function" == typeof l ? a(Function.call, l) : l, m && u(m, s, l, t & c.U), b[s] != l && o(b, s, h), g && S[s] != l && (S[s] = l)
      };
    r.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c
  }, function(t, n) {
    var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = e)
  }, function(t, n) {
    t.exports = function(t) {
      try {
        return !!t()
      } catch (t) {
        return !0
      }
    }
  }, function(t, n, e) {
    var r = e(4);
    t.exports = function(t) {
      if (!r(t)) throw TypeError(t + " is not an object!");
      return t
    }
  }, function(t, n) {
    t.exports = function(t) {
      return "object" == typeof t ? null !== t : "function" == typeof t
    }
  }, function(t, n, e) {
    var r = e(50)("wks"),
      i = e(31),
      o = e(1).Symbol,
      u = "function" == typeof o;
    (t.exports = function(t) {
      return r[t] || (r[t] = u && o[t] || (u ? o : i)("Symbol." + t))
    }).store = r
  }, function(t, n, e) {
    var r = e(21),
      i = Math.min;
    t.exports = function(t) {
      return t > 0 ? i(r(t), 9007199254740991) : 0
    }
  }, function(t, n) {
    var e = t.exports = {
      version: "2.6.9"
    };
    "number" == typeof __e && (__e = e)
  }, function(t, n, e) {
    t.exports = !e(2)((function() {
      return 7 != Object.defineProperty({}, "a", {
        get: function() {
          return 7
        }
      }).a
    }))
  }, function(t, n, e) {
    var r = e(3),
      i = e(96),
      o = e(28),
      u = Object.defineProperty;
    n.f = e(8) ? Object.defineProperty : function(t, n, e) {
      if (r(t), n = o(n, !0), r(e), i) try {
        return u(t, n, e)
      } catch (t) {}
      if ("get" in e || "set" in e) throw TypeError("Accessors not supported!");
      return "value" in e && (t[n] = e.value), t
    }
  }, function(t, n, e) {
    var r = e(26);
    t.exports = function(t) {
      return Object(r(t))
    }
  }, function(t, n, e) {
    var r = e(1),
      i = e(14),
      o = e(13),
      u = e(31)("src"),
      a = e(134),
      c = ("" + a).split("toString");
    e(7).inspectSource = function(t) {
      return a.call(t)
    }, (t.exports = function(t, n, e, a) {
      var s = "function" == typeof e;
      s && (o(e, "name") || i(e, "name", n)), t[n] !== e && (s && (o(e, u) || i(e, u, t[n] ? "" + t[n] : c.join(String(n)))), t === r ? t[n] = e : a ? t[n] ? t[n] = e : i(t, n, e) : (delete t[n], i(t, n, e)))
    })(Function.prototype, "toString", (function() {
      return "function" == typeof this && this[u] || a.call(this)
    }))
  }, function(t, n, e) {
    var r = e(0),
      i = e(2),
      o = e(26),
      u = /"/g,
      a = function(t, n, e, r) {
        var i = String(o(t)),
          a = "<" + n;
        return "" !== e && (a += " " + e + '="' + String(r).replace(u, "&quot;") + '"'), a + ">" + i + "</" + n + ">"
      };
    t.exports = function(t, n) {
      var e = {};
      e[t] = n(a), r(r.P + r.F * i((function() {
        var n = "" [t]('"');
        return n !== n.toLowerCase() || n.split('"').length > 3
      })), "String", e)
    }
  }, function(t, n) {
    var e = {}.hasOwnProperty;
    t.exports = function(t, n) {
      return e.call(t, n)
    }
  }, function(t, n, e) {
    var r = e(9),
      i = e(30);
    t.exports = e(8) ? function(t, n, e) {
      return r.f(t, n, i(1, e))
    } : function(t, n, e) {
      return t[n] = e, t
    }
  }, function(t, n, e) {
    var r = e(46),
      i = e(26);
    t.exports = function(t) {
      return r(i(t))
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(2);
    t.exports = function(t, n) {
      return !!t && r((function() {
        n ? t.call(null, (function() {}), 1) : t.call(null)
      }))
    }
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r = e(18),
      i = function() {
        function t() {}
        return t.getFirstMatch = function(t, n) {
          var e = n.match(t);
          return e && e.length > 0 && e[1] || ""
        }, t.getSecondMatch = function(t, n) {
          var e = n.match(t);
          return e && e.length > 1 && e[2] || ""
        }, t.matchAndReturnConst = function(t, n, e) {
          if (t.test(n)) return e
        }, t.getWindowsVersionName = function(t) {
          switch (t) {
            case "NT":
              return "NT";
            case "XP":
              return "XP";
            case "NT 5.0":
              return "2000";
            case "NT 5.1":
              return "XP";
            case "NT 5.2":
              return "2003";
            case "NT 6.0":
              return "Vista";
            case "NT 6.1":
              return "7";
            case "NT 6.2":
              return "8";
            case "NT 6.3":
              return "8.1";
            case "NT 10.0":
              return "10";
            default:
              return
          }
        }, t.getMacOSVersionName = function(t) {
          var n = t.split(".").splice(0, 2).map((function(t) {
            return parseInt(t, 10) || 0
          }));
          if (n.push(0), 10 === n[0]) switch (n[1]) {
            case 5:
              return "Leopard";
            case 6:
              return "Snow Leopard";
            case 7:
              return "Lion";
            case 8:
              return "Mountain Lion";
            case 9:
              return "Mavericks";
            case 10:
              return "Yosemite";
            case 11:
              return "El Capitan";
            case 12:
              return "Sierra";
            case 13:
              return "High Sierra";
            case 14:
              return "Mojave";
            case 15:
              return "Catalina";
            default:
              return
          }
        }, t.getAndroidVersionName = function(t) {
          var n = t.split(".").splice(0, 2).map((function(t) {
            return parseInt(t, 10) || 0
          }));
          if (n.push(0), !(1 === n[0] && n[1] < 5)) return 1 === n[0] && n[1] < 6 ? "Cupcake" : 1 === n[0] && n[1] >= 6 ? "Donut" : 2 === n[0] && n[1] < 2 ? "Eclair" : 2 === n[0] && 2 === n[1] ? "Froyo" : 2 === n[0] && n[1] > 2 ? "Gingerbread" : 3 === n[0] ? "Honeycomb" : 4 === n[0] && n[1] < 1 ? "Ice Cream Sandwich" : 4 === n[0] && n[1] < 4 ? "Jelly Bean" : 4 === n[0] && n[1] >= 4 ? "KitKat" : 5 === n[0] ? "Lollipop" : 6 === n[0] ? "Marshmallow" : 7 === n[0] ? "Nougat" : 8 === n[0] ? "Oreo" : 9 === n[0] ? "Pie" : void 0
        }, t.getVersionPrecision = function(t) {
          return t.split(".").length
        }, t.compareVersions = function(n, e, r) {
          void 0 === r && (r = !1);
          var i = t.getVersionPrecision(n),
            o = t.getVersionPrecision(e),
            u = Math.max(i, o),
            a = 0,
            c = t.map([n, e], (function(n) {
              var e = u - t.getVersionPrecision(n),
                r = n + new Array(e + 1).join(".0");
              return t.map(r.split("."), (function(t) {
                return new Array(20 - t.length).join("0") + t
              })).reverse()
            }));
          for (r && (a = u - Math.min(i, o)), u -= 1; u >= a;) {
            if (c[0][u] > c[1][u]) return 1;
            if (c[0][u] === c[1][u]) {
              if (u === a) return 0;
              u -= 1
            } else if (c[0][u] < c[1][u]) return -1
          }
        }, t.map = function(t, n) {
          var e, r = [];
          if (Array.prototype.map) return Array.prototype.map.call(t, n);
          for (e = 0; e < t.length; e += 1) r.push(n(t[e]));
          return r
        }, t.find = function(t, n) {
          var e, r;
          if (Array.prototype.find) return Array.prototype.find.call(t, n);
          for (e = 0, r = t.length; e < r; e += 1) {
            var i = t[e];
            if (n(i, e)) return i
          }
        }, t.assign = function(t) {
          for (var n, e, r = t, i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), u = 1; u < i; u++) o[u - 1] = arguments[u];
          if (Object.assign) return Object.assign.apply(Object, [t].concat(o));
          var a = function() {
            var t = o[n];
            "object" == typeof t && null !== t && Object.keys(t).forEach((function(n) {
              r[n] = t[n]
            }))
          };
          for (n = 0, e = o.length; n < e; n += 1) a();
          return t
        }, t.getBrowserAlias = function(t) {
          return r.BROWSER_ALIASES_MAP[t]
        }, t.getBrowserTypeByAlias = function(t) {
          return r.BROWSER_MAP[t] || ""
        }, t
      }();
    n.default = i, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.ENGINE_MAP = n.OS_MAP = n.PLATFORMS_MAP = n.BROWSER_MAP = n.BROWSER_ALIASES_MAP = void 0;
    n.BROWSER_ALIASES_MAP = {
      "Amazon Silk": "amazon_silk",
      "Android Browser": "android",
      Bada: "bada",
      BlackBerry: "blackberry",
      Chrome: "chrome",
      Chromium: "chromium",
      Electron: "electron",
      Epiphany: "epiphany",
      Firefox: "firefox",
      Focus: "focus",
      Generic: "generic",
      "Google Search": "google_search",
      Googlebot: "googlebot",
      "Internet Explorer": "ie",
      "K-Meleon": "k_meleon",
      Maxthon: "maxthon",
      "Microsoft Edge": "edge",
      "MZ Browser": "mz",
      "NAVER Whale Browser": "naver",
      Opera: "opera",
      "Opera Coast": "opera_coast",
      PhantomJS: "phantomjs",
      Puffin: "puffin",
      QupZilla: "qupzilla",
      QQ: "qq",
      QQLite: "qqlite",
      Safari: "safari",
      Sailfish: "sailfish",
      "Samsung Internet for Android": "samsung_internet",
      SeaMonkey: "seamonkey",
      Sleipnir: "sleipnir",
      Swing: "swing",
      Tizen: "tizen",
      "UC Browser": "uc",
      Vivaldi: "vivaldi",
      "WebOS Browser": "webos",
      WeChat: "wechat",
      "Yandex Browser": "yandex",
      Roku: "roku"
    };
    n.BROWSER_MAP = {
      amazon_silk: "Amazon Silk",
      android: "Android Browser",
      bada: "Bada",
      blackberry: "BlackBerry",
      chrome: "Chrome",
      chromium: "Chromium",
      electron: "Electron",
      epiphany: "Epiphany",
      firefox: "Firefox",
      focus: "Focus",
      generic: "Generic",
      googlebot: "Googlebot",
      google_search: "Google Search",
      ie: "Internet Explorer",
      k_meleon: "K-Meleon",
      maxthon: "Maxthon",
      edge: "Microsoft Edge",
      mz: "MZ Browser",
      naver: "NAVER Whale Browser",
      opera: "Opera",
      opera_coast: "Opera Coast",
      phantomjs: "PhantomJS",
      puffin: "Puffin",
      qupzilla: "QupZilla",
      qq: "QQ Browser",
      qqlite: "QQ Browser Lite",
      safari: "Safari",
      sailfish: "Sailfish",
      samsung_internet: "Samsung Internet for Android",
      seamonkey: "SeaMonkey",
      sleipnir: "Sleipnir",
      swing: "Swing",
      tizen: "Tizen",
      uc: "UC Browser",
      vivaldi: "Vivaldi",
      webos: "WebOS Browser",
      wechat: "WeChat",
      yandex: "Yandex Browser"
    };
    n.PLATFORMS_MAP = {
      tablet: "tablet",
      mobile: "mobile",
      desktop: "desktop",
      tv: "tv"
    };
    n.OS_MAP = {
      WindowsPhone: "Windows Phone",
      Windows: "Windows",
      MacOS: "macOS",
      iOS: "iOS",
      Android: "Android",
      WebOS: "WebOS",
      BlackBerry: "BlackBerry",
      Bada: "Bada",
      Tizen: "Tizen",
      Linux: "Linux",
      ChromeOS: "Chrome OS",
      PlayStation4: "PlayStation 4",
      Roku: "Roku"
    };
    n.ENGINE_MAP = {
      EdgeHTML: "EdgeHTML",
      Blink: "Blink",
      Trident: "Trident",
      Presto: "Presto",
      Gecko: "Gecko",
      WebKit: "WebKit"
    }
  }, function(t, n, e) {
    var r = e(20);
    t.exports = function(t, n, e) {
      if (r(t), void 0 === n) return t;
      switch (e) {
        case 1:
          return function(e) {
            return t.call(n, e)
          };
        case 2:
          return function(e, r) {
            return t.call(n, e, r)
          };
        case 3:
          return function(e, r, i) {
            return t.call(n, e, r, i)
          }
      }
      return function() {
        return t.apply(n, arguments)
      }
    }
  }, function(t, n) {
    t.exports = function(t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t
    }
  }, function(t, n) {
    var e = Math.ceil,
      r = Math.floor;
    t.exports = function(t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t)
    }
  }, function(t, n, e) {
    var r = e(47),
      i = e(30),
      o = e(15),
      u = e(28),
      a = e(13),
      c = e(96),
      s = Object.getOwnPropertyDescriptor;
    n.f = e(8) ? s : function(t, n) {
      if (t = o(t), n = u(n, !0), c) try {
        return s(t, n)
      } catch (t) {}
      if (a(t, n)) return i(!r.f.call(t, n), t[n])
    }
  }, function(t, n, e) {
    var r = e(0),
      i = e(7),
      o = e(2);
    t.exports = function(t, n) {
      var e = (i.Object || {})[t] || Object[t],
        u = {};
      u[t] = n(e), r(r.S + r.F * o((function() {
        e(1)
      })), "Object", u)
    }
  }, function(t, n, e) {
    var r = e(19),
      i = e(46),
      o = e(10),
      u = e(6),
      a = e(112);
    t.exports = function(t, n) {
      var e = 1 == t,
        c = 2 == t,
        s = 3 == t,
        f = 4 == t,
        l = 6 == t,
        h = 5 == t || l,
        d = n || a;
      return function(n, a, p) {
        for (var v, g, y = o(n), m = i(y), b = r(a, p, 3), S = u(m.length), w = 0, _ = e ? d(n, S) : c ? d(n, 0) : void 0; S > w; w++)
          if ((h || w in m) && (g = b(v = m[w], w, y), t))
            if (e) _[w] = g;
            else if (g) switch (t) {
          case 3:
            return !0;
          case 5:
            return v;
          case 6:
            return w;
          case 2:
            _.push(v)
        } else if (f) return !1;
        return l ? -1 : s || f ? f : _
      }
    }
  }, function(t, n) {
    var e = {}.toString;
    t.exports = function(t) {
      return e.call(t).slice(8, -1)
    }
  }, function(t, n) {
    t.exports = function(t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t
    }
  }, function(t, n, e) {
    "use strict";
    if (e(8)) {
      var r = e(32),
        i = e(1),
        o = e(2),
        u = e(0),
        a = e(61),
        c = e(86),
        s = e(19),
        f = e(44),
        l = e(30),
        h = e(14),
        d = e(45),
        p = e(21),
        v = e(6),
        g = e(123),
        y = e(34),
        m = e(28),
        b = e(13),
        S = e(48),
        w = e(4),
        _ = e(10),
        M = e(78),
        x = e(35),
        P = e(37),
        O = e(36).f,
        F = e(80),
        A = e(31),
        E = e(5),
        N = e(24),
        R = e(51),
        k = e(49),
        T = e(82),
        I = e(42),
        j = e(54),
        L = e(43),
        B = e(81),
        C = e(114),
        W = e(9),
        V = e(22),
        G = W.f,
        D = V.f,
        U = i.RangeError,
        z = i.TypeError,
        q = i.Uint8Array,
        K = Array.prototype,
        Y = c.ArrayBuffer,
        Q = c.DataView,
        H = N(0),
        J = N(2),
        X = N(3),
        Z = N(4),
        $ = N(5),
        tt = N(6),
        nt = R(!0),
        et = R(!1),
        rt = T.values,
        it = T.keys,
        ot = T.entries,
        ut = K.lastIndexOf,
        at = K.reduce,
        ct = K.reduceRight,
        st = K.join,
        ft = K.sort,
        lt = K.slice,
        ht = K.toString,
        dt = K.toLocaleString,
        pt = E("iterator"),
        vt = E("toStringTag"),
        gt = A("typed_constructor"),
        yt = A("def_constructor"),
        mt = a.CONSTR,
        bt = a.TYPED,
        St = a.VIEW,
        wt = N(1, (function(t, n) {
          return Ot(k(t, t[yt]), n)
        })),
        _t = o((function() {
          return 1 === new q(new Uint16Array([1]).buffer)[0]
        })),
        Mt = !!q && !!q.prototype.set && o((function() {
          new q(1).set({})
        })),
        xt = function(t, n) {
          var e = p(t);
          if (e < 0 || e % n) throw U("Wrong offset!");
          return e
        },
        Pt = function(t) {
          if (w(t) && bt in t) return t;
          throw z(t + " is not a typed array!")
        },
        Ot = function(t, n) {
          if (!(w(t) && gt in t)) throw z("It is not a typed array constructor!");
          return new t(n)
        },
        Ft = function(t, n) {
          return At(k(t, t[yt]), n)
        },
        At = function(t, n) {
          for (var e = 0, r = n.length, i = Ot(t, r); r > e;) i[e] = n[e++];
          return i
        },
        Et = function(t, n, e) {
          G(t, n, {
            get: function() {
              return this._d[e]
            }
          })
        },
        Nt = function(t) {
          var n, e, r, i, o, u, a = _(t),
            c = arguments.length,
            f = c > 1 ? arguments[1] : void 0,
            l = void 0 !== f,
            h = F(a);
          if (null != h && !M(h)) {
            for (u = h.call(a), r = [], n = 0; !(o = u.next()).done; n++) r.push(o.value);
            a = r
          }
          for (l && c > 2 && (f = s(f, arguments[2], 2)), n = 0, e = v(a.length), i = Ot(this, e); e > n; n++) i[n] = l ? f(a[n], n) : a[n];
          return i
        },
        Rt = function() {
          for (var t = 0, n = arguments.length, e = Ot(this, n); n > t;) e[t] = arguments[t++];
          return e
        },
        kt = !!q && o((function() {
          dt.call(new q(1))
        })),
        Tt = function() {
          return dt.apply(kt ? lt.call(Pt(this)) : Pt(this), arguments)
        },
        It = {
          copyWithin: function(t, n) {
            return C.call(Pt(this), t, n, arguments.length > 2 ? arguments[2] : void 0)
          },
          every: function(t) {
            return Z(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          fill: function(t) {
            return B.apply(Pt(this), arguments)
          },
          filter: function(t) {
            return Ft(this, J(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0))
          },
          find: function(t) {
            return $(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          findIndex: function(t) {
            return tt(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          forEach: function(t) {
            H(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          indexOf: function(t) {
            return et(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          includes: function(t) {
            return nt(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          join: function(t) {
            return st.apply(Pt(this), arguments)
          },
          lastIndexOf: function(t) {
            return ut.apply(Pt(this), arguments)
          },
          map: function(t) {
            return wt(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          reduce: function(t) {
            return at.apply(Pt(this), arguments)
          },
          reduceRight: function(t) {
            return ct.apply(Pt(this), arguments)
          },
          reverse: function() {
            for (var t, n = Pt(this).length, e = Math.floor(n / 2), r = 0; r < e;) t = this[r], this[r++] = this[--n], this[n] = t;
            return this
          },
          some: function(t) {
            return X(Pt(this), t, arguments.length > 1 ? arguments[1] : void 0)
          },
          sort: function(t) {
            return ft.call(Pt(this), t)
          },
          subarray: function(t, n) {
            var e = Pt(this),
              r = e.length,
              i = y(t, r);
            return new(k(e, e[yt]))(e.buffer, e.byteOffset + i * e.BYTES_PER_ELEMENT, v((void 0 === n ? r : y(n, r)) - i))
          }
        },
        jt = function(t, n) {
          return Ft(this, lt.call(Pt(this), t, n))
        },
        Lt = function(t) {
          Pt(this);
          var n = xt(arguments[1], 1),
            e = this.length,
            r = _(t),
            i = v(r.length),
            o = 0;
          if (i + n > e) throw U("Wrong length!");
          for (; o < i;) this[n + o] = r[o++]
        },
        Bt = {
          entries: function() {
            return ot.call(Pt(this))
          },
          keys: function() {
            return it.call(Pt(this))
          },
          values: function() {
            return rt.call(Pt(this))
          }
        },
        Ct = function(t, n) {
          return w(t) && t[bt] && "symbol" != typeof n && n in t && String(+n) == String(n)
        },
        Wt = function(t, n) {
          return Ct(t, n = m(n, !0)) ? l(2, t[n]) : D(t, n)
        },
        Vt = function(t, n, e) {
          return !(Ct(t, n = m(n, !0)) && w(e) && b(e, "value")) || b(e, "get") || b(e, "set") || e.configurable || b(e, "writable") && !e.writable || b(e, "enumerable") && !e.enumerable ? G(t, n, e) : (t[n] = e.value, t)
        };
      mt || (V.f = Wt, W.f = Vt), u(u.S + u.F * !mt, "Object", {
        getOwnPropertyDescriptor: Wt,
        defineProperty: Vt
      }), o((function() {
        ht.call({})
      })) && (ht = dt = function() {
        return st.call(this)
      });
      var Gt = d({}, It);
      d(Gt, Bt), h(Gt, pt, Bt.values), d(Gt, {
        slice: jt,
        set: Lt,
        constructor: function() {},
        toString: ht,
        toLocaleString: Tt
      }), Et(Gt, "buffer", "b"), Et(Gt, "byteOffset", "o"), Et(Gt, "byteLength", "l"), Et(Gt, "length", "e"), G(Gt, vt, {
        get: function() {
          return this[bt]
        }
      }), t.exports = function(t, n, e, c) {
        var s = t + ((c = !!c) ? "Clamped" : "") + "Array",
          l = "get" + t,
          d = "set" + t,
          p = i[s],
          y = p || {},
          m = p && P(p),
          b = !p || !a.ABV,
          _ = {},
          M = p && p.prototype,
          F = function(t, e) {
            G(t, e, {
              get: function() {
                return function(t, e) {
                  var r = t._d;
                  return r.v[l](e * n + r.o, _t)
                }(this, e)
              },
              set: function(t) {
                return function(t, e, r) {
                  var i = t._d;
                  c && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.v[d](e * n + i.o, r, _t)
                }(this, e, t)
              },
              enumerable: !0
            })
          };
        b ? (p = e((function(t, e, r, i) {
          f(t, p, s, "_d");
          var o, u, a, c, l = 0,
            d = 0;
          if (w(e)) {
            if (!(e instanceof Y || "ArrayBuffer" == (c = S(e)) || "SharedArrayBuffer" == c)) return bt in e ? At(p, e) : Nt.call(p, e);
            o = e, d = xt(r, n);
            var y = e.byteLength;
            if (void 0 === i) {
              if (y % n) throw U("Wrong length!");
              if ((u = y - d) < 0) throw U("Wrong length!")
            } else if ((u = v(i) * n) + d > y) throw U("Wrong length!");
            a = u / n
          } else a = g(e), o = new Y(u = a * n);
          for (h(t, "_d", {
              b: o,
              o: d,
              l: u,
              e: a,
              v: new Q(o)
            }); l < a;) F(t, l++)
        })), M = p.prototype = x(Gt), h(M, "constructor", p)) : o((function() {
          p(1)
        })) && o((function() {
          new p(-1)
        })) && j((function(t) {
          new p, new p(null), new p(1.5), new p(t)
        }), !0) || (p = e((function(t, e, r, i) {
          var o;
          return f(t, p, s), w(e) ? e instanceof Y || "ArrayBuffer" == (o = S(e)) || "SharedArrayBuffer" == o ? void 0 !== i ? new y(e, xt(r, n), i) : void 0 !== r ? new y(e, xt(r, n)) : new y(e) : bt in e ? At(p, e) : Nt.call(p, e) : new y(g(e))
        })), H(m !== Function.prototype ? O(y).concat(O(m)) : O(y), (function(t) {
          t in p || h(p, t, y[t])
        })), p.prototype = M, r || (M.constructor = p));
        var A = M[pt],
          E = !!A && ("values" == A.name || null == A.name),
          N = Bt.values;
        h(p, gt, !0), h(M, bt, s), h(M, St, !0), h(M, yt, p), (c ? new p(1)[vt] == s : vt in M) || G(M, vt, {
          get: function() {
            return s
          }
        }), _[s] = p, u(u.G + u.W + u.F * (p != y), _), u(u.S, s, {
          BYTES_PER_ELEMENT: n
        }), u(u.S + u.F * o((function() {
          y.of.call(p, 1)
        })), s, {
          from: Nt,
          of: Rt
        }), "BYTES_PER_ELEMENT" in M || h(M, "BYTES_PER_ELEMENT", n), u(u.P, s, It), L(s), u(u.P + u.F * Mt, s, {
          set: Lt
        }), u(u.P + u.F * !E, s, Bt), r || M.toString == ht || (M.toString = ht), u(u.P + u.F * o((function() {
          new p(1).slice()
        })), s, {
          slice: jt
        }), u(u.P + u.F * (o((function() {
          return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString()
        })) || !o((function() {
          M.toLocaleString.call([1, 2])
        }))), s, {
          toLocaleString: Tt
        }), I[s] = E ? A : N, r || E || h(M, pt, N)
      }
    } else t.exports = function() {}
  }, function(t, n, e) {
    var r = e(4);
    t.exports = function(t, n) {
      if (!r(t)) return t;
      var e, i;
      if (n && "function" == typeof(e = t.toString) && !r(i = e.call(t))) return i;
      if ("function" == typeof(e = t.valueOf) && !r(i = e.call(t))) return i;
      if (!n && "function" == typeof(e = t.toString) && !r(i = e.call(t))) return i;
      throw TypeError("Can't convert object to primitive value")
    }
  }, function(t, n, e) {
    var r = e(31)("meta"),
      i = e(4),
      o = e(13),
      u = e(9).f,
      a = 0,
      c = Object.isExtensible || function() {
        return !0
      },
      s = !e(2)((function() {
        return c(Object.preventExtensions({}))
      })),
      f = function(t) {
        u(t, r, {
          value: {
            i: "O" + ++a,
            w: {}
          }
        })
      },
      l = t.exports = {
        KEY: r,
        NEED: !1,
        fastKey: function(t, n) {
          if (!i(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
          if (!o(t, r)) {
            if (!c(t)) return "F";
            if (!n) return "E";
            f(t)
          }
          return t[r].i
        },
        getWeak: function(t, n) {
          if (!o(t, r)) {
            if (!c(t)) return !0;
            if (!n) return !1;
            f(t)
          }
          return t[r].w
        },
        onFreeze: function(t) {
          return s && l.NEED && c(t) && !o(t, r) && f(t), t
        }
      }
  }, function(t, n) {
    t.exports = function(t, n) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: n
      }
    }
  }, function(t, n) {
    var e = 0,
      r = Math.random();
    t.exports = function(t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36))
    }
  }, function(t, n) {
    t.exports = !1
  }, function(t, n, e) {
    var r = e(98),
      i = e(65);
    t.exports = Object.keys || function(t) {
      return r(t, i)
    }
  }, function(t, n, e) {
    var r = e(21),
      i = Math.max,
      o = Math.min;
    t.exports = function(t, n) {
      return (t = r(t)) < 0 ? i(t + n, 0) : o(t, n)
    }
  }, function(t, n, e) {
    var r = e(3),
      i = e(99),
      o = e(65),
      u = e(64)("IE_PROTO"),
      a = function() {},
      c = function() {
        var t, n = e(62)("iframe"),
          r = o.length;
        for (n.style.display = "none", e(66).appendChild(n), n.src = "javascript:", (t = n.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), c = t.F; r--;) delete c.prototype[o[r]];
        return c()
      };
    t.exports = Object.create || function(t, n) {
      var e;
      return null !== t ? (a.prototype = r(t), e = new a, a.prototype = null, e[u] = t) : e = c(), void 0 === n ? e : i(e, n)
    }
  }, function(t, n, e) {
    var r = e(98),
      i = e(65).concat("length", "prototype");
    n.f = Object.getOwnPropertyNames || function(t) {
      return r(t, i)
    }
  }, function(t, n, e) {
    var r = e(13),
      i = e(10),
      o = e(64)("IE_PROTO"),
      u = Object.prototype;
    t.exports = Object.getPrototypeOf || function(t) {
      return t = i(t), r(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null
    }
  }, function(t, n, e) {
    var r = e(5)("unscopables"),
      i = Array.prototype;
    null == i[r] && e(14)(i, r, {}), t.exports = function(t) {
      i[r][t] = !0
    }
  }, function(t, n, e) {
    var r = e(4);
    t.exports = function(t, n) {
      if (!r(t) || t._t !== n) throw TypeError("Incompatible receiver, " + n + " required!");
      return t
    }
  }, function(t, n, e) {
    var r = e(9).f,
      i = e(13),
      o = e(5)("toStringTag");
    t.exports = function(t, n, e) {
      t && !i(t = e ? t : t.prototype, o) && r(t, o, {
        configurable: !0,
        value: n
      })
    }
  }, function(t, n, e) {
    var r = e(0),
      i = e(26),
      o = e(2),
      u = e(68),
      a = "[" + u + "]",
      c = RegExp("^" + a + a + "*"),
      s = RegExp(a + a + "*$"),
      f = function(t, n, e) {
        var i = {},
          a = o((function() {
            return !!u[t]() || "​" != "​" [t]()
          })),
          c = i[t] = a ? n(l) : u[t];
        e && (i[e] = c), r(r.P + r.F * a, "String", i)
      },
      l = f.trim = function(t, n) {
        return t = String(i(t)), 1 & n && (t = t.replace(c, "")), 2 & n && (t = t.replace(s, "")), t
      };
    t.exports = f
  }, function(t, n) {
    t.exports = {}
  }, function(t, n, e) {
    "use strict";
    var r = e(1),
      i = e(9),
      o = e(8),
      u = e(5)("species");
    t.exports = function(t) {
      var n = r[t];
      o && n && !n[u] && i.f(n, u, {
        configurable: !0,
        get: function() {
          return this
        }
      })
    }
  }, function(t, n) {
    t.exports = function(t, n, e, r) {
      if (!(t instanceof n) || void 0 !== r && r in t) throw TypeError(e + ": incorrect invocation!");
      return t
    }
  }, function(t, n, e) {
    var r = e(11);
    t.exports = function(t, n, e) {
      for (var i in n) r(t, i, n[i], e);
      return t
    }
  }, function(t, n, e) {
    var r = e(25);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
      return "String" == r(t) ? t.split("") : Object(t)
    }
  }, function(t, n) {
    n.f = {}.propertyIsEnumerable
  }, function(t, n, e) {
    var r = e(25),
      i = e(5)("toStringTag"),
      o = "Arguments" == r(function() {
        return arguments
      }());
    t.exports = function(t) {
      var n, e, u;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(e = function(t, n) {
        try {
          return t[n]
        } catch (t) {}
      }(n = Object(t), i)) ? e : o ? r(n) : "Object" == (u = r(n)) && "function" == typeof n.callee ? "Arguments" : u
    }
  }, function(t, n, e) {
    var r = e(3),
      i = e(20),
      o = e(5)("species");
    t.exports = function(t, n) {
      var e, u = r(t).constructor;
      return void 0 === u || null == (e = r(u)[o]) ? n : i(e)
    }
  }, function(t, n, e) {
    var r = e(7),
      i = e(1),
      o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
    (t.exports = function(t, n) {
      return o[t] || (o[t] = void 0 !== n ? n : {})
    })("versions", []).push({
      version: r.version,
      mode: e(32) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    })
  }, function(t, n, e) {
    var r = e(15),
      i = e(6),
      o = e(34);
    t.exports = function(t) {
      return function(n, e, u) {
        var a, c = r(n),
          s = i(c.length),
          f = o(u, s);
        if (t && e != e) {
          for (; s > f;)
            if ((a = c[f++]) != a) return !0
        } else
          for (; s > f; f++)
            if ((t || f in c) && c[f] === e) return t || f || 0;
        return !t && -1
      }
    }
  }, function(t, n) {
    n.f = Object.getOwnPropertySymbols
  }, function(t, n, e) {
    var r = e(25);
    t.exports = Array.isArray || function(t) {
      return "Array" == r(t)
    }
  }, function(t, n, e) {
    var r = e(5)("iterator"),
      i = !1;
    try {
      var o = [7][r]();
      o.return = function() {
        i = !0
      }, Array.from(o, (function() {
        throw 2
      }))
    } catch (t) {}
    t.exports = function(t, n) {
      if (!n && !i) return !1;
      var e = !1;
      try {
        var o = [7],
          u = o[r]();
        u.next = function() {
          return {
            done: e = !0
          }
        }, o[r] = function() {
          return u
        }, t(o)
      } catch (t) {}
      return e
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(3);
    t.exports = function() {
      var t = r(this),
        n = "";
      return t.global && (n += "g"), t.ignoreCase && (n += "i"), t.multiline && (n += "m"), t.unicode && (n += "u"), t.sticky && (n += "y"), n
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(48),
      i = RegExp.prototype.exec;
    t.exports = function(t, n) {
      var e = t.exec;
      if ("function" == typeof e) {
        var o = e.call(t, n);
        if ("object" != typeof o) throw new TypeError("RegExp exec method returned something other than an Object or null");
        return o
      }
      if ("RegExp" !== r(t)) throw new TypeError("RegExp#exec called on incompatible receiver");
      return i.call(t, n)
    }
  }, function(t, n, e) {
    "use strict";
    e(116);
    var r = e(11),
      i = e(14),
      o = e(2),
      u = e(26),
      a = e(5),
      c = e(83),
      s = a("species"),
      f = !o((function() {
        var t = /./;
        return t.exec = function() {
          var t = [];
          return t.groups = {
            a: "7"
          }, t
        }, "7" !== "".replace(t, "$<a>")
      })),
      l = function() {
        var t = /(?:)/,
          n = t.exec;
        t.exec = function() {
          return n.apply(this, arguments)
        };
        var e = "ab".split(t);
        return 2 === e.length && "a" === e[0] && "b" === e[1]
      }();
    t.exports = function(t, n, e) {
      var h = a(t),
        d = !o((function() {
          var n = {};
          return n[h] = function() {
            return 7
          }, 7 != "" [t](n)
        })),
        p = d ? !o((function() {
          var n = !1,
            e = /a/;
          return e.exec = function() {
            return n = !0, null
          }, "split" === t && (e.constructor = {}, e.constructor[s] = function() {
            return e
          }), e[h](""), !n
        })) : void 0;
      if (!d || !p || "replace" === t && !f || "split" === t && !l) {
        var v = /./ [h],
          g = e(u, h, "" [t], (function(t, n, e, r, i) {
            return n.exec === c ? d && !i ? {
              done: !0,
              value: v.call(n, e, r)
            } : {
              done: !0,
              value: t.call(e, n, r)
            } : {
              done: !1
            }
          })),
          y = g[0],
          m = g[1];
        r(String.prototype, t, y), i(RegExp.prototype, h, 2 == n ? function(t, n) {
          return m.call(t, this, n)
        } : function(t) {
          return m.call(t, this)
        })
      }
    }
  }, function(t, n, e) {
    var r = e(19),
      i = e(111),
      o = e(78),
      u = e(3),
      a = e(6),
      c = e(80),
      s = {},
      f = {};
    (n = t.exports = function(t, n, e, l, h) {
      var d, p, v, g, y = h ? function() {
          return t
        } : c(t),
        m = r(e, l, n ? 2 : 1),
        b = 0;
      if ("function" != typeof y) throw TypeError(t + " is not iterable!");
      if (o(y)) {
        for (d = a(t.length); d > b; b++)
          if ((g = n ? m(u(p = t[b])[0], p[1]) : m(t[b])) === s || g === f) return g
      } else
        for (v = y.call(t); !(p = v.next()).done;)
          if ((g = i(v, m, p.value, n)) === s || g === f) return g
    }).BREAK = s, n.RETURN = f
  }, function(t, n, e) {
    var r = e(1).navigator;
    t.exports = r && r.userAgent || ""
  }, function(t, n, e) {
    "use strict";
    var r = e(1),
      i = e(0),
      o = e(11),
      u = e(45),
      a = e(29),
      c = e(58),
      s = e(44),
      f = e(4),
      l = e(2),
      h = e(54),
      d = e(40),
      p = e(69);
    t.exports = function(t, n, e, v, g, y) {
      var m = r[t],
        b = m,
        S = g ? "set" : "add",
        w = b && b.prototype,
        _ = {},
        M = function(t) {
          var n = w[t];
          o(w, t, "delete" == t ? function(t) {
            return !(y && !f(t)) && n.call(this, 0 === t ? 0 : t)
          } : "has" == t ? function(t) {
            return !(y && !f(t)) && n.call(this, 0 === t ? 0 : t)
          } : "get" == t ? function(t) {
            return y && !f(t) ? void 0 : n.call(this, 0 === t ? 0 : t)
          } : "add" == t ? function(t) {
            return n.call(this, 0 === t ? 0 : t), this
          } : function(t, e) {
            return n.call(this, 0 === t ? 0 : t, e), this
          })
        };
      if ("function" == typeof b && (y || w.forEach && !l((function() {
          (new b).entries().next()
        })))) {
        var x = new b,
          P = x[S](y ? {} : -0, 1) != x,
          O = l((function() {
            x.has(1)
          })),
          F = h((function(t) {
            new b(t)
          })),
          A = !y && l((function() {
            for (var t = new b, n = 5; n--;) t[S](n, n);
            return !t.has(-0)
          }));
        F || ((b = n((function(n, e) {
          s(n, b, t);
          var r = p(new m, n, b);
          return null != e && c(e, g, r[S], r), r
        }))).prototype = w, w.constructor = b), (O || A) && (M("delete"), M("has"), g && M("get")), (A || P) && M(S), y && w.clear && delete w.clear
      } else b = v.getConstructor(n, t, g, S), u(b.prototype, e), a.NEED = !0;
      return d(b, t), _[t] = b, i(i.G + i.W + i.F * (b != m), _), y || v.setStrong(b, t, g), b
    }
  }, function(t, n, e) {
    for (var r, i = e(1), o = e(14), u = e(31), a = u("typed_array"), c = u("view"), s = !(!i.ArrayBuffer || !i.DataView), f = s, l = 0, h = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); l < 9;)(r = i[h[l++]]) ? (o(r.prototype, a, !0), o(r.prototype, c, !0)) : f = !1;
    t.exports = {
      ABV: s,
      CONSTR: f,
      TYPED: a,
      VIEW: c
    }
  }, function(t, n, e) {
    var r = e(4),
      i = e(1).document,
      o = r(i) && r(i.createElement);
    t.exports = function(t) {
      return o ? i.createElement(t) : {}
    }
  }, function(t, n, e) {
    n.f = e(5)
  }, function(t, n, e) {
    var r = e(50)("keys"),
      i = e(31);
    t.exports = function(t) {
      return r[t] || (r[t] = i(t))
    }
  }, function(t, n) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
  }, function(t, n, e) {
    var r = e(1).document;
    t.exports = r && r.documentElement
  }, function(t, n, e) {
    var r = e(4),
      i = e(3),
      o = function(t, n) {
        if (i(t), !r(n) && null !== n) throw TypeError(n + ": can't set as prototype!")
      };
    t.exports = {
      set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, n, r) {
        try {
          (r = e(19)(Function.call, e(22).f(Object.prototype, "__proto__").set, 2))(t, []), n = !(t instanceof Array)
        } catch (t) {
          n = !0
        }
        return function(t, e) {
          return o(t, e), n ? t.__proto__ = e : r(t, e), t
        }
      }({}, !1) : void 0),
      check: o
    }
  }, function(t, n) {
    t.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
  }, function(t, n, e) {
    var r = e(4),
      i = e(67).set;
    t.exports = function(t, n, e) {
      var o, u = n.constructor;
      return u !== e && "function" == typeof u && (o = u.prototype) !== e.prototype && r(o) && i && i(t, o), t
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(21),
      i = e(26);
    t.exports = function(t) {
      var n = String(i(this)),
        e = "",
        o = r(t);
      if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
      for (; o > 0;
        (o >>>= 1) && (n += n)) 1 & o && (e += n);
      return e
    }
  }, function(t, n) {
    t.exports = Math.sign || function(t) {
      return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1
    }
  }, function(t, n) {
    var e = Math.expm1;
    t.exports = !e || e(10) > 22025.465794806718 || e(10) < 22025.465794806718 || -2e-17 != e(-2e-17) ? function(t) {
      return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Math.exp(t) - 1
    } : e
  }, function(t, n, e) {
    var r = e(21),
      i = e(26);
    t.exports = function(t) {
      return function(n, e) {
        var o, u, a = String(i(n)),
          c = r(e),
          s = a.length;
        return c < 0 || c >= s ? t ? "" : void 0 : (o = a.charCodeAt(c)) < 55296 || o > 56319 || c + 1 === s || (u = a.charCodeAt(c + 1)) < 56320 || u > 57343 ? t ? a.charAt(c) : o : t ? a.slice(c, c + 2) : u - 56320 + (o - 55296 << 10) + 65536
      }
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(32),
      i = e(0),
      o = e(11),
      u = e(14),
      a = e(42),
      c = e(110),
      s = e(40),
      f = e(37),
      l = e(5)("iterator"),
      h = !([].keys && "next" in [].keys()),
      d = function() {
        return this
      };
    t.exports = function(t, n, e, p, v, g, y) {
      c(e, n, p);
      var m, b, S, w = function(t) {
          if (!h && t in P) return P[t];
          switch (t) {
            case "keys":
            case "values":
              return function() {
                return new e(this, t)
              }
          }
          return function() {
            return new e(this, t)
          }
        },
        _ = n + " Iterator",
        M = "values" == v,
        x = !1,
        P = t.prototype,
        O = P[l] || P["@@iterator"] || v && P[v],
        F = O || w(v),
        A = v ? M ? w("entries") : F : void 0,
        E = "Array" == n && P.entries || O;
      if (E && (S = f(E.call(new t))) !== Object.prototype && S.next && (s(S, _, !0), r || "function" == typeof S[l] || u(S, l, d)), M && O && "values" !== O.name && (x = !0, F = function() {
          return O.call(this)
        }), r && !y || !h && !x && P[l] || u(P, l, F), a[n] = F, a[_] = d, v)
        if (m = {
            values: M ? F : w("values"),
            keys: g ? F : w("keys"),
            entries: A
          }, y)
          for (b in m) b in P || o(P, b, m[b]);
        else i(i.P + i.F * (h || x), n, m);
      return m
    }
  }, function(t, n, e) {
    var r = e(76),
      i = e(26);
    t.exports = function(t, n, e) {
      if (r(n)) throw TypeError("String#" + e + " doesn't accept regex!");
      return String(i(t))
    }
  }, function(t, n, e) {
    var r = e(4),
      i = e(25),
      o = e(5)("match");
    t.exports = function(t) {
      var n;
      return r(t) && (void 0 !== (n = t[o]) ? !!n : "RegExp" == i(t))
    }
  }, function(t, n, e) {
    var r = e(5)("match");
    t.exports = function(t) {
      var n = /./;
      try {
        "/./" [t](n)
      } catch (e) {
        try {
          return n[r] = !1, !"/./" [t](n)
        } catch (t) {}
      }
      return !0
    }
  }, function(t, n, e) {
    var r = e(42),
      i = e(5)("iterator"),
      o = Array.prototype;
    t.exports = function(t) {
      return void 0 !== t && (r.Array === t || o[i] === t)
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(9),
      i = e(30);
    t.exports = function(t, n, e) {
      n in t ? r.f(t, n, i(0, e)) : t[n] = e
    }
  }, function(t, n, e) {
    var r = e(48),
      i = e(5)("iterator"),
      o = e(42);
    t.exports = e(7).getIteratorMethod = function(t) {
      if (null != t) return t[i] || t["@@iterator"] || o[r(t)]
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(10),
      i = e(34),
      o = e(6);
    t.exports = function(t) {
      for (var n = r(this), e = o(n.length), u = arguments.length, a = i(u > 1 ? arguments[1] : void 0, e), c = u > 2 ? arguments[2] : void 0, s = void 0 === c ? e : i(c, e); s > a;) n[a++] = t;
      return n
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(38),
      i = e(115),
      o = e(42),
      u = e(15);
    t.exports = e(74)(Array, "Array", (function(t, n) {
      this._t = u(t), this._i = 0, this._k = n
    }), (function() {
      var t = this._t,
        n = this._k,
        e = this._i++;
      return !t || e >= t.length ? (this._t = void 0, i(1)) : i(0, "keys" == n ? e : "values" == n ? t[e] : [e, t[e]])
    }), "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries")
  }, function(t, n, e) {
    "use strict";
    var r, i, o = e(55),
      u = RegExp.prototype.exec,
      a = String.prototype.replace,
      c = u,
      s = (r = /a/, i = /b*/g, u.call(r, "a"), u.call(i, "a"), 0 !== r.lastIndex || 0 !== i.lastIndex),
      f = void 0 !== /()??/.exec("")[1];
    (s || f) && (c = function(t) {
      var n, e, r, i, c = this;
      return f && (e = new RegExp("^" + c.source + "$(?!\\s)", o.call(c))), s && (n = c.lastIndex), r = u.call(c, t), s && r && (c.lastIndex = c.global ? r.index + r[0].length : n), f && r && r.length > 1 && a.call(r[0], e, (function() {
        for (i = 1; i < arguments.length - 2; i++) void 0 === arguments[i] && (r[i] = void 0)
      })), r
    }), t.exports = c
  }, function(t, n, e) {
    "use strict";
    var r = e(73)(!0);
    t.exports = function(t, n, e) {
      return n + (e ? r(t, n).length : 1)
    }
  }, function(t, n, e) {
    var r, i, o, u = e(19),
      a = e(104),
      c = e(66),
      s = e(62),
      f = e(1),
      l = f.process,
      h = f.setImmediate,
      d = f.clearImmediate,
      p = f.MessageChannel,
      v = f.Dispatch,
      g = 0,
      y = {},
      m = function() {
        var t = +this;
        if (y.hasOwnProperty(t)) {
          var n = y[t];
          delete y[t], n()
        }
      },
      b = function(t) {
        m.call(t.data)
      };
    h && d || (h = function(t) {
      for (var n = [], e = 1; arguments.length > e;) n.push(arguments[e++]);
      return y[++g] = function() {
        a("function" == typeof t ? t : Function(t), n)
      }, r(g), g
    }, d = function(t) {
      delete y[t]
    }, "process" == e(25)(l) ? r = function(t) {
      l.nextTick(u(m, t, 1))
    } : v && v.now ? r = function(t) {
      v.now(u(m, t, 1))
    } : p ? (o = (i = new p).port2, i.port1.onmessage = b, r = u(o.postMessage, o, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (r = function(t) {
      f.postMessage(t + "", "*")
    }, f.addEventListener("message", b, !1)) : r = "onreadystatechange" in s("script") ? function(t) {
      c.appendChild(s("script")).onreadystatechange = function() {
        c.removeChild(this), m.call(t)
      }
    } : function(t) {
      setTimeout(u(m, t, 1), 0)
    }), t.exports = {
      set: h,
      clear: d
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(1),
      i = e(8),
      o = e(32),
      u = e(61),
      a = e(14),
      c = e(45),
      s = e(2),
      f = e(44),
      l = e(21),
      h = e(6),
      d = e(123),
      p = e(36).f,
      v = e(9).f,
      g = e(81),
      y = e(40),
      m = "prototype",
      b = "Wrong index!",
      S = r.ArrayBuffer,
      w = r.DataView,
      _ = r.Math,
      M = r.RangeError,
      x = r.Infinity,
      P = S,
      O = _.abs,
      F = _.pow,
      A = _.floor,
      E = _.log,
      N = _.LN2,
      R = i ? "_b" : "buffer",
      k = i ? "_l" : "byteLength",
      T = i ? "_o" : "byteOffset";

    function I(t, n, e) {
      var r, i, o, u = new Array(e),
        a = 8 * e - n - 1,
        c = (1 << a) - 1,
        s = c >> 1,
        f = 23 === n ? F(2, -24) - F(2, -77) : 0,
        l = 0,
        h = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
      for ((t = O(t)) != t || t === x ? (i = t != t ? 1 : 0, r = c) : (r = A(E(t) / N), t * (o = F(2, -r)) < 1 && (r--, o *= 2), (t += r + s >= 1 ? f / o : f * F(2, 1 - s)) * o >= 2 && (r++, o /= 2), r + s >= c ? (i = 0, r = c) : r + s >= 1 ? (i = (t * o - 1) * F(2, n), r += s) : (i = t * F(2, s - 1) * F(2, n), r = 0)); n >= 8; u[l++] = 255 & i, i /= 256, n -= 8);
      for (r = r << n | i, a += n; a > 0; u[l++] = 255 & r, r /= 256, a -= 8);
      return u[--l] |= 128 * h, u
    }

    function j(t, n, e) {
      var r, i = 8 * e - n - 1,
        o = (1 << i) - 1,
        u = o >> 1,
        a = i - 7,
        c = e - 1,
        s = t[c--],
        f = 127 & s;
      for (s >>= 7; a > 0; f = 256 * f + t[c], c--, a -= 8);
      for (r = f & (1 << -a) - 1, f >>= -a, a += n; a > 0; r = 256 * r + t[c], c--, a -= 8);
      if (0 === f) f = 1 - u;
      else {
        if (f === o) return r ? NaN : s ? -x : x;
        r += F(2, n), f -= u
      }
      return (s ? -1 : 1) * r * F(2, f - n)
    }

    function L(t) {
      return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]
    }

    function B(t) {
      return [255 & t]
    }

    function C(t) {
      return [255 & t, t >> 8 & 255]
    }

    function W(t) {
      return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255]
    }

    function V(t) {
      return I(t, 52, 8)
    }

    function G(t) {
      return I(t, 23, 4)
    }

    function D(t, n, e) {
      v(t[m], n, {
        get: function() {
          return this[e]
        }
      })
    }

    function U(t, n, e, r) {
      var i = d(+e);
      if (i + n > t[k]) throw M(b);
      var o = t[R]._b,
        u = i + t[T],
        a = o.slice(u, u + n);
      return r ? a : a.reverse()
    }

    function z(t, n, e, r, i, o) {
      var u = d(+e);
      if (u + n > t[k]) throw M(b);
      for (var a = t[R]._b, c = u + t[T], s = r(+i), f = 0; f < n; f++) a[c + f] = s[o ? f : n - f - 1]
    }
    if (u.ABV) {
      if (!s((function() {
          S(1)
        })) || !s((function() {
          new S(-1)
        })) || s((function() {
          return new S, new S(1.5), new S(NaN), "ArrayBuffer" != S.name
        }))) {
        for (var q, K = (S = function(t) {
            return f(this, S), new P(d(t))
          })[m] = P[m], Y = p(P), Q = 0; Y.length > Q;)(q = Y[Q++]) in S || a(S, q, P[q]);
        o || (K.constructor = S)
      }
      var H = new w(new S(2)),
        J = w[m].setInt8;
      H.setInt8(0, 2147483648), H.setInt8(1, 2147483649), !H.getInt8(0) && H.getInt8(1) || c(w[m], {
        setInt8: function(t, n) {
          J.call(this, t, n << 24 >> 24)
        },
        setUint8: function(t, n) {
          J.call(this, t, n << 24 >> 24)
        }
      }, !0)
    } else S = function(t) {
      f(this, S, "ArrayBuffer");
      var n = d(t);
      this._b = g.call(new Array(n), 0), this[k] = n
    }, w = function(t, n, e) {
      f(this, w, "DataView"), f(t, S, "DataView");
      var r = t[k],
        i = l(n);
      if (i < 0 || i > r) throw M("Wrong offset!");
      if (i + (e = void 0 === e ? r - i : h(e)) > r) throw M("Wrong length!");
      this[R] = t, this[T] = i, this[k] = e
    }, i && (D(S, "byteLength", "_l"), D(w, "buffer", "_b"), D(w, "byteLength", "_l"), D(w, "byteOffset", "_o")), c(w[m], {
      getInt8: function(t) {
        return U(this, 1, t)[0] << 24 >> 24
      },
      getUint8: function(t) {
        return U(this, 1, t)[0]
      },
      getInt16: function(t) {
        var n = U(this, 2, t, arguments[1]);
        return (n[1] << 8 | n[0]) << 16 >> 16
      },
      getUint16: function(t) {
        var n = U(this, 2, t, arguments[1]);
        return n[1] << 8 | n[0]
      },
      getInt32: function(t) {
        return L(U(this, 4, t, arguments[1]))
      },
      getUint32: function(t) {
        return L(U(this, 4, t, arguments[1])) >>> 0
      },
      getFloat32: function(t) {
        return j(U(this, 4, t, arguments[1]), 23, 4)
      },
      getFloat64: function(t) {
        return j(U(this, 8, t, arguments[1]), 52, 8)
      },
      setInt8: function(t, n) {
        z(this, 1, t, B, n)
      },
      setUint8: function(t, n) {
        z(this, 1, t, B, n)
      },
      setInt16: function(t, n) {
        z(this, 2, t, C, n, arguments[2])
      },
      setUint16: function(t, n) {
        z(this, 2, t, C, n, arguments[2])
      },
      setInt32: function(t, n) {
        z(this, 4, t, W, n, arguments[2])
      },
      setUint32: function(t, n) {
        z(this, 4, t, W, n, arguments[2])
      },
      setFloat32: function(t, n) {
        z(this, 4, t, G, n, arguments[2])
      },
      setFloat64: function(t, n) {
        z(this, 8, t, V, n, arguments[2])
      }
    });
    y(S, "ArrayBuffer"), y(w, "DataView"), a(w[m], u.VIEW, !0), n.ArrayBuffer = S, n.DataView = w
  }, function(t, n) {
    var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = e)
  }, function(t, n) {
    t.exports = function(t) {
      return "object" == typeof t ? null !== t : "function" == typeof t
    }
  }, function(t, n, e) {
    t.exports = !e(128)((function() {
      return 7 != Object.defineProperty({}, "a", {
        get: function() {
          return 7
        }
      }).a
    }))
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r, i = (r = e(91)) && r.__esModule ? r : {
        default: r
      },
      o = e(18);

    function u(t, n) {
      for (var e = 0; e < n.length; e++) {
        var r = n[e];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var a = function() {
      function t() {}
      var n, e, r;
      return t.getParser = function(t, n) {
        if (void 0 === n && (n = !1), "string" != typeof t) throw new Error("UserAgent should be a string");
        return new i.default(t, n)
      }, t.parse = function(t) {
        return new i.default(t).getResult()
      }, n = t, r = [{
        key: "BROWSER_MAP",
        get: function() {
          return o.BROWSER_MAP
        }
      }, {
        key: "ENGINE_MAP",
        get: function() {
          return o.ENGINE_MAP
        }
      }, {
        key: "OS_MAP",
        get: function() {
          return o.OS_MAP
        }
      }, {
        key: "PLATFORMS_MAP",
        get: function() {
          return o.PLATFORMS_MAP
        }
      }], (e = null) && u(n.prototype, e), r && u(n, r), t
    }();
    n.default = a, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r = c(e(92)),
      i = c(e(93)),
      o = c(e(94)),
      u = c(e(95)),
      a = c(e(17));

    function c(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }
    var s = function() {
      function t(t, n) {
        if (void 0 === n && (n = !1), null == t || "" === t) throw new Error("UserAgent parameter can't be empty");
        this._ua = t, this.parsedResult = {}, !0 !== n && this.parse()
      }
      var n = t.prototype;
      return n.getUA = function() {
        return this._ua
      }, n.test = function(t) {
        return t.test(this._ua)
      }, n.parseBrowser = function() {
        var t = this;
        this.parsedResult.browser = {};
        var n = a.default.find(r.default, (function(n) {
          if ("function" == typeof n.test) return n.test(t);
          if (n.test instanceof Array) return n.test.some((function(n) {
            return t.test(n)
          }));
          throw new Error("Browser's test function is not valid")
        }));
        return n && (this.parsedResult.browser = n.describe(this.getUA())), this.parsedResult.browser
      }, n.getBrowser = function() {
        return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
      }, n.getBrowserName = function(t) {
        return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
      }, n.getBrowserVersion = function() {
        return this.getBrowser().version
      }, n.getOS = function() {
        return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
      }, n.parseOS = function() {
        var t = this;
        this.parsedResult.os = {};
        var n = a.default.find(i.default, (function(n) {
          if ("function" == typeof n.test) return n.test(t);
          if (n.test instanceof Array) return n.test.some((function(n) {
            return t.test(n)
          }));
          throw new Error("Browser's test function is not valid")
        }));
        return n && (this.parsedResult.os = n.describe(this.getUA())), this.parsedResult.os
      }, n.getOSName = function(t) {
        var n = this.getOS().name;
        return t ? String(n).toLowerCase() || "" : n || ""
      }, n.getOSVersion = function() {
        return this.getOS().version
      }, n.getPlatform = function() {
        return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
      }, n.getPlatformType = function(t) {
        void 0 === t && (t = !1);
        var n = this.getPlatform().type;
        return t ? String(n).toLowerCase() || "" : n || ""
      }, n.parsePlatform = function() {
        var t = this;
        this.parsedResult.platform = {};
        var n = a.default.find(o.default, (function(n) {
          if ("function" == typeof n.test) return n.test(t);
          if (n.test instanceof Array) return n.test.some((function(n) {
            return t.test(n)
          }));
          throw new Error("Browser's test function is not valid")
        }));
        return n && (this.parsedResult.platform = n.describe(this.getUA())), this.parsedResult.platform
      }, n.getEngine = function() {
        return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
      }, n.getEngineName = function(t) {
        return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
      }, n.parseEngine = function() {
        var t = this;
        this.parsedResult.engine = {};
        var n = a.default.find(u.default, (function(n) {
          if ("function" == typeof n.test) return n.test(t);
          if (n.test instanceof Array) return n.test.some((function(n) {
            return t.test(n)
          }));
          throw new Error("Browser's test function is not valid")
        }));
        return n && (this.parsedResult.engine = n.describe(this.getUA())), this.parsedResult.engine
      }, n.parse = function() {
        return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
      }, n.getResult = function() {
        return a.default.assign({}, this.parsedResult)
      }, n.satisfies = function(t) {
        var n = this,
          e = {},
          r = 0,
          i = {},
          o = 0;
        if (Object.keys(t).forEach((function(n) {
            var u = t[n];
            "string" == typeof u ? (i[n] = u, o += 1) : "object" == typeof u && (e[n] = u, r += 1)
          })), r > 0) {
          var u = Object.keys(e),
            c = a.default.find(u, (function(t) {
              return n.isOS(t)
            }));
          if (c) {
            var s = this.satisfies(e[c]);
            if (void 0 !== s) return s
          }
          var f = a.default.find(u, (function(t) {
            return n.isPlatform(t)
          }));
          if (f) {
            var l = this.satisfies(e[f]);
            if (void 0 !== l) return l
          }
        }
        if (o > 0) {
          var h = Object.keys(i),
            d = a.default.find(h, (function(t) {
              return n.isBrowser(t, !0)
            }));
          if (void 0 !== d) return this.compareVersion(i[d])
        }
      }, n.isBrowser = function(t, n) {
        void 0 === n && (n = !1);
        var e = this.getBrowserName().toLowerCase(),
          r = t.toLowerCase(),
          i = a.default.getBrowserTypeByAlias(r);
        return n && i && (r = i.toLowerCase()), r === e
      }, n.compareVersion = function(t) {
        var n = [0],
          e = t,
          r = !1,
          i = this.getBrowserVersion();
        if ("string" == typeof i) return ">" === t[0] || "<" === t[0] ? (e = t.substr(1), "=" === t[1] ? (r = !0, e = t.substr(2)) : n = [], ">" === t[0] ? n.push(1) : n.push(-1)) : "=" === t[0] ? e = t.substr(1) : "~" === t[0] && (r = !0, e = t.substr(1)), n.indexOf(a.default.compareVersions(i, e, r)) > -1
      }, n.isOS = function(t) {
        return this.getOSName(!0) === String(t).toLowerCase()
      }, n.isPlatform = function(t) {
        return this.getPlatformType(!0) === String(t).toLowerCase()
      }, n.isEngine = function(t) {
        return this.getEngineName(!0) === String(t).toLowerCase()
      }, n.is = function(t, n) {
        return void 0 === n && (n = !1), this.isBrowser(t, n) || this.isOS(t) || this.isPlatform(t)
      }, n.some = function(t) {
        var n = this;
        return void 0 === t && (t = []), t.some((function(t) {
          return n.is(t)
        }))
      }, t
    }();
    n.default = s, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r, i = (r = e(17)) && r.__esModule ? r : {
      default: r
    };
    var o = /version\/(\d+(\.?_?\d+)+)/i,
      u = [{
        test: [/googlebot/i],
        describe: function(t) {
          var n = {
              name: "Googlebot"
            },
            e = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/opera/i],
        describe: function(t) {
          var n = {
              name: "Opera"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/opr\/|opios/i],
        describe: function(t) {
          var n = {
              name: "Opera"
            },
            e = i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/SamsungBrowser/i],
        describe: function(t) {
          var n = {
              name: "Samsung Internet for Android"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/Whale/i],
        describe: function(t) {
          var n = {
              name: "NAVER Whale Browser"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/MZBrowser/i],
        describe: function(t) {
          var n = {
              name: "MZ Browser"
            },
            e = i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/focus/i],
        describe: function(t) {
          var n = {
              name: "Focus"
            },
            e = i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/swing/i],
        describe: function(t) {
          var n = {
              name: "Swing"
            },
            e = i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/coast/i],
        describe: function(t) {
          var n = {
              name: "Opera Coast"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/opt\/\d+(?:.?_?\d+)+/i],
        describe: function(t) {
          var n = {
              name: "Opera Touch"
            },
            e = i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/yabrowser/i],
        describe: function(t) {
          var n = {
              name: "Yandex Browser"
            },
            e = i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/ucbrowser/i],
        describe: function(t) {
          var n = {
              name: "UC Browser"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/Maxthon|mxios/i],
        describe: function(t) {
          var n = {
              name: "Maxthon"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/epiphany/i],
        describe: function(t) {
          var n = {
              name: "Epiphany"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/puffin/i],
        describe: function(t) {
          var n = {
              name: "Puffin"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/sleipnir/i],
        describe: function(t) {
          var n = {
              name: "Sleipnir"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/k-meleon/i],
        describe: function(t) {
          var n = {
              name: "K-Meleon"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/micromessenger/i],
        describe: function(t) {
          var n = {
              name: "WeChat"
            },
            e = i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/qqbrowser/i],
        describe: function(t) {
          var n = {
              name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
            },
            e = i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/msie|trident/i],
        describe: function(t) {
          var n = {
              name: "Internet Explorer"
            },
            e = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/\sedg\//i],
        describe: function(t) {
          var n = {
              name: "Microsoft Edge"
            },
            e = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/edg([ea]|ios)/i],
        describe: function(t) {
          var n = {
              name: "Microsoft Edge"
            },
            e = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/vivaldi/i],
        describe: function(t) {
          var n = {
              name: "Vivaldi"
            },
            e = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/seamonkey/i],
        describe: function(t) {
          var n = {
              name: "SeaMonkey"
            },
            e = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/sailfish/i],
        describe: function(t) {
          var n = {
              name: "Sailfish"
            },
            e = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/silk/i],
        describe: function(t) {
          var n = {
              name: "Amazon Silk"
            },
            e = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/phantom/i],
        describe: function(t) {
          var n = {
              name: "PhantomJS"
            },
            e = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/slimerjs/i],
        describe: function(t) {
          var n = {
              name: "SlimerJS"
            },
            e = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
        describe: function(t) {
          var n = {
              name: "BlackBerry"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/(web|hpw)[o0]s/i],
        describe: function(t) {
          var n = {
              name: "WebOS Browser"
            },
            e = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/bada/i],
        describe: function(t) {
          var n = {
              name: "Bada"
            },
            e = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/tizen/i],
        describe: function(t) {
          var n = {
              name: "Tizen"
            },
            e = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/qupzilla/i],
        describe: function(t) {
          var n = {
              name: "QupZilla"
            },
            e = i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/firefox|iceweasel|fxios/i],
        describe: function(t) {
          var n = {
              name: "Firefox"
            },
            e = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/electron/i],
        describe: function(t) {
          var n = {
              name: "Electron"
            },
            e = i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/MiuiBrowser/i],
        describe: function(t) {
          var n = {
              name: "Miui"
            },
            e = i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/chromium/i],
        describe: function(t) {
          var n = {
              name: "Chromium"
            },
            e = i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/chrome|crios|crmo/i],
        describe: function(t) {
          var n = {
              name: "Chrome"
            },
            e = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/GSA/i],
        describe: function(t) {
          var n = {
              name: "Google Search"
            },
            e = i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
          return e && (n.version = e), n
        }
      }, {
        test: function(t) {
          var n = !t.test(/like android/i),
            e = t.test(/android/i);
          return n && e
        },
        describe: function(t) {
          var n = {
              name: "Android Browser"
            },
            e = i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/playstation 4/i],
        describe: function(t) {
          var n = {
              name: "PlayStation 4"
            },
            e = i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/safari|applewebkit/i],
        describe: function(t) {
          var n = {
              name: "Safari"
            },
            e = i.default.getFirstMatch(o, t);
          return e && (n.version = e), n
        }
      }, {
        test: [/.*/i],
        describe: function(t) {
          var n = -1 !== t.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
          return {
            name: i.default.getFirstMatch(n, t),
            version: i.default.getSecondMatch(n, t)
          }
        }
      }];
    n.default = u, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r, i = (r = e(17)) && r.__esModule ? r : {
        default: r
      },
      o = e(18);
    var u = [{
      test: [/Roku\/DVP/],
      describe: function(t) {
        var n = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
        return {
          name: o.OS_MAP.Roku,
          version: n
        }
      }
    }, {
      test: [/windows phone/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t);
        return {
          name: o.OS_MAP.WindowsPhone,
          version: n
        }
      }
    }, {
      test: [/windows /i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t),
          e = i.default.getWindowsVersionName(n);
        return {
          name: o.OS_MAP.Windows,
          version: n,
          versionName: e
        }
      }
    }, {
      test: [/Macintosh(.*?) FxiOS(.*?)\//],
      describe: function(t) {
        var n = {
            name: o.OS_MAP.iOS
          },
          e = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
        return e && (n.version = e), n
      }
    }, {
      test: [/macintosh/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."),
          e = i.default.getMacOSVersionName(n),
          r = {
            name: o.OS_MAP.MacOS,
            version: n
          };
        return e && (r.versionName = e), r
      }
    }, {
      test: [/(ipod|iphone|ipad)/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".");
        return {
          name: o.OS_MAP.iOS,
          version: n
        }
      }
    }, {
      test: function(t) {
        var n = !t.test(/like android/i),
          e = t.test(/android/i);
        return n && e
      },
      describe: function(t) {
        var n = i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, t),
          e = i.default.getAndroidVersionName(n),
          r = {
            name: o.OS_MAP.Android,
            version: n
          };
        return e && (r.versionName = e), r
      }
    }, {
      test: [/(web|hpw)[o0]s/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t),
          e = {
            name: o.OS_MAP.WebOS
          };
        return n && n.length && (e.version = n), e
      }
    }, {
      test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || i.default.getFirstMatch(/\bbb(\d+)/i, t);
        return {
          name: o.OS_MAP.BlackBerry,
          version: n
        }
      }
    }, {
      test: [/bada/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
        return {
          name: o.OS_MAP.Bada,
          version: n
        }
      }
    }, {
      test: [/tizen/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
        return {
          name: o.OS_MAP.Tizen,
          version: n
        }
      }
    }, {
      test: [/linux/i],
      describe: function() {
        return {
          name: o.OS_MAP.Linux
        }
      }
    }, {
      test: [/CrOS/],
      describe: function() {
        return {
          name: o.OS_MAP.ChromeOS
        }
      }
    }, {
      test: [/PlayStation 4/],
      describe: function(t) {
        var n = i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
        return {
          name: o.OS_MAP.PlayStation4,
          version: n
        }
      }
    }];
    n.default = u, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r, i = (r = e(17)) && r.__esModule ? r : {
        default: r
      },
      o = e(18);
    var u = [{
      test: [/googlebot/i],
      describe: function() {
        return {
          type: "bot",
          vendor: "Google"
        }
      }
    }, {
      test: [/huawei/i],
      describe: function(t) {
        var n = i.default.getFirstMatch(/(can-l01)/i, t) && "Nova",
          e = {
            type: o.PLATFORMS_MAP.mobile,
            vendor: "Huawei"
          };
        return n && (e.model = n), e
      }
    }, {
      test: [/nexus\s*(?:7|8|9|10).*/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet,
          vendor: "Nexus"
        }
      }
    }, {
      test: [/ipad/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet,
          vendor: "Apple",
          model: "iPad"
        }
      }
    }, {
      test: [/Macintosh(.*?) FxiOS(.*?)\//],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet,
          vendor: "Apple",
          model: "iPad"
        }
      }
    }, {
      test: [/kftt build/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet,
          vendor: "Amazon",
          model: "Kindle Fire HD 7"
        }
      }
    }, {
      test: [/silk/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet,
          vendor: "Amazon"
        }
      }
    }, {
      test: [/tablet(?! pc)/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet
        }
      }
    }, {
      test: function(t) {
        var n = t.test(/ipod|iphone/i),
          e = t.test(/like (ipod|iphone)/i);
        return n && !e
      },
      describe: function(t) {
        var n = i.default.getFirstMatch(/(ipod|iphone)/i, t);
        return {
          type: o.PLATFORMS_MAP.mobile,
          vendor: "Apple",
          model: n
        }
      }
    }, {
      test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile,
          vendor: "Nexus"
        }
      }
    }, {
      test: [/[^-]mobi/i],
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile
        }
      }
    }, {
      test: function(t) {
        return "blackberry" === t.getBrowserName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile,
          vendor: "BlackBerry"
        }
      }
    }, {
      test: function(t) {
        return "bada" === t.getBrowserName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile
        }
      }
    }, {
      test: function(t) {
        return "windows phone" === t.getBrowserName()
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile,
          vendor: "Microsoft"
        }
      }
    }, {
      test: function(t) {
        var n = Number(String(t.getOSVersion()).split(".")[0]);
        return "android" === t.getOSName(!0) && n >= 3
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tablet
        }
      }
    }, {
      test: function(t) {
        return "android" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.mobile
        }
      }
    }, {
      test: function(t) {
        return "macos" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.desktop,
          vendor: "Apple"
        }
      }
    }, {
      test: function(t) {
        return "windows" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.desktop
        }
      }
    }, {
      test: function(t) {
        return "linux" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.desktop
        }
      }
    }, {
      test: function(t) {
        return "playstation 4" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tv
        }
      }
    }, {
      test: function(t) {
        return "roku" === t.getOSName(!0)
      },
      describe: function() {
        return {
          type: o.PLATFORMS_MAP.tv
        }
      }
    }];
    n.default = u, t.exports = n.default
  }, function(t, n, e) {
    "use strict";
    n.__esModule = !0, n.default = void 0;
    var r, i = (r = e(17)) && r.__esModule ? r : {
        default: r
      },
      o = e(18);
    var u = [{
      test: function(t) {
        return "microsoft edge" === t.getBrowserName(!0)
      },
      describe: function(t) {
        if (/\sedg\//i.test(t)) return {
          name: o.ENGINE_MAP.Blink
        };
        var n = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
        return {
          name: o.ENGINE_MAP.EdgeHTML,
          version: n
        }
      }
    }, {
      test: [/trident/i],
      describe: function(t) {
        var n = {
            name: o.ENGINE_MAP.Trident
          },
          e = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
        return e && (n.version = e), n
      }
    }, {
      test: function(t) {
        return t.test(/presto/i)
      },
      describe: function(t) {
        var n = {
            name: o.ENGINE_MAP.Presto
          },
          e = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
        return e && (n.version = e), n
      }
    }, {
      test: function(t) {
        var n = t.test(/gecko/i),
          e = t.test(/like gecko/i);
        return n && !e
      },
      describe: function(t) {
        var n = {
            name: o.ENGINE_MAP.Gecko
          },
          e = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
        return e && (n.version = e), n
      }
    }, {
      test: [/(apple)?webkit\/537\.36/i],
      describe: function() {
        return {
          name: o.ENGINE_MAP.Blink
        }
      }
    }, {
      test: [/(apple)?webkit/i],
      describe: function(t) {
        var n = {
            name: o.ENGINE_MAP.WebKit
          },
          e = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
        return e && (n.version = e), n
      }
    }];
    n.default = u, t.exports = n.default
  }, function(t, n, e) {
    t.exports = !e(8) && !e(2)((function() {
      return 7 != Object.defineProperty(e(62)("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    }))
  }, function(t, n, e) {
    var r = e(1),
      i = e(7),
      o = e(32),
      u = e(63),
      a = e(9).f;
    t.exports = function(t) {
      var n = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
      "_" == t.charAt(0) || t in n || a(n, t, {
        value: u.f(t)
      })
    }
  }, function(t, n, e) {
    var r = e(13),
      i = e(15),
      o = e(51)(!1),
      u = e(64)("IE_PROTO");
    t.exports = function(t, n) {
      var e, a = i(t),
        c = 0,
        s = [];
      for (e in a) e != u && r(a, e) && s.push(e);
      for (; n.length > c;) r(a, e = n[c++]) && (~o(s, e) || s.push(e));
      return s
    }
  }, function(t, n, e) {
    var r = e(9),
      i = e(3),
      o = e(33);
    t.exports = e(8) ? Object.defineProperties : function(t, n) {
      i(t);
      for (var e, u = o(n), a = u.length, c = 0; a > c;) r.f(t, e = u[c++], n[e]);
      return t
    }
  }, function(t, n, e) {
    var r = e(15),
      i = e(36).f,
      o = {}.toString,
      u = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    t.exports.f = function(t) {
      return u && "[object Window]" == o.call(t) ? function(t) {
        try {
          return i(t)
        } catch (t) {
          return u.slice()
        }
      }(t) : i(r(t))
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(8),
      i = e(33),
      o = e(52),
      u = e(47),
      a = e(10),
      c = e(46),
      s = Object.assign;
    t.exports = !s || e(2)((function() {
      var t = {},
        n = {},
        e = Symbol(),
        r = "abcdefghijklmnopqrst";
      return t[e] = 7, r.split("").forEach((function(t) {
        n[t] = t
      })), 7 != s({}, t)[e] || Object.keys(s({}, n)).join("") != r
    })) ? function(t, n) {
      for (var e = a(t), s = arguments.length, f = 1, l = o.f, h = u.f; s > f;)
        for (var d, p = c(arguments[f++]), v = l ? i(p).concat(l(p)) : i(p), g = v.length, y = 0; g > y;) d = v[y++], r && !h.call(p, d) || (e[d] = p[d]);
      return e
    } : s
  }, function(t, n) {
    t.exports = Object.is || function(t, n) {
      return t === n ? 0 !== t || 1 / t == 1 / n : t != t && n != n
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(20),
      i = e(4),
      o = e(104),
      u = [].slice,
      a = {},
      c = function(t, n, e) {
        if (!(n in a)) {
          for (var r = [], i = 0; i < n; i++) r[i] = "a[" + i + "]";
          a[n] = Function("F,a", "return new F(" + r.join(",") + ")")
        }
        return a[n](t, e)
      };
    t.exports = Function.bind || function(t) {
      var n = r(this),
        e = u.call(arguments, 1),
        a = function() {
          var r = e.concat(u.call(arguments));
          return this instanceof a ? c(n, r.length, r) : o(n, r, t)
        };
      return i(n.prototype) && (a.prototype = n.prototype), a
    }
  }, function(t, n) {
    t.exports = function(t, n, e) {
      var r = void 0 === e;
      switch (n.length) {
        case 0:
          return r ? t() : t.call(e);
        case 1:
          return r ? t(n[0]) : t.call(e, n[0]);
        case 2:
          return r ? t(n[0], n[1]) : t.call(e, n[0], n[1]);
        case 3:
          return r ? t(n[0], n[1], n[2]) : t.call(e, n[0], n[1], n[2]);
        case 4:
          return r ? t(n[0], n[1], n[2], n[3]) : t.call(e, n[0], n[1], n[2], n[3])
      }
      return t.apply(e, n)
    }
  }, function(t, n, e) {
    var r = e(1).parseInt,
      i = e(41).trim,
      o = e(68),
      u = /^[-+]?0[xX]/;
    t.exports = 8 !== r(o + "08") || 22 !== r(o + "0x16") ? function(t, n) {
      var e = i(String(t), 3);
      return r(e, n >>> 0 || (u.test(e) ? 16 : 10))
    } : r
  }, function(t, n, e) {
    var r = e(1).parseFloat,
      i = e(41).trim;
    t.exports = 1 / r(e(68) + "-0") != -1 / 0 ? function(t) {
      var n = i(String(t), 3),
        e = r(n);
      return 0 === e && "-" == n.charAt(0) ? -0 : e
    } : r
  }, function(t, n, e) {
    var r = e(25);
    t.exports = function(t, n) {
      if ("number" != typeof t && "Number" != r(t)) throw TypeError(n);
      return +t
    }
  }, function(t, n, e) {
    var r = e(4),
      i = Math.floor;
    t.exports = function(t) {
      return !r(t) && isFinite(t) && i(t) === t
    }
  }, function(t, n) {
    t.exports = Math.log1p || function(t) {
      return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : Math.log(1 + t)
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(35),
      i = e(30),
      o = e(40),
      u = {};
    e(14)(u, e(5)("iterator"), (function() {
      return this
    })), t.exports = function(t, n, e) {
      t.prototype = r(u, {
        next: i(1, e)
      }), o(t, n + " Iterator")
    }
  }, function(t, n, e) {
    var r = e(3);
    t.exports = function(t, n, e, i) {
      try {
        return i ? n(r(e)[0], e[1]) : n(e)
      } catch (n) {
        var o = t.return;
        throw void 0 !== o && r(o.call(t)), n
      }
    }
  }, function(t, n, e) {
    var r = e(224);
    t.exports = function(t, n) {
      return new(r(t))(n)
    }
  }, function(t, n, e) {
    var r = e(20),
      i = e(10),
      o = e(46),
      u = e(6);
    t.exports = function(t, n, e, a, c) {
      r(n);
      var s = i(t),
        f = o(s),
        l = u(s.length),
        h = c ? l - 1 : 0,
        d = c ? -1 : 1;
      if (e < 2)
        for (;;) {
          if (h in f) {
            a = f[h], h += d;
            break
          }
          if (h += d, c ? h < 0 : l <= h) throw TypeError("Reduce of empty array with no initial value")
        }
      for (; c ? h >= 0 : l > h; h += d) h in f && (a = n(a, f[h], h, s));
      return a
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(10),
      i = e(34),
      o = e(6);
    t.exports = [].copyWithin || function(t, n) {
      var e = r(this),
        u = o(e.length),
        a = i(t, u),
        c = i(n, u),
        s = arguments.length > 2 ? arguments[2] : void 0,
        f = Math.min((void 0 === s ? u : i(s, u)) - c, u - a),
        l = 1;
      for (c < a && a < c + f && (l = -1, c += f - 1, a += f - 1); f-- > 0;) c in e ? e[a] = e[c] : delete e[a], a += l, c += l;
      return e
    }
  }, function(t, n) {
    t.exports = function(t, n) {
      return {
        value: n,
        done: !!t
      }
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(83);
    e(0)({
      target: "RegExp",
      proto: !0,
      forced: r !== /./.exec
    }, {
      exec: r
    })
  }, function(t, n, e) {
    e(8) && "g" != /./g.flags && e(9).f(RegExp.prototype, "flags", {
      configurable: !0,
      get: e(55)
    })
  }, function(t, n, e) {
    "use strict";
    var r, i, o, u, a = e(32),
      c = e(1),
      s = e(19),
      f = e(48),
      l = e(0),
      h = e(4),
      d = e(20),
      p = e(44),
      v = e(58),
      g = e(49),
      y = e(85).set,
      m = e(244)(),
      b = e(119),
      S = e(245),
      w = e(59),
      _ = e(120),
      M = c.TypeError,
      x = c.process,
      P = x && x.versions,
      O = P && P.v8 || "",
      F = c.Promise,
      A = "process" == f(x),
      E = function() {},
      N = i = b.f,
      R = !! function() {
        try {
          var t = F.resolve(1),
            n = (t.constructor = {})[e(5)("species")] = function(t) {
              t(E, E)
            };
          return (A || "function" == typeof PromiseRejectionEvent) && t.then(E) instanceof n && 0 !== O.indexOf("6.6") && -1 === w.indexOf("Chrome/66")
        } catch (t) {}
      }(),
      k = function(t) {
        var n;
        return !(!h(t) || "function" != typeof(n = t.then)) && n
      },
      T = function(t, n) {
        if (!t._n) {
          t._n = !0;
          var e = t._c;
          m((function() {
            for (var r = t._v, i = 1 == t._s, o = 0, u = function(n) {
                var e, o, u, a = i ? n.ok : n.fail,
                  c = n.resolve,
                  s = n.reject,
                  f = n.domain;
                try {
                  a ? (i || (2 == t._h && L(t), t._h = 1), !0 === a ? e = r : (f && f.enter(), e = a(r), f && (f.exit(), u = !0)), e === n.promise ? s(M("Promise-chain cycle")) : (o = k(e)) ? o.call(e, c, s) : c(e)) : s(r)
                } catch (t) {
                  f && !u && f.exit(), s(t)
                }
              }; e.length > o;) u(e[o++]);
            t._c = [], t._n = !1, n && !t._h && I(t)
          }))
        }
      },
      I = function(t) {
        y.call(c, (function() {
          var n, e, r, i = t._v,
            o = j(t);
          if (o && (n = S((function() {
              A ? x.emit("unhandledRejection", i, t) : (e = c.onunhandledrejection) ? e({
                promise: t,
                reason: i
              }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", i)
            })), t._h = A || j(t) ? 2 : 1), t._a = void 0, o && n.e) throw n.v
        }))
      },
      j = function(t) {
        return 1 !== t._h && 0 === (t._a || t._c).length
      },
      L = function(t) {
        y.call(c, (function() {
          var n;
          A ? x.emit("rejectionHandled", t) : (n = c.onrejectionhandled) && n({
            promise: t,
            reason: t._v
          })
        }))
      },
      B = function(t) {
        var n = this;
        n._d || (n._d = !0, (n = n._w || n)._v = t, n._s = 2, n._a || (n._a = n._c.slice()), T(n, !0))
      },
      C = function(t) {
        var n, e = this;
        if (!e._d) {
          e._d = !0, e = e._w || e;
          try {
            if (e === t) throw M("Promise can't be resolved itself");
            (n = k(t)) ? m((function() {
              var r = {
                _w: e,
                _d: !1
              };
              try {
                n.call(t, s(C, r, 1), s(B, r, 1))
              } catch (t) {
                B.call(r, t)
              }
            })): (e._v = t, e._s = 1, T(e, !1))
          } catch (t) {
            B.call({
              _w: e,
              _d: !1
            }, t)
          }
        }
      };
    R || (F = function(t) {
      p(this, F, "Promise", "_h"), d(t), r.call(this);
      try {
        t(s(C, this, 1), s(B, this, 1))
      } catch (t) {
        B.call(this, t)
      }
    }, (r = function(t) {
      this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
    }).prototype = e(45)(F.prototype, {
      then: function(t, n) {
        var e = N(g(this, F));
        return e.ok = "function" != typeof t || t, e.fail = "function" == typeof n && n, e.domain = A ? x.domain : void 0, this._c.push(e), this._a && this._a.push(e), this._s && T(this, !1), e.promise
      },
      catch: function(t) {
        return this.then(void 0, t)
      }
    }), o = function() {
      var t = new r;
      this.promise = t, this.resolve = s(C, t, 1), this.reject = s(B, t, 1)
    }, b.f = N = function(t) {
      return t === F || t === u ? new o(t) : i(t)
    }), l(l.G + l.W + l.F * !R, {
      Promise: F
    }), e(40)(F, "Promise"), e(43)("Promise"), u = e(7).Promise, l(l.S + l.F * !R, "Promise", {
      reject: function(t) {
        var n = N(this);
        return (0, n.reject)(t), n.promise
      }
    }), l(l.S + l.F * (a || !R), "Promise", {
      resolve: function(t) {
        return _(a && this === u ? F : this, t)
      }
    }), l(l.S + l.F * !(R && e(54)((function(t) {
      F.all(t).catch(E)
    }))), "Promise", {
      all: function(t) {
        var n = this,
          e = N(n),
          r = e.resolve,
          i = e.reject,
          o = S((function() {
            var e = [],
              o = 0,
              u = 1;
            v(t, !1, (function(t) {
              var a = o++,
                c = !1;
              e.push(void 0), u++, n.resolve(t).then((function(t) {
                c || (c = !0, e[a] = t, --u || r(e))
              }), i)
            })), --u || r(e)
          }));
        return o.e && i(o.v), e.promise
      },
      race: function(t) {
        var n = this,
          e = N(n),
          r = e.reject,
          i = S((function() {
            v(t, !1, (function(t) {
              n.resolve(t).then(e.resolve, r)
            }))
          }));
        return i.e && r(i.v), e.promise
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(20);

    function i(t) {
      var n, e;
      this.promise = new t((function(t, r) {
        if (void 0 !== n || void 0 !== e) throw TypeError("Bad Promise constructor");
        n = t, e = r
      })), this.resolve = r(n), this.reject = r(e)
    }
    t.exports.f = function(t) {
      return new i(t)
    }
  }, function(t, n, e) {
    var r = e(3),
      i = e(4),
      o = e(119);
    t.exports = function(t, n) {
      if (r(t), i(n) && n.constructor === t) return n;
      var e = o.f(t);
      return (0, e.resolve)(n), e.promise
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(9).f,
      i = e(35),
      o = e(45),
      u = e(19),
      a = e(44),
      c = e(58),
      s = e(74),
      f = e(115),
      l = e(43),
      h = e(8),
      d = e(29).fastKey,
      p = e(39),
      v = h ? "_s" : "size",
      g = function(t, n) {
        var e, r = d(n);
        if ("F" !== r) return t._i[r];
        for (e = t._f; e; e = e.n)
          if (e.k == n) return e
      };
    t.exports = {
      getConstructor: function(t, n, e, s) {
        var f = t((function(t, r) {
          a(t, f, n, "_i"), t._t = n, t._i = i(null), t._f = void 0, t._l = void 0, t[v] = 0, null != r && c(r, e, t[s], t)
        }));
        return o(f.prototype, {
          clear: function() {
            for (var t = p(this, n), e = t._i, r = t._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete e[r.i];
            t._f = t._l = void 0, t[v] = 0
          },
          delete: function(t) {
            var e = p(this, n),
              r = g(e, t);
            if (r) {
              var i = r.n,
                o = r.p;
              delete e._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), e._f == r && (e._f = i), e._l == r && (e._l = o), e[v]--
            }
            return !!r
          },
          forEach: function(t) {
            p(this, n);
            for (var e, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.n : this._f;)
              for (r(e.v, e.k, this); e && e.r;) e = e.p
          },
          has: function(t) {
            return !!g(p(this, n), t)
          }
        }), h && r(f.prototype, "size", {
          get: function() {
            return p(this, n)[v]
          }
        }), f
      },
      def: function(t, n, e) {
        var r, i, o = g(t, n);
        return o ? o.v = e : (t._l = o = {
          i: i = d(n, !0),
          k: n,
          v: e,
          p: r = t._l,
          n: void 0,
          r: !1
        }, t._f || (t._f = o), r && (r.n = o), t[v]++, "F" !== i && (t._i[i] = o)), t
      },
      getEntry: g,
      setStrong: function(t, n, e) {
        s(t, n, (function(t, e) {
          this._t = p(t, n), this._k = e, this._l = void 0
        }), (function() {
          for (var t = this._k, n = this._l; n && n.r;) n = n.p;
          return this._t && (this._l = n = n ? n.n : this._t._f) ? f(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v]) : (this._t = void 0, f(1))
        }), e ? "entries" : "values", !e, !0), l(n)
      }
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(45),
      i = e(29).getWeak,
      o = e(3),
      u = e(4),
      a = e(44),
      c = e(58),
      s = e(24),
      f = e(13),
      l = e(39),
      h = s(5),
      d = s(6),
      p = 0,
      v = function(t) {
        return t._l || (t._l = new g)
      },
      g = function() {
        this.a = []
      },
      y = function(t, n) {
        return h(t.a, (function(t) {
          return t[0] === n
        }))
      };
    g.prototype = {
      get: function(t) {
        var n = y(this, t);
        if (n) return n[1]
      },
      has: function(t) {
        return !!y(this, t)
      },
      set: function(t, n) {
        var e = y(this, t);
        e ? e[1] = n : this.a.push([t, n])
      },
      delete: function(t) {
        var n = d(this.a, (function(n) {
          return n[0] === t
        }));
        return ~n && this.a.splice(n, 1), !!~n
      }
    }, t.exports = {
      getConstructor: function(t, n, e, o) {
        var s = t((function(t, r) {
          a(t, s, n, "_i"), t._t = n, t._i = p++, t._l = void 0, null != r && c(r, e, t[o], t)
        }));
        return r(s.prototype, {
          delete: function(t) {
            if (!u(t)) return !1;
            var e = i(t);
            return !0 === e ? v(l(this, n)).delete(t) : e && f(e, this._i) && delete e[this._i]
          },
          has: function(t) {
            if (!u(t)) return !1;
            var e = i(t);
            return !0 === e ? v(l(this, n)).has(t) : e && f(e, this._i)
          }
        }), s
      },
      def: function(t, n, e) {
        var r = i(o(n), !0);
        return !0 === r ? v(t).set(n, e) : r[t._i] = e, t
      },
      ufstore: v
    }
  }, function(t, n, e) {
    var r = e(21),
      i = e(6);
    t.exports = function(t) {
      if (void 0 === t) return 0;
      var n = r(t),
        e = i(n);
      if (n !== e) throw RangeError("Wrong length!");
      return e
    }
  }, function(t, n, e) {
    var r = e(36),
      i = e(52),
      o = e(3),
      u = e(1).Reflect;
    t.exports = u && u.ownKeys || function(t) {
      var n = r.f(o(t)),
        e = i.f;
      return e ? n.concat(e(t)) : n
    }
  }, function(t, n, e) {
    var r = e(6),
      i = e(70),
      o = e(26);
    t.exports = function(t, n, e, u) {
      var a = String(o(t)),
        c = a.length,
        s = void 0 === e ? " " : String(e),
        f = r(n);
      if (f <= c || "" == s) return a;
      var l = f - c,
        h = i.call(s, Math.ceil(l / s.length));
      return h.length > l && (h = h.slice(0, l)), u ? h + a : a + h
    }
  }, function(t, n, e) {
    var r = e(8),
      i = e(33),
      o = e(15),
      u = e(47).f;
    t.exports = function(t) {
      return function(n) {
        for (var e, a = o(n), c = i(a), s = c.length, f = 0, l = []; s > f;) e = c[f++], r && !u.call(a, e) || l.push(t ? [e, a[e]] : a[e]);
        return l
      }
    }
  }, function(t, n) {
    var e = t.exports = {
      version: "2.6.9"
    };
    "number" == typeof __e && (__e = e)
  }, function(t, n) {
    t.exports = function(t) {
      try {
        return !!t()
      } catch (t) {
        return !0
      }
    }
  }, function(t, n, e) {
    e(130), t.exports = e(90)
  }, function(t, n, e) {
    "use strict";
    e(131);
    var r, i = (r = e(303)) && r.__esModule ? r : {
      default: r
    };
    i.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), i.default._babelPolyfill = !0
  }, function(t, n, e) {
    "use strict";
    e(132), e(275), e(277), e(280), e(282), e(284), e(286), e(288), e(290), e(292), e(294), e(296), e(298), e(302)
  }, function(t, n, e) {
    e(133), e(136), e(137), e(138), e(139), e(140), e(141), e(142), e(143), e(144), e(145), e(146), e(147), e(148), e(149), e(150), e(151), e(152), e(153), e(154), e(155), e(156), e(157), e(158), e(159), e(160), e(161), e(162), e(163), e(164), e(165), e(166), e(167), e(168), e(169), e(170), e(171), e(172), e(173), e(174), e(175), e(176), e(177), e(179), e(180), e(181), e(182), e(183), e(184), e(185), e(186), e(187), e(188), e(189), e(190), e(191), e(192), e(193), e(194), e(195), e(196), e(197), e(198), e(199), e(200), e(201), e(202), e(203), e(204), e(205), e(206), e(207), e(208), e(209), e(210), e(211), e(212), e(214), e(215), e(217), e(218), e(219), e(220), e(221), e(222), e(223), e(225), e(226), e(227), e(228), e(229), e(230), e(231), e(232), e(233), e(234), e(235), e(236), e(237), e(82), e(238), e(116), e(239), e(117), e(240), e(241), e(242), e(243), e(118), e(246), e(247), e(248), e(249), e(250), e(251), e(252), e(253), e(254), e(255), e(256), e(257), e(258), e(259), e(260), e(261), e(262), e(263), e(264), e(265), e(266), e(267), e(268), e(269), e(270), e(271), e(272), e(273), e(274), t.exports = e(7)
  }, function(t, n, e) {
    "use strict";
    var r = e(1),
      i = e(13),
      o = e(8),
      u = e(0),
      a = e(11),
      c = e(29).KEY,
      s = e(2),
      f = e(50),
      l = e(40),
      h = e(31),
      d = e(5),
      p = e(63),
      v = e(97),
      g = e(135),
      y = e(53),
      m = e(3),
      b = e(4),
      S = e(10),
      w = e(15),
      _ = e(28),
      M = e(30),
      x = e(35),
      P = e(100),
      O = e(22),
      F = e(52),
      A = e(9),
      E = e(33),
      N = O.f,
      R = A.f,
      k = P.f,
      T = r.Symbol,
      I = r.JSON,
      j = I && I.stringify,
      L = d("_hidden"),
      B = d("toPrimitive"),
      C = {}.propertyIsEnumerable,
      W = f("symbol-registry"),
      V = f("symbols"),
      G = f("op-symbols"),
      D = Object.prototype,
      U = "function" == typeof T && !!F.f,
      z = r.QObject,
      q = !z || !z.prototype || !z.prototype.findChild,
      K = o && s((function() {
        return 7 != x(R({}, "a", {
          get: function() {
            return R(this, "a", {
              value: 7
            }).a
          }
        })).a
      })) ? function(t, n, e) {
        var r = N(D, n);
        r && delete D[n], R(t, n, e), r && t !== D && R(D, n, r)
      } : R,
      Y = function(t) {
        var n = V[t] = x(T.prototype);
        return n._k = t, n
      },
      Q = U && "symbol" == typeof T.iterator ? function(t) {
        return "symbol" == typeof t
      } : function(t) {
        return t instanceof T
      },
      H = function(t, n, e) {
        return t === D && H(G, n, e), m(t), n = _(n, !0), m(e), i(V, n) ? (e.enumerable ? (i(t, L) && t[L][n] && (t[L][n] = !1), e = x(e, {
          enumerable: M(0, !1)
        })) : (i(t, L) || R(t, L, M(1, {})), t[L][n] = !0), K(t, n, e)) : R(t, n, e)
      },
      J = function(t, n) {
        m(t);
        for (var e, r = g(n = w(n)), i = 0, o = r.length; o > i;) H(t, e = r[i++], n[e]);
        return t
      },
      X = function(t) {
        var n = C.call(this, t = _(t, !0));
        return !(this === D && i(V, t) && !i(G, t)) && (!(n || !i(this, t) || !i(V, t) || i(this, L) && this[L][t]) || n)
      },
      Z = function(t, n) {
        if (t = w(t), n = _(n, !0), t !== D || !i(V, n) || i(G, n)) {
          var e = N(t, n);
          return !e || !i(V, n) || i(t, L) && t[L][n] || (e.enumerable = !0), e
        }
      },
      $ = function(t) {
        for (var n, e = k(w(t)), r = [], o = 0; e.length > o;) i(V, n = e[o++]) || n == L || n == c || r.push(n);
        return r
      },
      tt = function(t) {
        for (var n, e = t === D, r = k(e ? G : w(t)), o = [], u = 0; r.length > u;) !i(V, n = r[u++]) || e && !i(D, n) || o.push(V[n]);
        return o
      };
    U || (a((T = function() {
      if (this instanceof T) throw TypeError("Symbol is not a constructor!");
      var t = h(arguments.length > 0 ? arguments[0] : void 0),
        n = function(e) {
          this === D && n.call(G, e), i(this, L) && i(this[L], t) && (this[L][t] = !1), K(this, t, M(1, e))
        };
      return o && q && K(D, t, {
        configurable: !0,
        set: n
      }), Y(t)
    }).prototype, "toString", (function() {
      return this._k
    })), O.f = Z, A.f = H, e(36).f = P.f = $, e(47).f = X, F.f = tt, o && !e(32) && a(D, "propertyIsEnumerable", X, !0), p.f = function(t) {
      return Y(d(t))
    }), u(u.G + u.W + u.F * !U, {
      Symbol: T
    });
    for (var nt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; nt.length > et;) d(nt[et++]);
    for (var rt = E(d.store), it = 0; rt.length > it;) v(rt[it++]);
    u(u.S + u.F * !U, "Symbol", {
      for: function(t) {
        return i(W, t += "") ? W[t] : W[t] = T(t)
      },
      keyFor: function(t) {
        if (!Q(t)) throw TypeError(t + " is not a symbol!");
        for (var n in W)
          if (W[n] === t) return n
      },
      useSetter: function() {
        q = !0
      },
      useSimple: function() {
        q = !1
      }
    }), u(u.S + u.F * !U, "Object", {
      create: function(t, n) {
        return void 0 === n ? x(t) : J(x(t), n)
      },
      defineProperty: H,
      defineProperties: J,
      getOwnPropertyDescriptor: Z,
      getOwnPropertyNames: $,
      getOwnPropertySymbols: tt
    });
    var ot = s((function() {
      F.f(1)
    }));
    u(u.S + u.F * ot, "Object", {
      getOwnPropertySymbols: function(t) {
        return F.f(S(t))
      }
    }), I && u(u.S + u.F * (!U || s((function() {
      var t = T();
      return "[null]" != j([t]) || "{}" != j({
        a: t
      }) || "{}" != j(Object(t))
    }))), "JSON", {
      stringify: function(t) {
        for (var n, e, r = [t], i = 1; arguments.length > i;) r.push(arguments[i++]);
        if (e = n = r[1], (b(n) || void 0 !== t) && !Q(t)) return y(n) || (n = function(t, n) {
          if ("function" == typeof e && (n = e.call(this, t, n)), !Q(n)) return n
        }), r[1] = n, j.apply(I, r)
      }
    }), T.prototype[B] || e(14)(T.prototype, B, T.prototype.valueOf), l(T, "Symbol"), l(Math, "Math", !0), l(r.JSON, "JSON", !0)
  }, function(t, n, e) {
    t.exports = e(50)("native-function-to-string", Function.toString)
  }, function(t, n, e) {
    var r = e(33),
      i = e(52),
      o = e(47);
    t.exports = function(t) {
      var n = r(t),
        e = i.f;
      if (e)
        for (var u, a = e(t), c = o.f, s = 0; a.length > s;) c.call(t, u = a[s++]) && n.push(u);
      return n
    }
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Object", {
      create: e(35)
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S + r.F * !e(8), "Object", {
      defineProperty: e(9).f
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S + r.F * !e(8), "Object", {
      defineProperties: e(99)
    })
  }, function(t, n, e) {
    var r = e(15),
      i = e(22).f;
    e(23)("getOwnPropertyDescriptor", (function() {
      return function(t, n) {
        return i(r(t), n)
      }
    }))
  }, function(t, n, e) {
    var r = e(10),
      i = e(37);
    e(23)("getPrototypeOf", (function() {
      return function(t) {
        return i(r(t))
      }
    }))
  }, function(t, n, e) {
    var r = e(10),
      i = e(33);
    e(23)("keys", (function() {
      return function(t) {
        return i(r(t))
      }
    }))
  }, function(t, n, e) {
    e(23)("getOwnPropertyNames", (function() {
      return e(100).f
    }))
  }, function(t, n, e) {
    var r = e(4),
      i = e(29).onFreeze;
    e(23)("freeze", (function(t) {
      return function(n) {
        return t && r(n) ? t(i(n)) : n
      }
    }))
  }, function(t, n, e) {
    var r = e(4),
      i = e(29).onFreeze;
    e(23)("seal", (function(t) {
      return function(n) {
        return t && r(n) ? t(i(n)) : n
      }
    }))
  }, function(t, n, e) {
    var r = e(4),
      i = e(29).onFreeze;
    e(23)("preventExtensions", (function(t) {
      return function(n) {
        return t && r(n) ? t(i(n)) : n
      }
    }))
  }, function(t, n, e) {
    var r = e(4);
    e(23)("isFrozen", (function(t) {
      return function(n) {
        return !r(n) || !!t && t(n)
      }
    }))
  }, function(t, n, e) {
    var r = e(4);
    e(23)("isSealed", (function(t) {
      return function(n) {
        return !r(n) || !!t && t(n)
      }
    }))
  }, function(t, n, e) {
    var r = e(4);
    e(23)("isExtensible", (function(t) {
      return function(n) {
        return !!r(n) && (!t || t(n))
      }
    }))
  }, function(t, n, e) {
    var r = e(0);
    r(r.S + r.F, "Object", {
      assign: e(101)
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Object", {
      is: e(102)
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Object", {
      setPrototypeOf: e(67).set
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(48),
      i = {};
    i[e(5)("toStringTag")] = "z", i + "" != "[object z]" && e(11)(Object.prototype, "toString", (function() {
      return "[object " + r(this) + "]"
    }), !0)
  }, function(t, n, e) {
    var r = e(0);
    r(r.P, "Function", {
      bind: e(103)
    })
  }, function(t, n, e) {
    var r = e(9).f,
      i = Function.prototype,
      o = /^\s*function ([^ (]*)/;
    "name" in i || e(8) && r(i, "name", {
      configurable: !0,
      get: function() {
        try {
          return ("" + this).match(o)[1]
        } catch (t) {
          return ""
        }
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(4),
      i = e(37),
      o = e(5)("hasInstance"),
      u = Function.prototype;
    o in u || e(9).f(u, o, {
      value: function(t) {
        if ("function" != typeof this || !r(t)) return !1;
        if (!r(this.prototype)) return t instanceof this;
        for (; t = i(t);)
          if (this.prototype === t) return !0;
        return !1
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(105);
    r(r.G + r.F * (parseInt != i), {
      parseInt: i
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(106);
    r(r.G + r.F * (parseFloat != i), {
      parseFloat: i
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(1),
      i = e(13),
      o = e(25),
      u = e(69),
      a = e(28),
      c = e(2),
      s = e(36).f,
      f = e(22).f,
      l = e(9).f,
      h = e(41).trim,
      d = r.Number,
      p = d,
      v = d.prototype,
      g = "Number" == o(e(35)(v)),
      y = "trim" in String.prototype,
      m = function(t) {
        var n = a(t, !1);
        if ("string" == typeof n && n.length > 2) {
          var e, r, i, o = (n = y ? n.trim() : h(n, 3)).charCodeAt(0);
          if (43 === o || 45 === o) {
            if (88 === (e = n.charCodeAt(2)) || 120 === e) return NaN
          } else if (48 === o) {
            switch (n.charCodeAt(1)) {
              case 66:
              case 98:
                r = 2, i = 49;
                break;
              case 79:
              case 111:
                r = 8, i = 55;
                break;
              default:
                return +n
            }
            for (var u, c = n.slice(2), s = 0, f = c.length; s < f; s++)
              if ((u = c.charCodeAt(s)) < 48 || u > i) return NaN;
            return parseInt(c, r)
          }
        }
        return +n
      };
    if (!d(" 0o1") || !d("0b1") || d("+0x1")) {
      d = function(t) {
        var n = arguments.length < 1 ? 0 : t,
          e = this;
        return e instanceof d && (g ? c((function() {
          v.valueOf.call(e)
        })) : "Number" != o(e)) ? u(new p(m(n)), e, d) : m(n)
      };
      for (var b, S = e(8) ? s(p) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), w = 0; S.length > w; w++) i(p, b = S[w]) && !i(d, b) && l(d, b, f(p, b));
      d.prototype = v, v.constructor = d, e(11)(r, "Number", d)
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(21),
      o = e(107),
      u = e(70),
      a = 1..toFixed,
      c = Math.floor,
      s = [0, 0, 0, 0, 0, 0],
      f = "Number.toFixed: incorrect invocation!",
      l = function(t, n) {
        for (var e = -1, r = n; ++e < 6;) r += t * s[e], s[e] = r % 1e7, r = c(r / 1e7)
      },
      h = function(t) {
        for (var n = 6, e = 0; --n >= 0;) e += s[n], s[n] = c(e / t), e = e % t * 1e7
      },
      d = function() {
        for (var t = 6, n = ""; --t >= 0;)
          if ("" !== n || 0 === t || 0 !== s[t]) {
            var e = String(s[t]);
            n = "" === n ? e : n + u.call("0", 7 - e.length) + e
          } return n
      },
      p = function(t, n, e) {
        return 0 === n ? e : n % 2 == 1 ? p(t, n - 1, e * t) : p(t * t, n / 2, e)
      };
    r(r.P + r.F * (!!a && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !e(2)((function() {
      a.call({})
    }))), "Number", {
      toFixed: function(t) {
        var n, e, r, a, c = o(this, f),
          s = i(t),
          v = "",
          g = "0";
        if (s < 0 || s > 20) throw RangeError(f);
        if (c != c) return "NaN";
        if (c <= -1e21 || c >= 1e21) return String(c);
        if (c < 0 && (v = "-", c = -c), c > 1e-21)
          if (e = (n = function(t) {
              for (var n = 0, e = t; e >= 4096;) n += 12, e /= 4096;
              for (; e >= 2;) n += 1, e /= 2;
              return n
            }(c * p(2, 69, 1)) - 69) < 0 ? c * p(2, -n, 1) : c / p(2, n, 1), e *= 4503599627370496, (n = 52 - n) > 0) {
            for (l(0, e), r = s; r >= 7;) l(1e7, 0), r -= 7;
            for (l(p(10, r, 1), 0), r = n - 1; r >= 23;) h(1 << 23), r -= 23;
            h(1 << r), l(1, 1), h(2), g = d()
          } else l(0, e), l(1 << -n, 0), g = d() + u.call("0", s);
        return g = s > 0 ? v + ((a = g.length) <= s ? "0." + u.call("0", s - a) + g : g.slice(0, a - s) + "." + g.slice(a - s)) : v + g
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(2),
      o = e(107),
      u = 1..toPrecision;
    r(r.P + r.F * (i((function() {
      return "1" !== u.call(1, void 0)
    })) || !i((function() {
      u.call({})
    }))), "Number", {
      toPrecision: function(t) {
        var n = o(this, "Number#toPrecision: incorrect invocation!");
        return void 0 === t ? u.call(n) : u.call(n, t)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Number", {
      EPSILON: Math.pow(2, -52)
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(1).isFinite;
    r(r.S, "Number", {
      isFinite: function(t) {
        return "number" == typeof t && i(t)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Number", {
      isInteger: e(108)
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Number", {
      isNaN: function(t) {
        return t != t
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(108),
      o = Math.abs;
    r(r.S, "Number", {
      isSafeInteger: function(t) {
        return i(t) && o(t) <= 9007199254740991
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Number", {
      MAX_SAFE_INTEGER: 9007199254740991
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Number", {
      MIN_SAFE_INTEGER: -9007199254740991
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(106);
    r(r.S + r.F * (Number.parseFloat != i), "Number", {
      parseFloat: i
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(105);
    r(r.S + r.F * (Number.parseInt != i), "Number", {
      parseInt: i
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(109),
      o = Math.sqrt,
      u = Math.acosh;
    r(r.S + r.F * !(u && 710 == Math.floor(u(Number.MAX_VALUE)) && u(1 / 0) == 1 / 0), "Math", {
      acosh: function(t) {
        return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1))
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = Math.asinh;
    r(r.S + r.F * !(i && 1 / i(0) > 0), "Math", {
      asinh: function t(n) {
        return isFinite(n = +n) && 0 != n ? n < 0 ? -t(-n) : Math.log(n + Math.sqrt(n * n + 1)) : n
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = Math.atanh;
    r(r.S + r.F * !(i && 1 / i(-0) < 0), "Math", {
      atanh: function(t) {
        return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(71);
    r(r.S, "Math", {
      cbrt: function(t) {
        return i(t = +t) * Math.pow(Math.abs(t), 1 / 3)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      clz32: function(t) {
        return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = Math.exp;
    r(r.S, "Math", {
      cosh: function(t) {
        return (i(t = +t) + i(-t)) / 2
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(72);
    r(r.S + r.F * (i != Math.expm1), "Math", {
      expm1: i
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      fround: e(178)
    })
  }, function(t, n, e) {
    var r = e(71),
      i = Math.pow,
      o = i(2, -52),
      u = i(2, -23),
      a = i(2, 127) * (2 - u),
      c = i(2, -126);
    t.exports = Math.fround || function(t) {
      var n, e, i = Math.abs(t),
        s = r(t);
      return i < c ? s * (i / c / u + 1 / o - 1 / o) * c * u : (e = (n = (1 + u / o) * i) - (n - i)) > a || e != e ? s * (1 / 0) : s * e
    }
  }, function(t, n, e) {
    var r = e(0),
      i = Math.abs;
    r(r.S, "Math", {
      hypot: function(t, n) {
        for (var e, r, o = 0, u = 0, a = arguments.length, c = 0; u < a;) c < (e = i(arguments[u++])) ? (o = o * (r = c / e) * r + 1, c = e) : o += e > 0 ? (r = e / c) * r : e;
        return c === 1 / 0 ? 1 / 0 : c * Math.sqrt(o)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = Math.imul;
    r(r.S + r.F * e(2)((function() {
      return -5 != i(4294967295, 5) || 2 != i.length
    })), "Math", {
      imul: function(t, n) {
        var e = +t,
          r = +n,
          i = 65535 & e,
          o = 65535 & r;
        return 0 | i * o + ((65535 & e >>> 16) * o + i * (65535 & r >>> 16) << 16 >>> 0)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      log10: function(t) {
        return Math.log(t) * Math.LOG10E
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      log1p: e(109)
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      log2: function(t) {
        return Math.log(t) / Math.LN2
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      sign: e(71)
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(72),
      o = Math.exp;
    r(r.S + r.F * e(2)((function() {
      return -2e-17 != !Math.sinh(-2e-17)
    })), "Math", {
      sinh: function(t) {
        return Math.abs(t = +t) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(72),
      o = Math.exp;
    r(r.S, "Math", {
      tanh: function(t) {
        var n = i(t = +t),
          e = i(-t);
        return n == 1 / 0 ? 1 : e == 1 / 0 ? -1 : (n - e) / (o(t) + o(-t))
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Math", {
      trunc: function(t) {
        return (t > 0 ? Math.floor : Math.ceil)(t)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(34),
      o = String.fromCharCode,
      u = String.fromCodePoint;
    r(r.S + r.F * (!!u && 1 != u.length), "String", {
      fromCodePoint: function(t) {
        for (var n, e = [], r = arguments.length, u = 0; r > u;) {
          if (n = +arguments[u++], i(n, 1114111) !== n) throw RangeError(n + " is not a valid code point");
          e.push(n < 65536 ? o(n) : o(55296 + ((n -= 65536) >> 10), n % 1024 + 56320))
        }
        return e.join("")
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(15),
      o = e(6);
    r(r.S, "String", {
      raw: function(t) {
        for (var n = i(t.raw), e = o(n.length), r = arguments.length, u = [], a = 0; e > a;) u.push(String(n[a++])), a < r && u.push(String(arguments[a]));
        return u.join("")
      }
    })
  }, function(t, n, e) {
    "use strict";
    e(41)("trim", (function(t) {
      return function() {
        return t(this, 3)
      }
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(73)(!0);
    e(74)(String, "String", (function(t) {
      this._t = String(t), this._i = 0
    }), (function() {
      var t, n = this._t,
        e = this._i;
      return e >= n.length ? {
        value: void 0,
        done: !0
      } : (t = r(n, e), this._i += t.length, {
        value: t,
        done: !1
      })
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(73)(!1);
    r(r.P, "String", {
      codePointAt: function(t) {
        return i(this, t)
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(6),
      o = e(75),
      u = "".endsWith;
    r(r.P + r.F * e(77)("endsWith"), "String", {
      endsWith: function(t) {
        var n = o(this, t, "endsWith"),
          e = arguments.length > 1 ? arguments[1] : void 0,
          r = i(n.length),
          a = void 0 === e ? r : Math.min(i(e), r),
          c = String(t);
        return u ? u.call(n, c, a) : n.slice(a - c.length, a) === c
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(75);
    r(r.P + r.F * e(77)("includes"), "String", {
      includes: function(t) {
        return !!~i(this, t, "includes").indexOf(t, arguments.length > 1 ? arguments[1] : void 0)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.P, "String", {
      repeat: e(70)
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(6),
      o = e(75),
      u = "".startsWith;
    r(r.P + r.F * e(77)("startsWith"), "String", {
      startsWith: function(t) {
        var n = o(this, t, "startsWith"),
          e = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, n.length)),
          r = String(t);
        return u ? u.call(n, r, e) : n.slice(e, e + r.length) === r
      }
    })
  }, function(t, n, e) {
    "use strict";
    e(12)("anchor", (function(t) {
      return function(n) {
        return t(this, "a", "name", n)
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("big", (function(t) {
      return function() {
        return t(this, "big", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("blink", (function(t) {
      return function() {
        return t(this, "blink", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("bold", (function(t) {
      return function() {
        return t(this, "b", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("fixed", (function(t) {
      return function() {
        return t(this, "tt", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("fontcolor", (function(t) {
      return function(n) {
        return t(this, "font", "color", n)
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("fontsize", (function(t) {
      return function(n) {
        return t(this, "font", "size", n)
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("italics", (function(t) {
      return function() {
        return t(this, "i", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("link", (function(t) {
      return function(n) {
        return t(this, "a", "href", n)
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("small", (function(t) {
      return function() {
        return t(this, "small", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("strike", (function(t) {
      return function() {
        return t(this, "strike", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("sub", (function(t) {
      return function() {
        return t(this, "sub", "", "")
      }
    }))
  }, function(t, n, e) {
    "use strict";
    e(12)("sup", (function(t) {
      return function() {
        return t(this, "sup", "", "")
      }
    }))
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Date", {
      now: function() {
        return (new Date).getTime()
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(10),
      o = e(28);
    r(r.P + r.F * e(2)((function() {
      return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
        toISOString: function() {
          return 1
        }
      })
    })), "Date", {
      toJSON: function(t) {
        var n = i(this),
          e = o(n);
        return "number" != typeof e || isFinite(e) ? n.toISOString() : null
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(213);
    r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", {
      toISOString: i
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(2),
      i = Date.prototype.getTime,
      o = Date.prototype.toISOString,
      u = function(t) {
        return t > 9 ? t : "0" + t
      };
    t.exports = r((function() {
      return "0385-07-25T07:06:39.999Z" != o.call(new Date(-5e13 - 1))
    })) || !r((function() {
      o.call(new Date(NaN))
    })) ? function() {
      if (!isFinite(i.call(this))) throw RangeError("Invalid time value");
      var t = this,
        n = t.getUTCFullYear(),
        e = t.getUTCMilliseconds(),
        r = n < 0 ? "-" : n > 9999 ? "+" : "";
      return r + ("00000" + Math.abs(n)).slice(r ? -6 : -4) + "-" + u(t.getUTCMonth() + 1) + "-" + u(t.getUTCDate()) + "T" + u(t.getUTCHours()) + ":" + u(t.getUTCMinutes()) + ":" + u(t.getUTCSeconds()) + "." + (e > 99 ? e : "0" + u(e)) + "Z"
    } : o
  }, function(t, n, e) {
    var r = Date.prototype,
      i = r.toString,
      o = r.getTime;
    new Date(NaN) + "" != "Invalid Date" && e(11)(r, "toString", (function() {
      var t = o.call(this);
      return t == t ? i.call(this) : "Invalid Date"
    }))
  }, function(t, n, e) {
    var r = e(5)("toPrimitive"),
      i = Date.prototype;
    r in i || e(14)(i, r, e(216))
  }, function(t, n, e) {
    "use strict";
    var r = e(3),
      i = e(28);
    t.exports = function(t) {
      if ("string" !== t && "number" !== t && "default" !== t) throw TypeError("Incorrect hint");
      return i(r(this), "number" != t)
    }
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Array", {
      isArray: e(53)
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(19),
      i = e(0),
      o = e(10),
      u = e(111),
      a = e(78),
      c = e(6),
      s = e(79),
      f = e(80);
    i(i.S + i.F * !e(54)((function(t) {
      Array.from(t)
    })), "Array", {
      from: function(t) {
        var n, e, i, l, h = o(t),
          d = "function" == typeof this ? this : Array,
          p = arguments.length,
          v = p > 1 ? arguments[1] : void 0,
          g = void 0 !== v,
          y = 0,
          m = f(h);
        if (g && (v = r(v, p > 2 ? arguments[2] : void 0, 2)), null == m || d == Array && a(m))
          for (e = new d(n = c(h.length)); n > y; y++) s(e, y, g ? v(h[y], y) : h[y]);
        else
          for (l = m.call(h), e = new d; !(i = l.next()).done; y++) s(e, y, g ? u(l, v, [i.value, y], !0) : i.value);
        return e.length = y, e
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(79);
    r(r.S + r.F * e(2)((function() {
      function t() {}
      return !(Array.of.call(t) instanceof t)
    })), "Array", {
      of: function() {
        for (var t = 0, n = arguments.length, e = new("function" == typeof this ? this : Array)(n); n > t;) i(e, t, arguments[t++]);
        return e.length = n, e
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(15),
      o = [].join;
    r(r.P + r.F * (e(46) != Object || !e(16)(o)), "Array", {
      join: function(t) {
        return o.call(i(this), void 0 === t ? "," : t)
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(66),
      o = e(25),
      u = e(34),
      a = e(6),
      c = [].slice;
    r(r.P + r.F * e(2)((function() {
      i && c.call(i)
    })), "Array", {
      slice: function(t, n) {
        var e = a(this.length),
          r = o(this);
        if (n = void 0 === n ? e : n, "Array" == r) return c.call(this, t, n);
        for (var i = u(t, e), s = u(n, e), f = a(s - i), l = new Array(f), h = 0; h < f; h++) l[h] = "String" == r ? this.charAt(i + h) : this[i + h];
        return l
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(20),
      o = e(10),
      u = e(2),
      a = [].sort,
      c = [1, 2, 3];
    r(r.P + r.F * (u((function() {
      c.sort(void 0)
    })) || !u((function() {
      c.sort(null)
    })) || !e(16)(a)), "Array", {
      sort: function(t) {
        return void 0 === t ? a.call(o(this)) : a.call(o(this), i(t))
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(0),
      o = e(16)([].forEach, !0);
    r(r.P + r.F * !o, "Array", {
      forEach: function(t) {
        return i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    var r = e(4),
      i = e(53),
      o = e(5)("species");
    t.exports = function(t) {
      var n;
      return i(t) && ("function" != typeof(n = t.constructor) || n !== Array && !i(n.prototype) || (n = void 0), r(n) && null === (n = n[o]) && (n = void 0)), void 0 === n ? Array : n
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(1);
    r(r.P + r.F * !e(16)([].map, !0), "Array", {
      map: function(t) {
        return i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(2);
    r(r.P + r.F * !e(16)([].filter, !0), "Array", {
      filter: function(t) {
        return i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(3);
    r(r.P + r.F * !e(16)([].some, !0), "Array", {
      some: function(t) {
        return i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(4);
    r(r.P + r.F * !e(16)([].every, !0), "Array", {
      every: function(t) {
        return i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(113);
    r(r.P + r.F * !e(16)([].reduce, !0), "Array", {
      reduce: function(t) {
        return i(this, t, arguments.length, arguments[1], !1)
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(113);
    r(r.P + r.F * !e(16)([].reduceRight, !0), "Array", {
      reduceRight: function(t) {
        return i(this, t, arguments.length, arguments[1], !0)
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(51)(!1),
      o = [].indexOf,
      u = !!o && 1 / [1].indexOf(1, -0) < 0;
    r(r.P + r.F * (u || !e(16)(o)), "Array", {
      indexOf: function(t) {
        return u ? o.apply(this, arguments) || 0 : i(this, t, arguments[1])
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(15),
      o = e(21),
      u = e(6),
      a = [].lastIndexOf,
      c = !!a && 1 / [1].lastIndexOf(1, -0) < 0;
    r(r.P + r.F * (c || !e(16)(a)), "Array", {
      lastIndexOf: function(t) {
        if (c) return a.apply(this, arguments) || 0;
        var n = i(this),
          e = u(n.length),
          r = e - 1;
        for (arguments.length > 1 && (r = Math.min(r, o(arguments[1]))), r < 0 && (r = e + r); r >= 0; r--)
          if (r in n && n[r] === t) return r || 0;
        return -1
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.P, "Array", {
      copyWithin: e(114)
    }), e(38)("copyWithin")
  }, function(t, n, e) {
    var r = e(0);
    r(r.P, "Array", {
      fill: e(81)
    }), e(38)("fill")
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(5),
      o = !0;
    "find" in [] && Array(1).find((function() {
      o = !1
    })), r(r.P + r.F * o, "Array", {
      find: function(t) {
        return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }), e(38)("find")
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(24)(6),
      o = "findIndex",
      u = !0;
    o in [] && Array(1)[o]((function() {
      u = !1
    })), r(r.P + r.F * u, "Array", {
      findIndex: function(t) {
        return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }), e(38)(o)
  }, function(t, n, e) {
    e(43)("Array")
  }, function(t, n, e) {
    var r = e(1),
      i = e(69),
      o = e(9).f,
      u = e(36).f,
      a = e(76),
      c = e(55),
      s = r.RegExp,
      f = s,
      l = s.prototype,
      h = /a/g,
      d = /a/g,
      p = new s(h) !== h;
    if (e(8) && (!p || e(2)((function() {
        return d[e(5)("match")] = !1, s(h) != h || s(d) == d || "/a/i" != s(h, "i")
      })))) {
      s = function(t, n) {
        var e = this instanceof s,
          r = a(t),
          o = void 0 === n;
        return !e && r && t.constructor === s && o ? t : i(p ? new f(r && !o ? t.source : t, n) : f((r = t instanceof s) ? t.source : t, r && o ? c.call(t) : n), e ? this : l, s)
      };
      for (var v = function(t) {
          t in s || o(s, t, {
            configurable: !0,
            get: function() {
              return f[t]
            },
            set: function(n) {
              f[t] = n
            }
          })
        }, g = u(f), y = 0; g.length > y;) v(g[y++]);
      l.constructor = s, s.prototype = l, e(11)(r, "RegExp", s)
    }
    e(43)("RegExp")
  }, function(t, n, e) {
    "use strict";
    e(117);
    var r = e(3),
      i = e(55),
      o = e(8),
      u = /./.toString,
      a = function(t) {
        e(11)(RegExp.prototype, "toString", t, !0)
      };
    e(2)((function() {
      return "/a/b" != u.call({
        source: "a",
        flags: "b"
      })
    })) ? a((function() {
      var t = r(this);
      return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0)
    })) : "toString" != u.name && a((function() {
      return u.call(this)
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(3),
      i = e(6),
      o = e(84),
      u = e(56);
    e(57)("match", 1, (function(t, n, e, a) {
      return [function(e) {
        var r = t(this),
          i = null == e ? void 0 : e[n];
        return void 0 !== i ? i.call(e, r) : new RegExp(e)[n](String(r))
      }, function(t) {
        var n = a(e, t, this);
        if (n.done) return n.value;
        var c = r(t),
          s = String(this);
        if (!c.global) return u(c, s);
        var f = c.unicode;
        c.lastIndex = 0;
        for (var l, h = [], d = 0; null !== (l = u(c, s));) {
          var p = String(l[0]);
          h[d] = p, "" === p && (c.lastIndex = o(s, i(c.lastIndex), f)), d++
        }
        return 0 === d ? null : h
      }]
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(3),
      i = e(10),
      o = e(6),
      u = e(21),
      a = e(84),
      c = e(56),
      s = Math.max,
      f = Math.min,
      l = Math.floor,
      h = /\$([$&`']|\d\d?|<[^>]*>)/g,
      d = /\$([$&`']|\d\d?)/g;
    e(57)("replace", 2, (function(t, n, e, p) {
      return [function(r, i) {
        var o = t(this),
          u = null == r ? void 0 : r[n];
        return void 0 !== u ? u.call(r, o, i) : e.call(String(o), r, i)
      }, function(t, n) {
        var i = p(e, t, this, n);
        if (i.done) return i.value;
        var l = r(t),
          h = String(this),
          d = "function" == typeof n;
        d || (n = String(n));
        var g = l.global;
        if (g) {
          var y = l.unicode;
          l.lastIndex = 0
        }
        for (var m = [];;) {
          var b = c(l, h);
          if (null === b) break;
          if (m.push(b), !g) break;
          "" === String(b[0]) && (l.lastIndex = a(h, o(l.lastIndex), y))
        }
        for (var S, w = "", _ = 0, M = 0; M < m.length; M++) {
          b = m[M];
          for (var x = String(b[0]), P = s(f(u(b.index), h.length), 0), O = [], F = 1; F < b.length; F++) O.push(void 0 === (S = b[F]) ? S : String(S));
          var A = b.groups;
          if (d) {
            var E = [x].concat(O, P, h);
            void 0 !== A && E.push(A);
            var N = String(n.apply(void 0, E))
          } else N = v(x, h, P, O, A, n);
          P >= _ && (w += h.slice(_, P) + N, _ = P + x.length)
        }
        return w + h.slice(_)
      }];

      function v(t, n, r, o, u, a) {
        var c = r + t.length,
          s = o.length,
          f = d;
        return void 0 !== u && (u = i(u), f = h), e.call(a, f, (function(e, i) {
          var a;
          switch (i.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return t;
            case "`":
              return n.slice(0, r);
            case "'":
              return n.slice(c);
            case "<":
              a = u[i.slice(1, -1)];
              break;
            default:
              var f = +i;
              if (0 === f) return e;
              if (f > s) {
                var h = l(f / 10);
                return 0 === h ? e : h <= s ? void 0 === o[h - 1] ? i.charAt(1) : o[h - 1] + i.charAt(1) : e
              }
              a = o[f - 1]
          }
          return void 0 === a ? "" : a
        }))
      }
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(3),
      i = e(102),
      o = e(56);
    e(57)("search", 1, (function(t, n, e, u) {
      return [function(e) {
        var r = t(this),
          i = null == e ? void 0 : e[n];
        return void 0 !== i ? i.call(e, r) : new RegExp(e)[n](String(r))
      }, function(t) {
        var n = u(e, t, this);
        if (n.done) return n.value;
        var a = r(t),
          c = String(this),
          s = a.lastIndex;
        i(s, 0) || (a.lastIndex = 0);
        var f = o(a, c);
        return i(a.lastIndex, s) || (a.lastIndex = s), null === f ? -1 : f.index
      }]
    }))
  }, function(t, n, e) {
    "use strict";
    var r = e(76),
      i = e(3),
      o = e(49),
      u = e(84),
      a = e(6),
      c = e(56),
      s = e(83),
      f = e(2),
      l = Math.min,
      h = [].push,
      d = !f((function() {
        RegExp(4294967295, "y")
      }));
    e(57)("split", 2, (function(t, n, e, f) {
      var p;
      return p = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(t, n) {
        var i = String(this);
        if (void 0 === t && 0 === n) return [];
        if (!r(t)) return e.call(i, t, n);
        for (var o, u, a, c = [], f = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), l = 0, d = void 0 === n ? 4294967295 : n >>> 0, p = new RegExp(t.source, f + "g");
          (o = s.call(p, i)) && !((u = p.lastIndex) > l && (c.push(i.slice(l, o.index)), o.length > 1 && o.index < i.length && h.apply(c, o.slice(1)), a = o[0].length, l = u, c.length >= d));) p.lastIndex === o.index && p.lastIndex++;
        return l === i.length ? !a && p.test("") || c.push("") : c.push(i.slice(l)), c.length > d ? c.slice(0, d) : c
      } : "0".split(void 0, 0).length ? function(t, n) {
        return void 0 === t && 0 === n ? [] : e.call(this, t, n)
      } : e, [function(e, r) {
        var i = t(this),
          o = null == e ? void 0 : e[n];
        return void 0 !== o ? o.call(e, i, r) : p.call(String(i), e, r)
      }, function(t, n) {
        var r = f(p, t, this, n, p !== e);
        if (r.done) return r.value;
        var s = i(t),
          h = String(this),
          v = o(s, RegExp),
          g = s.unicode,
          y = (s.ignoreCase ? "i" : "") + (s.multiline ? "m" : "") + (s.unicode ? "u" : "") + (d ? "y" : "g"),
          m = new v(d ? s : "^(?:" + s.source + ")", y),
          b = void 0 === n ? 4294967295 : n >>> 0;
        if (0 === b) return [];
        if (0 === h.length) return null === c(m, h) ? [h] : [];
        for (var S = 0, w = 0, _ = []; w < h.length;) {
          m.lastIndex = d ? w : 0;
          var M, x = c(m, d ? h : h.slice(w));
          if (null === x || (M = l(a(m.lastIndex + (d ? 0 : w)), h.length)) === S) w = u(h, w, g);
          else {
            if (_.push(h.slice(S, w)), _.length === b) return _;
            for (var P = 1; P <= x.length - 1; P++)
              if (_.push(x[P]), _.length === b) return _;
            w = S = M
          }
        }
        return _.push(h.slice(S)), _
      }]
    }))
  }, function(t, n, e) {
    var r = e(1),
      i = e(85).set,
      o = r.MutationObserver || r.WebKitMutationObserver,
      u = r.process,
      a = r.Promise,
      c = "process" == e(25)(u);
    t.exports = function() {
      var t, n, e, s = function() {
        var r, i;
        for (c && (r = u.domain) && r.exit(); t;) {
          i = t.fn, t = t.next;
          try {
            i()
          } catch (r) {
            throw t ? e() : n = void 0, r
          }
        }
        n = void 0, r && r.enter()
      };
      if (c) e = function() {
        u.nextTick(s)
      };
      else if (!o || r.navigator && r.navigator.standalone)
        if (a && a.resolve) {
          var f = a.resolve(void 0);
          e = function() {
            f.then(s)
          }
        } else e = function() {
          i.call(r, s)
        };
      else {
        var l = !0,
          h = document.createTextNode("");
        new o(s).observe(h, {
          characterData: !0
        }), e = function() {
          h.data = l = !l
        }
      }
      return function(r) {
        var i = {
          fn: r,
          next: void 0
        };
        n && (n.next = i), t || (t = i, e()), n = i
      }
    }
  }, function(t, n) {
    t.exports = function(t) {
      try {
        return {
          e: !1,
          v: t()
        }
      } catch (t) {
        return {
          e: !0,
          v: t
        }
      }
    }
  }, function(t, n, e) {
    "use strict";
    var r = e(121),
      i = e(39);
    t.exports = e(60)("Map", (function(t) {
      return function() {
        return t(this, arguments.length > 0 ? arguments[0] : void 0)
      }
    }), {
      get: function(t) {
        var n = r.getEntry(i(this, "Map"), t);
        return n && n.v
      },
      set: function(t, n) {
        return r.def(i(this, "Map"), 0 === t ? 0 : t, n)
      }
    }, r, !0)
  }, function(t, n, e) {
    "use strict";
    var r = e(121),
      i = e(39);
    t.exports = e(60)("Set", (function(t) {
      return function() {
        return t(this, arguments.length > 0 ? arguments[0] : void 0)
      }
    }), {
      add: function(t) {
        return r.def(i(this, "Set"), t = 0 === t ? 0 : t, t)
      }
    }, r)
  }, function(t, n, e) {
    "use strict";
    var r, i = e(1),
      o = e(24)(0),
      u = e(11),
      a = e(29),
      c = e(101),
      s = e(122),
      f = e(4),
      l = e(39),
      h = e(39),
      d = !i.ActiveXObject && "ActiveXObject" in i,
      p = a.getWeak,
      v = Object.isExtensible,
      g = s.ufstore,
      y = function(t) {
        return function() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0)
        }
      },
      m = {
        get: function(t) {
          if (f(t)) {
            var n = p(t);
            return !0 === n ? g(l(this, "WeakMap")).get(t) : n ? n[this._i] : void 0
          }
        },
        set: function(t, n) {
          return s.def(l(this, "WeakMap"), t, n)
        }
      },
      b = t.exports = e(60)("WeakMap", y, m, s, !0, !0);
    h && d && (c((r = s.getConstructor(y, "WeakMap")).prototype, m), a.NEED = !0, o(["delete", "has", "get", "set"], (function(t) {
      var n = b.prototype,
        e = n[t];
      u(n, t, (function(n, i) {
        if (f(n) && !v(n)) {
          this._f || (this._f = new r);
          var o = this._f[t](n, i);
          return "set" == t ? this : o
        }
        return e.call(this, n, i)
      }))
    })))
  }, function(t, n, e) {
    "use strict";
    var r = e(122),
      i = e(39);
    e(60)("WeakSet", (function(t) {
      return function() {
        return t(this, arguments.length > 0 ? arguments[0] : void 0)
      }
    }), {
      add: function(t) {
        return r.def(i(this, "WeakSet"), t, !0)
      }
    }, r, !1, !0)
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(61),
      o = e(86),
      u = e(3),
      a = e(34),
      c = e(6),
      s = e(4),
      f = e(1).ArrayBuffer,
      l = e(49),
      h = o.ArrayBuffer,
      d = o.DataView,
      p = i.ABV && f.isView,
      v = h.prototype.slice,
      g = i.VIEW;
    r(r.G + r.W + r.F * (f !== h), {
      ArrayBuffer: h
    }), r(r.S + r.F * !i.CONSTR, "ArrayBuffer", {
      isView: function(t) {
        return p && p(t) || s(t) && g in t
      }
    }), r(r.P + r.U + r.F * e(2)((function() {
      return !new h(2).slice(1, void 0).byteLength
    })), "ArrayBuffer", {
      slice: function(t, n) {
        if (void 0 !== v && void 0 === n) return v.call(u(this), t);
        for (var e = u(this).byteLength, r = a(t, e), i = a(void 0 === n ? e : n, e), o = new(l(this, h))(c(i - r)), s = new d(this), f = new d(o), p = 0; r < i;) f.setUint8(p++, s.getUint8(r++));
        return o
      }
    }), e(43)("ArrayBuffer")
  }, function(t, n, e) {
    var r = e(0);
    r(r.G + r.W + r.F * !e(61).ABV, {
      DataView: e(86).DataView
    })
  }, function(t, n, e) {
    e(27)("Int8", 1, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Uint8", 1, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Uint8", 1, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }), !0)
  }, function(t, n, e) {
    e(27)("Int16", 2, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Uint16", 2, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Int32", 4, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Uint32", 4, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Float32", 4, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    e(27)("Float64", 8, (function(t) {
      return function(n, e, r) {
        return t(this, n, e, r)
      }
    }))
  }, function(t, n, e) {
    var r = e(0),
      i = e(20),
      o = e(3),
      u = (e(1).Reflect || {}).apply,
      a = Function.apply;
    r(r.S + r.F * !e(2)((function() {
      u((function() {}))
    })), "Reflect", {
      apply: function(t, n, e) {
        var r = i(t),
          c = o(e);
        return u ? u(r, n, c) : a.call(r, n, c)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(35),
      o = e(20),
      u = e(3),
      a = e(4),
      c = e(2),
      s = e(103),
      f = (e(1).Reflect || {}).construct,
      l = c((function() {
        function t() {}
        return !(f((function() {}), [], t) instanceof t)
      })),
      h = !c((function() {
        f((function() {}))
      }));
    r(r.S + r.F * (l || h), "Reflect", {
      construct: function(t, n) {
        o(t), u(n);
        var e = arguments.length < 3 ? t : o(arguments[2]);
        if (h && !l) return f(t, n, e);
        if (t == e) {
          switch (n.length) {
            case 0:
              return new t;
            case 1:
              return new t(n[0]);
            case 2:
              return new t(n[0], n[1]);
            case 3:
              return new t(n[0], n[1], n[2]);
            case 4:
              return new t(n[0], n[1], n[2], n[3])
          }
          var r = [null];
          return r.push.apply(r, n), new(s.apply(t, r))
        }
        var c = e.prototype,
          d = i(a(c) ? c : Object.prototype),
          p = Function.apply.call(t, d, n);
        return a(p) ? p : d
      }
    })
  }, function(t, n, e) {
    var r = e(9),
      i = e(0),
      o = e(3),
      u = e(28);
    i(i.S + i.F * e(2)((function() {
      Reflect.defineProperty(r.f({}, 1, {
        value: 1
      }), 1, {
        value: 2
      })
    })), "Reflect", {
      defineProperty: function(t, n, e) {
        o(t), n = u(n, !0), o(e);
        try {
          return r.f(t, n, e), !0
        } catch (t) {
          return !1
        }
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(22).f,
      o = e(3);
    r(r.S, "Reflect", {
      deleteProperty: function(t, n) {
        var e = i(o(t), n);
        return !(e && !e.configurable) && delete t[n]
      }
    })
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(3),
      o = function(t) {
        this._t = i(t), this._i = 0;
        var n, e = this._k = [];
        for (n in t) e.push(n)
      };
    e(110)(o, "Object", (function() {
      var t, n = this._k;
      do {
        if (this._i >= n.length) return {
          value: void 0,
          done: !0
        }
      } while (!((t = n[this._i++]) in this._t));
      return {
        value: t,
        done: !1
      }
    })), r(r.S, "Reflect", {
      enumerate: function(t) {
        return new o(t)
      }
    })
  }, function(t, n, e) {
    var r = e(22),
      i = e(37),
      o = e(13),
      u = e(0),
      a = e(4),
      c = e(3);
    u(u.S, "Reflect", {
      get: function t(n, e) {
        var u, s, f = arguments.length < 3 ? n : arguments[2];
        return c(n) === f ? n[e] : (u = r.f(n, e)) ? o(u, "value") ? u.value : void 0 !== u.get ? u.get.call(f) : void 0 : a(s = i(n)) ? t(s, e, f) : void 0
      }
    })
  }, function(t, n, e) {
    var r = e(22),
      i = e(0),
      o = e(3);
    i(i.S, "Reflect", {
      getOwnPropertyDescriptor: function(t, n) {
        return r.f(o(t), n)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(37),
      o = e(3);
    r(r.S, "Reflect", {
      getPrototypeOf: function(t) {
        return i(o(t))
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Reflect", {
      has: function(t, n) {
        return n in t
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(3),
      o = Object.isExtensible;
    r(r.S, "Reflect", {
      isExtensible: function(t) {
        return i(t), !o || o(t)
      }
    })
  }, function(t, n, e) {
    var r = e(0);
    r(r.S, "Reflect", {
      ownKeys: e(124)
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(3),
      o = Object.preventExtensions;
    r(r.S, "Reflect", {
      preventExtensions: function(t) {
        i(t);
        try {
          return o && o(t), !0
        } catch (t) {
          return !1
        }
      }
    })
  }, function(t, n, e) {
    var r = e(9),
      i = e(22),
      o = e(37),
      u = e(13),
      a = e(0),
      c = e(30),
      s = e(3),
      f = e(4);
    a(a.S, "Reflect", {
      set: function t(n, e, a) {
        var l, h, d = arguments.length < 4 ? n : arguments[3],
          p = i.f(s(n), e);
        if (!p) {
          if (f(h = o(n))) return t(h, e, a, d);
          p = c(0)
        }
        if (u(p, "value")) {
          if (!1 === p.writable || !f(d)) return !1;
          if (l = i.f(d, e)) {
            if (l.get || l.set || !1 === l.writable) return !1;
            l.value = a, r.f(d, e, l)
          } else r.f(d, e, c(0, a));
          return !0
        }
        return void 0 !== p.set && (p.set.call(d, a), !0)
      }
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(67);
    i && r(r.S, "Reflect", {
      setPrototypeOf: function(t, n) {
        i.check(t, n);
        try {
          return i.set(t, n), !0
        } catch (t) {
          return !1
        }
      }
    })
  }, function(t, n, e) {
    e(276), t.exports = e(7).Array.includes
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(51)(!0);
    r(r.P, "Array", {
      includes: function(t) {
        return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }), e(38)("includes")
  }, function(t, n, e) {
    e(278), t.exports = e(7).Array.flatMap
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(279),
      o = e(10),
      u = e(6),
      a = e(20),
      c = e(112);
    r(r.P, "Array", {
      flatMap: function(t) {
        var n, e, r = o(this);
        return a(t), n = u(r.length), e = c(r, 0), i(e, r, r, n, 0, 1, t, arguments[1]), e
      }
    }), e(38)("flatMap")
  }, function(t, n, e) {
    "use strict";
    var r = e(53),
      i = e(4),
      o = e(6),
      u = e(19),
      a = e(5)("isConcatSpreadable");
    t.exports = function t(n, e, c, s, f, l, h, d) {
      for (var p, v, g = f, y = 0, m = !!h && u(h, d, 3); y < s;) {
        if (y in c) {
          if (p = m ? m(c[y], y, e) : c[y], v = !1, i(p) && (v = void 0 !== (v = p[a]) ? !!v : r(p)), v && l > 0) g = t(n, e, p, o(p.length), g, l - 1) - 1;
          else {
            if (g >= 9007199254740991) throw TypeError();
            n[g] = p
          }
          g++
        }
        y++
      }
      return g
    }
  }, function(t, n, e) {
    e(281), t.exports = e(7).String.padStart
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(125),
      o = e(59),
      u = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
    r(r.P + r.F * u, "String", {
      padStart: function(t) {
        return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !0)
      }
    })
  }, function(t, n, e) {
    e(283), t.exports = e(7).String.padEnd
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(125),
      o = e(59),
      u = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
    r(r.P + r.F * u, "String", {
      padEnd: function(t) {
        return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !1)
      }
    })
  }, function(t, n, e) {
    e(285), t.exports = e(7).String.trimLeft
  }, function(t, n, e) {
    "use strict";
    e(41)("trimLeft", (function(t) {
      return function() {
        return t(this, 1)
      }
    }), "trimStart")
  }, function(t, n, e) {
    e(287), t.exports = e(7).String.trimRight
  }, function(t, n, e) {
    "use strict";
    e(41)("trimRight", (function(t) {
      return function() {
        return t(this, 2)
      }
    }), "trimEnd")
  }, function(t, n, e) {
    e(289), t.exports = e(63).f("asyncIterator")
  }, function(t, n, e) {
    e(97)("asyncIterator")
  }, function(t, n, e) {
    e(291), t.exports = e(7).Object.getOwnPropertyDescriptors
  }, function(t, n, e) {
    var r = e(0),
      i = e(124),
      o = e(15),
      u = e(22),
      a = e(79);
    r(r.S, "Object", {
      getOwnPropertyDescriptors: function(t) {
        for (var n, e, r = o(t), c = u.f, s = i(r), f = {}, l = 0; s.length > l;) void 0 !== (e = c(r, n = s[l++])) && a(f, n, e);
        return f
      }
    })
  }, function(t, n, e) {
    e(293), t.exports = e(7).Object.values
  }, function(t, n, e) {
    var r = e(0),
      i = e(126)(!1);
    r(r.S, "Object", {
      values: function(t) {
        return i(t)
      }
    })
  }, function(t, n, e) {
    e(295), t.exports = e(7).Object.entries
  }, function(t, n, e) {
    var r = e(0),
      i = e(126)(!0);
    r(r.S, "Object", {
      entries: function(t) {
        return i(t)
      }
    })
  }, function(t, n, e) {
    "use strict";
    e(118), e(297), t.exports = e(7).Promise.finally
  }, function(t, n, e) {
    "use strict";
    var r = e(0),
      i = e(7),
      o = e(1),
      u = e(49),
      a = e(120);
    r(r.P + r.R, "Promise", {
      finally: function(t) {
        var n = u(this, i.Promise || o.Promise),
          e = "function" == typeof t;
        return this.then(e ? function(e) {
          return a(n, t()).then((function() {
            return e
          }))
        } : t, e ? function(e) {
          return a(n, t()).then((function() {
            throw e
          }))
        } : t)
      }
    })
  }, function(t, n, e) {
    e(299), e(300), e(301), t.exports = e(7)
  }, function(t, n, e) {
    var r = e(1),
      i = e(0),
      o = e(59),
      u = [].slice,
      a = /MSIE .\./.test(o),
      c = function(t) {
        return function(n, e) {
          var r = arguments.length > 2,
            i = !!r && u.call(arguments, 2);
          return t(r ? function() {
            ("function" == typeof n ? n : Function(n)).apply(this, i)
          } : n, e)
        }
      };
    i(i.G + i.B + i.F * a, {
      setTimeout: c(r.setTimeout),
      setInterval: c(r.setInterval)
    })
  }, function(t, n, e) {
    var r = e(0),
      i = e(85);
    r(r.G + r.B, {
      setImmediate: i.set,
      clearImmediate: i.clear
    })
  }, function(t, n, e) {
    for (var r = e(82), i = e(33), o = e(11), u = e(1), a = e(14), c = e(42), s = e(5), f = s("iterator"), l = s("toStringTag"), h = c.Array, d = {
        CSSRuleList: !0,
        CSSStyleDeclaration: !1,
        CSSValueList: !1,
        ClientRectList: !1,
        DOMRectList: !1,
        DOMStringList: !1,
        DOMTokenList: !0,
        DataTransferItemList: !1,
        FileList: !1,
        HTMLAllCollection: !1,
        HTMLCollection: !1,
        HTMLFormElement: !1,
        HTMLSelectElement: !1,
        MediaList: !0,
        MimeTypeArray: !1,
        NamedNodeMap: !1,
        NodeList: !0,
        PaintRequestList: !1,
        Plugin: !1,
        PluginArray: !1,
        SVGLengthList: !1,
        SVGNumberList: !1,
        SVGPathSegList: !1,
        SVGPointList: !1,
        SVGStringList: !1,
        SVGTransformList: !1,
        SourceBufferList: !1,
        StyleSheetList: !0,
        TextTrackCueList: !1,
        TextTrackList: !1,
        TouchList: !1
      }, p = i(d), v = 0; v < p.length; v++) {
      var g, y = p[v],
        m = d[y],
        b = u[y],
        S = b && b.prototype;
      if (S && (S[f] || a(S, f, h), S[l] || a(S, l, y), c[y] = h, m))
        for (g in r) S[g] || o(S, g, r[g], !0)
    }
  }, function(t, n, e) {
    var r = function(t) {
      "use strict";
      var n, e = Object.prototype,
        r = e.hasOwnProperty,
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        a = i.toStringTag || "@@toStringTag";

      function c(t, n, e, r) {
        var i = n && n.prototype instanceof v ? n : v,
          o = Object.create(i.prototype),
          u = new F(r || []);
        return o._invoke = function(t, n, e) {
          var r = f;
          return function(i, o) {
            if (r === h) throw new Error("Generator is already running");
            if (r === d) {
              if ("throw" === i) throw o;
              return E()
            }
            for (e.method = i, e.arg = o;;) {
              var u = e.delegate;
              if (u) {
                var a = x(u, e);
                if (a) {
                  if (a === p) continue;
                  return a
                }
              }
              if ("next" === e.method) e.sent = e._sent = e.arg;
              else if ("throw" === e.method) {
                if (r === f) throw r = d, e.arg;
                e.dispatchException(e.arg)
              } else "return" === e.method && e.abrupt("return", e.arg);
              r = h;
              var c = s(t, n, e);
              if ("normal" === c.type) {
                if (r = e.done ? d : l, c.arg === p) continue;
                return {
                  value: c.arg,
                  done: e.done
                }
              }
              "throw" === c.type && (r = d, e.method = "throw", e.arg = c.arg)
            }
          }
        }(t, e, u), o
      }

      function s(t, n, e) {
        try {
          return {
            type: "normal",
            arg: t.call(n, e)
          }
        } catch (t) {
          return {
            type: "throw",
            arg: t
          }
        }
      }
      t.wrap = c;
      var f = "suspendedStart",
        l = "suspendedYield",
        h = "executing",
        d = "completed",
        p = {};

      function v() {}

      function g() {}

      function y() {}
      var m = {};
      m[o] = function() {
        return this
      };
      var b = Object.getPrototypeOf,
        S = b && b(b(A([])));
      S && S !== e && r.call(S, o) && (m = S);
      var w = y.prototype = v.prototype = Object.create(m);

      function _(t) {
        ["next", "throw", "return"].forEach((function(n) {
          t[n] = function(t) {
            return this._invoke(n, t)
          }
        }))
      }

      function M(t) {
        var n;
        this._invoke = function(e, i) {
          function o() {
            return new Promise((function(n, o) {
              ! function n(e, i, o, u) {
                var a = s(t[e], t, i);
                if ("throw" !== a.type) {
                  var c = a.arg,
                    f = c.value;
                  return f && "object" == typeof f && r.call(f, "__await") ? Promise.resolve(f.__await).then((function(t) {
                    n("next", t, o, u)
                  }), (function(t) {
                    n("throw", t, o, u)
                  })) : Promise.resolve(f).then((function(t) {
                    c.value = t, o(c)
                  }), (function(t) {
                    return n("throw", t, o, u)
                  }))
                }
                u(a.arg)
              }(e, i, n, o)
            }))
          }
          return n = n ? n.then(o, o) : o()
        }
      }

      function x(t, e) {
        var r = t.iterator[e.method];
        if (r === n) {
          if (e.delegate = null, "throw" === e.method) {
            if (t.iterator.return && (e.method = "return", e.arg = n, x(t, e), "throw" === e.method)) return p;
            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
          }
          return p
        }
        var i = s(r, t.iterator, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, p;
        var o = i.arg;
        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = n), e.delegate = null, p) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
      }

      function P(t) {
        var n = {
          tryLoc: t[0]
        };
        1 in t && (n.catchLoc = t[1]), 2 in t && (n.finallyLoc = t[2], n.afterLoc = t[3]), this.tryEntries.push(n)
      }

      function O(t) {
        var n = t.completion || {};
        n.type = "normal", delete n.arg, t.completion = n
      }

      function F(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(P, this), this.reset(!0)
      }

      function A(t) {
        if (t) {
          var e = t[o];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var i = -1,
              u = function e() {
                for (; ++i < t.length;)
                  if (r.call(t, i)) return e.value = t[i], e.done = !1, e;
                return e.value = n, e.done = !0, e
              };
            return u.next = u
          }
        }
        return {
          next: E
        }
      }

      function E() {
        return {
          value: n,
          done: !0
        }
      }
      return g.prototype = w.constructor = y, y.constructor = g, y[a] = g.displayName = "GeneratorFunction", t.isGeneratorFunction = function(t) {
        var n = "function" == typeof t && t.constructor;
        return !!n && (n === g || "GeneratorFunction" === (n.displayName || n.name))
      }, t.mark = function(t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, a in t || (t[a] = "GeneratorFunction")), t.prototype = Object.create(w), t
      }, t.awrap = function(t) {
        return {
          __await: t
        }
      }, _(M.prototype), M.prototype[u] = function() {
        return this
      }, t.AsyncIterator = M, t.async = function(n, e, r, i) {
        var o = new M(c(n, e, r, i));
        return t.isGeneratorFunction(e) ? o : o.next().then((function(t) {
          return t.done ? t.value : o.next()
        }))
      }, _(w), w[a] = "Generator", w[o] = function() {
        return this
      }, w.toString = function() {
        return "[object Generator]"
      }, t.keys = function(t) {
        var n = [];
        for (var e in t) n.push(e);
        return n.reverse(),
          function e() {
            for (; n.length;) {
              var r = n.pop();
              if (r in t) return e.value = r, e.done = !1, e
            }
            return e.done = !0, e
          }
      }, t.values = A, F.prototype = {
        constructor: F,
        reset: function(t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(O), !t)
            for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = n)
        },
        stop: function() {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval
        },
        dispatchException: function(t) {
          if (this.done) throw t;
          var e = this;

          function i(r, i) {
            return a.type = "throw", a.arg = t, e.next = r, i && (e.method = "next", e.arg = n), !!i
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var u = this.tryEntries[o],
              a = u.completion;
            if ("root" === u.tryLoc) return i("end");
            if (u.tryLoc <= this.prev) {
              var c = r.call(u, "catchLoc"),
                s = r.call(u, "finallyLoc");
              if (c && s) {
                if (this.prev < u.catchLoc) return i(u.catchLoc, !0);
                if (this.prev < u.finallyLoc) return i(u.finallyLoc)
              } else if (c) {
                if (this.prev < u.catchLoc) return i(u.catchLoc, !0)
              } else {
                if (!s) throw new Error("try statement without catch or finally");
                if (this.prev < u.finallyLoc) return i(u.finallyLoc)
              }
            }
          }
        },
        abrupt: function(t, n) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var i = this.tryEntries[e];
            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
              var o = i;
              break
            }
          }
          o && ("break" === t || "continue" === t) && o.tryLoc <= n && n <= o.finallyLoc && (o = null);
          var u = o ? o.completion : {};
          return u.type = t, u.arg = n, o ? (this.method = "next", this.next = o.finallyLoc, p) : this.complete(u)
        },
        complete: function(t, n) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && n && (this.next = n), p
        },
        finish: function(t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var e = this.tryEntries[n];
            if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), O(e), p
          }
        },
        catch: function(t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var e = this.tryEntries[n];
            if (e.tryLoc === t) {
              var r = e.completion;
              if ("throw" === r.type) {
                var i = r.arg;
                O(e)
              }
              return i
            }
          }
          throw new Error("illegal catch attempt")
        },
        delegateYield: function(t, e, r) {
          return this.delegate = {
            iterator: A(t),
            resultName: e,
            nextLoc: r
          }, "next" === this.method && (this.arg = n), p
        }
      }, t
    }(t.exports);
    try {
      regeneratorRuntime = r
    } catch (t) {
      Function("r", "regeneratorRuntime = r")(r)
    }
  }, function(t, n, e) {
    e(304), t.exports = e(127).global
  }, function(t, n, e) {
    var r = e(305);
    r(r.G, {
      global: e(87)
    })
  }, function(t, n, e) {
    var r = e(87),
      i = e(127),
      o = e(306),
      u = e(308),
      a = e(315),
      c = function(t, n, e) {
        var s, f, l, h = t & c.F,
          d = t & c.G,
          p = t & c.S,
          v = t & c.P,
          g = t & c.B,
          y = t & c.W,
          m = d ? i : i[n] || (i[n] = {}),
          b = m.prototype,
          S = d ? r : p ? r[n] : (r[n] || {}).prototype;
        for (s in d && (e = n), e)(f = !h && S && void 0 !== S[s]) && a(m, s) || (l = f ? S[s] : e[s], m[s] = d && "function" != typeof S[s] ? e[s] : g && f ? o(l, r) : y && S[s] == l ? function(t) {
          var n = function(n, e, r) {
            if (this instanceof t) {
              switch (arguments.length) {
                case 0:
                  return new t;
                case 1:
                  return new t(n);
                case 2:
                  return new t(n, e)
              }
              return new t(n, e, r)
            }
            return t.apply(this, arguments)
          };
          return n.prototype = t.prototype, n
        }(l) : v && "function" == typeof l ? o(Function.call, l) : l, v && ((m.virtual || (m.virtual = {}))[s] = l, t & c.R && b && !b[s] && u(b, s, l)))
      };
    c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c
  }, function(t, n, e) {
    var r = e(307);
    t.exports = function(t, n, e) {
      if (r(t), void 0 === n) return t;
      switch (e) {
        case 1:
          return function(e) {
            return t.call(n, e)
          };
        case 2:
          return function(e, r) {
            return t.call(n, e, r)
          };
        case 3:
          return function(e, r, i) {
            return t.call(n, e, r, i)
          }
      }
      return function() {
        return t.apply(n, arguments)
      }
    }
  }, function(t, n) {
    t.exports = function(t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t
    }
  }, function(t, n, e) {
    var r = e(309),
      i = e(314);
    t.exports = e(89) ? function(t, n, e) {
      return r.f(t, n, i(1, e))
    } : function(t, n, e) {
      return t[n] = e, t
    }
  }, function(t, n, e) {
    var r = e(310),
      i = e(311),
      o = e(313),
      u = Object.defineProperty;
    n.f = e(89) ? Object.defineProperty : function(t, n, e) {
      if (r(t), n = o(n, !0), r(e), i) try {
        return u(t, n, e)
      } catch (t) {}
      if ("get" in e || "set" in e) throw TypeError("Accessors not supported!");
      return "value" in e && (t[n] = e.value), t
    }
  }, function(t, n, e) {
    var r = e(88);
    t.exports = function(t) {
      if (!r(t)) throw TypeError(t + " is not an object!");
      return t
    }
  }, function(t, n, e) {
    t.exports = !e(89) && !e(128)((function() {
      return 7 != Object.defineProperty(e(312)("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    }))
  }, function(t, n, e) {
    var r = e(88),
      i = e(87).document,
      o = r(i) && r(i.createElement);
    t.exports = function(t) {
      return o ? i.createElement(t) : {}
    }
  }, function(t, n, e) {
    var r = e(88);
    t.exports = function(t, n) {
      if (!r(t)) return t;
      var e, i;
      if (n && "function" == typeof(e = t.toString) && !r(i = e.call(t))) return i;
      if ("function" == typeof(e = t.valueOf) && !r(i = e.call(t))) return i;
      if (!n && "function" == typeof(e = t.toString) && !r(i = e.call(t))) return i;
      throw TypeError("Can't convert object to primitive value")
    }
  }, function(t, n) {
    t.exports = function(t, n) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: n
      }
    }
  }, function(t, n) {
    var e = {}.hasOwnProperty;
    t.exports = function(t, n) {
      return e.call(t, n)
    }
  }])
}));
/*!
 * Bootstrap v4.6.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, (function(exports, $) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var $__default = /*#__PURE__*/ _interopDefaultLegacy($);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default['default'](this).one(Util.TRANSITION_END, function() {
      called = true;
    });
    setTimeout(function() {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default['default'](element).css('transition-duration');
      var transitionDelay = $__default['default'](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default['default'](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.6.0';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/ function() {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default['default'](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default['default'].Event(EVENT_CLOSE);
      $__default['default'](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default['default'](element).removeClass(CLASS_NAME_SHOW);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default['default'](element).one(Util.TRANSITION_END, function(event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default['default'](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function(event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Alert._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Alert;

  $__default['default'].fn[NAME].noConflict = function() {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.6.0';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/ function() {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function() {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$1, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function(event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function(event) {
    var button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
    $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default['default'](window).on(EVENT_LOAD_DATA_API, function() {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Button._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Button;

  $__default['default'].fn[NAME$1].noConflict = function() {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.6.0';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/ function() {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default['default'](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default['default'](this._element).one(EVENT_SLID, function() {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default['default'](this._element).off(EVENT_KEY$2);
      $__default['default'].removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default['default'](this._element).on(EVENT_KEYDOWN, function(event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element).on(EVENT_MOUSEENTER, function(event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function(event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function(event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function(e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, function(event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_POINTERUP, function(event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, function(event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, function(event) {
          return move(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHEND, function(event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default['default'](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._updateInterval = function _updateInterval() {
      var element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      if (!element) {
        return;
      }

      var elementInterval = parseInt(element.getAttribute('data-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;
      var slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);
        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default['default'](activeElement).one(Util.TRANSITION_END, function() {
          $__default['default'](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function() {
            return $__default['default'](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $__default['default'](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, function() {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default['default'](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = Carousel;

  $__default['default'].fn[NAME$2].noConflict = function() {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.6.0';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/ function() {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function(foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function(elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default['default'].Event(EVENT_SHOW);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $__default['default'](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default['default'](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default['default'](_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $__default['default'].Event(EVENT_HIDE);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default['default'](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default['default'](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default['default'](children).each(function(i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $__default['default'](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function(event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default['default'](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default['default'](selectors).each(function() {
      var $target = $__default['default'](this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Collapse;

  $__default['default'].fn[NAME$3].noConflict = function() {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function() {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function() {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function() {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function() {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function() {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
   * Create a debounced version of a method, that's asynchronously deferred
   * but called in the minimum time possible.
   *
   * @method
   * @memberof Popper.Utils
   * @argument {Function} fn
   * @returns {Function}
   */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = {
      top: 0,
      left: 0
    };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
      height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function(key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function(a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function(_ref2) {
      var width = _ref2.width,
        height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function(cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function(obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function(modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function(_ref) {
      var name = _ref.name,
        enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, {
      passive: true
    });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, {
      passive: true
    });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function(target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function(prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function(prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, {
      position: options.positionFixed ? 'fixed' : 'absolute'
    });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
    var round = Math.round,
      floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
      y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
      top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function(_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function(modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function(step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function(frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function(frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function(op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
        // This aggregates any `+` or `-` sign that aren't considered operators
        // e.g.: 10 + +5 => [10, +, +5]
        .reduce(function(a, b) {
          if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
            a[a.length - 1] = b;
            mergeWithPrevious = true;
            return a;
          } else if (mergeWithPrevious) {
            a[a.length - 1] += b;
            mergeWithPrevious = false;
            return a;
          } else {
            return a.concat(b);
          }
        }, [])
        // Here we convert the string values into number values (in px)
        .map(function(str) {
          return toValue(str, measurement, popperOffsets, referenceOffsets);
        });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function(op, index) {
      op.forEach(function(frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function(placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function(modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function() {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function() {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function(name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
          return _extends$1({
            name: name
          }, _this.options.modifiers[name]);
        })
        // sort the modifiers by order
        .sort(function(a, b) {
          return a.order - b.order;
        });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function(modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.6.0';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/ function() {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default['default'].Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Totally disable Popper for Dropdowns in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$4);
      $__default['default'](this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default['default'](this._element).on(EVENT_CLICK, function(event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default['default'](this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default['default'](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function(data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default['default'](toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default['default'].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $__default['default'](parent).removeClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function(item) {
        return $__default['default'](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function(event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function(e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function() {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.6.0';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/ function() {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function(event) {
        return _this.hide(event);
      });
      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function() {
        $__default['default'](_this._element).one(EVENT_MOUSEUP_DISMISS, function(event) {
          if ($__default['default'](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function() {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$2);
      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$3);
      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, function(event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function(htmlElement) {
        return $__default['default'](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      var hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);
      $__default['default'](this._element).trigger(hideEventPrevented);

      if (hideEventPrevented.isDefaultPrevented()) {
        return;
      }

      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
      $__default['default'](this._element).off(Util.TRANSITION_END);
      $__default['default'](this._element).one(Util.TRANSITION_END, function() {
        _this3._element.classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          $__default['default'](_this3._element).one(Util.TRANSITION_END, function() {
            _this3._element.style.overflowY = '';
          }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
        }
      }).emulateTransitionEnd(modalTransitionDuration);

      this._element.focus();
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default['default'](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default['default'](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
        .on(EVENT_FOCUSIN, function(event) {
          if (document !== event.target && _this5._element !== event.target && $__default['default'](_this5._element).has(event.target).length === 0) {
            _this5._element.focus();
          }
        });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, function(event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, function(event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function() {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default['default'](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);
        $__default['default'](this._element).on(EVENT_CLICK_DISMISS, function(event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this9._config.backdrop === 'static') {
            _this9._triggerBackdropTransition();
          } else {
            _this9.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default['default'](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default['default'](fixedContent).each(function(index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default['default'](stickyContent).each(function(index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each(function(index, element) {
        var padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default['default'](elements).each(function(index, element) {
        var margin = $__default['default'](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function() {
        var data = $__default['default'](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $__default['default'](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function(event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default['default'](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default['default'](target).one(EVENT_SHOW$2, function(showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function() {
        if ($__default['default'](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;

  $__default['default'].fn[NAME$5].noConflict = function() {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function(attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function(attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.6.0';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/ function() {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default['default'](tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $__default['default'](tip).addClass(CLASS_NAME_SHOW$4);
        $__default['default'](tip).addClass(this.config.customClass); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default['default'](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default['default'](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function(data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default['default'](this.config.container);
      }

      return $__default['default'](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function(trigger) {
        if (trigger === 'click') {
          $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function(event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function(event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function(event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function() {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function() {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function() {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default['default'](this.element).data();
      Object.keys(dataAttributes).forEach(function(dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$6] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Tooltip;

  $__default['default'].fn[NAME$6].noConflict = function() {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.6.0';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/ function(_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default['default'](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$7] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Popover;

  $__default['default'].fn[NAME$7].noConflict = function() {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.6.0';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/ function() {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function(event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function(element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function(item) {
        return item;
      }).sort(function(a, b) {
        return a[0] - b[0];
      }).forEach(function(item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$8);
      $__default['default'](this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function(selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function(node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function(node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, function() {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = ScrollSpy;

  $__default['default'].fn[NAME$8].noConflict = function() {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.6.0';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/ function() {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE$3) || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $__default['default'].Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default['default'].Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default['default'](container).find(SELECTOR_ACTIVE_UL) : $__default['default'](container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default['default'](active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default['default'](active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $__default['default'](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $this = $__default['default'](this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function(event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default['default'](this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Tab;

  $__default['default'].fn[NAME$9].noConflict = function() {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.6.0';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/ function() {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $__default['default'](_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function() {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'].removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $__default['default'](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function() {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default['default'](_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$a] = Toast._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toast;

  $__default['default'].fn[NAME$a].noConflict = function() {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

})));
//# sourceMappingURL=bootstrap.bundle.js.map

/*!
 * jQuery Sticky Footer v1.2.3
 *
 * Copyright 2014 miWebb
 * Released under the MIT license
 */

(function($, window, undefined) {
  'use strict';

  $.fn.stickyFooter = function(options) {
    // Options
    var options = $.extend({}, $.fn.stickyFooter.defaults, options);

    // Element
    var element = this;

    // Initialize
    stickyFooter(element, options);

    // Resize event
    $(window).resize(function() {
      stickyFooter(element, options);
    });

    // Chain
    return this;
  }

  $.fn.stickyFooter.defaults = {
    class: 'sticky-footer',
    frame: '',
    content: '#page'
  }

  function stickyFooter(element, options) {
    // Set footer height
    var height = $(element).outerHeight(true);

    // Add content height
    $(options.content).each(function() {
      height += $(this).outerHeight(true);
    });

    // Add the sitcky footer class if the footer & content height are smaller then the frame height
    if (height < $(options.frame ? options.frame : element.parent()).height()) {
      $(element).addClass(options.class);
    } else {
      $(element).removeClass(options.class);
    }
  }
})(jQuery, window);

/* ==== Namespace to hold all variables and methods. ==== */
var app = {};
/* ==== OS and Browser Detection ==== */
app.browserDetection = function() {
  var browser = bowser.getParser(window.navigator.userAgent);
  var currentOSName = browser.getOSName();
  var currentBrowserName = browser.getBrowserName();
  $('body').addClass(currentOSName);
  $('body').addClass(currentBrowserName);
};
/* ==== Sticky Footer ==== */
app.stickyFooter = function() {
  $(window).on('load', function() {
    $("#footer").stickyFooter();
  });
};
/* ==== Initializing all Code within one INIT function. ==== */
app.init = function() {
  //All functions etc needed for Site.
  app.browserDetection();
  app.stickyFooter();
};
/* ==== Initializing the JS for the Website Inside the Document Ready - Calling the INIT Function ==== */
$(document).ready(function() {
  // console.log('JS Ready');
  app.init();
});