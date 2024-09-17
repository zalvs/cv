var Typer = {
    text: null, // O texto que será digitado
    index: 0, // Controle do índice da digitação
    speed: 2, // Velocidade da digitação
    file: "", // Nome do arquivo de texto a ser lido (aqui será do HTML)
    accessCountimer: null,
    accessCount: 0,
    deniedCount: 0,

    init: function () {
        this.text = document.getElementById("console").innerHTML; // Pegando o texto diretamente do HTML
        this.text = this.text.trim(); // Remover espaços em branco no início e fim
        document.getElementById("console").innerHTML = ""; // Limpa o console para simular a digitação
        Typer.accessCountimer = setInterval(function () {
            Typer.updLstChr();
        }, 500);
    },

    content: function () {
        return document.getElementById("console").innerHTML;
    },

    write: function (str) {
        document.getElementById("console").innerHTML += str;
        return false;
    },

    addText: function (key) {
        if (Typer.text) {
            var cont = Typer.content(); 
            if (cont.substring(cont.length - 1, cont.length) == "|")
                document.getElementById("console").innerHTML = document.getElementById("console").innerHTML.substring(0, cont.length - 1); 
            Typer.index += Typer.speed;
            var text = Typer.text.substring(0, Typer.index);
            var rtn = new RegExp("\n", "g");
            document.getElementById("console").innerHTML = text.replace(rtn, "<br/>");
            window.scrollBy(0, 50); 
        }
    },

    updLstChr: function () {
        var cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) == "|") 
            document.getElementById("console").innerHTML = document.getElementById("console").innerHTML.substring(0, cont.length - 1);
        else
            this.write("|");
    }
};

Typer.init();
var timer = setInterval(function () {
    Typer.addText({ "keyCode": 123748 });
    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }
}, 30);
