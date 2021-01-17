// elements for contact form and how to open it
let openContactForm = document.querySelector('.add_contact_button');
let contactForm = document.querySelector('.contact_form');
let contactFormInner = document.querySelector('.form');
let addNewContact = document.querySelector('#addContact');
let contactList = document.querySelector('.all_contacts_list');
let addNewFormElement = document.querySelector('.new_form_element');


// elements for the deatiled contact table
let contactDetailsTable = document.querySelector('.details_table');
let contactDetails = document.querySelector('.contact_details');


// elements for confirmation
let reserButton = document.querySelector('.reset_change');
let returnButton = document.querySelector('.return_to_list');
let newTableElement = document.querySelector('.new_table_element');


let formConfirm = document.querySelector('.form_confirm');
let formYesButton = document.querySelector('#formYes');
let formNoButton = document.querySelector('#formNo');

let cardConfirm = document.querySelector('.card_confirm');
let cardYesButton = document.querySelector('#cardYes');
let cardNoButton = document.querySelector('#cardNo');

let tableConfirm = document.querySelector('.table_confirm');
let tableYesButton = document.querySelector('#tableYes');
let tableNoButton = document.querySelector('#tableNo');

let newTableConfirm = document.querySelector('.new_table_confirm');
let newTableYesButton = document.querySelector('#newTableYes');
let newTableNoButton = document.querySelector('#newTableNo');

let resetConfirm = document.querySelector('.reset_confirm');
let resetYesButton = document.querySelector('#resetYes');
let resetNoButton = document.querySelector('#resetNo');

// element for searching
let searchInput = document.querySelector('.search_input');


// main object to store contacts
let contacts = {};


// additional object to store the copy of the contact in order to reset the last change;
let contactsClone = {};


// open contact form
openContactForm.addEventListener('click', () => contactForm.classList.add('active'));

// add new contact
addNewContact.addEventListener('click', function() {
    let contactFormTitle = document.querySelectorAll('.form_element span');
    let contactFormContent = document.querySelectorAll('.form_element input');
    let checkForminput = Array.from(contactFormContent).every(elem => elem.value.length > 0);
    if (contactFormTitle.length == contactFormContent.length && checkForminput == true) {
        // to generate unique name for the new contact
        let numberForName = Object.keys(contacts).length + 1;

        // create new contact in object contacts
        let contactName = `contact ${numberForName}`;
        contacts[contactName] = {};

        for (let i = 0; i < contactFormTitle.length; i++) {
            contacts[contactName][contactFormTitle[i].innerHTML] = contactFormContent[i].value;
        }
        createContactCard();
        contactFormContent.forEach(elem => elem.value = '');
        contactForm.classList.toggle('active');
        // clear additional form element
        let formElementAll = document.querySelectorAll('.form_element');
        for (let i = 1; i < formElementAll.length; i++) {
            contactFormInner.removeChild(formElementAll[i]);
        }
    } else {
        alert('complete the form!, focus & press enter after editing or/and write smth in empty inputs');
    }


});


// add new element into the form
addNewFormElement.addEventListener('click', createNewFormElement);

function createNewFormElement(e) {
    e.preventDefault();

    let newFormElement = document.createElement('div');
    newFormElement.classList.add('form_element');

    let newFormElementInside = document.createElement('div');
    newFormElement.appendChild(newFormElementInside);

    // changing the title of the new element
    let newFormTitle = document.createElement('span');
    newFormTitle.innerHTML = 'click';
    newFormTitle.addEventListener('click', function changeFormTitle() {
        let inputForm = document.createElement('input');
        inputForm.value = 'focus & press ENTER';
        newFormTitle.innerHTML = '';
        inputForm.addEventListener('keypress', event => {
            if (event.keyCode == 13) {
                newFormTitle.innerHTML = inputForm.value;
                newFormTitle.addEventListener('click', changeFormTitle)
            }
        })
        newFormTitle.appendChild(inputForm);
        newFormTitle.removeEventListener('click', changeFormTitle);
    })
    newFormElementInside.appendChild(newFormTitle);

    let newFormContent = document.createElement('input');
    newFormElementInside.appendChild(newFormContent);

    // delete button with confirmation
    let newButtonForm = document.createElement('button');
    newButtonForm.innerHTML = 'del';
    newButtonForm.addEventListener('click', (e) => {
        e.preventDefault();
        contactForm.classList.remove('active');
        formConfirm.classList.add('active');


        formYesButton.addEventListener('click', () => {
            contactFormInner.removeChild(newFormElement);
            formConfirm.classList.remove('active');
            contactForm.classList.add('active');
        });

        formNoButton.addEventListener('click', () => {
            formConfirm.classList.remove('active');
            contactForm.classList.add('active');

        });

    });


    newFormElement.appendChild(newButtonForm);
    contactFormInner.appendChild(newFormElement);
}


// creating new card of the contact
function createContactCard() {

    let contactCards = document.querySelectorAll('.card');

    contactCards.forEach(elem => elem.remove());

    let cardCount = 1;
    // creating the card and putting it into main page;
    for (let contact in contacts) {

        let newCard = document.createElement('div');
        newCard.classList.add('card');

        let newCardInner = document.createElement('div');
        newCardInner.classList.add('card_inner');

        let cardNumber = document.createElement('p');
        cardNumber.innerHTML = cardCount;
        cardCount++;
        newCardInner.appendChild(cardNumber);

        let cardTitle = document.createElement('p');
        cardTitle.innerHTML = contacts[contact]['Name'];
        newCardInner.appendChild(cardTitle);

        let cardButtonDelete = document.createElement('button');
        cardButtonDelete.innerHTML = 'DELETE';

        newCard.appendChild(newCardInner);
        // delete button with confirmation
        cardButtonDelete.addEventListener('click', () => {
            cardConfirm.classList.add('active');
        });

        cardYesButton.addEventListener('click', () => {
            delete contacts[contact];
            contactList.removeChild(newCard);
            contactCards = document.querySelectorAll('.card');
            contactCards.forEach((elem, index) => elem.firstChild.innerHTML = index + 1);
            createContactCard();

            cardConfirm.classList.remove('active');
        });

        cardNoButton.addEventListener('click', () => {
            cardConfirm.classList.remove('active');
        });

        newCard.appendChild(cardButtonDelete);


        // create a table for each contact after clicking on the card
        newCardInner.addEventListener('click', function createTable() {
            openContactForm.disabled = true;
            contactDetails.classList.add('active');
            let newTable = document.createElement('table');

            for (let element in contacts[contact]) {

                let newTr = document.createElement('tr');

                // title of the contact card
                let newTdTitle = document.createElement('td');
                newTdTitle.innerHTML = element;

                if (element != 'Name') {
                    newTdTitle.addEventListener('click', function changeTableTitle() {
                        let inputTableTitle = document.createElement('input');
                        inputTableTitle.value = newTdTitle.innerHTML;
                        newTdTitle.innerHTML = '';
                        // for title editing
                        inputTableTitle.addEventListener('keypress', function(event) {
                            if (event.keyCode == 13) {
                                contactsClone = JSON.parse(JSON.stringify(contacts[contact]));
                                newTdTitle.innerHTML = inputTableTitle.value;
                                delete Object.assign(contacts[contact], {
                                    [`${inputTableTitle.value}`]: contacts[contact][element]
                                })[element];
                                newTdTitle.addEventListener('click', changeTableTitle);
                            }
                        })
                        newTdTitle.appendChild(inputTableTitle);
                        newTdTitle.removeEventListener('click', changeTableTitle)
                    })
                }

                newTr.appendChild(newTdTitle);

                // content of the contact card
                let newTdContent = document.createElement('td');
                newTdContent.innerHTML = contacts[contact][element];
                newTdContent.addEventListener('click', function changeTableContent() {
                    let inputTableContent = document.createElement('input');
                    inputTableContent.value = newTdContent.innerHTML;
                    newTdContent.innerHTML = '';

                    // for content editing
                    inputTableContent.addEventListener('keypress', function(event) {
                        if (event.keyCode == 13) {
                            contactsClone = JSON.parse(JSON.stringify(contacts[contact]));
                            newTdContent.innerHTML = inputTableContent.value;
                            contacts[contact][element] = inputTableContent.value;
                            newTdContent.addEventListener('click', changeTableContent);
                        }
                    })
                    newTdContent.appendChild(inputTableContent);
                    newTdContent.removeEventListener('click', changeTableContent)
                })

                newTr.appendChild(newTdContent);

                // delete button for contact element with confirmation
                if (element != "Name") {
                    let tableButtonDelete = document.createElement('a');
                    tableButtonDelete.href = '#';
                    tableButtonDelete.innerHTML = 'del';
                    tableButtonDelete.addEventListener('click', (a) => {
                        a.preventDefault();

                        contactDetails.classList.remove('active');
                        tableConfirm.classList.add('active');

                        tableYesButton.addEventListener('click', () => {
                            newTable.removeChild(newTr);
                            delete contacts[contact][element];

                            tableConfirm.classList.remove('active');
                            contactDetails.classList.add('active');
                        })

                        tableNoButton.addEventListener('click', () => {
                            tableConfirm.classList.remove('active');
                            contactDetails.classList.add('active');
                        });
                    });
                    newTr.appendChild(tableButtonDelete);
                }
                newTable.appendChild(newTr);
            }
            contactDetailsTable.appendChild(newTable);

            // move 1 step back button with confirmation;
            reserButton.addEventListener('click', function() {
                let tableELements = document.querySelectorAll('.details_table td');
                let inputTableCheck = Array.from(tableELements).every(elem => elem.firstChild.tagName != 'INPUT');
                if (inputTableCheck && Object.keys(contactsClone).length != 0) {
                    resetConfirm.classList.add('active');
                    contactDetails.classList.remove('active');
                    resetYesButton.addEventListener('click', () => {
                        contacts[contact] = JSON.parse(JSON.stringify(contactsClone));
                        contactDetailsTable.removeChild(newTable);
                        resetConfirm.classList.remove('active');
                        contactDetails.classList.add('active');
                        createTable();
                    })
                    resetNoButton.addEventListener('click', () => {
                        resetConfirm.classList.remove('active');
                        contactDetails.classList.add('active');
                    })
                } else {
                    alert('complete the form!, focus & press enter after editing or/and write smth in empty inputs');
                }

            });

            // create new element button
            newTableElement.addEventListener('click', function() {
                let newAddTr = document.createElement('tr');

                // create new title for contact card
                let newAddTdTitle = document.createElement('td');
                newAddTdTitle.innerHTML = 'click to change';
                newAddTdTitle.addEventListener('click', function changeNewTableTitle() {
                    let inputTableNewTitle = document.createElement('input');
                    inputTableNewTitle.value = 'focus & press ENTER';
                    let oldTitle = newAddTdTitle.innerHTML;
                    newAddTdTitle.innerHTML = '';

                    // for new title editing
                    inputTableNewTitle.addEventListener('keypress', event => {
                        if (event.keyCode == 13) {
                            contactsClone = JSON.parse(JSON.stringify(contacts[contact]));
                            delete Object.assign(contacts[contact], {
                                [`${inputTableNewTitle.value}`]: contacts[contact][oldTitle]
                            })[oldTitle];
                            newAddTdTitle.innerHTML = inputTableNewTitle.value;
                            newAddTdTitle.addEventListener('click', changeNewTableTitle)
                        }
                    })
                    newAddTdTitle.appendChild(inputTableNewTitle);
                    newAddTdTitle.removeEventListener('click', changeNewTableTitle);
                })
                newAddTr.appendChild(newAddTdTitle);

                // create new content for contact card
                let newAddTdContent = document.createElement('td');
                newAddTdContent.innerHTML = 'click to change';
                newAddTdContent.addEventListener('click', function changeNewTableContent() {
                    let inputTableNewContent = document.createElement('input');
                    inputTableNewContent.value = 'focus & press ENTER';
                    newAddTdContent.innerHTML = '';
                    // for new content editing 
                    inputTableNewContent.addEventListener('keypress', event => {
                        if (event.keyCode == 13) {
                            contactsClone = JSON.parse(JSON.stringify(contacts[contact]));
                            contacts[contact][newAddTdTitle.innerHTML] = inputTableNewContent.value;
                            newAddTdContent.innerHTML = inputTableNewContent.value;
                            newAddTdContent.addEventListener('click', changeNewTableContent)
                        }
                    })
                    newAddTdContent.appendChild(inputTableNewContent);
                    newAddTdContent.removeEventListener('click', changeNewTableContent);
                })
                newAddTr.appendChild(newAddTdContent);

                // new delete button
                let tableNewButtonDelete = document.createElement('a');
                tableNewButtonDelete.href = '#';
                tableNewButtonDelete.innerHTML = 'del';
                tableNewButtonDelete.addEventListener('click', (a) => {
                    a.preventDefault();
                    newTableConfirm.classList.add('active');
                    contactDetails.classList.remove('active');

                    newTableYesButton.addEventListener('click', () => {
                        newTable.removeChild(newAddTr);
                        delete contacts[contact][newAddTdTitle.innerHTML];
                        createContactCard();

                        newTableConfirm.classList.remove('active');
                        contactDetails.classList.add('active');
                    })
                    newTableNoButton.addEventListener('click', () => {
                        newTableConfirm.classList.remove('active');
                        contactDetails.classList.add('active');
                    })

                });
                newAddTr.appendChild(tableNewButtonDelete);
                newTable.appendChild(newAddTr);
                contacts[contact][newAddTdTitle.innerHTML] = newAddTdContent.innerHTML;
            })
        })

        contactList.appendChild(newCard);
        cardNumber++;
    }
}

// return to list button;
returnButton.addEventListener('click', function() {
    let tableELements = document.querySelectorAll('.details_table td');
    let inputTableCheck = Array.from(tableELements).every(elem => elem.firstChild.tagName != 'INPUT');
    if (inputTableCheck) {
        contactDetailsTable.removeChild(contactDetailsTable.firstChild);
        contactDetails.classList.remove('active');
        openContactForm.disabled = false;

        createContactCard()
    } else {
        alert('complete the form!, focus & press enter after editing or/and write smth in empty inputs/ there is no edition!');
    }

})