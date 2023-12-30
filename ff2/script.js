const mainButton = document.getElementById("mainButton");
const daysInput = document.getElementById("daysInput");
const resetButton = document.getElementById("resetButton");

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
    let cleanData;
    while (dataType != "basic"){
        cleanData = await filterOutErrors();
        dataType = cleanData.scriptType;
    }
    return cleanData;
}

async function getDataPerAccount(){
    // let numberOfVideos = daysInput.value * 3;
    let numberOfVideos = 3;
    const dataPerAccount = [];
    for (let i = 0; i < numberOfVideos; i++) {
        dataPerAccount.push(await filterByType());
    }
    console.log(dataPerAccount);
}

async function createTable(){

}

// filterOutErrors();
// filterByType();
getDataPerAccount();