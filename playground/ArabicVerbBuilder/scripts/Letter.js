//******************************** */
//Letter class
/********************************** */
function Letter(input, startInIndex = 0){
    //the vowels: 
    this.kasra = 'ِ';
    this.fatha = 'َ';
    this.dama = 'ُ';
    this.sukun = 'ْ';
    this.fathaten = 'ً';
    this.damaten = 'ٌ';
    this.kastraten = 'ٍ';
    this.shadda = 'ّ';

    //member feilds: 
    this.cons = '0';
    this.vowel = '0';
    this.isShadda = false;


    //private methods:
    var isCharIn = function (char, string){
        for (var i = 0; i < string.length; i++){
            if (string[i] == char)
                return true;
        }
        return false;
    }
    //public methods: 
    this.isCharVowel = function (char){
        var vowels = "ًٌٍَُِْ";
        return isCharIn(char, vowels);
    }
    this.isCharCons = function(char){
        var consonances = "أإاىئؤآءبتثجحخدذرزسشصضطظعغفقكلمنهوية";
        return isCharIn(char, consonances);
    }
    this.isAlif = function(char){
        var alifs = "أاإءئؤآ";
        return isCharIn(char, alifs);
    }
    this.isAlshamsiaLetter = function(char){
        var shamsiLetters = "تثدذرزسشصضطظلن";
        return isCharIn(char, shamsiLetters);
    }
    this.getHamzaKursi = function(v){
        switch(v){
            case Letter.kasra:
                return 'ئ';
            case Letter.dama:
                return 'ؤ';
            case Letter.fatha:
                return getKursiAlif(v);
            default:
                throw "invalid input";
        }
    }
    this.getKursiAlif = function(v){
        switch(v)
        {
            case Letter.kasra:
                return 'إ';
            case Letter.dama:
            case Letter.fatha:
                return 'أ';
            default:
                throw "invalid input"; 
        }
    }
    this.getMaterLectionis = function(v){
        switch (v)
        {
            case Letter.fatha:
                return 'ا';
            case Letter.dama:
                return 'و';
            case Letter.kasra:
                return 'ي';
            default:
                throw "invalid input";
        }
    }
    this.getVowelFromMaterLectionis = function(ml){
        switch (ml)
        {
            case 'ا':
                return Letter.fatha;
            case 'و':
                return Letter.dama;
            case 'ي':
                return Letter.kasra;
            default:
                throw "invalid input";
        }
    }

    //Parsing the string: 
    i = startInIndex; //iterator for running on the input array

    if (this.isCharVowel(input[i])){
        this.cons = '0'; //zero represents an empty character
    }
    else if (this.isCharCons(input[i])){
        this.cons = input[i]; //assing the consonant
        i++;
        if (i == input.length) return; //we finished
    }
    else throw "invalid input";

    if (input[i] == this.shadda){
        this.isShadda = true;
        i++;
        if (i == input.length) return;
    }
    else
        this.isShadda = false;

    if (this.isCharVowel(input[i])) this.vowel = input[i];

    
}
//setting getters and setters
Object.defineProperty(Letter.prototype, "Cons", {
    get: function(){
        return this.cons;
    },
    set: function(value){
        this.cons = value;
    }
});
Object.defineProperty(Letter.prototype, "Vowel", {
    get: function(){
        return this.vowel;
    },
    set: function(value){
        this.vowel = value;

        //changing hamza position corispondingly
        if (this.cons == 'أ' && this.vowel == this.kasra)
            this.cons = 'إ';
        if (this.cons == 'إ' && this.vowel != this.kasra)
            this.cons = 'أ';
    }
});

//extending class
function Extends(Base, Subclass){
    Subclass.prototype = new Base();
    Subclass.prototype.constructor = Subclass();
}