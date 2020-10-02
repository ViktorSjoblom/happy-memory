# Happy Memory
<img src="https://media.giphy.com/media/YVPwi7L2izTJS/giphy.gif" width="65%">

### About

This is a project in JavaScript where we were assigned to build a memory card game using only JavaScript, HTML and CSS.

### Installing

1. Clone the repository

```
$ git clone https://github.com/ViktorSjoblom/happy-memory
```

2. Open the index.html file located in the public folder

3. Enjoy!

 **OR**

Visit netlify

```
https://happy-memory.netlify.com
```

## Built With

* JavaScript
* HTML
* CSS

## Authors

* **Viktor Sjöblom**

## Testers

* Erik Johannesson
* Betsy Alva Soplin

## Code Review

* Emelie Petersson

```
1. dela upp javascript funktionerna i mindre filer ? (jag har inte gjort det själv men såg att maja hade gjort det och tänker att det kanske är en bra grej :sweat_smile:)
2. script.js: Man kan använd element.cloneNode(true) för att skapa kopior av korten istället för att göra dupletter i const cards
3. Script.js: 139-147 Du har angett funktionen resetBoard två gånger här
4. script.js: 155 shuffle(); dyker upp rätt random, kanske bara ska sätta den i anslutning till funktionen, så det blir tydligt att funktionen ska köras direkt
5. Script.js: 172-173 “clickCounter = 0;” och “document.getElementById("clicks").innerHTML = 0;” ligger innanför en foreach loop, tror dom kan flyttas ut eftersom click countern inte har något med korten att göra (?)
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


YRGO 2019
