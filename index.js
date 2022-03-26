import fs from "fs"
import path from "path"

const alias8n = function(config) {
    switch (false) {
        case !!config.ctxPath: 
            throw Error("No context path found")
        case fs.existsSync(path.resolve(config.ctxPath)):
            throw Error("No context file found by given path")
    }

    const ctx = JSON.parse(fs.readFileSync(config.ctxPath))

    // var name = path.basename;
    // var nameArr = name.toLowerCase().split("")
    // var newName = nameArr.map((it) => {
    //   if (Object.keys(ABC_MAP).some(key => key === it)) {
    //     return ABC_MAP[it];
    //   } else {
    //     return it
    //   }
    // }).join("");


    // var htmlFolder = fs.readdirSync('./source/scss/blocks/')
    // htmlFolder.forEach((file) => {
    //   if (file.endsWith('.scss')) {
    //       var a = fs.readFileSync('./source/scss/blocks/' + file)

    //       var r = new RegExp(name, 'g')

    //       a = a.toString().replace(r, newName)

    //       fs.writeFileSync('./source/scss/blocks/' + file, a)
    //   }
    // } )

    // htmlFolder = fs.readdirSync('./source/')
    // htmlFolder.forEach((file) => {
    //   if (file.endsWith('.html')) {
    //       var a = fs.readFileSync('./source/' + file)

    //       var r = new RegExp(name, 'g')

    //       a = a.toString().replace(r, newName)

    //       fs.writeFileSync('./source/' + file, a)
    //   }
    // } )
    
    // return path.basename = newName;
}

alias8n({
    ctxPath: "test/test.json",
    source: "./test/test.html",
    dest: "./test/",
})