/**
 * Created by cc on 1/30/16.
 */
"use strict";

let _convertContentEditable;

{
  _convertContentEditable = (html) => {
    class Parser {
      parseHtml(html) {
        var doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = html;
        return doc;
      }
    }

    function convertImg(body) {
      var imgs = Array.from(body.getElementsByTagName('img'));
      imgs.forEach(img=> {
        img.outerHTML = `![](${img.src})`
      });
    }

    function convertDiv(body) {
      var divs = Array.from(body.getElementsByTagName('div'));
      divs.forEach(div=> {
        if (div.textContent) {
          div.outerHTML = `${div.innerHTML}\n`;
        } else {
          div.outerHTML = div.innerHTML;
        }
      })
    }

    function tidyReturn(innerText) {
      return innerText.replace(/\n\t/g, '\n');
    }

    html = html.replace(/^([^<]+)/g, '<div>$1</div>');
    var body = new Parser().parseHtml(html).body;
    convertDiv(body);
    convertImg(body);
    let innerText = body.innerText;
    innerText = tidyReturn(innerText);
    return innerText;
  };
}

