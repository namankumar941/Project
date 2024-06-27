const fs = require("fs")
const { readStream,readfile,byteCount,linesCount,wordsCount,charCount} = require('./func');




  async function wc(argv,stream){

 //we receive file name

    if(fs.existsSync(argv[2])){

      // check if we recieve command line option or not

      if(argv.length==4){
        const option = argv[3];
        const filename = argv[2];     
        readfile('./' + filename)
        .then(fileContents => {
          switch (option) {
            case '-c':
                console.log(byteCount(fileContents) + ' ' + filename);
                break;
            case '-l': 
                console.log(linesCount(fileContents) + ' ' + filename);
                break;
            case '-w':
                console.log(wordsCount(fileContents) + ' ' + filename);
                break;
            case '-m':
                console.log(charCount(fileContents) + ' ' + filename);
                break;
            default:
                throw new Error('Invalid option');
          }
        })
        .catch(err => {
          console.error('Error in readfile function:', err);
        });                 
    }

    // if we didn't recieve command line option
    else if (argv.length === 3) {
      const filename = argv[2];        
      readfile('./' + filename)
      .then(fileContents => {
        const line = linesCount(fileContents);
        const word = wordsCount(fileContents);
        const bytes = byteCount(fileContents);
        console.log(line + ' ' + word + ' ' + bytes + ' ' + filename);           
        })
      .catch(err => {
        console.error('Error in readfile function:', err);
        });        
    }

  }
  
  //we didn't receive file name then we have to support being able to read from standard input

  
}

  module.exports = wc