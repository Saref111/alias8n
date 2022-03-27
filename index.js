import fs from "fs"

const alias8n = function(config) {
    const {
        ctxPath = "./ctx.json",
        source = "./index.html",
        dest = "./index-aliased.html",
        aliasMarker = "a\\(:*:\\)", // use * for alias name
    } = config

    switch (false) {
        case fs.existsSync(ctxPath):
            throw Error("No context file found by given path")
        case ctxPath.endsWith(".json"):
            throw Error("Context file should be a json file")
        case fs.existsSync(source):
            throw Error("No source file found by given path")
    }

    const ctx = JSON.parse(fs.readFileSync(ctxPath))
    
    let srcFile = fs.readFileSync(source).toString()

    for (let alias in ctx) {
        const aliasMarkerRegex = new RegExp(aliasMarker.replace(/\*/g, alias), "g")
        srcFile = srcFile.replace(aliasMarkerRegex, ctx[alias])
    }

    fs.writeFileSync(dest, srcFile)
}

// alias8n({
//     ctxPath: "test/test.json",
//     source: "./test/test.html",
//     dest: "./test/test-al.html",
// })

export default alias8n