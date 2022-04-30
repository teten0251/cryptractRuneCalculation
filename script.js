"use strict";

function calculate() {
    // change color
    // var rune = document.getElementById("rune-15");
    // rune.className = "bg-danger m-2 p-3";

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

    // calculation process

    let rune0 = document.getElementById("rune-0"),
        rune1 = document.getElementById("rune-1"),
        rune2 = document.getElementById("rune-2"),
        rune3 = document.getElementById("rune-3"),
        rune4 = document.getElementById("rune-4"),
        rune5 = document.getElementById("rune-5"),
        rune6 = document.getElementById("rune-6"),
        rune7 = document.getElementById("rune-7"),
        rune8 = document.getElementById("rune-8"),
        rune9 = document.getElementById("rune-9"),
        rune10 = document.getElementById("rune-10"),
        rune11 = document.getElementById("rune-11"),
        rune12 = document.getElementById("rune-12"),
        rune13 = document.getElementById("rune-13"),
        rune14 = document.getElementById("rune-14"),
        rune15 = document.getElementById("rune-15"),
        rune16 = document.getElementById("rune-16"),
        rune17 = document.getElementById("rune-17"),
        rune18 = document.getElementById("rune-18"),
        rune19 = document.getElementById("rune-19"),
        rune20 = document.getElementById("rune-20"),
        rune21 = document.getElementById("rune-21"),
        rune22 = document.getElementById("rune-22"),
        rune23 = document.getElementById("rune-23"),
        rune24 = document.getElementById("rune-24"),
        rune25 = document.getElementById("rune-25"),
        rune26 = document.getElementById("rune-26"),
        rune27 = document.getElementById("rune-27"),
        rune28 = document.getElementById("rune-28"),
        rune29 = document.getElementById("rune-29"),
        rune30 = document.getElementById("rune-30"),
        rune31 = document.getElementById("rune-31"),
        rune32 = document.getElementById("rune-32"),
        rune33 = document.getElementById("rune-33"),
        rune34 = document.getElementById("rune-34");

    // init
    let runes = [
        rune0,
        rune1,
        rune2,
        rune3,
        rune4,
        rune5,
        rune6,
        rune7,
        rune8,
        rune9,
        rune10,
        rune11,
        rune12,
        rune13,
        rune14,
        rune15,
        rune16,
        rune17,
        rune18,
        rune19,
        rune20,
        rune21,
        rune22,
        rune23,
        rune24,
        rune25,
        rune26,
        rune27,
        rune28,
        rune29,
        rune30,
        rune31,
        rune32,
        rune33,
        rune34
    ];

    let newClassName = "";
    runes.forEach(rune => {
        newClassName = rune.className.replace("bg-danger", "bg-secondary");
        rune.className = newClassName;
    });

    if (target < lvmax) {
        newClassName = rune0.className.replace("bg-secondary", "bg-danger");
        rune0.className = newClassName;
        return;
    } else if (target === lvmax) {
        newClassName = rune1.className.replace("bg-secondary", "bg-danger");
        rune1.className = newClassName;
        return;
    }

}

