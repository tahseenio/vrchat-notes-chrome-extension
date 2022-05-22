// TODO: make script dynamically inject once page finished loading instead of using setTimeout
// TODO: find better way to store user data

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

    if (localStorage.getItem(userID)) {
      textArea.innerHTML = localStorage.getItem(userID);
    }

    textArea.addEventListener('keyup', (e) => {
      localStorage.setItem(window.location.href.slice(-40), e.target.value);
    });
  }, 4000);
  console.log('script ran...');
};

main();
