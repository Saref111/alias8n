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

    const aliases = srcFile.match(/a\(:.*:\)/g)

    aliases.forEach((rawAlias) => {
        const alias = rawAlias.replace(/a\(:/, "").replace(/:\)/, "")
        const aliasArgs = alias.split(',')
        const aliasName = aliasArgs[0]

        if (!ctx[aliasName]) return
        
        
        if (aliasArgs.length < 2) {
            const aliasValue = ctx[aliasName]

            if (Array.isArray(aliasValue)) {
                aliasValue.forEach((value) => {
                    srcFile = srcFile.replace(rawAlias, value)
                })
                return
            }

            srcFile = srcFile.replace(rawAlias, aliasValue)
        } else {
            aliasArgs.forEach((arg, i) => {
                if (i < 1) return
                
                const r = new RegExp(`<${i}>`, "g")
                const aliasValue = ctx[aliasName].replace(r, arg.trim())
                srcFile = srcFile.replace(rawAlias, aliasValue)
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