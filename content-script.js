// TODO: make script dynamically inject once page finished loading instead of using setTimeout
// TODO: find better way to store user data
// TODO: create a save backup of localstorage data / restore from backup.
// BUG: Content and reinit running at same time on first browser load on a profile page

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

const main = () => {
  setTimeout(() => {
    const divToInject = document.querySelector('.css-rqhlr5');
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

    // if (localStorage.getItem(userID)) {
    //   textArea.innerHTML = localStorage.getItem(userID);
    // }
    let notes = [];
    if (localStorage.getItem('userNotes')) {
      notes = JSON.parse(localStorage.getItem('userNotes'));
      notes.filter((elem) => {
        if (elem.userID === userID) {
          textArea.innerHTML = elem.note;
        }
      });
      console.log('ON MOUNT:', notes);
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
          console.log('notes edited', notes);
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
        console.log('notes find', notes);
      }

      // if localstorage of the array exists then getItem the value and set it to the innerHtml of textarea
      // check if the userID exists in the array and if not exist add in a new object in array

      // if userID exists then update array

      // if (localStorage.getItem('userNotes')) {
      //   userNotes = JSON.parse(localStorage.getItem('userNotes'));
      //   textArea.innerHTML = userNotes.filter((elem) => {
      //     if (elem.userID === userID) return elem.note;
      //   });
      // }

      // if (userNotes.find((elem) => elem.userID === userID) === 'undefined') {
      //   const newArr = [
      //     ...userNotes,
      //     {
      //       userID: userID,
      //       note: e.target.value,
      //     },
      //   ];
      //   console.log(newArr);
      //   localStorage.setItem('userNotes', JSON.stringify(newArr));
      //   userNotes = JSON.parse(localStorage.getItem('userNotes'));
      // } else {
      //   // console.log('VALUE EXISTS UPDATE IT');
      //   const newArr = userNotes.map((elem) => {
      //     if (elem.userID === userID) {
      //       return {
      //         ...elem,
      //         note: e.target.value,
      //       };
      //     } else return elem;
      //   });
      //   localStorage.setItem('userNotes', JSON.stringify(newArr));
      //   userNotes = JSON.parse(localStorage.getItem('userNotes'));
      //   console.log(JSON.parse(localStorage.getItem('userNotes')));
      // }

      // localStorage.setItem(window.location.href.slice(-40), e.target.value);

      // get stored array
      // map through array and update object if userID === elem.userID
      // else if non existent just push it into array
    });
  }, 4000);
  console.log('script ran...');
};

main();
