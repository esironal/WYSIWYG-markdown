/**
 * Created by cc on 1/30/16.
 */
"use strict";

let sample1 = {
  html:`aa<div>ba</div><div>c<img src="http://w/"></div><div><br/></div><div>d</div>`,
  md: `aa\nba\nc![](http://w/)\n\nd\n`
};

let expect = chai.expect;
describe('Markdown converter', function () {
  it("should convert div to markdown for sample1", function () {
    expect(_convertContentEditable(sample1.html)).to.eql(sample1.md);
  });
});

