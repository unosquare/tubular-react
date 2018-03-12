const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: "https://example.org/",
  referrer: "https://example.com/",
  contentType: "text/html",
  userAgent: "Mellblomenator/9000",
  includeNodeLocations: true
});
const { window } = jsdom;
const localStorage = require('mock-local-storage');

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.Blob = function Blob(params) {global.blobValue = params; return params};
window.URL.createObjectURL = () => {return global.blobValue};
window.URL.revokeObjectURL = () => {return};

window.open = (URL, name, specs) => {
  global.popupWindow = '<html>';

  const popup = {
    document : {
      write(element) {
        global.popupWindow = global.popupWindow + '\n' + element;
      },
      close() {
        global.popupWindow = global.popupWindow + '\n' + '</html>';
      }
    }
  };

  return popup;
}; 

window.localStorage = global.localStorage;
global.window = window;

global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
copyProps(window, global);