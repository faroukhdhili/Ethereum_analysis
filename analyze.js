const fs = require('fs')

const count = (str, path) => {
    var re = path
    return ((str || '').match(re) || []).length
}
cleanfunction = (fun) => {
    while (fun[fun.length - 1] != "}") {

        fun = fun.substr(0, fun.length - 1)

    }
    return fun
}

getfunctions = (textfile) => {
    functions = []
    // var regex3=////{ appears in next lines
    var text = fs.readFileSync(textfile, 'utf8').split("\n")
    var regex1 = /(\w*(?<!(\/\/.*))function\s*([A-z0-9]+)?\s*\(.*\))(?!.*;)///find headers
    var regex2 = /function\s*([A-z0-9]+)?\(.*\).*\{.*\}///one line functions
    // var res3=regex3.exec(text);
    var i = 0; var func = ""
    while (i <= text.length - 1) {


        var res1 = regex1.exec(text[i]);
        var res2 = regex2.exec(text[i]);
        if (res1) {
            console.log("Function header detected")
            console.log(text[i])
            if (res2) {
                console.log("Function type_1 detected")
                functions.push(res2[0])

            } else if (text[i].search("{") >= 0) {
                console.log("Function type_2 detected")
                func += text[i]

                var nbopen = 1;
                var nbclose = 0;
                var j = i + 1

                while (nbopen > nbclose) {

                    func += text[j]
                    nbopen += count(text[j], /\w*(?<!(\/\/.*)){/g)
                    nbclose += count(text[j], /\w*(?<!(\/\/.*))}/g)
                    j++
                }

                func += text[j]

                func = func.replace(/\r/g, "");

                functions.push(cleanfunction(func))
                i = j
            } else {
                console.log("function type_3  detected");
                func += text[i]

                var k = i + 1;
                var nbopen = 0
                var nbclose = 0
                while (nbopen == 0) {
                    func += text[k]

                    nbopen += count(text[k], /\w*(?<!(\/\/.*)){/g)

                    nbclose += count(text[k], /\w*(?<!(\/\/.*))}/g)
                    k++
                }



                while (nbopen > nbclose) {
                    func += text[k]
                    nbopen += count(text[k], /\w*(?<!(\/\/.*)){/g)
                    nbclose += count(text[k], /\w*(?<!(\/\/.*))}/g)

                    k++
                }

                func += text[k]

                func = func.replace(/\r/g, "");

                functions.push(cleanfunction(func))
                i = k

            }
        }

        i++
    }

    console.log(functions.length);

}
var textfile = "test2.txt"
getfunctions(textfile);