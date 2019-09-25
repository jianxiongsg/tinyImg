#!/usr/bin/env node
let fs = require("fs");
let path = require('path');
let cv = require('./convert');

function start(){
    var args = process.argv.splice(2);
    if(!args[0]){
        return;
    }
    cv.tinyImgWithPath(args[0]);
}

start();