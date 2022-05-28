// backup button logic
backup = document.getElementById('backup');
backup.addEventListener('click', () => {
  chrome.storage.local.get(['userNotes'], (result) => {
    // console.log('Currently downloading... ' + result.userNotes);
    const fileToSave = JSON.stringify([...result.userNotes], null, 2);
    const url = 'data:application/json;base64,' + btoa(fileToSave);
    chrome.downloads.download({
      url: url,
      filename: 'userNotes.json',
    });
  });
});

// restore button logic
const getFileText = () => {
  const [file] = document.getElementById('file').files;
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const data = reader.result;
    const finalData = JSON.parse(data);
    chrome.storage.local.set({ userNotes: finalData }, () => {
      // console.log('notes is set to ' + notes);
    });

    // TODO: ADD a SUCCESSFULY UPLOADED STATE FOR the upload data
    // alert(finalData);
  });

  if (file) {
    reader.readAsText(file);
  }
};

// restore success state logic
const setSuccess = () => {
  const successState = document.querySelector('.text--success');
  successState.innerText = 'Success! Refresh the browser to see changes';
  setTimeout(() => {
    successState.innerText = ' ';
  }, 5000);
};

// form submit
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getFileText();
  setSuccess();
});
