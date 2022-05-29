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

const whenToInject = () => {
  if (document.querySelector('.css-rqhlr5') === null) {
    setTimeout(() => {
      whenToInject();
    }, 100);
  } else {
    main();
  }
};
whenToInject();

const main = () => {
  const divToInject = document.querySelector('.css-rqhlr5');

  // This  line prevents multiple notes on the same page from being made
  if (divToInject.childElementCount === 2) return;

  const notesDiv = document.createElement('div');
  const notesTitle = document.createElement('div');
  const textArea = document.createElement('textarea');

  // get current username
  const currentUserName = document.querySelector('.col-md-12 h2').innerText;
  // console.log('current username', currentUserNameDiv);

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

  // On mount, load userNotes from chrome.storage
  chrome.storage.local.get(['userNotes'], (result) => {
    // console.log('Value currently is ' + result.userNotes);
    if (result.userNotes) {
      notes = [...result.userNotes];
      notes.filter((elem) => {
        if (elem.userID === userID) {
          textArea.innerHTML = elem.note;
        }
      });
    }
  });

  // On note change, update chrome.storage
  textArea.addEventListener('keyup', (e) => {
    notes.find((elem) => {
      if (elem.userID === userID) {
        const newArr = notes.map((elem) => {
          if (elem.userID === userID) {
            return {
              ...elem,
              currentUserName: currentUserName,
              note: e.target.value,
            };
          } else return elem;
        });
        notes = [...newArr];

        chrome.storage.local.set({ userNotes: notes }, () => {
          // console.log('notes is set to ' + notes);
        });
      }
    });

    // If a note with new userID is being made, add a new object into notes Array
    if (notes.find((elem) => elem.userID === userID) === undefined) {
      // if undefined create a new object with note, current username and userID
      const newArr = [
        ...notes,
        {
          userID: userID,
          currentUserName: currentUserName,
          note: e.target.value,
        },
      ];
      notes = [...newArr];
      chrome.storage.local.set({ userNotes: notes }, () => {
        // console.log('notes is set to ' + notes);
      });
    }
  });
};
