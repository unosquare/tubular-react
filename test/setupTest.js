const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const open = jest.fn();
const jsdomWrapper = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdomWrapper;

var localStorageMock = (function() {
    var store = {};
    return {
      getItem: function(key) {
        return store[key];
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
      removeItem: function(key) {
        delete store[key];
      }
    };
  })();

enzyme.configure({ adapter: new Adapter() });

global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.localStorage = localStorageMock;
global.open = open;
