
import parser from "./parser.js"

export default class Reducer {
    constructor({srcFile, ctx, aliases}) {
        this.ctx = ctx
        this.srcFileString = srcFile
        this.aliases = aliases
    }

    init() {
        this.aliases.forEach((rawAlias) => {
            const [aliasName, aliasArgs, nesting] = parser(rawAlias)
            
            if (!this.ctx[aliasName]) return  
            
            this.reduce({aliasName, aliasArgs, nesting, rawAlias})
        })

        return this.srcFileString
    }

    reduce({rawAlias, nesting, aliasArgs, aliasName}) {
        this.nesting = nesting
        this.rawAlias = rawAlias
        this.rawAliasRegex = this.rawAlias

        const aliasValue = this.ctx[aliasName]

        
        if (aliasArgs.length < 2) {
            this.checkType(aliasValue)
        } else {
            aliasArgs.forEach((arg, i) => {
                if (i < 1) return
                
                const r = new RegExp(`<${i}>`, "g")
                const aliasValue = this.ctx[aliasName].replace(r, arg.trim())
                this.mutateString(aliasValue)
            })
        }
    }

    reduceArray(aliasValue) {
        aliasValue.forEach((value) => {
            this.checkType(value)
        })
    }

    reduceObject() {
        const value = this.nesting.reduce((acc, key) => {
            acc = acc[key] 
            return acc
        }, this.ctx)

        this.checkType(value)
    }

    mutateString(value) {
        console.log(this.srcFileString);
        this.srcFileString = this.srcFileString.replace(this.rawAliasRegex, value)
    }
    
    checkType(value) {
        switch (true) {
            case Array.isArray(value):
                this.reduceArray(value)
                return
            case value instanceof Object:
                this.reduceObject()
                return
            case typeof value === 'string':
                this.mutateString(value)
                return
            default:
                return
        }
    }
}