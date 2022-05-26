// TODO: maybe convert to chrome.local.storage if unable to directly obtain access localstorage
// TODO: add option to manually sync to chrome and set last sync time somewhere.

const getFileText = () => {
  const [file] = document.getElementById('file').files;

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const data = reader.result;
    const finalData = JSON.parse(data);

    // TODO: insert code to set localstorage as data.json inputted here
    alert(finalData);
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

  const fileToSave = JSON.stringify(data);
  const url = 'data:application/json;base64,' + btoa(fileToSave);
  chrome.downloads.download({
    url: url,
    filename: 'userNotes.json',
  });
});
