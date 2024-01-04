const mainButton = document.getElementById("mainButton");
const daysInput = document.getElementById("daysInput");
const resetButton = document.getElementById("resetButton");
let lastHashtagStatus = document.querySelector('input[name="hashtags"]:checked').value;

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

// mainButton.addEventListener("click",runProject);
// resetButton.addEventListener("click",resetFields);

function runProject(){

};

function resetFields(){
    
};

async function getData(){
    try{
    const response = await fetch("https://api.nextboardapp.com/api/v1/script/1Y8CSN4ecyza_z91jQs1vsT5qQLpf_QFfBXpIOrHL69I");
    const responseObj = await response.json();
    if (responseObj.status >= 400 && responseObj.status < 600) {
        throw new Error("Bad response from server");
      }
      return responseObj;
    }
    catch(error){
        console.log(error)
    }
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
    // let numberOfVideos = daysInput.value * 3;
    let numberOfVideos = 3;
    const dataPerAccount = [];
    for (let i = 0; i < numberOfVideos; i++) {
        dataPerAccount.push(await filterByType());
    }
    // console.log(dataPerAccount);
    return dataPerAccount;
}

async function createTable(){
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
        let encodedScriptText = encodeURIComponent(element.scriptText);
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
    <td><video
    preload='metadata' 
    style="width:100px; height:auto;"
    src='${element.backgroundUrls}'/></td>
    <td class="scriptText">${element.scriptText}</td>
    <td><a href="${element.backgroundUrls}" download><button onclick="downloadVideo(this)">Descargar</button></a> </td>
    <td><button class="textButton" onclick="copyText(this)">Copiar texto</button></td>
    <td><button class="captionButtonWithoutHashtags" onclick="copyCaptionWithoutHashtags(this)" ${visibilitySin}>Sin #</button><button class="captionButtonWithHashtags" onclick="copyCaptionWithHashtags(this)" ${visibilityCon}>Con #</button></td>
    </tr>
    `);
    });
    document.body.append(table);
}

function downloadVideo(element) {
    let row = element.parentElement.parentElement.parentElement;
    row.style.backgroundColor = "blue";
}

function copyText(element){
    let row = element.parentElement.parentElement;
    let text = row.querySelector('.scriptText').textContent
    row.style.backgroundColor = "green";
    return navigator.clipboard.writeText(text)
}

function copyCaptionWithoutHashtags(element){
    let row = element.parentElement.parentElement;
    row.style.backgroundColor = "red";
}

function copyCaptionWithHashtags(element){
    let row = element.parentElement.parentElement;
    row.style.backgroundColor = "red";
}



// filterOutErrors();
// filterByType();
// getDataPerAccount();
createTable();