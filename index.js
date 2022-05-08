import fs from "fs"
import Reducer from "./reducer.js"

const alias8n = function(config) {
    const {
        ctxPath = "./ctx.json",
        source = "./index.html",
        dest = "./index-aliased.html",
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
    
    const aliases = srcFile.match(/a\(:.*?:\)/g)
    
    const reducerConfig = {srcFile, ctx,  aliases}
    const reducer = new Reducer(reducerConfig)

    srcFile = reducer.init()

    fs.writeFileSync(dest, srcFile)
}

export default alias8n