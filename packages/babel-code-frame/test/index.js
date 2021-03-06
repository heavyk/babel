var assert = require("assert");
var chalk = require("chalk");
var codeFrame = require("..");

suite("babel-code-frame", function () {
  test("basic usage", function () {
    const rawLines = [
      "class Foo {",
      "  constructor()",
      "};",
    ].join('\n');
    assert.equal(codeFrame(rawLines, 2, 16), [
      "  1 | class Foo {",
      "> 2 |   constructor()",
      "    |                ^",
      "  3 | };",
    ].join('\n'));
  });

  test("optional column number", function () {
    const rawLines = [
      "class Foo {",
      "  constructor()",
      "};",
    ].join('\n');
    assert.equal(codeFrame(rawLines, 2, null), [
      "  1 | class Foo {",
      "> 2 |   constructor()",
      "  3 | };",
    ].join("\n"));
  });

  test("optional column number", function () {
    const rawLines = [
      "class Foo {",
      "  constructor()",
      "};",
    ].join("\n");
    assert.equal(codeFrame(rawLines, 2, null), [
      "  1 | class Foo {",
      "> 2 |   constructor()",
      "  3 | };",
    ].join("\n"));
  });

  test("maximum context lines and padding", function () {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}"
    ].join("\n");
    assert.equal(codeFrame(rawLines, 7, 2), [
      "   5 |  * @param b Number",
      "   6 |  * @returns Number",
      ">  7 |  */",
      "     |  ^",
      "   8 | ",
      "   9 | function sum(a, b) {",
      "  10 |   return a + b",
    ].join("\n"));
  });

  test("no unnecessary padding due to one-off errors", function () {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}"
    ].join("\n");
    assert.equal(codeFrame(rawLines, 6, 2), [
      "  4 |  * @param a Number",
      "  5 |  * @param b Number",
      "> 6 |  * @returns Number",
      "    |  ^",
      "  7 |  */",
      "  8 | ",
      "  9 | function sum(a, b) {",
    ].join("\n"));
  });

  test("opts.highlightCode", function () {
    const rawLines = "console.log('babel')";
    const result = codeFrame(rawLines, 1, 9, {highlightCode: true})
    const stripped = chalk.stripColor(result);
    assert.ok(result.length > stripped.length);
    assert.equal(stripped, [
      "> 1 | console.log('babel')",
      "    |         ^",
    ].join("\n"))
  });
});
