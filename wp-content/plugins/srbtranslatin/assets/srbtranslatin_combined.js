(function () {
  const cyrillicToLatinMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    ђ: "đ",
    е: "e",
    ж: "ž",
    з: "z",
    и: "i",
    ј: "j",
    к: "k",
    л: "l",
    љ: "lj",
    м: "m",
    н: "n",
    њ: "nj",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    ћ: "ć",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "č",
    џ: "dž",
    ш: "š",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Ђ: "Đ",
    Е: "E",
    Ж: "Ž",
    З: "Z",
    И: "I",
    Ј: "J",
    К: "K",
    Л: "L",
    Љ: "Lj",
    М: "M",
    Н: "N",
    Њ: "Nj",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    Ћ: "Ć",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Č",
    Џ: "Dž",
    Ш: "Š",
  };

  function convertCyrillicToLatin(text) {
    return text.replace(
      /[а-яА-ЯђјљњћџЉЊЋЏ]/g,
      (char) => cyrillicToLatinMap[char] || char
    );
  }

  function traverseAndConvert(node) {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
      // Konverzija tekstualnih čvorova
      node.nodeValue = convertCyrillicToLatin(node.nodeValue);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        // Konverzija vrednosti (value) inputa i textarea
        if (node.value) {
          node.value = convertCyrillicToLatin(node.value);
        }
        // Konverzija placeholder-a
        if (node.placeholder) {
          node.placeholder = convertCyrillicToLatin(node.placeholder);
        }
      } else {
        for (let child of node.childNodes) {
          traverseAndConvert(child);
        }
      }
    }
  }

  function convertWholePage() {
    traverseAndConvert(document.body);
  }

  function applyScript(alphabet) {
    document.documentElement.setAttribute("data-pismo", alphabet);
    localStorage.setItem("pismo", alphabet);
    if (alphabet === "latinica") {
      convertWholePage();
    }
  }

  // Proveri postojeće pismo iz localStorage-a
  const savedAlphabet = localStorage.getItem("pismo");
  if (savedAlphabet) {
    applyScript(savedAlphabet);
  }

  // Postavljanje event listenera na dugmad
  document.addEventListener("DOMContentLoaded", () => {
    const cirButton = document.getElementById("cirilica");
    const latButton = document.getElementById("latinica");

    if (cirButton) {
      cirButton.addEventListener("click", () => applyScript("cirilica"));
    }

    if (latButton) {
      latButton.addEventListener("click", () => applyScript("latinica"));
    }
  });
})();
