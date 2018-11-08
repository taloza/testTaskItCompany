const fs = require('fs');



//fs.readFile('text.txt', function(err, data){
	//if(err) throw err;
		//let arr = data.toString();
		//arr = arr.split("\n");
			//arr = JSON.parse(arr);
	//console.log(arr);
//})



//var arr2;
//arr2 = fs.readFileSync('text.txt')
	//arr2 = arr2.toString();
	//console.log(arr2);
	
	
	
	//вивід списка файлів в тій папці де лежить скрипт в консоль
	//fs.readdir('.',(err, files)=>{
		//files.forEach(file=>{
			//console.log('name: ' +file);
		//})
	//});
	
	
	
//cворення файла лог  https://www.youtube.com/watch?v=ect972pD8ts

fs.appendFile('readme.log', 'some texttt')