'use strict'

const MAPPING_DIFF = {
  HP: 40,
  攻撃力: 20,
  防御力: 20,
  スピード: 10
}

const HP_RATE = {
  gold: 6,
  silver: 4,
  bronze: 2
}

const ATTACK_RATE = {
  gold: 5,
  silver: 3,
  bronze: 2
}

const DEFENSE_RATE = {
  gold: 6,
  silver: 4,
  bronze: 2
}

const SPEED_RATE = {
  gold: 4,
  silver: 3,
  bronze: 2
}

const MAPPING = [
  [[0, 0, 0, 0], { gold: 0, silver: 0, bronze: 0 }, '刻印なし'],
  [[1, 0, 0, 0], { gold: 0, silver: 0, bronze: 1 }, '銅刻印×1'],
  [[1, 1, 0, 0], { gold: 0, silver: 0, bronze: 2 }, '銅刻印×2'],
  [[1, 1, 1, 0], { gold: 0, silver: 0, bronze: 3 }, '銅刻印×3'],
  [[1, 1, 1, 1], { gold: 0, silver: 0, bronze: 4 }, '銅刻印×4'],
  [[2, 0, 0, 0], { gold: 0, silver: 1, bronze: 0 }, '銀刻印×1'],
  [[2, 1, 0, 0], { gold: 0, silver: 1, bronze: 1 }, '銀刻印×1、銅刻印×1'],
  [[2, 1, 1, 0], { gold: 0, silver: 1, bronze: 2 }, '銀刻印×1、銅刻印×2'],
  [[2, 1, 1, 1], { gold: 0, silver: 1, bronze: 3 }, '銀刻印×1、銅刻印×3'],
  [[2, 2, 0, 0], { gold: 0, silver: 2, bronze: 0 }, '銀刻印×2'],
  [[2, 2, 1, 0], { gold: 0, silver: 2, bronze: 1 }, '銀刻印×2、銅刻印×1'],
  [[2, 2, 1, 1], { gold: 0, silver: 2, bronze: 2 }, '銀刻印×2、銅刻印×2'],
  [[2, 2, 2, 0], { gold: 0, silver: 3, bronze: 0 }, '銀刻印×3'],
  [[2, 2, 2, 1], { gold: 0, silver: 3, bronze: 1 }, '銀刻印×3、銅刻印×1'],
  [[2, 2, 2, 2], { gold: 0, silver: 4, bronze: 0 }, '銀刻印×4'],
  [[3, 0, 0, 0], { gold: 1, silver: 0, bronze: 0 }, '金刻印×1'],
  [[3, 1, 0, 0], { gold: 1, silver: 0, bronze: 1 }, '金刻印×1、銅刻印×1'],
  [[3, 1, 1, 0], { gold: 1, silver: 0, bronze: 2 }, '金刻印×1、銅刻印×2'],
  [[3, 1, 1, 1], { gold: 1, silver: 0, bronze: 3 }, '金刻印×1、銅刻印×3'],
  [[3, 2, 0, 0], { gold: 1, silver: 1, bronze: 0 }, '金刻印×1、銀刻印×1'],
  [[3, 2, 1, 0], { gold: 1, silver: 1, bronze: 1 }, '金刻印×1、銀刻印×1、銅刻印×1'],
  [[3, 2, 2, 0], { gold: 1, silver: 2, bronze: 0 }, '金刻印×1、銀刻印×2'],
  [[3, 2, 2, 1], { gold: 1, silver: 2, bronze: 1 }, '金刻印×1、銀刻印×2、銅刻印×1'],
  [[3, 2, 2, 2], { gold: 1, silver: 3, bronze: 0 }, '金刻印×1、銀刻印×3'],
  [[3, 3, 0, 0], { gold: 2, silver: 0, bronze: 0 }, '金刻印×2'],
  [[3, 3, 1, 0], { gold: 2, silver: 0, bronze: 1 }, '金刻印×2、銅刻印×1'],
  [[3, 3, 1, 1], { gold: 2, silver: 0, bronze: 2 }, '金刻印×2、銅刻印×2'],
  [[3, 3, 2, 0], { gold: 2, silver: 1, bronze: 0 }, '金刻印×2、銀刻印×1'],
  [[3, 3, 2, 1], { gold: 2, silver: 1, bronze: 1 }, '金刻印×2、銀刻印×1、銅刻印×1'],
  [[3, 3, 2, 2], { gold: 2, silver: 2, bronze: 0 }, '金刻印×2、銀刻印×2'],
  [[3, 3, 3, 0], { gold: 3, silver: 0, bronze: 0 }, '金刻印×3'],
  [[3, 3, 3, 1], { gold: 3, silver: 0, bronze: 1 }, '金刻印×3、銅刻印×1'],
  [[3, 3, 3, 2], { gold: 3, silver: 1, bronze: 0 }, '金刻印×3、銀刻印×1'],
  [[3, 3, 3, 3], { gold: 4, silver: 0, bronze: 0 }, '金刻印×4']
]

const script = document.createElement('script')
script.type = 'text/javascript'
script.src = './puppetCharacter.js'
document.body.appendChild(script)

const puppetCards = document.querySelectorAll('.puppet-card')
puppetCards.forEach(puppetCard => {
  puppetCard.addEventListener('click', event => showData(event))
})

function calculate () {
  const status = document.getElementById('status').value
  const target = document.getElementById('target').value
  const lvmax = document.getElementById('lvmax').value
  const max = document.getElementById('max').value
  let rate = document.getElementById('rate').value

  if (!target) {
    document.getElementById('target').style.backgroundColor = 'pink'
    document.getElementById('target').focus()
    return
  }
  document.getElementById('target').style.backgroundColor = 'transparent'

  if (!rate) {
    rate = 0
  }

  const puppetCards = document.querySelectorAll('.puppet-card')
  puppetCards.forEach(puppetCard => {
    const newClassName = puppetCard.className.replace('btn-danger', 'btn-secondary')
    puppetCard.className = newClassName
  })

  const isChecked = document.getElementById('puppetSearcher').checked
  if (!isChecked) {
    // init
    const tbody = document.getElementById('resultList')
    tbody.innerHTML = ''

    // get calculation result
    const resultList = getCalculationResults(status, Number(target), Number(lvmax), Number(max), Number(rate))
    if (resultList.length === 0) {
      const tr = document.createElement('tr')
      const description = document.createElement('td')
      tr.appendChild(description)
      tbody.appendChild(tr)
      description.innerText = '調整不可'
    } else {
      for (let n = 0; n < resultList.length; n++) {
        const tr = document.createElement('tr')
        const description = document.createElement('td')
        tr.appendChild(description)
        tbody.appendChild(tr)
        description.innerText = 'ステータス' + resultList[n].base + 'に' + resultList[n].description + 'で調整可能'
      }
    }
  } else {
    const tbody = document.getElementById('resultList')
    tbody.innerHTML = ''
    const tr = document.createElement('tr')
    const description = document.createElement('td')
    tr.appendChild(description)
    tbody.appendChild(tr)
    description.innerText = '-'
  }

  // get puppet result
  if (status === 'スピード') {
    const puppetCharacters = window.PUPPET_CHARACTER

    puppetCharacters.forEach(puppetCharacter => {
      const puppetResult = getCalculationResults(status,
        Number(target),
        Number(puppetCharacter.lvmax),
        Number(puppetCharacter.max),
        Number(puppetCharacter.rate))
      if (puppetResult.length !== 0) {
        const newClassName = document.getElementById(puppetCharacter.id).className.replace('btn-secondary', 'btn-danger')
        document.getElementById(puppetCharacter.id).className = newClassName
      }
    })
  }
}

function getCalculationResults (status, target, lvmax, max, rate) {
  const dict = {}
  let i = 0
  // add keys using increment
  while (lvmax + MAPPING_DIFF[status] * i <= max) {
    dict[lvmax + MAPPING_DIFF[status] * i] = []
    i++
  }
  // add keys using decrement
  let j = 0
  while (max - MAPPING_DIFF[status] * j >= lvmax) {
    const decrementKey = max - MAPPING_DIFF[status] * j
    if (decrementKey in dict) {
      break
    } else {
      dict[decrementKey] = []
      j++
    }
  }

  let runeRate = ''
  switch (status) {
    case 'HP':
      runeRate = HP_RATE
      break
    case '攻撃力':
      runeRate = ATTACK_RATE
      break
    case '防御力':
      runeRate = DEFENSE_RATE
      break
    case 'スピード':
      runeRate = SPEED_RATE
      break
  }
  const gold = runeRate.gold / 100
  const silver = runeRate.silver / 100
  const bronze = runeRate.bronze / 100
  const pa = rate / 100 + 1

  Object.keys(dict).forEach(key => {
    MAPPING.forEach(unit => {
      dict[key].push(Math.round(key * (1 + gold * unit[1].gold + silver * unit[1].silver + bronze * unit[1].bronze) * pa))
    })
  })

  const result = []
  Object.keys(dict).forEach(key => {
    for (let i = 0; i <= dict[key].length; i++) {
      if (dict[key][i] === target) {
        const data = {}
        data.base = key
        data.rune = MAPPING[i][0]
        data.description = MAPPING[i][2]
        result.push(data)
      }
    }
  })
  return result
}

function isPuppetSearcher () {
  const isChecked = document.getElementById('puppetSearcher').checked
  if (isChecked) {
    const status = document.getElementById('status')
    status.value = 'スピード'
    status.disabled = true
    document.getElementById('lvmax').disabled = true
    document.getElementById('max').disabled = true
    document.getElementById('rate').disabled = true
    document.getElementById('lvmax').value = ''
    document.getElementById('max').value = ''
    document.getElementById('rate').value = ''
    document.getElementById('d1').className = 'accordion-collapse collapse show'
  } else {
    document.getElementById('status').disabled = false
    document.getElementById('lvmax').disabled = false
    document.getElementById('max').disabled = false
    document.getElementById('rate').disabled = false
    document.getElementById('d1').className = 'accordion-collapse collapse'
  }
}

function showData (event) {
  const targetId = event.target.id
  const puppetCharacters = window.PUPPET_CHARACTER
  const targetCharacter = puppetCharacters.filter(puppetCharacter => puppetCharacter.id === targetId)[0]

  document.getElementById('puppetSearcher').checked = false
  document.getElementById('lvmax').value = targetCharacter.lvmax
  document.getElementById('max').value = targetCharacter.max
  document.getElementById('rate').value = targetCharacter.rate
  document.getElementById('status').disabled = false
  document.getElementById('lvmax').disabled = false
  document.getElementById('max').disabled = false
  document.getElementById('rate').disabled = false
}
