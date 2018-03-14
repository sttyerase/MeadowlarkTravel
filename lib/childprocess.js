/**
 * This module passes a command line expression to the operating system for execution.
 * The module returns no information to the calling function.
 */

exports.execProc = function(command_line){
   var myExec = require('child_process').exec;
   function puts(error, stdout, stderr) { 
      console.log(stdout);
      } // end function
   myExec(command_line, puts);
} // EXECPROC()
