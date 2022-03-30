import fs from "fs"
import parser from "./parser.js"

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

    const aliases = srcFile.match(/a\(:.*:\)/g)

    aliases.forEach((rawAlias) => {
        const rawAliasRegex = new RegExp(rawAlias, "g")
        const [aliasName, aliasArgs, nesting] = parser(rawAlias)

        if (!ctx[aliasName]) return  
        

        if (aliasArgs.length < 2) {
            const aliasValue = ctx[aliasName]
 
            if (Array.isArray(aliasValue)) {
                aliasValue.forEach((value) => {
                    srcFile = srcFile.replace(rawAlias, value)
                })
                return
            }
            
            if (aliasValue instanceof Object) {
                const value = nesting.reduce((acc, key) => {
                    acc = acc[key] 
                    return acc
                }, ctx)

                srcFile = srcFile.replace(rawAliasRegex, value)
                return
                
            }
        
            srcFile = srcFile.replace(rawAliasRegex, aliasValue)
        } else {
            aliasArgs.forEach((arg, i) => {
                if (i < 1) return
                
                const r = new RegExp(`<${i}>`, "g")
                const aliasValue = ctx[aliasName].replace(r, arg.trim())
                srcFile = srcFile.replace(rawAliasRegex, aliasValue)
            })
        }
    })

    fs.writeFileSync(dest, srcFile)
}

alias8n({
    ctxPath: "test/test.json",
    source: "./test/test.html",
    dest: "./test/test-al.html",
})

// export default alias8n