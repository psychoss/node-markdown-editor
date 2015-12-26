//var sass = require("node-sass")
var fs = require("fs")
var dir = "/home/psycho/RESOURCE/归档/web/theme/scss"//"/home/psycho/RESOURCE/归档/web/ui/dropdown"//"/home/psycho/RESOURCE/归档/web/static/scss";
var dirjs = "/home/psycho/RESOURCE/归档/web/static/js/app";
var out = '/home/psycho/RESOURCE/归档/web/static/js/index.js';

/*
fs.watch(dir, function(event, filename) {

    if (filename === "index.css") {
        return
    };
    console.log(filename)
    sass.render({
        file: dir + "/index.scss",
        outputStyle: "compact"
    }, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        fs.writeFile(dir + "/index.css", result.css);
    });

})*/
var concating = 0;

fs.watch(dirjs, function(event, filename) {
    console.log(event)
    if (concating) {
        return
    };
    fs.readdir(dirjs, function(err, files) {
        concating = 1
        if (err) {
            return
        };
        // files = files.sorf(function(a, b, ) {
        //     if (a > b) {
        //         return 1
        //     };
        //     if (a < b) {
        //         return -1
        //     };
        //     return 0;
        // })
        
         var stream = fs.createWriteStream(out)
        files.forEach(function(k){
        	stream.write(fs.readFileSync(dirjs + "/" + k))
        	stream.write("\n\n\n");
        	
        })
         concating = 0;
    })




})
