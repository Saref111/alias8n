# Alias8n a.k.a Aliasolization

A simple tool to replace aliases in text files

* * *

## Installation 

    npm i alias8n 

* * *
## Using

Start the program: 
    import alias8n from 'alias8n';
    
    const config = {
        ctxPath = "./ctx.json",
        source = "./index.html",
        dest = "./index-aliased.html",
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



