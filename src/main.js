#!/usr/bin/env node
let fs = require("fs");
let path = require('path');
let cv = require('./convert');

function start(){
    var args = process.argv.splice(1);
    console.log(args[0])
    if(!args[0]){
        return;
    }
    cv.tinyImgWithPath(args[0]);
}

start();