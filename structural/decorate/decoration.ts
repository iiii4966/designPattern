/**
 * Decorator Factories
 * If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.
 * We can write a decorator factory in the following fashion:
 *  
 */

function color(value: string) {
    // this is the decorator factory
    return function (target) {
     // this is the decorator
     // do something with 'target' and 'value'...
    }
};

/**
 * Decorator Composition
 * 
 * one line
 * @f @g x 
 * 
 * 
 * mutiple line
 * @f
 * @g
 * x
 */

const log = console.log;

/** Example */

function logging() {
  // log("g(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value
    descriptor.value = function () {
      const result = originalMethod()
      log(result)
      return result
    };
  };
}

// not surppoted @ syntax decorator
function Logging(func) {
  return function(x) {
    let result = func.call(x); // "this" is passed correctly now
    log(result)
    return result;
  };
}
  
class C {
  @logging()
  static hello() {return 'Hello world'}
}

C.hello() // console stdout: Hello world

export {}

