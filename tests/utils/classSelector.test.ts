import { classSelector } from "../../src/utils/classSelector";

describe("Class selector util", () => {
  it("Should return the correct value", () => {
    const baseClass = ["first"];
    const variants = {
      second: ["second"],
      third: ["third"],
    };

    const classes = classSelector(baseClass, variants);

    expect(classes("second")).toBe("first second");
    expect(classes("third")).toBe("first third");
  });
});
