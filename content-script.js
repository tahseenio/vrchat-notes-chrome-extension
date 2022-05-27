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

// CODE TO VIEW CHROME LOCALSTORAGE (MUST VIEW IN SERVICE WORKER SECTION)
// *******
// chrome.storage.local.get(function(result){console.log(result)})
// ********
const main = () => {
  const divToInject = document.querySelector('.css-rqhlr5');

  // This prevents multiple notes on the same page from being made
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

  ///// converted to chrome.storage.local
  chrome.storage.local.get(['userNotes'], (result) => {
    console.log('Value currently is ' + result.userNotes);
    if (result.userNotes) {
      notes = [...result.userNotes];
      notes.filter((elem) => {
        if (elem.userID === userID) {
          textArea.innerHTML = elem.note;
        }
      });
    }
  });

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
          console.log('notes is set to ' + notes);
        });
      }
    });

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
        console.log('notes is set to ' + notes);
      });
    }
  });
  // console.log('content-script ran...');
  //
  // sync
  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });

  // chrome.storage.sync.get(['key'], function(result) {
  //   console.log('Value currently is ' + result.key);
  // });

  // local
  // chrome.storage.local.set({ key: value }, function () {
  //   console.log('Value is set to ' + value);
  // });

  // chrome.storage.local.get(['key'], function (result) {
  //   console.log('Value currently is ' + result.key);
  // });
};
