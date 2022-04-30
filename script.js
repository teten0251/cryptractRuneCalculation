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

    // let tr = document.createElement("tr");
    // let td1 = document.createElement("td");
    // let td2 = document.createElement("td");
    // let td3 = document.createElement("td");
    // tr.appendChild(td1);
    // tr.appendChild(td2);
    // tr.appendChild(td3);
    // tbody.appendChild(tr);

    // if (target < lvmax) {
    //     td1.innerText = "調整不可";
    //     return;
    // } else if (target === lvmax) {
    //     td1.innerText = "刻印なし";
    //     return;
    // }

    const resultList = getCalculationList(status, Number(target), Number(lvmax), Number(max), Number(rate));
    const n = 1;

}

function getCalculationList(status, target, lvmax, max, rate) {
    let list = {};
    let i = 0;
    while (lvmax + MAPPING_DIFF[status] * i <= max) {
        list[lvmax + MAPPING_DIFF[status] * i] = [];
        i++;
    }

    // TODO

    return [];
}
