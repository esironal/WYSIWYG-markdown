/**
 * Created by cc on 1/30/16.
 */
"use strict";

(function () {

  const TEXT_NODE = 3;

  document.getElementById('editor').addEventListener('keypress', ()=> {
    updateReview();
  });

  document.getElementById('insert-image').addEventListener('click', ()=> {
    //document.getElementById('editor').appendChild(createDemoImage());
    insertAtCursor(createDemoImage());
    updateReview();
  });

  function updateReview() {
    document.getElementById('preview').innerHTML = _convertContentEditable(document.getElementById('editor').innerHTML);
  }

  function insertAtCursor(toInsertNode) {

    function inContentEditable(node) {
      let parent;
      while ((parent = node.parentNode) !== null) {
        if (parent.contentEditable) {
          return true;
        }
      }
      return false;
    }

    let range = window.getSelection().getRangeAt(0);
    let node = range.endContainer;
    let offset = range.startOffset;

    if (node.nodeType == TEXT_NODE && inContentEditable(node)) {
      let startText = document.createTextNode(node.textContent.substring(0, offset));
      let endText = document.createTextNode(node.textContent.substring(offset));
      var div = document.createElement('div');
      div.appendChild(startText);
      div.appendChild(toInsertNode);
      div.appendChild(endText);

      node.parentNode.insertBefore(div, node);
      node.parentNode.removeChild(node);
    }
  }

  function createDemoImage() {
    var image = new Image();
    image.src = 'http://faceoftrolls.com/wp-content/uploads/2015/02/trollface-original-300x173.png';
    var div = document.createElement('div');
    div.appendChild(image);
    return div;
  }
})();
