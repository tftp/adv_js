function outputNode1(el){
  console.log(el.nodeType +'  ' + el.nodeName + '  ' + el.nodeValue);
  let arr = Array.from(el.childNodes);
  arr.forEach(outputNode1);
};

function outputNode2(el){
  console.log(el.nodeType +'  ' + el.nodeName + '  ' + el.nodeValue);
  if (el.hasChildNodes()){
    let childEl = el.firstChild;
    do {
      outputNode2(childEl);
      childEl = childEl.nextSibling;
    }while(childEl);
  };
};

outputNode3 = function(){
  let parent;
  let el = document.documentElement;
  do {
    do{
      console.log(el.nodeType +'  ' + el.nodeName + '  ' + el.nodeValue);
      while(el.hasChildNodes()){
        el = el.firstChild;
        console.log(el.nodeType +'  ' + el.nodeName + '  ' + el.nodeValue);
      };
      if (el.nextSibling ) {
        el = el.nextSibling;
      }else{
        break
      };
    } while(true);
    do {
      parent = el.parentNode;
      if (parent && parent.nextSibling) {
        el = parent.nextSibling
      }else{
        el = parent;
      }
    }while(parent && (el === parent));
    test = prompt(1);
  }while(el);
};
