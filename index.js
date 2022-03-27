import fs from "fs"

const alias8n = function(config) {
    const {
        ctxPath = "./ctx.json",
        source = "./index.html",
        dest = "./index-aliased.html"
    } = config

    switch (false) {
        case fs.existsSync(config.ctxPath):
            throw Error("No context file found by given path")
        case fs.existsSync(config.source):
            throw Error("No source file found by given path")
    }

    const ctx = JSON.parse(fs.readFileSync(config.ctxPath))
    
    let srcFile = fs.readFileSync(config.source).toString()

    for (let alias in ctx) {
        const aliasR = new RegExp("a\\(:" + alias.trim() + ":\\)", 'g')
        srcFile = srcFile.replace(aliasR, ctx[alias])
    }

    fs.writeFileSync(config.dest, srcFile)
}

alias8n({
    ctxPath: "test/test.json",
    source: "./test/test.html",
    dest: "./test/test-al.html",
})
