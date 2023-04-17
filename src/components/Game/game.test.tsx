import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Game from "./Game";

describe("Game", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Game />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("starts with shuffled tiles", () => {
    const tiles = wrapper.find(".board__tile").map((tile) => tile.text());
    expect(tiles).not.toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "",
    ]);
  });

  it("shows solved message when game is solved", () => {
    const solveButton = wrapper.find(".game__button").at(1);
    solveButton.simulate("click");
    const solvedMessage = wrapper.find(".game__solved").text();
    expect(solvedMessage).toEqual("Congratulations, you solved the puzzle!");
  });
});
