

//Global enums: 
Mood = {
    Past: "past",
    nonPast: "non-past",
    nonPast_Maj: "non-past-maj",
    nonPast_Man: "non-past-man",
    imperative: "imperative", 
    agentActive: "agent-active",
    agentPassive: "agent-passive", 
    infinitive: "infinitive"
}
Vowels = {
    kasra: 'ِ',
    fatha: 'َ',
    dama: 'ُ',
    sukun: 'ْ',
    fathaten: 'ً',
    damaten: 'ٌ',
    kastraten: 'ٍ',
    shadda: 'ّ'
}

function buildButton(){

    console.log("build button");
    /*
    labels: 
    Forms: 1, ..., 10
    vowels: fatha, kasra, damma
    moods: past,  non-past, non-past-maj, non-past-man, imperative, agent-active, agent-passive, infinitive
    pronouns: I, ms_you, fs_you, he, she, d_you, md_they, we, mp_you, fp_you, m_they, f_they
    case: nominative, accusative, genitive
    */
    
    //retrieve input
    input = {
        Form: parseInt(document.getElementById("form").value),
        Root: document.getElementById("root").value, 
        Vowel: document.getElementById("vowel").value,
        isKasra: document.getElementById("isKastra").checked, //for some verbs the past vowel of A-Elf'el might be kastra
        Mood: document.getElementById("mood").value,
        Pronoun: document.getElementById("pronoun").value,
        Case: document.getElementById("case").value,
        Known: document.getElementById("known").checked
    }

    //compute output and print
    output = buildVerb();
    
    document.getElementById("result").innerHTML = output;
}

function buildVerb(){   
    //there might be several options, we will start with option 0: 
    input.Option = 0;

    verb = {}
    
    //TODO - if it's dual - build coresponding nondual form and flag "dual" for later

    //TODO - determine L alfiel for LWLY case.
    
    //build normal form (no special rules)
    buildNormal();

    output = renderVerb();
    return output;
}

function buildNormal(){
    //build basic form
    switch(input.Form)
    {
        case 1:
            Form1();
            break;
        case 2:
            Form2();
            break;
        case 3:
            Form3();
            break;
        case 4:
            Form4();
            break;
        case 5:
            Form5();
            break;
        case 6:
            Form6();
            break;
        case 7:
            Form7();
            break;
        case 8:
            Form8();
            break;
        case 9:
            Form9();
            break;
        case 10:
            Form10();
            break;
    }

    //TODO - set PostFix

    //TODO - add dual postfix
}

function Form1(){

    switch(input.Mood){
        case Mood.Past:
            InitVerb("فَعَل");
            if(input.isKasra)
            {
                verb.Letters[verb.Ai].Vowel = Vowels.kasra;
            }
            break;
        case Mood.nonPast:
        case Mood.nonPast_Maj:
        case Mood.nonPast_Man:
            InitVerb("أَفْعَل");
            verb.Letters[verb.Ai].vowel = input.vowel;
            break;
        case Mood.imperative:
            InitVerb("إِفْعَل");
            // if (vowel == 'ُ' /*dama*/)
            // {
            //     this[0].Cons = 'أ';
            //     this[0].Vowel = 'ُ'; //dama
            // }
            // A.Vowel = vowel;
            break;
        case Mood.agentActive:
            InitVerb("فَاعِل");
            break;
        case Mood.agentPassive:
            InitVerb("مَفْعُول");
            break;
        case Mood.infinitive:
            //alert("no support for infinitive form1");
            break;
    }
}
function Form2(){
    InitVerb("فَعَّل");
}
function Form3(){
    InitVerb("فَاعَل");
}
function Form4(){
    InitVerb("أَفْعَل");
}
function Form5(){
    InitVerb("تَفَعَّل");
}
function Form6(){
    InitVerb("تَفَاعَل");
}
function Form7(){
    InitVerb("إِنْفَعَل");
}
function Form8(){
    //TODO - special form 8 rules
    InitVerb("إِفْتعَل");
}
function Form9(){
    InitVerb("إِفْعَلَل");
}
function Form10(){
    switch(input.Mood){
        case Mood.Past:
            InitVerb("إِسْتَفْعَل");
            break;
        case Mood.nonPast:
        case Mood.nonPast_Maj:
        case Mood.nonPast_Man:
            //TODO - get EITAN char and format accordinly.
            InitVerb("سْتَفْعِل");
            break;
        case Mood.imperative:
            InitVerb("إِسْتَفْعِل");
            break;
        case Mood.agentActive:
            InitVerb("مُسْتَفْعِل");
            break;
        case Mood.agentPassive:
            InitVerb("مُسْتَفْعَل");
            break;
        case Mood.infinitive:
            InitVerb("إِسْتِفْعَال");
            break;
        default:
            throw not_supported;
    }
}

 
function InitVerb(string){
    //"verb" need to contain:
    // array of cons+vowel of the string (parsed from "string")
    // positions of f-alfiel, a-alfiel, l-alfiel 
    
    verb.Letters = [];

    for (var i = 0; i < string.length; i++){
        if (isCharCons(string[i])){
            //verb.Letters.push();
            verb.Letters[verb.Letters.length] = {Con: string[i], Vowel: "", Shadda: false};

            if (string[i] == "ف")
                verb.Fi = verb.Letters.length - 1;
            else if (string[i] == "ع")
                verb.Ai = verb.Letters.length - 1;
            else if (string[i] == "ل")
                verb.Li = verb.Letters.length - 1;
        }
        else if (isCharVowel(string[i])){
            verb.Letters[verb.Letters.length - 1].Vowel = string[i];
        }
        else if (string[i] == "ّ" /*shadda*/){
            verb.Letters[verb.Letters.length - 1].Shadda = true;
        }
    }
}



function renderVerb(){
    var output = "";
    for (var i = 0; i < verb.Letters.length; i++){
        output += verb.Letters[i].Con + verb.Letters[i].Vowel; 
        if (verb.Letters[i].Shadda)
            output += "ّ"; //shadda
    }

    return output;
}
