export default (rawAlias) => {
    const alias = rawAlias.replace(/a\(:/, "").replace(/:\)/, "")
    
    const aliasArgs = alias.split(',')
    let aliasName = aliasArgs[0]
    
    const nesting = aliasName.split('.')
    aliasName = nesting[0]

    return [aliasName, aliasArgs, nesting]
}