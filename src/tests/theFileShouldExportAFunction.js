/**
 * Test whether a file exports a function.
 *
 * @param {*} importedObject The object that was imported.
 */
export default function theFileShouldExportAFunction(importedObject) {
  describe(`The file`, () => {
    it("should export a function.", () => {
      expect(typeof importedObject).toBe("function");
    });
  });
}
