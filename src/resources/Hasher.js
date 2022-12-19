// @ts-nocheck
import * as encoding from 'text-encoding';
import jsSHA from "jssha";

async function createHash(input){
    const shaObj = new jsSHA("SHA-512", "TEXT", {encoding: "UTF8", "numRounds": 3})
    shaObj.update(input)
    return (shaObj.getHash("HEX"))


}

export {createHash}