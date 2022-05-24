// TODO: convert localstorage to chrome.storage
// TODO: create a save backup of localstorage data / restore from backup.

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'are_you_there_content_script?') {
    sendResponse({ status: 'yes' });
  }
});

const notesDivStyle = `background-color: #242A31;
margin-top: 16px;
padding: 8px;
width: 100%;
height: calc(100% - 142px - 16px);
border-radius: 4px;`;

const notesTitleStyle = `font-size: 20px; color: white`;

const textAreaInnerStyle = `width: 100%;
height: calc(100% - 30px);
border: none;
outline: none;
color: white;
background-color: transparent;
resize: none;`;

const findInjectTime = () => {
  if (document.querySelector('.css-rqhlr5') === null) {
    setTimeout(() => {
      findInjectTime();
    }, 100);
  } else {
    main();
  }
};
findInjectTime();

const main = () => {
  const divToInject = document.querySelector('.css-rqhlr5');

  // This prevents multiple notes on the same page from being made
  if (divToInject.childElementCount === 2) return;

  const notesDiv = document.createElement('div');
  const notesTitle = document.createElement('div');
  const textArea = document.createElement('textarea');

  // load div,textarea and inject
  divToInject.append(notesDiv);
  notesDiv.append(notesTitle);
  notesDiv.append(textArea);
  notesDiv.style.cssText = notesDivStyle;
  notesTitle.style.cssText = notesTitleStyle;
  notesTitle.innerHTML = 'Notes';
  textArea.style.cssText = textAreaInnerStyle;

  const userID = window.location.href.slice(-40);

  let notes = [];
  if (localStorage.getItem('userNotes')) {
    notes = JSON.parse(localStorage.getItem('userNotes'));
    notes.filter((elem) => {
      if (elem.userID === userID) {
        textArea.innerHTML = elem.note;
      }
    });
    // console.log('ON MOUNT:', notes);
  }

  textArea.addEventListener('keyup', (e) => {
    notes.find((elem) => {
      if (elem.userID === userID) {
        const newArr = notes.map((elem) => {
          if (elem.userID === userID) {
            return {
              ...elem,
              note: e.target.value,
            };
          } else return elem;
        });
        notes = [...newArr];
        localStorage.setItem('userNotes', JSON.stringify(notes));
        // console.log('notes edited', notes);
      }
    });

    if (notes.find((elem) => elem.userID === userID) === undefined) {
      // if undefined create a new object with note and
      const newArr = [
        ...notes,
        {
          userID: userID,
          note: e.target.value,
        },
      ];
      notes = [...newArr];
      localStorage.setItem('userNotes', JSON.stringify(notes));
      // console.log('notes find', notes);
    }
  });
  // console.log('script ran...');
};
