
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
        this.currentAlias = {rawAlias, nesting, aliasArgs, aliasName}
        this.nesting = nesting
        this.rawAlias = rawAlias
        this.rawAliasRegex = this.rawAlias
        this.aliasArgs = aliasArgs
        this.aliasName = aliasName

        const aliasValue = this.ctx[aliasName]
        
        this.checkType(aliasValue)        
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

    reduceArgs() {
        this.aliasArgs.forEach((arg, i) => {
            if (i < 1) return
            
            const r = new RegExp(`<${i}>`, "g")
            const aliasValue = this.ctx[this.aliasName].replace(r, arg.trim())
            this.mutateString(aliasValue)
        })
    }

    mutateString(value) {
        try {
            this.srcFileString = this.srcFileString.replace(this.rawAliasRegex, value)
        } catch (err) {
            console.error(`Error while mutating string with alias: ${this.currentAlias}`)
            console.error(err)
        }
    }
    
    async checkType(value) {
        switch (true) {
            case Array.isArray(value):
                this.reduceArray(value)
                return
            case value instanceof Object:
                
                this.reduceObject(value) 
                return
            case typeof value === 'string' && this.aliasArgs.length < 2:
                this.mutateString(value)
                return
            case typeof value === 'string':
                this.reduceArgs()
            default:
                return
        }
    }
}