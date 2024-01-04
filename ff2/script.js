let mainButton = document.getElementById("mainButton");
let accountsInput = document.getElementById("accountsInput");
let daysInput = document.getElementById("daysInput");
let resetButton = document.getElementById("resetButton");
// let selectedRadio = document.querySelector('input[name="hashtags"]:checked');
let selectedRadio;
let contentSection = document.getElementById("content");
let finalHashtagStatus = localStorage.getItem("finalHashtagStatus");

const captionList = ['Tutorial completo para seducir en el ebook de mi bio 🌹💄', 'Descubre los secretos de la seducción en mi ebook 🖤🔥', 'Más consejos de seducción en mi ebook "El Arte de la Femme Fatale" en mi bio 💋💄', 'Tutorial completo para conquistar corazones en mi ebook 🔥🌹', 'Despierta tu lado seductor con el ebook en mi bio 🖤💄', 'Aprende a ser irresistible con el ebook de seducción en mi bio 🌟💋', 'Más secretos de seducción en el ebook de mi bio 🖤🔥', 'Conviértete en una maestra de la seducción con el ebook en mi bio 💄💋', 'Descubre el poder de la seducción en el ebook de mi bio 🌹🖤', 'Tutorial completo para volverte irresistible en el ebook en mi bio 💋🌟', 'Domina el arte de la seducción con el ebook en mi bio 🖤🔥', 'Aprende a conquistar con el ebook "El Arte de la Femme Fatale" en mi bio 💄💋', 'Desvela los secretos de la seducción en el ebook de mi bio 🌹🔥', 'Más consejos de seducción en el ebook en mi bio 🖤💄', 'Tutorial completo para ser una femme fatale en el ebook de mi bio 💋🌟', 'Descubre el poder de la seducción en el ebook de mi bio 🌹🖤', 'Conviértete en una experta de la seducción con el ebook en mi bio 💄🔥', 'Aprende a seducir con el ebook "El Arte de la Femme Fatale" en mi bio 💋🌟', 'Despierta tu lado seductor con el ebook de mi bio 🖤💄', 'Más secretos de seducción en el ebook en mi bio 🔥🌹', 'Tutorial completo en el ebook de seducción en mi bio 🖤⚡️', 'Más secretos en el ebook de femme fatale en mi bio 🔥🌹', 'Descubre el poder de la seducción en el ebook de mi bio 💋⚡️', 'Conviértete en una experta en seducción con el tutorial en mi ebook 🌟🔥', 'Más consejos para conquistar en el ebook de seducción en mi bio 💄⚡️', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🖤🔥', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 💋⚡️', 'Más en el ebook de seducción en mi bio 🌹⚡️', 'Descubre los secretos de la atracción en el ebook de mi bio 🔥💄', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook 💋⚡️', 'Más secretos en el ebook de femme fatale en mi bio 🖤🌹', 'Descubre el poder del lenguaje corporal en el ebook de seducción en mi bio 🌟💄', 'Tutorial completo en el ebook para conquistar a cualquier hombre en mi bio 💋⚡️', 'Más en el ebook de seducción en mi bio 🌹💄', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🖤⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 💋🌟', 'Más consejos para conquistar en el ebook de seducción en mi bio 🌹⚡️', 'Descubre los secretos de la atracción en el ebook de mi bio 🔥🌟', 'Conviértete en una experta en seducción con el tutorial en mi ebook 💄⚡️', 'Más en el ebook de seducción en mi bio 🖤⚡️', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 💋🌹', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 🔥⚡️', 'Más secretos en el ebook de seducción en mi bio 🌟💄', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🌹⚡️', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook 🔥💄', 'Más en el ebook de seducción en mi bio 🖤🌟', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 💋⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 🌹🔥', 'Más consejos para conquistar en el ebook de seducción en mi bio 💄⚡️', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🌟🌹', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 💋⚡️', 'Más secretos en el ebook de seducción en mi bio 🔥💄', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🖤🌹', 'Conviértete en una experta en seducción con el tutorial en mi ebook ⚡️💄', 'Más en el ebook de seducción en mi bio 💋🌟', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🔥⚡️', 'Tutorial completo en el ebook para conquistar a cualquier hombre en mi bio 🌹💄', 'Más consejos para conquistar en el ebook de seducción en mi bio 🖤⚡️', 'Descubre los secretos de la atracción en el ebook de mi bio 💋🌟', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook 🔥🌹', 'Más en el ebook de seducción en mi bio 💄⚡️', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🌟⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 💋🔥', 'Más secretos en el ebook de seducción en mi bio 🖤💄', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🌹⚡️', 'Conviértete en una experta en seducción con el tutorial en mi ebook 🔥💄', 'Más en el ebook de seducción en mi bio 🌟⚡️', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 💋🌹', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 🖤⚡️', 'Más consejos para conquistar en el ebook de seducción en mi bio 🔥💄', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🌟🌹', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 💋⚡️', 'Más en el ebook de seducción en mi bio 🖤🔥', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🌹💄', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook ⚡️🌟', 'Más secretos en el ebook de seducción en mi bio 🔥🌹', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 🖤⚡️', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 💋💄', 'Más consejos para conquistar en el ebook de seducción en mi bio 🔥🌟', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🌹⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 🖤💄', 'Más en el ebook de seducción en mi bio ⚡️🌟', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 💋🔥', 'Conviértete en una experta en seducción con el tutorial en mi ebook 🌹⚡️', 'Más secretos en el ebook de seducción en mi bio 🔥💄', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 🖤🌟', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 💋⚡️', 'Más consejos para conquistar en el ebook de seducción en mi bio 🌹🔥', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 💄⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 🌟💋', 'Más en el ebook de seducción en mi bio 🔥🌹', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🖤💄', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook ⚡️🌟', 'Más secretos en el ebook de seducción en mi bio 🔥⚡️', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 💋💄', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 🌹🔥', 'Más consejos para conquistar en el ebook de seducción en mi bio 🖤⚡️', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🌟💄', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 💋🔥', 'Más en el ebook de seducción en mi bio 🌹⚡️', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🖤🌟', 'Conviértete en una experta en seducción con el tutorial en mi ebook 🔥⚡️', 'Más secretos en el ebook de seducción en mi bio 💄🌹', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 💋⚡️', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 🖤🌟', 'Más consejos para conquistar en el ebook de seducción en mi bio 🔥💄', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 💋⚡️', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 🌹🌟', 'Más en el ebook de seducción en mi bio 🖤⚡️', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 💄🌹', 'Conviértete en una maestra de la seducción con el tutorial en mi ebook 🔥⚡️', 'Más secretos en el ebook de seducción en mi bio 🌟💄', 'Descubre los secretos para conquistar a cualquier hombre en el ebook de mi bio 🖤🔥', 'Tutorial completo en el ebook para dominar el arte de la seducción en mi bio 💋⚡️', 'Más consejos para conquistar en el ebook de seducción en mi bio 🌹💄', 'Despierta tu lado seductor con el ebook de femme fatale en mi bio 🔥🌟', 'Tutorial completo en el ebook para ser una diosa de la seducción en mi bio 💋⚡️', 'Más en el ebook de seducción en mi bio 🖤🔥', 'Descubre el poder del lenguaje corporal en el ebook de mi bio 🌹💄', 'Conviértete en una experta en seducción con el tutorial en mi ebook ⚡️🌟']
const hashtags = " #becomingafemmefatale #femmefatale #seduction #manipulation #viral #power #foryou #fyp #darkfeminine #darkfemininity #darkfeminineenergy #darkfemme #maneater #confidence #siren #learnontiktok "

// const mainForm = document.getElementById("mainForm");
// let hashtagsFieldset = document.getElementById("hashtagsFieldset");
// let settingsSection = document.getElementById("settingsSection");

// const captionButtonWithHashtags = document.getElementsByClassName("captionButtonWithHashtags")
// const captionButtonWithoutHashtags = document.getElementsByClassName("captionButtonWithoutHashtags")
// const textButton = document.getElementsByClassName("textButton")

// const divs = document.querySelectorAll('.captionButtonWithHashtags');

// divs.forEach(element => element.addEventListener('click', event => {
//     console.log("hola "+element);
//   }));

// textButton.addEventListener("click",)
// captionButtonWithHashtags.addEventListener("click",copyCaptionWithHashtags(this))
// captionButtonWithoutHashtags.addEventListener("click",copyCaptionWithoutHashtags(this))

// Array.from(captionButtonWithHashtags).forEach(function(element) {
//     element.addEventListener('click', function(){copyCaptionWithHashtags()});
//   });

// Array.from(captionButtonWithoutHashtags).forEach(function(element) {
//     element.addEventListener('click', function(){copyCaptionWithoutHashtags()});
//   });

main();

function main(){
    // reassignVariables();
    checkLocalStorage();
}

// mainButton.addEventListener("click",insertContent);

resetButton.addEventListener("click",resetFields);


function resetFields(){
    mainButton.disabled = false;
    console.log("Oprimiste el botón de reiniciar")
    setFinalHashtagStatus();
    contentSection.innerHTML="";
    deleteLocalStorage();
    accountsInput.value = "3";
};

async function getData(){
    try{
    const response = await fetch("https://api.nextboardapp.com/api/v1/script/1Y8CSN4ecyza_z91jQs1vsT5qQLpf_QFfBXpIOrHL69I");
    // const response = await fetch("https://httpstat.us/500");
    // const response = await fetch("https://api.npoint.io/6edaec313590c2664897");
    const responseObj = await response.json();
    // if (responseObj.status >= 400 && responseObj.status < 600) {
    //     throw new Error("Bad response from server");
    //   }
      return responseObj;
    }
    catch(error){
        console.log(error);
        console.log("Error de servidor");
        contentSection.innerHTML="Error de servidor";
    }
    // return responseObj;
}

async function filterOutErrors(){
    let dataKeys = 1;
    let data;
    let errorCounter = 0;
    while (dataKeys == 1) {
        errorCounter++;
        data = await getData();
        dataKeys = Object.keys(data).length;
        // console.log(data);
        // console.log(dataKeys);
        // console.log(data.scriptType);
        // console.log(counter)
        if (errorCounter == 5) {
            contentSection.innerHTML="Error de servidor";
            throw new Error("Limit exceeded");
        }
    }

    return data;
}

async function filterByType(){
    let dataType;
    let filteredData;
    while (dataType != "basic"){
        filteredData = await filterOutErrors();
        dataType = filteredData.scriptType;
    }
    return filteredData;
}

async function getDataPerAccount(){
    let numberOfVideos = daysInput.value * 3;
    const dataPerAccount = [];
    for (let i = 0; i < numberOfVideos; i++) {
        dataPerAccount.push(await filterByType());
    }
    // console.log(dataPerAccount);
    return dataPerAccount;
}

async function createTable(){
    selectedRadio = document.querySelector('input[name="hashtags"]:checked');
    // let lastHashtagStatus = document.querySelector('input[name="hashtags"]:checked').value;
    let lastHashtagStatus = selectedRadio.value;
    let dataPerAccount = await getDataPerAccount();
    let table = document.createElement("table");
    let visibilitySin;
    let visibilityCon;
    table.insertAdjacentHTML("afterbegin",`
    <thead>
    <tr>
    <th>Video</th>
    <th>Texto</th>
    <th>Descargar</th>
    <th>Copiar Texto</th>
    <th>Copiar Caption</th>
    </tr>
    </thead>
    `);
    dataPerAccount.forEach(element => {
        // let encodedScriptText = encodeURIComponent(element.scriptText);
        switch(lastHashtagStatus){
            case "con":
                visibilityCon = "hidden";
                visibilitySin = "";
                lastHashtagStatus = "sin";
                break;
            case "sin":
                visibilityCon = "";
                visibilitySin = "hidden";
                lastHashtagStatus = "con";
                break;
            default:
                console.error("Error");
        }
        table.insertAdjacentHTML("beforeend", `
    <tr>
    <td><video preload="metadata" src="${element.backgroundUrls}" width="100%" style="max-width: 100px;"></video></td>
    <td class="scriptText">${element.scriptText}</td>
    <td><a href="${element.backgroundUrls}" download><button onclick="downloadVideo(this)">Descargar</button></a> </td>
    <td><button class="textButton" onclick="copyText(this)">Copiar texto</button></td>
    <td><button class="captionButtonWithoutHashtags" onclick="copyCaptionWithoutHashtags(this)" ${visibilitySin}>Sin #</button><button class="captionButtonWithHashtags" onclick="copyCaptionWithHashtags(this)" ${visibilityCon}>Con #</button></td>
    </tr>
    `);
    });
    // document.body.append(table);
    // console.log(table);
    finalHashtagStatus = lastHashtagStatus;
    return table;
}

async function insertContent(){
    mainButton.disabled = true;
    console.log("Oprimiste el botón de obtener videos")
    let loadingText = document.createElement("p");
    loadingText.innerHTML = "Cargando..."
   contentSection.prepend(loadingText);
    for (let i = 0; i < accountsInput.value; i++) {
        let table = await createTable();
        contentSection.insertAdjacentHTML("beforeend",`
        <h1>Cuenta ${i+1}</h1>
        `)
        contentSection.append(table);
    }
    loadingText.remove();
    saveLocalStorage();
}

async function saveLocalStorage(){
    localStorage.setItem("finalHashtagStatus",finalHashtagStatus);
    // localStorage.setItem("content",contentSection.innerHTML);
    localStorage.setItem("content",document.body.innerHTML);
    localStorage.setItem("lastAccountsInput",accountsInput.value);
    localStorage.setItem("lastDaysInput",daysInput.value);
    localStorage.setItem("lastSelectedRadio",selectedRadio.value);
}

function checkLocalStorage(){
    if (localStorage.getItem("content")) {
        // contentSection.innerHTML = localStorage.getItem("content");
        document.body.innerHTML = localStorage.getItem("content");
    }
    else{
        console.log("No hay nada guardado en local storage")
    }

    reassignVariables();
    // setFinalHashtagStatus();

    if (localStorage.getItem("lastAccountsInput")) {
        accountsInput.value = localStorage.getItem("lastAccountsInput");
    }

    if (localStorage.getItem("lastDaysInput")) {
        daysInput.value = localStorage.getItem("lastDaysInput");
    }

    if (localStorage.getItem("lastSelectedRadio")) {
        document.getElementById(localStorage.getItem("lastSelectedRadio")).checked=true;
        reassignVariables();
    }

    
    // if(localStorage.getItem("finalHashtagStatus")){
    //     document.getElementById(localStorage.getItem("finalHashtagStatus")).checked=true;
    // }
    // else{
    //     console.log("No hay nada guardado en local storage")
    // }
}


function deleteLocalStorage(){
    if(localStorage.getItem("content")){
        localStorage.removeItem("content");
    }
    // else{
    //     console.log("No hay nada guardado en local storage")
    // }
    if(localStorage.getItem("lastAccountsInput")){
        localStorage.removeItem("lastAccountsInput");
    }
    if(localStorage.getItem("lastDaysInput")){
        localStorage.removeItem("lastDaysInput");
    }
    if(localStorage.getItem("lastSelectedRadio")){
        localStorage.removeItem("lastSelectedRadio");
    }
}

function setFinalHashtagStatus(){
    switch (finalHashtagStatus) {
        case "con":
            document.getElementById("con").checked=true;
            break;
        case "sin":
            document.getElementById("sin").checked=true;
            break;
        default:
            break;
    }
}

function reassignVariables(){
    mainButton = document.getElementById("mainButton");
    accountsInput = document.getElementById("accountsInput");
    daysInput = document.getElementById("daysInput");
    selectedRadio = document.querySelector('input[name="hashtags"]:checked');
    resetButton = document.getElementById("resetButton");
    contentSection = document.getElementById("content");
    // finalHashtagStatus = localStorage.getItem("finalHashtagStatus");
}

function downloadVideo(element) {
    let row = element.parentElement.parentElement.parentElement;
    row.style.backgroundColor = "blue";
    saveLocalStorage();
}

function copyText(element){
    let row = element.parentElement.parentElement;
    let text = row.querySelector('.scriptText').textContent;
    row.style.backgroundColor = "green";
    navigator.clipboard.writeText(text);
    saveLocalStorage();
}

function copyCaptionWithoutHashtags(element){
    let row = element.parentElement.parentElement;
    row.style.backgroundColor = "red";
    let rand = captionList[Math.random() * captionList.length | 0]
    navigator.clipboard.writeText(rand);
    saveLocalStorage();
}

function copyCaptionWithHashtags(element){
    let row = element.parentElement.parentElement;
    row.style.backgroundColor = "red";
    let rand = captionList[Math.random() * captionList.length | 0]
    navigator.clipboard.writeText(rand+hashtags);
    saveLocalStorage();
    
}



// filterOutErrors();
// filterByType();
// getDataPerAccount();
// createTable();