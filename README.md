# Alias8n a.k.a Aliasolization

A simple tool to replace aliases in text files


## Installation 

    npm i alias8n 

## Using

Start the program:

    import alias8n from 'alias8n';
    
    const config = {
        ctxPath: "./ctx.json",
        source: "./index.html",
        dest: "./index-aliased.html",
    } /* These are default values */
    
    alias8n(config);
Alias8n has several ways to replace aliases with its values. 

+  ### Default
#### ctx.json
    {
        "hello": "Hello World!"
    }
#### index.html
    <p>a(:hello:)</p>
#### output.html 
    <p>Hello World!</p>
+  ### Templates
#### ctx.json
    {
        "hello-template": "<1>, <2>!"
    }
#### index.html
    <p>a(:hello-template, Hello, World:)</p>
#### output.html 
    <p>Hello World!</p>
+  ### Arrays *(can contain only strings)*
#### ctx.json
    {
        "hello-array": ["Hello, World!", "Hello, Heaven!", "Hello, Hell!"]
    }
#### index.html
    <p>a(:hello-array)</p>
    <p>a(:hello-array)</p>
    <p>a(:hello-array)</p>
#### output.html 
    <p>Hello World!</p>
    <p>Hello Heaven!</p>
    <p>Hello Hell!</p>
+  ### Objects and nesting
#### ctx.json
    {
        "hello-obj": {
            "hello": "Hello,",
            "nested-object": {
                "world": "World!"
            },  
            "nested-array": ["Hello, World!", "Hello, Heaven!", "Hello, Hell!"]
        }
    }
#### index.html

    <p>a(:hello-obj.hello:) a(hello-obj.nested-obj.world)</p>
    
    <ul>
        <li>a(:hello-obj.nested-array:)</li>
        <li>a(:hello-obj.nested-array:)</li>
        <li>a(:hello-obj.nested-array:)</li>
    </ul>


#### output.html 
    <p>Hello World!</p>
    
    <ul>
        <li>Hello World!</li>
        <li>Hello Heaven!</li>
        <li>Hello Hell!</li>
    </ul>



