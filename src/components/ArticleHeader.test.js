import ArticleHeader from "./ArticleHeader";
import renderer from "react-test-renderer";
import React from "react";

describe("components/ArticleHeader", () => {
  const tree = renderer
    .create(
      <ArticleHeader title="test-test" navigation={<span>{"test"}</span>} />
    )
    .toJSON();
  it(" matches the snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
