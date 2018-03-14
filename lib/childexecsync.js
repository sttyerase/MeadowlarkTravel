/**
 * This module passes a command line expression to the operating system for execution.
 * The module returns the command output to the calling function.
 */

exports.execProc = function(command_line){
   var myExec = require('child_process').execSync;
   return myExec(command_line);
} // EXECPROC()
