const myWC= require('./WC.js');

const main = async () => {
  console.log('start')
  process.argv[2]='test.txt' ;
  process.argv[2]='-w'

  myWC(process.argv, process.stdin)
  
};

main();