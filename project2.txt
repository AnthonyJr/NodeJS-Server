
Course:     CS316 - Fall 2016
Assignment: Project 2 - nodejs
Due:        Friday, Nov 4th, 23:59:59


Description:
    You will write a very basic web server in JavaScript that will run 
    via nodejs.

Requirements:
    - You must submit your assignment as a ZIP file (even if just one
      file) to the CSPortal by the due date/time.
    - You can work in teams of two.  Only one team member should turn
      in the assignment.  I will grade the latest version submitted by
      any team member (deducting any late penalties accordingly).
    - Your name(s) should be at the top of the source course and in 
      any documentation files.
    - Your JavaScript can use the modules included in the basic nodejs 
      system.
    - You cannot use any external modules.  You cannot install any extra 
      modules.  The assignment can and should be completed with the 
      modules listed in the requirements.  
    - The server should execute and run properly on the CS.UKY.EDU systems.
    - You should adhere to the guide Dr. Finkel wrote on good programming
      practices.  I will grade more strictly on these guidelines for this
      assignment!
    - Your project will include the following line:
      var paul   = require('/homes/paul/HTML/CS316/p2_req.js');

    - Your project will accept HTTP requests via URLs in the following
      format:

      /[a-zA-Z0-9_].cgi
      -or-
      /[a-zA-Z0-9_].html

      In other words, any filename ending in .cgi or .html whose base
      name is alphanumeric (plus underscore) proceeded by a slash (/).

      Valid examples:
           /index.html
           /name.html
           /paul_linton.html
           /theDate.cgi
           /getDirectory.cgi
           /getdir.cgi
           /F_I_L_E.html

           etc.

      Invalid examples:
           /index..html
           /.html
           /someDir/index.html

      As before, your program should handle ALL URL strings.  Anything NOT
      valid should return the appropriate error message!

    - For URLs ending in .html, you will "serve" the file to the user's
      browser.  These files should reside in the PUBLIC directory beneath
      the directory you started your program.  Your program shall return
      an error message if the file cannot be read/does not exist.

    - For URLs ending in .cgi, your program will attempt to execute the
      requested CGI program and return the output to the user's browser.
      Since we cannot (and SHOULD NOT!!!!) accept random programs from a
      user to execute, the only valid programs will be executed from the
      directory CGIDIR located beneath the directory your project was
      started.  You program shall return an error message if a program
      fails to execute.

    - The modules you will want to use are: http, fs, and child_process.

    - Additionally, as stated above, you MUST include (via 'require') 
      the p2_req.js file in my account!

    - Here are the steps you must perform:
        1) call http.createServer(myprocess)
                myprocess() is a function you will write to process requests
                from the user via their browser.
        2) create a mylisten() function that takes the following parameters:
                1) the http object returned in step one
                2) a port number which is a random port number between
                   paul.pstart() and paul.pend()
                3) paul.phost()
                4) paul.logger
        3) mylisten() will call the 4th argument passing it
                2 & 3 (the port and hostname)
                
           mylisten() will then call listen() on the 1st argument passing
                it arguments 2 & 3 also.

        4) myprocess() accepts two parameters, request and response.
           Your program needs to process request.url and fill in the
           appropriate values for response.statusCode response.setHeader,
           and finally sending content via response.end();

        5) You will want to use fs.existsSync() to verify if a requested
           file exists.

        6) You will want to fs.readFileSync() to read the HTML files.

        7) You MUST use child_process.exec(). 
           You shall send it (3) parameters, the path of the program to
           execute (you can prepend it with the directory name specified
           above), and environment object, and a callback function.
        
           the environment object looks like this:  {env: ourEnv}
           where ourEnv is declared like:

           var ourEnv = { 'PATH': xxxxx };

           where xxxxx is the directory given above -> "./CGIDIR/"

           The callback function is sent 3 parameters, error
           denoting an error condition, and stdout and stderr streams.
           All output from a successful run are contained in stdout and
           stderr.  You can simply concatenate them together.
           The output (either an error message, or the combined stdout/stderr
           streams) should be returned to the requester.

           As a security measure, you must provide exec() the environment
           object as above!

        8) You shall have two functions, one to handle files and one
           to handle CGI.  myprocess() should call them as appropriate.
           Do not put everything into myprocess()!  Compartmentalize!!!!
