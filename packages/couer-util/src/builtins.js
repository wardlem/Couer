
const builtinMap = new Map([
    [Array,  'Array'],
    [ArrayBuffer, 'ArrayBuffer'],
    // [Atomics, 'Atomics'],
    [Boolean, 'Boolean'],
    [DataView, 'DataView'],
    [Date, 'Date'],
    [Error, 'Error'],
    [EvalError, 'EvalError'],
    [Float32Array, 'Float32Array'],
    [Float64Array, 'Float64Array'],
    [Function, 'Function'],
    // [Generator, 'Generator'],
    // [GeneratorFunction, 'GeneratorFunction'],
    [Int16Array, 'Int16Array'],
    [Int32Array, 'Int32Array'],
    [Int8Array, 'Int8Array'],
    // [InternalError, 'InternalError'],
    [Intl, 'Intl'],
    [Intl.Collator, 'Intl.Collator'],
    [Intl.DateTimeFormat, 'Intl.DateTimeFormat'],
    [Intl.NumberFormat, 'Intl.NumberFormat'],
    [JSON, 'JSON'],
    [Map, 'Map'],
    [Math, 'Math'],
    [Number, 'Number'],
    [Object, 'Object'],
    [Promise, 'Promise'],
    [Proxy, 'Proxy'],
    [RangeError, 'RangeError'],
    [ReferenceError, 'ReferenceError'],
    [Reflect, 'Reflect'],
    [RegExp, 'RegExp'],
    [Set, 'Set'],
    // [SharedArrayBuffer, 'SharedArrayBuffer'],
    [String, 'String'],
    [Symbol, 'Symbol'],
    [SyntaxError, 'SyntaxError'],
    [TypeError, 'TypeError'],
    [URIError, 'URIError'],
    [Uint16Array, 'Uint16Array'],
    [Uint32Array, 'Uint32Array'],
    [Uint8Array, 'Uint8Array'],
    [Uint8ClampedArray, 'UintClampedArray'],
    [WeakMap, 'WeakMap'],
    [WeakSet, 'WeakSet'],
    [decodeURI, 'decodeURI'],
    [decodeURIComponent, 'decodeURIComponent'],
    [encodeURI, 'encodeURI'],
    [encodeURIComponent, 'encodeURIComponent'],
    [escape, 'escape'],
    [eval, 'eval'],
    [isFinite, 'isFinite'],
    [isNaN, 'isNaN'],
    [parseFloat, 'parseFloat'],
    [parseInt, 'parseInt'],
    [unescape, 'unescape'],
]);

module.exports = builtinMap;
