/*
        Nom et prénom : les champs de saisie ne doivent pas être vides      
        Civilité  :  par  défaut  aucun  bouton  radio  ne  sera  coché  avant  que  l'utilisateur  ne  clique  sur l'un d'eux (c'est donc obligatoire)   
        Nationalité : par défaut le 1er choix apparaissant dans la liste déroulante sera "Aucun", l'utilisateur  devra  donc  obligatoirement  choisir  un  pays  dans  la  liste  (ne  pas  perdre  de  temps à mettre plus de 3 ou 4 pays)      
        Le  mot  de  passe  choisi  devra  répondre  aux  exigences  de  sécurité  suivantes  :  au  minimum 8 caractères,
         au moins une minuscule 
         + 1 majuscule 
         + 1 chiffre 
         + 1 caractère spécial parmi une liste que vous définirez : pas d'utilisation d'expression régulière 
        (outil technique à ne pas utiliser à ce stade)     
        Le   mot   de   passe   confirmé   doit   être   exactement   identique   au   mot   de   passe   précédemment choisi      
        L'adresse  email  sera  considérée  comme  valide  si  elle  comporte  le  caractère  @,  
        si  la  partie  gauche  n'est  pas  vide  et  ne  comporte  pas  de  caractères  interdits  (vous  en  établirez la liste), 
        et si la partie droite "ressemble" à un nom de domaine connu (vous en définirez également les règles).      
        Les  centres  d'intérêts  seront  validés  si  il  y  a  au  moins  2  cases  cochées  
        (proposez  au  maximum 6 ou 8 choix possibles disposés sur 2 lignes) 
*/

// Note : Prettier (extension de mise en page (formatage ?)) met les longues listes/tableaux/paramètres en ligne, ce qui prend beaucoup de place)
// Note à moi-même : mieux nommer mes variables

function checkForm() {
    const form = document.forms.signup;
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const Nationality = form.elements.nationalite.value;
    const password = form.elements.password.value;
    const passwordconfirm = form.elements.passwordconfirm.value;
    isNameEmpty(
        firstName,
        "NoFName",
        "firstNameContainer",
        "prénom",
        "firstName"
    );
    isNameEmpty(lastName, "NoLName", "lastNameContainer", "nom", "lastName");
    isNationalityEmpty(Nationality);
    PasswordCheck(password);
    isPasswordConfirmed(password, passwordconfirm);
    const centreinter = document.getElementsByName("centreinter"); //sélectionne tout les éléments de centre d'intérêts.
    Are2Selected(centreinter); //Est-ce que deux choses sont au moins sélectionner dans les centres d'intéret
    const civilite = document.getElementsByName("civilite");
    isCiviliteChoisi(civilite);
    if (document.querySelectorAll(".error").length == 0) {
        alert("Votre inscription est validée !");
    }
}

//Les nombreux paramètres sont une tentative pour éviter de répéter deux fonctions similaires.
function isNameEmpty(Name, noName, nameContainer, quelNom, whichName) {
    let isNoNameAlreadyIn = document.getElementById(noName);
    if (Name == "" && isNoNameAlreadyIn == null) {
        //if pour éviter d'ajouter plusieurs fois le message "Veuillez saisir votre nom ou prénom."
        let container = document.getElementById(nameContainer);
        let nameError = document.createElement("p");
        document.getElementById(whichName).classList.add("input-error");
        nameError.className = "sub-form-label error";
        nameError.id = noName;
        nameError.innerHTML = "Veuillez saisir votre " + quelNom + ".";
        container.append(nameError);
    }
    //Supprime le message si "Name" n'est plus vide et qu'il a été ajouté dans le code HTML.
    if (Name != "" && isNoNameAlreadyIn) {
        let ElementParent = isNoNameAlreadyIn.parentNode;
        ElementParent.removeChild(isNoNameAlreadyIn);
        document.getElementById(whichName).classList.remove("input-error");
    }
}

//Répétion de isNameEmpty, mais je pense qu'il est possible de la réutiliser pour éviter la répétition
function isNationalityEmpty(nation) {
    let isNoNationAlreadyIn = document.getElementById("noNation");
    if (nation == "" && isNoNationAlreadyIn == null) {
        let container = document.getElementById("nationContainer");
        let nationError = document.createElement("p");
        document.getElementById("nationalite").classList.add("input-error");
        nationError.className = "sub-form-label error";
        nationError.id = "noNation";
        nationError.innerHTML = "Veuillez choisir votre nationalité.";
        container.append(nationError);
    }
    if (nation != "" && isNoNationAlreadyIn) {
        let ElementParent = isNoNationAlreadyIn.parentNode;
        ElementParent.removeChild(isNoNationAlreadyIn);
        document.getElementById("nationalite").classList.remove("input-error");
    }
}

function PasswordCheck(password) {
    let hasCaractereSpeciaux = false;
    let hasChiffre = false;
    let hasMaj = false;
    for (let i = 0; i < password.length; i++) {
        if (caractereSpeciaux.indexOf(password[i]) != -1) {
            hasCaractereSpeciaux = true;
        } else if (isFinite(password[i]) == true) {
            // Pas sûr de la fiabilité de la fonction, mais ça marche (?)
            hasChiffre = true;
        } else if (password[i].toUpperCase() == password[i]) {
            hasMaj = true;
        }
    }
    let spIndicator = document.getElementById("sp");
    let chiffreIndicator = document.getElementById("nb");
    let majIndicator = document.getElementById("maj");
    IndicatorSwitch(spIndicator, hasCaractereSpeciaux);
    IndicatorSwitch(chiffreIndicator, hasChiffre);
    IndicatorSwitch(majIndicator, hasMaj);
    if ((hasChiffre, hasMaj, hasCaractereSpeciaux == false)) {
        document.getElementById("password").classList.add("input-error");
    } else {
        document.getElementById("password").classList.remove("input-error");
    }
}

function IndicatorSwitch(Indicator, whichHas) {
    if (whichHas == false) {
        Indicator.classList.add("error");
    } else {
        Indicator.classList.remove("error");
    }
}

function isPasswordConfirmed(password, passwordconfirm) {
    isWrongPWAlreadyIn = document.getElementById("noPWConfirm");
    if (password != passwordconfirm && isWrongPWAlreadyIn == null) {
        let container = document.getElementById("passwordConfirmContainer");
        let PWConfirmError = document.createElement("p");
        document.getElementById("passwordconfirm").classList.add("input-error");
        PWConfirmError.className = "sub-form-label error";
        PWConfirmError.id = "noPWConfirm";
        PWConfirmError.innerHTML = "Veuillez confirmer votre mot de passe.";
        container.append(PWConfirmError);
    }
    if (password == passwordconfirm && isWrongPWAlreadyIn) {
        let ElementParent = isWrongPWAlreadyIn.parentNode;
        ElementParent.removeChild(isWrongPWAlreadyIn);
        document
            .getElementById("passwordconfirm")
            .classList.remove("input-error");
    }
}

function Are2Selected(things) {
    let checkCount = 0;
    let i = 0;
    while (checkCount < 2 && i < things.length) {
        if (things[i].checked) {
            checkCount++;
        }
        i++;
    }
    let isTwoCentreinter = document.getElementById("noTwoCentreinter");
    if (checkCount != 2 && isTwoCentreinter == null) {
        let container = document.getElementById("centreinterContainer");
        let centreinterError = document.createElement("p");
        centreinterError.className = "sub-form-label error";
        centreinterError.id = "noTwoCentreinter";
        centreinterError.innerHTML =
            "Veuillez choisir au moins 2 centre d'intérêts.";
        container.append(centreinterError);
    }
    if (checkCount == 2 && isTwoCentreinter) {
        let ElementParent = isTwoCentreinter.parentNode;
        ElementParent.removeChild(isTwoCentreinter);
    }
}

function isCiviliteChoisi(civilite) {
    let civiliteChoisi = false;
    for (let i = 0; i < civilite.length; i++) {
        if (civilite[i].checked) {
            civiliteChoisi = true;
        }
    }
    let isCiviliteErrorIn = document.getElementById("noCivilite");
    if (civiliteChoisi == false && isCiviliteErrorIn == null) {
        let container = document.getElementById("civiliteContainer");
        let civiliteError = document.createElement("p");
        civiliteError.className = "sub-form-label error";
        civiliteError.id = "noCivilite";
        civiliteError.innerHTML = "Veuillez choisir votre civilité.";
        container.append(civiliteError);
    }
    if (civiliteChoisi == true && isCiviliteErrorIn) {
        let ElementParent = isCiviliteErrorIn.parentNode;
        ElementParent.removeChild(isCiviliteErrorIn);
    }
}

const caractereSpeciaux = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "{",
    "}",
    "[",
    "]",
    "|",
    "\\",
    ":",
    ";",
    '"',
    "<",
    ">",
    ",",
    ".",
    "?",
    "/",
];
