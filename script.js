"use strict";

const MAPPING_DIFF = {
    "HP": 40,
    "攻撃力": 20,
    "防御力": 20,
    "スピード": 10
}

const HP_RATE = {
    "gold": 6,
    "silver": 4,
    "bronze": 2
}

const ATTACK_RATE = {
    "gold": 5,
    "silver": 3,
    "bronze": 2
}

const DEFENSE_RATE = {
    "gold": 6,
    "silver": 4,
    "bronze": 2
}

const SPEED_RATE = {
    "gold": 4,
    "silver": 3,
    "bronze": 2
}

const MAPPING = {
    0: ["0-0-0-0", "刻印なし"],
    1: ["1-0-0-0", "銅刻印×1"],
    2: ["1-1-0-0", "銅刻印×2"],
    3: ["1-1-1-0", "銅刻印×3"],
    4: ["1-1-1-1", "銅刻印×4"],
    5: ["2-0-0-0", "銀刻印×1"],
    6: ["2-1-0-0", "銀刻印×1、銅刻印×1"],
    7: ["2-1-1-0", "銀刻印×1、銅刻印×2"],
    8: ["2-1-1-1", "銀刻印×1、銅刻印×3"],
    9: ["2-2-0-0", "銀刻印×2"],
    10: ["2-2-1-0", "銀刻印×2、銅刻印×1"],
    11: ["2-2-1-1", "銀刻印×2、銅刻印×2"],
    12: ["2-2-2-0", "銀刻印×3"],
    13: ["2-2-2-1", "銀刻印×3、銅刻印×1"],
    14: ["2-2-2-2", "銀刻印×4"],
    15: ["3-0-0-0", "金刻印×1"],
    16: ["3-1-0-0", "金刻印×1、銅刻印×1"],
    17: ["3-1-1-0", "金刻印×1、銅刻印×2"],
    18: ["3-1-1-1", "金刻印×1、銅刻印×3"],
    19: ["3-2-0-0", "金刻印×1、銀刻印×1"],
    20: ["3-2-1-0", "金刻印×1、銀刻印×1、銅刻印×1"],
    21: ["3-2-2-0", "金刻印×1、銀刻印×2"],
    22: ["3-2-2-1", "金刻印×1、銀刻印×3"],
    23: ["3-2-2-2", "金刻印×1、銀刻印×3"],
    24: ["3-3-0-0", "金刻印×2"],
    25: ["3-3-1-0", "金刻印×2、銅刻印×1"],
    26: ["3-3-1-1", "金刻印×2、銅刻印×2"],
    27: ["3-3-2-0", "金刻印×2、銀刻印×1"],
    28: ["3-3-2-1", "金刻印×2、銀刻印×1、銅刻印×1"],
    29: ["3-3-2-2", "金刻印×2、銀刻印×2"],
    30: ["3-3-3-0", "金刻印×3"],
    31: ["3-3-3-1", "金刻印×3、銅刻印×1"],
    32: ["3-3-3-2", "金刻印×3、銀刻印×1"],
    33: ["3-3-3-3", "金刻印×4"]
}

let script = document.createElement("script");
script.type = "text/javascript";
script.src = "./puppetCharacter.js";
document.body.appendChild(script);

function calculate() {
    const status = document.getElementById("status").value,
        target = document.getElementById("target").value,
        lvmax = document.getElementById("lvmax").value,
        max = document.getElementById("max").value;
    let rate = document.getElementById("rate").value;

    if (!status || !target || !lvmax || !max) {
        return;
    }

    if (!rate) {
        rate = 0;
    }

    // init
    let tbody = document.getElementById("resultList");
    tbody.innerHTML = "";

    const resultList = getCalculationList(status, Number(target), Number(lvmax), Number(max), Number(rate));
    if (resultList.length === 0) {
        let tr = document.createElement("tr");
        let description = document.createElement("td");
        tr.appendChild(description);
        tbody.appendChild(tr);
        description.innerText = "調整不可";
    } else {
        for (let n = 0; n < resultList.length; n++) {
            let tr = document.createElement("tr");
            let description = document.createElement("td");
            tr.appendChild(description);
            tbody.appendChild(tr);
            description.innerText = "ステータス" + resultList[n].base + "に" + resultList[n].description + "で調整可能";
        }
    }
}

function getCalculationList(status, target, lvmax, max, rate) {
    let list = {};
    let i = 0;
    while (lvmax + MAPPING_DIFF[status] * i <= max) {
        list[lvmax + MAPPING_DIFF[status] * i] = [];
        i++;
    }

    let runeRate = "";
    switch (status) {
        case "HP":
            runeRate = HP_RATE;
            break;
        case "攻撃力":
            runeRate = ATTACK_RATE;
            break;
        case "守備力":
            runeRate = DEFENSE_RATE;
            break;
        case "スピード":
            runeRate = SPEED_RATE;
            break;
    }
    const gold = runeRate["gold"] / 100;
    const silver = runeRate["silver"] / 100;
    const bronze = runeRate["bronze"] / 100;
    const pa = rate / 100 + 1;

    Object.keys(list).forEach(key => {
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 0 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 0 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 0 + bronze * 2) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 0 + bronze * 3) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 0 + bronze * 4) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 1 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 1 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 1 + bronze * 2) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 1 + bronze * 3) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 2 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 2 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 2 + bronze * 2) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 3 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 3 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 0 + silver * 4 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 0 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 0 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 0 + bronze * 2) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 0 + bronze * 3) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 1 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 1 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 2 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 2 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 1 + silver * 3 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 0 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 0 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 0 + bronze * 2) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 1 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 1 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 2 + silver * 2 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 3 + silver * 0 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 3 + silver * 0 + bronze * 1) * pa));
        list[key].push(Math.round(key * (1 + gold * 3 + silver * 1 + bronze * 0) * pa));
        list[key].push(Math.round(key * (1 + gold * 4 + silver * 0 + bronze * 0) * pa));
    });

    let result = [];
    Object.keys(list).forEach(key => {
        for (let i = 0; i <= list[key].length; i++) {
            if (list[key][i] === target) {
                let data = {};
                data["base"] = key;
                data["rune"] = MAPPING[i][0];
                data["description"] = MAPPING[i][1];
                result.push(data);
            }
        }
    });
    return result;
}

function isPuppetSearcher() {
    let isChecked = document.getElementById("puppetSearcher").checked;
    if (isChecked) {
        let status = document.getElementById("status");
        status.value = "スピード";
        status.disabled = true;
        document.getElementById("lvmax").disabled = true;
        document.getElementById("max").disabled = true;
        document.getElementById("rate").disabled = true;
    } else {
        document.getElementById("status").disabled = false;
        document.getElementById("lvmax").disabled = false;
        document.getElementById("max").disabled = false;
        document.getElementById("rate").disabled = false;
    }
}

function showData(event) {
    const targetId = event.target.id,
        puppetCharacters = window.PUPPET_CHARACTER,
        targetCharacter = puppetCharacters.filter(puppetCharacter => puppetCharacter.id === targetId)[0];

    document.getElementById("lvmax").value = targetCharacter.lvmax;
    document.getElementById("max").value = targetCharacter.max;
    document.getElementById("rate").value = targetCharacter.rate;
}
