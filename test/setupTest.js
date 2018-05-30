const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

const open = jest.fn();

Enzyme.configure({ adapter: new Adapter() });

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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'open', { value: open });


