"use strict";

var success = 0;
var error = 0;
var calls = [];

for (var i = 0; i < 1000; i++) {
    if (Math.random() > 0.1) calls.push(function () {
        return Promise.resolve();
    });else calls.push(function () {
        return Promise.reject();
    });
}

function call() {
    if (calls.length > 0) return calls.pop()().then(function () {
        success++;
        return call();
    }).catch(function () {
        error++;
        return call();
    });else return Promise.resolve();
}

Promise.all([call(), call()]).then(function () {
    console.log("Ergebnis");
    console.log(success + error);
}).catch(function (e) {
    console.error("something went wrong");
    console.error(e);
});

