const fs = require("fs").promises


/**
 * This function Reads the given file through standard input and returns it.
 *
 * @async
 * @param {stream}
 * @returns {String : file data}
 */
async function readStream(stream) {
    
  }


/**
 * This function Reads the given file and returns it.
 *
 * @async
 * @param {file path}
 * @returns {String : file data}
 */

async function readfile(filepath){
  
    try {
        const data=await fs.readFile(filepath,'utf8');
        
        return data;
    }catch(err){
        console.log("error",err);
    }
}


/**
 * This function returns the number of bytes consisting the given file.
 *
 * @param {string} filename
 * @returns {number}
 */

function byteCount(filename) {
    return Buffer.byteLength(filename, 'utf8');
  }


  /**
 * This function returns the number of lines in a given text.
 *
 * @param {string} text
 * @returns {number}
 */

  function linesCount(text){
    return text.split(/\r?\n/).length;
  }


  /**
 * This function returns the number of words stored in a text.
 *
 * @param {string} text
 * @returns {number}
 */

  function wordsCount(text){
    return text.trim().split(/\s+/).length;
  }


  /**
 * This function returns the number of characters in a given text.
 *
 * @param {string} text
 * @returns {number}
 */

  function charCount(text){
    return text.length;
  }

  module.exports = {
    readStream,
    readfile,
    byteCount,
    linesCount,
    wordsCount,
    charCount
  };