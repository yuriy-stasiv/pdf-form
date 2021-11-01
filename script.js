const { PDFDocument, rgb, StandardFonts, setCharacterSpacing, TextAlignment, layoutMultilineText, widthOfTextAtSize } = PDFLib

async function modifyPdf() {
    // Fetch an existing PDF document
    const url = './src/wniosek-pobyt-czasowy.pdf'
    // Fetch custom font
    const fontUrl = './src/consolas/CONSOLA.TTF';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // font color variables
    const mainFontColor = rgb(0, 0, 0);

    // load font and embed it to pdf document
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
    const mainFont = await pdfDoc.embedFont(fontBytes);

    // font size variables
    const smallFontSize = 10;
    const mediumFontSize = 16;
    const largeFontSize = 18;
    const xlFontsize = 22;
    const megaFontSize = 32;

    // Get pages of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const secondPage = pages[1]
    const thirdPage = pages[2]
    const fourthPage = pages[3]
    const fifthPage = pages[4]
    const sixthPage = pages[5]
    const eighthPage = pages[7]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()
    const maxWidthPurpose = width - 110;
    const maxWidthDescription = width - 70;
    const maxWidthDescriptionExtra = width - 80;

    // position of X
    const mainX = 215;
    const actualPlaceInPlX = 200;
    const purposeX = 64.15;
    const otherPurposeX = 87;
    const mainDescriptionX = 49;
    const otherDescriptionX = 60;
    const extraOtherDescriptionX = 90;

    // values from A section
    const wojewoda = document.getElementById('wojewoda').value.toUpperCase();
    const surname = document.getElementById('surname').value.toUpperCase();
    const previousSurname = document.getElementById('previousSurname').value.toUpperCase();
    const previousSurname2 = document.getElementById('previousSurname2').value.toUpperCase();
    const famName = document.getElementById('famName').value.toUpperCase();
    const firstName = document.getElementById('firstName').value.toUpperCase();
    const firstName2 = document.getElementById('firstName2').value.toUpperCase();
    const prevFirstName = document.getElementById('prevFirstName').value.toUpperCase();
    const prevFirstName2 = document.getElementById('prevFirstName2').value.toUpperCase();
    const fatherName = document.getElementById('fatherName').value.toUpperCase();
    const motherName = document.getElementById('motherName').value.toUpperCase();
    const motherMaiName = document.getElementById('motherMaiName').value.toUpperCase();
    const birthDate = document.getElementById('birthDate').value.toUpperCase();
    const sex = document.getElementById('sex').value.toUpperCase();
    const birthPlace = document.getElementById('birthPlace').value.toUpperCase();
    const birthCountry = document.getElementById('birthCountry').value.toUpperCase();
    const nationality = document.getElementById('nationality').value.toUpperCase();
    const citizenship = document.getElementById('citizenship').value.toUpperCase();
    const marital = document.getElementById('marital').value.toUpperCase();
    const education = document.getElementById('education').value.toUpperCase();
    const heightDescr = document.getElementById('heightDescr').value;
    const eyeColour = document.getElementById('eyeColour').value.toUpperCase();
    const specMarks = document.getElementById('specMarks').value.toUpperCase();
    const pesel = document.getElementById('pesel').value.toUpperCase();
    const phoneNum = document.getElementById('phoneNum').value.toUpperCase();
    const email = document.getElementById('email').value.toUpperCase();

    // values from B section
    const memberOutside = document.getElementById('memberOutside');
    const voivodeship = document.getElementById('voivodeship').value.toUpperCase();
    const town = document.getElementById('town').value.toUpperCase();
    const street = document.getElementById('street').value.toUpperCase();
    const houseNum = document.getElementById('houseNum').value.toUpperCase();
    const apartmentNum = document.getElementById('apartmentNum').value.toUpperCase();
    const postalCode = document.getElementById('postalCode').value.toUpperCase();

    // values from C section
    const mainPurpose = document.getElementById('mainPurpose').value;
    const otherPurposeDescription = document.getElementById('otherPurposeDescription').value;
    const previousVisits = document.getElementById('previousVisits').value;
    const currentStay = document.getElementById('currentStay').value;
    const lastEntry = document.getElementById('lastEntry').value;
    const legalBasis = document.getElementById('legalBasis').value;
    const travelsLastFiveYears = document.getElementById('travelsLastFiveYears').value;
    const subsistence = document.getElementById('subsistence').value;
    const insurance = document.getElementById('insurance').value;
    const arrested = document.getElementById('arrested').value;
    const sentencedByCourt = document.getElementById('sentencedByCourt').value;
    const sentencedByCourtDecription = document.getElementById('sentencedByCourtDecription').value;
    const criminal = document.getElementById('criminal').value;
    const criminalDecription = document.getElementById('criminalDecription').value;
    const liabilities = document.getElementById('liabilities').value;
    const liabilitiesDecription = document.getElementById('liabilitiesDecription').value;

    // values form E section
    const attachments1 = document.getElementById('attachments1').value;
    const attachments2 = document.getElementById('attachments2').value;
    const attachments3 = document.getElementById('attachments3').value;
    const attachments4 = document.getElementById('attachments4').value;
    const attachments5 = document.getElementById('attachments5').value;
    const attachments6 = document.getElementById('attachments6').value;
    const attachments7 = document.getElementById('attachments7').value;
    const attachments8 = document.getElementById('attachments8').value;
    const attachments9 = document.getElementById('attachments9').value;
    const attachments10 = document.getElementById('attachments10').value;
    const attachments11 = document.getElementById('attachments11').value;
    const attachments12 = document.getElementById('attachments12').value;
    const attachments13 = document.getElementById('attachments13').value;
    const attachments14 = document.getElementById('attachments14').value;
    const attachments15 = document.getElementById('attachments15').value;

    // 
    const fillQuestionnaire = (page, text, x, y, size, font, color, lineHeight) => {
        page.drawText(text, {
            x: x,
            y: y,
            size: size,
            font: font,
            color: color,
            lineHeight: lineHeight
        })
    }

    // section B - *Tick the box with ”X” if a family member remains outside the territory of the Republic of Poland
    function checkMemberOutside() {
        if (memberOutside.checked) {
            fillQuestionnaire(thirdPage, 'X', purposeX, 784, mediumFontSize, mainFont, mainFontColor)
        }
    }

    // section C - I. select main purpose of stay function
    function getMainPurpose(positionY) {
        if (positionY < 12) {
            const values = {
                '1': 418.6,
                '2': 386.16,
                '3': 353.28,
                '4': 318,
                '5': 285.64,
                '6': 237.6,
                '7': 205.92,
                '8': 177.6,
                '9': 150.72,
                '10': 111.12,
                '11': 78.24,
            }
            fillQuestionnaire(thirdPage, 'X', purposeX, values[positionY], xlFontsize, mainFont, mainFontColor)
        } else if (positionY < 16) {
            const values = {
                '12': 783,
                '13': 746,
                '14': 712,
                '15': 678,
            }
            fillQuestionnaire(fourthPage, 'X', purposeX, values[positionY], xlFontsize, mainFont, mainFontColor)
        } else {
            // if purpose 16, add description
            fillQuestionnaire(fourthPage, 'X', purposeX, 641, xlFontsize, mainFont, mainFontColor)

            fillQuestionnaire(fourthPage, fillParagraph(otherPurposeDescription, mainFont, 10, maxWidthPurpose), otherPurposeX, 626, smallFontSize, mainFont, mainFontColor, 15)
        }

    }

    // III. Foreigner’s stay on the territory of the Republic of Poland
    // a) Provide previos visits
    function getActualStay(answer) {
        if (answer == 'Tak') {
            fillQuestionnaire(fifthPage, 'X', 368.5, 730, megaFontSize, mainFont, mainFontColor)
        } else {
            fillQuestionnaire(fifthPage, 'X', 465.5, 730, megaFontSize, mainFont, mainFontColor)
        }
    }

    // III. Foreigner’s stay on the territory of the Republic of Poland
    // a) Provide previos visits
    function getLegalBasis(positionY) {
        const values = {
            'circulation sans visa': 596.5,
            'visa': 567,
            'temporary residence permit': 538,
            'other Schengen permit': 509.5,
        }
        fillQuestionnaire(fifthPage, 'X', 107, values[positionY], largeFontSize, mainFont, mainFontColor)
    }

    // VIII. Have you been sentenced by the court on the territory of the Republic of Poland? 
    function getSentencedByCourt(value) {
        if (value == 'Tak') {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 632, xlFontsize, mainFont, mainFontColor)
            fillQuestionnaire(sixthPage, fillParagraph(sentencedByCourtDecription, mainFont, 10, maxWidthDescriptionExtra), otherDescriptionX, 588, smallFontSize, mainFont, mainFontColor, 15)
        } else {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 527, xlFontsize, mainFont, mainFontColor)
        }
    }

    // IX. Are you a subject of any criminal or contravention proceedings pending on the territory of the Republic of Poland?
    function getCriminal(value) {
        if (value == 'Tak') {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 421, xlFontsize, mainFont, mainFontColor)
            fillQuestionnaire(sixthPage, fillParagraph(criminalDecription, mainFont, 10, maxWidthDescriptionExtra), otherDescriptionX, 388, smallFontSize, mainFont, mainFontColor, 15)
        } else {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 322.5, xlFontsize, mainFont, mainFontColor)
        }
    }

    // X. Do you have any liabilities resulting from verdicts of courts, resolutions or administrative decisions,
    //    including alimony, in the territory of the Republic of Poland or abroad?
    function getLiabilities(value) {
        if (value == 'Tak') {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 199, xlFontsize, mainFont, mainFontColor)
            fillQuestionnaire(sixthPage, fillParagraph(liabilitiesDecription, mainFont, 10, maxWidthDescriptionExtra), otherDescriptionX, 157, smallFontSize, mainFont, mainFontColor, 15)
        } else {
            fillQuestionnaire(sixthPage, 'X', extraOtherDescriptionX, 86, xlFontsize, mainFont, mainFontColor)
        }
    }

    // Fill the first page
    // set spacing 2 for wojewoda
    firstPage.pushOperators(
        setCharacterSpacing(0)
    )
    fillQuestionnaire(firstPage, wojewoda, 120, height / 2 - 20, mediumFontSize, mainFont, mainFontColor)

    // set spacing 9 for the rest on first page
    firstPage.pushOperators(
        setCharacterSpacing(9)
    )
    fillQuestionnaire(firstPage, surname, mainX, 312, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, previousSurname, mainX, 280.8, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, previousSurname2, mainX, 247, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, famName, mainX, 216.72, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, firstName, mainX, 185.76, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, firstName2, mainX, 154, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, prevFirstName, mainX, 123.84, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, prevFirstName2, mainX, 88, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(firstPage, fatherName, mainX, 57.84, mediumFontSize, mainFont, mainFontColor)

    // Fill the second page
    // set spacing 9
    secondPage.pushOperators(
        setCharacterSpacing(9)
    )
    fillQuestionnaire(secondPage, motherName, mainX, 780, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, motherMaiName, mainX, 748, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, birthDate, mainX, 716, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, sex, mainX, 673, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, birthPlace, mainX, 642, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, birthCountry, mainX, 610, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, nationality, mainX, 578, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, citizenship, mainX, 547, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, marital, mainX, 515, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, education, mainX, 483, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, heightDescr, mainX, 413, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, eyeColour, mainX, 380, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, specMarks, mainX, 350, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, pesel, mainX, 325, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, phoneNum, mainX, 278, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(secondPage, email, mainX, 255, mediumFontSize, mainFont, mainFontColor)


    // Fill the third page
    // add character spacing = 9
    thirdPage.pushOperators(
        setCharacterSpacing(9)
    )
    // section B

    // *Tick the box with ”X” if a family member remains outside the territory of the Republic of Poland
    checkMemberOutside();

    fillQuestionnaire(thirdPage, voivodeship, actualPlaceInPlX, 724, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(thirdPage, town, actualPlaceInPlX, 694, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(thirdPage, street, actualPlaceInPlX, 662, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(thirdPage, houseNum, actualPlaceInPlX, 630, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(thirdPage, apartmentNum, actualPlaceInPlX, 596, mediumFontSize, mainFont, mainFontColor)
    fillQuestionnaire(thirdPage, postalCode, actualPlaceInPlX, 565, mediumFontSize, mainFont, mainFontColor)

    // section C

    // I. select main purpose
    getMainPurpose(mainPurpose)

    // III. Foreigner’s stay on the territory of the Republic of Poland
    // a) Provide previos visits
    fillQuestionnaire(fourthPage, fillParagraph(previousVisits, mainFont, 10, maxWidthDescription), mainDescriptionX, 130, smallFontSize, mainFont, mainFontColor, 15)
    getActualStay(currentStay)
    // add character spacing = 9
    fifthPage.pushOperators(
        setCharacterSpacing(9)
    )
    fillQuestionnaire(fifthPage, lastEntry, 368, 707, mediumFontSize, mainFont, mainFontColor)
    getLegalBasis(legalBasis)

    // IV. Foreigner’s travels and stays outside the territory of the Republic of Poland within the last 5 years
    // remove character spacing
    fifthPage.pushOperators(
        setCharacterSpacing(0)
    )
    fillQuestionnaire(fifthPage, fillParagraph(travelsLastFiveYears, mainFont, 10, maxWidthDescriptionExtra), mainDescriptionX, 410, smallFontSize, mainFont, mainFontColor, 13.5)
    // V. Information about foreigner’s means of subsistence
    fillQuestionnaire(fifthPage, fillParagraph(subsistence, mainFont, 10, maxWidthDescriptionExtra), mainDescriptionX, 267, smallFontSize, mainFont, mainFontColor, 15)
    // VI. Information about foreigner’s medical insurance
    fillQuestionnaire(fifthPage, fillParagraph(insurance, mainFont, 10, maxWidthDescriptionExtra), mainDescriptionX, 177, smallFontSize, mainFont, mainFontColor, 15)

    // fill the sixth page

    //VII. Are you currently detained or placed in a guarded centre or detention centre for foreigners, has
    // any preventive measure been applied against you in the form of a ban on leaving the country, are you 
    // currently serving a sentence of imprisonment or are you temporarily arrested?
    fillQuestionnaire(sixthPage, fillParagraph(arrested, mainFont, 10, maxWidthDescriptionExtra), mainDescriptionX, 761, smallFontSize, mainFont, mainFontColor, 15)

    // VIII. Have you been sentenced by the court on the territory of the Republic of Poland? 
    getSentencedByCourt(sentencedByCourt)

    // IX. Are you a subject of any criminal or contravention proceedings pending on the territory of the Republic of Poland?
    getCriminal(criminal)

    // X. Do you have any liabilities resulting from verdicts of courts, resolutions or administrative decisions,
    //    including alimony, in the territory of the Republic of Poland or abroad?
    getLiabilities(liabilities)

    // section E
    // Attachments
    fillQuestionnaire(eighthPage, attachments1, extraOtherDescriptionX, 605, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments2, extraOtherDescriptionX, 590, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments3, extraOtherDescriptionX, 575, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments4, extraOtherDescriptionX, 560, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments5, extraOtherDescriptionX, 545, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments6, extraOtherDescriptionX, 530, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments7, extraOtherDescriptionX, 515, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments8, extraOtherDescriptionX, 500, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments9, extraOtherDescriptionX, 485, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments10, extraOtherDescriptionX, 470, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments11, extraOtherDescriptionX, 455, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments12, extraOtherDescriptionX, 440, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments13, extraOtherDescriptionX, 425, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments14, extraOtherDescriptionX, 410, smallFontSize, mainFont, mainFontColor)
    fillQuestionnaire(eighthPage, attachments15, extraOtherDescriptionX, 395, smallFontSize, mainFont, mainFontColor)


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}

function otherPurposeListener() {
    const value = document.getElementById('mainPurpose').value;
    if (value == 16) {
        otherPurpose.classList.remove('d-none')
    } else {
        otherPurpose.classList.add('d-none')
        otherPurposeDescription.value = '';
    }
}
function sentencedByCourtListener() {
    const value = document.getElementById('sentencedByCourt').value;
    if (value == 'Tak') {
        sentencedByCourtDispaly.classList.remove('d-none')
    } else {
        sentencedByCourtDispaly.classList.add('d-none')
        sentencedByCourtDecription.value = '';
    }
}
function criminalListener() {
    const value = document.getElementById('criminal').value;
    if (value == 'Tak') {
        criminalDispaly.classList.remove('d-none')
    } else {
        criminalDispaly.classList.add('d-none')
        criminalDecription.value = '';
    }
}
function liabilitiesListener() {
    const value = document.getElementById('liabilities').value;
    if (value == 'Tak') {
        liabilitiesDispaly.classList.remove('d-none')
    } else {
        liabilitiesDispaly.classList.add('d-none')
        liabilitiesDecription.value = '';
    }
}

function validPostCode(code) {
    if (!code.value.match(/^\d\d-\d\d\d$/)) {
        code.value = "";
        alert("Błędny kod!");
    }
}

// wrap text on next line
function fillParagraph(text, font, fontSize, maxWidth) {

    let paragraphs = text.split('\n');
    for (let index = 0; index < paragraphs.length; index++) {
        let paragraph = paragraphs[index];
        if (font.widthOfTextAtSize(paragraph, fontSize) > maxWidth) {
            let words = paragraph.split(' ');
            let newParagraph = [];
            let i = 0;
            newParagraph[i] = [];
            for (let k = 0; k < words.length; k++) {
                let word = words[k];
                newParagraph[i].push(word);
                if (font.widthOfTextAtSize(newParagraph[i].join(' '), fontSize) > maxWidth) {
                    newParagraph[i].splice(-1); // retira a ultima palavra
                    i = i + 1;
                    newParagraph[i] = [];
                    newParagraph[i].push(word);
                }
            }
            paragraphs[index] = newParagraph.map(p => p.join(' ')).join('\n');
        }
    }
    return paragraphs.join('\n');
}