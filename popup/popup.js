// TODO: maybe convert to chrome.local.storage if unable to directly obtain access localstorage
// TODO: add option to manually sync to chrome and set last sync time somewhere.

const getFileText = () => {
  const [file] = document.getElementById('file').files;

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const data = reader.result;
    const finalData = JSON.parse(data);
    chrome.storage.local.set({ userNotes: finalData }, () => {
      console.log('notes is set to ' + notes);
    });

    // TODO: ADD a SUCCESSFULY UPLOADED STATE FOR the upload data
    // alert(finalData);
  });

  if (file) {
    reader.readAsText(file);
  }
};

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getFileText();
});

// backup button section
backup = document.getElementById('backup');
backup.addEventListener('click', () => {
  const data = {
    value: 67,
  };

  //TODO: need to find a way to access localstorage of vrchat from popup.html
  // const data = JSON.parse(localStorage.getItem('userNotes'));

  chrome.storage.local.get(['userNotes'], (result) => {
    console.log('Currently downloading... ' + result.userNotes);
    const fileToSave = JSON.stringify([...result.userNotes], null, 2);
    const url = 'data:application/json;base64,' + btoa(fileToSave);
    chrome.downloads.download({
      url: url,
      filename: 'userNotes.json',
    });
  });
});
