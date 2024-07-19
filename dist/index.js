var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/evm/contracts/factories/index.ts
var factories_exports = {};
__export(factories_exports, {
  SimpleApplication__factory: () => SimpleApplication__factory,
  vIbcEscrowSol: () => vIBCEscrow_exports
});

// src/evm/contracts/factories/vIBCEscrow.sol/index.ts
var vIBCEscrow_exports = {};
__export(vIBCEscrow_exports, {
  IncentivizedPolymerEscrow__factory: () => IncentivizedPolymerEscrow__factory
});

// node_modules/ethers/lib.esm/_version.js
var version = "6.13.1";

// node_modules/ethers/lib.esm/utils/properties.js
function checkType(value, type, name) {
  const types = type.split("|").map((t) => t.trim());
  for (let i = 0; i < types.length; i++) {
    switch (type) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof value === type) {
          return;
        }
    }
  }
  const error = new Error(`invalid value for type ${type}`);
  error.code = "INVALID_ARGUMENT";
  error.argument = `value.${name}`;
  error.value = value;
  throw error;
}
async function resolveProperties(value) {
  const keys = Object.keys(value);
  const results = await Promise.all(keys.map((k) => Promise.resolve(value[k])));
  return results.reduce((accum, v, index) => {
    accum[keys[index]] = v;
    return accum;
  }, {});
}
function defineProperties(target, values, types) {
  for (let key in values) {
    let value = values[key];
    const type = types ? types[key] : null;
    if (type) {
      checkType(value, type, key);
    }
    Object.defineProperty(target, key, { enumerable: true, value, writable: false });
  }
}

// node_modules/ethers/lib.esm/utils/errors.js
function stringify(value) {
  if (value == null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "[ " + value.map(stringify).join(", ") + " ]";
  }
  if (value instanceof Uint8Array) {
    const HEX = "0123456789abcdef";
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      result += HEX[value[i] >> 4];
      result += HEX[value[i] & 15];
    }
    return result;
  }
  if (typeof value === "object" && typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  switch (typeof value) {
    case "boolean":
    case "symbol":
      return value.toString();
    case "bigint":
      return BigInt(value).toString();
    case "number":
      return value.toString();
    case "string":
      return JSON.stringify(value);
    case "object": {
      const keys = Object.keys(value);
      keys.sort();
      return "{ " + keys.map((k) => `${stringify(k)}: ${stringify(value[k])}`).join(", ") + " }";
    }
  }
  return `[ COULD NOT SERIALIZE ]`;
}
function isError(error, code) {
  return error && error.code === code;
}
function isCallException(error) {
  return isError(error, "CALL_EXCEPTION");
}
function makeError(message, code, info) {
  let shortMessage = message;
  {
    const details = [];
    if (info) {
      if ("message" in info || "code" in info || "name" in info) {
        throw new Error(`value will overwrite populated values: ${stringify(info)}`);
      }
      for (const key in info) {
        if (key === "shortMessage") {
          continue;
        }
        const value = info[key];
        details.push(key + "=" + stringify(value));
      }
    }
    details.push(`code=${code}`);
    details.push(`version=${version}`);
    if (details.length) {
      message += " (" + details.join(", ") + ")";
    }
  }
  let error;
  switch (code) {
    case "INVALID_ARGUMENT":
      error = new TypeError(message);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      error = new RangeError(message);
      break;
    default:
      error = new Error(message);
  }
  defineProperties(error, { code });
  if (info) {
    Object.assign(error, info);
  }
  if (error.shortMessage == null) {
    defineProperties(error, { shortMessage });
  }
  return error;
}
function assert(check, message, code, info) {
  if (!check) {
    throw makeError(message, code, info);
  }
}
function assertArgument(check, message, name, value) {
  assert(check, message, "INVALID_ARGUMENT", { argument: name, value });
}
function assertArgumentCount(count, expectedCount, message) {
  if (message == null) {
    message = "";
  }
  if (message) {
    message = ": " + message;
  }
  assert(count >= expectedCount, "missing arguemnt" + message, "MISSING_ARGUMENT", {
    count,
    expectedCount
  });
  assert(count <= expectedCount, "too many arguments" + message, "UNEXPECTED_ARGUMENT", {
    count,
    expectedCount
  });
}
var _normalizeForms = ["NFD", "NFC", "NFKD", "NFKC"].reduce((accum, form) => {
  try {
    if ("test".normalize(form) !== "test") {
      throw new Error("bad");
    }
    ;
    if (form === "NFD") {
      const check = String.fromCharCode(233).normalize("NFD");
      const expected = String.fromCharCode(101, 769);
      if (check !== expected) {
        throw new Error("broken");
      }
    }
    accum.push(form);
  } catch (error) {
  }
  return accum;
}, []);
function assertNormalize(form) {
  assert(_normalizeForms.indexOf(form) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form }
  });
}
function assertPrivate(givenGuard, guard, className) {
  if (className == null) {
    className = "";
  }
  if (givenGuard !== guard) {
    let method = className, operation = "new";
    if (className) {
      method += ".";
      operation += " " + className;
    }
    assert(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", {
      operation
    });
  }
}

// node_modules/ethers/lib.esm/utils/data.js
function _getBytes(value, name, copy) {
  if (value instanceof Uint8Array) {
    if (copy) {
      return new Uint8Array(value);
    }
    return value;
  }
  if (typeof value === "string" && value.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const result = new Uint8Array((value.length - 2) / 2);
    let offset = 2;
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(value.substring(offset, offset + 2), 16);
      offset += 2;
    }
    return result;
  }
  assertArgument(false, "invalid BytesLike value", name || "value", value);
}
function getBytes(value, name) {
  return _getBytes(value, name, false);
}
function getBytesCopy(value, name) {
  return _getBytes(value, name, true);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (typeof length === "number" && value.length !== 2 + 2 * length) {
    return false;
  }
  if (length === true && value.length % 2 !== 0) {
    return false;
  }
  return true;
}
function isBytesLike(value) {
  return isHexString(value, true) || value instanceof Uint8Array;
}
var HexCharacters = "0123456789abcdef";
function hexlify(data) {
  const bytes2 = getBytes(data);
  let result = "0x";
  for (let i = 0; i < bytes2.length; i++) {
    const v = bytes2[i];
    result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
  }
  return result;
}
function concat(datas) {
  return "0x" + datas.map((d) => hexlify(d).substring(2)).join("");
}
function dataSlice(data, start, end) {
  const bytes2 = getBytes(data);
  if (end != null && end > bytes2.length) {
    assert(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
      buffer: bytes2,
      length: bytes2.length,
      offset: end
    });
  }
  return hexlify(bytes2.slice(start == null ? 0 : start, end == null ? bytes2.length : end));
}
function zeroPad(data, length, left) {
  const bytes2 = getBytes(data);
  assert(length >= bytes2.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(bytes2),
    length,
    offset: length + 1
  });
  const result = new Uint8Array(length);
  result.fill(0);
  if (left) {
    result.set(bytes2, length - bytes2.length);
  } else {
    result.set(bytes2, 0);
  }
  return hexlify(result);
}
function zeroPadValue(data, length) {
  return zeroPad(data, length, true);
}
function zeroPadBytes(data, length) {
  return zeroPad(data, length, false);
}

// node_modules/ethers/lib.esm/utils/maths.js
var BN_0 = BigInt(0);
var BN_1 = BigInt(1);
var maxValue = 9007199254740991;
function fromTwos(_value, _width) {
  const value = getUint(_value, "value");
  const width = BigInt(getNumber(_width, "width"));
  assert(value >> width === BN_0, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: _value
  });
  if (value >> width - BN_1) {
    const mask2 = (BN_1 << width) - BN_1;
    return -((~value & mask2) + BN_1);
  }
  return value;
}
function toTwos(_value, _width) {
  let value = getBigInt(_value, "value");
  const width = BigInt(getNumber(_width, "width"));
  const limit = BN_1 << width - BN_1;
  if (value < BN_0) {
    value = -value;
    assert(value <= limit, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: _value
    });
    const mask2 = (BN_1 << width) - BN_1;
    return (~value & mask2) + BN_1;
  } else {
    assert(value < limit, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: _value
    });
  }
  return value;
}
function mask(_value, _bits) {
  const value = getUint(_value, "value");
  const bits = BigInt(getNumber(_bits, "bits"));
  return value & (BN_1 << bits) - BN_1;
}
function getBigInt(value, name) {
  switch (typeof value) {
    case "bigint":
      return value;
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return BigInt(value);
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        if (value[0] === "-" && value[1] !== "-") {
          return -BigInt(value.substring(1));
        }
        return BigInt(value);
      } catch (e) {
        assertArgument(false, `invalid BigNumberish string: ${e.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid BigNumberish value", name || "value", value);
}
function getUint(value, name) {
  const result = getBigInt(value, name);
  assert(result >= BN_0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value
  });
  return result;
}
var Nibbles = "0123456789abcdef";
function toBigInt(value) {
  if (value instanceof Uint8Array) {
    let result = "0x0";
    for (const v of value) {
      result += Nibbles[v >> 4];
      result += Nibbles[v & 15];
    }
    return BigInt(result);
  }
  return getBigInt(value);
}
function getNumber(value, name) {
  switch (typeof value) {
    case "bigint":
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return Number(value);
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return value;
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        return getNumber(BigInt(value), name);
      } catch (e) {
        assertArgument(false, `invalid numeric string: ${e.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid numeric value", name || "value", value);
}
function toNumber(value) {
  return getNumber(toBigInt(value));
}
function toBeHex(_value, _width) {
  const value = getUint(_value, "value");
  let result = value.toString(16);
  if (_width == null) {
    if (result.length % 2) {
      result = "0" + result;
    }
  } else {
    const width = getNumber(_width, "width");
    assert(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: _value
    });
    while (result.length < width * 2) {
      result = "0" + result;
    }
  }
  return "0x" + result;
}
function toBeArray(_value) {
  const value = getUint(_value, "value");
  if (value === BN_0) {
    return new Uint8Array([]);
  }
  let hex = value.toString(16);
  if (hex.length % 2) {
    hex = "0" + hex;
  }
  const result = new Uint8Array(hex.length / 2);
  for (let i = 0; i < result.length; i++) {
    const offset = i * 2;
    result[i] = parseInt(hex.substring(offset, offset + 2), 16);
  }
  return result;
}

// node_modules/ethers/lib.esm/utils/events.js
var EventPayload = class {
  /**
   *  The event filter.
   */
  filter;
  /**
   *  The **EventEmitterable**.
   */
  emitter;
  #listener;
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(emitter, listener, filter) {
    this.#listener = listener;
    defineProperties(this, { emitter, filter });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    if (this.#listener == null) {
      return;
    }
    await this.emitter.off(this.filter, this.#listener);
  }
};

// node_modules/ethers/lib.esm/utils/utf8.js
function errorFunc(reason, offset, bytes2, output2, badCodepoint) {
  assertArgument(false, `invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes2);
}
function ignoreFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === "BAD_PREFIX" || reason === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = offset + 1; o < bytes2.length; o++) {
      if (bytes2[o] >> 6 !== 2) {
        break;
      }
      i++;
    }
    return i;
  }
  if (reason === "OVERRUN") {
    return bytes2.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === "OVERLONG") {
    assertArgument(typeof badCodepoint === "number", "invalid bad code point for replacement", "badCodepoint", badCodepoint);
    output2.push(badCodepoint);
    return 0;
  }
  output2.push(65533);
  return ignoreFunc(reason, offset, bytes2, output2, badCodepoint);
}
var Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
});
function getUtf8CodePoints(_bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  const bytes2 = getBytes(_bytes, "bytes");
  const result = [];
  let i = 0;
  while (i < bytes2.length) {
    const c = bytes2[i++];
    if (c >> 7 === 0) {
      result.push(c);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c & 192) === 128) {
        i += onError("UNEXPECTED_CONTINUE", i - 1, bytes2, result);
      } else {
        i += onError("BAD_PREFIX", i - 1, bytes2, result);
      }
      continue;
    }
    if (i - 1 + extraLength >= bytes2.length) {
      i += onError("OVERRUN", i - 1, bytes2, result);
      continue;
    }
    let res = c & (1 << 8 - extraLength - 1) - 1;
    for (let j = 0; j < extraLength; j++) {
      let nextChar = bytes2[i];
      if ((nextChar & 192) != 128) {
        i += onError("MISSING_CONTINUE", i, bytes2, result);
        res = null;
        break;
      }
      ;
      res = res << 6 | nextChar & 63;
      i++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i += onError("OUT_OF_RANGE", i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i += onError("UTF16_SURROGATE", i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i += onError("OVERLONG", i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form) {
  assertArgument(typeof str === "string", "invalid string value", "str", str);
  if (form != null) {
    assertNormalize(form);
    str = str.normalize(form);
  }
  let result = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      result.push(c);
    } else if (c < 2048) {
      result.push(c >> 6 | 192);
      result.push(c & 63 | 128);
    } else if ((c & 64512) == 55296) {
      i++;
      const c2 = str.charCodeAt(i);
      assertArgument(i < str.length && (c2 & 64512) === 56320, "invalid surrogate pair", "str", str);
      const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c >> 12 | 224);
      result.push(c >> 6 & 63 | 128);
      result.push(c & 63 | 128);
    }
  }
  return new Uint8Array(result);
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes2, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes2, onError));
}

// node_modules/ethers/lib.esm/utils/rlp-encode.js
function arrayifyInteger(value) {
  const result = [];
  while (value) {
    result.unshift(value & 255);
    value >>= 8;
  }
  return result;
}
function _encode(object) {
  if (Array.isArray(object)) {
    let payload = [];
    object.forEach(function(child) {
      payload = payload.concat(_encode(child));
    });
    if (payload.length <= 55) {
      payload.unshift(192 + payload.length);
      return payload;
    }
    const length2 = arrayifyInteger(payload.length);
    length2.unshift(247 + length2.length);
    return length2.concat(payload);
  }
  const data = Array.prototype.slice.call(getBytes(object, "object"));
  if (data.length === 1 && data[0] <= 127) {
    return data;
  } else if (data.length <= 55) {
    data.unshift(128 + data.length);
    return data;
  }
  const length = arrayifyInteger(data.length);
  length.unshift(183 + length.length);
  return length.concat(data);
}
var nibbles = "0123456789abcdef";
function encodeRlp(object) {
  let result = "0x";
  for (const v of _encode(object)) {
    result += nibbles[v >> 4];
    result += nibbles[v & 15];
  }
  return result;
}

// node_modules/ethers/lib.esm/abi/coders/abstract-coder.js
var WordSize = 32;
var Padding = new Uint8Array(WordSize);
var passProperties = ["then"];
var _guard = {};
var resultNames = /* @__PURE__ */ new WeakMap();
function getNames(result) {
  return resultNames.get(result);
}
function setNames(result, names) {
  resultNames.set(result, names);
}
function throwError(name, error) {
  const wrapped = new Error(`deferred error during ABI decoding triggered accessing ${name}`);
  wrapped.error = error;
  throw wrapped;
}
function toObject(names, items, deep) {
  if (names.indexOf(null) >= 0) {
    return items.map((item, index) => {
      if (item instanceof Result) {
        return toObject(getNames(item), item, deep);
      }
      return item;
    });
  }
  return names.reduce((accum, name, index) => {
    let item = items.getValue(name);
    if (!(name in accum)) {
      if (deep && item instanceof Result) {
        item = toObject(getNames(item), item, deep);
      }
      accum[name] = item;
    }
    return accum;
  }, {});
}
var Result = class _Result extends Array {
  // No longer used; but cannot be removed as it will remove the
  // #private field from the .d.ts which may break backwards
  // compatibility
  #names;
  /**
   *  @private
   */
  constructor(...args) {
    const guard = args[0];
    let items = args[1];
    let names = (args[2] || []).slice();
    let wrap = true;
    if (guard !== _guard) {
      items = args;
      names = [];
      wrap = false;
    }
    super(items.length);
    items.forEach((item, index) => {
      this[index] = item;
    });
    const nameCounts = names.reduce((accum, name) => {
      if (typeof name === "string") {
        accum.set(name, (accum.get(name) || 0) + 1);
      }
      return accum;
    }, /* @__PURE__ */ new Map());
    setNames(this, Object.freeze(items.map((item, index) => {
      const name = names[index];
      if (name != null && nameCounts.get(name) === 1) {
        return name;
      }
      return null;
    })));
    this.#names = [];
    if (this.#names == null) {
      void this.#names;
    }
    if (!wrap) {
      return;
    }
    Object.freeze(this);
    const proxy = new Proxy(this, {
      get: (target, prop, receiver) => {
        if (typeof prop === "string") {
          if (prop.match(/^[0-9]+$/)) {
            const index = getNumber(prop, "%index");
            if (index < 0 || index >= this.length) {
              throw new RangeError("out of result range");
            }
            const item = target[index];
            if (item instanceof Error) {
              throwError(`index ${index}`, item);
            }
            return item;
          }
          if (passProperties.indexOf(prop) >= 0) {
            return Reflect.get(target, prop, receiver);
          }
          const value = target[prop];
          if (value instanceof Function) {
            return function(...args2) {
              return value.apply(this === receiver ? target : this, args2);
            };
          } else if (!(prop in target)) {
            return target.getValue.apply(this === receiver ? target : this, [prop]);
          }
        }
        return Reflect.get(target, prop, receiver);
      }
    });
    setNames(proxy, getNames(this));
    return proxy;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(deep) {
    const result = [];
    this.forEach((item, index) => {
      if (item instanceof Error) {
        throwError(`index ${index}`, item);
      }
      if (deep && item instanceof _Result) {
        item = item.toArray(deep);
      }
      result.push(item);
    });
    return result;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(deep) {
    const names = getNames(this);
    return names.reduce((accum, name, index) => {
      assert(name != null, `value at index ${index} unnamed`, "UNSUPPORTED_OPERATION", {
        operation: "toObject()"
      });
      return toObject(names, this, deep);
    }, {});
  }
  /**
   *  @_ignore
   */
  slice(start, end) {
    if (start == null) {
      start = 0;
    }
    if (start < 0) {
      start += this.length;
      if (start < 0) {
        start = 0;
      }
    }
    if (end == null) {
      end = this.length;
    }
    if (end < 0) {
      end += this.length;
      if (end < 0) {
        end = 0;
      }
    }
    if (end > this.length) {
      end = this.length;
    }
    const _names = getNames(this);
    const result = [], names = [];
    for (let i = start; i < end; i++) {
      result.push(this[i]);
      names.push(_names[i]);
    }
    return new _Result(_guard, result, names);
  }
  /**
   *  @_ignore
   */
  filter(callback, thisArg) {
    const _names = getNames(this);
    const result = [], names = [];
    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      if (item instanceof Error) {
        throwError(`index ${i}`, item);
      }
      if (callback.call(thisArg, item, i, this)) {
        result.push(item);
        names.push(_names[i]);
      }
    }
    return new _Result(_guard, result, names);
  }
  /**
   *  @_ignore
   */
  map(callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      if (item instanceof Error) {
        throwError(`index ${i}`, item);
      }
      result.push(callback.call(thisArg, item, i, this));
    }
    return result;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(name) {
    const index = getNames(this).indexOf(name);
    if (index === -1) {
      return void 0;
    }
    const value = this[index];
    if (value instanceof Error) {
      throwError(`property ${JSON.stringify(name)}`, value.error);
    }
    return value;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(items, keys) {
    return new _Result(_guard, items, keys);
  }
};
function getValue(value) {
  let bytes2 = toBeArray(value);
  assert(bytes2.length <= WordSize, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: bytes2, length: WordSize, offset: bytes2.length });
  if (bytes2.length !== WordSize) {
    bytes2 = getBytesCopy(concat([Padding.slice(bytes2.length % WordSize), bytes2]));
  }
  return bytes2;
}
var Coder = class {
  // The coder name:
  //   - address, uint256, tuple, array, etc.
  name;
  // The fully expanded type, including composite types:
  //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
  type;
  // The localName bound in the signature, in this example it is "baz":
  //   - tuple(address foo, uint bar) baz
  localName;
  // Whether this type is dynamic:
  //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
  //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
  dynamic;
  constructor(name, type, localName, dynamic) {
    defineProperties(this, { name, type, localName, dynamic }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(message, value) {
    assertArgument(false, message, this.localName, value);
  }
};
var Writer = class {
  // An array of WordSize lengthed objects to concatenation
  #data;
  #dataLength;
  constructor() {
    this.#data = [];
    this.#dataLength = 0;
  }
  get data() {
    return concat(this.#data);
  }
  get length() {
    return this.#dataLength;
  }
  #writeData(data) {
    this.#data.push(data);
    this.#dataLength += data.length;
    return data.length;
  }
  appendWriter(writer) {
    return this.#writeData(getBytesCopy(writer.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(value) {
    let bytes2 = getBytesCopy(value);
    const paddingOffset = bytes2.length % WordSize;
    if (paddingOffset) {
      bytes2 = getBytesCopy(concat([bytes2, Padding.slice(paddingOffset)]));
    }
    return this.#writeData(bytes2);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(value) {
    return this.#writeData(getValue(value));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const offset = this.#data.length;
    this.#data.push(Padding);
    this.#dataLength += WordSize;
    return (value) => {
      this.#data[offset] = getValue(value);
    };
  }
};
var Reader = class _Reader {
  // Allows incomplete unpadded data to be read; otherwise an error
  // is raised if attempting to overrun the buffer. This is required
  // to deal with an old Solidity bug, in which event data for
  // external (not public thoguh) was tightly packed.
  allowLoose;
  #data;
  #offset;
  #bytesRead;
  #parent;
  #maxInflation;
  constructor(data, allowLoose, maxInflation) {
    defineProperties(this, { allowLoose: !!allowLoose });
    this.#data = getBytesCopy(data);
    this.#bytesRead = 0;
    this.#parent = null;
    this.#maxInflation = maxInflation != null ? maxInflation : 1024;
    this.#offset = 0;
  }
  get data() {
    return hexlify(this.#data);
  }
  get dataLength() {
    return this.#data.length;
  }
  get consumed() {
    return this.#offset;
  }
  get bytes() {
    return new Uint8Array(this.#data);
  }
  #incrementBytesRead(count) {
    if (this.#parent) {
      return this.#parent.#incrementBytesRead(count);
    }
    this.#bytesRead += count;
    assert(this.#maxInflation < 1 || this.#bytesRead <= this.#maxInflation * this.dataLength, `compressed ABI data exceeds inflation ratio of ${this.#maxInflation} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
      buffer: getBytesCopy(this.#data),
      offset: this.#offset,
      length: count,
      info: {
        bytesRead: this.#bytesRead,
        dataLength: this.dataLength
      }
    });
  }
  #peekBytes(offset, length, loose) {
    let alignedLength = Math.ceil(length / WordSize) * WordSize;
    if (this.#offset + alignedLength > this.#data.length) {
      if (this.allowLoose && loose && this.#offset + length <= this.#data.length) {
        alignedLength = length;
      } else {
        assert(false, "data out-of-bounds", "BUFFER_OVERRUN", {
          buffer: getBytesCopy(this.#data),
          length: this.#data.length,
          offset: this.#offset + alignedLength
        });
      }
    }
    return this.#data.slice(this.#offset, this.#offset + alignedLength);
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(offset) {
    const reader = new _Reader(this.#data.slice(this.#offset + offset), this.allowLoose, this.#maxInflation);
    reader.#parent = this;
    return reader;
  }
  // Read bytes
  readBytes(length, loose) {
    let bytes2 = this.#peekBytes(0, length, !!loose);
    this.#incrementBytesRead(length);
    this.#offset += bytes2.length;
    return bytes2.slice(0, length);
  }
  // Read a numeric values
  readValue() {
    return toBigInt(this.readBytes(WordSize));
  }
  readIndex() {
    return toNumber(this.readBytes(WordSize));
  }
};

// node_modules/@noble/hashes/esm/_assert.js
function number(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error(`Wrong positive integer: ${n2}`);
}
function bytes(b2, ...lengths) {
  if (!(b2 instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b2.length}`);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n2, le = false) {
  if (le)
    return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
  return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

// node_modules/@noble/hashes/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

// node_modules/@noble/hashes/esm/sha3.js
var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _7n = /* @__PURE__ */ BigInt(7);
var _256n = /* @__PURE__ */ BigInt(256);
var _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    exists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

// node_modules/ethers/lib.esm/crypto/keccak.js
var locked = false;
var _keccak256 = function(data) {
  return keccak_256(data);
};
var __keccak256 = _keccak256;
function keccak256(_data) {
  const data = getBytes(_data, "data");
  return hexlify(__keccak256(data));
}
keccak256._ = _keccak256;
keccak256.lock = function() {
  locked = true;
};
keccak256.register = function(func) {
  if (locked) {
    throw new TypeError("keccak256 is locked");
  }
  __keccak256 = func;
};
Object.freeze(keccak256);

// node_modules/ethers/lib.esm/address/address.js
var BN_02 = BigInt(0);
var BN_36 = BigInt(36);
function getChecksumAddress(address) {
  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0);
  }
  const hashed = getBytes(keccak256(expanded));
  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }
  return "0x" + chars.join("");
}
var ibanLookup = {};
for (let i = 0; i < 10; i++) {
  ibanLookup[String(i)] = String(i);
}
for (let i = 0; i < 26; i++) {
  ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
var safeDigits = 15;
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c) => {
    return ibanLookup[c];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
var Base36 = function() {
  ;
  const result = {};
  for (let i = 0; i < 36; i++) {
    const key = "0123456789abcdefghijklmnopqrstuvwxyz"[i];
    result[key] = BigInt(i);
  }
  return result;
}();
function fromBase36(value) {
  value = value.toLowerCase();
  let result = BN_02;
  for (let i = 0; i < value.length; i++) {
    result = result * BN_36 + Base36[value[i]];
  }
  return result;
}
function getAddress(address) {
  assertArgument(typeof address === "string", "invalid address", "address", address);
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (!address.startsWith("0x")) {
      address = "0x" + address;
    }
    const result = getChecksumAddress(address);
    assertArgument(!address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || result === address, "bad address checksum", "address", address);
    return result;
  }
  if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    assertArgument(address.substring(2, 4) === ibanChecksum(address), "bad icap checksum", "address", address);
    let result = fromBase36(address.substring(4)).toString(16);
    while (result.length < 40) {
      result = "0" + result;
    }
    return getChecksumAddress("0x" + result);
  }
  assertArgument(false, "invalid address", "address", address);
}

// node_modules/ethers/lib.esm/address/contract-address.js
function getCreateAddress(tx) {
  const from = getAddress(tx.from);
  const nonce = getBigInt(tx.nonce, "tx.nonce");
  let nonceHex = nonce.toString(16);
  if (nonceHex === "0") {
    nonceHex = "0x";
  } else if (nonceHex.length % 2) {
    nonceHex = "0x0" + nonceHex;
  } else {
    nonceHex = "0x" + nonceHex;
  }
  return getAddress(dataSlice(keccak256(encodeRlp([from, nonceHex])), 12));
}

// node_modules/ethers/lib.esm/address/checks.js
function isAddressable(value) {
  return value && typeof value.getAddress === "function";
}
async function checkAddress(target, promise) {
  const result = await promise;
  if (result == null || result === "0x0000000000000000000000000000000000000000") {
    assert(typeof target !== "string", "unconfigured name", "UNCONFIGURED_NAME", { value: target });
    assertArgument(false, "invalid AddressLike value; did not resolve to a value address", "target", target);
  }
  return getAddress(result);
}
function resolveAddress(target, resolver) {
  if (typeof target === "string") {
    if (target.match(/^0x[0-9a-f]{40}$/i)) {
      return getAddress(target);
    }
    assert(resolver != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" });
    return checkAddress(target, resolver.resolveName(target));
  } else if (isAddressable(target)) {
    return checkAddress(target, target.getAddress());
  } else if (target && typeof target.then === "function") {
    return checkAddress(target, target);
  }
  assertArgument(false, "unsupported addressable value", "target", target);
}

// node_modules/ethers/lib.esm/abi/typed.js
var _gaurd = {};
function n(value, width) {
  let signed = false;
  if (width < 0) {
    signed = true;
    width *= -1;
  }
  return new Typed(_gaurd, `${signed ? "" : "u"}int${width}`, value, { signed, width });
}
function b(value, size) {
  return new Typed(_gaurd, `bytes${size ? size : ""}`, value, { size });
}
var _typedSymbol = Symbol.for("_ethers_typed");
var Typed = class _Typed {
  /**
   *  The type, as a Solidity-compatible type.
   */
  type;
  /**
   *  The actual value.
   */
  value;
  #options;
  /**
   *  @_ignore:
   */
  _typedSymbol;
  /**
   *  @_ignore:
   */
  constructor(gaurd, type, value, options) {
    if (options == null) {
      options = null;
    }
    assertPrivate(_gaurd, gaurd, "Typed");
    defineProperties(this, { _typedSymbol, type, value });
    this.#options = options;
    this.format();
  }
  /**
   *  Format the type as a Human-Readable type.
   */
  format() {
    if (this.type === "array") {
      throw new Error("");
    } else if (this.type === "dynamicArray") {
      throw new Error("");
    } else if (this.type === "tuple") {
      return `tuple(${this.value.map((v) => v.format()).join(",")})`;
    }
    return this.type;
  }
  /**
   *  The default value returned by this type.
   */
  defaultValue() {
    return 0;
  }
  /**
   *  The minimum value for numeric types.
   */
  minValue() {
    return 0;
  }
  /**
   *  The maximum value for numeric types.
   */
  maxValue() {
    return 0;
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedBigInt]].
   */
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedData]].
   */
  isData() {
    return this.type.startsWith("bytes");
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedString]].
   */
  isString() {
    return this.type === "string";
  }
  /**
   *  Returns the tuple name, if this is a tuple. Throws otherwise.
   */
  get tupleName() {
    if (this.type !== "tuple") {
      throw TypeError("not a tuple");
    }
    return this.#options;
  }
  // Returns the length of this type as an array
  // - `null` indicates the length is unforced, it could be dynamic
  // - `-1` indicates the length is dynamic
  // - any other value indicates it is a static array and is its length
  /**
   *  Returns the length of the array type or ``-1`` if it is dynamic.
   *
   *  Throws if the type is not an array.
   */
  get arrayLength() {
    if (this.type !== "array") {
      throw TypeError("not an array");
    }
    if (this.#options === true) {
      return -1;
    }
    if (this.#options === false) {
      return this.value.length;
    }
    return null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(type, value) {
    return new _Typed(_gaurd, type, value);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(v) {
    return n(v, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(v) {
    return n(v, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(v) {
    return n(v, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(v) {
    return n(v, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(v) {
    return n(v, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(v) {
    return n(v, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(v) {
    return n(v, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(v) {
    return n(v, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(v) {
    return n(v, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(v) {
    return n(v, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(v) {
    return n(v, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(v) {
    return n(v, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(v) {
    return n(v, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(v) {
    return n(v, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(v) {
    return n(v, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(v) {
    return n(v, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(v) {
    return n(v, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(v) {
    return n(v, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(v) {
    return n(v, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(v) {
    return n(v, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(v) {
    return n(v, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(v) {
    return n(v, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(v) {
    return n(v, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(v) {
    return n(v, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(v) {
    return n(v, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(v) {
    return n(v, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(v) {
    return n(v, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(v) {
    return n(v, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(v) {
    return n(v, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(v) {
    return n(v, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(v) {
    return n(v, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(v) {
    return n(v, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(v) {
    return n(v, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(v) {
    return n(v, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(v) {
    return n(v, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(v) {
    return n(v, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(v) {
    return n(v, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(v) {
    return n(v, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(v) {
    return n(v, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(v) {
    return n(v, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(v) {
    return n(v, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(v) {
    return n(v, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(v) {
    return n(v, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(v) {
    return n(v, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(v) {
    return n(v, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(v) {
    return n(v, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(v) {
    return n(v, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(v) {
    return n(v, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(v) {
    return n(v, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(v) {
    return n(v, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(v) {
    return n(v, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(v) {
    return n(v, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(v) {
    return n(v, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(v) {
    return n(v, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(v) {
    return n(v, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(v) {
    return n(v, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(v) {
    return n(v, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(v) {
    return n(v, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(v) {
    return n(v, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(v) {
    return n(v, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(v) {
    return n(v, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(v) {
    return n(v, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(v) {
    return n(v, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(v) {
    return n(v, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(v) {
    return n(v, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(v) {
    return n(v, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(v) {
    return b(v, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(v) {
    return b(v, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(v) {
    return b(v, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(v) {
    return b(v, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(v) {
    return b(v, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(v) {
    return b(v, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(v) {
    return b(v, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(v) {
    return b(v, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(v) {
    return b(v, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(v) {
    return b(v, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(v) {
    return b(v, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(v) {
    return b(v, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(v) {
    return b(v, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(v) {
    return b(v, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(v) {
    return b(v, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(v) {
    return b(v, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(v) {
    return b(v, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(v) {
    return b(v, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(v) {
    return b(v, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(v) {
    return b(v, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(v) {
    return b(v, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(v) {
    return b(v, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(v) {
    return b(v, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(v) {
    return b(v, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(v) {
    return b(v, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(v) {
    return b(v, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(v) {
    return b(v, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(v) {
    return b(v, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(v) {
    return b(v, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(v) {
    return b(v, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(v) {
    return b(v, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(v) {
    return b(v, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(v) {
    return new _Typed(_gaurd, "address", v);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(v) {
    return new _Typed(_gaurd, "bool", !!v);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(v) {
    return new _Typed(_gaurd, "bytes", v);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(v) {
    return new _Typed(_gaurd, "string", v);
  }
  /**
   *  Return a new ``array`` type for %%v%%, allowing %%dynamic%% length.
   */
  static array(v, dynamic) {
    throw new Error("not implemented yet");
    return new _Typed(_gaurd, "array", v, dynamic);
  }
  /**
   *  Return a new ``tuple`` type for %%v%%, with the optional %%name%%.
   */
  static tuple(v, name) {
    throw new Error("not implemented yet");
    return new _Typed(_gaurd, "tuple", v, name);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static overrides(v) {
    return new _Typed(_gaurd, "overrides", Object.assign({}, v));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(value) {
    return value && typeof value === "object" && "_typedSymbol" in value && value._typedSymbol === _typedSymbol;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(value, type) {
    if (_Typed.isTyped(value)) {
      if (value.type !== type) {
        throw new Error(`invalid type: expecetd ${type}, got ${value.type}`);
      }
      return value.value;
    }
    return value;
  }
};

// node_modules/ethers/lib.esm/abi/coders/address.js
var AddressCoder = class extends Coder {
  constructor(localName) {
    super("address", "address", localName, false);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(writer, _value) {
    let value = Typed.dereference(_value, "string");
    try {
      value = getAddress(value);
    } catch (error) {
      return this._throwError(error.message, _value);
    }
    return writer.writeValue(value);
  }
  decode(reader) {
    return getAddress(toBeHex(reader.readValue(), 20));
  }
};

// node_modules/ethers/lib.esm/abi/coders/anonymous.js
var AnonymousCoder = class extends Coder {
  coder;
  constructor(coder) {
    super(coder.name, coder.type, "_", coder.dynamic);
    this.coder = coder;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(writer, value) {
    return this.coder.encode(writer, value);
  }
  decode(reader) {
    return this.coder.decode(reader);
  }
};

// node_modules/ethers/lib.esm/abi/coders/array.js
function pack(writer, coders, values) {
  let arrayValues = [];
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name = coder.localName;
      assert(name, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder }, value: values });
      assert(!unique[name], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder }, value: values });
      unique[name] = true;
      return values[name];
    });
  } else {
    assertArgument(false, "invalid tuple value", "tuple", values);
  }
  assertArgument(coders.length === arrayValues.length, "types/value length mismatch", "tuple", values);
  let staticWriter = new Writer();
  let dynamicWriter = new Writer();
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let keys = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readIndex();
      let offsetReader = baseReader.subReader(offset);
      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        if (isError(error, "BUFFER_OVERRUN")) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        if (isError(error, "BUFFER_OVERRUN")) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value == void 0) {
      throw new Error("investigate");
    }
    values.push(value);
    keys.push(coder.localName || null);
  });
  return Result.fromItems(values, keys);
}
var ArrayCoder = class extends Coder {
  coder;
  length;
  constructor(coder, length, localName) {
    const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
    const dynamic = length === -1 || coder.dynamic;
    super("array", type, localName, dynamic);
    defineProperties(this, { coder, length });
  }
  defaultValue() {
    const defaultChild = this.coder.defaultValue();
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(defaultChild);
    }
    return result;
  }
  encode(writer, _value) {
    const value = Typed.dereference(_value, "array");
    if (!Array.isArray(value)) {
      this._throwError("expected array value", value);
    }
    let count = this.length;
    if (count === -1) {
      count = value.length;
      writer.writeValue(value.length);
    }
    assertArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
    let coders = [];
    for (let i = 0; i < value.length; i++) {
      coders.push(this.coder);
    }
    return pack(writer, coders, value);
  }
  decode(reader) {
    let count = this.length;
    if (count === -1) {
      count = reader.readIndex();
      assert(count * WordSize <= reader.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: reader.bytes, offset: count * WordSize, length: reader.dataLength });
    }
    let coders = [];
    for (let i = 0; i < count; i++) {
      coders.push(new AnonymousCoder(this.coder));
    }
    return unpack(reader, coders);
  }
};

// node_modules/ethers/lib.esm/abi/coders/boolean.js
var BooleanCoder = class extends Coder {
  constructor(localName) {
    super("bool", "bool", localName, false);
  }
  defaultValue() {
    return false;
  }
  encode(writer, _value) {
    const value = Typed.dereference(_value, "bool");
    return writer.writeValue(value ? 1 : 0);
  }
  decode(reader) {
    return !!reader.readValue();
  }
};

// node_modules/ethers/lib.esm/abi/coders/bytes.js
var DynamicBytesCoder = class extends Coder {
  constructor(type, localName) {
    super(type, type, localName, true);
  }
  defaultValue() {
    return "0x";
  }
  encode(writer, value) {
    value = getBytesCopy(value);
    let length = writer.writeValue(value.length);
    length += writer.writeBytes(value);
    return length;
  }
  decode(reader) {
    return reader.readBytes(reader.readIndex(), true);
  }
};
var BytesCoder = class extends DynamicBytesCoder {
  constructor(localName) {
    super("bytes", localName);
  }
  decode(reader) {
    return hexlify(super.decode(reader));
  }
};

// node_modules/ethers/lib.esm/abi/coders/fixed-bytes.js
var FixedBytesCoder = class extends Coder {
  size;
  constructor(size, localName) {
    let name = "bytes" + String(size);
    super(name, name, localName, false);
    defineProperties(this, { size }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(writer, _value) {
    let data = getBytesCopy(Typed.dereference(_value, this.type));
    if (data.length !== this.size) {
      this._throwError("incorrect data length", _value);
    }
    return writer.writeBytes(data);
  }
  decode(reader) {
    return hexlify(reader.readBytes(this.size));
  }
};

// node_modules/ethers/lib.esm/abi/coders/null.js
var Empty = new Uint8Array([]);
var NullCoder = class extends Coder {
  constructor(localName) {
    super("null", "", localName, false);
  }
  defaultValue() {
    return null;
  }
  encode(writer, value) {
    if (value != null) {
      this._throwError("not null", value);
    }
    return writer.writeBytes(Empty);
  }
  decode(reader) {
    reader.readBytes(0);
    return null;
  }
};

// node_modules/ethers/lib.esm/abi/coders/number.js
var BN_03 = BigInt(0);
var BN_12 = BigInt(1);
var BN_MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var NumberCoder = class extends Coder {
  size;
  signed;
  constructor(size, signed, localName) {
    const name = (signed ? "int" : "uint") + size * 8;
    super(name, name, localName, false);
    defineProperties(this, { size, signed }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(writer, _value) {
    let value = getBigInt(Typed.dereference(_value, this.type));
    let maxUintValue = mask(BN_MAX_UINT256, WordSize * 8);
    if (this.signed) {
      let bounds = mask(maxUintValue, this.size * 8 - 1);
      if (value > bounds || value < -(bounds + BN_12)) {
        this._throwError("value out-of-bounds", _value);
      }
      value = toTwos(value, 8 * WordSize);
    } else if (value < BN_03 || value > mask(maxUintValue, this.size * 8)) {
      this._throwError("value out-of-bounds", _value);
    }
    return writer.writeValue(value);
  }
  decode(reader) {
    let value = mask(reader.readValue(), this.size * 8);
    if (this.signed) {
      value = fromTwos(value, this.size * 8);
    }
    return value;
  }
};

// node_modules/ethers/lib.esm/abi/coders/string.js
var StringCoder = class extends DynamicBytesCoder {
  constructor(localName) {
    super("string", localName);
  }
  defaultValue() {
    return "";
  }
  encode(writer, _value) {
    return super.encode(writer, toUtf8Bytes(Typed.dereference(_value, "string")));
  }
  decode(reader) {
    return toUtf8String(super.decode(reader));
  }
};

// node_modules/ethers/lib.esm/abi/coders/tuple.js
var TupleCoder = class extends Coder {
  coders;
  constructor(coders, localName) {
    let dynamic = false;
    const types = [];
    coders.forEach((coder) => {
      if (coder.dynamic) {
        dynamic = true;
      }
      types.push(coder.type);
    });
    const type = "tuple(" + types.join(",") + ")";
    super("tuple", type, localName, dynamic);
    defineProperties(this, { coders: Object.freeze(coders.slice()) });
  }
  defaultValue() {
    const values = [];
    this.coders.forEach((coder) => {
      values.push(coder.defaultValue());
    });
    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name = coder.localName;
      if (name) {
        if (!accum[name]) {
          accum[name] = 0;
        }
        accum[name]++;
      }
      return accum;
    }, {});
    this.coders.forEach((coder, index) => {
      let name = coder.localName;
      if (!name || uniqueNames[name] !== 1) {
        return;
      }
      if (name === "length") {
        name = "_length";
      }
      if (values[name] != null) {
        return;
      }
      values[name] = values[index];
    });
    return Object.freeze(values);
  }
  encode(writer, _value) {
    const value = Typed.dereference(_value, "tuple");
    return pack(writer, this.coders, value);
  }
  decode(reader) {
    return unpack(reader, this.coders);
  }
};

// node_modules/ethers/lib.esm/hash/id.js
function id(value) {
  return keccak256(toUtf8Bytes(value));
}

// node_modules/ethers/lib.esm/transaction/accesslist.js
function accessSetify(addr, storageKeys) {
  return {
    address: getAddress(addr),
    storageKeys: storageKeys.map((storageKey, index) => {
      assertArgument(isHexString(storageKey, 32), "invalid slot", `storageKeys[${index}]`, storageKey);
      return storageKey.toLowerCase();
    })
  };
}
function accessListify(value) {
  if (Array.isArray(value)) {
    return value.map((set, index) => {
      if (Array.isArray(set)) {
        assertArgument(set.length === 2, "invalid slot set", `value[${index}]`, set);
        return accessSetify(set[0], set[1]);
      }
      assertArgument(set != null && typeof set === "object", "invalid address-slot set", "value", value);
      return accessSetify(set.address, set.storageKeys);
    });
  }
  assertArgument(value != null && typeof value === "object", "invalid access list", "value", value);
  const result = Object.keys(value).map((addr) => {
    const storageKeys = value[addr].reduce((accum, storageKey) => {
      accum[storageKey] = true;
      return accum;
    }, {});
    return accessSetify(addr, Object.keys(storageKeys).sort());
  });
  result.sort((a, b2) => a.address.localeCompare(b2.address));
  return result;
}

// node_modules/ethers/lib.esm/abi/fragments.js
function setify(items) {
  const result = /* @__PURE__ */ new Set();
  items.forEach((k) => result.add(k));
  return Object.freeze(result);
}
var _kwVisibDeploy = "external public payable override";
var KwVisibDeploy = setify(_kwVisibDeploy.split(" "));
var _kwVisib = "constant external internal payable private public pure view override";
var KwVisib = setify(_kwVisib.split(" "));
var _kwTypes = "constructor error event fallback function receive struct";
var KwTypes = setify(_kwTypes.split(" "));
var _kwModifiers = "calldata memory storage payable indexed";
var KwModifiers = setify(_kwModifiers.split(" "));
var _kwOther = "tuple returns";
var _keywords = [_kwTypes, _kwModifiers, _kwOther, _kwVisib].join(" ");
var Keywords = setify(_keywords.split(" "));
var SimpleTokens = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
};
var regexWhitespacePrefix = new RegExp("^(\\s*)");
var regexNumberPrefix = new RegExp("^([0-9]+)");
var regexIdPrefix = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)");
var regexId = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$");
var regexType = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var TokenString = class _TokenString {
  #offset;
  #tokens;
  get offset() {
    return this.#offset;
  }
  get length() {
    return this.#tokens.length - this.#offset;
  }
  constructor(tokens) {
    this.#offset = 0;
    this.#tokens = tokens.slice();
  }
  clone() {
    return new _TokenString(this.#tokens);
  }
  reset() {
    this.#offset = 0;
  }
  #subTokenString(from = 0, to = 0) {
    return new _TokenString(this.#tokens.slice(from, to).map((t) => {
      return Object.freeze(Object.assign({}, t, {
        match: t.match - from,
        linkBack: t.linkBack - from,
        linkNext: t.linkNext - from
      }));
    }));
  }
  // Pops and returns the value of the next token, if it is a keyword in allowed; throws if out of tokens
  popKeyword(allowed) {
    const top = this.peek();
    if (top.type !== "KEYWORD" || !allowed.has(top.text)) {
      throw new Error(`expected keyword ${top.text}`);
    }
    return this.pop().text;
  }
  // Pops and returns the value of the next token if it is `type`; throws if out of tokens
  popType(type) {
    if (this.peek().type !== type) {
      const top = this.peek();
      throw new Error(`expected ${type}; got ${top.type} ${JSON.stringify(top.text)}`);
    }
    return this.pop().text;
  }
  // Pops and returns a "(" TOKENS ")"
  popParen() {
    const top = this.peek();
    if (top.type !== "OPEN_PAREN") {
      throw new Error("bad start");
    }
    const result = this.#subTokenString(this.#offset + 1, top.match + 1);
    this.#offset = top.match + 1;
    return result;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const top = this.peek();
    if (top.type !== "OPEN_PAREN") {
      throw new Error("bad start");
    }
    const result = [];
    while (this.#offset < top.match - 1) {
      const link = this.peek().linkNext;
      result.push(this.#subTokenString(this.#offset + 1, link));
      this.#offset = link;
    }
    this.#offset = top.match + 1;
    return result;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (this.#offset >= this.#tokens.length) {
      throw new Error("out-of-bounds");
    }
    return this.#tokens[this.#offset];
  }
  // Returns the next value, if it is a keyword in `allowed`
  peekKeyword(allowed) {
    const top = this.peekType("KEYWORD");
    return top != null && allowed.has(top) ? top : null;
  }
  // Returns the value of the next token if it is `type`
  peekType(type) {
    if (this.length === 0) {
      return null;
    }
    const top = this.peek();
    return top.type === type ? top.text : null;
  }
  // Returns the next token; throws if out of tokens
  pop() {
    const result = this.peek();
    this.#offset++;
    return result;
  }
  toString() {
    const tokens = [];
    for (let i = this.#offset; i < this.#tokens.length; i++) {
      const token = this.#tokens[i];
      tokens.push(`${token.type}:${token.text}`);
    }
    return `<TokenString ${tokens.join(" ")}>`;
  }
};
function lex(text) {
  const tokens = [];
  const throwError2 = (message) => {
    const token = offset < text.length ? JSON.stringify(text[offset]) : "$EOI";
    throw new Error(`invalid token ${token} at ${offset}: ${message}`);
  };
  let brackets = [];
  let commas = [];
  let offset = 0;
  while (offset < text.length) {
    let cur = text.substring(offset);
    let match = cur.match(regexWhitespacePrefix);
    if (match) {
      offset += match[1].length;
      cur = text.substring(offset);
    }
    const token = { depth: brackets.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset, value: -1 };
    tokens.push(token);
    let type = SimpleTokens[cur[0]] || "";
    if (type) {
      token.type = type;
      token.text = cur[0];
      offset++;
      if (type === "OPEN_PAREN") {
        brackets.push(tokens.length - 1);
        commas.push(tokens.length - 1);
      } else if (type == "CLOSE_PAREN") {
        if (brackets.length === 0) {
          throwError2("no matching open bracket");
        }
        token.match = brackets.pop();
        tokens[token.match].match = tokens.length - 1;
        token.depth--;
        token.linkBack = commas.pop();
        tokens[token.linkBack].linkNext = tokens.length - 1;
      } else if (type === "COMMA") {
        token.linkBack = commas.pop();
        tokens[token.linkBack].linkNext = tokens.length - 1;
        commas.push(tokens.length - 1);
      } else if (type === "OPEN_BRACKET") {
        token.type = "BRACKET";
      } else if (type === "CLOSE_BRACKET") {
        let suffix = tokens.pop().text;
        if (tokens.length > 0 && tokens[tokens.length - 1].type === "NUMBER") {
          const value = tokens.pop().text;
          suffix = value + suffix;
          tokens[tokens.length - 1].value = getNumber(value);
        }
        if (tokens.length === 0 || tokens[tokens.length - 1].type !== "BRACKET") {
          throw new Error("missing opening bracket");
        }
        tokens[tokens.length - 1].text += suffix;
      }
      continue;
    }
    match = cur.match(regexIdPrefix);
    if (match) {
      token.text = match[1];
      offset += token.text.length;
      if (Keywords.has(token.text)) {
        token.type = "KEYWORD";
        continue;
      }
      if (token.text.match(regexType)) {
        token.type = "TYPE";
        continue;
      }
      token.type = "ID";
      continue;
    }
    match = cur.match(regexNumberPrefix);
    if (match) {
      token.text = match[1];
      token.type = "NUMBER";
      offset += token.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(cur[0])} at position ${offset}`);
  }
  return new TokenString(tokens.map((t) => Object.freeze(t)));
}
function allowSingle(set, allowed) {
  let included = [];
  for (const key in allowed.keys()) {
    if (set.has(key)) {
      included.push(key);
    }
  }
  if (included.length > 1) {
    throw new Error(`conflicting types: ${included.join(", ")}`);
  }
}
function consumeName(type, tokens) {
  if (tokens.peekKeyword(KwTypes)) {
    const keyword = tokens.pop().text;
    if (keyword !== type) {
      throw new Error(`expected ${type}, got ${keyword}`);
    }
  }
  return tokens.popType("ID");
}
function consumeKeywords(tokens, allowed) {
  const keywords = /* @__PURE__ */ new Set();
  while (true) {
    const keyword = tokens.peekType("KEYWORD");
    if (keyword == null || allowed && !allowed.has(keyword)) {
      break;
    }
    tokens.pop();
    if (keywords.has(keyword)) {
      throw new Error(`duplicate keywords: ${JSON.stringify(keyword)}`);
    }
    keywords.add(keyword);
  }
  return Object.freeze(keywords);
}
function consumeMutability(tokens) {
  let modifiers = consumeKeywords(tokens, KwVisib);
  allowSingle(modifiers, setify("constant payable nonpayable".split(" ")));
  allowSingle(modifiers, setify("pure view payable nonpayable".split(" ")));
  if (modifiers.has("view")) {
    return "view";
  }
  if (modifiers.has("pure")) {
    return "pure";
  }
  if (modifiers.has("payable")) {
    return "payable";
  }
  if (modifiers.has("nonpayable")) {
    return "nonpayable";
  }
  if (modifiers.has("constant")) {
    return "view";
  }
  return "nonpayable";
}
function consumeParams(tokens, allowIndexed) {
  return tokens.popParams().map((t) => ParamType.from(t, allowIndexed));
}
function consumeGas(tokens) {
  if (tokens.peekType("AT")) {
    tokens.pop();
    if (tokens.peekType("NUMBER")) {
      return getBigInt(tokens.pop().text);
    }
    throw new Error("invalid gas");
  }
  return null;
}
function consumeEoi(tokens) {
  if (tokens.length) {
    throw new Error(`unexpected tokens at offset ${tokens.offset}: ${tokens.toString()}`);
  }
}
var regexArrayType = new RegExp(/^(.*)\[([0-9]*)\]$/);
function verifyBasicType(type) {
  const match = type.match(regexType);
  assertArgument(match, "invalid type", "type", type);
  if (type === "uint") {
    return "uint256";
  }
  if (type === "int") {
    return "int256";
  }
  if (match[2]) {
    const length = parseInt(match[2]);
    assertArgument(length !== 0 && length <= 32, "invalid bytes length", "type", type);
  } else if (match[3]) {
    const size = parseInt(match[3]);
    assertArgument(size !== 0 && size <= 256 && size % 8 === 0, "invalid numeric width", "type", type);
  }
  return type;
}
var _guard2 = {};
var internal = Symbol.for("_ethers_internal");
var ParamTypeInternal = "_ParamTypeInternal";
var ErrorFragmentInternal = "_ErrorInternal";
var EventFragmentInternal = "_EventInternal";
var ConstructorFragmentInternal = "_ConstructorInternal";
var FallbackFragmentInternal = "_FallbackInternal";
var FunctionFragmentInternal = "_FunctionInternal";
var StructFragmentInternal = "_StructInternal";
var ParamType = class _ParamType {
  /**
   *  The local name of the parameter (or ``""`` if unbound)
   */
  name;
  /**
   *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
   *  ``"uint256[3][]"``)
   */
  type;
  /**
   *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
   */
  baseType;
  /**
   *  True if the parameters is indexed.
   *
   *  For non-indexable types this is ``null``.
   */
  indexed;
  /**
   *  The components for the tuple.
   *
   *  For non-tuple types this is ``null``.
   */
  components;
  /**
   *  The array length, or ``-1`` for dynamic-lengthed arrays.
   *
   *  For non-array types this is ``null``.
   */
  arrayLength;
  /**
   *  The type of each child in the array.
   *
   *  For non-array types this is ``null``.
   */
  arrayChildren;
  /**
   *  @private
   */
  constructor(guard, name, type, baseType, indexed, components, arrayLength, arrayChildren) {
    assertPrivate(guard, _guard2, "ParamType");
    Object.defineProperty(this, internal, { value: ParamTypeInternal });
    if (components) {
      components = Object.freeze(components.slice());
    }
    if (baseType === "array") {
      if (arrayLength == null || arrayChildren == null) {
        throw new Error("");
      }
    } else if (arrayLength != null || arrayChildren != null) {
      throw new Error("");
    }
    if (baseType === "tuple") {
      if (components == null) {
        throw new Error("");
      }
    } else if (components != null) {
      throw new Error("");
    }
    defineProperties(this, {
      name,
      type,
      baseType,
      indexed,
      components,
      arrayLength,
      arrayChildren
    });
  }
  /**
   *  Return a string representation of this type.
   *
   *  For example,
   *
   *  ``sighash" => "(uint256,address)"``
   *
   *  ``"minimal" => "tuple(uint256,address) indexed"``
   *
   *  ``"full" => "tuple(uint256 foo, address bar) indexed baz"``
   */
  format(format) {
    if (format == null) {
      format = "sighash";
    }
    if (format === "json") {
      const name = this.name || "";
      if (this.isArray()) {
        const result3 = JSON.parse(this.arrayChildren.format("json"));
        result3.name = name;
        result3.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`;
        return JSON.stringify(result3);
      }
      const result2 = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name
      };
      if (typeof this.indexed === "boolean") {
        result2.indexed = this.indexed;
      }
      if (this.isTuple()) {
        result2.components = this.components.map((c) => JSON.parse(c.format(format)));
      }
      return JSON.stringify(result2);
    }
    let result = "";
    if (this.isArray()) {
      result += this.arrayChildren.format(format);
      result += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`;
    } else {
      if (this.isTuple()) {
        result += "(" + this.components.map((comp) => comp.format(format)).join(format === "full" ? ", " : ",") + ")";
      } else {
        result += this.type;
      }
    }
    if (format !== "sighash") {
      if (this.indexed === true) {
        result += " indexed";
      }
      if (format === "full" && this.name) {
        result += " " + this.name;
      }
    }
    return result;
  }
  /**
   *  Returns true if %%this%% is an Array type.
   *
   *  This provides a type gaurd ensuring that [[arrayChildren]]
   *  and [[arrayLength]] are non-null.
   */
  isArray() {
    return this.baseType === "array";
  }
  /**
   *  Returns true if %%this%% is a Tuple type.
   *
   *  This provides a type gaurd ensuring that [[components]]
   *  is non-null.
   */
  isTuple() {
    return this.baseType === "tuple";
  }
  /**
   *  Returns true if %%this%% is an Indexable type.
   *
   *  This provides a type gaurd ensuring that [[indexed]]
   *  is non-null.
   */
  isIndexable() {
    return this.indexed != null;
  }
  /**
   *  Walks the **ParamType** with %%value%%, calling %%process%%
   *  on each type, destructing the %%value%% recursively.
   */
  walk(value, process) {
    if (this.isArray()) {
      if (!Array.isArray(value)) {
        throw new Error("invalid array value");
      }
      if (this.arrayLength !== -1 && value.length !== this.arrayLength) {
        throw new Error("array is wrong length");
      }
      const _this = this;
      return value.map((v) => _this.arrayChildren.walk(v, process));
    }
    if (this.isTuple()) {
      if (!Array.isArray(value)) {
        throw new Error("invalid tuple value");
      }
      if (value.length !== this.components.length) {
        throw new Error("array is wrong length");
      }
      const _this = this;
      return value.map((v, i) => _this.components[i].walk(v, process));
    }
    return process(this.type, value);
  }
  #walkAsync(promises, value, process, setValue) {
    if (this.isArray()) {
      if (!Array.isArray(value)) {
        throw new Error("invalid array value");
      }
      if (this.arrayLength !== -1 && value.length !== this.arrayLength) {
        throw new Error("array is wrong length");
      }
      const childType = this.arrayChildren;
      const result2 = value.slice();
      result2.forEach((value2, index) => {
        childType.#walkAsync(promises, value2, process, (value3) => {
          result2[index] = value3;
        });
      });
      setValue(result2);
      return;
    }
    if (this.isTuple()) {
      const components = this.components;
      let result2;
      if (Array.isArray(value)) {
        result2 = value.slice();
      } else {
        if (value == null || typeof value !== "object") {
          throw new Error("invalid tuple value");
        }
        result2 = components.map((param) => {
          if (!param.name) {
            throw new Error("cannot use object value with unnamed components");
          }
          if (!(param.name in value)) {
            throw new Error(`missing value for component ${param.name}`);
          }
          return value[param.name];
        });
      }
      if (result2.length !== this.components.length) {
        throw new Error("array is wrong length");
      }
      result2.forEach((value2, index) => {
        components[index].#walkAsync(promises, value2, process, (value3) => {
          result2[index] = value3;
        });
      });
      setValue(result2);
      return;
    }
    const result = process(this.type, value);
    if (result.then) {
      promises.push(async function() {
        setValue(await result);
      }());
    } else {
      setValue(result);
    }
  }
  /**
   *  Walks the **ParamType** with %%value%%, asynchronously calling
   *  %%process%% on each type, destructing the %%value%% recursively.
   *
   *  This can be used to resolve ENS names by walking and resolving each
   *  ``"address"`` type.
   */
  async walkAsync(value, process) {
    const promises = [];
    const result = [value];
    this.#walkAsync(promises, value, process, (value2) => {
      result[0] = value2;
    });
    if (promises.length) {
      await Promise.all(promises);
    }
    return result[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(obj, allowIndexed) {
    if (_ParamType.isParamType(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      try {
        return _ParamType.from(lex(obj), allowIndexed);
      } catch (error) {
        assertArgument(false, "invalid param type", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      let type2 = "", baseType = "";
      let comps = null;
      if (consumeKeywords(obj, setify(["tuple"])).has("tuple") || obj.peekType("OPEN_PAREN")) {
        baseType = "tuple";
        comps = obj.popParams().map((t) => _ParamType.from(t));
        type2 = `tuple(${comps.map((c) => c.format()).join(",")})`;
      } else {
        type2 = verifyBasicType(obj.popType("TYPE"));
        baseType = type2;
      }
      let arrayChildren = null;
      let arrayLength = null;
      while (obj.length && obj.peekType("BRACKET")) {
        const bracket = obj.pop();
        arrayChildren = new _ParamType(_guard2, "", type2, baseType, null, comps, arrayLength, arrayChildren);
        arrayLength = bracket.value;
        type2 += bracket.text;
        baseType = "array";
        comps = null;
      }
      let indexed2 = null;
      const keywords = consumeKeywords(obj, KwModifiers);
      if (keywords.has("indexed")) {
        if (!allowIndexed) {
          throw new Error("");
        }
        indexed2 = true;
      }
      const name2 = obj.peekType("ID") ? obj.pop().text : "";
      if (obj.length) {
        throw new Error("leftover tokens");
      }
      return new _ParamType(_guard2, name2, type2, baseType, indexed2, comps, arrayLength, arrayChildren);
    }
    const name = obj.name;
    assertArgument(!name || typeof name === "string" && name.match(regexId), "invalid name", "obj.name", name);
    let indexed = obj.indexed;
    if (indexed != null) {
      assertArgument(allowIndexed, "parameter cannot be indexed", "obj.indexed", obj.indexed);
      indexed = !!indexed;
    }
    let type = obj.type;
    let arrayMatch = type.match(regexArrayType);
    if (arrayMatch) {
      const arrayLength = parseInt(arrayMatch[2] || "-1");
      const arrayChildren = _ParamType.from({
        type: arrayMatch[1],
        components: obj.components
      });
      return new _ParamType(_guard2, name || "", type, "array", indexed, null, arrayLength, arrayChildren);
    }
    if (type === "tuple" || type.startsWith(
      "tuple("
      /* fix: ) */
    ) || type.startsWith(
      "("
      /* fix: ) */
    )) {
      const comps = obj.components != null ? obj.components.map((c) => _ParamType.from(c)) : null;
      const tuple = new _ParamType(_guard2, name || "", type, "tuple", indexed, comps, null, null);
      return tuple;
    }
    type = verifyBasicType(obj.type);
    return new _ParamType(_guard2, name || "", type, type, indexed, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(value) {
    return value && value[internal] === ParamTypeInternal;
  }
};
var Fragment = class _Fragment {
  /**
   *  The type of the fragment.
   */
  type;
  /**
   *  The inputs for the fragment.
   */
  inputs;
  /**
   *  @private
   */
  constructor(guard, type, inputs) {
    assertPrivate(guard, _guard2, "Fragment");
    inputs = Object.freeze(inputs.slice());
    defineProperties(this, { type, inputs });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(obj) {
    if (typeof obj === "string") {
      try {
        _Fragment.from(JSON.parse(obj));
      } catch (e) {
      }
      return _Fragment.from(lex(obj));
    }
    if (obj instanceof TokenString) {
      const type = obj.peekKeyword(KwTypes);
      switch (type) {
        case "constructor":
          return ConstructorFragment.from(obj);
        case "error":
          return ErrorFragment.from(obj);
        case "event":
          return EventFragment.from(obj);
        case "fallback":
        case "receive":
          return FallbackFragment.from(obj);
        case "function":
          return FunctionFragment.from(obj);
        case "struct":
          return StructFragment.from(obj);
      }
    } else if (typeof obj === "object") {
      switch (obj.type) {
        case "constructor":
          return ConstructorFragment.from(obj);
        case "error":
          return ErrorFragment.from(obj);
        case "event":
          return EventFragment.from(obj);
        case "fallback":
        case "receive":
          return FallbackFragment.from(obj);
        case "function":
          return FunctionFragment.from(obj);
        case "struct":
          return StructFragment.from(obj);
      }
      assert(false, `unsupported type: ${obj.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    assertArgument(false, "unsupported frgament object", "obj", obj);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(value) {
    return ConstructorFragment.isFragment(value);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(value) {
    return ErrorFragment.isFragment(value);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(value) {
    return EventFragment.isFragment(value);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(value) {
    return FunctionFragment.isFragment(value);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(value) {
    return StructFragment.isFragment(value);
  }
};
var NamedFragment = class extends Fragment {
  /**
   *  The name of the fragment.
   */
  name;
  /**
   *  @private
   */
  constructor(guard, type, name, inputs) {
    super(guard, type, inputs);
    assertArgument(typeof name === "string" && name.match(regexId), "invalid identifier", "name", name);
    inputs = Object.freeze(inputs.slice());
    defineProperties(this, { name });
  }
};
function joinParams(format, params) {
  return "(" + params.map((p) => p.format(format)).join(format === "full" ? ", " : ",") + ")";
}
var ErrorFragment = class _ErrorFragment extends NamedFragment {
  /**
   *  @private
   */
  constructor(guard, name, inputs) {
    super(guard, "error", name, inputs);
    Object.defineProperty(this, internal, { value: ErrorFragmentInternal });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return id(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(format) {
    if (format == null) {
      format = "sighash";
    }
    if (format === "json") {
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    const result = [];
    if (format !== "sighash") {
      result.push("error");
    }
    result.push(this.name + joinParams(format, this.inputs));
    return result.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(obj) {
    if (_ErrorFragment.isFragment(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      return _ErrorFragment.from(lex(obj));
    } else if (obj instanceof TokenString) {
      const name = consumeName("error", obj);
      const inputs = consumeParams(obj);
      consumeEoi(obj);
      return new _ErrorFragment(_guard2, name, inputs);
    }
    return new _ErrorFragment(_guard2, obj.name, obj.inputs ? obj.inputs.map(ParamType.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === ErrorFragmentInternal;
  }
};
var EventFragment = class _EventFragment extends NamedFragment {
  /**
   *  Whether this event is anonymous.
   */
  anonymous;
  /**
   *  @private
   */
  constructor(guard, name, inputs, anonymous) {
    super(guard, "event", name, inputs);
    Object.defineProperty(this, internal, { value: EventFragmentInternal });
    defineProperties(this, { anonymous });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return id(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(format) {
    if (format == null) {
      format = "sighash";
    }
    if (format === "json") {
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((i) => JSON.parse(i.format(format)))
      });
    }
    const result = [];
    if (format !== "sighash") {
      result.push("event");
    }
    result.push(this.name + joinParams(format, this.inputs));
    if (format !== "sighash" && this.anonymous) {
      result.push("anonymous");
    }
    return result.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(name, params) {
    params = (params || []).map((p) => ParamType.from(p));
    const fragment = new _EventFragment(_guard2, name, params, false);
    return fragment.topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(obj) {
    if (_EventFragment.isFragment(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      try {
        return _EventFragment.from(lex(obj));
      } catch (error) {
        assertArgument(false, "invalid event fragment", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      const name = consumeName("event", obj);
      const inputs = consumeParams(obj, true);
      const anonymous = !!consumeKeywords(obj, setify(["anonymous"])).has("anonymous");
      consumeEoi(obj);
      return new _EventFragment(_guard2, name, inputs, anonymous);
    }
    return new _EventFragment(_guard2, obj.name, obj.inputs ? obj.inputs.map((p) => ParamType.from(p, true)) : [], !!obj.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === EventFragmentInternal;
  }
};
var ConstructorFragment = class _ConstructorFragment extends Fragment {
  /**
   *  Whether the constructor can receive an endowment.
   */
  payable;
  /**
   *  The recommended gas limit for deployment or ``null``.
   */
  gas;
  /**
   *  @private
   */
  constructor(guard, type, inputs, payable, gas) {
    super(guard, type, inputs);
    Object.defineProperty(this, internal, { value: ConstructorFragmentInternal });
    defineProperties(this, { payable, gas });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(format) {
    assert(format != null && format !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" });
    if (format === "json") {
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((i) => JSON.parse(i.format(format)))
      });
    }
    const result = [`constructor${joinParams(format, this.inputs)}`];
    if (this.payable) {
      result.push("payable");
    }
    if (this.gas != null) {
      result.push(`@${this.gas.toString()}`);
    }
    return result.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(obj) {
    if (_ConstructorFragment.isFragment(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      try {
        return _ConstructorFragment.from(lex(obj));
      } catch (error) {
        assertArgument(false, "invalid constuctor fragment", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      consumeKeywords(obj, setify(["constructor"]));
      const inputs = consumeParams(obj);
      const payable = !!consumeKeywords(obj, KwVisibDeploy).has("payable");
      const gas = consumeGas(obj);
      consumeEoi(obj);
      return new _ConstructorFragment(_guard2, "constructor", inputs, payable, gas);
    }
    return new _ConstructorFragment(_guard2, "constructor", obj.inputs ? obj.inputs.map(ParamType.from) : [], !!obj.payable, obj.gas != null ? obj.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === ConstructorFragmentInternal;
  }
};
var FallbackFragment = class _FallbackFragment extends Fragment {
  /**
   *  If the function can be sent value during invocation.
   */
  payable;
  constructor(guard, inputs, payable) {
    super(guard, "fallback", inputs);
    Object.defineProperty(this, internal, { value: FallbackFragmentInternal });
    defineProperties(this, { payable });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(format) {
    const type = this.inputs.length === 0 ? "receive" : "fallback";
    if (format === "json") {
      const stateMutability = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type, stateMutability });
    }
    return `${type}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(obj) {
    if (_FallbackFragment.isFragment(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      try {
        return _FallbackFragment.from(lex(obj));
      } catch (error) {
        assertArgument(false, "invalid fallback fragment", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      const errorObj = obj.toString();
      const topIsValid = obj.peekKeyword(setify(["fallback", "receive"]));
      assertArgument(topIsValid, "type must be fallback or receive", "obj", errorObj);
      const type = obj.popKeyword(setify(["fallback", "receive"]));
      if (type === "receive") {
        const inputs2 = consumeParams(obj);
        assertArgument(inputs2.length === 0, `receive cannot have arguments`, "obj.inputs", inputs2);
        consumeKeywords(obj, setify(["payable"]));
        consumeEoi(obj);
        return new _FallbackFragment(_guard2, [], true);
      }
      let inputs = consumeParams(obj);
      if (inputs.length) {
        assertArgument(inputs.length === 1 && inputs[0].type === "bytes", "invalid fallback inputs", "obj.inputs", inputs.map((i) => i.format("minimal")).join(", "));
      } else {
        inputs = [ParamType.from("bytes")];
      }
      const mutability = consumeMutability(obj);
      assertArgument(mutability === "nonpayable" || mutability === "payable", "fallback cannot be constants", "obj.stateMutability", mutability);
      if (consumeKeywords(obj, setify(["returns"])).has("returns")) {
        const outputs = consumeParams(obj);
        assertArgument(outputs.length === 1 && outputs[0].type === "bytes", "invalid fallback outputs", "obj.outputs", outputs.map((i) => i.format("minimal")).join(", "));
      }
      consumeEoi(obj);
      return new _FallbackFragment(_guard2, inputs, mutability === "payable");
    }
    if (obj.type === "receive") {
      return new _FallbackFragment(_guard2, [], true);
    }
    if (obj.type === "fallback") {
      const inputs = [ParamType.from("bytes")];
      const payable = obj.stateMutability === "payable";
      return new _FallbackFragment(_guard2, inputs, payable);
    }
    assertArgument(false, "invalid fallback description", "obj", obj);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === FallbackFragmentInternal;
  }
};
var FunctionFragment = class _FunctionFragment extends NamedFragment {
  /**
   *  If the function is constant (e.g. ``pure`` or ``view`` functions).
   */
  constant;
  /**
   *  The returned types for the result of calling this function.
   */
  outputs;
  /**
   *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
   *  or ``pure``)
   */
  stateMutability;
  /**
   *  If the function can be sent value during invocation.
   */
  payable;
  /**
   *  The recommended gas limit to send when calling this function.
   */
  gas;
  /**
   *  @private
   */
  constructor(guard, name, stateMutability, inputs, outputs, gas) {
    super(guard, "function", name, inputs);
    Object.defineProperty(this, internal, { value: FunctionFragmentInternal });
    outputs = Object.freeze(outputs.slice());
    const constant = stateMutability === "view" || stateMutability === "pure";
    const payable = stateMutability === "payable";
    defineProperties(this, { constant, gas, outputs, payable, stateMutability });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return id(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(format) {
    if (format == null) {
      format = "sighash";
    }
    if (format === "json") {
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((i) => JSON.parse(i.format(format))),
        outputs: this.outputs.map((o) => JSON.parse(o.format(format)))
      });
    }
    const result = [];
    if (format !== "sighash") {
      result.push("function");
    }
    result.push(this.name + joinParams(format, this.inputs));
    if (format !== "sighash") {
      if (this.stateMutability !== "nonpayable") {
        result.push(this.stateMutability);
      }
      if (this.outputs && this.outputs.length) {
        result.push("returns");
        result.push(joinParams(format, this.outputs));
      }
      if (this.gas != null) {
        result.push(`@${this.gas.toString()}`);
      }
    }
    return result.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(name, params) {
    params = (params || []).map((p) => ParamType.from(p));
    const fragment = new _FunctionFragment(_guard2, name, "view", params, [], null);
    return fragment.selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(obj) {
    if (_FunctionFragment.isFragment(obj)) {
      return obj;
    }
    if (typeof obj === "string") {
      try {
        return _FunctionFragment.from(lex(obj));
      } catch (error) {
        assertArgument(false, "invalid function fragment", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      const name = consumeName("function", obj);
      const inputs = consumeParams(obj);
      const mutability = consumeMutability(obj);
      let outputs = [];
      if (consumeKeywords(obj, setify(["returns"])).has("returns")) {
        outputs = consumeParams(obj);
      }
      const gas = consumeGas(obj);
      consumeEoi(obj);
      return new _FunctionFragment(_guard2, name, mutability, inputs, outputs, gas);
    }
    let stateMutability = obj.stateMutability;
    if (stateMutability == null) {
      stateMutability = "payable";
      if (typeof obj.constant === "boolean") {
        stateMutability = "view";
        if (!obj.constant) {
          stateMutability = "payable";
          if (typeof obj.payable === "boolean" && !obj.payable) {
            stateMutability = "nonpayable";
          }
        }
      } else if (typeof obj.payable === "boolean" && !obj.payable) {
        stateMutability = "nonpayable";
      }
    }
    return new _FunctionFragment(_guard2, obj.name, stateMutability, obj.inputs ? obj.inputs.map(ParamType.from) : [], obj.outputs ? obj.outputs.map(ParamType.from) : [], obj.gas != null ? obj.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === FunctionFragmentInternal;
  }
};
var StructFragment = class _StructFragment extends NamedFragment {
  /**
   *  @private
   */
  constructor(guard, name, inputs) {
    super(guard, "struct", name, inputs);
    Object.defineProperty(this, internal, { value: StructFragmentInternal });
  }
  /**
   *  Returns a string representation of this struct as %%format%%.
   */
  format() {
    throw new Error("@TODO");
  }
  /**
   *  Returns a new **StructFragment** for %%obj%%.
   */
  static from(obj) {
    if (typeof obj === "string") {
      try {
        return _StructFragment.from(lex(obj));
      } catch (error) {
        assertArgument(false, "invalid struct fragment", "obj", obj);
      }
    } else if (obj instanceof TokenString) {
      const name = consumeName("struct", obj);
      const inputs = consumeParams(obj);
      consumeEoi(obj);
      return new _StructFragment(_guard2, name, inputs);
    }
    return new _StructFragment(_guard2, obj.name, obj.inputs ? obj.inputs.map(ParamType.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(value) {
    return value && value[internal] === StructFragmentInternal;
  }
};

// node_modules/ethers/lib.esm/abi/abi-coder.js
var PanicReasons = /* @__PURE__ */ new Map();
PanicReasons.set(0, "GENERIC_PANIC");
PanicReasons.set(1, "ASSERT_FALSE");
PanicReasons.set(17, "OVERFLOW");
PanicReasons.set(18, "DIVIDE_BY_ZERO");
PanicReasons.set(33, "ENUM_RANGE_ERROR");
PanicReasons.set(34, "BAD_STORAGE_DATA");
PanicReasons.set(49, "STACK_UNDERFLOW");
PanicReasons.set(50, "ARRAY_RANGE_ERROR");
PanicReasons.set(65, "OUT_OF_MEMORY");
PanicReasons.set(81, "UNINITIALIZED_FUNCTION_CALL");
var paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
var paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
var defaultCoder = null;
var defaultMaxInflation = 1024;
function getBuiltinCallException(action, tx, data, abiCoder) {
  let message = "missing revert data";
  let reason = null;
  const invocation = null;
  let revert = null;
  if (data) {
    message = "execution reverted";
    const bytes2 = getBytes(data);
    data = hexlify(data);
    if (bytes2.length === 0) {
      message += " (no data present; likely require(false) occurred";
      reason = "require(false)";
    } else if (bytes2.length % 32 !== 4) {
      message += " (could not decode reason; invalid data length)";
    } else if (hexlify(bytes2.slice(0, 4)) === "0x08c379a0") {
      try {
        reason = abiCoder.decode(["string"], bytes2.slice(4))[0];
        revert = {
          signature: "Error(string)",
          name: "Error",
          args: [reason]
        };
        message += `: ${JSON.stringify(reason)}`;
      } catch (error) {
        message += " (could not decode reason; invalid string data)";
      }
    } else if (hexlify(bytes2.slice(0, 4)) === "0x4e487b71") {
      try {
        const code = Number(abiCoder.decode(["uint256"], bytes2.slice(4))[0]);
        revert = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [code]
        };
        reason = `Panic due to ${PanicReasons.get(code) || "UNKNOWN"}(${code})`;
        message += `: ${reason}`;
      } catch (error) {
        message += " (could not decode panic code)";
      }
    } else {
      message += " (unknown custom error)";
    }
  }
  const transaction = {
    to: tx.to ? getAddress(tx.to) : null,
    data: tx.data || "0x"
  };
  if (tx.from) {
    transaction.from = getAddress(tx.from);
  }
  return makeError(message, "CALL_EXCEPTION", {
    action,
    data,
    reason,
    transaction,
    invocation,
    revert
  });
}
var AbiCoder = class _AbiCoder {
  #getCoder(param) {
    if (param.isArray()) {
      return new ArrayCoder(this.#getCoder(param.arrayChildren), param.arrayLength, param.name);
    }
    if (param.isTuple()) {
      return new TupleCoder(param.components.map((c) => this.#getCoder(c)), param.name);
    }
    switch (param.baseType) {
      case "address":
        return new AddressCoder(param.name);
      case "bool":
        return new BooleanCoder(param.name);
      case "string":
        return new StringCoder(param.name);
      case "bytes":
        return new BytesCoder(param.name);
      case "":
        return new NullCoder(param.name);
    }
    let match = param.type.match(paramTypeNumber);
    if (match) {
      let size = parseInt(match[2] || "256");
      assertArgument(size !== 0 && size <= 256 && size % 8 === 0, "invalid " + match[1] + " bit length", "param", param);
      return new NumberCoder(size / 8, match[1] === "int", param.name);
    }
    match = param.type.match(paramTypeBytes);
    if (match) {
      let size = parseInt(match[1]);
      assertArgument(size !== 0 && size <= 32, "invalid bytes length", "param", param);
      return new FixedBytesCoder(size, param.name);
    }
    assertArgument(false, "invalid type", "type", param.type);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(types) {
    const coders = types.map((type) => this.#getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(types, values) {
    assertArgumentCount(values.length, types.length, "types/values length mismatch");
    const coders = types.map((type) => this.#getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    const writer = new Writer();
    coder.encode(writer, values);
    return writer.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(types, data, loose) {
    const coders = types.map((type) => this.#getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.decode(new Reader(data, loose, defaultMaxInflation));
  }
  static _setDefaultMaxInflation(value) {
    assertArgument(typeof value === "number" && Number.isInteger(value), "invalid defaultMaxInflation factor", "value", value);
    defaultMaxInflation = value;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    if (defaultCoder == null) {
      defaultCoder = new _AbiCoder();
    }
    return defaultCoder;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(action, tx, data) {
    return getBuiltinCallException(action, tx, data, _AbiCoder.defaultAbiCoder());
  }
};

// node_modules/ethers/lib.esm/abi/interface.js
var LogDescription = class {
  /**
   *  The matching fragment for the ``topic0``.
   */
  fragment;
  /**
   *  The name of the Event.
   */
  name;
  /**
   *  The full Event signature.
   */
  signature;
  /**
   *  The topic hash for the Event.
   */
  topic;
  /**
   *  The arguments passed into the Event with ``emit``.
   */
  args;
  /**
   *  @_ignore:
   */
  constructor(fragment, topic, args) {
    const name = fragment.name, signature = fragment.format();
    defineProperties(this, {
      fragment,
      name,
      signature,
      topic,
      args
    });
  }
};
var TransactionDescription = class {
  /**
   *  The matching fragment from the transaction ``data``.
   */
  fragment;
  /**
   *  The name of the Function from the transaction ``data``.
   */
  name;
  /**
   *  The arguments passed to the Function from the transaction ``data``.
   */
  args;
  /**
   *  The full Function signature from the transaction ``data``.
   */
  signature;
  /**
   *  The selector for the Function from the transaction ``data``.
   */
  selector;
  /**
   *  The ``value`` (in wei) from the transaction.
   */
  value;
  /**
   *  @_ignore:
   */
  constructor(fragment, selector, args, value) {
    const name = fragment.name, signature = fragment.format();
    defineProperties(this, {
      fragment,
      name,
      args,
      signature,
      selector,
      value
    });
  }
};
var ErrorDescription = class {
  /**
   *  The matching fragment.
   */
  fragment;
  /**
   *  The name of the Error.
   */
  name;
  /**
   *  The arguments passed to the Error with ``revert``.
   */
  args;
  /**
   *  The full Error signature.
   */
  signature;
  /**
   *  The selector for the Error.
   */
  selector;
  /**
   *  @_ignore:
   */
  constructor(fragment, selector, args) {
    const name = fragment.name, signature = fragment.format();
    defineProperties(this, {
      fragment,
      name,
      args,
      signature,
      selector
    });
  }
};
var Indexed = class {
  /**
   *  The ``keccak256`` of the value logged.
   */
  hash;
  /**
   *  @_ignore:
   */
  _isIndexed;
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(value) {
    return !!(value && value._isIndexed);
  }
  /**
   *  @_ignore:
   */
  constructor(hash) {
    defineProperties(this, { hash, _isIndexed: true });
  }
};
var PanicReasons2 = {
  "0": "generic panic",
  "1": "assert(false)",
  "17": "arithmetic overflow",
  "18": "division or modulo by zero",
  "33": "enum overflow",
  "34": "invalid encoded storage byte array accessed",
  "49": "out-of-bounds array access; popping on an empty array",
  "50": "out-of-bounds access of an array or bytesN",
  "65": "out of memory",
  "81": "uninitialized function"
};
var BuiltinErrors = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (message) => {
      return `reverted with reason string ${JSON.stringify(message)}`;
    }
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (code) => {
      let reason = "unknown panic code";
      if (code >= 0 && code <= 255 && PanicReasons2[code.toString()]) {
        reason = PanicReasons2[code.toString()];
      }
      return `reverted with panic code 0x${code.toString(16)} (${reason})`;
    }
  }
};
var Interface = class _Interface {
  /**
   *  All the Contract ABI members (i.e. methods, events, errors, etc).
   */
  fragments;
  /**
   *  The Contract constructor.
   */
  deploy;
  /**
   *  The Fallback method, if any.
   */
  fallback;
  /**
   *  If receiving ether is supported.
   */
  receive;
  #errors;
  #events;
  #functions;
  //    #structs: Map<string, StructFragment>;
  #abiCoder;
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(fragments) {
    let abi = [];
    if (typeof fragments === "string") {
      abi = JSON.parse(fragments);
    } else {
      abi = fragments;
    }
    this.#functions = /* @__PURE__ */ new Map();
    this.#errors = /* @__PURE__ */ new Map();
    this.#events = /* @__PURE__ */ new Map();
    const frags = [];
    for (const a of abi) {
      try {
        frags.push(Fragment.from(a));
      } catch (error) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`, error.message);
      }
    }
    defineProperties(this, {
      fragments: Object.freeze(frags)
    });
    let fallback = null;
    let receive = false;
    this.#abiCoder = this.getAbiCoder();
    this.fragments.forEach((fragment, index) => {
      let bucket;
      switch (fragment.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          defineProperties(this, { deploy: fragment });
          return;
        case "fallback":
          if (fragment.inputs.length === 0) {
            receive = true;
          } else {
            assertArgument(!fallback || fragment.payable !== fallback.payable, "conflicting fallback fragments", `fragments[${index}]`, fragment);
            fallback = fragment;
            receive = fallback.payable;
          }
          return;
        case "function":
          bucket = this.#functions;
          break;
        case "event":
          bucket = this.#events;
          break;
        case "error":
          bucket = this.#errors;
          break;
        default:
          return;
      }
      const signature = fragment.format();
      if (bucket.has(signature)) {
        return;
      }
      bucket.set(signature, fragment);
    });
    if (!this.deploy) {
      defineProperties(this, {
        deploy: ConstructorFragment.from("constructor()")
      });
    }
    defineProperties(this, { fallback, receive });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(minimal) {
    const format = minimal ? "minimal" : "full";
    const abi = this.fragments.map((f) => f.format(format));
    return abi;
  }
  /**
   *  Return the JSON-encoded ABI. This is the format Solidiy
   *  returns.
   */
  formatJson() {
    const abi = this.fragments.map((f) => f.format("json"));
    return JSON.stringify(abi.map((j) => JSON.parse(j)));
  }
  /**
   *  The ABI coder that will be used to encode and decode binary
   *  data.
   */
  getAbiCoder() {
    return AbiCoder.defaultAbiCoder();
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  #getFunction(key, values, forceUnique) {
    if (isHexString(key)) {
      const selector = key.toLowerCase();
      for (const fragment of this.#functions.values()) {
        if (selector === fragment.selector) {
          return fragment;
        }
      }
      return null;
    }
    if (key.indexOf("(") === -1) {
      const matching = [];
      for (const [name, fragment] of this.#functions) {
        if (name.split(
          "("
          /* fix:) */
        )[0] === key) {
          matching.push(fragment);
        }
      }
      if (values) {
        const lastValue = values.length > 0 ? values[values.length - 1] : null;
        let valueLength = values.length;
        let allowOptions = true;
        if (Typed.isTyped(lastValue) && lastValue.type === "overrides") {
          allowOptions = false;
          valueLength--;
        }
        for (let i = matching.length - 1; i >= 0; i--) {
          const inputs = matching[i].inputs.length;
          if (inputs !== valueLength && (!allowOptions || inputs !== valueLength - 1)) {
            matching.splice(i, 1);
          }
        }
        for (let i = matching.length - 1; i >= 0; i--) {
          const inputs = matching[i].inputs;
          for (let j = 0; j < values.length; j++) {
            if (!Typed.isTyped(values[j])) {
              continue;
            }
            if (j >= inputs.length) {
              if (values[j].type === "overrides") {
                continue;
              }
              matching.splice(i, 1);
              break;
            }
            if (values[j].type !== inputs[j].baseType) {
              matching.splice(i, 1);
              break;
            }
          }
        }
      }
      if (matching.length === 1 && values && values.length !== matching[0].inputs.length) {
        const lastArg = values[values.length - 1];
        if (lastArg == null || Array.isArray(lastArg) || typeof lastArg !== "object") {
          matching.splice(0, 1);
        }
      }
      if (matching.length === 0) {
        return null;
      }
      if (matching.length > 1 && forceUnique) {
        const matchStr = matching.map((m) => JSON.stringify(m.format())).join(", ");
        assertArgument(false, `ambiguous function description (i.e. matches ${matchStr})`, "key", key);
      }
      return matching[0];
    }
    const result = this.#functions.get(FunctionFragment.from(key).format());
    if (result) {
      return result;
    }
    return null;
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(key) {
    const fragment = this.#getFunction(key, null, false);
    assertArgument(fragment, "no matching function", "key", key);
    return fragment.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(key) {
    return !!this.#getFunction(key, null, false);
  }
  /**
   *  Get the [[FunctionFragment]] for %%key%%, which may be a function
   *  selector, function name or function signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple functions match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single function in
   *  the ABI, this will throw.
   */
  getFunction(key, values) {
    return this.#getFunction(key, values || null, true);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(callback) {
    const names = Array.from(this.#functions.keys());
    names.sort((a, b2) => a.localeCompare(b2));
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      callback(this.#functions.get(name), i);
    }
  }
  // Find an event definition by any means necessary (unless it is ambiguous)
  #getEvent(key, values, forceUnique) {
    if (isHexString(key)) {
      const eventTopic = key.toLowerCase();
      for (const fragment of this.#events.values()) {
        if (eventTopic === fragment.topicHash) {
          return fragment;
        }
      }
      return null;
    }
    if (key.indexOf("(") === -1) {
      const matching = [];
      for (const [name, fragment] of this.#events) {
        if (name.split(
          "("
          /* fix:) */
        )[0] === key) {
          matching.push(fragment);
        }
      }
      if (values) {
        for (let i = matching.length - 1; i >= 0; i--) {
          if (matching[i].inputs.length < values.length) {
            matching.splice(i, 1);
          }
        }
        for (let i = matching.length - 1; i >= 0; i--) {
          const inputs = matching[i].inputs;
          for (let j = 0; j < values.length; j++) {
            if (!Typed.isTyped(values[j])) {
              continue;
            }
            if (values[j].type !== inputs[j].baseType) {
              matching.splice(i, 1);
              break;
            }
          }
        }
      }
      if (matching.length === 0) {
        return null;
      }
      if (matching.length > 1 && forceUnique) {
        const matchStr = matching.map((m) => JSON.stringify(m.format())).join(", ");
        assertArgument(false, `ambiguous event description (i.e. matches ${matchStr})`, "key", key);
      }
      return matching[0];
    }
    const result = this.#events.get(EventFragment.from(key).format());
    if (result) {
      return result;
    }
    return null;
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(key) {
    const fragment = this.#getEvent(key, null, false);
    assertArgument(fragment, "no matching event", "key", key);
    return fragment.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(key) {
    return !!this.#getEvent(key, null, false);
  }
  /**
   *  Get the [[EventFragment]] for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple events match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single event in
   *  the ABI, this will throw.
   */
  getEvent(key, values) {
    return this.#getEvent(key, values || null, true);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(callback) {
    const names = Array.from(this.#events.keys());
    names.sort((a, b2) => a.localeCompare(b2));
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      callback(this.#events.get(name), i);
    }
  }
  /**
   *  Get the [[ErrorFragment]] for %%key%%, which may be an error
   *  selector, error name or error signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple errors match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single error in
   *  the ABI, this will throw.
   */
  getError(key, values) {
    if (isHexString(key)) {
      const selector = key.toLowerCase();
      if (BuiltinErrors[selector]) {
        return ErrorFragment.from(BuiltinErrors[selector].signature);
      }
      for (const fragment of this.#errors.values()) {
        if (selector === fragment.selector) {
          return fragment;
        }
      }
      return null;
    }
    if (key.indexOf("(") === -1) {
      const matching = [];
      for (const [name, fragment] of this.#errors) {
        if (name.split(
          "("
          /* fix:) */
        )[0] === key) {
          matching.push(fragment);
        }
      }
      if (matching.length === 0) {
        if (key === "Error") {
          return ErrorFragment.from("error Error(string)");
        }
        if (key === "Panic") {
          return ErrorFragment.from("error Panic(uint256)");
        }
        return null;
      } else if (matching.length > 1) {
        const matchStr = matching.map((m) => JSON.stringify(m.format())).join(", ");
        assertArgument(false, `ambiguous error description (i.e. ${matchStr})`, "name", key);
      }
      return matching[0];
    }
    key = ErrorFragment.from(key).format();
    if (key === "Error(string)") {
      return ErrorFragment.from("error Error(string)");
    }
    if (key === "Panic(uint256)") {
      return ErrorFragment.from("error Panic(uint256)");
    }
    const result = this.#errors.get(key);
    if (result) {
      return result;
    }
    return null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(callback) {
    const names = Array.from(this.#errors.keys());
    names.sort((a, b2) => a.localeCompare(b2));
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      callback(this.#errors.get(name), i);
    }
  }
  // Get the 4-byte selector used by Solidity to identify a function
  /*
  getSelector(fragment: ErrorFragment | FunctionFragment): string {
      if (typeof(fragment) === "string") {
          const matches: Array<Fragment> = [ ];
  
          try { matches.push(this.getFunction(fragment)); } catch (error) { }
          try { matches.push(this.getError(<string>fragment)); } catch (_) { }
  
          if (matches.length === 0) {
              logger.throwArgumentError("unknown fragment", "key", fragment);
          } else if (matches.length > 1) {
              logger.throwArgumentError("ambiguous fragment matches function and error", "key", fragment);
          }
  
          fragment = matches[0];
      }
  
      return dataSlice(id(fragment.format()), 0, 4);
  }
      */
  // Get the 32-byte topic hash used by Solidity to identify an event
  /*
  getEventTopic(fragment: EventFragment): string {
      //if (typeof(fragment) === "string") { fragment = this.getEvent(eventFragment); }
      return id(fragment.format());
  }
  */
  _decodeParams(params, data) {
    return this.#abiCoder.decode(params, data);
  }
  _encodeParams(params, values) {
    return this.#abiCoder.encode(params, values);
  }
  /**
   *  Encodes a ``tx.data`` object for deploying the Contract with
   *  the %%values%% as the constructor arguments.
   */
  encodeDeploy(values) {
    return this._encodeParams(this.deploy.inputs, values || []);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified error (see [[getError]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeErrorResult(fragment, data) {
    if (typeof fragment === "string") {
      const f = this.getError(fragment);
      assertArgument(f, "unknown error", "fragment", fragment);
      fragment = f;
    }
    assertArgument(dataSlice(data, 0, 4) === fragment.selector, `data signature does not match error ${fragment.name}.`, "data", data);
    return this._decodeParams(fragment.inputs, dataSlice(data, 4));
  }
  /**
   *  Encodes the transaction revert data for a call result that
   *  reverted from the the Contract with the sepcified %%error%%
   *  (see [[getError]] for valid values for %%fragment%%) with the %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeErrorResult(fragment, values) {
    if (typeof fragment === "string") {
      const f = this.getError(fragment);
      assertArgument(f, "unknown error", "fragment", fragment);
      fragment = f;
    }
    return concat([
      fragment.selector,
      this._encodeParams(fragment.inputs, values || [])
    ]);
  }
  /**
   *  Decodes the %%data%% from a transaction ``tx.data`` for
   *  the function specified (see [[getFunction]] for valid values
   *  for %%fragment%%).
   *
   *  Most developers should prefer the [[parseTransaction]] method
   *  instead, which will automatically detect the fragment.
   */
  decodeFunctionData(fragment, data) {
    if (typeof fragment === "string") {
      const f = this.getFunction(fragment);
      assertArgument(f, "unknown function", "fragment", fragment);
      fragment = f;
    }
    assertArgument(dataSlice(data, 0, 4) === fragment.selector, `data signature does not match function ${fragment.name}.`, "data", data);
    return this._decodeParams(fragment.inputs, dataSlice(data, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(fragment, values) {
    if (typeof fragment === "string") {
      const f = this.getFunction(fragment);
      assertArgument(f, "unknown function", "fragment", fragment);
      fragment = f;
    }
    return concat([
      fragment.selector,
      this._encodeParams(fragment.inputs, values || [])
    ]);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeFunctionResult(fragment, data) {
    if (typeof fragment === "string") {
      const f = this.getFunction(fragment);
      assertArgument(f, "unknown function", "fragment", fragment);
      fragment = f;
    }
    let message = "invalid length for result data";
    const bytes2 = getBytesCopy(data);
    if (bytes2.length % 32 === 0) {
      try {
        return this.#abiCoder.decode(fragment.outputs, bytes2);
      } catch (error) {
        message = "could not decode result data";
      }
    }
    assert(false, message, "BAD_DATA", {
      value: hexlify(bytes2),
      info: { method: fragment.name, signature: fragment.format() }
    });
  }
  makeError(_data, tx) {
    const data = getBytes(_data, "data");
    const error = AbiCoder.getBuiltinCallException("call", tx, data);
    const customPrefix = "execution reverted (unknown custom error)";
    if (error.message.startsWith(customPrefix)) {
      const selector = hexlify(data.slice(0, 4));
      const ef = this.getError(selector);
      if (ef) {
        try {
          const args = this.#abiCoder.decode(ef.inputs, data.slice(4));
          error.revert = {
            name: ef.name,
            signature: ef.format(),
            args
          };
          error.reason = error.revert.signature;
          error.message = `execution reverted: ${error.reason}`;
        } catch (e) {
          error.message = `execution reverted (coult not decode custom error)`;
        }
      }
    }
    const parsed = this.parseTransaction(tx);
    if (parsed) {
      error.invocation = {
        method: parsed.name,
        signature: parsed.signature,
        args: parsed.args
      };
    }
    return error;
  }
  /**
   *  Encodes the result data (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values
   *  for %%fragment%%) with %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeFunctionResult(fragment, values) {
    if (typeof fragment === "string") {
      const f = this.getFunction(fragment);
      assertArgument(f, "unknown function", "fragment", fragment);
      fragment = f;
    }
    return hexlify(this.#abiCoder.encode(fragment.outputs, values || []));
  }
  /*
      spelunk(inputs: Array<ParamType>, values: ReadonlyArray<any>, processfunc: (type: string, value: any) => Promise<any>): Promise<Array<any>> {
          const promises: Array<Promise<>> = [ ];
          const process = function(type: ParamType, value: any): any {
              if (type.baseType === "array") {
                  return descend(type.child
              }
              if (type. === "address") {
              }
          };
  
          const descend = function (inputs: Array<ParamType>, values: ReadonlyArray<any>) {
              if (inputs.length !== values.length) { throw new Error("length mismatch"); }
              
          };
  
          const result: Array<any> = [ ];
          values.forEach((value, index) => {
              if (value == null) {
                  topics.push(null);
              } else if (param.baseType === "array" || param.baseType === "tuple") {
                  logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
              } else if (Array.isArray(value)) {
                  topics.push(value.map((value) => encodeTopic(param, value)));
              } else {
                  topics.push(encodeTopic(param, value));
              }
          });
      }
  */
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(fragment, values) {
    if (typeof fragment === "string") {
      const f = this.getEvent(fragment);
      assertArgument(f, "unknown event", "eventFragment", fragment);
      fragment = f;
    }
    assert(values.length <= fragment.inputs.length, `too many arguments for ${fragment.format()}`, "UNEXPECTED_ARGUMENT", { count: values.length, expectedCount: fragment.inputs.length });
    const topics = [];
    if (!fragment.anonymous) {
      topics.push(fragment.topicHash);
    }
    const encodeTopic = (param, value) => {
      if (param.type === "string") {
        return id(value);
      } else if (param.type === "bytes") {
        return keccak256(hexlify(value));
      }
      if (param.type === "bool" && typeof value === "boolean") {
        value = value ? "0x01" : "0x00";
      } else if (param.type.match(/^u?int/)) {
        value = toBeHex(value);
      } else if (param.type.match(/^bytes/)) {
        value = zeroPadBytes(value, 32);
      } else if (param.type === "address") {
        this.#abiCoder.encode(["address"], [value]);
      }
      return zeroPadValue(hexlify(value), 32);
    };
    values.forEach((value, index) => {
      const param = fragment.inputs[index];
      if (!param.indexed) {
        assertArgument(value == null, "cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
        return;
      }
      if (value == null) {
        topics.push(null);
      } else if (param.baseType === "array" || param.baseType === "tuple") {
        assertArgument(false, "filtering with tuples or arrays not supported", "contract." + param.name, value);
      } else if (Array.isArray(value)) {
        topics.push(value.map((value2) => encodeTopic(param, value2)));
      } else {
        topics.push(encodeTopic(param, value));
      }
    });
    while (topics.length && topics[topics.length - 1] === null) {
      topics.pop();
    }
    return topics;
  }
  encodeEventLog(fragment, values) {
    if (typeof fragment === "string") {
      const f = this.getEvent(fragment);
      assertArgument(f, "unknown event", "eventFragment", fragment);
      fragment = f;
    }
    const topics = [];
    const dataTypes = [];
    const dataValues = [];
    if (!fragment.anonymous) {
      topics.push(fragment.topicHash);
    }
    assertArgument(values.length === fragment.inputs.length, "event arguments/values mismatch", "values", values);
    fragment.inputs.forEach((param, index) => {
      const value = values[index];
      if (param.indexed) {
        if (param.type === "string") {
          topics.push(id(value));
        } else if (param.type === "bytes") {
          topics.push(keccak256(value));
        } else if (param.baseType === "tuple" || param.baseType === "array") {
          throw new Error("not implemented");
        } else {
          topics.push(this.#abiCoder.encode([param.type], [value]));
        }
      } else {
        dataTypes.push(param);
        dataValues.push(value);
      }
    });
    return {
      data: this.#abiCoder.encode(dataTypes, dataValues),
      topics
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(fragment, data, topics) {
    if (typeof fragment === "string") {
      const f = this.getEvent(fragment);
      assertArgument(f, "unknown event", "eventFragment", fragment);
      fragment = f;
    }
    if (topics != null && !fragment.anonymous) {
      const eventTopic = fragment.topicHash;
      assertArgument(isHexString(topics[0], 32) && topics[0].toLowerCase() === eventTopic, "fragment/topic mismatch", "topics[0]", topics[0]);
      topics = topics.slice(1);
    }
    const indexed = [];
    const nonIndexed = [];
    const dynamic = [];
    fragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
          indexed.push(ParamType.from({ type: "bytes32", name: param.name }));
          dynamic.push(true);
        } else {
          indexed.push(param);
          dynamic.push(false);
        }
      } else {
        nonIndexed.push(param);
        dynamic.push(false);
      }
    });
    const resultIndexed = topics != null ? this.#abiCoder.decode(indexed, concat(topics)) : null;
    const resultNonIndexed = this.#abiCoder.decode(nonIndexed, data, true);
    const values = [];
    const keys = [];
    let nonIndexedIndex = 0, indexedIndex = 0;
    fragment.inputs.forEach((param, index) => {
      let value = null;
      if (param.indexed) {
        if (resultIndexed == null) {
          value = new Indexed(null);
        } else if (dynamic[index]) {
          value = new Indexed(resultIndexed[indexedIndex++]);
        } else {
          try {
            value = resultIndexed[indexedIndex++];
          } catch (error) {
            value = error;
          }
        }
      } else {
        try {
          value = resultNonIndexed[nonIndexedIndex++];
        } catch (error) {
          value = error;
        }
      }
      values.push(value);
      keys.push(param.name || null);
    });
    return Result.fromItems(values, keys);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(tx) {
    const data = getBytes(tx.data, "tx.data");
    const value = getBigInt(tx.value != null ? tx.value : 0, "tx.value");
    const fragment = this.getFunction(hexlify(data.slice(0, 4)));
    if (!fragment) {
      return null;
    }
    const args = this.#abiCoder.decode(fragment.inputs, data.slice(4));
    return new TransactionDescription(fragment, fragment.selector, args, value);
  }
  parseCallResult(data) {
    throw new Error("@TODO");
  }
  /**
   *  Parses a receipt log, finding the matching event and extracts
   *  the parameter values along with other useful event details.
   *
   *  If the matching event cannot be found, returns null.
   */
  parseLog(log) {
    const fragment = this.getEvent(log.topics[0]);
    if (!fragment || fragment.anonymous) {
      return null;
    }
    return new LogDescription(fragment, fragment.topicHash, this.decodeEventLog(fragment, log.data, log.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(data) {
    const hexData = hexlify(data);
    const fragment = this.getError(dataSlice(hexData, 0, 4));
    if (!fragment) {
      return null;
    }
    const args = this.#abiCoder.decode(fragment.inputs, dataSlice(hexData, 4));
    return new ErrorDescription(fragment, fragment.selector, args);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(value) {
    if (value instanceof _Interface) {
      return value;
    }
    if (typeof value === "string") {
      return new _Interface(JSON.parse(value));
    }
    if (typeof value.formatJson === "function") {
      return new _Interface(value.formatJson());
    }
    if (typeof value.format === "function") {
      return new _Interface(value.format("json"));
    }
    return new _Interface(value);
  }
};

// node_modules/ethers/lib.esm/providers/provider.js
var BN_04 = BigInt(0);
function toJson(value) {
  if (value == null) {
    return null;
  }
  return value.toString();
}
function copyRequest(req) {
  const result = {};
  if (req.to) {
    result.to = req.to;
  }
  if (req.from) {
    result.from = req.from;
  }
  if (req.data) {
    result.data = hexlify(req.data);
  }
  const bigIntKeys = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const key of bigIntKeys) {
    if (!(key in req) || req[key] == null) {
      continue;
    }
    result[key] = getBigInt(req[key], `request.${key}`);
  }
  const numberKeys = "type,nonce".split(/,/);
  for (const key of numberKeys) {
    if (!(key in req) || req[key] == null) {
      continue;
    }
    result[key] = getNumber(req[key], `request.${key}`);
  }
  if (req.accessList) {
    result.accessList = accessListify(req.accessList);
  }
  if ("blockTag" in req) {
    result.blockTag = req.blockTag;
  }
  if ("enableCcipRead" in req) {
    result.enableCcipRead = !!req.enableCcipRead;
  }
  if ("customData" in req) {
    result.customData = req.customData;
  }
  if ("blobVersionedHashes" in req && req.blobVersionedHashes) {
    result.blobVersionedHashes = req.blobVersionedHashes.slice();
  }
  if ("kzg" in req) {
    result.kzg = req.kzg;
  }
  if ("blobs" in req && req.blobs) {
    result.blobs = req.blobs.map((b2) => {
      if (isBytesLike(b2)) {
        return hexlify(b2);
      }
      return Object.assign({}, b2);
    });
  }
  return result;
}
var Log = class {
  /**
   *  The provider connected to the log used to fetch additional details
   *  if necessary.
   */
  provider;
  /**
   *  The transaction hash of the transaction this log occurred in. Use the
   *  [[Log-getTransaction]] to get the [[TransactionResponse]].
   */
  transactionHash;
  /**
   *  The block hash of the block this log occurred in. Use the
   *  [[Log-getBlock]] to get the [[Block]].
   */
  blockHash;
  /**
   *  The block number of the block this log occurred in. It is preferred
   *  to use the [[Block-hash]] when fetching the related [[Block]],
   *  since in the case of an orphaned block, the block at that height may
   *  have changed.
   */
  blockNumber;
  /**
   *  If the **Log** represents a block that was removed due to an orphaned
   *  block, this will be true.
   *
   *  This can only happen within an orphan event listener.
   */
  removed;
  /**
   *  The address of the contract that emitted this log.
   */
  address;
  /**
   *  The data included in this log when it was emitted.
   */
  data;
  /**
   *  The indexed topics included in this log when it was emitted.
   *
   *  All topics are included in the bloom filters, so they can be
   *  efficiently filtered using the [[Provider-getLogs]] method.
   */
  topics;
  /**
   *  The index within the block this log occurred at. This is generally
   *  not useful to developers, but can be used with the various roots
   *  to proof inclusion within a block.
   */
  index;
  /**
   *  The index within the transaction of this log.
   */
  transactionIndex;
  /**
   *  @_ignore:
   */
  constructor(log, provider) {
    this.provider = provider;
    const topics = Object.freeze(log.topics.slice());
    defineProperties(this, {
      transactionHash: log.transactionHash,
      blockHash: log.blockHash,
      blockNumber: log.blockNumber,
      removed: log.removed,
      address: log.address,
      data: log.data,
      topics,
      index: log.index,
      transactionIndex: log.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address, blockHash, blockNumber, data, index, removed, topics, transactionHash, transactionIndex } = this;
    return {
      _type: "log",
      address,
      blockHash,
      blockNumber,
      data,
      index,
      removed,
      topics,
      transactionHash,
      transactionIndex
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const block = await this.provider.getBlock(this.blockHash);
    assert(!!block, "failed to find transaction", "UNKNOWN_ERROR", {});
    return block;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const tx = await this.provider.getTransaction(this.transactionHash);
    assert(!!tx, "failed to find transaction", "UNKNOWN_ERROR", {});
    return tx;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const receipt = await this.provider.getTransactionReceipt(this.transactionHash);
    assert(!!receipt, "failed to find transaction receipt", "UNKNOWN_ERROR", {});
    return receipt;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return createRemovedLogFilter(this);
  }
};
var TransactionReceipt = class {
  /**
   *  The provider connected to the log used to fetch additional details
   *  if necessary.
   */
  provider;
  /**
   *  The address the transaction was sent to.
   */
  to;
  /**
   *  The sender of the transaction.
   */
  from;
  /**
   *  The address of the contract if the transaction was directly
   *  responsible for deploying one.
   *
   *  This is non-null **only** if the ``to`` is empty and the ``data``
   *  was successfully executed as initcode.
   */
  contractAddress;
  /**
   *  The transaction hash.
   */
  hash;
  /**
   *  The index of this transaction within the block transactions.
   */
  index;
  /**
   *  The block hash of the [[Block]] this transaction was included in.
   */
  blockHash;
  /**
   *  The block number of the [[Block]] this transaction was included in.
   */
  blockNumber;
  /**
   *  The bloom filter bytes that represent all logs that occurred within
   *  this transaction. This is generally not useful for most developers,
   *  but can be used to validate the included logs.
   */
  logsBloom;
  /**
   *  The actual amount of gas used by this transaction.
   *
   *  When creating a transaction, the amount of gas that will be used can
   *  only be approximated, but the sender must pay the gas fee for the
   *  entire gas limit. After the transaction, the difference is refunded.
   */
  gasUsed;
  /**
   *  The gas used for BLObs. See [[link-eip-4844]].
   */
  blobGasUsed;
  /**
   *  The amount of gas used by all transactions within the block for this
   *  and all transactions with a lower ``index``.
   *
   *  This is generally not useful for developers but can be used to
   *  validate certain aspects of execution.
   */
  cumulativeGasUsed;
  /**
   *  The actual gas price used during execution.
   *
   *  Due to the complexity of [[link-eip-1559]] this value can only
   *  be caluclated after the transaction has been mined, snce the base
   *  fee is protocol-enforced.
   */
  gasPrice;
  /**
   *  The price paid per BLOB in gas. See [[link-eip-4844]].
   */
  blobGasPrice;
  /**
   *  The [[link-eip-2718]] transaction type.
   */
  type;
  //readonly byzantium!: boolean;
  /**
   *  The status of this transaction, indicating success (i.e. ``1``) or
   *  a revert (i.e. ``0``).
   *
   *  This is available in post-byzantium blocks, but some backends may
   *  backfill this value.
   */
  status;
  /**
   *  The root hash of this transaction.
   *
   *  This is no present and was only included in pre-byzantium blocks, but
   *  could be used to validate certain parts of the receipt.
   */
  root;
  #logs;
  /**
   *  @_ignore:
   */
  constructor(tx, provider) {
    this.#logs = Object.freeze(tx.logs.map((log) => {
      return new Log(log, provider);
    }));
    let gasPrice = BN_04;
    if (tx.effectiveGasPrice != null) {
      gasPrice = tx.effectiveGasPrice;
    } else if (tx.gasPrice != null) {
      gasPrice = tx.gasPrice;
    }
    defineProperties(this, {
      provider,
      to: tx.to,
      from: tx.from,
      contractAddress: tx.contractAddress,
      hash: tx.hash,
      index: tx.index,
      blockHash: tx.blockHash,
      blockNumber: tx.blockNumber,
      logsBloom: tx.logsBloom,
      gasUsed: tx.gasUsed,
      cumulativeGasUsed: tx.cumulativeGasUsed,
      blobGasUsed: tx.blobGasUsed,
      gasPrice,
      blobGasPrice: tx.blobGasPrice,
      type: tx.type,
      //byzantium: tx.byzantium,
      status: tx.status,
      root: tx.root
    });
  }
  /**
   *  The logs for this transaction.
   */
  get logs() {
    return this.#logs;
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to,
      from,
      contractAddress,
      hash,
      index,
      blockHash,
      blockNumber,
      logsBloom,
      logs,
      //byzantium, 
      status,
      root
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash,
      blockNumber,
      //byzantium, 
      contractAddress,
      cumulativeGasUsed: toJson(this.cumulativeGasUsed),
      from,
      gasPrice: toJson(this.gasPrice),
      blobGasUsed: toJson(this.blobGasUsed),
      blobGasPrice: toJson(this.blobGasPrice),
      gasUsed: toJson(this.gasUsed),
      hash,
      index,
      logs,
      logsBloom,
      root,
      status,
      to
    };
  }
  /**
   *  @_ignore:
   */
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.length) {
          return { value: this.logs[index++], done: false };
        }
        return { value: void 0, done: true };
      }
    };
  }
  /**
   *  The total fee for this transaction, in wei.
   */
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  /**
   *  Resolves to the block this transaction occurred in.
   */
  async getBlock() {
    const block = await this.provider.getBlock(this.blockHash);
    if (block == null) {
      throw new Error("TODO");
    }
    return block;
  }
  /**
   *  Resolves to the transaction this transaction occurred in.
   */
  async getTransaction() {
    const tx = await this.provider.getTransaction(this.hash);
    if (tx == null) {
      throw new Error("TODO");
    }
    return tx;
  }
  /**
   *  Resolves to the return value of the execution of this transaction.
   *
   *  Support for this feature is limited, as it requires an archive node
   *  with the ``debug_`` or ``trace_`` API enabled.
   */
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  /**
   *  Resolves to the number of confirmations this transaction has.
   */
  async confirmations() {
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return createRemovedTransactionFilter(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(other) {
    assert(!other || other.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" });
    return createReorderedTransactionFilter(this, other);
  }
};
var TransactionResponse = class _TransactionResponse {
  /**
   *  The provider this is connected to, which will influence how its
   *  methods will resolve its async inspection methods.
   */
  provider;
  /**
   *  The block number of the block that this transaction was included in.
   *
   *  This is ``null`` for pending transactions.
   */
  blockNumber;
  /**
   *  The blockHash of the block that this transaction was included in.
   *
   *  This is ``null`` for pending transactions.
   */
  blockHash;
  /**
   *  The index within the block that this transaction resides at.
   */
  index;
  /**
   *  The transaction hash.
   */
  hash;
  /**
   *  The [[link-eip-2718]] transaction envelope type. This is
   *  ``0`` for legacy transactions types.
   */
  type;
  /**
   *  The receiver of this transaction.
   *
   *  If ``null``, then the transaction is an initcode transaction.
   *  This means the result of executing the [[data]] will be deployed
   *  as a new contract on chain (assuming it does not revert) and the
   *  address may be computed using [[getCreateAddress]].
   */
  to;
  /**
   *  The sender of this transaction. It is implicitly computed
   *  from the transaction pre-image hash (as the digest) and the
   *  [[signature]] using ecrecover.
   */
  from;
  /**
   *  The nonce, which is used to prevent replay attacks and offer
   *  a method to ensure transactions from a given sender are explicitly
   *  ordered.
   *
   *  When sending a transaction, this must be equal to the number of
   *  transactions ever sent by [[from]].
   */
  nonce;
  /**
   *  The maximum units of gas this transaction can consume. If execution
   *  exceeds this, the entries transaction is reverted and the sender
   *  is charged for the full amount, despite not state changes being made.
   */
  gasLimit;
  /**
   *  The gas price can have various values, depending on the network.
   *
   *  In modern networks, for transactions that are included this is
   *  the //effective gas price// (the fee per gas that was actually
   *  charged), while for transactions that have not been included yet
   *  is the [[maxFeePerGas]].
   *
   *  For legacy transactions, or transactions on legacy networks, this
   *  is the fee that will be charged per unit of gas the transaction
   *  consumes.
   */
  gasPrice;
  /**
   *  The maximum priority fee (per unit of gas) to allow a
   *  validator to charge the sender. This is inclusive of the
   *  [[maxFeeFeePerGas]].
   */
  maxPriorityFeePerGas;
  /**
   *  The maximum fee (per unit of gas) to allow this transaction
   *  to charge the sender.
   */
  maxFeePerGas;
  /**
   *  The [[link-eip-4844]] max fee per BLOb gas.
   */
  maxFeePerBlobGas;
  /**
   *  The data.
   */
  data;
  /**
   *  The value, in wei. Use [[formatEther]] to format this value
   *  as ether.
   */
  value;
  /**
   *  The chain ID.
   */
  chainId;
  /**
   *  The signature.
   */
  signature;
  /**
   *  The [[link-eip-2930]] access list for transaction types that
   *  support it, otherwise ``null``.
   */
  accessList;
  /**
   *  The [[link-eip-4844]] BLOb versioned hashes.
   */
  blobVersionedHashes;
  #startBlock;
  /**
   *  @_ignore:
   */
  constructor(tx, provider) {
    this.provider = provider;
    this.blockNumber = tx.blockNumber != null ? tx.blockNumber : null;
    this.blockHash = tx.blockHash != null ? tx.blockHash : null;
    this.hash = tx.hash;
    this.index = tx.index;
    this.type = tx.type;
    this.from = tx.from;
    this.to = tx.to || null;
    this.gasLimit = tx.gasLimit;
    this.nonce = tx.nonce;
    this.data = tx.data;
    this.value = tx.value;
    this.gasPrice = tx.gasPrice;
    this.maxPriorityFeePerGas = tx.maxPriorityFeePerGas != null ? tx.maxPriorityFeePerGas : null;
    this.maxFeePerGas = tx.maxFeePerGas != null ? tx.maxFeePerGas : null;
    this.maxFeePerBlobGas = tx.maxFeePerBlobGas != null ? tx.maxFeePerBlobGas : null;
    this.chainId = tx.chainId;
    this.signature = tx.signature;
    this.accessList = tx.accessList != null ? tx.accessList : null;
    this.blobVersionedHashes = tx.blobVersionedHashes != null ? tx.blobVersionedHashes : null;
    this.#startBlock = -1;
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber, blockHash, index, hash, type, to, from, nonce, data, signature, accessList, blobVersionedHashes } = this;
    return {
      _type: "TransactionResponse",
      accessList,
      blockNumber,
      blockHash,
      blobVersionedHashes,
      chainId: toJson(this.chainId),
      data,
      from,
      gasLimit: toJson(this.gasLimit),
      gasPrice: toJson(this.gasPrice),
      hash,
      maxFeePerGas: toJson(this.maxFeePerGas),
      maxPriorityFeePerGas: toJson(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: toJson(this.maxFeePerBlobGas),
      nonce,
      signature,
      to,
      index,
      type,
      value: toJson(this.value)
    };
  }
  /**
   *  Resolves to the Block that this transaction was included in.
   *
   *  This will return null if the transaction has not been included yet.
   */
  async getBlock() {
    let blockNumber = this.blockNumber;
    if (blockNumber == null) {
      const tx = await this.getTransaction();
      if (tx) {
        blockNumber = tx.blockNumber;
      }
    }
    if (blockNumber == null) {
      return null;
    }
    const block = this.provider.getBlock(blockNumber);
    if (block == null) {
      throw new Error("TODO");
    }
    return block;
  }
  /**
   *  Resolves to this transaction being re-requested from the
   *  provider. This can be used if you have an unmined transaction
   *  and wish to get an up-to-date populated instance.
   */
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  /**
   *  Resolve to the number of confirmations this transaction has.
   */
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx, blockNumber: blockNumber2 } = await resolveProperties({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      if (tx == null || tx.blockNumber == null) {
        return 0;
      }
      return blockNumber2 - tx.blockNumber + 1;
    }
    const blockNumber = await this.provider.getBlockNumber();
    return blockNumber - this.blockNumber + 1;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(_confirms, _timeout) {
    const confirms = _confirms == null ? 1 : _confirms;
    const timeout = _timeout == null ? 0 : _timeout;
    let startBlock = this.#startBlock;
    let nextScan = -1;
    let stopScanning = startBlock === -1 ? true : false;
    const checkReplacement = async () => {
      if (stopScanning) {
        return null;
      }
      const { blockNumber, nonce } = await resolveProperties({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (nonce < this.nonce) {
        startBlock = blockNumber;
        return;
      }
      if (stopScanning) {
        return null;
      }
      const mined = await this.getTransaction();
      if (mined && mined.blockNumber != null) {
        return;
      }
      if (nextScan === -1) {
        nextScan = startBlock - 3;
        if (nextScan < this.#startBlock) {
          nextScan = this.#startBlock;
        }
      }
      while (nextScan <= blockNumber) {
        if (stopScanning) {
          return null;
        }
        const block = await this.provider.getBlock(nextScan, true);
        if (block == null) {
          return;
        }
        for (const hash of block) {
          if (hash === this.hash) {
            return;
          }
        }
        for (let i = 0; i < block.length; i++) {
          const tx = await block.getTransaction(i);
          if (tx.from === this.from && tx.nonce === this.nonce) {
            if (stopScanning) {
              return null;
            }
            const receipt2 = await this.provider.getTransactionReceipt(tx.hash);
            if (receipt2 == null) {
              return;
            }
            if (blockNumber - receipt2.blockNumber + 1 < confirms) {
              return;
            }
            let reason = "replaced";
            if (tx.data === this.data && tx.to === this.to && tx.value === this.value) {
              reason = "repriced";
            } else if (tx.data === "0x" && tx.from === tx.to && tx.value === BN_04) {
              reason = "cancelled";
            }
            assert(false, "transaction was replaced", "TRANSACTION_REPLACED", {
              cancelled: reason === "replaced" || reason === "cancelled",
              reason,
              replacement: tx.replaceableTransaction(startBlock),
              hash: tx.hash,
              receipt: receipt2
            });
          }
        }
        nextScan++;
      }
      return;
    };
    const checkReceipt = (receipt2) => {
      if (receipt2 == null || receipt2.status !== 0) {
        return receipt2;
      }
      assert(false, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: receipt2.to,
          from: receipt2.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: receipt2
      });
    };
    const receipt = await this.provider.getTransactionReceipt(this.hash);
    if (confirms === 0) {
      return checkReceipt(receipt);
    }
    if (receipt) {
      if (await receipt.confirmations() >= confirms) {
        return checkReceipt(receipt);
      }
    } else {
      await checkReplacement();
      if (confirms === 0) {
        return null;
      }
    }
    const waiter = new Promise((resolve, reject) => {
      const cancellers = [];
      const cancel = () => {
        cancellers.forEach((c) => c());
      };
      cancellers.push(() => {
        stopScanning = true;
      });
      if (timeout > 0) {
        const timer = setTimeout(() => {
          cancel();
          reject(makeError("wait for transaction timeout", "TIMEOUT"));
        }, timeout);
        cancellers.push(() => {
          clearTimeout(timer);
        });
      }
      const txListener = async (receipt2) => {
        if (await receipt2.confirmations() >= confirms) {
          cancel();
          try {
            resolve(checkReceipt(receipt2));
          } catch (error) {
            reject(error);
          }
        }
      };
      cancellers.push(() => {
        this.provider.off(this.hash, txListener);
      });
      this.provider.on(this.hash, txListener);
      if (startBlock >= 0) {
        const replaceListener = async () => {
          try {
            await checkReplacement();
          } catch (error) {
            if (isError(error, "TRANSACTION_REPLACED")) {
              cancel();
              reject(error);
              return;
            }
          }
          if (!stopScanning) {
            this.provider.once("block", replaceListener);
          }
        };
        cancellers.push(() => {
          this.provider.off("block", replaceListener);
        });
        this.provider.once("block", replaceListener);
      }
    });
    return await waiter;
  }
  /**
   *  Returns ``true`` if this transaction has been included.
   *
   *  This is effective only as of the time the TransactionResponse
   *  was instantiated. To get up-to-date information, use
   *  [[getTransaction]].
   *
   *  This provides a Type Guard that this transaction will have
   *  non-null property values for properties that are null for
   *  unmined transactions.
   */
  isMined() {
    return this.blockHash != null;
  }
  /**
   *  Returns true if the transaction is a legacy (i.e. ``type == 0``)
   *  transaction.
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if the transaction is a Berlin (i.e. ``type == 1``)
   *  transaction. See [[link-eip-2070]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if the transaction is a London (i.e. ``type == 2``)
   *  transaction. See [[link-eip-1559]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
   *  transaction. See [[link-eip-4844]].
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that evict this transaction.
   */
  removedEvent() {
    assert(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" });
    return createRemovedTransactionFilter(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(other) {
    assert(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" });
    assert(!other || other.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" });
    return createReorderedTransactionFilter(this, other);
  }
  /**
   *  Returns a new TransactionResponse instance which has the ability to
   *  detect (and throw an error) if the transaction is replaced, which
   *  will begin scanning at %%startBlock%%.
   *
   *  This should generally not be used by developers and is intended
   *  primarily for internal use. Setting an incorrect %%startBlock%% can
   *  have devastating performance consequences if used incorrectly.
   */
  replaceableTransaction(startBlock) {
    assertArgument(Number.isInteger(startBlock) && startBlock >= 0, "invalid startBlock", "startBlock", startBlock);
    const tx = new _TransactionResponse(this, this.provider);
    tx.#startBlock = startBlock;
    return tx;
  }
};
function createReorderedTransactionFilter(tx, other) {
  return { orphan: "reorder-transaction", tx, other };
}
function createRemovedTransactionFilter(tx) {
  return { orphan: "drop-transaction", tx };
}
function createRemovedLogFilter(log) {
  return { orphan: "drop-log", log: {
    transactionHash: log.transactionHash,
    blockHash: log.blockHash,
    blockNumber: log.blockNumber,
    address: log.address,
    data: log.data,
    topics: Object.freeze(log.topics.slice()),
    index: log.index
  } };
}

// node_modules/ethers/lib.esm/contract/wrappers.js
var EventLog = class extends Log {
  /**
   *  The Contract Interface.
   */
  interface;
  /**
   *  The matching event.
   */
  fragment;
  /**
   *  The parsed arguments passed to the event by ``emit``.
   */
  args;
  /**
   * @_ignore:
   */
  constructor(log, iface, fragment) {
    super(log, log.provider);
    const args = iface.decodeEventLog(fragment, log.data, log.topics);
    defineProperties(this, { args, fragment, interface: iface });
  }
  /**
   *  The name of the event.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The signature of the event.
   */
  get eventSignature() {
    return this.fragment.format();
  }
};
var UndecodedEventLog = class extends Log {
  /**
   *  The error encounted when trying to decode the log.
   */
  error;
  /**
   * @_ignore:
   */
  constructor(log, error) {
    super(log, log.provider);
    defineProperties(this, { error });
  }
};
var ContractTransactionReceipt = class extends TransactionReceipt {
  #iface;
  /**
   *  @_ignore:
   */
  constructor(iface, provider, tx) {
    super(tx, provider);
    this.#iface = iface;
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((log) => {
      const fragment = log.topics.length ? this.#iface.getEvent(log.topics[0]) : null;
      if (fragment) {
        try {
          return new EventLog(log, this.#iface, fragment);
        } catch (error) {
          return new UndecodedEventLog(log, error);
        }
      }
      return log;
    });
  }
};
var ContractTransactionResponse = class extends TransactionResponse {
  #iface;
  /**
   *  @_ignore:
   */
  constructor(iface, provider, tx) {
    super(tx, provider);
    this.#iface = iface;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(confirms, timeout) {
    const receipt = await super.wait(confirms, timeout);
    if (receipt == null) {
      return null;
    }
    return new ContractTransactionReceipt(this.#iface, this.provider, receipt);
  }
};
var ContractUnknownEventPayload = class extends EventPayload {
  /**
   *  The log with no matching events.
   */
  log;
  /**
   *  @_event:
   */
  constructor(contract, listener, filter, log) {
    super(contract, listener, filter);
    defineProperties(this, { log });
  }
  /**
   *  Resolves to the block the event occured in.
   */
  async getBlock() {
    return await this.log.getBlock();
  }
  /**
   *  Resolves to the transaction the event occured in.
   */
  async getTransaction() {
    return await this.log.getTransaction();
  }
  /**
   *  Resolves to the transaction receipt the event occured in.
   */
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
};
var ContractEventPayload = class extends ContractUnknownEventPayload {
  /**
   *  @_ignore:
   */
  constructor(contract, listener, filter, fragment, _log) {
    super(contract, listener, filter, new EventLog(_log, contract.interface, fragment));
    const args = contract.interface.decodeEventLog(fragment, this.log.data, this.log.topics);
    defineProperties(this, { args, fragment });
  }
  /**
   *  The event name.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The event signature.
   */
  get eventSignature() {
    return this.fragment.format();
  }
};

// node_modules/ethers/lib.esm/contract/contract.js
var BN_05 = BigInt(0);
function canCall(value) {
  return value && typeof value.call === "function";
}
function canEstimate(value) {
  return value && typeof value.estimateGas === "function";
}
function canResolve(value) {
  return value && typeof value.resolveName === "function";
}
function canSend(value) {
  return value && typeof value.sendTransaction === "function";
}
function getResolver(value) {
  if (value != null) {
    if (canResolve(value)) {
      return value;
    }
    if (value.provider) {
      return value.provider;
    }
  }
  return void 0;
}
var PreparedTopicFilter = class {
  #filter;
  fragment;
  constructor(contract, fragment, args) {
    defineProperties(this, { fragment });
    if (fragment.inputs.length < args.length) {
      throw new Error("too many arguments");
    }
    const runner = getRunner(contract.runner, "resolveName");
    const resolver = canResolve(runner) ? runner : null;
    this.#filter = async function() {
      const resolvedArgs = await Promise.all(fragment.inputs.map((param, index) => {
        const arg = args[index];
        if (arg == null) {
          return null;
        }
        return param.walkAsync(args[index], (type, value) => {
          if (type === "address") {
            if (Array.isArray(value)) {
              return Promise.all(value.map((v) => resolveAddress(v, resolver)));
            }
            return resolveAddress(value, resolver);
          }
          return value;
        });
      }));
      return contract.interface.encodeFilterTopics(fragment, resolvedArgs);
    }();
  }
  getTopicFilter() {
    return this.#filter;
  }
};
function getRunner(value, feature) {
  if (value == null) {
    return null;
  }
  if (typeof value[feature] === "function") {
    return value;
  }
  if (value.provider && typeof value.provider[feature] === "function") {
    return value.provider;
  }
  return null;
}
function getProvider(value) {
  if (value == null) {
    return null;
  }
  return value.provider || null;
}
async function copyOverrides(arg, allowed) {
  const _overrides = Typed.dereference(arg, "overrides");
  assertArgument(typeof _overrides === "object", "invalid overrides parameter", "overrides", arg);
  const overrides = copyRequest(_overrides);
  assertArgument(overrides.to == null || (allowed || []).indexOf("to") >= 0, "cannot override to", "overrides.to", overrides.to);
  assertArgument(overrides.data == null || (allowed || []).indexOf("data") >= 0, "cannot override data", "overrides.data", overrides.data);
  if (overrides.from) {
    overrides.from = overrides.from;
  }
  return overrides;
}
async function resolveArgs(_runner, inputs, args) {
  const runner = getRunner(_runner, "resolveName");
  const resolver = canResolve(runner) ? runner : null;
  return await Promise.all(inputs.map((param, index) => {
    return param.walkAsync(args[index], (type, value) => {
      value = Typed.dereference(value, type);
      if (type === "address") {
        return resolveAddress(value, resolver);
      }
      return value;
    });
  }));
}
function buildWrappedFallback(contract) {
  const populateTransaction = async function(overrides) {
    const tx = await copyOverrides(overrides, ["data"]);
    tx.to = await contract.getAddress();
    if (tx.from) {
      tx.from = await resolveAddress(tx.from, getResolver(contract.runner));
    }
    const iface = contract.interface;
    const noValue = getBigInt(tx.value || BN_05, "overrides.value") === BN_05;
    const noData = (tx.data || "0x") === "0x";
    if (iface.fallback && !iface.fallback.payable && iface.receive && !noData && !noValue) {
      assertArgument(false, "cannot send data to receive or send value to non-payable fallback", "overrides", overrides);
    }
    assertArgument(iface.fallback || noData, "cannot send data to receive-only contract", "overrides.data", tx.data);
    const payable = iface.receive || iface.fallback && iface.fallback.payable;
    assertArgument(payable || noValue, "cannot send value to non-payable fallback", "overrides.value", tx.value);
    assertArgument(iface.fallback || noData, "cannot send data to receive-only contract", "overrides.data", tx.data);
    return tx;
  };
  const staticCall = async function(overrides) {
    const runner = getRunner(contract.runner, "call");
    assert(canCall(runner), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const tx = await populateTransaction(overrides);
    try {
      return await runner.call(tx);
    } catch (error) {
      if (isCallException(error) && error.data) {
        throw contract.interface.makeError(error.data, tx);
      }
      throw error;
    }
  };
  const send = async function(overrides) {
    const runner = contract.runner;
    assert(canSend(runner), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const tx = await runner.sendTransaction(await populateTransaction(overrides));
    const provider = getProvider(contract.runner);
    return new ContractTransactionResponse(contract.interface, provider, tx);
  };
  const estimateGas = async function(overrides) {
    const runner = getRunner(contract.runner, "estimateGas");
    assert(canEstimate(runner), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" });
    return await runner.estimateGas(await populateTransaction(overrides));
  };
  const method = async (overrides) => {
    return await send(overrides);
  };
  defineProperties(method, {
    _contract: contract,
    estimateGas,
    populateTransaction,
    send,
    staticCall
  });
  return method;
}
function buildWrappedMethod(contract, key) {
  const getFragment = function(...args) {
    const fragment = contract.interface.getFunction(key, args);
    assert(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key, args }
    });
    return fragment;
  };
  const populateTransaction = async function(...args) {
    const fragment = getFragment(...args);
    let overrides = {};
    if (fragment.inputs.length + 1 === args.length) {
      overrides = await copyOverrides(args.pop());
      if (overrides.from) {
        overrides.from = await resolveAddress(overrides.from, getResolver(contract.runner));
      }
    }
    if (fragment.inputs.length !== args.length) {
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    }
    const resolvedArgs = await resolveArgs(contract.runner, fragment.inputs, args);
    return Object.assign({}, overrides, await resolveProperties({
      to: contract.getAddress(),
      data: contract.interface.encodeFunctionData(fragment, resolvedArgs)
    }));
  };
  const staticCall = async function(...args) {
    const result = await staticCallResult(...args);
    if (result.length === 1) {
      return result[0];
    }
    return result;
  };
  const send = async function(...args) {
    const runner = contract.runner;
    assert(canSend(runner), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const tx = await runner.sendTransaction(await populateTransaction(...args));
    const provider = getProvider(contract.runner);
    return new ContractTransactionResponse(contract.interface, provider, tx);
  };
  const estimateGas = async function(...args) {
    const runner = getRunner(contract.runner, "estimateGas");
    assert(canEstimate(runner), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" });
    return await runner.estimateGas(await populateTransaction(...args));
  };
  const staticCallResult = async function(...args) {
    const runner = getRunner(contract.runner, "call");
    assert(canCall(runner), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const tx = await populateTransaction(...args);
    let result = "0x";
    try {
      result = await runner.call(tx);
    } catch (error) {
      if (isCallException(error) && error.data) {
        throw contract.interface.makeError(error.data, tx);
      }
      throw error;
    }
    const fragment = getFragment(...args);
    return contract.interface.decodeFunctionResult(fragment, result);
  };
  const method = async (...args) => {
    const fragment = getFragment(...args);
    if (fragment.constant) {
      return await staticCall(...args);
    }
    return await send(...args);
  };
  defineProperties(method, {
    name: contract.interface.getFunctionName(key),
    _contract: contract,
    _key: key,
    getFragment,
    estimateGas,
    populateTransaction,
    send,
    staticCall,
    staticCallResult
  });
  Object.defineProperty(method, "fragment", {
    configurable: false,
    enumerable: true,
    get: () => {
      const fragment = contract.interface.getFunction(key);
      assert(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key }
      });
      return fragment;
    }
  });
  return method;
}
function buildWrappedEvent(contract, key) {
  const getFragment = function(...args) {
    const fragment = contract.interface.getEvent(key, args);
    assert(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key, args }
    });
    return fragment;
  };
  const method = function(...args) {
    return new PreparedTopicFilter(contract, getFragment(...args), args);
  };
  defineProperties(method, {
    name: contract.interface.getEventName(key),
    _contract: contract,
    _key: key,
    getFragment
  });
  Object.defineProperty(method, "fragment", {
    configurable: false,
    enumerable: true,
    get: () => {
      const fragment = contract.interface.getEvent(key);
      assert(fragment, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key }
      });
      return fragment;
    }
  });
  return method;
}
var internal2 = Symbol.for("_ethersInternal_contract");
var internalValues = /* @__PURE__ */ new WeakMap();
function setInternal(contract, values) {
  internalValues.set(contract[internal2], values);
}
function getInternal(contract) {
  return internalValues.get(contract[internal2]);
}
function isDeferred(value) {
  return value && typeof value === "object" && "getTopicFilter" in value && typeof value.getTopicFilter === "function" && value.fragment;
}
async function getSubInfo(contract, event) {
  let topics;
  let fragment = null;
  if (Array.isArray(event)) {
    const topicHashify = function(name) {
      if (isHexString(name, 32)) {
        return name;
      }
      const fragment2 = contract.interface.getEvent(name);
      assertArgument(fragment2, "unknown fragment", "name", name);
      return fragment2.topicHash;
    };
    topics = event.map((e) => {
      if (e == null) {
        return null;
      }
      if (Array.isArray(e)) {
        return e.map(topicHashify);
      }
      return topicHashify(e);
    });
  } else if (event === "*") {
    topics = [null];
  } else if (typeof event === "string") {
    if (isHexString(event, 32)) {
      topics = [event];
    } else {
      fragment = contract.interface.getEvent(event);
      assertArgument(fragment, "unknown fragment", "event", event);
      topics = [fragment.topicHash];
    }
  } else if (isDeferred(event)) {
    topics = await event.getTopicFilter();
  } else if ("fragment" in event) {
    fragment = event.fragment;
    topics = [fragment.topicHash];
  } else {
    assertArgument(false, "unknown event name", "event", event);
  }
  topics = topics.map((t) => {
    if (t == null) {
      return null;
    }
    if (Array.isArray(t)) {
      const items = Array.from(new Set(t.map((t2) => t2.toLowerCase())).values());
      if (items.length === 1) {
        return items[0];
      }
      items.sort();
      return items;
    }
    return t.toLowerCase();
  });
  const tag = topics.map((t) => {
    if (t == null) {
      return "null";
    }
    if (Array.isArray(t)) {
      return t.join("|");
    }
    return t;
  }).join("&");
  return { fragment, tag, topics };
}
async function hasSub(contract, event) {
  const { subs } = getInternal(contract);
  return subs.get((await getSubInfo(contract, event)).tag) || null;
}
async function getSub(contract, operation, event) {
  const provider = getProvider(contract.runner);
  assert(provider, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation });
  const { fragment, tag, topics } = await getSubInfo(contract, event);
  const { addr, subs } = getInternal(contract);
  let sub = subs.get(tag);
  if (!sub) {
    const address = addr ? addr : contract;
    const filter = { address, topics };
    const listener = (log) => {
      let foundFragment = fragment;
      if (foundFragment == null) {
        try {
          foundFragment = contract.interface.getEvent(log.topics[0]);
        } catch (error) {
        }
      }
      if (foundFragment) {
        const _foundFragment = foundFragment;
        const args = fragment ? contract.interface.decodeEventLog(fragment, log.data, log.topics) : [];
        emit(contract, event, args, (listener2) => {
          return new ContractEventPayload(contract, listener2, event, _foundFragment, log);
        });
      } else {
        emit(contract, event, [], (listener2) => {
          return new ContractUnknownEventPayload(contract, listener2, event, log);
        });
      }
    };
    let starting = [];
    const start = () => {
      if (starting.length) {
        return;
      }
      starting.push(provider.on(filter, listener));
    };
    const stop = async () => {
      if (starting.length == 0) {
        return;
      }
      let started = starting;
      starting = [];
      await Promise.all(started);
      provider.off(filter, listener);
    };
    sub = { tag, listeners: [], start, stop };
    subs.set(tag, sub);
  }
  return sub;
}
var lastEmit = Promise.resolve();
async function _emit(contract, event, args, payloadFunc) {
  await lastEmit;
  const sub = await hasSub(contract, event);
  if (!sub) {
    return false;
  }
  const count = sub.listeners.length;
  sub.listeners = sub.listeners.filter(({ listener, once }) => {
    const passArgs = Array.from(args);
    if (payloadFunc) {
      passArgs.push(payloadFunc(once ? null : listener));
    }
    try {
      listener.call(contract, ...passArgs);
    } catch (error) {
    }
    return !once;
  });
  if (sub.listeners.length === 0) {
    sub.stop();
    getInternal(contract).subs.delete(sub.tag);
  }
  return count > 0;
}
async function emit(contract, event, args, payloadFunc) {
  try {
    await lastEmit;
  } catch (error) {
  }
  const resultPromise = _emit(contract, event, args, payloadFunc);
  lastEmit = resultPromise;
  return await resultPromise;
}
var passProperties2 = ["then"];
var BaseContract = class _BaseContract {
  /**
   *  The target to connect to.
   *
   *  This can be an address, ENS name or any [[Addressable]], such as
   *  another contract. To get the resovled address, use the ``getAddress``
   *  method.
   */
  target;
  /**
   *  The contract Interface.
   */
  interface;
  /**
   *  The connected runner. This is generally a [[Provider]] or a
   *  [[Signer]], which dictates what operations are supported.
   *
   *  For example, a **Contract** connected to a [[Provider]] may
   *  only execute read-only operations.
   */
  runner;
  /**
   *  All the Events available on this contract.
   */
  filters;
  /**
   *  @_ignore:
   */
  [internal2];
  /**
   *  The fallback or receive function if any.
   */
  fallback;
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(target, abi, runner, _deployTx) {
    assertArgument(typeof target === "string" || isAddressable(target), "invalid value for Contract target", "target", target);
    if (runner == null) {
      runner = null;
    }
    const iface = Interface.from(abi);
    defineProperties(this, { target, runner, interface: iface });
    Object.defineProperty(this, internal2, { value: {} });
    let addrPromise;
    let addr = null;
    let deployTx = null;
    if (_deployTx) {
      const provider = getProvider(runner);
      deployTx = new ContractTransactionResponse(this.interface, provider, _deployTx);
    }
    let subs = /* @__PURE__ */ new Map();
    if (typeof target === "string") {
      if (isHexString(target)) {
        addr = target;
        addrPromise = Promise.resolve(target);
      } else {
        const resolver = getRunner(runner, "resolveName");
        if (!canResolve(resolver)) {
          throw makeError("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        }
        addrPromise = resolver.resolveName(target).then((addr2) => {
          if (addr2 == null) {
            throw makeError("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: target
            });
          }
          getInternal(this).addr = addr2;
          return addr2;
        });
      }
    } else {
      addrPromise = target.getAddress().then((addr2) => {
        if (addr2 == null) {
          throw new Error("TODO");
        }
        getInternal(this).addr = addr2;
        return addr2;
      });
    }
    setInternal(this, { addrPromise, addr, deployTx, subs });
    const filters = new Proxy({}, {
      get: (target2, prop, receiver) => {
        if (typeof prop === "symbol" || passProperties2.indexOf(prop) >= 0) {
          return Reflect.get(target2, prop, receiver);
        }
        try {
          return this.getEvent(prop);
        } catch (error) {
          if (!isError(error, "INVALID_ARGUMENT") || error.argument !== "key") {
            throw error;
          }
        }
        return void 0;
      },
      has: (target2, prop) => {
        if (passProperties2.indexOf(prop) >= 0) {
          return Reflect.has(target2, prop);
        }
        return Reflect.has(target2, prop) || this.interface.hasEvent(String(prop));
      }
    });
    defineProperties(this, { filters });
    defineProperties(this, {
      fallback: iface.receive || iface.fallback ? buildWrappedFallback(this) : null
    });
    return new Proxy(this, {
      get: (target2, prop, receiver) => {
        if (typeof prop === "symbol" || prop in target2 || passProperties2.indexOf(prop) >= 0) {
          return Reflect.get(target2, prop, receiver);
        }
        try {
          return target2.getFunction(prop);
        } catch (error) {
          if (!isError(error, "INVALID_ARGUMENT") || error.argument !== "key") {
            throw error;
          }
        }
        return void 0;
      },
      has: (target2, prop) => {
        if (typeof prop === "symbol" || prop in target2 || passProperties2.indexOf(prop) >= 0) {
          return Reflect.has(target2, prop);
        }
        return target2.interface.hasFunction(prop);
      }
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(runner) {
    return new _BaseContract(this.target, this.interface, runner);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(target) {
    return new _BaseContract(target, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await getInternal(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const provider = getProvider(this.runner);
    assert(provider, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
    const code = await provider.getCode(await this.getAddress());
    if (code === "0x") {
      return null;
    }
    return code;
  }
  /**
   *  Resolve to this Contract once the bytecode has been deployed, or
   *  resolve immediately if already deployed.
   */
  async waitForDeployment() {
    const deployTx = this.deploymentTransaction();
    if (deployTx) {
      await deployTx.wait();
      return this;
    }
    const code = await this.getDeployedCode();
    if (code != null) {
      return this;
    }
    const provider = getProvider(this.runner);
    assert(provider != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" });
    return new Promise((resolve, reject) => {
      const checkCode = async () => {
        try {
          const code2 = await this.getDeployedCode();
          if (code2 != null) {
            return resolve(this);
          }
          provider.once("block", checkCode);
        } catch (error) {
          reject(error);
        }
      };
      checkCode();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return getInternal(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(key) {
    if (typeof key !== "string") {
      key = key.format();
    }
    const func = buildWrappedMethod(this, key);
    return func;
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(key) {
    if (typeof key !== "string") {
      key = key.format();
    }
    return buildWrappedEvent(this, key);
  }
  /**
   *  @_ignore:
   */
  async queryTransaction(hash) {
    throw new Error("@TODO");
  }
  /*
      // @TODO: this is a non-backwards compatible change, but will be added
      //        in v7 and in a potential SmartContract class in an upcoming
      //        v6 release
      async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
          const provider = getProvider(this.runner);
          assert(provider, "contract runner does not have a provider",
              "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });
  
          const receipt = await provider.getTransactionReceipt(hash);
          if (receipt == null) { return null; }
  
          return new ContractTransactionReceipt(this.interface, provider, receipt);
      }
      */
  /**
   *  Provide historic access to event data for %%event%% in the range
   *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
   *  inclusive.
   */
  async queryFilter(event, fromBlock, toBlock) {
    if (fromBlock == null) {
      fromBlock = 0;
    }
    if (toBlock == null) {
      toBlock = "latest";
    }
    const { addr, addrPromise } = getInternal(this);
    const address = addr ? addr : await addrPromise;
    const { fragment, topics } = await getSubInfo(this, event);
    const filter = { address, topics, fromBlock, toBlock };
    const provider = getProvider(this.runner);
    assert(provider, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" });
    return (await provider.getLogs(filter)).map((log) => {
      let foundFragment = fragment;
      if (foundFragment == null) {
        try {
          foundFragment = this.interface.getEvent(log.topics[0]);
        } catch (error) {
        }
      }
      if (foundFragment) {
        try {
          return new EventLog(log, this.interface, foundFragment);
        } catch (error) {
          return new UndecodedEventLog(log, error);
        }
      }
      return new Log(log, provider);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(event, listener) {
    const sub = await getSub(this, "on", event);
    sub.listeners.push({ listener, once: false });
    sub.start();
    return this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(event, listener) {
    const sub = await getSub(this, "once", event);
    sub.listeners.push({ listener, once: true });
    sub.start();
    return this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(event, ...args) {
    return await emit(this, event, args, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(event) {
    if (event) {
      const sub = await hasSub(this, event);
      if (!sub) {
        return 0;
      }
      return sub.listeners.length;
    }
    const { subs } = getInternal(this);
    let total = 0;
    for (const { listeners } of subs.values()) {
      total += listeners.length;
    }
    return total;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(event) {
    if (event) {
      const sub = await hasSub(this, event);
      if (!sub) {
        return [];
      }
      return sub.listeners.map(({ listener }) => listener);
    }
    const { subs } = getInternal(this);
    let result = [];
    for (const { listeners } of subs.values()) {
      result = result.concat(listeners.map(({ listener }) => listener));
    }
    return result;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(event, listener) {
    const sub = await hasSub(this, event);
    if (!sub) {
      return this;
    }
    if (listener) {
      const index = sub.listeners.map(({ listener: listener2 }) => listener2).indexOf(listener);
      if (index >= 0) {
        sub.listeners.splice(index, 1);
      }
    }
    if (listener == null || sub.listeners.length === 0) {
      sub.stop();
      getInternal(this).subs.delete(sub.tag);
    }
    return this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(event) {
    if (event) {
      const sub = await hasSub(this, event);
      if (!sub) {
        return this;
      }
      sub.stop();
      getInternal(this).subs.delete(sub.tag);
    } else {
      const { subs } = getInternal(this);
      for (const { tag, stop } of subs.values()) {
        stop();
        subs.delete(tag);
      }
    }
    return this;
  }
  /**
   *  Alias for [on].
   */
  async addListener(event, listener) {
    return await this.on(event, listener);
  }
  /**
   *  Alias for [off].
   */
  async removeListener(event, listener) {
    return await this.off(event, listener);
  }
  /**
   *  Create a new Class for the %%abi%%.
   */
  static buildClass(abi) {
    class CustomContract extends _BaseContract {
      constructor(address, runner = null) {
        super(address, abi, runner);
      }
    }
    return CustomContract;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(target, abi, runner) {
    if (runner == null) {
      runner = null;
    }
    const contract = new this(target, abi, runner);
    return contract;
  }
};
function _ContractBase() {
  return BaseContract;
}
var Contract = class extends _ContractBase() {
};

// node_modules/ethers/lib.esm/contract/factory.js
var ContractFactory = class _ContractFactory {
  /**
   *  The Contract Interface.
   */
  interface;
  /**
   *  The Contract deployment bytecode. Often called the initcode.
   */
  bytecode;
  /**
   *  The ContractRunner to deploy the Contract as.
   */
  runner;
  /**
   *  Create a new **ContractFactory** with %%abi%% and %%bytecode%%,
   *  optionally connected to %%runner%%.
   *
   *  The %%bytecode%% may be the ``bytecode`` property within the
   *  standard Solidity JSON output.
   */
  constructor(abi, bytecode, runner) {
    const iface = Interface.from(abi);
    if (bytecode instanceof Uint8Array) {
      bytecode = hexlify(getBytes(bytecode));
    } else {
      if (typeof bytecode === "object") {
        bytecode = bytecode.object;
      }
      if (!bytecode.startsWith("0x")) {
        bytecode = "0x" + bytecode;
      }
      bytecode = hexlify(getBytes(bytecode));
    }
    defineProperties(this, {
      bytecode,
      interface: iface,
      runner: runner || null
    });
  }
  attach(target) {
    return new BaseContract(target, this.interface, this.runner);
  }
  /**
   *  Resolves to the transaction to deploy the contract, passing %%args%%
   *  into the constructor.
   */
  async getDeployTransaction(...args) {
    let overrides = {};
    const fragment = this.interface.deploy;
    if (fragment.inputs.length + 1 === args.length) {
      overrides = await copyOverrides(args.pop());
    }
    if (fragment.inputs.length !== args.length) {
      throw new Error("incorrect number of arguments to constructor");
    }
    const resolvedArgs = await resolveArgs(this.runner, fragment.inputs, args);
    const data = concat([this.bytecode, this.interface.encodeDeploy(resolvedArgs)]);
    return Object.assign({}, overrides, { data });
  }
  /**
   *  Resolves to the Contract deployed by passing %%args%% into the
   *  constructor.
   *
   *  This will resolve to the Contract before it has been deployed to the
   *  network, so the [[BaseContract-waitForDeployment]] should be used before
   *  sending any transactions to it.
   */
  async deploy(...args) {
    const tx = await this.getDeployTransaction(...args);
    assert(this.runner && typeof this.runner.sendTransaction === "function", "factory runner does not support sending transactions", "UNSUPPORTED_OPERATION", {
      operation: "sendTransaction"
    });
    const sentTx = await this.runner.sendTransaction(tx);
    const address = getCreateAddress(sentTx);
    return new BaseContract(address, this.interface, this.runner, sentTx);
  }
  /**
   *  Return a new **ContractFactory** with the same ABI and bytecode,
   *  but connected to %%runner%%.
   */
  connect(runner) {
    return new _ContractFactory(this.interface, this.bytecode, runner);
  }
  /**
   *  Create a new **ContractFactory** from the standard Solidity JSON output.
   */
  static fromSolidity(output2, runner) {
    assertArgument(output2 != null, "bad compiler output", "output", output2);
    if (typeof output2 === "string") {
      output2 = JSON.parse(output2);
    }
    const abi = output2.abi;
    let bytecode = "";
    if (output2.bytecode) {
      bytecode = output2.bytecode;
    } else if (output2.evm && output2.evm.bytecode) {
      bytecode = output2.evm.bytecode;
    }
    return new this(abi, bytecode, runner);
  }
};

// src/evm/contracts/factories/vIBCEscrow.sol/IncentivizedPolymerEscrow__factory.ts
var _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sendLostGasTo",
        type: "address"
      },
      {
        internalType: "address",
        name: "dispatcher",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "AckHasNotBeenExecuted",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "CannotRetryWrongMessage",
    type: "error"
  },
  {
    inputs: [],
    name: "ChannelNotFound",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "blocktimestamp",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "actual",
        type: "uint64"
      }
    ],
    name: "DeadlineInPast",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "expected",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "actual",
        type: "uint64"
      }
    ],
    name: "DeadlineNotPassed",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "maxAllowed",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "actual",
        type: "uint64"
      }
    ],
    name: "DeadlineTooLong",
    type: "error"
  },
  {
    inputs: [],
    name: "FeeRecipientIsZero",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "currentImplementation",
        type: "bytes"
      }
    ],
    name: "ImplementationAddressAlreadySet",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "expected",
        type: "uint128"
      },
      {
        internalType: "uint128",
        name: "actual",
        type: "uint128"
      }
    ],
    name: "IncorrectValueProvided",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidBytes65Address",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidImplementationAddress",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "expected",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "actual",
        type: "bytes32"
      }
    ],
    name: "InvalidTimeoutPackage",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageAlreadyAcked",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageAlreadyBountied",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageAlreadyProcessed",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageAlreadySpent",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageDoesNotExist",
    type: "error"
  },
  {
    inputs: [],
    name: "MessageHasInvalidContext",
    type: "error"
  },
  {
    inputs: [],
    name: "NoImplementationAddressSet",
    type: "error"
  },
  {
    inputs: [],
    name: "NonVerifiableMessage",
    type: "error"
  },
  {
    inputs: [],
    name: "NotEnoughGasExecution",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "expected",
        type: "uint128"
      },
      {
        internalType: "uint128",
        name: "actual",
        type: "uint128"
      }
    ],
    name: "NotEnoughGasProvided",
    type: "error"
  },
  {
    inputs: [],
    name: "NotImplemented",
    type: "error"
  },
  {
    inputs: [],
    name: "NotImplementedError",
    type: "error"
  },
  {
    inputs: [],
    name: "RefundGasToIsZero",
    type: "error"
  },
  {
    inputs: [],
    name: "RouteDisabled",
    type: "error"
  },
  {
    inputs: [],
    name: "SendLostGasToIsZero",
    type: "error"
  },
  {
    inputs: [],
    name: "UnsupportedChannelOrder",
    type: "error"
  },
  {
    inputs: [],
    name: "UnsupportedVersion",
    type: "error"
  },
  {
    inputs: [],
    name: "notIbcDispatcher",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes",
        name: "destinationImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "gasSpentOnDestination",
        type: "uint64"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "gasSpentOnSource",
        type: "uint64"
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "destinationRelayerReward",
        type: "uint128"
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "sourceRelayerReward",
        type: "uint128"
      }
    ],
    name: "BountyClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "newDeliveryGasPrice",
        type: "uint96"
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "newAckGasPrice",
        type: "uint96"
      }
    ],
    name: "BountyIncreased",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes",
        name: "destinationImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "maxGasDelivery",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "maxGasAck",
            type: "uint48"
          },
          {
            internalType: "address",
            name: "refundGasTo",
            type: "address"
          },
          {
            internalType: "uint96",
            name: "priceOfDeliveryGas",
            type: "uint96"
          },
          {
            internalType: "uint96",
            name: "priceOfAckGas",
            type: "uint96"
          },
          {
            internalType: "uint64",
            name: "targetDelta",
            type: "uint64"
          }
        ],
        indexed: false,
        internalType: "struct IMessageEscrowStructs.IncentiveDescription",
        name: "incentive",
        type: "tuple"
      }
    ],
    name: "BountyPlaced",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "destinationImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "MessageAcked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes",
        name: "sourceImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "MessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "destinationImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "MessageTimedOut",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "application",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "implementationAddressHash",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "implementationAddress",
        type: "bytes"
      }
    ],
    name: "RemoteImplementationSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "sourceImplementation",
        type: "bytes"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "TimeoutInitiated",
    type: "event"
  },
  {
    inputs: [],
    name: "SEND_LOST_GAS_TO",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fromApplication",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "bounty",
    outputs: [
      {
        components: [
          {
            internalType: "uint48",
            name: "maxGasDelivery",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "maxGasAck",
            type: "uint48"
          },
          {
            internalType: "address",
            name: "refundGasTo",
            type: "address"
          },
          {
            internalType: "uint96",
            name: "priceOfDeliveryGas",
            type: "uint96"
          },
          {
            internalType: "uint96",
            name: "priceOfAckGas",
            type: "uint96"
          },
          {
            internalType: "uint64",
            name: "targetDelta",
            type: "uint64"
          }
        ],
        internalType: "struct IMessageEscrowStructs.IncentiveDescription",
        name: "incentive",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "connectedChannels",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "evmAddress",
        type: "address"
      }
    ],
    name: "convertEVMTo65",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "dispatcher",
    outputs: [
      {
        internalType: "contract IbcDispatcher",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "estimateAdditionalCost",
    outputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "estimateAdditionalCost",
    outputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "implementationAddress",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "implementationAddressHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fromApplication",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      },
      {
        internalType: "uint96",
        name: "deliveryGasPriceIncrease",
        type: "uint96"
      },
      {
        internalType: "uint96",
        name: "ackGasPriceIncrease",
        type: "uint96"
      }
    ],
    name: "increaseBounty",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "isVerifiedMessageHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "chainIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "implementationIdentifier",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "sourceImplementationIdentifier",
        type: "bytes"
      },
      {
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    name: "messageDelivered",
    outputs: [
      {
        internalType: "bytes32",
        name: "hasMessageBeenExecuted",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "src",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "dest",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "revision_number",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "revision_height",
                type: "uint64"
              }
            ],
            internalType: "struct Height",
            name: "timeoutHeight",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "timeoutTimestamp",
            type: "uint64"
          }
        ],
        internalType: "struct IbcPacket",
        name: "packet",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct AckPacket",
        name: "ack",
        type: "tuple"
      }
    ],
    name: "onAcknowledgementPacket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "channelId",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "counterpartyVersion",
        type: "string"
      }
    ],
    name: "onChanOpenAck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "channelId",
        type: "bytes32"
      }
    ],
    name: "onChanOpenConfirm",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum ChannelOrder",
        name: "ordering",
        type: "uint8"
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      }
    ],
    name: "onChanOpenInit",
    outputs: [
      {
        internalType: "string",
        name: "selectedVersion",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum ChannelOrder",
        name: "ordering",
        type: "uint8"
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]"
      },
      {
        internalType: "bytes32",
        name: "channelId",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "counterpartyVersion",
        type: "string"
      }
    ],
    name: "onChanOpenTry",
    outputs: [
      {
        internalType: "string",
        name: "selectedVersion",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "channelId",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "onCloseIbcChannel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "src",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "dest",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "revision_number",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "revision_height",
                type: "uint64"
              }
            ],
            internalType: "struct Height",
            name: "timeoutHeight",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "timeoutTimestamp",
            type: "uint64"
          }
        ],
        internalType: "struct IbcPacket",
        name: "packet",
        type: "tuple"
      }
    ],
    name: "onRecvPacket",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct AckPacket",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "src",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "string",
                name: "portId",
                type: "string"
              },
              {
                internalType: "bytes32",
                name: "channelId",
                type: "bytes32"
              }
            ],
            internalType: "struct IbcEndpoint",
            name: "dest",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "sequence",
            type: "uint64"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "revision_number",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "revision_height",
                type: "uint64"
              }
            ],
            internalType: "struct Height",
            name: "timeoutHeight",
            type: "tuple"
          },
          {
            internalType: "uint64",
            name: "timeoutTimestamp",
            type: "uint64"
          }
        ],
        internalType: "struct IbcPacket",
        name: "packet",
        type: "tuple"
      }
    ],
    name: "onTimeoutPacket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "processPacket",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      }
    ],
    name: "proofValidPeriod",
    outputs: [
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "messagingProtocolContext",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "rawMessage",
        type: "bytes"
      }
    ],
    name: "recoverAck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "reemitAckMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "implementation",
        type: "bytes"
      }
    ],
    name: "setRemoteImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "destinationAddress",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "maxGasDelivery",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "maxGasAck",
            type: "uint48"
          },
          {
            internalType: "address",
            name: "refundGasTo",
            type: "address"
          },
          {
            internalType: "uint96",
            name: "priceOfDeliveryGas",
            type: "uint96"
          },
          {
            internalType: "uint96",
            name: "priceOfAckGas",
            type: "uint96"
          },
          {
            internalType: "uint64",
            name: "targetDelta",
            type: "uint64"
          }
        ],
        internalType: "struct IMessageEscrowStructs.IncentiveDescription",
        name: "incentive",
        type: "tuple"
      },
      {
        internalType: "uint64",
        name: "deadline",
        type: "uint64"
      }
    ],
    name: "submitMessage",
    outputs: [
      {
        internalType: "uint256",
        name: "gasRefund",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "supportedVersions",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "thisBytes65",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "timeoutMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "enum ChannelOrder",
        name: "ordering",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "feeEnabled",
        type: "bool"
      },
      {
        internalType: "string[]",
        name: "connectionHops",
        type: "string[]"
      },
      {
        internalType: "string",
        name: "counterpartyPortId",
        type: "string"
      }
    ],
    name: "triggerChannelInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
var _bytecode = "0x60c0346200034f5762004a3e90601f19601f6001600160401b03388590038281018416850190828211868310176200035457808691604098899485528339810103126200034f5762000051846200038a565b9060018060a01b0392836200006a60208098016200038a565b1692848116156200033e5760805260059260055460018060a01b03199033828216176005556000963391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08880a36006541617600655865190878201828110848211176200032a578852620000df6200036a565b9160039260038152620312e360ec1b898201528152620000fe6200036a565b60038152620322e360ec1b8982015288820152600854600260085580600210620002af575b5060088652878620949086905b6002881062000181578a3060a052516146489081620003f68239608051818181610daf015281816142eb0152818161436f015281816144e601526145bf015260a0518181816122a701526131f80152f35b80518051908782116200029b57908b916200019d8a546200039f565b87811162000262575b508290878311600114620001f0579180600195928695948892620001e4575b5050600019828b1b1c191690841b178a555b0197019701969562000130565b015190503880620001c5565b8a86528386209190838e16875b81811062000240575091600196939185889796941062000227575b505050831b83018a55620001d7565b0151600019838c1b60f8161c1916905538808062000218565b939560018496978495839495015181550195019301908f9594939291620001fd565b6200028a908b8752848720898086018a1c82019287871062000291575b01891c0190620003dc565b38620001a6565b925081926200027f565b634e487b7160e01b84526041600452602484fd5b60088752600289882091820191015b818110620002cd575062000123565b8088620002dd600193546200039f565b80620002ed575b505001620002be565b8c878083118614620003075750505081555b8838620002e4565b6200032091858552842092018b1c8201858301620003dc565b81835555620002ff565b634e487b7160e01b86526041600452602486fd5b8751639c76a9df60e01b8152600490fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b60408051919082016001600160401b038111838210176200035457604052565b51906001600160a01b03821682036200034f57565b90600182811c92168015620003d1575b6020831014620003bb57565b634e487b7160e01b600052602260045260246000fd5b91607f1691620003af565b818110620003e8575050565b60008155600101620003dc56fe608080604052600436101561001d575b50361561001b57600080fd5b005b600090813560e01c9081632c5dd787146125a5575080633a24ef35146125635780633fccfa06146124fd5780634993ef331461248e5780634bdb5597146123065780634dcc0aa6146121e057806353391d3f1461217a5780635a6405141461213f5780635d758e2214611f0a5780635fe39e0d14611e35578063602f983414611b1f57806365a686de14611a30578063715018a6146119925780637a8055981461170c5780637a9ccc4b146116065780637d622184146115715780637e1d42b514610eb75780638caa89ec14610e255780638da5cb5b14610dd35780638dedc17914610d6457806392006e7314610d24578063aa57650414610cbb578063bb3f9f8d14610c64578063cb7e905714610c12578063daf1e16714610bd7578063dd6487fc14610b6a578063dfe1aef914610846578063e847e280146107c7578063ea901f1a1461076c578063f2fde38b14610635578063fad28a24146105b9578063fd4716c81461047e5763ffbeacc70361000f573461047b5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff90600435602435838111610477576101e59036906004016125e3565b93903384526020916003835260408520848652835260408520546104225785156103f85733855260028352604085208486528352604085209086116103cb5761023886610232835461268f565b836134d5565b84601f871160011461030757956102f692916102aa8280899a7f84cad7de2c9074e70f8d697042ecb3c00ae9e6622320cb8c48bdd4d5d709e7969a916102fc575b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8260011b9260031b1c19161790565b90555b6102b8368284612931565b848151910120338852600385526040882086895285528060408920556040519586953387528601526040850152608060608501526080840191613496565b0390a180f35b905085013538610279565b818652838620907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08816875b8181106103b45750916102f6949391897f84cad7de2c9074e70f8d697042ecb3c00ae9e6622320cb8c48bdd4d5d709e796999a941061037c575b5050600182811b0190556102ad565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88560031b161c1990850135169055388061036d565b919286600181928689013581550194019201610333565b6024857f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b60046040517f9f994b4b000000000000000000000000000000000000000000000000000000008152fd5b826040868633825260028452828220908252835220906104736040519283927fdba4785000000000000000000000000000000000000000000000000000000000845260048401526024830190612aa4565b0390fd5b8280fd5b80fd5b503461047b576060807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126105b5579067ffffffffffffffff60c0926104c461266c565b9260408051916104d383612741565b8083528060a0602094828682015282858201528287820152826080820152015273ffffffffffffffffffffffffffffffffffffffff8096168152808352818120602435825283528181206044358252835220916040519061053382612741565b83549365ffffffffffff9081861697888552600186860192848960301c1684526040870198861c89520154966bffffffffffffffffffffffff96879486880194868b16865260a060808a0199888d8b1c168b52019a8e1c8b526040519c8d525116908b01525116604089015251169086015251166080840152511660a0820152f35b5080fd5b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5773ffffffffffffffffffffffffffffffffffffffff60065416330361060b5780f35b60046040517f21bf7f49000000000000000000000000000000000000000000000000000000008152fd5b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5761066d61266c565b6106756140cf565b73ffffffffffffffffffffffffffffffffffffffff8091169081156106e857600554827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576107c36107af6107aa61266c565b613569565b604051918291602083526020830190612885565b0390f35b503461047b5760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5760443567ffffffffffffffff81116105b5576108179036906004016125e3565b73ffffffffffffffffffffffffffffffffffffffff60065416330361060b5761084291600435613678565b5080f35b503461047b5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff600435818111610477576108979036906004016125e3565b50506024359081116105b5576108b19036906004016125e3565b6108bc368284612931565b9182516020809401208452600483526040842054916108dc368284612931565b8481519101208552600484526108f76001604087200161279e565b918315610b40578115610b135780357fff00000000000000000000000000000000000000000000000000000000000000167f010000000000000000000000000000000000000000000000000000000000000003610ae95781602111610ae55760018101359482606211610ae157604e82013560601c90818852878152604088208689528152604088208789528152604088205460601c610ab7578188526003815260408820868952815260408820549085519086012003610a8d57828793609011610a7e57813b15610a7e5783917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7083609093610a28604051978896879586947f11cbf8050000000000000000000000000000000000000000000000000000000086520191018d8d6004860161352b565b03925af18015610a8257610a6a575b50506102f67ff865f210bf9219c3ca273416db27a66557c44a930cfbc569e325afc1e809a3079360405193849384613547565b610a739061272d565b610a7e578338610a37565b8380fd5b6040513d84823e3d90fd5b60046040517fc970156c000000000000000000000000000000000000000000000000000000008152fd5b60046040517f3d1553f8000000000000000000000000000000000000000000000000000000008152fd5b8680fd5b8580fd5b60046040517fd41c17e7000000000000000000000000000000000000000000000000000000008152fd5b6024867f4e487b710000000000000000000000000000000000000000000000000000000081526032600452fd5b60046040517f504f8177000000000000000000000000000000000000000000000000000000008152fd5b503461047b5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57604060209173ffffffffffffffffffffffffffffffffffffffff610bbc61266c565b16815260038352818120602435825283522054604051908152f35b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576107c36107af30613569565b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57602073ffffffffffffffffffffffffffffffffffffffff60065416604051908152f35b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576004359060075482101561047b576020610cad83612a07565b90546040519160031b1c8152f35b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576040906004358152600460205220610d0760018254920161279e565b906107c36040519283928352604060208401526040830190612885565b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57604080516000815260006020820152f35b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57602073ffffffffffffffffffffffffffffffffffffffff60055416604051908152f35b5060607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff60243581811161047757610e719036906004016125e3565b50506044359081116105b557610e8b9036906004016125e3565b505060046040517fd6234725000000000000000000000000000000000000000000000000000000008152fd5b503461047b577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc6040813601126105b5576004359067ffffffffffffffff82116104775760e08183360301126104775760243567ffffffffffffffff8111610a7e57604081600401928236030112610a7e5773ffffffffffffffffffffffffffffffffffffffff60065416330361060b5760245a9101610f578184612b58565b602092919211610ae557610f6f610f75923690612902565b93612b58565b909381602011610ae5576020610f8e6004830180612ba9565b013560405190610f9d826126e2565b815260208101858152610fd6367fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0860160208a01612931565b602081519101208852600460205260408820915182555180519067ffffffffffffffff82116115445761101982611010600186015461268f565b600186016134d5565b60209089601f841160011461147657836020969461107e9694600194611071949261146b575b50507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8260011b9260031b1c19161790565b9101555b60040180612ba9565b0135937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08201602111610ae5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08201606211610ae557606e81013560601c8652856020526040862085875260205260408620602182013587526020526040862060018154910154928160601c1561144157606e83013560601c885287602052604088208789526020526040882060218401358952602052876001604082208281550155606e83013560601c885260036020526040882087895260205260408820548651602088012003610a8d577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081016090116113fa57878060405160208101907f11cbf80500000000000000000000000000000000000000000000000000000000825261122f816112038d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5089019060b08c019060218d0135906024860161352b565b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0810183528261275d565b519082606e88013560601c65ffffffffffff8860301c16f1156113fe575b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081016088116113fa577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe060a284013560d01c91016082116113fa5761133e6021946113f4937f9f9aef021b9656e38cd2086f7d7ee0f6b6062c8078a049bfecd6356fdbeb1b3c9760a887013560c01c928060c01c92329273ffffffffffffffffffffffffffffffffffffffff60828b013516928260601c926bffffffffffffffffffffffff8260601c16928a65ffffffffffff6bffffffffffffffffffffffff818560301c1695169316916143c5565b9890927ff865f210bf9219c3ca273416db27a66557c44a930cfbc569e325afc1e809a307604051806113768c868c8c01359184613547565b0390a167ffffffffffffffff61139c6fffffffffffffffffffffffffffffffff9a612ca8565b9980604051998a9901359c1695169316918693916080939695919660a0860197865267ffffffffffffffff80921660208701521660408501526fffffffffffffffffffffffffffffffff809216606085015216910152565b0390a380f35b8780fd5b5a65ffffffffffff603f818560301c160416111561124d575b60046040517f6bc33587000000000000000000000000000000000000000000000000000000008152fd5b60046040517f8af35858000000000000000000000000000000000000000000000000000000008152fd5b01519050388061103f565b5090600184018a5260208a20918a5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08516811061152c57508361107e95936001938493837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe060209b9916106114f5575b505050811b01910155611075565b01517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88460031b161c191690553880806114e7565b91926020600181928685015181550194019201611485565b6024897f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576004356008548110156105b5576115b790612a6d565b9190916115da576040516107c3906107af816115d38187612aa4565b038261275d565b807f4e487b71000000000000000000000000000000000000000000000000000000006024925280600452fd5b503461047b5760807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5760043590600382101561047b5767ffffffffffffffff906024358281116105b5576116659036906004016129d6565b50506044358281116105b55761167f9036906004016125e3565b505060643591821161047b575061169a9036906004016125e3565b9173ffffffffffffffffffffffffffffffffffffffff60065416330361060b578015159081611700575b506116d6576107c3916107af9161414e565b60046040517fcc6e562e000000000000000000000000000000000000000000000000000000008152fd5b600191501415386116c4565b503461047b577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc60a0813601126105b55767ffffffffffffffff90600435828111610a7e5761175f9036906004016125e3565b919092602435916003831015610ae55760443590811515809203610ae1576064358381116113fa576117959036906004016129d6565b60849591953585811161198e576117b09036906004016125e3565b9590948a9380151580611980575b6116d65773ffffffffffffffffffffffffffffffffffffffff60065416998a3b1561197c576040517f418925b700000000000000000000000000000000000000000000000000000000815260a060048201529b61181f9160a48e0191613496565b9461194f57928a98929694918c9a98969460248b015260448a0152838983030160648a015280825260208083019260208360051b82010198858d925b8584106118a15750505050505050508387938795936118839387809603016084860152613496565b03925af18015610a8257611895575080f35b61189e9061272d565b80f35b8b8194979a9c9396999b9d9f507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09295989e50030188528b357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181121561194b5783018681019190358581116119465780360383136119465761192d88928392600195613496565b9d019801940190928d9b999795928f9d9b99979461185b565b508f80fd5b8f80fd5b60248c7f4e487b710000000000000000000000000000000000000000000000000000000081526021600452fd5b8c80fd5b508b945060018114156117be565b8980fd5b503461047b57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576119c96140cf565b8073ffffffffffffffffffffffffffffffffffffffff6005547fffffffffffffffffffffffff00000000000000000000000000000000000000008116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b506101407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff906024358281116105b557611a7e9036906004016125e3565b9290916044358281116105b557611a999036906004016125e3565b9160c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9c36011261047b5761012435938416840361047b575060418503611af557604094611ae994600435612cc8565b82519182526020820152f35b60046040517fbbcd8eb1000000000000000000000000000000000000000000000000000000008152fd5b503461047b57611b2e36612986565b73ffffffffffffffffffffffffffffffffffffffff60065416330361060b575a906060810190611b5e8282612b58565b602011611e3157611b73611b7a913690612902565b9282612b58565b80602011610ae5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019283602111610ae15783606211610ae157611bc281602092612ba9565b01359260b111610ae557606e82013560601c865285602052604086208387526020526040862060218301358752602052604086209460018654960154918660601c156114415787611c6b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f8293606e88013560601c8452836020526040842089855260205260408420602189013585526020528360016040822082815501550160d187016137a6565b604051611cbe8161120360208201947f11cbf8050000000000000000000000000000000000000000000000000000000086528b602484015260218b01356044840152606060648401526084830190612885565b519082606e88013560601c65ffffffffffff8c60301c16f115611e11575b7f9f9aef021b9656e38cd2086f7d7ee0f6b6062c8078a049bfecd6356fdbeb1b3c93611d54602194936113f493329132918b60601c916bffffffffffffffffffffffff8160601c16918d6bffffffffffffffffffffffff65ffffffffffff8260301c1693169165ffffffffffff80831692169061420c565b9890927fb40655ff3c2bb146ef446b11cb0b22131f89ccd00240340eda5ef4e010794ea160405180611d8c8c858c8c01359184613547565b0390a165ffffffffffff67ffffffffffffffff611db96fffffffffffffffffffffffffffffffff9b612ca8565b6040805194855267ffffffffffffffff9390951683166020850152941616918101919091526fffffffffffffffffffffffffffffffff92881683166060820152979096161660808701529101359390819060a0820190565b91905a65ffffffffffff603f818960301c16041611611417579091611cdc565b8480fd5b503461047b57611e4436612616565b50505073ffffffffffffffffffffffffffffffffffffffff60065416330361060b578190825b600754811015611f035781611e7e82612a07565b919054600392831b1c14611e955750600101611e6a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9250611ec390612a07565b81939154921b1b1916905560015b15611ed95780f35b60046040517f1e07dd94000000000000000000000000000000000000000000000000000000008152fd5b5050611ed1565b5060a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57611f3d61266c565b604435906bffffffffffffffffffffffff906064358281168103611e3157608435918383168303610ae55773ffffffffffffffffffffffffffffffffffffffff16855284602052604085206024358652602052604085208486526020526040852080548060601c1561211557611fd89085611fd18665ffffffffffff83611fc689838816612c12565b169460301c16612c12565b1690612c64565b6fffffffffffffffffffffffffffffffff80821634036120c457505092806120b56040947fffffffffffffffffffffffffffffffffffffffff0000000000000000000000009460017f0f9ca48bcb4f4aea18e50df9f1df3c02df5c9c48f05e389a349c8ceb242da581980190612061612055835492878416612c88565b93868360601c16612c88565b9485931696879116178155907fffffffffffffffff000000000000000000000000ffffffffffffffffffffffff77ffffffffffffffffffffffff00000000000000000000000083549260601b169116179055565b8351928352166020820152a280f35b6040517f0b52a60b0000000000000000000000000000000000000000000000000000000081526fffffffffffffffffffffffffffffffff928316600482015234919091169091166024820152604490fd5b60046040517f970e41ec000000000000000000000000000000000000000000000000000000008152fd5b503461047b5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b57602090604051908152f35b5060607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff600435818111610477576121c69036906004016125e3565b50506024359081116105b557610e8b9036906004016125e3565b503461047b576121ef36612986565b90604051916121fd836126e2565b818352606060208094015273ffffffffffffffffffffffffffffffffffffffff60065416330361060b575a9160608201916122388382612b58565b86116104775761224c612262913690612902565b938661225a81850185612ba9565b013592612b58565b93909284871161047b5750916122a593916122cb9593877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03295019301916138ed565b7f0000000000000000000000000000000000000000000000000000000000000000612bdc565b6107c3604051916122db836126e2565b6001835283830190815260405193849381855251151590840152516040808401526060830190612885565b503461047b5760c07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5760043560038110156105b557602480359267ffffffffffffffff918285116105b557366023860112156105b557846004013594838611612461578560051b906024602080986040519061238b8387018361275d565b8152019282010192368411611e315760248201925b84841061243b5750505050506064358281116105b5576123c4903690600401612968565b5060a43591821161047b57506123de9036906004016125e3565b909173ffffffffffffffffffffffffffffffffffffffff60065416330361060b57801515908161242f575b506116d65761241a91604435613678565b906107c3604051928284938452830190612885565b60019150141538612409565b8335878111610ae15789916124568392853691880101612968565b8152019301926123a0565b6024837f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b503461047b5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b576107af60406107c39273ffffffffffffffffffffffffffffffffffffffff6124e461266c565b168152600260205281812060243582526020522061279e565b5060807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047b5767ffffffffffffffff602435818111610477576125499036906004016125e3565b50506064359081116105b557610e8b9036906004016125e3565b503461047b5760406020918261257836612616565b93919092855260018252858520838751948593843782019081520301902090825283522054604051908152f35b9050346105b55760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126105b5578160409282526020820152f35b9181601f840112156126115782359167ffffffffffffffff8311612611576020838186019501011161261157565b600080fd5b9060607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc83011261261157600435916024359067ffffffffffffffff821161261157612664916004016125e3565b909160443590565b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361261157565b90600182811c921680156126d8575b60208310146126a957565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f169161269e565b6040810190811067ffffffffffffffff8211176126fe57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b67ffffffffffffffff81116126fe57604052565b60c0810190811067ffffffffffffffff8211176126fe57604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff8211176126fe57604052565b906040519182600082546127b18161268f565b9081845260209460019160018116908160001461282157506001146127e2575b5050506127e09250038361275d565b565b600090815285812095935091905b8183106128095750506127e093508201013880806127d1565b855488840185015294850194879450918301916127f0565b9150506127e09593507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0091501682840152151560051b8201013880806127d1565b60005b8381106128755750506000910152565b8181015183820152602001612865565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f6020936128c181518092818752878088019101612862565b0116010190565b67ffffffffffffffff81116126fe57601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b91909160405190612912826126e2565b8193602083526020820111612611578160206040928160009501370152565b92919261293d826128c8565b9161294b604051938461275d565b829481845281830111612611578281602093846000960137010152565b9080601f830112156126115781602061298393359101612931565b90565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc90602082820112612611576004359167ffffffffffffffff8311612611578260e0920301126126115760040190565b9181601f840112156126115782359167ffffffffffffffff8311612611576020808501948460051b01011161261157565b600754811015612a3e5760076000527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880190600090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600854811015612a3e5760086000527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30190600090565b805460009392612ab38261268f565b91828252602093600191600181169081600014612b1b5750600114612ada575b5050505050565b90939495506000929192528360002092846000945b838610612b0757505050500101903880808080612ad3565b805485870183015294019385908201612aef565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168685015250505090151560051b010191503880808080612ad3565b9035907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe181360301821215612611570180359067ffffffffffffffff82116126115760200191813603831361261157565b9035907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc181360301821215612611570190565b60406127e09193929381519485916020830152612c028151809260208686019101612862565b810103602081018552018361275d565b9190916bffffffffffffffffffffffff80809416911602918216918203612c3557565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9190916fffffffffffffffffffffffffffffffff80809416911601918211612c3557565b9190916bffffffffffffffffffffffff80809416911601918211612c3557565b612cc090602060405192828480945193849201612862565b810103902090565b9093959460009673ffffffffffffffffffffffffffffffffffffffff60a4351660a435036113fa5773ffffffffffffffffffffffffffffffffffffffff60a435161561346c57338852600260205260408820838952602052612d2c6040892061279e565b978851156103f857885160018114908161340a575b506133e0579567ffffffffffffffff8316801515929083806133d6575b6133955750612d6e368289612931565b604051612e2f60b08260208101947fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b1686527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003360601b1660348301527fffffffffffffffff0000000000000000000000000000000000000000000000008a60c01b1660488301524360508301524660708301528a6090830152612e1f8151809260208686019101612862565b810103609081018452018261275d565b5190209933600052600060205260406000208660005260205260406000208b60005260205260406000205460601c61336b5765ffffffffffff6064351660643503612611576bffffffffffffffffffffffff60c4351660c43503612611576bffffffffffffffffffffffff612eb060c43565ffffffffffff60643516612c12565b1665ffffffffffff6084351660843503612611576bffffffffffffffffffffffff60e4351660e4350361261157612f04906bffffffffffffffffffffffff611fd160e43565ffffffffffff60843516612c12565b9733600052600060205260406000208760005260205260406000208c60005260205260406000207fffffffffffffffffffffffffffffffffffffffff00000000000000000000000060a43560601b1665ffffffffffff606435166bffffffffffff00000000000060843560301b16171781556bffffffffffffffffffffffff60c435167fffffffffffffffffffffffffffffffffffffffff00000000000000000000000060018301541617600182015561300760e43560018301907fffffffffffffffff000000000000000000000000ffffffffffffffffffffffff77ffffffffffffffffffffffff00000000000000000000000083549260601b169116179055565b67ffffffffffffffff6101043516610104350361261157600101805477ffffffffffffffffffffffffffffffffffffffffffffffff166101043560c01b7fffffffffffffffff000000000000000000000000000000000000000000000000161790558b9361312b9361312692604f929190818c61308333613569565b946040519e8f96600060208901528c60218901526130ab81518092602060418c019101612862565b870191604183013701917fffffffffffffffff0000000000000000000000000000000000000000000000008c60c01b1660418401527fffffffffffff000000000000000000000000000000000000000000000000000060643560d01b166049840152858301370160008382015203602f81018a52018861275d565b612ca8565b7f1b7379b49b96ce33cfd9daf95718231650c40a2c92da579412e588601186772760e060405187815265ffffffffffff60643516602082015265ffffffffffff60843516604082015273ffffffffffffffffffffffffffffffffffffffff60a4351660608201526bffffffffffffffffffffffff60c4351660808201526bffffffffffffffffffffffff60e4351660a082015267ffffffffffffffff610104351660c0820152a31561335b57905b61321c73ffffffffffffffffffffffffffffffffffffffff60065416937f0000000000000000000000000000000000000000000000000000000000000000612bdc565b92803b156126115767ffffffffffffffff936000613279938195604051978896879586947fc3e1155c0000000000000000000000000000000000000000000000000000000086526004860152606060248601526064850190612885565b9116604483015203925af1801561334f5761333b575b506fffffffffffffffffffffffffffffffff80911690808211612c35578134106132ea57508034116132c057509190565b905034036132e68173ffffffffffffffffffffffffffffffffffffffff60a43516613fb7565b9190565b6040517f030748b50000000000000000000000000000000000000000000000000000000081526fffffffffffffffffffffffffffffffff928316600482015234919091169091166024820152604490fd5b61334691925061272d565b6000903861328f565b6040513d6000823e3d90fd5b5067ffffffffffffffff906131d9565b60046040517f068a62ee000000000000000000000000000000000000000000000000000000008152fd5b604490604051907f2d098d5900000000000000000000000000000000000000000000000000000000825267ffffffffffffffff421660048301526024820152fd5b5080421015612d5e565b60046040517f17d0b6db000000000000000000000000000000000000000000000000000000008152fd5b90501561343f577fff0000000000000000000000000000000000000000000000000000000000000060208a0151161538612d41565b807f4e487b7100000000000000000000000000000000000000000000000000000000602492526032600452fd5b60046040517f6a1a6afe000000000000000000000000000000000000000000000000000000008152fd5b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b90601f81116134e357505050565b6000916000526020600020906020601f850160051c83019410613521575b601f0160051c01915b82811061351657505050565b81815560010161350a565b9092508290613501565b6129839492606092825260208201528160408201520191613496565b61355f60409295949395606083526060830190612885565b9460208201520152565b73ffffffffffffffffffffffffffffffffffffffff604051917f1400000000000000000000000000000000000000000000000000000000000000602084015260006021840152166041820152604181526080810181811067ffffffffffffffff8211176126fe5760405290565b6000929181546135e58161268f565b9260019180831690811561363f5750600114613602575b50505050565b9091929394506000526020906020600020906000915b85831061362e57505050500190388080806135fc565b805485840152918301918101613618565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168452505050811515909102019150388080806135fc565b91929060009360005b60085481101561377c5760408051906112036136d6896020946136ba8682818101948b8d87378b8201908382015203808452018261275d565b519020936136c786612a6d565b509351928391820180956135d6565b519020146136e657600101613681565b5090919260078054956801000000000000000087101561374f5750856137159160016129839798019055612a07565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff829392549160031b92831b921b19161790553691612931565b807f4e487b7100000000000000000000000000000000000000000000000000000000602492526041600452fd5b60046040517fb01318a5000000000000000000000000000000000000000000000000000000008152fd5b60216127e091939293846040519586927ffd00000000000000000000000000000000000000000000000000000000000000602085015284840137810160008382015203600181018552018361275d565b91908203918211612c3557565b916127e0947fffffffffffff000000000000000000000000000000000000000000000000000060b0957fffffffffffffffff000000000000000000000000000000000000000000000000939998949960416040519b8c987f010000000000000000000000000000000000000000000000000000000000000060208b015260218a01528189013760828701521660a28501521660a88301526138ad8151809260208686019101612862565b810103609081018552018361275d565b3d156138e8573d906138ce826128c8565b916138dc604051938461275d565b82523d6000602084013e565b606090565b93919290948160211161261157846000526001602052604060002060206040518092826139208b84815193849201612862565b8201908152030190206001850135600052602052604060002054613f8d57846000526001602052604060002060206040518092826139648b84815193849201612862565b820190815203019020600185013560005260205260016040600020558160a31161261157608f84013560601c82606211612611578060005260036020526040600020866000526020526040600020548751602089012003613e80578260ab116126115760a385013560c01c8015159081613e76575b50613d2f578260b11161261157600060405180927fd00689b600000000000000000000000000000000000000000000000000000000825288600483015260018801356024830152608060448301526041608483015260416021890160a48401378260e58301526101006064830152818381613a7f61010482018c60b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4f8d019101613496565b039260ab8b013560d01cf160009181613cac575b50613c525750613aa16138bd565b505a65ffffffffffff603f60ab87013560d01c04161161141757613c44613bff6001927f6025efc987827001c12f1f5c8b7831a6439083c88f60686671451fe479ec6e32957fffffffffffff0000000000000000000000000000000000000000000000000000613bc7602097613bbe604051917fff000000000000000000000000000000000000000000000000000000000000008b8401528c60b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4f8301910160218501378201827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7091600083820152037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5081018452018261275d565b935b5a906137f6565b60d01b167fffffffffffffffff0000000000000000000000000000000000000000000000004260c01b169160218a01878b0135613803565b968751848901208760005283855260406000208560405180928551613c278184868a01612862565b820190815203019020848801356000528552604060002055612ca8565b93604051958652013593a390565b60209250613bff6001927f6025efc987827001c12f1f5c8b7831a6439083c88f60686671451fe479ec6e32957fffffffffffff0000000000000000000000000000000000000000000000000000613bc7613c449593613bc0565b9091503d806000833e613cbf818361275d565b8101906020818303126126115780519067ffffffffffffffff82116126115782601f838301011215612611578181015190613cf9826128c8565b93613d07604051958661275d565b828552602083858401010111612611576020613d2893818601920101612862565b9038613a93565b50508060b195929511612611576001613c447f6025efc987827001c12f1f5c8b7831a6439083c88f60686671451fe479ec6e3293613d947fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4f6020950160b188016137a6565b97613e5160b0604051809b888201947f01000000000000000000000000000000000000000000000000000000000000008652888c01356021840152604160218d018185013760828301527f800000000000000000000000000000000000000000000000000000000000000060a28301527fffffffffffffffff0000000000000000000000000000000000000000000000004260c01b1660a8830152613e41815180928b8686019101612862565b810103609081018c52018a61275d565b885190208760005283855260406000208560405180928551613c278184868a01612862565b90504211386139d9565b50908060b11161261157613c44613bff6001927f6025efc987827001c12f1f5c8b7831a6439083c88f60686671451fe479ec6e32957fffffffffffff0000000000000000000000000000000000000000000000000000613bc7602097613bc0604051957ffe000000000000000000000000000000000000000000000000000000000000008b8801528c60b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4f8301910160218901378601867fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7091600083820152037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5081018852018661275d565b60046040517fe954aba2000000000000000000000000000000000000000000000000000000008152fd5b81471061407157600080809373ffffffffffffffffffffffffffffffffffffffff8294165af1613fe56138bd565b5015613fed57565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d617920686176652072657665727465640000000000006064820152fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e63650000006044820152fd5b73ffffffffffffffffffffffffffffffffffffffff6005541633036140f057565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b600854916000805b8481106141875760046040517fb01318a5000000000000000000000000000000000000000000000000000000008152fd5b60408051906112036141b560209384810190888a83376136ba86828b81018b8382015203808452018261275d565b519020146141c557600101614156565b505061298392503691612931565b81156141dd570490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b929788929997959496919965ffffffffffff809b818316928282168411156143bd575b506bffffffffffffffffffffffff9b8c9283921602169b8c965a9003991694898611156143b4575b8188168a029b8c9889890197021692021601918383039060008080808573ffffffffffffffffffffffffffffffffffffffff98898b84921497886143aa575b1690f115614358575b505081169481169182861461432e5750600080808086819681159788614325575bf1156142d8575b5050506142d391613fb7565b929190565b60009350839283928392839161431b575b7f00000000000000000000000000000000000000000000000000000000000000001690f11561334f57838538806142c7565b6108fc91506142e9565b506108fc6142c0565b905060009485809550809450809350821561434f575bf11561334f57929190565b506108fc614344565b6000939650839295508291829182906143a1575b887f00000000000000000000000000000000000000000000000000000000000000001690f11561334f5786928892388061429f565b506108fc61436c565b6108fc9250614296565b98508498614257565b90503861422f565b939791839b9995979a939165ffffffffffff80918184169382821685111561460a575b506bffffffffffffffffffffffff9e8f938492160216965a90039a16928a841115614601575b818a168b029d8e88019a8b95021692021601958187039060008080808573ffffffffffffffffffffffffffffffffffffffff9c8d809984921497886145f7575b1690f1156145ac575b5050809116981698888a1461458a5767ffffffffffffffff80941691821561455d574285160384169363a8c000008511614554575b929384931682900360008113614528576144aa9350600003026141d3565b019586915b60008080808681968115978861451f575bf1156144d5575b50506142d391038094613fb7565b60008093819382938391614515575b7f00000000000000000000000000000000000000000000000000000000000000001690f11561334f578438806144c7565b6108fc91506144e4565b506108fc6144c0565b9050818110156145465761453c92026141d3565b90039586916144af565b5050505060009586916144af565b6000945061448c565b509794505096879150869260008080808681968115978861432557f1156142d8575050506142d391613fb7565b9760008096925080955080945080939a50821561434f57f11561334f57929190565b60008093508092819282906145ee575b8a7f00000000000000000000000000000000000000000000000000000000000000001690f11561334f57843880614457565b506108fc6145bc565b6108fc925061444e565b9950829961440e565b9050386143e856fea26469706673582212205c2e055b56a022ec8689198dbdbabb3fda6ad70d60863ca78beb60fd3992152c64736f6c63430008160033";
var isSuperArgs = (xs) => xs.length > 1;
var IncentivizedPolymerEscrow__factory = class extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  getDeployTransaction(sendLostGasTo, dispatcher, overrides) {
    return super.getDeployTransaction(
      sendLostGasTo,
      dispatcher,
      overrides || {}
    );
  }
  deploy(sendLostGasTo, dispatcher, overrides) {
    return super.deploy(sendLostGasTo, dispatcher, overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode;
  static abi = _abi;
  static createInterface() {
    return new Interface(_abi);
  }
  static connect(address, runner) {
    return new Contract(
      address,
      _abi,
      runner
    );
  }
};

// src/evm/contracts/factories/SimpleApplication__factory.ts
var _abi2 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "messageEscrow_",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes"
      }
    ],
    name: "Event",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "acknowledgement",
        type: "bytes"
      }
    ],
    name: "receiveAck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes"
      }
    ],
    name: "receiveMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "acknowledgement",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "implementation",
        type: "bytes"
      }
    ],
    name: "setRemoteImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "destinationIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "destinationAddress",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "maxGasDelivery",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "maxGasAck",
            type: "uint48"
          },
          {
            internalType: "address",
            name: "refundGasTo",
            type: "address"
          },
          {
            internalType: "uint96",
            name: "priceOfDeliveryGas",
            type: "uint96"
          },
          {
            internalType: "uint96",
            name: "priceOfAckGas",
            type: "uint96"
          },
          {
            internalType: "uint64",
            name: "targetDelta",
            type: "uint64"
          }
        ],
        internalType: "struct IMessageEscrowStructs.IncentiveDescription",
        name: "incentive",
        type: "tuple"
      },
      {
        internalType: "uint64",
        name: "deadline",
        type: "uint64"
      }
    ],
    name: "submitMessage",
    outputs: [
      {
        internalType: "uint256",
        name: "gasRefund",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "messageIdentifier",
        type: "bytes32"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
var _bytecode2 = "0x60a03461007257601f61068f38819003918201601f19168301916001600160401b038311848410176100775780849260209460405283398101031261007257516001600160a01b0381169081900361007257608052604051610601908161008e823960805181818160c001526104060152f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604081815260049081361015610022575b505050361561002057600080fd5b005b600092833560e01c90816311cbf805146104cf5750806365a686de14610259578063d00689b6146101915763ffbeacc7036100125782913461018d57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018d5767ffffffffffffffff602435818111610189576100a79036908401610559565b949073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016803b156101855761012d968387518099819582947fffbeacc70000000000000000000000000000000000000000000000000000000084528a358b8501528b6024850152604484019161058c565b03925af1801561017b5761013f578480f35b831161014f575052388080808480f35b8360416024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b83513d87823e3d90fd5b8280fd5b8480fd5b5050fd5b5091346102525760807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102525767ffffffffffffffff90604435828111610255576101e39036908501610559565b5050606435918211610252575061024e9161020091369101610559565b9190927f758c7cf107fab3cfdc5aefab966cd9e69c3f368761f7a218a18283c1fbb5574c8151602081528061023960208201878961058c565b0390a15192839260208452602084019161058c565b0390f35b80fd5b5080fd5b509190610140917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc83813601126102555767ffffffffffffffff936024358581116104cb576102ab9036908601610559565b92906044358781116104c3576102c49036908801610559565b9160c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9c3601126104bf57610124958635958a87168097036104c757926103628a999896938d9896936103719673ffffffffffffffffffffffffffffffffffffffff9a51809d7f65a686de000000000000000000000000000000000000000000000000000000008252803591015260248d01526101448c019161058c565b928984030160448a015261058c565b9160643565ffffffffffff908181168091036104bf5760648801526084359081168091036104c357608487015260a4358481168091036104c35760a487015260c4356bffffffffffffffffffffffff908181168091036104bf5760c488015260e4359081168091036104c35760e48701526101048035908982168092036104bf578701528501528691849182900390829034907f0000000000000000000000000000000000000000000000000000000000000000165af19283156104b35781948294610448575b5050505082519182526020820152f35b91935091935084913d86116104ab575b601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01685019182118583101761014f57508491849183528101031261025257506020815191015138808080610438565b3d9250610458565b508451903d90823e3d90fd5b8680fd5b8580fd5b8880fd5b8380fd5b915050346101855760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101855760443567ffffffffffffffff81116104cb576105536105457f758c7cf107fab3cfdc5aefab966cd9e69c3f368761f7a218a18283c1fbb5574c948493369101610559565b60208452602084019161058c565b0390a180f35b9181601f840112156105875782359167ffffffffffffffff8311610587576020838186019501011161058757565b600080fd5b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe093818652868601376000858286010152011601019056fea264697066735822122007fd0f42179aa8fe023d5be35bd436e14e6f191ade6b4fe6a6672ed2fffa367364736f6c63430008160033";
var isSuperArgs2 = (xs) => xs.length > 1;
var SimpleApplication__factory = class extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs2(args)) {
      super(...args);
    } else {
      super(_abi2, _bytecode2, args[0]);
    }
  }
  getDeployTransaction(messageEscrow_, overrides) {
    return super.getDeployTransaction(messageEscrow_, overrides || {});
  }
  deploy(messageEscrow_, overrides) {
    return super.deploy(messageEscrow_, overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode2;
  static abi = _abi2;
  static createInterface() {
    return new Interface(_abi2);
  }
  static connect(address, runner) {
    return new Contract(address, _abi2, runner);
  }
};
export {
  IncentivizedPolymerEscrow__factory,
  SimpleApplication__factory,
  factories_exports as factories
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map