1. If you are trying to edit/ view the website property on your local machine:
	1.1: From command line, go to the website project directory
	1.2: start a local host using command "npx http-server" (note you must have node.js installed on your computer to run this)
	1.3: In your browser, go to http://localhost:8080/ and you should be able to view website correctly

2. If you want to add images to portfolio, add the image to website folder /media/Portfolio/[category]
	2.1: Then in command line, run "node generate-index.js" This will create a new gallery-data.json file in the project directory, you need to push this into GitHub (or whatever publisher you're using) so that the changes are reflected into the index.html file and made live.